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

export default function tastksCell(state=initialState, action) {
  if (action.type === "SELECT_NEW_PROJECT") {
      state.rows[action.index].project = action.payload
      return {
        ...state,
        rows: state.rows
      }
  return state
}
