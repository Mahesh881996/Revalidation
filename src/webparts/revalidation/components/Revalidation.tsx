import * as React from 'react';
import styles from './Revalidation.module.scss';
import { IRevalidationProps } from './IRevalidationProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Row, Col, Card, Button, Container, Carousel } from 'react-bootstrap';
import { getListItems } from '../../../Services/SPOps';
import CarouselComponent from './Sections/Carousel/Carousel';

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
        <CarouselComponent carouselData={this.state.carouselData} />
      </section>
    );
  }
}
