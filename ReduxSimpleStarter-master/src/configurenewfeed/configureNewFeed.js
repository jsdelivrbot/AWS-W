import React, {Component} from 'react';
import {Tab, Row, Col, Nav, NavItem} from 'react-bootstrap';
import axios from 'axios';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import TimePicker from 'react-bootstrap-time-picker';
import Modal from 'react-modal';
import customStyles from './modalStyle';

export default class ConfigureNewFeed extends Component {
    constructor(props) {
        super(props);
        this.initialFeedDetails = {
                feedId : "",
                feedName: "",
                feedSubject : "",
                feedTarget : "",
                feedFrequency : "",
                feedWeekday: "12:00 PM",
                feedWeekend : "12:00 PM",
                feedUsHoliday : "12:00 PM",
                vendorSrcDataPoint : "",
                resourcePath : "",
                filePattern : "",
                fileFormat : "",
                noOfFiles : "",
                failureTolerance : "",
                retentionPeriod : "",
                tokenFile : "No",
                loadingMode : "",
                extTablePush : "No",
                tableNameCredentials: "",
                compression : "No",
                encryption : "No",
                feedNotificationSubscription : "",
                dataControl : ""

        };
        this.state = {
            modalIsOpen: false,
            modalMessage:"",
            modalTitle:"",
            formDirty: false,
            errors: {
                required: " *",
                failureToleranceRangeError : " Range in between 1 to 100"
            },
            feedWeekdayTime: {hour:12,minute:0},
            feedDetails: this.initialFeedDetails
        };


        this.updateState = this.updateState.bind(this);
        this.saveFeedDetails = this.saveFeedDetails.bind(this);
        this.getFeed = this.getFeed.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }
    closeModal() {
        //this.setState(this.initialState);
       this.setState({modalIsOpen: false});
    }

    formValid() {
        return this.state.feedDetails.feedId.toString().trim().length
            && this.state.feedDetails.feedName.toString().trim().length
            && this.state.feedDetails.feedSubject.toString().trim().length
            && this.state.feedDetails.feedTarget.toString().trim().length
            && this.state.feedDetails.vendorSrcDataPoint.toString().trim().length
            && this.state.feedDetails.resourcePath.toString().trim().length
            && this.state.feedDetails.filePattern.toString().trim().length
            && this.state.feedDetails.feedFrequency.toString().trim().length
            && this.state.feedDetails.fileFormat.toString().trim().length
            && this.state.feedDetails.noOfFiles.toString().trim().length
            && this.state.feedDetails.failureTolerance.toString().trim().length
            && this.state.feedDetails.retentionPeriod.toString().trim().length
            && this.state.feedDetails.loadingMode.toString().trim().length
            && this.state.feedDetails.tableNameCredentials.toString().trim().length
            && this.state.feedDetails.feedNotificationSubscription.toString().trim().length
            && this.state.feedDetails.dataControl.toString().trim().length
    }

    checkFieldValidation(name){
        let error;
        switch(name){
            case 'failureTolerance':
                const failureTolerance = this.state.feedDetails.failureTolerance;
                error = this.state.formDirty && (failureTolerance>100 || failureTolerance<0)
                    && this.state.errors.failureToleranceRangeError;
            default:
                error = error || this.state.formDirty
                    && (!this.state.feedDetails[name].toString().trim().length || this.state.feedDetails[name].toString() === 'Select')
                    && this.state.errors.required;
        }
        return error;

    }

    saveFeedDetails = (event) => {

        this.setState({formDirty: true});

        if (this.formValid()) {
            const request = axios.post("/api/saveNewFeed",this.state.feedDetails);
            request.then(res => {
                this.openModal();
                this.setState({modalMessage:"Your Feed Id is "+res.data.feedId});
                this.setState({modalTitle:"Feed created successfully"});
                this.setState(Object.assign(this.state.feedDetails,{
                    feedId : "",
                    feedName: "",
                    feedSubject : "",
                    feedTarget : "",
                    feedFrequency : "",
                    feedWeekday: "12:00 PM",
                    feedWeekend : "12:00 PM",
                    feedUsHoliday : "12:00 PM",
                    vendorSrcDataPoint : "",
                    resourcePath : "",
                    filePattern : "",
                    fileFormat : "",
                    noOfFiles : "",
                    failureTolerance : "",
                    retentionPeriod : "",
                    tokenFile : "No",
                    loadingMode : "",
                    extTablePush : "No",
                    tableNameCredentials: "",
                    compression : "No",
                    encryption : "No",
                    feedNotificationSubscription : "",
                    dataControl : ""

                }));
                this.setState({formDirty: false});
                console.log(res);

            }).catch(err=> {
                this.openModal();
                this.setState({modalTitle: "Feed Not Created"});
                this.setState({modalMessage: "Feed Error"});

            });
        }

    }

    getFeed(feedId)
    {
        const request = axios.get('/api/getFeed?feedId='+feedId);
        request.then(res => {
            let data = Object.assign(({},res.data));
            this.setState({feedDetails:data.Item});
            this.setState({feedWeekdayTime:this.formatTimeObject(data.feedWeekday)});

        })

    }
    formatTimeObject(time)
    {


        let indexOfColon = time.indexOf(":");

        let hour = time.substring(0,indexOfColon);

        let minute = time.substring(indexOfColon+1,indexOfColon+3);

        let amorpm = time.substring(time.length-2);

        hour = hour && amorpm === "PM" ? +hour+12:hour;


        return {
            hour:parseInt(hour),
            minute:parseInt(minute)
        };
    }

    componentDidUpdate(prevProps){

        if(prevProps.selectedFeedId!=this.props.selectedFeedId && this.props.selectedFeedId){

            this.getFeed(this.props.selectedFeedId);
        }
    }

    feedWeekdayChange(time) {
        this.setState(Object.assign(this.state.feedDetails, {feedWeekday: this.formatTime(time)}));
    }

    feedWeekendChange(time) {
        this.setState(Object.assign(this.state.feedDetails, {feedWeekend: this.formatTime(time)}));

    }

    feedUsHolidayMe(time) {
        this.setState(Object.assign(this.state.feedDetails, {feedUsHoliday: this.formatTime(time)}));

    }


    formatTime(time) {
        const hour = parseInt(time/3600);

        const amorpm = hour < 12 ? ' AM' : ' PM';
        const minute = parseInt((time%3600)/60);
        const formattedMinute = minute < 10 ? '0' + minute.toString() : minute.toString();
        return hour.toString() + ':' + formattedMinute + amorpm;
    }
    updateState(e) {

        this.setState(Object.assign(this.state.feedDetails, {[e.target.name]: e.target.value}));


    }

    render() {
        const {} = this.props;
        return (

            <div>
                <Form>

                    <div className="feedForm">

                        <Row className ="p-5">
                            <Col sm={3}>
                                <label className="fontweightClass">Feed ID:</label>
                            </Col>
                            <Col sm={3}>
                                <input className={"boxBorder inputRadius"+(this.checkFieldValidation('feedId') ? " error inputRadius" : "") } name="feedId" value={this.state.feedDetails.feedId}
                                       onChange={this.updateState} type="number"/>
                                <span className='errorText'>{this.checkFieldValidation('feedId')}</span>

                            </Col>
                            <Col sm={3}>
                                <label className="fontweightClass">Feed Name:</label>
                            </Col>
                            <Col sm={3}>
                                <input className={"boxBorder inputRadius"+(this.checkFieldValidation('feedName') ? " error inputRadius" : "") } name="feedName"
                                       value={this.state.feedDetails.feedName} onChange={this.updateState} type="text"/>
                                <span className='errorText'>{this.checkFieldValidation('feedName')}</span>
                            </Col>
                        </Row>

                        <Row className ="p-5">
                            <Col sm={3}>
                                <label className="fontweightClass">Feed Subject:</label>
                            </Col>
                            <Col sm={3}>
                                <input className={"boxBorder inputRadius"+(this.checkFieldValidation('feedSubject') ? " error inputRadius" : "") } name="feedSubject"
                                       value={this.state.feedDetails.feedSubject} onChange={this.updateState}
                                       type="text"/>
                                <span className='errorText'>{this.checkFieldValidation('feedSubject')}</span>
                            </Col>
                            <Col sm={3}>
                                <label className="fontweightClass">Feed Target:</label>
                            </Col>
                            <Col sm={3}>
                                <input className={"boxBorder inputRadius"+(this.checkFieldValidation('feedTarget') ? " error inputRadius" : "") } name="feedTarget"
                                       value={this.state.feedDetails.feedTarget} onChange={this.updateState}
                                       type="text"/>
                                <span className='errorText'>{this.checkFieldValidation('feedTarget')}</span>
                            </Col>
                        </Row>
                        <Row className ="p-5">
                            <Col sm={3}>
                                <label className="fontweightClass">Feed Weekday SLA:</label>
                            </Col>
                            <Col sm={3}>
                                <TimePicker className="timBoxBorder w-200" name="feedWeekday" onChange={this.feedWeekdayChange.bind(this)} value={this.state.feedDetails.feedWeekday}/>
                            </Col>
                            <Col sm={3}>
                                <label className="fontweightClass">Feed Weekend SLA</label>
                            </Col>
                            <Col sm={3}>
                                <TimePicker className="timBoxBorder w-200" name="feedWeekend" onChange={this.feedWeekendChange.bind(this)} value={this.state.feedDetails.feedWeekend}/>

                            </Col>

                        </Row>
                        <Row className ="p-5">
                            <Col sm={3}>
                                <label className="fontweightClass">Feed US Holiday SLA:</label>
                            </Col>
                            <Col sm={3}>
                                <TimePicker className="timBoxBorder w-200" name="feedUsHoliday" onChange={this.feedUsHolidayMe.bind(this)} value={this.state.feedDetails.feedUsHoliday}/>

                            </Col>
                            <Col sm={3}>
                                <label className="fontweightClass">Vendor Source Data End Point:</label>
                            </Col>
                            <Col sm={3}>
                                <input className={"boxBorder inputRadius"+(this.checkFieldValidation('vendorSrcDataPoint') ? " error inputRadius" : "") } type="text" name="vendorSrcDataPoint"
                                       value={this.state.feedDetails.vendorSrcDataPoint} onChange={this.updateState}/>
                                <span className='errorText'>{this.checkFieldValidation('vendorSrcDataPoint')}</span>

                            </Col>

                        </Row>
                        <Row className="p-5">
                            <Col sm={3}>
                                <label className="fontweightClass">Resource Path:</label>
                            </Col>
                            <Col sm={3}>
                                <input className={"boxBorder inputRadius"+(this.checkFieldValidation('resourcePath') ? " error inputRadius" : "") } type="text" name="resourcePath"
                                       value={this.state.feedDetails.resourcePath} onChange={this.updateState}/>
                                <span className='errorText'>{this.checkFieldValidation('resourcePath')}</span>
                            </Col>
                            <Col sm={3}>
                                <label className="fontweightClass">File Name Pattern:</label>
                            </Col>
                            <Col sm={3}>
                                <input className={"boxBorder inputRadius"+(this.checkFieldValidation('filePattern') ? " error inputRadius" : "") } type="text" name="filePattern"
                                       value={this.state.feedDetails.filePattern} onChange={this.updateState}/>
                                <span className='errorText'>{this.checkFieldValidation('filePattern')}</span>

                            </Col>

                        </Row>
                        <Row className="p-5">
                            <Col sm={3}>
                                <label className="fontweightClass">Feed Frequency:</label>
                            </Col>
                            <Col sm={3}>
                                <select className={"boxBorder inputRadius w-200 h-31"+(this.checkFieldValidation('feedFrequency') ? " error inputRadius w-200 h-31" : "") } name="feedFrequency"
                                        value={this.state.feedDetails.feedFrequency} onChange={this.updateState}>
                                    <option value="Select">Select</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quaterly">Quaterly</option>
                                </select>
                                <span className='errorText'>{this.checkFieldValidation('feedFrequency')}</span>
                            </Col>
                            <Col sm={3}>
                                <label className="fontweightClass">File Format:</label>
                            </Col>
                            <Col sm={3}>
                                <select className={"boxBorder inputRadius w-200 h-31"+(this.checkFieldValidation('fileFormat') ? " error inputRadius w-200 h-31" : "") } name="fileFormat"
                                        value={this.state.feedDetails.fileFormat} onChange={this.updateState}>
                                    <option value="Select">Select</option>
                                    <option value="Delimited Text">Delimited Text</option>
                                    <option value="JSON">JSON</option>
                                    <option value="XML Delimeter">XML Delimiter</option>
                                    <option value="Header/footer flag">Header/footer flag</option>
                                </select>
                                <span className='errorText'>{this.checkFieldValidation('fileFormat')}</span>

                            </Col>

                        </Row>
                        <Row className="p-5">
                            <Col sm={3}>
                                <label className="fontweightClass">No Of Files(in number):</label>
                            </Col>
                            <Col sm={3}>
                                <input className={"boxBorder inputRadius"+(this.checkFieldValidation('noOfFiles') ? " error inputRadius" : "") } type="number" name="noOfFiles"
                                       value={this.state.feedDetails.noOfFiles} onChange={this.updateState}/>
                                <span className='errorText'>{this.checkFieldValidation('noOfFiles')}</span>
                            </Col>
                            <Col sm={3}>
                                <label className="fontweightClass">Load Record Failure Tolerance:</label>
                            </Col>
                            <Col sm={3}>
                                <input className={"boxBorder inputRadius"+(this.checkFieldValidation('failureTolerance') ? " error inputRadius" : "") } type="number" name="failureTolerance"
                                       value={this.state.feedDetails.failureTolerance} onChange={this.updateState}/>
                                <span className='errorText'>{this.checkFieldValidation('failureTolerance')}</span>
                            </Col>

                        </Row>

                        <Row className="p-5">
                            <Col sm={3}>
                                <label className="fontweightClass">Rentention Period(in days):</label>
                            </Col>
                            <Col sm={3}>
                                <input className={"boxBorder inputRadius"+(this.checkFieldValidation('retentionPeriod') ? " error inputRadius" : "") } type="number" name="retentionPeriod"
                                       value={this.state.feedDetails.retentionPeriod} onChange={this.updateState}/>
                                <span className='errorText'>{this.checkFieldValidation('retentionPeriod')}</span>
                            </Col>
                            <Col sm={3}>
                                <label className="fontweightClass">Token File:</label>
                            </Col>
                            <Col sm={3}>
                                <input type="radio" name="tokenFile" value="Yes"
                                       checked={this.state.feedDetails.tokenFile === 'Yes'}
                                       onChange={this.updateState}>Yes</input>
                                <input type="radio" name="tokenFile" value="No"
                                       checked={this.state.feedDetails.tokenFile === 'No'}
                                       onChange={this.updateState}>No</input>
                            </Col>

                        </Row>
                        <Row className="p-5">
                            <Col sm={3}>
                                <label className="fontweightClass">Loading Mode:</label>
                            </Col>
                            <Col sm={3}>
                                <select className={"boxBorder inputRadius w-200 h-31"+(this.checkFieldValidation('loadingMode') ? " error inputRadius w-200 h-31" : "") } name="loadingMode"
                                        value={this.state.feedDetails.loadingMode} onChange={this.updateState}>
                                    <option value="Select">Select</option>
                                    <option value="Incremental">Incremental</option>
                                    <option value="Merge">Merge</option>
                                    <option value="Truncate/Reload">Truncate/Reload</option>
                                </select>
                                <span className='errorText'>{this.checkFieldValidation('loadingMode')}</span>

                            </Col>
                            <Col sm={3}>
                                <label className="fontweightClass">External Table Push:</label>
                            </Col>
                            <Col sm={3}>
                                <input type="radio" name="extTablePush" value="Yes"
                                       checked={this.state.feedDetails.extTablePush === 'Yes'}
                                       onChange={this.updateState}>Yes</input>
                                <input type="radio" name="extTablePush" value="No"
                                       checked={this.state.feedDetails.extTablePush === 'No'}
                                       onChange={this.updateState}>No</input>

                            </Col>

                        </Row>

                        <Row className="p-5">
                            <Col sm={3}>
                                <label className="fontweightClass">Table Name and Login Credentials:</label>
                            </Col>
                            <Col sm={3}>
                                <input className={"boxBorder inputRadius"+(this.checkFieldValidation('tableNameCredentials') ? " error inputRadius" : "") } type="text" name="tableNameCredentials"
                                       value={this.state.feedDetails.tableNameCredentials} onChange={this.updateState}/>
                                <span className='errorText'>{this.checkFieldValidation('tableNameCredentials')}</span>
                            </Col>
                            <Col sm={3}>
                                <label className="fontweightClass">Compression:</label>
                            </Col>
                            <Col sm={3}>
                                <input type="radio" name="compression" value="Yes"
                                       checked={this.state.feedDetails.compression === 'Yes'}
                                       onChange={this.updateState}>Yes</input>
                                <input type="radio" name="compression" value="No"
                                       checked={this.state.feedDetails.compression === 'No'}
                                       onChange={this.updateState}>No</input>

                            </Col>

                        </Row>

                        <Row className="p-5">
                            <Col sm={3}>
                                <label className="fontweightClass">Encryption:</label>
                            </Col>
                            <Col sm={3}>
                                <input type="radio" name="encryption" value="Yes" checked={this.state.feedDetails.encryption === 'Yes'} onChange={this.updateState}>Yes</input>
                                <input type="radio" name="encryption" value="No" checked={this.state.feedDetails.encryption === 'No'} onChange={this.updateState} >No</input>

                            </Col>
                            <Col sm={3}>
                                <label className="fontweightClass">Feed Notification Subscription:</label>
                            </Col>
                            <Col sm={3}>
                                <input className={"boxBorder inputRadius"+(this.checkFieldValidation('feedNotificationSubscription') ? " error inputRadius" : "") } type="text" name="feedNotificationSubscription"
                                       value={this.state.feedDetails.feedNotificationSubscription}
                                       onChange={this.updateState}/>
                                <span className='errorText'>{this.checkFieldValidation('feedNotificationSubscription')}</span>

                            </Col>

                        </Row>

                        <Row className="p-5">
                            <Col sm={3}>
                                <label className="fontweightClass">Data Access Control:</label>
                            </Col>
                            <Col sm={3}>
                                <input className={"boxBorder inputRadius"+(this.checkFieldValidation('dataControl') ? " error inputRadius" : "") } type="text" name="dataControl"
                                       value={this.state.feedDetails.dataControl} onChange={this.updateState}/>
                                <span className='errorText'>{this.checkFieldValidation('dataControl')}</span>
                            </Col>
                            <Col sm={3}>
                                <label className="fontweightClass">FILE DETAILS:</label>
                            </Col>
                            <Col sm={3}>
                                <input className="boxBorder inputRadius" type="text"/>
                            </Col>

                        </Row>

                        <Row>
                            <Col sm={12}>
                                <input type="button" onClick={this.saveFeedDetails.bind(this)} value="SAVE"
                                       className="buttonStyle m-5top m-15right boxBorder indexColor fontweightClass colorFileDetails buttonStyling"/>

                            </Col>

                        </Row>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                            style={customStyles}>
                            <div>
                            {this.state.modalTitle}
                            </div>
                            <div>
                                {this.state.modalMessage}
                            </div>
                            <input type="button" onClick={this.closeModal.bind(this)} value="CLOSE"
                                   className="buttonStyle m-5top m-15right boxBorder indexColor fontweightClass colorFileDetails buttonStyling" />
                        </Modal>
                    </div>

                </Form>
            </div>


        );
    }


}
