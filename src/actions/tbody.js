import * as typesTbody from '../components/TBody/constants';


export const addDateFromDatabase = (rows) =>(dispatch) => {
  dispatch({type: typesTbody.DATA_FROM_DATABASE, payload: rows})
}

export const notToScrolling = () => (dispatch) => {
  dispatch({type: typesTbody.NOT_SCROLLING})
}

export const infiniteScroll = (rows) =>(dispatch) => {
  dispatch({type: typesTbody.INFINITE_SCROLL, payload: rows})
}

export const addingOneNewRow = (oneRow) =>(dispatch) => {
  dispatch({type: typesTbody.ADD_ONE_NEW_ROW, payload: oneRow})
}

export const addProjectIfEmpty = (index) =>(dispatch) => {
  dispatch({type: typesTbody.ADD_PROJECT_IF_EMPTY, index: index})
}

export const addDateIfEmpty = (date, index) =>(dispatch) => {
  dispatch({type: typesTbody.ADD_DATE_IF_EMPTY , payload: date, index: index})
}
