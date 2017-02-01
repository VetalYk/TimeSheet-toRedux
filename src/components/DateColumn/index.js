import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
//import DatePickerExampleInline from './Datepicker'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
// import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { selectNewDate } from '../../actions/dateColumn'
injectTapEventPlugin();



class DateColumn extends React.Component {

  constructor() {
    super()

    this.state = {
      selectDate: false,
      showDatePicker: false
    }
  }

  static childContextTypes={muiTheme: React.PropTypes.object}
  getChildContext() {
      return {
          muiTheme: getMuiTheme()
      }
  }
  componentDidUpdate() {
    this.inputField && this.inputField.focus();
  }



  onSelectDate(row) {
    let indexIfTrue = this.props.searhRowIdInStoreRows(row);
    if (indexIfTrue) {
      row.selectDate = true
      this.setState({selectDate : true})
    }
  }

  showCalendar() {
    this.setState({showDatePicker: true});
  }

  onChangeDate(row,two,date) {
    let newDate = moment(date).format('DD.MM.YYYY');
    let indexIfTrue = this.props.searhRowIdInStoreRows(row);

    if (date) {
      this.props.detectedPropertyIsNew(row, indexIfTrue)
    }

    if (indexIfTrue) {
      row.selectDate = false
      this.setState({
        showDatePicker: false,
        selectDate : false
      })
      this.props.onSelectNewDate(indexIfTrue, newDate)
    }
  }

  inputNewDate(row, event) {
    if (event.key === 'Enter') {
      let indexIfTrue = this.props.searhRowIdInStoreRows(row);

      if (indexIfTrue) {
        row.selectDate = false
        this.setState({
          selectDate : false
        })
        this.props.onSelectNewDate(indexIfTrue, event.target.value)
      }
    }
  }

  someFunc(row) {
    this.rowsInput.forEach((item, index) => {
      if (item.id === row.id) {
        row.selectDate = false
        this.setState({
          showDatePicker: false,
          selectDate : false
        })
      }
    })
  }

  toggleClass(row) {
      this.props.rowsInputWhenCellIsObject.forEach((item, position)=>{
        item.forEach((i, index) => {
          if (i.active) {
            i.active = false
          }
        })
      })
    row[2].active=true
    this.props.searchActiveProperty(row, null, 2)
  }


  onClick(){
    return this.props.notify(this.props.rowIndex, this.props.columnIndex);
    // {rowIdx: null, columnIdx:null}
  }
    render() {
      // console.log(this.props.row)
        return (
          <div  onClick={this.onClick.bind(this)} className='div-in-td'>
            {this.state.selectDate ? <div  className="input-group my-div">
                                <input autoFocus type="text" className="input-hours" defaultValue={this.props.row[2].date} onKeyPress={this.inputNewDate.bind(this,this.props[2].row)}></input>
                                <span className="input-group-btn">
                                  <button className="btn calendat-btn" onClick={this.showCalendar.bind(this)}><span className="glyphicon glyphicon-calendar" onClick={this.showCalendar.bind(this)}></span></button>
                                  {this.state.showDatePicker ?  <DatePicker
                                                                className="my-datepicker"
                                                                id="some"
                                                                container="inline"
                                                                onChange={this.onChangeDate.bind(this, this.props.row)}
                                                                onDismiss={this.someFunc.bind(this, this.props.row)}
                                                                ref={(DatePicker)=> {this.inputField = DatePicker}}/>
                                                                :
                                                                <span>some</span>}
                                </span>
                              </div>
                              :
                              <span>{this.props.date}</span>
                          }
          </div>

        );
    }
}

// DateColumn.propTypes = {
//     value: PropTypes.date,
//     name: PropTypes.string
// };

//export default DateColumn;
export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    onSelectNewDate: (index, newValue)=> {
      dispatch(selectNewDate(index, newValue))
    }
  }))(DateColumn);
