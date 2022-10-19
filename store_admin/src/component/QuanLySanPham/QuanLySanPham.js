import React, { Component } from "react";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import Pagination from "react-js-pagination";
import { TextField, Button } from "@mui/material";
import { withAlert } from "react-alert";
import "./QuanLySanPham.css";
class QuanLySanPham extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      price: "",
      description: "",
      image: "",
      activePage: 1,
    };
  }
  componentDidMount() {
    let pagination = document.querySelector(".pagination");
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        pagination.classList.add("activePag");
      } else {
      }
    });
  }
  handlePageChange = (numberPage) => {
    this.setState({
      activePage: numberPage,
    });
    let token = JSON.parse(localStorage.getItem("token"));
    this.props.handlePageChange(numberPage, token);
  };
  deleteProduct = (id) => {
    this.props.deleteProduct(id);
    let numberPage = this.state.activePage;
    setTimeout(() => {
      const alert = this.props.alert;
      let { statusCode, message } = this.props.messAll;
      if (statusCode === 200) {
        alert.success(message);
        this.props.handlePageChange(numberPage);
        return;
      }
      alert.error(message);
    }, 500);
  };
  updateProduct = (product) => {
    let { id, title, price, description, image } = product;
    this.setState({ id, title, price, description, image });
  };
  renderProducts = () => {
    return this.props.allProducts.map((product) => {
      return (
        <div className="card">
          <img src={product.image} />
          <h3>{product.title}</h3>
          <h2>${product.price} </h2>
          <span>{product.description.slice(0, 100)}</span>
          <div className="button-gr">
            <button
              onClick={() => this.updateProduct(product)}
              type="button"
              class="btn-update"
            >
              EDIT
            </button>
            <button
              onClick={() => this.deleteProduct(product.id)}
              type="button"
              class="btn-delete"
            >
              DELETE
            </button>
          </div>
        </div>
      );
    });
  };
  handleGetImg = (e) => {
    let data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "nguyenthanhtung");
    fetch(`https://api.cloudinary.com/v1_1/artimate/image/upload`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          image: data.secure_url,
        })
      )
      .catch((e) => console.log(e));
  };
  handleGetValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleUpdateProducts = (e) => {
    e.preventDefault();

    let { id, title, description, price, image } = this.state;
    if (!id) {
      let numberPage = this.state.activePage;
      this.props.handleUpdateProducts({ title, description, price, image });
      setTimeout(() => {
        const alert = this.props.alert;
        let { stateCode, message } = this.props.messAll;
        if (stateCode === 200) {
          this.props.handlePageChange(numberPage);
          alert.success(message);
          this.setState({
            id: "",
            title: "",
            price: "",
            description: "",
            image: "",
          });
          return;
        }
        alert.error(message);
      }, 500);
      return;
    }
    this.props.updateProduct({ id, title, description, price, image });
    let numberPage = this.state.activePage;
    setTimeout(() => {
      const alert = this.props.alert;
      let { statusCode, message } = this.props.messAll;
      if (statusCode === 200) {
        alert.success(message);
        this.setState({
          id: "",
          title: "",
          price: "",
          description: "",
          image: "",
        });
        this.props.handlePageChange(numberPage);
        return;
      }
      alert.error(message);
    }, 500);
  };
  render() {
    let { title, price, description, image } = this.state;
    return (
      <>
        <div className="container">
          <div className="form-product">
            <span className="text-controll">FORM COTROLL PRODUCTS</span>
            <CancelPresentationOutlinedIcon
              onClick={this.handleCloseForm}
              className="close-button"
            ></CancelPresentationOutlinedIcon>
            <TextField
              className="input"
              id="standard-basic"
              size="small"
              type="file"
              name="image"
              onChange={this.handleGetImg}
            />
            <TextField
              className="input"
              id="outlined-basic"
              label="Title"
              variant="standard"
              size="small"
              name="title"
              onChange={this.handleGetValue}
              value={title}
            />

            <TextField
              className="input"
              id="standard-basic"
              label="Price ($)"
              variant="standard"
              size="small"
              name="price"
              onChange={this.handleGetValue}
              value={price}
            />
            <TextField
              className="input"
              id="filled-basic"
              label="Description"
              variant="standard"
              size="small"
              name="description"
              aria-controls
              onChange={this.handleGetValue}
              value={description}
            />
            <Button
              onClick={this.handleUpdateProducts}
              className="edit"
              variant="contained"
              color="success"
              className="success-btn"
            >
              {this.state.id ? `UPDATE PRODUCT` : `ADD PRODUCT`}
            </Button>
          </div>
          <div className="products">{this.renderProducts()}</div>
          <div className="pagination">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={30}
              totalItemsCount={450}
              onChange={this.handlePageChange.bind(this)}
              pageRangeDisplayed={5}
            />
          </div>
        </div>
      </>
    );
  }
}
export default withAlert()(QuanLySanPham);
