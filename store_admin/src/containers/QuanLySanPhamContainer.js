import React, { Component } from "react";
import QuanLySanPham from "../component/QuanLySanPham/QuanLySanPham";
import { connect } from "react-redux";
import actions from "./../actions/getAllProducts";
class QuanLySanPhamContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
    };
  }
  componentDidMount() {
    this.props.getAllProducts();
  }
  componentDidUpdate(prevState) {
    if (prevState.allProducts !== this.props.allProducts) {
      this.setState({
        arr: this.props.allProducts,
      });
    }
  }
  handlePageChange = (id) => {
    this.props.handlePageChange(id);
  };
  handleUpdateProducts = (obj) => {
    this.props.handleUpdateProducts(obj);
  };
  deleteProduct = (id, idPage) => {
    if (window.confirm(`Are you sure delete products in store ?`)) {
      this.props.deleteProduct(id);
    }
  };
  updateProduct = (obj) => {
    this.props.updateProduct(obj);
  };
  render() {
    return (
      <>
        <QuanLySanPham
          allProducts={this.state.arr}
          handlePageChange={this.handlePageChange}
          handleUpdateProducts={this.handleUpdateProducts}
          deleteProduct={this.deleteProduct}
          updateProduct={this.updateProduct}
          messAll={this.props.messAll}
          cancelProducts={this.props.cancelProducts}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allProducts: state.allProducts,
    messAll: state.messAll,
    
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: () => {
      dispatch(actions.getAllProducts());
    },
    handlePageChange: (id) => {
      dispatch(actions.handlePageChange(id));
    },
    handleUpdateProducts: (obj) => {
      dispatch(actions.handleUpdateProducts(obj));
    },
    deleteProduct: (id) => {
      dispatch(actions.deleteProduct(id));
    },
    updateProduct: (obj) => {
      dispatch(actions.updateProduct(obj));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuanLySanPhamContainer);
