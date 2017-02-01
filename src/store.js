import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import reducer from './reducers'

export default function configureStore( preloadState ){

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
  //   projects: projectsArr,
  //   showDatePicker: false,
  //   scrollTo: false
  // };

  const middleware = applyMiddleware(thunk)
  const store = createStore(reducer, preloadState)

  return store
};


/**
 * Create the store with asynchronously loaded reducers
 */
//
// import { createStore, compose } from 'redux';
// import { fromJS } from 'immutable';
// import createReducer from './reducers';
//
// export default function configureStore(initialState = {}, history) {
//
//     const store = createStore(
//         createReducer(),
//         fromJS(initialState),
//     );
//
//     store.asyncReducers = {}; // Async reducer registry
//
//     return store;
// }
