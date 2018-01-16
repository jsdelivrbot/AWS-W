import React, {Component} from 'react';
import TimePicker from 'react-dropdown-timepicker';

class TimePickerComponent extends React.Component
 {

 constructor(props) {
         super(props);
         this.state = {
         feedTime: props.time

         }
         }

componentDidUpdate(prevProps)
{
 if(prevProps.time!=this.props.time){
 let newTime = new Date();
 newTime.setHours(this.props.time.hours);
 newTime.setMinutes(this.props.time.minutes);
                this.setState({feedTime: newTime})
               // alert("Gagan Holani",this.props.time);
                console.log("Gagan Holani",this.props.time);
}
}
 render()
 {

 return (
 <div><TimePicker className="boxBorder" displayFormat="12-hour" className='boxBorder'
     time={this.state.feedTime} onChange={this.props.onChange}/></div>
     )
}}

export default TimePickerComponent;