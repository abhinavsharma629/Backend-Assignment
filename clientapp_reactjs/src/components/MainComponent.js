import React from "react";
import NGOHomeComponent from "./NGOHomeComponent";
import NGODetailsComponent from "./NGODetailsComponent";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import LoadingComponent from "./LoadingComponent";
import Snackbar from "@material-ui/core/Snackbar";
import Alerts from "./Alerts";
import { SERVER_ENDPOINT } from "./utilPoints";

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      flashShow: false,
      flashMessage: "Some Unexpected Error Occured While Fetching Data",
      severity: "error",
      ngos: []
    };
  }

  componentDidMount() {
    console.log("Inside componentDidMount of MainComponent");
    console.log("Origin Url Is:- " + window.location.origin);

    axios
      .get(SERVER_ENDPOINT + `api/ngo/filter`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(
        response => {
          let ngo = response.data.list;
          console.log(ngo);
          this.setState({
            ngos: ngo,
            isLoading: false
          });
        },
        err => {
          this.setState({
            flashShow: true
          });
        }
      );
  }

  updateRows = ngos => {
    console.log("final updating");
    console.log(ngos);
    this.setState({ ngos: ngos });
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingComponent />;
    } else {
      console.log("n");
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
          <div>
            <Router>
              {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
              <Switch>
                <Route exact path="/">
                  <NGOHomeComponent ngos={this.state.ngos} />
                </Route>
                <Route exact path="/ngodetails/:id">
                  <NGODetailsComponent
                    updateRows={this.updateRows.bind(this)}
                    ngos={this.state.ngos}
                  />
                </Route>
              </Switch>
            </Router>
          </div>
        </div>
      );
    }
  }
}

export default MainComponent;
