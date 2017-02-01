import React from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize'
import { selectNewDate } from '../../actions/textColumn'


class TextColumn extends React.Component {

  lastPickCell;
  constructor() {
    super()

    this.state = {
      editableTask: false,
      isActive: false
    }
  }

  renameTask(event) {
    console.log("renameTask");
    this.setState({editableTask : true})
    // console.log(row);
    // let indexIfTrue = this.props.searhRowIdInStoreRows(row);
    // if (indexIfTrue) {
    //   row.editableTask = true
    //   this.setState({editableTask : true})
    // }
  }

  hideArea(row, event) {
    this.setState({editableTask: false});
    // let indexIfTrue =  this.props.searhRowIdInStoreRows(row)
    // if (event.target.value) {
    //   this.props.detectedPropertyIsNew(row, indexIfTrue)
    // }
    //
    // if (indexIfTrue) {
    //   row.editableTask = false;
    //   this.setState({editableTask: false});
    //   this.props.onEditableInputTask(indexIfTrue, event.target.value )
    // }
  }

  toggleClass(rowIndex,columnIndex  ) {
    this.lastPickCell = rowIndex
    this.setState({isActive: true})
    console.log(rowIndex);
    console.log(columnIndex);
    //   this.props.rowsInputWhenCellIsObject.forEach((item, position)=>{
    //     item.forEach((i, index) => {
    //       if (i.active) {
    //         i.active = false
    //       }
    //     })
    //   })
    // row[3].active=true
    // this.props.searchActiveProperty(row, null, 3)
  }

  onClick(){
    this.renameTask()
    return this.props.notify(this.props.rowIndex, this.props.columnIndex);
  }

  pressArrowKey(event) {
    console.log("pressArrowKey");
    if (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 37 || event.keyCode == 39) {
      this.hideArea()
    }
  }

    render() {
        return (
              <div onDoubleClick={this.renameTask.bind(this)} onClick={this.onClick.bind(this)} className='div-in-td'>
                {this.state.editableTask ?
                                            <TextareaAutosize
                                              autoFocus
                                              rows={1}
                                              className='my-textarea'
                                              onBlur={this.hideArea.bind(this)}
                                              defaultValue={this.props.tasks}
                                              onKeyPress={this.pressArrowKey.bind(this)}
                                              />
                                            :
                                            <span>{this.props.tasks}</span>
                                          }
              </div>
        );
    }
}

// TextColumn.propTypes = {
//     value: PropTypes.string,
//     name: PropTypes.string
// };

//export default TextColumn;
export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    onEditableInputTask: (index, newValue) => {
      dispatch(selectNewDate(index, newValue))
    }
  }))(TextColumn);
