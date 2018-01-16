import React, { Component } from 'react';
import ConfigureNewFeed from '../configurenewfeed/configureNewFeed';
import ModifyExistingFeed from '../modifyexistingfeed/modifyExistingFeed';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state =
            {
                selectedTab: "first",
                selectedFeedId: ""
            };
        this.selectTab = this.selectTab.bind(this);
        this.navigateToConfigureNewFeed = this.navigateToConfigureNewFeed.bind(this);


    }

    selectTab(tab){

        this.setState({selectedTab:tab});
    }
    navigateToConfigureNewFeed(selectedFeedId){
        this.selectTab("first");

        this.setState({selectedFeedId});
    }

    render() {
        const {} = this.props;
        return (

            <div>
                <div className="feedForm colorFileDetails indexColor fontweightClass centreAlign">
                    <span> FEED CONFIGURATION </span>
                </div>
                <div className="m-5top">.</div>
                <Tab.Container id="tabs-with-dropdown" activeKey={this.state.selectedTab}>

                    <Row className="clearfix">
                        <Col sm={12}>
                            <Nav className="tabs">

                                <NavItem className={this.state.selectedTab == "first" ? ' test colorFileDetails indexColor':'test'} eventKey="first" onClick={this.selectTab.bind(this,"first")}>
                                    <span>Configure New Feed</span>
                                </NavItem>


                                <NavItem className={this.state.selectedTab == "second" ? ' test colorFileDetails indexColor':'test'} eventKey="second" onClick={this.selectTab.bind(this,"second")}>
                                    <span>ModifyExistingFeed</span>
                                </NavItem>

                            </Nav>
                        </Col>

                        <Col sm={12}>
                            <Tab.Content animation>
                                <Tab.Pane eventKey="first">
                                    <ConfigureNewFeed selectedFeedId={this.state.selectedFeedId} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <ModifyExistingFeed changeTab={this.navigateToConfigureNewFeed}/>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        );
    }

}
