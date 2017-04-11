import React, { Component } from 'react';
import ToDoItem from './ToDoItem';

class ToDoList extends Component {

    render() {
        let { items, detail } = this.props;
        return (
            <div>
                <ul>
                    {
                        items.map((todo, i, detail) => <li key={i}><ToDoItem text={todo} des={detail} /></li>)
                    }
                </ul>
            </div>
        );
    }
}

export default ToDoList;