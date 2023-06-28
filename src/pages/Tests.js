import React from 'react';
import {Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import paths from '../router/paths';

export default function Tests() {

    return (
        <Container className="mt-3">
            <Link style={{ marginLeft: '20px' }} to={paths.randomTicket}>
                <Button>Random ticket</Button>
            </Link>
            <Link style={{ marginLeft: '20px' }} to={paths.oneTest}>
                <Button>One test</Button>
            </Link>        
        </Container>
    );
}
