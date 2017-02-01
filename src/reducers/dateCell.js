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

export default function dateCell(state=initialState, action) {
  if (action.type === "SELECT_NEW_DATE"){
        state.rows[action.index].date = action.payload
        return {
          ...state,
          rows: state.rows
        }
  return state
}
