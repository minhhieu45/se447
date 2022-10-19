import React, { Component } from "react";
import "./ViewDetails.css";
import { withAlert } from "react-alert";
import { withRouter } from "react-router-dom";
import { motion } from "framer-motion";
class ViewDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
    };
  }
  changeImg = (link) => {
    this.props.arr[0].image = link;
    this.setState({
      arr: this.props.arr,
    });
  };
  buyProducts = (product) => {
    let token = JSON.parse(localStorage.getItem("token"));
    const alert = this.props.alert;
    this.props.buyProduct(product, token);
    setTimeout(() => {
      let { statusCode, message } = this.props.message;
      if (statusCode === 400) {
        if (window.confirm(`${message}`)) {
          let { history } = this.props;
          history.push("/login");
          return;
        }
        return;
      }
      alert.success(message);
    }, 300);
  };
  renderProducts = () => {
    return this.state.arr.map((product, index) => {
      return (
        <div key={index} className="views__container">
          <div className="views">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="demo__img"
            >
              <img src={product.image} />
            </motion.div>
            <div className="des">
              <h3 className="title">{product.title}</h3>
              <h4>Giá: {product.price} đ</h4>
              <span>Mô tả: {product.description}</span>
              <hr></hr>
              <motion.button
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                onClick={() => this.buyProducts(product)}
                type="button"
                class="btn btn-success"
              >
                Thêm vào giỏ hàng
              </motion.button>
            </div>
          </div>
        </div>
      );
    });
  };
  componentDidMount() {}
  componentDidUpdate(prevProps) {
    let arrImgDemo = [
      "http://styleguru.vn/wp-content/uploads/2021/03/ao-vest-nu-phoi-cung-quan-sooc-cap-cao_c030fc0979424b3baf84371812a13f46.jpg",
      "https://vn-live-05.slatic.net/p/244d934e6581e92070708a92e43a2710.jpg_720x720q80.jpg_.webp",
      "https://cf.shopee.vn/file/12ac5f21ce805412cee39a1143ea6038",
      "https://sumnus.vn/wp-content/uploads/2013/08/bo-vec.jpeg",
    ];
    this.props.arr[0].arrImg = arrImgDemo;
    if (prevProps.arr !== this.props.arr) {
      this.setState({
        arr: this.props.arr,
      });
    }
  }
  render() {
    return (
      <>
        {" "}
        <div className="views__container">
          {this.renderProducts()}
          <motion.div className="detail__item">
            <motion.div
              animate={{ x: 300 }}
              transition={{ duration: 4 }}
              className="detail__item1"
            ></motion.div>
            <motion.div
              animate={{ x: 200 }}
              transition={{ duration: 3 }}
              className="detail__item1"
            ></motion.div>
            <motion.div
              animate={{ x: 100 }}
              transition={{ duration: 2 }}
              className="detail__item1"
            ></motion.div>
            <motion.div
              animate={{ x: 0 }}
              transition={{ duration: 1 }}
              className="detail__item1"
            ></motion.div>
          </motion.div>
        </div>{" "}
      </>
    );
  }
}
export default withAlert()(withRouter(ViewDetails));
