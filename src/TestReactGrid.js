// //const ReactDataGrid = require('react-data-grid');
// // const exampleWrapper = require('../components/exampleWrapper');
// const React = require('react');
// import ReactDOM from 'react-dom';
// import './testGrid.css'
//
// const Example = React.createClass({
//   getInitialState() {
//     this._columns = [
//       {
//         key: 'id',
//         name: 'ID',
//         width: 80
//       },
//       {
//         key: 'task',
//         name: 'Title',
//         editable: true
//       },
//       {
//         key: 'priority',
//         name: 'Priority',
//         editable: true
//       },
//       {
//         key: 'issueType',
//         name: 'Issue Type',
//         editable: true
//       },
//       {
//         key: 'complete',
//         name: '% Complete',
//         editable: true
//       },
//       {
//         key: 'startDate',
//         name: 'Start Date',
//         editable: true
//       },
//       {
//         key: 'completeDate',
//         name: 'Expected Complete',
//         editable: true
//       }
//     ];
//
//     return { rows: this.createRows(100) };
//   },
//
//   getRandomDate(start, end) {
//     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
//   },
//
//   createRows(numberOfRows) {
//     let rows = [];
//     for (let i = 1; i < numberOfRows; i++) {
//       rows.push({
//         id: i,
//         task: 'Task ' + i,
//         complete: Math.min(100, Math.round(Math.random() * 110)),
//         priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
//         issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
//         startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
//         completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))
//       });
//     }
//     return rows;
//   },
//
//   rowGetter(i) {
//     return this.state.rows[i];
//   },
//
//   handleRowUpdated({ rowIdx, updated }) {
//     // merge updated row with current row and rerender by setting state
//     const rows = this.state.rows;
//     Object.assign(rows[rowIdx], updated);
//     this.setState({rows: rows});
//   },
//
//   // handlePositionChange() {
//   //   console.log(123);
//   // },
//   render() {
//     return  (
//       <div>
//       <ReactDataGrid
//         enableCellSelect={true}
//         columns={this._columns}
//         rowGetter={this.rowGetter}
//         rowsCount={this.state.rows.length}
//         minHeight={950}
//         onRowUpdated={this.handleRowUpdated} />
//       </div>
//   )}
// });
