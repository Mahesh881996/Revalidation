import * as React from 'react';
import styles from './NewRevalForm.module.scss';
import { INewRevalFormProps } from './INewRevalFormProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Row, Col, Card, Button, Container, Carousel, Form } from 'react-bootstrap';
import { getListItemById, ensureUser, createListItem, updateListItem } from '../../../Services/SPOps';
import "./Styles/Style.css";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import Swal from 'sweetalert2';
import {
  Link,
  Stack,
  StackItem,
  MessageBar,
  MessageBarType,
  ChoiceGroup,
  IStackProps,
  MessageBarButton,
  Text,
  IChoiceGroupStyles,
} from '@fluentui/react';
import { stringIsNullOrEmpty } from '@pnp/common';

const requiredFields: string[] = ["userName", "lineManager", "quarter"];
let formValues: any;
const revalList = "Revalidation";
let ItemId: string = null;
let defaultUserName: string, defaultLineManager: string;

const ShowError = (p: any) => (
  <MessageBar
    messageBarType={MessageBarType.error}
    isMultiline={false}
    onDismiss={p.resetChoice}
    dismissButtonAriaLabel="Close">
    Please fill all the required fields to Submit the Form
  </MessageBar>
);

export default class NewRevalForm extends React.Component<INewRevalFormProps, any> {
  constructor(props: INewRevalFormProps) {
    super(props);
    this.state = {
      userName: null,
      lineManager: null,
      quarter: null,
      required: ["userName", "lineManager", "quarter"],
      showWarning: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.createItem = this.createItem.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  async componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search);
    ItemId = queryParams.get('ItemId');
    if (ItemId != null) {
      await getListItemById(revalList, "*,UserName/Name,UserName/EMail,LineManager/Name,LineManager/EMail", "UserName,LineManager", parseInt(ItemId)).then(async result => {
        defaultUserName = result.UserName.EMail;
        defaultLineManager = result.LineManager.EMail;
        this.setState({
          userName: result.UserName.EMail,
          lineManager: result.LineManager.EMail,
          quarter: result.Title,
        });
        await ensureUser(result.UserName.EMail).then((data) => {
          this.setState({
            userName: data.data.Id
          })
        });
        await ensureUser(result.UserName.EMail).then((data) => {
          this.setState({
            lineManager: data.data.Id
          })
        });
      });
    }
  }

  private createItem = async () => {
    let isFormValid = this.validateForm();
    if (isFormValid) {
      this.setState({ showWarning: false });
      await Swal.fire({
        title: 'Are you sure?',
        text: "To create the Item",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        backdrop: false,
        allowOutsideClick: false
      }).then(async (result) => {
        if (result.isConfirmed) {
          await createListItem(revalList, {
            Title: this.state.quarter,
            UserNameId: this.state.userName[0],
            LineManagerId: this.state.lineManager[0],
            RevalStstus: "Pending"
          }).then(async (data) => {
            await Swal.fire({
              icon: 'success',
              title: 'Created!',
              text: 'Your item has been created!',
              backdrop: false,
              allowOutsideClick: false
            })
          })
        }
        else {
          await Swal.fire({
            icon: 'warning',
            title: 'Cancelled!',
            text: 'Your item is not Updated!',
            backdrop: false,
            allowOutsideClick: false
          })
        }
      })
    }
    else {
      this.setState({ showWarning: true });
    }
  }

  private updateItem = async () => {
    let isFormValid = this.validateForm();
    if (isFormValid) {
      this.setState({ showWarning: false });
      await Swal.fire({
        title: 'Are you sure?',
        text: "To Update the Item",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        backdrop: false,
        allowOutsideClick: false
      }).then(async (result) => {
        if (result.isConfirmed) {
          debugger;
          await updateListItem(revalList, {
            Title: this.state.quarter,
            UserNameId: this.state.userName[0],
            LineManagerId: this.state.lineManager[0]
          }, parseInt(ItemId)).then(async () => {
            await Swal.fire({
              icon: 'success',
              title: 'Updated!',
              text: 'Your item has been Updated!',
              backdrop: false,
              allowOutsideClick: false
            })
          })
        }
        else {
          await Swal.fire({
            icon: 'warning',
            title: 'Cancelled!',
            text: 'Your item is not Updated!',
            backdrop: false,
            allowOutsideClick: false
          })
        }
      })
    }
    else {
      this.setState({ showWarning: true });
    }
  }

  private validateForm = () => {
    let isFormValid = false;
    formValues = this.state;
    requiredFields.forEach((val, index) => {
      if (!isFormValid && formValues[val] != null) {
        isFormValid = true;
      }
      else {
        isFormValid = false;
      }
    });
    return isFormValid;
  }
  private handleChange = (evt: any, type: any, field: any) => {
    if (type == "string") {
      const value = evt.target.value;
      this.setState({
        ...this.state,
        [field]: value
      });
    }
    else if (type == "Person") {
      console.log(field);
      let getSelectedUsers: any[] = [];
      evt.map(async (item: any) => {
        await ensureUser(item.id).then((data) => {
          getSelectedUsers.push(data.data.Id)
        });
      });
      this.setState({
        ...this.state,
        [field]: getSelectedUsers
      });
    }
    else if (type == "file") {
      let resultFile = evt.target.files;
      let fileInfos: any = [];
      for (let element of resultFile) {
        let fileName = element.name;
        let file = element;
        let reader = new FileReader();
        reader.onload = (function (file) {
          return function (e) {
            fileInfos.push({
              "name": file.name,
              "content": e.target.result
            });
          }
        })(file);
        reader.readAsArrayBuffer(file);
      }
      this.setState({
        ...this.state,
        [field]: fileInfos
      });
    }
    console.log(this.state);
  }

  public render(): React.ReactElement<INewRevalFormProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      context
    } = this.props;

    return (
      <section>
        <Container>
          <Row>
            <Col md={12}>
              <h2 className='text-center'>Revalidation Form</h2>
            </Col>
          </Row>
          <Row>
            {this.state.showWarning ? <ShowError /> : ""}
          </Row>
          <Row className="mt-1">
            <Col md={6}>
              <Form.Group controlId="projectName">
                <Row>
                  <Col md={4} className="mt-2">
                    <Form.Label className="columnHeader required">Quarter</Form.Label>
                  </Col>
                  <Col md={6} className="align-self-center">
                    <Form.Control size="sm" type="string" placeholder="Enter Quarter" value={this.state.quarter} onChange={(e: any) => this.handleChange(e, "string", "quarter")} />
                  </Col>
                </Row>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="projectName">
                <Row>
                  <Col md={4} className="mt-2">
                    <Form.Label className="columnHeader required">User Name</Form.Label>
                  </Col>
                  <Col md={6} className="align-self-center">
                    <PeoplePicker
                      context={this.props.context as any}
                      personSelectionLimit={1}
                      groupName={""} // Leave this blank in case you want to filter from all users
                      showtooltip={false}
                      required={false}
                      disabled={false}
                      principalTypes={[PrincipalType.User]}
                      onChange={(e) => this.handleChange(e, "Person", "userName")}
                      defaultSelectedUsers={[defaultUserName]}
                      resolveDelay={1000}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="projectName">
                <Row>
                  <Col md={4} className="mt-2">
                    <Form.Label className="columnHeader required">Line Manager</Form.Label>
                  </Col>
                  <Col md={6} className="align-self-center">
                    <PeoplePicker
                      context={this.props.context as any}
                      personSelectionLimit={1}
                      groupName={""} // Leave this blank in case you want to filter from all users
                      showtooltip={true}
                      required={false}
                      disabled={false}
                      principalTypes={[PrincipalType.User]}
                      onChange={(e) => this.handleChange(e, "Person", "lineManager")}
                      defaultSelectedUsers={[defaultLineManager]}
                      resolveDelay={1000}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>

          <Row className="buttonContainer">
            {stringIsNullOrEmpty(ItemId) ? <Button variant="primary" className="mr-2" size="sm" onClick={this.createItem}>Create</Button> : <Button variant="primary" className="mr-2" size="sm" onClick={this.updateItem}>Update</Button>}
            <Button variant="danger" size="sm">Cancel</Button>
          </Row>
        </Container>
      </section>
    );
  }
}
