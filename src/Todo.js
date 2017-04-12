import React, { Component } from 'react';

import './css/bootstrap.css';
import './css/toDoinput.css'
export class Todo extends Component {

    state = {
        filter: 'all',
        EditingItem: 0,
        inputTopic: '',
        inputDetail: '',
        datetime: '',
        complete: false,
        isEdit: false,
        listItem: []
    }

    constructor(props) {
        super(props);
        if (localStorage !== "undefined") {
            let tempList = [];
            let keys = Object.keys(localStorage);
            console.log(keys);
            for (var i = 0; i <= keys.length; i++) {
                console.log(localStorage.getItem(keys[i]));
                if (localStorage.getItem(keys[i]) != null) {
                    tempList.push(JSON.parse(localStorage.getItem(keys[i])));
                }
            }
            this.state = {
                listItem: tempList
            }

        } else {

        }
        // console.log(localStorage.getItem(0));

    }

    handleChangeTopic = (event) => {
        this.setState({ inputTopic: event.target.value });
    }

    handleChangeDetail = (event) => {
        this.setState({ inputDetail: event.target.value });
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.submitList();
        }
    }

    getCurrentIndex = () => {
        return this.state.listItem.length;
    }

    submitList = () => {
        let now = new Date();
        let temp = this.state.listItem;
        let newIndex = 0;
        if (temp.length > 0) {
            newIndex = temp[temp.length - 1].ID + 1;
        }
        temp.push({ ID: newIndex, Topic: this.state.inputTopic, Des: this.state.inputDetail, Datetime: now, Complete: false, isEdit: false });
        this.setState({
            listItem: temp,
            inputTopic: '',
            inputDetail: '',
            datetime: '',
            isEdit: false,
            complete: false
        })
        localStorage.setItem(newIndex, JSON.stringify(temp[temp.length - 1]));
    }

    deleteListAtIndex = (index) => {
        const resule = this.state.listItem;
        localStorage.removeItem(resule[index].ID);
        this.state.listItem.splice(index, 1);
        this.setState({
            listItem: resule
        });
        console.log(this.state.listItem);
    }

    editEventListAtIndex = (index) => {
        const tempListItem = this.state.listItem;
        tempListItem[index].isEdit = !this.state.listItem[index].isEdit;
        this.setState({
            EditingItem: this.state.EditingItem + 1,
            inputTopic: tempListItem[index].Topic,
            inputDetail: tempListItem[index].Des,
            listItem: tempListItem
        });
    }

    cancelListAtIndex = (index) => {
        const tempListItem = this.state.listItem;
        tempListItem[index].isEdit = !this.state.listItem[index].isEdit;
        this.setState({
            EditingItem: this.state.EditingItem - 1,
            listItem: tempListItem
        })
    }

    updateListAtIndex = (index) => {
        const tempListItem = this.state.listItem;
        tempListItem[index].Topic = this.state.inputTopic;
        tempListItem[index].Des = this.state.inputDetail;
        tempListItem[index].isEdit = !this.state.listItem[index].isEdit;
        this.setState({
            inputTopic: '',
            inputDetail: '',
            datetime: '',
            EditingItem: this.state.EditingItem - 1,
            listItem: tempListItem
        });

        localStorage.setItem(tempListItem[index].ID, JSON.stringify(this.state.listItem[index]));
    }

    checkedItem = (index) => {
        const tempListItem = this.state.listItem;
        tempListItem[index].Complete = !this.state.listItem[index].Complete;
        this.setState({
            listItem: tempListItem
        });
        localStorage.setItem(tempListItem[index].ID, JSON.stringify(this.state.listItem[index]));
    }

    filter = (event) => {
        this.setState({
            filter: event.target.value
        });
    }

    render() {

        return (
            <div className="card clearfix">
                <div className="to-do-box">
                    <h1 className="title">To-do-list</h1>
                    <div className="form-box">
                        <textarea className="input-todo"
                            type="text"
                            onChange={this.handleChangeTopic}
                            value={this.state.EditingItem > 0 ? "" : this.state.inputTopic}
                            onKeyPress={this.handleKeyPress}
                            placeholder="Topic"
                        />
                        <br />
                        <textarea id="detail" className="input-todo"
                            type="text"
                            onChange={this.handleChangeDetail}
                            value={this.state.EditingItem > 0 ? "" : this.state.inputDetail}
                            onKeyPress={this.handleKeyPress}
                            placeholder="Detail"
                        />
                        <br />
                        <button className="bb-input button" onClick={this.submitList}>Add</button>
                        <br />
                        <div className="ckb_filter">
                            <input type="radio" name="filter" value="All" onClick={this.filter} /><span>all  </span>
                            <input type="radio" name="filter" value="Complete" onClick={this.filter} /><span>Complete  </span>
                            <input type="radio" name="filter" value="Uncomplete" onClick={this.filter} /><span>Uncomplete</span>
                        </div>
                    </div>

                    <hr />

                    {
                        this.state.listItem.map((value, index) => {
                            let filterCondition = true;
                            if (this.state.filter === "Complete") {
                                if (value.Complete === false) {
                                    filterCondition = false;
                                }
                            } else if (this.state.filter === "Uncomplete") {
                                if (value.Complete === true) {
                                    filterCondition = false;
                                }
                            }
                            if (filterCondition) {
                                let checkedValue = '';
                                let status = "list-item";
                                let showTopic = <h3>{value.ID + ". " + value.Topic}</h3>;
                                let showDetail = <div className="text-list">{value.Des}</div>;
                                let btn_action = <div><div className="bb-edit" onClick={this.editEventListAtIndex.bind(this, index)}><span className="glyphicon glyphicon-pencil" aria-hidden="false"></span></div>
                                    <div className="bb-delete" onClick={this.deleteListAtIndex.bind(this, index)}><span className="glyphicon glyphicon-minus" aria-hidden="false"></span></div></div>;
                                if (value.isEdit) {
                                    showTopic = <input className="input-todo-edit"
                                        type="text"
                                        onChange={this.handleChangeTopic}
                                        value={this.state.inputTopic}
                                        onKeyPress={this.handleKeyPress}
                                    />;
                                    showDetail = <textarea id="detail" className="input-todo"
                                        type="text"
                                        onChange={this.handleChangeDetail}
                                        value={this.state.inputDetail}
                                        onKeyPress={this.handleKeyPress}
                                    />;
                                    btn_action = <div><div className="bb-save" onClick={this.updateListAtIndex.bind(this, index)}><span className="glyphicon glyphicon-ok" aria-hidden="false"></span></div>
                                        <div className="bb-cancel" onClick={this.cancelListAtIndex.bind(this, index)}><span className="glyphicon glyphicon-remove" aria-hidden="false"></span></div></div>;
                                }
                                if (value.Complete) {
                                    status = "list-item-complete";
                                    checkedValue = 'checked';
                                }
                                
                                return (
                                    <div key={index + value.Topic} className={status}>
                                        {/*<div className="text-list">{value.Topic}</div>*/}
                                        <input type="checkbox" className="ckb_action" onClick={this.checkedItem.bind(this, index)} checked={checkedValue} />
                                        {showTopic}
                                        <hr />
                                        {showDetail}
                                        <div className="text-time">{value.Datetime.toLocaleString()}</div>
                                        {btn_action}
                                    </div>
                                );
                            }
                        })
                    }
                </div>
            </div >
        );


    }
}
