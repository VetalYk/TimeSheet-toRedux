import * as typesNumber from '../components/NumberColumn/constants';


export const editableInputHours = (index, newValue) =>(dispatch) => {
  dispatch({type: typesNumber.NEW_VALUE_CELL_HOURS, payload: newValue, index: index})
}
