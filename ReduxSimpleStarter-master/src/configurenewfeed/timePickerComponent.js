import React, {Component} from 'react';
import TimePicker from 'react-dropdown-timepicker';

class TimePickerComponent extends React.Component
 {
 render()

 {

 return (
 <div><TimePicker className="boxBorder" displayFormat="12-hour" className='boxBorder'
     time={this.props.time} onChange={this.props.onChange}/></div>
     )
}}

export default TimePickerComponent;