
import { fromJS } from 'immutable';

import {
    LOAD_TIMESHEET_ITEMS,
    LOAD_TIMESHEET_ITEMS_SUCCESS,
    LOAD_TIMESHEET_ITEMS_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
    loading: false,
    error: false,
    data: []
});

function appReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_TIMESHEET_ITEMS:
            return state
                .set('loading', true)
                .set('error', false);
        case LOAD_TIMESHEET_ITEMS_SUCCESS:
            return state
                .setIn('data', action.data)
                .set('loading', false);
        case LOAD_TIMESHEET_ITEMS_ERROR:
            return state
                .set('error', action.error)
                .set('loading', false);
        default:
            return state;
    }
}

export default appReducer;