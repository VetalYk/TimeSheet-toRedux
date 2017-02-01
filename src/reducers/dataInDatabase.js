// const projectsArr = [
//   {
//     id: 1,
//     name: "Charlie1"
//   },
//   {
//     id: 2,
//     name: "Charlie2"
//   },
//   {
//     id: 3,
//     name: "Charlie3"
//   }
// ]
//
// const initialState = {
//   rows: [],
//   // projects: projectsArr,
//   // showDatePicker: false,
//   scrollTo: false
// };
//
// export default function dataInDatabase(state=initialState, action) {
//   if (action.type === "DATA_FROM_DATABASE") {
//       return {
//         ...state,
//         scrollTo: true,
//         rows: action.payload
//       }
//     }
//     return state
// }

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
  projects: projectsArr,
  showDatePicker: false,
  scrollTo: false
};

export function reducerState(state=initialState, action) {
  if (action.type === "DATA_FROM_DATABASE") {
      return {
        ...state,
        scrollTo: true,
        rows: action.payload
      }
  } else if (action.type === "NOT_SCROLLING") {
      return {
        ...state,
        scrollTo: false
      }
  } else if (action.type === "INFINITE_SCROLL") {
      return {
        ...state,
        rows: [...action.payload, ...state.rows]
      }
  } else if (action.type === "NEW_VALUE_CELL_TASKS") {
      state.rows[action.index].tasks = action.payload
      return {
        ...state,
        rows: state.rows
      }
  } else if (action.type === "NEW_VALUE_CELL_HOURS") {
      state.rows[action.index].hours = action.payload
      return {
        ...state,
        rows: state.rows
      }
  } else if (action.type === "SELECT_NEW_PROJECT") {
      state.rows[action.index].project = action.payload
      return {
        ...state,
        rows: state.rows
      }
  } else if (action.type === "SELECT_NEW_DATE"){
      state.rows[action.index].date = action.payload
      return {
        ...state,
        rows: state.rows
      }
  } else if (action.type === "ADD_PROJECT_IF_EMPTY") {
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
