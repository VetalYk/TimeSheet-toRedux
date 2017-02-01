import React from 'react';

class THead extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <thead>
                <tr>
                    <th className="project">Project</th>
                    <th className="date">Date</th>
                    <th className="tasks">Tasks</th>
                    <th className="hours">Hours</th>
                </tr>
            </thead>
        );
    }
}

export default THead;
