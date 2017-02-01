import React, { Component } from 'react';

import THead from '../../components/THead';
import TBody from '../../components/TBody';

class TimeSheet extends Component {

  render(){
    return (
      <div className="cont container-fluid">
        <table className="table my-table">
            <THead/>
            <TBody/>
        </table>
      </div>
    );
  }
}

export default TimeSheet
