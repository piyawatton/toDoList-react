import React, {Component} from 'react';

class Footer extends Component{
    constructor(props){
        super(props);
        this.state = {
            time : 0
        }
        setInterval(()=>{
            this.setState({
                time:this.state.time+1
            })
        },1000);
    }

    render(){
        let {time} = this.state;
        let {onTimerClick} = this.props;
        return(
            <div onClick={()=>onTimerClick(time)}>footer  {time}</div>
        );
    }
}

export default Footer;