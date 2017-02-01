import React from 'react';
import TextColumn from '../TextColumn';
import DateColumn from '../DateColumn';
import NumberColumn from '../NumberColumn';
import ProjectColumn from '../ProjectColumn';

function RenderCell(props) {
  if (props.columnType === 'ProjectColumn') {
    return <ProjectColumn project={props.value} rowIndex={props.rowIndex} columnIndex={props.columnIndex} notify={props.notify}/>
  } else if (props.columnType === 'DateColumn') {
    return <DateColumn date={props.value} rowIndex={props.rowIndex} columnIndex={props.columnIndex} notify={props.notify}/>
  } else if (props.columnType === 'TextColumn') {
    return <TextColumn tasks={props.value} rowIndex={props.rowIndex} columnIndex={props.columnIndex} notify={props.notify}/>
  } else if (props.columnType === 'NumberColumn') {
    return <NumberColumn hours={props.value} rowIndex={props.rowIndex} columnIndex={props.columnIndex} notify={props.notify}/>
  }
}

class Cell extends React.Component {
  constructor() {
    super()
  }

  isActive() {
    if (!this.props.selected) {
      return false;
    }
    // {rowIdx: null, columnIdx:null}
    return this.props.selected.rowIdx === this.props.rowIdx && this.props.selected.columnIdx === this.props.columnIdx;
  }


  render() {
    return(
      <td className={this.isActive() ? 'active' : null}>
        <RenderCell columnType={this.props.columnType}
                    value={this.props.value}
                    rowIndex={this.props.rowIdx}
                    columnIndex={this.props.columnIdx}
                    notify={this.props.notify}
                    />
      </td>
    )
  }
}

export default Cell
