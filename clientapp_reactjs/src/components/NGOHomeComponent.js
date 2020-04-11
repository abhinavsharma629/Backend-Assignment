import React from "react";
import LoadingComponent from "./LoadingComponent";
import Snackbar from "@material-ui/core/Snackbar";
import Alerts from "./Alerts";
import Table from './Table';


class NGOHomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      flashShow: false,
      flashMessage: "Some Unexpected Error Occured While Fetching Data",
      severity: "error",
      rows: []
    };
  }

  componentDidMount() {
    console.log("Inside componentDidMount of NGOHomeComponent");

    //console.log(this.props.ngos);
    let ngoList = [];
    for (let ngo in this.props.ngos) {
      ngo = this.props.ngos[ngo];

      let data = {
        _id:ngo._id,
        name: ngo.name,
        foreign_fund: ngo.foreign_fund.toString().toUpperCase(),
        city: ngo.address.city,
        state: ngo.address.state,
        district: ngo.address.district,
        isClaimed: ngo.isClaimed.toString().toUpperCase()
      };
      ngoList.push(data);
    }

    this.setState({ rows: ngoList, isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingComponent />;
    } else {
      console.log(this.state.rows)
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
          <div style={{ padding: 30 }}>
            <Table data={this.state.rows} />
          </div>
        </div>
      );
    }
  }
}

export default NGOHomeComponent;
