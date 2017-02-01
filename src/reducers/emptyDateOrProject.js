const projectsArr = [
  {
    id: 1,
    name: "Charlie1"
  },
  {
    id: 2,
    name: "Charlie2"
  },
  {
    id: 3,
    name: "Charlie3"
  }
]

const initialState = {
  rows: [],
  // projects: projectsArr,
  // showDatePicker: false,
  // scrollTo: false
};


export default function emptyDateOrProject(state=initialState, action) {
  if (action.type === "ADD_PROJECT_IF_EMPTY") {
      state.rows[action.index].project = state.rows[action.index-1].project
      return {
        ...state,
        rows: state.rows
      }
  } else if (action.type === "ADD_DATE_IF_EMPTY") {
      state.rows[action.index].date = action.payload
      return {
        ...state,
        rows: state.rows
      }
  }
  return state
}
