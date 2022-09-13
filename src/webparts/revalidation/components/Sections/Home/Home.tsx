import * as React from "react";
import { Carousel, Container } from "react-bootstrap";

export default class Home extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <h3>Home Section</h3>
                </Container>
            </div>
        )
    }
}