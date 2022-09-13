import * as React from 'react';
import styles from './Revalidation.module.scss';
import { IRevalidationProps } from './IRevalidationProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Row, Col, Card, Button, Container, Carousel, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { getListItems } from '../../../Services/SPOps';
import CarouselComponent from './Sections/Carousel/Carousel';
import { HashRouter, Route } from 'react-router-dom';
import Home from './Sections/Home/Home';
import About from './Sections/About/About';
import Contact from './Sections/Contact/Contact';

let carouselList = "Carousel";
export default class Revalidation extends React.Component<IRevalidationProps, any> {
  constructor(props: IRevalidationProps) {
    super(props);
    this.state = {
      carouselData: []
    };
  }

  async getCarouselData() {
    await getListItems(carouselList, "*", "").then(result => {
      this.setState({ "carouselData": result });
    });
  }

  componentDidMount() {
    let promise = this.getCarouselData();
  }

  public render(): React.ReactElement<IRevalidationProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section>
        <Container fluid>
          <Row>
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">Revalidation</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#/">Home</Nav.Link>
                  <NavDropdown title="About" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#/About">About Us</NavDropdown.Item>
                    <NavDropdown.Item href="#/Contact">Contact Us</NavDropdown.Item>
                    <NavDropdown.Divider />
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Row>
          <Row>
            <CarouselComponent carouselData={this.state.carouselData} />
            <HashRouter>
              <Route path="/" exact render={(props) => <Home {...props} context={this.props.context} />}></Route>
              <Route path="/About" render={(props) => <About {...props} context={this.props.context} />}></Route>
              <Route path="/Contact" render={(props) => <Contact {...props} context={this.props.context} />}></Route>
            </HashRouter>
          </Row>
        </Container>
      </section>
    );
  }
}
