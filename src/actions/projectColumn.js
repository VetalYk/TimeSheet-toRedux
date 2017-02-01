import * as typesProject from '../components/ProjectColumn/constants';


export const selectNewDate = (index, newValue) =>(dispatch) => {
  dispatch({type: typesProject.SELECT_NEW_PROJECT,  payload: newValue, index: index })
}
