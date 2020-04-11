import React from "react";
import LoadingComponent from "./LoadingComponent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneAll from "@material-ui/icons/DoneAll";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alerts from "./Alerts";
import { SERVER_ENDPOINT } from "./utilPoints";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class NGODetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      flashShow: false,
      flashMessage: "Some Unexpected Error Occured While Fetching Data",
      severity: "error",
      ngoDetails: {}
    };
  }

  async componentDidMount() {
    console.log("Inside componentDidMount of NGODetailsComponent");
    //console.log(window.location.pathname.split('/')[2])
    axios
      .get(
        SERVER_ENDPOINT +
          `api/ngo/filter?ngo_id=${window.location.pathname.split("/")[2]}`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(
        response => {
          console.log(response.data);
          this.setState({
            isLoading: false,
            ngoDetails: response.data.list[0]
          });
        },
        err => {
          this.setState({
            isLoading: false,
            flashShow: true
          });
        }
      );
  }

  update = status => {
    console.log("updating");
    console.log(this.props.ngos);
    let temp_ngos = [];
    for (let i in this.props.ngos) {
      let ngo = this.props.ngos[i];
      if (ngo["_id"] === this.state.ngoDetails["_id"]) {
        let ngo_t = ngo;
        ngo_t["isClaimed"] = status;
        temp_ngos.push(ngo_t);
      } else {
        temp_ngos.push(ngo);
      }
    }
    console.log(temp_ngos);
    this.props.updateRows(temp_ngos);
  };

  claimNGO = () => {
    let temp_ngoDetails = this.state.ngoDetails;
    temp_ngoDetails["isClaimed"] = true;
    this.update(true);
    this.setState({ ngoDetails: temp_ngoDetails });
    axios
      .put(
        SERVER_ENDPOINT + `api/ngo/claim`,
        {
          ngo_id: this.state.ngoDetails._id,
          claim: true
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(
        response => {
          console.log(response.data);
        },
        err => {
          this.setState({
            isLoading: false,
            flashShow: true
          });
        }
      );
  };

  unClaimNGO = () => {
    let temp_ngoDetails = this.state.ngoDetails;
    temp_ngoDetails["isClaimed"] = false;
    this.update(false);
    this.setState({ ngoDetails: temp_ngoDetails });
    axios
      .put(
        SERVER_ENDPOINT + `api/ngo/claim`,
        {
          ngo_id: this.state.ngoDetails._id,
          claim: false
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(
        response => {
          console.log(response.data);
        },
        err => {
          this.setState({
            isLoading: false,
            flashShow: true
          });
        }
      );
  };
  render() {
    if (this.state.isLoading) {
      return <LoadingComponent />;
    } else {
      return (
        <div>
          <Snackbar
            open={this.state.flashShow}
            autoHideDuration={2000}
            onClose={() => {
              this.setState({ flashShow: false });
            }}
          >
            <Alerts
              flashMessage={this.state.flashMessage}
              severity={this.state.severity}
            />
          </Snackbar>
          <Container style={{ marginTop: 20 }}>
            <Container
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Row>
                <Col xs={12} md={5} lg={5}>
                  <img
                    src={this.state.ngoDetails.img_url}
                    alt={this.state.ngoDetails.name}
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 150 / 2,
                      overflow: "hidden",
                      borderWidth: 3,
                      borderColor: "black"
                    }}
                  />
                </Col>

                <Col xs={12} md={5} lg={5} style={{ marginTop: 10 }}>
                  <TextField
                    id="outlined-basic"
                    label="NGO Name"
                    variant="outlined"
                    value={this.state.ngoDetails.name}
                    disabled={true}
                    style={{
                      width: 300
                    }}
                  />
                </Col>
              </Row>
            </Container>
            <br />
            <br />
            <Container>
              <Row>
                <Col span="10">
                  <TextField
                    id="outlined-basic"
                    label="Email Address"
                    variant="outlined"
                    value={this.state.ngoDetails.email_address}
                    disabled={true}
                    style={{
                      width: 300
                    }}
                  />
                </Col>
              </Row>
            </Container>
            <br />
            <br />
            <Container>
              <Row>
                <Col xs={12} md={5} lg={5} style={{ padding: 10 }}>
                  <TextField
                    id="outlined-basic"
                    label="Foreign Fund"
                    variant="outlined"
                    value={this.state.ngoDetails.foreign_fund}
                    disabled={true}
                    style={{
                      width: 300
                    }}
                  />
                </Col>
                <Col xs={12} md={5} lg={5} style={{ padding: 10 }}>
                  <TextField
                    id="outlined-basic"
                    label="Registration Date"
                    variant="outlined"
                    value={this.state.ngoDetails.registration_date}
                    disabled={true}
                    style={{
                      width: 300
                    }}
                  />
                </Col>
              </Row>
            </Container>
            <br />
            <br />
            <hr />

            <h3 style={{ fontSize: 20, fontStyle: "bold" }}>Address</h3>
            <br />
            <Container>
              <Col xs={12} md={5} lg={5}>
                <TextField
                  id="outlined-basic"
                  label="Line 1"
                  variant="outlined"
                  value={this.state.ngoDetails.address.line1}
                  disabled={true}
                  style={{
                    width: 300
                  }}
                />
              </Col>
              <br />
              <Col xs={12} md={5} lg={5}>
                <TextField
                  id="outlined-basic"
                  label="Line 2"
                  variant="outlined"
                  value={this.state.ngoDetails.address.line2}
                  disabled={true}
                  style={{
                    width: 300
                  }}
                />
              </Col>
            </Container>

            <hr />
            <Container>
              <Row>
                <Col xs={12} md={5} lg={5} style={{ padding: 10 }}>
                  <TextField
                    id="outlined-basic"
                    label="City"
                    variant="outlined"
                    value={this.state.ngoDetails.address.city}
                    disabled={true}
                    style={{
                      width: 300
                    }}
                  />
                </Col>

                <Col xs={12} md={5} lg={5} style={{ padding: 10 }}>
                  <TextField
                    id="outlined-basic"
                    label="Pincode"
                    variant="outlined"
                    value={this.state.ngoDetails.address.pincode}
                    disabled={true}
                    style={{
                      width: 300
                    }}
                  />
                </Col>
              </Row>
            </Container>
            <br />
            <Container>
              <Row>
                <Col xs={12} md={5} lg={5} style={{ padding: 10 }}>
                  <TextField
                    id="outlined-basic"
                    label="District"
                    variant="outlined"
                    value={this.state.ngoDetails.address.district}
                    disabled={true}
                    style={{
                      width: 300
                    }}
                  />
                </Col>
                <Col xs={12} md={5} lg={5} style={{ padding: 10 }}>
                  <TextField
                    id="outlined-basic"
                    label="State"
                    variant="outlined"
                    value={this.state.ngoDetails.address.state}
                    disabled={true}
                    style={{
                      width: 300
                    }}
                  />
                </Col>
              </Row>
            </Container>
          </Container>
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {this.state.ngoDetails.isClaimed === true ? (
              <Col xs={12} md={5} lg={5} style={{ padding: 50 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  endIcon={<DeleteIcon />}
                  style={{ marginLeft: 50 }}
                  onClick={() => this.unClaimNGO()}
                >
                  UnClaim
                </Button>
              </Col>
            ) : (
              <Col xs={12} md={5} lg={5} style={{ padding: 50 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  endIcon={<DoneAll />}
                  onClick={() => this.claimNGO()}
                >
                  Claim
                </Button>
              </Col>
            )}
            <br />
            <br />
          </Container>
        </div>
      );
    }
  }
}

export default NGODetailsComponent;
