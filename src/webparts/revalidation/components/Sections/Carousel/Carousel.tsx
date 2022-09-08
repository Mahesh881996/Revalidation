import * as React from "react";
import { Carousel, Container } from "react-bootstrap";
import "../Carousel/Carousel.css";
import { map, uniq } from "lodash";

export default class CarouselComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Carousel fade>
                        {uniq(this.props.carouselData).map((data: any) => (
                            <Carousel.Item>
                                <img className="full-width" src={JSON.parse(data.Image).serverRelativeUrl} alt="First slide" height="400" />
                                <Carousel.Caption>
                                    <h3>{data.Title}</h3>
                                    <p>{data.Description}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>

                </Container>
            </div>
        )
    }
}