import React, {Component} from 'react';
import {If, Then, Else} from 'react-if';
import {Tab, Row, Col, Nav, NavItem} from 'react-bootstrap';
import axios from 'axios';
import ReactFileReader from 'react-file-reader';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

class ConfigureNewFeedType extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formDirty: false,
            errors: {
                required: " *",
                failureToleranceRangeError : " Range in between 1 to 100"
            },
            feedTypeDetails: {
                feedType : "",
                feedTypeId: "",
                fileFormat : "",
                feedSubject : "",
                fileName: "",
                fileUrl: "",
                colHeaderArr: [],
                changedcolHeaderArr: []
            },
            dataTypeOptions: ['string','integer','float','date'],
            readerResult: ""
};

this.updateState = this.updateState.bind(this);
this.updateColState = this.updateColState.bind(this);
this.savefeedTypeDetails = this.savefeedTypeDetails.bind(this);
}

    formValid() {
    return this.state.feedTypeDetails.feedType.toString().trim().length
        && this.state.feedTypeDetails.feedTypeId.toString().trim().length
        && this.state.feedTypeDetails.feedSubject.toString().trim().length
        && this.state.feedTypeDetails.fileFormat.toString().trim().length
        && this.state.feedTypeDetails.fileName.toString().trim().length
    }

    checkFieldValidation(name){
        let error;
        switch(name){
            case 'failureTolerance':
                const failureTolerance = this.state.feedTypeDetails.failureTolerance;
                error = this.state.formDirty && (failureTolerance>100 || failureTolerance<0)
                    && this.state.errors.failureToleranceRangeError;
            default:
                error = error || this.state.formDirty
                    && (!this.state.feedTypeDetails[name].toString().trim().length || this.state.feedTypeDetails[name].toString() === 'Select')
                    && this.state.errors.required;
        }
        return error;

    }

    savefeedTypeDetails = (event) => {
        let feedTypeData = {
            feedType : "",
            feedTypeId: "",
            fileFormat : "",
            feedSubject : "",
            fileName: "",
            fileUrl: "",
            colData: []
        }
        let getData = [];
        // Object.assign(self.state.feedTypeDetails, {fileUrl: files[0].name});
        Object.assign(
            feedTypeData, {feedType: this.state.feedTypeDetails.feedType},
            {feedTypeId: this.state.feedTypeDetails.feedTypeId},
            {fileFormat: this.state.feedTypeDetails.fileFormat},
            {feedSubject: this.state.feedTypeDetails.feedSubject},
            {fileName: this.state.feedTypeDetails.fileName},
            {fileUrl: this.state.feedTypeDetails.fileUrl}
        );
        for(let i=0; i<this.state.feedTypeDetails.changedcolHeaderArr.length; i++){
            let currColHead = this.state.feedTypeDetails.colHeaderArr[i].value;
            let changedColHead = this.state.feedTypeDetails.changedcolHeaderArr[i].value;
            let currDataType = this.state.feedTypeDetails.colHeaderArr[i].selectedValue;
            let changeDataType = this.state.feedTypeDetails.changedcolHeaderArr[i].selectedValue;
            let prKey = this.state.feedTypeDetails.changedcolHeaderArr[i].prKey;
            getData.push({'currColHead':currColHead, 'changedColHead':changedColHead,'currDataType':currDataType, 'changedDataType':changeDataType, 'prKey':prKey})
            console.log(getData)
        }
        Object.assign(feedTypeData, {colData: getData})
        this.setState({formDirty: true});
        if (this.formValid()) {
            alert("Feed type Saved Successfully");
            const request = axios.post("/api/saveNewFeedType",feedTypeData);
            request.then(res => {
                console.log('res ',res);
            }).catch(err=> {
                console.log('errorrrrrr')

            });
        }
    }


    formatTime(time) {
        const amorpm = time.hour < 12 ? 'AM' : 'PM';
        const minute = time.minute < 10 ? '0' + time.minute.toString() : time.minute.toString();
        return time.hour.toString() + ':' + minute + amorpm;
    }

    updateState(e) {
        this.setState(Object.assign(this.state.feedTypeDetails, {[e.target.name]: e.target.value}));
    }
    updateColState(e) {
        let indexNum = e.target.name.split('_')[1] - 1;
        this.setState(Object.assign(this.state.feedTypeDetails.changedcolHeaderArr[indexNum], {value : e.target.value}));
    }
    handleFiles = files => {
        let self = this;
        let reader = new FileReader();
        console.log('files', files)
        console.log(files[0].name)
        // reader.readAsDataURL()
        console.log('reader',reader)
        reader.onload = function(e) {
            // Use reader.result
            self.setState(Object.assign(self.state, {readerResult: reader.result}));
            self.setState(Object.assign(self.state.feedTypeDetails, {fileUrl: files[0].name}));
        }
        reader.readAsText(files[0]);
    }
    processData(allText){
        let self = this;
        console.log('************ Process data **************')
        if(allText !== ''){
            let allTextLines = allText.split(/\r\n|\n/);
            let headers = allTextLines[0].split(',');
            let lines = [];
            let tarr = [];
            let tarr1 = [];
            let row1 = allTextLines[1].split(',')
            console.log('row1 ********** ',row1)

            for (let j=0; j<headers.length; j++) {
                let chktype = +row1[j];
                let dataType;
                if(isNaN(chktype)){
                    if(Date.parse(row1[j])){
                        dataType = 'date';
                    }else{
                        dataType = typeof row1[j]
                    }
                }else{
                    dataType = typeof +row1[j];
                    if(parseInt(row1[j]) == +row1[j]){
                        dataType = 'integer';
                    }else if(parseFloat(row1[j]) == +row1[j]){
                        dataType = 'float';
                    }
                }
                tarr.push({'key': j+1, 'value': headers[j], 'selectedValue': dataType, 'checked': false });
            }
            lines.push(tarr);
            for (let k=0; k<headers.length; k++) {
                let chktype = +row1[k];
                let dataType;
                if(isNaN(chktype)){
                    if(Date.parse(row1[k])){
                        dataType = 'date';
                    }else {
                        dataType = typeof row1[k]
                    }
                }else{
                    dataType = typeof +row1[k];
                    if(parseInt(row1[k]) == +row1[k]){
                        dataType = 'integer';
                    }else if(parseFloat(row1[k]) == +row1[k]){
                        dataType = 'float';
                    }
                }
                tarr1.push({'key': 'headname_'+(k+1), 'value': headers[k], 'selectedValue': dataType, 'checked': false, 'prKey': 'n' });
            }
            console.log('tarr1',tarr1)

            self.setState(Object.assign(self.state.feedTypeDetails, {colHeaderArr : tarr}));
            // self.setState({...self.state.feedTypeDetails : {colHeaderArr, tarr}});

            self.setState(Object.assign(self.state.feedTypeDetails, {changedcolHeaderArr : tarr1}));

            console.log("updated state", this.state);
        }
    }

    handleChange = (e) => {
        let indexNum = e.target.name.split('_')[1] - 1;
        let val = e.target.value
        this.setState(Object.assign(this.state.feedTypeDetails.changedcolHeaderArr[indexNum], {selectedValue : val}));
        console.log("updated state", this.state);
    }
    handleCheckbxevt = (e) => {
        let indexNum = e.target.name - 1;
        this.setState(Object.assign(this.state.feedTypeDetails.changedcolHeaderArr[indexNum], {checked : !this.state.feedTypeDetails.changedcolHeaderArr[indexNum].checked}));
        // this.setState(Object.assign(this.state.feedTypeDetails.changedcolHeaderArr[indexNum], {checked : !this.state.feedTypeDetails.changedcolHeaderArr[indexNum].checked}));
        if(this.state.feedTypeDetails.changedcolHeaderArr[indexNum].checked){
            this.setState(Object.assign(this.state.feedTypeDetails.changedcolHeaderArr[indexNum], {prKey : 'y'}));
        }else{
            this.setState(Object.assign(this.state.feedTypeDetails.changedcolHeaderArr[indexNum], {prKey : 'n'}));
        }
        console.log("updated state", this.state);
    }

    render() {
        const {} = this.props;
        const colHeaderArr = this.state.feedTypeDetails.colHeaderArr;
        const readerResult = this.state.readerResult;
        const dataTypeOptions = this.state.dataTypeOptions;
        const fileUrl = this.state.feedTypeDetails.fileUrl;
        console.log('colHeaderArr == ',colHeaderArr)
        return (

            <div>

                <Form>

                    <div className="feedForm">

                        <Row className ="p-5">
                            <Col sm={2}>
                                <label className="fontweightClass">Feed Type :</label>
                            </Col>
                            <Col sm={4}>
                                <input className={"boxBorder inputRadius"+(this.checkFieldValidation('feedType') ? " error" : "") } name="feedType" value={this.state.feedTypeDetails.feedType}
                                       onChange={this.updateState} />
                                <span className='errorText'>{this.checkFieldValidation('feedType')}</span>

                            </Col>
                            <Col sm={3}>
                                <label className="fontweightClass">Feed Type ID:</label>
                            </Col>
                            <Col sm={3}>
                                <input className={"boxBorder inputRadius"+(this.checkFieldValidation('feedTypeId') ? " error" : "") } name="feedTypeId"
                                       value={this.state.feedTypeDetails.feedTypeId} onChange={this.updateState} type="text"/>
                                <span className='errorText'>{this.checkFieldValidation('feedTypeId')}</span>
                            </Col>
                        </Row>

                        <Row className ="p-5">
                            <Col sm={2}>
                                <label className="fontweightClass">File Format :</label>
                            </Col>
                            <Col sm={4}>
                                <input className={"boxBorder inputRadius"+(this.checkFieldValidation('fileFormat') ? " error" : "") } name="fileFormat"
                                       value={this.state.feedTypeDetails.fileFormat} onChange={this.updateState}
                                       type="text"/>
                                <span className='errorText'>{this.checkFieldValidation('fileFormat')}</span>
                            </Col>

                            <Col sm={3}>
                                <label className="fontweightClass">Feed Subject :</label>
                            </Col>
                            <Col sm={3}>
                                <input className={"boxBorder inputRadius"+(this.checkFieldValidation('feedSubject') ? " error" : "") } name="feedSubject"
                                       value={this.state.feedTypeDetails.feedSubject} onChange={this.updateState}
                                       type="text"/>

                            </Col>
                        </Row>
                    </div>

                    <div className="feedForm m-5top">
                        <Row>
                            <Col sm={2}>
                                <label className="m-5top fontweightClass colorTextBlack">FILE DETAILS:</label>
                            </Col>
                            <Col sm={10}>

                            </Col>

                        </Row>
                        <Row className ="p-5">
                            <Col sm={2}>
                                <label className="fontweightClass">Sample Feed URL :</label>
                            </Col>
                            <Col sm={2}>
                                <input className={"boxBorder inputRadius"+(this.checkFieldValidation('feedType') ? " error" : "") } name="feedType" />
                            </Col>
                            <Col sm={4}>
                                <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                                    <Input type="button"
                                           value="UPLOAD"
                                           className="boxBorder indexColor fontweightClass colorFileDetails buttonStyling">
                                    </Input>
                                </ReactFileReader>
                                <span>{fileUrl}</span>
                            </Col>
                        </Row>
                        <Row className ="p-5">
                            <Col sm={2}>
                                <label className="fontweightClass">Sample File Name :</label>
                            </Col>
                            <Col sm={4}>
                                <input className={"boxBorder inputRadius"+(this.checkFieldValidation('fileName') ? " error" : "") } name="fileName"
                                       value={this.state.feedTypeDetails.fileName} onChange={this.updateState}
                                       type="text"/>
                            </Col>
                            {/*<Col sm={4}>*/}
                                {/*<Input type="button"*/}
                                       {/*onClick={() => this.processData(readerResult)}*/}
                                       {/*value="INTROSPECT"*/}
                                        {/*className="buttonStyle m-5top boxBorder indexColor fontweightClass colorFileDetails introspectbuttonStyling">*/}
                                {/*</Input>*/}
                            {/*</Col>*/}
                        </Row>
                        <Row>
                            <Col sm={5}>
                            <Input type="button"
                            onClick={() => this.processData(readerResult)}
                            value="INTROSPECT"
                            className="buttonStyle m-5top boxBorder indexColor fontweightClass colorFileDetails introspectbuttonStyling">
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
                                            <label className="m-5top fontweightClass colorTextBlack">FIELDS</label>
                                        </Col>
                                        <Col sm={10}>
                                        </Col>

                                    </Row>
                                    <Row className="p-5">
                                        <Col sm={1}>
                                            <label className="fontweightClass">Sr No</label>
                                        </Col>
                                        <Col sm={1}>
                                            <label className="fontweightClass">Key</label>
                                        </Col>
                                        <Col sm={2}>
                                            <label className="fontweightClass">Current Header</label>
                                        </Col>
                                        <Col sm={2}>
                                            <label className="fontweightClass">Current Datatype</label>
                                        </Col>
                                        <Col sm={3}>
                                            <label className="fontweightClass">Changed Header</label>
                                        </Col>
                                        <Col sm={3}>
                                            <label className="fontweightClass">Datatype</label>
                                        </Col>
                                    </Row>
                                     {
                                        colHeaderArr.map((item) =>
                                            <Row className="p-5">
                                                <Col sm={1}>
                                                    <label className="fontweightClass">{item.key}</label>
                                                </Col>
                                                <Col sm={1}>
                                                    <label className="checkboxCont">
                                                        <input type="checkbox" name={item.key} onClick={this.handleCheckbxevt.bind(this)} value="prKeyCheck" /><span className="checkmark"></span></label>
                                                </Col>
                                                <Col sm={2}>
                                                    <label className="fontweightClass">{item.value}</label>
                                                </Col>

                                                <Col sm={2}>
                                                    <select disabled={true} onChange={this.handleChange} name={"headname_"+item.key} className="boxBorder selectStyle">
                                                        {
                                                            dataTypeOptions.map((type) =>
                                                                <option value={type} selected={item.selectedValue === type ? true : false}>{type}</option>

                                                            )}
                                                    </select>

                                                </Col>
                                                <Col sm={3} key={item.key}>
                                                    <input className="boxBorder" name={"headname_"+item.key}
                                                           defaultValue={item.value}
                                                           onChange={this.updateColState}
                                                           type="text"
                                                           // ref={"head_"+item.value}
                                                    />
                                                </Col>
                                                <Col sm={3}>
                                                    <select onChange={this.handleChange} name={"headname_"+item.key} className="boxBorder selectStyle">
                                                        {
                                                            dataTypeOptions.map((type) =>
                                                               <option value={type} selected={item.selectedValue === type ? true : false}>{type}</option>

                                                        )}
                                                    </select>

                                                </Col>
                                            </Row>
                                     )}

                                    <Row className="p-5">
                                        <Col sm={10}>
                                            <Input type="button" onClick={this.savefeedTypeDetails.bind(this)} value="SAVE"
                                                   className="buttonStyle m-5top boxBorder indexColor fontweightClass colorFileDetails buttonStyling"></Input>
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
