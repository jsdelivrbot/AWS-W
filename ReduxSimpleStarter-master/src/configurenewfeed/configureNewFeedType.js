import React, {Component} from 'react';
import {If, Then, Else} from 'react-if';
import {Tab, Row, Col, Nav, NavItem} from 'react-bootstrap';
import axios from 'axios';
import ReactFileReader from 'react-file-reader';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import TimePicker from 'react-dropdown-timepicker';
// import ConfigureIntrospectionFeed from "../configureIntrospectionFeed/configureIntrospectionFeed";


class ConfigureNewFeedType extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formDirty: false,
            errors: {
                required: " *",
                failureToleranceRangeError : " Range in between 1 to 100"
            },
            feedDetails: {
                feedId : "",
                feedName: "",
                feedSubject : "",
                feedTarget : "",
                feedFrequency : "",
                feedWeekday: "",
                feedWeekend : "",
                feedUsHoliday : "",
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
                dataControl : "",
                fileName: "",
                feedUrl: "",
                colHeaderArr: [],
                changedcolHeaderArr: [],
                headName: "",
                readerResult: ""

    }
};

this.updateState = this.updateState.bind(this);
this.updateColState = this.updateColState.bind(this);
this.saveFeedDetails = this.saveFeedDetails.bind(this);
// this.processData = this.processData.bind(this);

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
	    alert("Feed Saved Successfully");
            console.log("Makingrequest",this.state.feedDetails);
            console.log("Requeststringfy",this.state.feedDetails);
            const request = axios.post("/api/saveNewFeed",this.state.feedDetails);
            request.then(res => {
                console.log(res);

            })
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
        const amorpm = time.hour < 12 ? 'AM' : 'PM';
        const minute = time.minute < 10 ? '0' + time.minute.toString() : time.minute.toString();
        return time.hour.toString() + ':' + minute + amorpm;
    }

    updateState(e) {
        this.setState(Object.assign(this.state.feedDetails, {[e.target.name]: e.target.value}));
    }
    updateColState(e) {
        let indexNum = e.target.name.split('_')[1] - 1;
        this.setState(Object.assign(this.state.feedDetails.changedcolHeaderArr[indexNum], {value : e.target.value}));
    }
    handleFiles = files => {
        let self = this;
        let reader = new FileReader();
        console.log('files', files)
        // reader.readAsDataURL()
        console.log('reader',reader)
        reader.onload = function(e) {
            // Use reader.result
            console.log(reader.result);
            self.setState(Object.assign(self.state.feedDetails, {readerResult: reader.result}));
            console.log("gagan", self.state);
        }
        reader.readAsText(files[0]);
    }
    processData(allText){
        let self = this;
        console.log('allText ==== ',allText)
        if(allText !== ''){
            let allTextLines = allText.split(/\r\n|\n/);
            let headers = allTextLines[0].split(',');
            let lines = [];
            let tarr = [];
            let tarr1 = [];
            for (let j=0; j<headers.length; j++) {
                tarr.push({'key': j+1, 'value': headers[j] });
            }
            lines.push(tarr);
            console.log('tarr == ',tarr)
            // console.log(self.state)
            // self.setState(Object.assign(self.state.feedDetails, {colHeaderArr : tarr}));

            for (let k=0; k<headers.length; k++) {
                tarr1.push({'key': 'headname_'+(k+1), 'value': '' });
            }
            // self.setState(Object.assign(self.state.feedDetails, {changedcolHeaderArr : tarr1}));

            self.setState(Object.assign(self.state.feedDetails, {
                colHeaderArr : tarr,
                changedcolHeaderArr : tarr1
            }));

        }
    }

    render() {
        const {} = this.props;
        console.log(this.state.feedDetails.colHeaderArr)
        const colHeaderArr = this.state.feedDetails.colHeaderArr;
        console.log('colHeaderArr ==== ',colHeaderArr)
        console.log('this.textInput',this.textInput)
        const readerResult = this.state.feedDetails.readerResult;
        console.log('readerResult',readerResult)
        if(this.textInput !== undefined){
            colHeaderArr.map((item) => {
                this.textInput.setAttribute('uniqueID',item.key)
            })
        }
        return (

            <div>

                <Form>

                    <div className="feedForm">

                        <Row className ="p-5">
                            <Col sm={2}>
                                <label className="fontweightClass">Feed Type :</label>
                            </Col>
                            <Col sm={4}>
                                <input className={"boxBorder"+(this.checkFieldValidation('feedId') ? " error" : "") } name="feedId" value={this.state.feedDetails.feedId}
                                       onChange={this.updateState} type="number"/>
                                <span className='errorText'>{this.checkFieldValidation('feedId')}</span>

                            </Col>
                            <Col sm={3}>
                                <label className="fontweightClass">Feed Type ID:</label>
                            </Col>
                            <Col sm={3}>
                                <input className={"boxBorder"+(this.checkFieldValidation('feedName') ? " error" : "") } name="feedName"
                                       value={this.state.feedDetails.feedName} onChange={this.updateState} type="text"/>
                                <span className='errorText'>{this.checkFieldValidation('feedName')}</span>
                            </Col>
                        </Row>

                        <Row className ="p-5">
                            <Col sm={2}>
                                <label className="fontweightClass">File Format :</label>
                            </Col>
                            <Col sm={4}>
                                <input className={"boxBorder"+(this.checkFieldValidation('feedSubject') ? " error" : "") } name="feedSubject"
                                       value={this.state.feedDetails.feedSubject} onChange={this.updateState}
                                       type="text"/>
                                <span className='errorText'>{this.checkFieldValidation('feedSubject')}</span>
                            </Col>
                            <Col sm={3}>
                            </Col>
                        </Row>
                        <Row className ="p-5">
                            <Col sm={2}>
                                <label className="fontweightClass">Feed Subject :</label>
                            </Col>
                            <Col sm={4}>
                                <input className={"boxBorder"+(this.checkFieldValidation('feedSubject') ? " error" : "") } name="feedSubject"
                                       value={this.state.feedDetails.feedSubject} onChange={this.updateState}
                                       type="text"/>

                            </Col>
                        </Row>
                    </div>

                    <div className="feedForm m-5top">
                        <Row>
                            <Col sm={2}>
                                <label className="m-5top">FILE DETAILS:</label>
                            </Col>
                            <Col sm={10}>

                            </Col>

                        </Row>
                        <Row className ="p-5">
                            <Col sm={2}>
                                <label className="fontweightClass">Sample Feed URL :</label>
                            </Col>
                            <Col sm={4}>
                                {/*<input className={"boxBorder"+(this.checkFieldValidation('feedUrl') ? " error" : "") } name="feedUrl"*/}
                                {/*value={this.state.feedDetails.feedUrl} onChange={this.updateState}*/}
                                {/*type="text"/>*/}
                                {/*<input type="file" id="files"  className="form-control" accept=".csv" required />*/}

                                <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                                    <button className='btn'>Upload</button>
                                </ReactFileReader>
                                {/*<ReactFileReader convertFilesToBase64={this.handleFiles} fileTypes={'.csv'}>*/}
                                    {/*<button className='btn'>Upload</button>*/}
                                {/*</ReactFileReader>*/}

                            </Col>
                        </Row>
                        <Row className ="p-5">
                            <Col sm={2}>
                                <label className="fontweightClass">Sample File Name :</label>
                            </Col>
                            <Col sm={4}>
                                <input className={"boxBorder"+(this.checkFieldValidation('fileName') ? " error" : "") } name="fileName"
                                       value={this.state.feedDetails.fileName} onChange={this.updateState}
                                       type="text"/>
                            </Col>
                            <Col sm={4}>
                                {/*<Input type="button" onClick={this.procssData(readerResult)} value="INTROSPECT"*/}
                                       {/*className="buttonStyle m-5top boxBorder indexColor fontweightClass colorFileDetails"></Input>*/}

                                <Input type="button"
                                       onClick={() => this.processData(readerResult)}
                                       value="INTROSPECT"
                                        className="buttonStyle m-5top boxBorder indexColor fontweightClass colorFileDetails">
                                </Input>
                            </Col>
                        </Row>

                    </div>
                    <div>
                        <If condition={colHeaderArr.length !== 0}>
                            <Then>
                                <div className="feedForm m-5top">

                                    <Row>
                                        <Col sm={2}>
                                            <label className="m-5top">FIELDS</label>
                                        </Col>
                                        <Col sm={10}>

                                        </Col>

                                    </Row>
                                    <Row className="p-5">
                                        <Col sm={3}>
                                            <label className="fontweightClass">Sr No</label>
                                        </Col>
                                        <Col sm={4}>
                                            <label className="fontweightClass">Current Header</label>
                                        </Col>
                                        <Col sm={5}>
                                            <label className="fontweightClass">Changed Header</label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {/*{*/}
                                        {/*colHeaderArr.map((item) =>*/}
                                            {/*<ConfigureIntrospectionFeed*/}
                                                {/*item={item}*/}
                                            {/*/>*/}
                                        {/*)}*/}
                                        {
                                            colHeaderArr.map((item) =>
                                                <Row className="p-5">
                                                    <Col sm={2}>
                                                        <label className="fontweightClass">{item.key}</label>
                                                    </Col>
                                                    <Col sm={4}>
                                                        <label className="fontweightClass">{item.value}</label>
                                                    </Col>
                                                    <Col sm={4} key={item.key}>
                                                        <input className={"boxBorder"+(this.checkFieldValidation('headName') ? " error" : "") } name={"headname_"+item.key}
                                                               defaultValue={item.value}
                                                               onChange={this.updateColState}
                                                               type="text"
                                                               // ref={"head_"+item.value}
                                                        />
                                                    </Col>
                                                </Row>
                                            )}

                                    </Row>
                                    <Row>
                                        <col sm={11}/>
                                        <Col sm={1}>
                                            <Input type="button" onClick={this.saveFeedDetails.bind(this)} value="SAVE"
                                                   className="buttonStyle m-5top boxBorder indexColor fontweightClass colorFileDetails"></Input>
                                        </Col>
                                    </Row>
                                </div>
                            </Then>
                            <Else>
                                <div></div>
                            </Else>
                        </If>
                    </div>
                </Form>

            </div>


        );
    }


}
export default ConfigureNewFeedType;
