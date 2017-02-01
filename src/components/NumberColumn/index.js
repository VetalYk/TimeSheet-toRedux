import React from 'react';
import { connect } from 'react-redux';
import { editableInputHours } from '../../actions/numberColumn'

class NumberColumn extends React.Component {

  constructor() {
    super()
    this.state = {
      editableHours: false
    }
  }

  spendingTime(row) {
    let indexIfTrue = this.props.searhRowIdInStoreRows(row);
    if (indexIfTrue) {
      row.editableHours = true
      this.setState({editableHours : true})
    }
  }

  hideInputHours(row, event) {
    let indexIfTrue =  this.props.searhRowIdInStoreRows(row)
    if (event.target.value) {
      this.props.detectedPropertyIsNew(row, indexIfTrue)
    }

    if (indexIfTrue) {
      row.editableHours = false;
      this.setState({editableHours: false});
      this.props.onEditableInputHours(indexIfTrue, event.target.value )
    }
  }

  toggleClass(row) {
    this.props.rowsInputWhenCellIsObject.forEach((item, position)=>{
      item.forEach((i, index) => {
        if (i.active) {
          i.active = false
        }
      })
    })
  row[4].active=true
  this.props.searchActiveProperty(row, null, 4)
  }

  onClick(){
    return this.props.notify(this.props.rowIndex, this.props.columnIndex);
    // {rowIdx: null, columnIdx:null}
  }

  render() {
      return (
        <div  onClick={this.onClick.bind(this)} className='div-in-td'>
          {this.state.editableHours ?
                              <input
                                autoFocus
                                className="input-hours"
                                type="number"
                                onBlur={this.hideInputHours.bind(this, this.props.row)}
                                defaultValue={this.props.hours}></input>
                              :
                              <span>{this.props.hours}</span>
                            }
        </div>

      );
  }
}

// NumberColumn.propTypes = {
//     value: PropTypes.number,
//     name: PropTypes.string
// };

// export default NumberColumn;
export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    onEditableInputHours: (index, newValue) => {
      dispatch(editableInputHours(index, newValue))
    },
}))(NumberColumn);
