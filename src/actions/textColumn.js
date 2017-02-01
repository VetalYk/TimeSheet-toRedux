import * as typesText from '../components/TextColumn/constants';


export const selectNewDate = (index, newValue) =>(dispatch) => {
  dispatch({type: typesText.NEW_VALUE_CELL_TASKS, payload: newValue, index: index })
}
