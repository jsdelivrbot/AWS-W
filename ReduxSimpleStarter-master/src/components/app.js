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
                <div className="feedForm colorFileDetails indexColor fontweightClass">
                    FEED CONFIGURATION
                </div>

                <Tab.Container id="tabs-with-dropdown" activeKey={this.state.selectedTab}>
                    <Row className="clearfix">
                        <Col sm={12}>
                            <Nav pills>

                                <NavItem className="test" eventKey="first" onClick={this.selectTab.bind(this,"first")}>
                                    <span className={this.state.selectedTab == "first" ? ' colorFileDetails indexColor':''}>  Configure New Feed</span>
                                </NavItem>


                                <NavItem className="test" eventKey="second" onClick={this.selectTab.bind(this,"second")}>
                                    <span className={this.state.selectedTab == "second" ? ' colorFileDetails indexColor':''}>   ModifyExistingFeed </span>
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
