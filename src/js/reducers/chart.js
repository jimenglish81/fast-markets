import _ from 'lodash';
import * as d3 from 'd3';
import {
  CHART_REQUEST,
  CHART_SUCCESS,
  CHART_FAILURE,
  CHART_UPDATE
} from '../actions/types';

export default (state={}, { payload, type }) => {

  switch (type) {
    case CHART_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CHART_SUCCESS:
      return {
        ...payload,
        isLoading: false,
      };
    case CHART_FAILURE:
      return {
        error: 'Chart failed.',
        isLoading: false,
      }
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
