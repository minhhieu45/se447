import React, { Component } from "react";
import Store from "../components/Store/Store";
import { connect } from "react-redux";
import actions from "./../actions/store";
class StoreContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
    };
  }
  componentDidMount() {
    this.props.getProducts();
  }
  handlePageChange = (numberPage) => {
    this.props.handlePageChange(numberPage);
  };
  buyProduct = (product, token) => {
    this.props.buyProduct(product, token);
  };
  handleSearchInput = (value) => {
    this.props.handleSearchInput(value);
  };
  // componentDidUpdate(props, state) {
  //   if (props.buyProduct !== this.props.buyProduct) {
  //     this.setState({
  //       arr: this.props.
  //     })
  //   }
  // }'
  getDetails = (id) => {
    this.props.getDetails(id);
  };
  render() {
    return (
      <>
        <Store
          products={this.props.products}
          handlePageChange={this.handlePageChange}
          buyProduct={this.props.buyProduct}
          message={this.props.message}
          handleSearchInput={this.handleSearchInput}
          getDetails={this.getDetails}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.store,
    message: state.message,
  };
};
const disPatchToProps = (disPatch) => {
  return {
    getProducts: () => {
      disPatch(actions.getProducts());
    },
    handlePageChange: (numberPage) => {
      disPatch(actions.handlePageChange(numberPage));
    },
    buyProduct: (product, token) => {
      disPatch(actions.buyProduct(product, token));
    },
    handleSearchInput: (value) => {
      disPatch(actions.handleSearchInput(value));
    },
    getDetails: (id) => {
      disPatch(actions.getDetails(id));
    },
  };
};
export default connect(mapStateToProps, disPatchToProps)(StoreContainer);
