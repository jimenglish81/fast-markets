import _ from 'lodash';
import * as d3 from 'd3';
import {
  CHART_SUCCESS,
  CHART_UPDATE
} from '../actions/types';

export default (state={}, { payload, type }) => {

  switch (type) {
    case CHART_SUCCESS:
      return { ...payload };
    case CHART_UPDATE:
      const update = {
        ...payload,
        timestamp: d3.timeFormat('%Y/%m/%d %H:%M:%S')(new Date(+payload.timestamp)),
      };

      return {
        ...state,
        //dataPoints: [ ...state.dataPoints.slice(1), update ],
        dataPoints: [ ...state.dataPoints, update ],
      };
    default:
      return state;
  }
}
