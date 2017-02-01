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

export default function hoursCell(state=initialState, action) {
  if (action.type === "NEW_VALUE_CELL_HOURS") {
        state.rows[action.index].hours = action.payload
        return {
          ...state,
          rows: state.rows
        }
    }
  return state
}
