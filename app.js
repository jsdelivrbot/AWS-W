import React, { Component } from 'react';
import ConfigureNewFeed from '../configurenewfeed/configureNewFeed';
import ModifyExistingFeed from '../modifyexistingfeed/modifyExistingFeed';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';

export default class App extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        const {} = this.props;
        return (

            <div>
                <div className="feedForm colorFileDetails indexColor fontweightClass">
                    FEED CONFIGURATION
                </div>

                <Tab.Container id="tabs-with-dropdown" defaultActiveKey="first">
                    <Row className="clearfix">
                        <Col sm={12}>
                            <Nav pills>
                                <NavItem eventKey="first">
                                    Configure New Feed
                                </NavItem>
                                <NavItem eventKey="second">
                                    ModifyExistingFeed
                                </NavItem>
                            </Nav>
                        </Col>


                        <Col sm={12}>
                            <Tab.Content animation>
                                <Tab.Pane eventKey="first">
                                    <ConfigureNewFeed />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <ModifyExistingFeed/>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        );
    }

}
