//const projectsArr = [
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
  //projects: projectsArr,
  scrollTo: false
};

export default function scrolling(state=initialState, action) {
  if (action.type === "NOT_SCROLLING") {
      return {
        ...state,
        scrollTo: false
      }
  } else if (action.type === "INFINITE_SCROLL") {
      return {
        ...state,
        rows: [...action.payload, ...state.rows]
      }
  }
  return state
}
