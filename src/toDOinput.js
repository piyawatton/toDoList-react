import React, { Component } from 'react';
import './css/bootstrap.css';
import './css/toDoinput.css';
class ToDoInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Topic: "",
            Detail: ""
        }
        this.addClicked = this.addClicked.bind(this);
    }

    addClicked() {
        let { onAddToDo } = this.props;
        onAddToDo(this.state.Topic);

        this.setState({
            Topic: "",
            Detail: ""
        });
    }

    state = {
        inputText: '',
        listItem: []
    }

    handleChangeText = (event) => {
        this.setState({ inputText: event.target.value });
    }

    render() {
        let { Topic, Detail } = this.state;
        return (
            <div className="card clearfix">
                <div className="to-do-box">
                    <h1 className="title">To-do-list</h1>
                    <div className="form-box">
                        <input className="input-todo" type="text" onChange={this.handleChangeText}
                            value={this.state.inputText} />
                        <button className="bb-input button">
                            Add
                        </button>
                    </div>
                    <h2>{this.state.inputText}</h2>
                </div>
            </div >
        );
    }
}

export default ToDoInput;