import {
    LOAD_TIMESHEET_ITEMS,
} from './constants';

export function load() {
    return {
        type: LOAD_TIMESHEET_ITEMS,
    };
}