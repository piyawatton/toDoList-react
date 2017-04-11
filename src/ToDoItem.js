import React, {Component} from 'react';

class ToDoItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            done : false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({
            done : !this.state.done
        })
    }

    render(){
        let {text,des} = this.props; 
        return(
            <div key={text + des}>
                <input type="checkbox" value={this.state.done} onClick={this.toggle}/>
                {this.state.done ? "DONE "+text : text}
                <div className="btn">x</div>
            </div>
        );
    }
}

export default ToDoItem;