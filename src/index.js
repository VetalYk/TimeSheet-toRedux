// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import TimeSheet from './containers/Timesheet';
import Login from './containers/Login';
import auth from './components/Auth';

import thunk from 'redux-thunk';
//import reducer from './reducers'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';

import * as typesTbody from './components/TBody/constants';
import * as typesDate from './components/DateColumn/constants';
import * as typesNumber from './components/NumberColumn/constants';
import * as typesProject from './components/ProjectColumn/constants';
import * as typesText from './components/TextColumn/constants';





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

function reducerState(state=initialState, action) {
  if (action.type === typesTbody.DATA_FROM_DATABASE) {
      return {
        ...state,
        scrollTo: true,
        rows: action.payload
      }
  } else if (action.type === typesTbody.NOT_SCROLLING) {
      return {
        ...state,
        scrollTo: false
      }
  } else if (action.type === typesTbody.INFINITE_SCROLL) {
      return {
        ...state,
        rows: [...action.payload, ...state.rows]
      }
  } else if (action.type === typesText.NEW_VALUE_CELL_TASKS) {
      state.rows[action.index].tasks = action.payload
      return {
        ...state,
        rows: state.rows
      }
  } else if (action.type === typesNumber.NEW_VALUE_CELL_HOURS) {
      state.rows[action.index].hours = action.payload
      return {
        ...state,
        rows: state.rows
      }
  } else if (action.type === typesProject.SELECT_NEW_PROJECT) {
      state.rows[action.index].project = action.payload
      return {
        ...state,
        rows: state.rows
      }
  } else if (action.type === typesDate.SELECT_NEW_DATE){
      state.rows[action.index].date = action.payload
      return {
        ...state,
        rows: state.rows
      }
  } else if (action.type === typesTbody.ADD_PROJECT_IF_EMPTY) {
      state.rows[action.index].project = state.rows[action.index-1].project
      return {
        ...state,
        rows: state.rows
      }
  } else if (action.type === typesTbody.ADD_DATE_IF_EMPTY) {
      state.rows[action.index].date = action.payload
      return {
        ...state,
        rows: state.rows
      }
  } else if (action.type === typesTbody.ADD_ONE_NEW_ROW) {
      state.rows.push(action.payload[0])
      return {
        ...state,
        rows: state.rows
      }
  }
  return state
}

const middleware = applyMiddleware(thunk)
const store = createStore(reducerState, middleware);

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login'
    })
  }
}
//const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/">
        <IndexRedirect to="/login"/>
        <Route path="/login" component={Login}/>
        <Route path="/timeSheet" component={TimeSheet} onEnter={requireAuth}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
