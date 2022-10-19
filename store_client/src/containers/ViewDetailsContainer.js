import React, { Component } from "react";
import ViewDetails from "../components/ViewDetails/ViewDetails";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import actions from "./../actions/store";
class ViewDetailsContainer extends Component {
  componentDidMount() {
    let { id } = this.props.match.params;
    this.props.details(parseInt(id));
  }
  buyProduct = (product, token) => {
    this.props.buyProduct(product, token);
  };
  render() {
    return (
      <>
        <ViewDetails
          arr={this.props.store}
          buyProduct={this.buyProduct}
          message={this.props.message}
        />
      </>
    );
  }
}
const mapStateToprops = (state) => {
  return {
    store: state.store,
    message: state.message,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: () => {
      dispatch(actions.getProducts());
    },
    buyProduct: (product, token) => {
      dispatch(actions.buyProduct(product, token));
    },
    details: (id) => {
      dispatch(actions.getDetails(id));
    },
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(withRouter(ViewDetailsContainer));
