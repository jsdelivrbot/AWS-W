import React from 'react';
import {Row, Col} from 'react-bootstrap';

const searchResultComponent = function (props)
{
    return (

    <div className="feedForm colorFileDetails m-5top m-15right m-15left">

        <Row>
            <Col sm={2}>
                <label className="indexColor fontweightClass">{props.Sr}</label>
            </Col>
            <Col sm={3}>
                <label className="indexColor fontweightClass">{props.feedId}</label>

            </Col>
            <Col sm={3}>
                <label className="indexColor fontweightClass">{props.feedName}</label>

            </Col>
            <Col sm={3}>
                <label className="indexColor fontweightClass">{props.fileFormat}</label>
            </Col>
            <Col sm={1}>
                <input name={props.feedId} type="button" onClick={props.onClick} className="buttonStyle boxBorder indexColor fontweightClass colorFileDetails" value="EDIT"></input>
            </Col>
        </Row>

    </div>
    )
}

export default searchResultComponent;