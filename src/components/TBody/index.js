import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
// import TextColumn from '../TextColumn';
// import DateColumn from '../DateColumn';
// import NumberColumn from '../NumberColumn';
// import ProjectColumn from '../ProjectColumn';
import { addDateFromDatabase, notToScrolling, infiniteScroll, addingOneNewRow, addProjectIfEmpty, addDateIfEmpty } from '../../actions/tbody';
import _ from 'lodash';
import Cell from '../Cell'

class TBody extends React.Component {

  dateNow = moment(new Date()).format('DD.MM.YYYY');
  // Infinite scrolling
  heightTbody;
  scrollPosition = 50;
  notAdd = true;
  heightTbodyNow;
  scrollDown;
  changeDetected = false;

  rowsInput = [];
  rowsInputWhenCellIsObject = []
  getFilledRowsInDatabase = 30;
  numberOfEmptyRows = 10;
  projectsArr = [
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

  rowId;
  numCell;
  lastLeftCell;

  constructor(props) {
    super(props)

    for (let i = 0; i < this.getFilledRowsInDatabase; i++) {
        this.rowsInput.push(this.getNewRows(i))
    }

    this.addEmptyRows();


    this.state = {
      oneNewRows: true,
      isActive: true,
      selected: null
    }
  }

  onKeyDown(e: SyntheticKeyboardEvent) {
     console.log(123123)
   }

  componentDidMount() {
    this.props.onAddDateFromDatabase(this.rowsInput)
    // this.newRows()

    document.addEventListener('keydown' ,(event) => {
      if (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 37 || event.keyCode == 39) {
        this.searchActiveProperty(event.keyCode)
      }
      if (event.key == 'Tab' || event.key == 'Shift' && event.key == 'Tab') {
        event.preventDefault();
        this.searchActiveProperty(event.key)
      }
    })
  }


  componentDidUpdate() {
    if (this.props.scroll) {
      let tbody = this.refs.myTbody
      let positionOfLastTr = tbody.childNodes[tbody.childNodes.length - this.numberOfEmptyRows].getBoundingClientRect().top - window.innerHeight/2
      tbody.scrollTop=positionOfLastTr;

      this.props.onNotToScrolling();
    }
    if (this.heightTbodyNow !== this.refs.myTbody.scrollHeight && this.changeDetected ) {
      this.scrollDown = this.refs.myTbody.scrollHeight - this.heightTbodyNow
      this.refs.myTbody.scrollTop+=this.scrollDown
      this.changeDetected = false;
    }
    if (this.props.store.length) {

    }
  }

  addEmptyRows() {
    for (let i = 0; i < this.numberOfEmptyRows; i++) {
        this.rowsInput.push(this.emptyRows(i,"", "", "", "", true))
    }
  }

  emptyRows(i,project, date, tasks, hours, empty) {
    return {id: Date.now()+((i+1)*56874561), project: "", date: date, tasks: tasks, hours: hours, isNew: empty }
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

  addOneNewRow() {
    let oneRow = []
    oneRow.push(this.emptyRows(10,"", "", "", "", true))
    this.props.onAddingOneNewRow(oneRow)
    this.setState({oneNewRow:!this.state.oneNewRow})
    oneRow=[]
  }


  detectedPropertyIsNew(row, index) {
    if(row.isNew) {
      row.isNew = false;
      this.addOneNewRow();
    }
    if (!row.date) {
      this.props.onAddDateIfEmpty(this.dateNow, index)
    }
    if (!row.project) {
      this.props.onAddProjectIfEmpty(index)
    }
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
    let infiniteRowsInput = []
    for (let i = 0; i < this.getFilledRowsInDatabase; i++) {
        infiniteRowsInput.push(this.getNewRows(i))
    }
    this.props.onInfiniteScroll(infiniteRowsInput)
    this.setState({selected: {rowIdx: this.state.selected.rowIdx+this.getFilledRowsInDatabase, columnIdx: this.state.selected.columnIdx}})
    infiniteRowsInput = [];
  }

  searhRowIdInStoreRows(row) {
    let indexOfElem;
    this.props.store.forEach((item,index)=> {
      if (item.id === row.id) {
        indexOfElem = index
      }
    })
    return indexOfElem
  }

  searchActiveProperty(keyCode) {

    let newSelected;

    if (keyCode === 38) {
      if (this.state.selected.rowIdx === 0)
        return;
      newSelected = {rowIdx: this.state.selected.rowIdx-1, columnIdx: this.state.selected.columnIdx}
    } else if (keyCode === 40) {
      if (this.state.selected.rowIdx === this.props.store.length-1)
        return;
      newSelected = {rowIdx: this.state.selected.rowIdx+1, columnIdx: this.state.selected.columnIdx}
    } else if (keyCode === 37 || keyCode == 'Shift' && keyCode == 'Tab') {
      if (this.state.selected.columnIdx === 0) {
        newSelected = {rowIdx: this.state.selected.rowIdx-1, columnIdx: this.state.selected.columnIdx+3}
      } else {
        newSelected = {rowIdx: this.state.selected.rowIdx, columnIdx: this.state.selected.columnIdx-1}
      }
    } else if (keyCode === 39 || keyCode === 'Tab') {
      if (this.state.selected.columnIdx === 3) {
        newSelected = {rowIdx: this.state.selected.rowIdx+1, columnIdx: this.state.selected.columnIdx-3}
      } else {
        newSelected = {rowIdx: this.state.selected.rowIdx, columnIdx: this.state.selected.columnIdx+1}
      }
    }
    this.setState({selected: newSelected})
  }

  notify(rowIndex, columnIndex) {
    this.setState({selected:{rowIdx: rowIndex, columnIdx: columnIndex}})
  }

    render() {
      // console.log(this.props.store);
      //onKeyDown={this.onKeyDown} onKeyUp={this.onKeyDown}
        return (
            <tbody onScroll={this.handlePositionChange.bind(this)} ref="myTbody">
              {this.props.store.map((row, index) =>
              <tr key={index} className="tr-pointer">
                <Cell
                  rowIdx={index}
                  columnIdx={0}
                  value={row.project}
                  columnType={'ProjectColumn'}
                  notify={this.notify.bind(this)}
                  selected={this.state.selected}
                  />
                <Cell
                  rowIdx={index}
                  columnIdx={1}
                  value={row.date}
                  columnType={'DateColumn'}
                  notify={this.notify.bind(this)}
                  selected={this.state.selected}
                  />
                <Cell
                  rowIdx={index}
                  columnIdx={2}
                  value={row.tasks}
                  columnType={'TextColumn'}
                  notify={this.notify.bind(this)}
                  selected={this.state.selected}
                  />
                <Cell
                  rowIdx={index}
                  columnIdx={3}
                  value={row.hours}
                  columnType={'NumberColumn'}
                  notify={this.notify.bind(this)}
                  selected={this.state.selected}
                  />
              </tr>
              )}
            </tbody>
        );
      }
}

export default connect(
  state => ({
    store: state.rows,
    scroll: state.scrollTo
  }),
  dispatch => ({
    onAddDateFromDatabase: (rows) => {
      dispatch(addDateFromDatabase(rows))
    },
    onNotToScrolling: () => {
      dispatch(notToScrolling())
    },
    onInfiniteScroll: (rows) => {
      dispatch(infiniteScroll(rows))
    },
    onAddingOneNewRow: (oneRow) => {
      dispatch(addingOneNewRow(oneRow))
    },
    onAddProjectIfEmpty: (index) => {
      dispatch(addProjectIfEmpty(index))
    },
    onAddDateIfEmpty: (date, index) => {
      dispatch(addDateIfEmpty(date, index))
    }
}))(TBody);
