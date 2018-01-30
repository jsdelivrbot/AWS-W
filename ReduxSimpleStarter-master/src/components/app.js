import React, { Component } from 'react';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
// import Input from 'react-validation/build/input';
import ConfigureNewFeed from '../configurenewfeed/configureNewFeed';
import ConfigureNewFeedType from '../configurenewfeed/configureNewFeedType';
import ModifyExistingFeed from '../modifyexistingfeed/modifyExistingFeed';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state =
            {
                selectedTab: "first",
                selectedFeedId: "",
                showFeedType: false
            };
        this.selectTab = this.selectTab.bind(this);
        this.navigateToConfigureNewFeed = this.navigateToConfigureNewFeed.bind(this);


    }

    selectTab(tab){

        this.setState({selectedTab:tab});
    }
    buttonClicked(){

        this.setState({showFeedType:!this.state.showFeedType});
    }

    navigateToConfigureNewFeed(selectedFeedId){
        this.selectTab("first");

        this.setState({selectedFeedId});
    }

    render() {
        const {} = this.props;
        return (
            <div>
                <button
                    className={"m-5top boxBorder indexColor fontweightClass colorFileDetails"}
                    onClick={this.buttonClicked.bind(this)}>{this.state.showFeedType ? 'Go to feed' : 'Go to feedType'}</button>
                <div>&nbsp;</div>
            <div style={this.state.showFeedType ? {display:'none'} : {display:'block'}}>
            <div className="feedForm colorFileDetails indexColor fontweightClass centreAlign">
                <span> FEED CONFIGURATION </span>
            </div>
                <div className="m-5top">.</div>
            <Tab.Container id="tabs-with-dropdown" activeKey={this.state.selectedTab}>

                <Row className="clearfix">
                    <Col sm={12}>
                        <Nav className="tabs">

                            <NavItem
                                className={this.state.selectedTab == "first" ? ' test colorFileDetails indexColor col-sm-6' : 'test col-sm-6'}
                                eventKey="first" onClick={this.selectTab.bind(this, "first")}>
                                <span>Configure New Feed</span>
                            </NavItem>


                            <NavItem
                                className={this.state.selectedTab == "second" ? ' test colorFileDetails indexColor col-sm-6' : 'test col-sm-6'}
                                eventKey="second" onClick={this.selectTab.bind(this, "second")}>
                                <span>ModifyExistingFeed</span>
                            </NavItem>

                        </Nav>
                    </Col>

                    <Col sm={12}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="first">
                                <ConfigureNewFeed selectedFeedId={this.state.selectedFeedId}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <ModifyExistingFeed changeTab={this.navigateToConfigureNewFeed}/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            </div>


            {/* feed type code */}
                <div style={this.state.showFeedType ? {display:'block'} : {display:'none'}}>
                    <div className="feedForm colorFileDetails indexColor fontweightClass centreAlign">
                        <span> FEED TYPE CONFIGURATION </span>
                    </div>
                    <div className="m-5top">.</div>
                    <Tab.Container id="tabs-with-dropdown" activeKey={this.state.selectedTab}>
                        <Row className="clearfix">
                            <Col sm={12}>
                                <Nav className="tabs">

                                    <NavItem
                                        className={this.state.selectedTab == "first" ? ' test1 colorFileDetails indexColor col-sm-6' : 'test1 col-sm-6'}
                                        eventKey="first" onClick={this.selectTab.bind(this, "first")}>
                                        <span>Configure New Feed Type</span>
                                    </NavItem>

                                    <NavItem
                                        className={this.state.selectedTab == "second" ? ' test1 colorFileDetails indexColor col-sm-6' : 'test1 col-sm-6'}
                                        eventKey="second" onClick={this.selectTab.bind(this, "second")}>
                                        <span>Modify Existing Feed Type</span>
                                    </NavItem>

                                </Nav>
                            </Col>


                            <Col sm={12}>
                                <Tab.Content animation>
                                    <Tab.Pane eventKey="first">
                                        <ConfigureNewFeedType />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>

            </div>
        );
    }

}
