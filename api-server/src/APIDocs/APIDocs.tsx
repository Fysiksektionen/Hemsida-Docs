import React, { useEffect, useState } from 'react';
import {Container, Navbar, Nav, Button} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import logo from '../mediafiles/Fysiksektionen_logo.svg';

import { timeoutPromise } from './timeoutPromise';
import { FormControlLabel, Switch } from '@material-ui/core';

import './APIDocs.css'; // Removes some elements of the swagger-ui which could not be removed programmatically
import { APIFile } from "./types";
import {available_files} from "./available_files";

type APIDocsProps = {
    serverUrl: string // full URL with appended slash
    docs: APIFile[]
    timeOut: number // ms
    updateInterval: number
    autoUpdateEnabled: boolean
}

type APIDocsState = {
    jsonUrl: string
    jsonData: object
    autoUpdateEnabled: boolean
}

/**
 * Component for rendering our API-documentation.
 */
function APIDocs(props: APIDocsProps) {
    // Set component state
    const [state, setState] = useState<APIDocsState>({
        jsonUrl: props.serverUrl,
        jsonData: {},
        autoUpdateEnabled: props.autoUpdateEnabled
    });

    const updateAPIData = async function(jsonUrl: string) {
        if (jsonUrl !== '') {
            console.log(jsonUrl);
            console.log(process.env.API_BASE_URL);
            const res = await timeoutPromise(
                fetch(jsonUrl).then(response => response.json()),
                props.timeOut
            ).catch(reason => {
                console.log(`Request on ${jsonUrl}: ${reason.message}`);
            });
            if (res) {
                if (JSON.stringify(res) !== JSON.stringify(state.jsonData)) {
                    console.log(res);
                    setState({
                        jsonUrl: jsonUrl,
                        jsonData: res,
                        autoUpdateEnabled: state.autoUpdateEnabled
                    });
                }
            }
        }
    };

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            if (state.autoUpdateEnabled) {
                updateAPIData(state.jsonUrl).then();
            }
        }, props.updateInterval);

        return () => { clearInterval(intervalId); };
    });

    return (
        <div>
            {/* Header */}
            <Navbar variant="light" expand="md" className="border-bottom border-dark">
                <Navbar.Brand>
                    <div className="container-fluid">
                        <a href="/"><img src={logo} width="75" height="75" alt="" className="mx-3" /></a>
                        Fysiksektionens API-docs
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav justify onSelect={(eventKey) => {
                        if (eventKey != null) {
                            updateAPIData(props.serverUrl + eventKey).then();
                        }
                    }}>
                        {props.docs.map((docsInfo, index) => {
                            return (
                                <Nav.Link key={index} eventKey={docsInfo.fileName}>
                                    {docsInfo.displayName}
                                </Nav.Link>
                            );
                        })}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {/* Main content */}
            <Container fluid="lg">
                {/* Update buttons */}
                <Row className="my-3 d-flex justify-content-center">
                    <Col xs={10} className="d-flex justify-content-around">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={state.autoUpdateEnabled}
                                    onChange={(event, checked) => {
                                        setState({ ...state, autoUpdateEnabled: checked });
                                    }}
                                />
                            }
                            label="Automatic updates"
                        />
                        <div className={state.autoUpdateEnabled ? 'hidden' : ''}>
                            <Button type='primary' onClick={() => updateAPIData(state.jsonUrl)}>
                                Run manual update
                            </Button>
                        </div>
                    </Col>
                </Row>

                {/* API content */}
                <Row>
                    <Col xs={12} className={JSON.stringify(state.jsonData) === JSON.stringify({}) ? 'd-none' : ''}>
                        <SwaggerUI
                            url={state.jsonUrl}
                            spec={state.jsonData}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

APIDocs.defaultProps = {
    serverUrl: process.env.REACT_APP_API_BASE_URL,
    docs: available_files,
    timeOut: 1000,
    updateInterval: 2500,
    autoUpdateEnabled: false
};

export default APIDocs;
