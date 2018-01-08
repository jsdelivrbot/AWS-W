import React, { Component } from 'react';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import axios from 'axios';
import validator from 'react-validation';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

const required = (value) => {
    if (!value.toString().trim().length) {
        // We can return string or jsx as the 'error' prop for the validated Component
        return 'require';
    }
};
export default class ConfigureNewFeed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {},
            feedDetails: {
                feedId: '',
                feedName: '',
                feedSubject: '',
                feedTarget:'',
                feedFrequency: '',
                feedWeekday: '',
                feedWeekend:'',
                feedUsHoliday:'',
                vendorSrcDataPoint:'',
                resourcePath:'',
                filePattern:'',
                fileFormat:'',
                noOfFiles: '',
                failureTolerance: '',
                retentionPeriod: '',
                tokenFile: '',
                loadingMode: '',
                extTablePush: '',
                tableNameCredentials:'',
                compression: '',
                encryption: '',
                feedNotificationSubscription: '',
                dataControl:''

            }
        }

        this.updateState = this.updateState.bind(this);
        this.saveFeedDetails = this.saveFeedDetails.bind(this);
    }


    saveFeedDetails(){
        event.preventDefault();
        // Emulate async API call

        axios.post("http://127.0.0.1:8081/saveNewFeed",this.state.feedDetails);
        setTimeout(() => {
            console.log(this.form);
            this.form.showError(this.userInput, <span>API error</span>);
        }, 1000);

    }

    updateState(e) {

     this.setState(Object.assign(this.state.feedDetails,{[e.target.name]:e.target.value}));

        console.log("gagan",this.state);

    }

    handleSubmit = (event) => {




    }

    removeApiError = () => {
        this.form.hideError(this.userInput);

    }

    render() {
        const {} = this.props;
        return (

            <div>
                <Form ref={c => { this.form = c }} onSubmit={this.saveFeedDetails.bind(this)}>

                <div className="feedForm">

                    <Row>
                        <Col sm={2}>
                            <label className="fontweightClass">Feed ID:</label>
                        </Col>
                        <Col sm={5}>
                            <Input ref={c => { this.userInput = c }} className="boxBorder" name="feedId" value={this.state.feedDetails.feedId} onChange={this.updateState} validations={[required]} type="text" />
                            <span style={{color: "red"}}>{this.state.errors["feedId"]}</span>
                        </Col>
                        <Col sm={3}>
                            <label className="fontweightClass">Feed Name:</label>
                        </Col>
                        <Col sm={2}>
                            <input className="boxBorder w-20" name="feedName" value={this.state.feedDetails.feedName} onChange={this.updateState} type="text" />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={2}>
                            <label className="fontweightClass">Feed Subject:</label>
                        </Col>
                        <Col sm={5}>
                            <input className="boxBorder" name="feedSubject" value={this.state.feedDetails.feedSubject} onChange={this.updateState} type="text" />
                        </Col>
                            <Col sm={3}>
                                <label className="fontweightClass">Feed Target:</label>
                            </Col>
                        <Col sm={2}>
                            <input className="boxBorder w-20" name="feedTarget" value={this.state.feedDetails.feedTarget} onChange={this.updateState} type="text" />
                            </Col>
                    </Row>
                    <Row>
                        <Col sm={2}>
                            <label className="fontweightClass">Feed Weekday SLA:</label>
                        </Col>
                        <Col sm={5}>
                            <input className="boxBorder" name="feedWeekday" value={this.state.feedDetails.feedWeekday} onChange={this.updateState} type="text" />
                        </Col>
                        <Col sm={3}>
                            <label className="fontweightClass">Feed Weekend SLA</label>
                        </Col>
                        <Col sm={2}>
                        <input className="w-20 boxBorder" type="text" name="feedWeekend" value={this.state.feedDetails.feedWeekend} onChange={this.updateState} />
                        </Col>

                    </Row>
                    <Row>
                        <Col sm={2}>
                            <label className="fontweightClass">Feed US Holiday SLA:</label>
                        </Col>
                        <Col sm={5}>
                            <input  name="feedUsHoliday" value={this.state.feedDetails.feedUsHoliday} onChange={this.updateState} className="boxBorder" type="text" />
                        </Col>
                        <Col sm={3}>
                            <label className="fontweightClass">Vendor Source Data End Point:</label>
                        </Col>
                        <Col sm={2}>
                            <input className="w-20 boxBorder" type="text" name="vendorSrcDataPoint" value={this.state.feedDetails.vendorSrcDataPoint} onChange={this.updateState} />
                        </Col>

                    </Row>
                    <Row>
                            <Col sm={2}>
                                <label className="fontweightClass">Resource Path:</label>
                            </Col>
                            <Col sm={5}>
                                <input className="boxBorder" type="text" name="resourcePath" value={this.state.feedDetails.resourcePath} onChange={this.updateState}/>
                            </Col>
                            <Col sm={3}>
                                <label className="fontweightClass">File Name Pattern:</label>
                            </Col>
                            <Col sm={2}>
                                <input className="w-20 boxBorder" type="text" name="filePattern" value={this.state.feedDetails.filePattern} onChange={this.updateState} />
                            </Col>

                    </Row>
                    <Row>
                        <Col sm={2}>
                            <label className="fontweightClass">Feed Frequency:</label>
                        </Col>
                        <Col sm={5}>
                            <select className="boxBorder" name="feedFrequency" value={this.state.feedDetails.feedFrequency} onChange={this.updateState}>
                                <option value="0">Select</option>
                                <option value="1">Daily</option>
                                <option value="2">Weekly</option>
                                <option value="3">Monthly</option>
                                <option value="4">Quaterly</option>
                            </select>
                        </Col>
                        <Col sm={3}>
                            <label className="fontweightClass">File Format:</label>
                        </Col>
                        <Col sm={2}>
                            <select className="boxBorder" name="fileFormat" value={this.state.feedDetails.fileFormat} onChange={this.updateState}>
                                <option value="0">Select</option>
                                <option value="1">Delimited Text</option>
                                <option value="2">JSON</option>
                                <option value="3">XML Delimiter</option>
                                <option value="4">Header/footer flag</option>
                            </select>

                        </Col>

                    </Row>
                    <Row>
                        <Col sm={2}>
                            <label className="fontweightClass">No Of Files(in number):</label>
                        </Col>
                        <Col sm={5}>
                            <input className="boxBorder" type="text" name="noOfFiles" value={this.state.feedDetails.noOfFiles} onChange={this.updateState} />
                        </Col>
                        <Col sm={3}>
                            <label className="fontweightClass">Load Record Failure Tolerance(in %):</label>
                        </Col>
                        <Col sm={2}>
                            <input className="boxBorder w-45" type="text" name="failureTolerance" value={this.state.feedDetails.failureTolerance} onChange={this.updateState} />
                        </Col>

                    </Row>

                    <Row>
                        <Col sm={2}>
                            <label className="fontweightClass">Rentention Period(in days):</label>
                        </Col>
                        <Col sm={5}>
                            <input className="boxBorder" type="text" name="retentionPeriod" value={this.state.feedDetails.retentionPeriod} onChange={this.updateState} />
                        </Col>
                        <Col sm={3}>
                            <label className="fontweightClass">Token File:</label>
                        </Col>
                        <Col sm={2}>
                            <input type="radio" name="tokenFile" value="Yes" checked={this.state.feedDetails.tokenFile === 'Yes'} onChange={this.updateState}>Yes</input>
                            <input type="radio" name="tokenFile" value="No" checked={this.state.feedDetails.tokenFile === 'No'} onChange={this.updateState}>No</input>
                        </Col>

                    </Row>
                    <Row>
                        <Col sm={2}>
                            <label className="fontweightClass">Loading Mode:</label>
                        </Col>
                        <Col sm={5}>
                            <select className="boxBorder" name="loadingMode" value={this.state.feedDetails.loadingMode} onChange={this.updateState}>
                                <option value="0">Select</option>
                                <option value="1">Incremental</option>
                                <option value="2">Merge</option>
                                <option value="3">Truncate/Reload</option>
                            </select>
                        </Col>
                        <Col sm={3}>
                            <label className="fontweightClass">External Table Push:</label>
                        </Col>
                        <Col sm={2}>
                            <input type="radio" name="extTablePush" value="Yes" checked={this.state.feedDetails.extTablePush === 'Yes'} onChange={this.updateState}>Yes</input>
                            <input type="radio" name="extTablePush" value="No" checked={this.state.feedDetails.extTablePush === 'No'} onChange={this.updateState} >No</input>

                        </Col>

                    </Row>

                    <Row>
                        <Col sm={2}>
                            <label className="fontweightClass">Table Name and Login Credentials:</label>
                        </Col>
                        <Col sm={5}>
                            <input className="boxBorder" type="text" name="tableNameCredentials" value={this.state.feedDetails.tableNameCredentials} onChange={this.updateState} />
                        </Col>
                        <Col sm={3}>
                            <label className="fontweightClass">Compression:</label>
                        </Col>
                        <Col sm={2}>
                            <input type="radio" name="compression" value="Yes" checked={this.state.feedDetails.compression === 'Yes'} onChange={this.updateState}>Yes</input>
                            <input type="radio" name="compression" value="No" checked={this.state.feedDetails.compression === 'No'} onChange={this.updateState} >No</input>

                        </Col>

                    </Row>

                    <Row>
                        <Col sm={2}>
                            <label className="fontweightClass">Encryption:</label>
                        </Col>
                        <Col sm={5}>
                            <input type="radio" name="encryption" value="Yes" checked={this.state.feedDetails.encryption === 'Yes'} onChange={this.updateState}>Yes</input>
                            <input type="radio" name="encryption" value="No" checked={this.state.feedDetails.encryption === 'No'} onChange={this.updateState} >No</input>

                        </Col>
                        <Col sm={3}>
                            <label className="fontweightClass">Feed Notification Subscription:</label>
                        </Col>
                        <Col sm={2}>
                            <input className="boxBorder w-20" type="text" name="feedNotificationSubscription" value={this.state.feedDetails.feedNotificationSubscription} onChange={this.updateState} />

                        </Col>

                    </Row>

                    <Row>
                        <Col sm={2}>
                            <label className="fontweightClass">Data Access Control:</label>
                        </Col>
                        <Col sm={5}>
                            <input className="boxBorder" type="text" name="dataControl" value={this.state.feedDetails.dataControl} onChange={this.updateState} />
                        </Col>
                        <Col sm={3}>

                        </Col>
                        <Col sm={2}>


                        </Col>

                    </Row>
                </div>

                    <div className="feedForm marginDetails">
                        <Row>
                            <Col sm={2}>
                                <label className="marginDetails">FILE DETAILS:</label>
                            </Col>
                        <Col sm={10}>
                            <input className="boxBorder marginDetails" type="text"/>

                        </Col>

                        </Row>
                    </div>

                    <button onClick={this.saveFeedDetails} className="buttonStyle marginDetails boxBorder indexColor fontweightClass colorFileDetails">SAVE</button>

                </Form>

            </div>



        );
    }

}
