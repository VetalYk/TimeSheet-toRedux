import React from 'react';
import { connect } from 'react-redux';
import { selectNewDate } from '../../actions/projectColumn'

class ProjectColumn extends React.Component {
  constructor() {
    super()
    this.state = {
      selectProject: false
    }
  }
  changeProject(row) {
    let indexIfTrue = this.props.searhRowIdInStoreRows(row);
    if (indexIfTrue) {
      row.selectProject = true
      this.setState({selectProject : true})
    }
  }

  hideSelectProjects(row, event) {
    let indexIfTrue =  this.props.searhRowIdInStoreRows(row)

    if (event.target.value) {
      this.props.detectedPropertyIsNew(row, indexIfTrue)
    }

    if (indexIfTrue) {
      row.selectProject = false;
      this.setState({selectProject: false});
      this.props.onSelectNewProject(indexIfTrue, event.target.value )
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
    row[1].active=true
    this.props.searchActiveProperty(row, null, 1)
  }

  onClick(){
    return this.props.notify(this.props.rowIndex, this.props.columnIndex);
    // {rowIdx: null, columnIdx:null}
  }
    render() {
      // console.log(this.props);
        return (
          // <td onClick={this.changeProject.bind(this, this.props.row)} onClick={this.toggleClass.bind(this, this.props.row)} className={this.props.row[1].active ? 'active': null} >
          <div  onClick={this.onClick.bind(this)} className='div-in-td'>
            {this.state.selectProject ? <select
                                            autoFocus
                                            defaultValue={this.props.project}
                                            onChange={this.hideSelectProjects.bind(this, this.props.row)}
                                            onBlur={this.hideSelectProjects.bind(this, this.props.row)}
                                            >
                                            {this.props.store.projects.map((proj,index)=><option key={index}>{proj.name}</option>)}
                                            </select>
                                             :
                                            <span>
                                              {this.props.project}
                                            </span>
                                            }
          </div>
          // </td>
        );
    }
}
//
// ProjectColumn.propTypes = {
//     value: PropTypes.date,
//     name: PropTypes.string
// };

//export default ProjectColumn;
export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
  onSelectNewProject: (index, newValue)=> {
    dispatch(selectNewDate(index, newValue))
  }
  }))(ProjectColumn);
