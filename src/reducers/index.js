import { combineReducers } from 'redux'

import scrolling from './scrolling'
import dataInDatabase from './dataInDatabase'
import emptyDateOrProject from './emptyDateOrProject'
import tastksCell from './tastksCell'
import projectCell from './projectCell'
import dateCell from './dateCell'
import hoursCell from './hoursCell'

export default combineReducers({
  dataInDatabase
  // scrolling,
  // emptyDateOrProject,
  // tastksCell,
  // projectCell,
  // dateCell,
  // hoursCell
})
