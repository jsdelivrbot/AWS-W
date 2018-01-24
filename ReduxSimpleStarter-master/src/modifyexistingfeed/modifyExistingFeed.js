import React, {Component} from 'react';
import {Tab, Row, Col, Nav, NavItem} from 'react-bootstrap';
import axios from 'axios';
import SearchResultComponent from './searchResultComponent';
export default class ModifyExistingFeed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allFeeds:[],
            filteredFeeds:[]
        };
        this.filterFeeds = this.filterFeeds.bind(this);
        this.updateState = this.updateState.bind(this);
        this.editFeed = this.editFeed.bind(this);

    }
    filterFeeds()
    {
        const feedName = this.state.feedName;
        this.searchFeed(feedName);

    }
    searchFeed(feedName)
    {
        const request = axios.get('/api/searchFeed?feedName='+feedName);
        request.then(res => {
            //console.log(res.data);
            this.setState({filteredFeeds:res.data.Items});
           console.log("sds",this.state.filteredFeeds);

        })

    }

    updateState(e) {

        this.setState({[e.target.name]: e.target.value});

    }

    editFeed(e){
        const feedId = e.target.name;
        this.props.changeTab(feedId);
    }

    render() {
        const {} = this.props;
        let filteredRows = this.state.filteredFeeds.map((feed,index)=>{
            return <SearchResultComponent {...feed} Sr={index+1} onClick={this.editFeed}/>
        });
        return (
            <div>
                <form>

                    <div className="feedForm marginDetails">
                        <div>
                            <label className="fontweightClass colorTextBlack">Search For Feed:</label>
                        </div>
                        <div className="feedForm m-5top m-15right m-15left">
                            <Row className ="p-5">
                                <Col sm={2}>
                                    <label className="fontweightClass">Feed Name:</label>
                                </Col>
                                <Col sm={4}>
                                    <input value={this.state.feedName} className="boxBorder inputRadius" name="feedName" onChange={this.updateState} type="text"/>


                                </Col>
                                <Col sm={2}>
                                    <label className="fontweightClass">File Format:</label>
                                </Col>
                                <Col sm={3}>
                                    <select className="boxBorder inputRadius w-200 h-31" name="fileFormat"
                                            value={this.state.fileFormat} onChange={this.updateState}>
                                        <option value="Select">Select</option>
                                        <option value="Delimited Text">Delimited Text</option>
                                        <option value="JSON">JSON</option>
                                        <option value="XML Delimeter">XML Delimiter</option>
                                        <option value="Header/footer flag">Header/footer flag</option>
                                    </select>

                                </Col>
                                <Col sm={1}>
                                    <input onClick={this.filterFeeds} className="buttonStyle boxBorder indexColor fontweightClass colorFileDetails" type="button" value="Search"></input>
                                </Col>
                            </Row>

                            <Row className ="p-5">
                                <Col sm={2}>
                                    <label className="fontweightClass">Feed Id:</label>
                                </Col>
                                <Col sm={4}>
                                    <input className="boxBorder inputRadius" name="feedId" value="" type="text"/>
                                </Col>
                                <Col sm={3}>

                                </Col>
                                <Col sm={3}>
                                </Col>
                            </Row>
                        </div>
                        <div className="p-5">
                            <div className="feedForm m-5top m-15right m-15left colorFileDetails">
                                <Row className="m-5top">
                                    <Col sm={2}>
                                        <label className="indexColor fontweightClass">Sr No.</label>
                                    </Col>
                                    <Col sm={3}>
                                        <label className="indexColor fontweightClass">Feed Id</label>
                                    </Col>
                                    <Col sm={3}>
                                        <label className="indexColor fontweightClass">Feed Name</label>
                                    </Col>
                                    <Col sm={4}>
                                        <label className="indexColor fontweightClass">File Format</label>
                                    </Col>
                                </Row>
                            </div>
                            {filteredRows}
                        </div>
                    </div>

                </form>
            </div>
        );
    }

}
