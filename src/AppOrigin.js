import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom'
// import DatePicker from 'react-datepicker';
import moment from 'moment';
// require('react-datepicker/dist/react-datepicker.css');
//import Infinite from 'react-infinite';
//import InfiniteScroll from 'react-infinite-scroller';
import 'react-date-picker/index.css'
import { DateField } from 'react-date-picker'


//import DatePickerExampleInline from './Datepicker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
// import { SingleDatePicker } from 'react-dates';
// import 'react-dates/lib/css/_datepicker.css';
//https://github.com/zippyui/react-date-picker


class App extends Component {
  rowsInput = [];
  getFilledRowsInDatabase = 30;
  numberOfEmptyRows = 10;
  dateNow = moment(new Date()).format('DD.MM.YYYY');
  heightTbody;
  scrollPosition = 100;
  notAdd = true;
  heightTbodyNow;
  scrollDown;
  changeDetected = false;


  constructor() {
    super()

    for (let i = 0; i < this.getFilledRowsInDatabase; i++) {
        this.rowsInput.push(this.getNewRows(i))
    }
    this.state = {
      rows: this.rowsInput,
      projects: this.projectsArr,
      showDatePicker: false
    }
    this.addEmptyRows();

  }

  static childContextTypes={muiTheme: React.PropTypes.object}

  getChildContext() {
      return {
          muiTheme: getMuiTheme()
      }
  }

  componentDidMount() {
    //TODO : need thinking about
      let tbody = this.refs.myTbody
      let positionOfLastTr = tbody.childNodes[tbody.childNodes.length - this.numberOfEmptyRows].getBoundingClientRect().top - window.innerHeight/2
      tbody.scrollTop=positionOfLastTr;
  }

  componentDidUpdate(){
    if (this.heightTbodyNow !== this.refs.myTbody.scrollHeight && this.changeDetected ) {
      this.scrollDown = this.refs.myTbody.scrollHeight - this.heightTbodyNow
      this.refs.myTbody.scrollTop+=this.scrollDown
      this.changeDetected = false;
    }
    this.inputField && this.inputField.focus();
  }

  showC(){
      this.inputField && this.inputField.focus();
  }


  handlePositionChange() {
    let tbody = this.refs.myTbody
    if (tbody.scrollTop > this.scrollPosition) {
      this.notAdd = true
    }

    if(tbody.scrollTop < this.scrollPosition && this.notAdd) {
      this.heightTbodyNow = tbody.scrollHeight
      this.changeDetected = true;
      this.addNewRowsWhenScrolling()
      this.notAdd = false;
    }
  }

  addNewRowsWhenScrolling () {
    for (let i = 0; i < this.getFilledRowsInDatabase; i++) {
        this.rowsInput.unshift(this.getNewRows(i))
    }
    this.setState({row: this.rowsInput})
  }

  random (arr) {
    return Math.floor(Math.random() * arr.length)
  }

  getNewRows(i) {
    let rows = {
        project : [0,1,2],
        date: ['28.01.2017', '29.01.2017', '02.01.2017', '11.01.2017', '13.01.2017' ],
        tasks: ['one', 'two', 'ten', 'eleven', 'somany'],
        hours: [4,5,6,10]
    }

    let projectName = this.random(rows.project);
    let someDate = this.random(rows.date)
    let tasksName = this.random(rows.project)
    let someHours = this.random(rows.hours)
    return {id: Date.now()+i*400, project:this.projectsArr[projectName].name, date: rows.date[someDate], tasks: rows.tasks[tasksName], hours: rows.hours[someHours] }
  }

  addEmptyRows() {
    for (let i = 0; i < this.numberOfEmptyRows; i++) {
        this.rowsInput.push(this.emptyRows(i,"", "", "", "", true))
    }
  }

  emptyRows(i,project, date, tasks, hours, empty) {
    return {id: Date.now()+((i+1)*56874561), project: "", date: date, tasks: tasks, hours: hours, isNew: empty }
  }

  addOneNewRow() {
    this.rowsInput.push(this.emptyRows(10,"", "", "", "", true))
  }

  detectedPropertyIsNew(row) {
    if(row.isNew) {
      row.isNew = false;
      this.addOneNewRow();
    }
    if (!row.date) {
      row.date = this.dateNow
    }
  }

  searhRowIdInRowsInput(row) {
    let indexOfElem;
    this.rowsInput.forEach((item,index)=> {
      if (item.id === row.id) {
        indexOfElem = index
      }
    })
    return indexOfElem
  }

  renameTask(row) {
    let indexIfTrue =  this.searhRowIdInRowsInput(row)
    if (indexIfTrue) {
      this.setState({row: this.rowsInput[indexIfTrue].editableTask = true})
    }
  }

  hideArea(row, event) {
    let indexIfTrue =  this.searhRowIdInRowsInput(row)
    if (event.target.value) {
      this.detectedPropertyIsNew(row)
    }
    if (indexIfTrue) {
      this.setState({
        row: this.rowsInput[indexIfTrue].editableTask = false,
        row: this.rowsInput[indexIfTrue].tasks = event.target.value
      })
    }
  }

  spendingTime(row) {
    let indexIfTrue =  this.searhRowIdInRowsInput(row)
    if (indexIfTrue) {
      this.setState({row: this.rowsInput[indexIfTrue].editableHours = true})
    }
  }

  hideInputHours(row, event) {
    let indexIfTrue =  this.searhRowIdInRowsInput(row)
    if (event.target.value) {
      this.detectedPropertyIsNew(row)
    }
    if (indexIfTrue) {
      this.setState({
        row: this.rowsInput[indexIfTrue].editableHours = false,
        row: this.rowsInput[indexIfTrue].hours = event.target.value
      })
    }
  }

   changeProject(row) {
    let indexIfTrue =  this.searhRowIdInRowsInput(row)
    if (indexIfTrue) {
      this.setState({row: this.rowsInput[indexIfTrue].selectProject = true})
    }
  }

  hideSelectProjects(row, event) {
    let indexIfTrue =  this.searhRowIdInRowsInput(row)
    if (event.target.value) {
      this.detectedPropertyIsNew(row)
    }
    if (indexIfTrue) {
      this.setState({
        row: this.rowsInput[indexIfTrue].selectProject = false,
        row: this.rowsInput[indexIfTrue].project = event.target.value
      })
    }
  }

  onSelectDate(row,event) {
    this.rowsInput.forEach((item, index) => {
      if (item.id === row.id) {
        this.setState({row: this.rowsInput[index].selectDate = true})
      }
    })
  }

  onChangeDate(row,two,date) {
    console.log(row)
    console.log(date)
    let newDate = moment(date).format('DD.MM.YYYY');
    this.rowsInput.forEach((item, index) => {
      if (item.id === row.id) {
        this.setState({
          row: this.rowsInput[index].selectDate = false,
          row: this.rowsInput[index].date = newDate,
          showDatePicker: false
        })
      }
    })
  }

  hideSelectDate(row) {
    console.log(event)
    this.rowsInput.forEach((item, index) => {
      if (item.id === row.id) {
        console.log("inside")
        this.setState({
          row: this.rowsInput[index].selectDate = false,
          //showDatePicker: false
        })
      }
    })
  }

  someFunc(row) {
    console.log(row);
    console.log("some")
    this.rowsInput.forEach((item, index) => {
      if (item.id === row.id) {
        this.setState({
          row: this.rowsInput[index].selectDate = false,
          showDatePicker: false
        })
      }
    })
  }

  showCalendar() {
    this.setState({showDatePicker: true});
    // this.showC();
    console.log("showCalendar")
  }

  render() {
    return (

      <div className="cont container-fluid">
        <table className="table my-table">

          <thead>
            <tr>
              <th className="project">Project</th>
              <th className="date">Date</th>
              <th className="tasks">Tasks</th>
              <th className="hours">Hours</th>
            </tr>
          </thead>

          <tbody onScroll={this.handlePositionChange.bind(this)} ref = "myTbody">
            {this.state.rows.map((row, index) =>
              <tr className="tr-pointer" key={index}>
                <td onClick={this.changeProject.bind(this, row)}>
                  {row.selectProject ? <select
                                        defaultValue={row.project}
                                        onChange={this.hideSelectProjects.bind(this,row)}
                                        onBlur={this.hideSelectProjects.bind(this, row)}
                                        >
                                        {this.state.projects.map((proj,index)=><option key={index}>{proj.name}</option>)}
                                        </select>
                                         :
                                        <span>
                                          {row.project}
                                        </span>
                                      }
                </td>

                <td onClick={this.onSelectDate.bind(this, row)} >
                  {row.selectDate ? <div  className="input-group my-div">
                                      <input onBlur={this.hideSelectDate.bind(this)} autoFocus type="text" className="input-hours" defaultValue={row.date}></input>
                                      <span className="input-group-btn">
                                        <button className="btn calendat-btn" onClick={this.showCalendar.bind(this)} ><span className="glyphicon glyphicon-calendar" onClick={this.showCalendar.bind(this)}></span></button>
                                        {this.state.showDatePicker ?  <DatePicker
                                                                      className="my-datepicker"
                                                                      id="some"
                                                                      container="inline"
                                                                      onChange={this.onChangeDate.bind(this, row)}
                                                                      onDismiss={this.someFunc.bind(this, row)}
                                                                      dialogContainerStyle={this.thisStyle}
                                                                      ref={(DatePicker)=> {this.inputField = DatePicker}}/>
                                                                      :
                                                                      <span>123</span>}
                                      </span>
                                    </div>



                                    :
                                    <span>{row.date}</span>
                                }

                </td>

                <td  onClick={this.renameTask.bind(this, row)}>
                  {row.editableTask ? <textarea autoFocus rows='1' onBlur={this.hideArea.bind(this, row)} defaultValue={row.tasks}></textarea> : <span>{row.tasks}</span>}
                </td>

                <td onClick={this.spendingTime.bind(this, row)}>
                  {row.editableHours ? <input autoFocus className="input-hours" type="number" onBlur={this.hideInputHours.bind(this, row)} defaultValue={row.hours}></input> : <span>{row.hours}</span>}
                </td>

              </tr>
            )}
          </tbody>
        </table>
      </div>

    );
  }
}

export default App;
