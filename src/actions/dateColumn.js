import * as typesDate from '../components/DateColumn/constants';


export const selectNewDate = (index, newValue) =>(dispatch) => {
  dispatch({type: typesDate.SELECT_NEW_DATE,  payload: newValue, index: index })
}
