import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LegendPanel from './LegendPanel';
import MapStylePanel from './MapStylePanel';
import LayerSelector from './LayerSelector';
import DataSelector from './DataSelector';

import './ControlPanel.less';

class ControlPanel extends PureComponent {
  render() {
    console.log(this.props.colors);
    // console.log(this.props.layers);
    return (
      <div className='control-panel'>
        <h3>{this.props.legendTitle}</h3>
        <p>
          Data source: <a href={this.props.legendDataSource.link}>{this.props.legendDataSource.title}</a>
        </p>
        {this.props.showMapStyle ? <MapStylePanel
          onMapStyleChange={this.props.onMapStyleChange}
          defaultMapStyle={this.props.defaultMapStyle}
        /> : null }
        {this.props.showLegend ? <LegendPanel
          colors={this.props.colors}
        /> : null }
        { this.props.layers ?
        <>
        <h3>Select Data</h3>
        <h4>
          Map Layers
        </h4>
          <LayerSelector layers={this.props.layers}
                         onLayerSelectChange={this.props.onLayerSelectChange}
                         activeLayer={this.props.activeLayer}/> 
        <h4>
          Additional Data Points
        </h4> 
          <DataSelector layers={this.props.dataPoints}
                         onDataSelectChange={this.props.onDataSelectChange}/> 
        </> : null}
      </div>
    );
  }
}

ControlPanel.propTypes = {
  onMapStyleChange: PropTypes.func,
  showLegend: PropTypes.bool,
  colors: PropTypes.object,
  showMapStyle: PropTypes.bool,
  defaultMapStyle: PropTypes.string,
};

ControlPanel.defaultProps = {
  onMapStyleChange: () => {},
  showLegend: false,
  colors: {},
  showMapStyle: false,
  defaultMapStyle: '',
};

export default ControlPanel;
