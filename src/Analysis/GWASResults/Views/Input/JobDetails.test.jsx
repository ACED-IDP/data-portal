import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useQuery } from 'react-query';
import SharedContext from '../../Utils/SharedContext';
import JobDetails from './JobDetails';
import MockedSuccessJSON from '../../TestData/InputViewData/MockedSuccessJSON';
import PHASES from '../../Utils/PhasesEnumeration';

jest.mock('react-query');

describe('Job Details', () => {
  const selectedRowData = {
    name: 'workflow_name',
    uid: 'workflow_id',
    phase: PHASES.Succeeded,
  };

  it('renders the component with loading error message', () => {
    useQuery.mockReturnValueOnce({
      status: 'succeeded',
      data: [],
    });

    render(
      <SharedContext.Provider value={{ selectedRowData }}>
        <JobDetails />
      </SharedContext.Provider>
    );
    expect(screen.getByTestId('loading-error-message')).toBeInTheDocument();
  });

  it('renders a loading spinner when fetching data', () => {
    useQuery.mockReturnValueOnce({
      status: 'loading',
      data: null,
    });

    const { container } = render(
      <SharedContext.Provider value={{ selectedRowData }}>
        <JobDetails />
      </SharedContext.Provider>
    );
    expect(container.getElementsByClassName('ant-spin').length).toBe(1);
  });

  it('renders an error message when there is an error fetching data', async () => {
    useQuery.mockReturnValueOnce({
      status: 'error',
      error: new Error('Fetch failed'),
    });

    render(
      <SharedContext.Provider value={{ selectedRowData }}>
        <JobDetails />
      </SharedContext.Provider>
    );

    await waitFor(() =>
      expect(screen.getByTestId('loading-error-message')).toBeInTheDocument()
    );
  });

  it('renders the logs when data is fetched successfully', async () => {
    useQuery.mockReturnValueOnce({
      status: 'success',
      data: MockedSuccessJSON,
    });
    render(
      <SharedContext.Provider value={{ selectedRowData }}>
        <JobDetails />
      </SharedContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Number of PCs')).toBeInTheDocument();
      expect(screen.getByText('MAF Cutoff')).toBeInTheDocument();
      expect(screen.getByText('HARE Ancestry')).toBeInTheDocument();
      expect(screen.getByText('Imputation Score Cutoff')).toBeInTheDocument();
      expect(screen.getByText('Cohort')).toBeInTheDocument();
      expect(screen.getByText('Phenotype')).toBeInTheDocument();
      expect(screen.getByText('Final Size')).toBeInTheDocument();
      expect(screen.getByText('Covariates')).toBeInTheDocument();
    });
  });
});
