import * as React from "react";
import { Carousel, Container } from "react-bootstrap";

export default class About extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <h3>About Section</h3>
                </Container>
            </div>
        )
    }
}