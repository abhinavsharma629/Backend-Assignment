import React from "react";
import MUIDataTable from "mui-datatables";
import Button from "react-bootstrap/Button";

export default function MaterialTableDemo(props) {
  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: "foreign_fund",
      label: "Foreign Fund",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "city",
      label: "City",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "district",
      label: "District",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "state",
      label: "State",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "claim_review",
      label: "Claim / View Profile",
      options: {
        filter: false,
        sort: false
      }
    }
  ];

  let rows = [];
  for (let i in props.data) {
    let item = props.data[i];
    rows.push({
      name: item.name,
      foreign_fund: item.foreign_fund,
      state: item.state,
      district: item.district,
      city: item.city,
      claim_review:
        item.isClaimed === "TRUE" ? (
          <Button
            onClick={() => (window.location.href = `/ngodetails/${item._id}`)}
            color="blue"
            size="sm"
          >
            View Profile
          </Button>
        ) : (
          <Button
            onClick={() => (window.location.href = `/ngodetails/${item._id}`)}
            variant="success"
            size="sm"
          >
            Claim
          </Button>
        )
    });
  }

  const options = {
    filterType: "chip",
    print: false,
    selectableRowsHeader: false
  };

  return (
    <MUIDataTable
      title={"NGO's"}
      data={rows}
      columns={columns}
      options={options}
    />
  );
}
