import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, queryConfig } from 'react-query';
import { Table, Spin } from 'antd';
import { fetchCohortDefinitions } from '../../Shared/wizardEndpoints/cohortMiddlewareApi';
import { useFetch, useFilter } from '../../Shared/formHooks';
import { useSourceContext } from '../../Shared/Source';
import { pseudoTw } from "../../Shared/constants";

const CohortDefinitions = ({
  selectedCohort = undefined,
  handleCohortSelect,
  searchTerm,
  namespace
}) => {
  const { source } = useSourceContext();
  const cohorts = useQuery(
    ['cohortdefinitions', source],
    () => fetchCohortDefinitions(source),
    queryConfig,
  );
  const fetchedCohorts = useFetch(cohorts, 'cohort_definitions_and_stats');
  const displayedCohorts = useFilter(fetchedCohorts, searchTerm, 'cohort_name');

  const cohortSelection = (
    inputSelectedCohort,
  ) => ({
    type: 'radio',
    columnTitle: 'Select',
    selectedRowKeys: inputSelectedCohort
      ? [inputSelectedCohort.cohort_definition_id]
      : [],
    onChange: (_, selectedRows) => {
      namespace === "selectedStudyPopulationCohort" ? handleCohortSelect(
        { accessor: "selectedStudyPopulationCohort", payload: selectedRows[0] })
        : handleCohortSelect(selectedRows[0])
    },
  });
  const cohortTableConfig = [
    {
      title: 'Cohort Name',
      dataIndex: 'cohort_name',
      key: 'cohort_name',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
  ];

  const { textCenter, "mt-50": mt50 } = pseudoTw;

  return cohorts?.status === 'success' ? (
    <div>
      <Table
        rowKey='cohort_definition_id'
        size='middle'
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100', '500'],
        }}
        rowSelection={cohortSelection(selectedCohort)}
        columns={cohortTableConfig}
        dataSource={displayedCohorts}
      />
    </div>
  ) : (
    <React.Fragment>
      <div
        style={{
          ...textCenter,
          ...mt50
        }}>
        <Spin />
      </div>
    </React.Fragment>
  );
};

CohortDefinitions.propTypes = {
  selectedCohort: PropTypes.any,
  handleCohortSelect: PropTypes.any.isRequired,
  searchTerm: PropTypes.string.isRequired,
  namespace: PropTypes.string.isRequired
};

CohortDefinitions.defaultProps = {
  selectedCohort: undefined,
};

export default CohortDefinitions;