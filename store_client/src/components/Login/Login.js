import React, { Component } from "react";
import { withAlert } from "react-alert";
import { withRouter } from "react-router-dom";
import { motion } from "framer-motion";
import "./Login.css";
import { init } from "ityped";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleOnClick = (e) => {
    e.preventDefault();

    let { email, password } = this.state;
    this.props.handleLogin({ email, password });
    const alert = this.props.alert;
    setTimeout(() => {
      let user = JSON.parse(localStorage.getItem("info"));
      let { message, statusCode } = this.props.token;
      let { history } = this.props;
      if (statusCode === 200) {
        if (user.user.role === "admin") {
          window.location.href = "http://localhost:4000/";
        } else {
          window.location.href = "http://localhost:4000/";
        }
        alert.success(message);
        return;
      }
      alert.error(message);
    }, 1000);
  };
  componentDidMount() {
    const myElement = document.querySelector("#myElement");
    init(myElement, {
      showCursor: false,
      strings: [
        "A simple “bye” can make us cry",
        "a simple “joke” can make us laugh",
        "and a simple ” care” can make us fall in love",
      ],
    });
  }
  render() {
    return (
      <>
        <div className="all">
          <div className="after">
            <video id="movie" loop="true" autoplay="autoplay" muted>
              <source src="./Seoul - 24603.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="img">
            <img src="./clothing-store-984396.jpg" />
            <div className="text">
              <h3>MinhHieu Store</h3>
              <span id="myElement"></span>
              <div className="mxh">
                <motion.i
                  initial={{ opacity: 0, zIndex: -1000 }}
                  animate={{ y: [40, 10, 0], opacity: 1, zIndex: 1000 }}
                  transition={{ duration: 0.6, ease: "anticipate" }}
                  class="fab fa-facebook"
                ></motion.i>
                <motion.i
                  initial={{ opacity: 0, zIndex: -1000 }}
                  animate={{ y: [40, 10, 0], opacity: 1, zIndex: 1000 }}
                  transition={{ duration: 1, ease: "anticipate" }}
                  class="fab fa-twitter"
                ></motion.i>
                <motion.i
                  initial={{ opacity: 0, zIndex: -1000 }}
                  animate={{ y: [40, 10, 0], opacity: 1, zIndex: 1000 }}
                  transition={{ duration: 1.5, ease: "anticipate" }}
                  class="fab fa-instagram"
                ></motion.i>
                <motion.i
                  initial={{ opacity: 0, zIndex: -1000 }}
                  animate={{ y: [40, 10, 0], opacity: 1, zIndex: 1000 }}
                  transition={{ duration: 2, ease: "anticipate" }}
                  class="far fa-envelope-open"
                ></motion.i>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, easings: "linear" }}
            className="login__form"
          >
            <div className="resigter__form-d">
              <legend>Đăng nhập</legend>
              <div className="form-group">
                <label htmlFor="Email">Email</label>
                <input
                  onChange={this.handleOnChange}
                  name="email"
                  type="email"
                  className="form-control"
                  id="Email"
                  placeholder="Nhập Email...."
                  autoComplete="off"
                />
                <i class="far fa-paper-plane"></i>
              </div>
              <div className="form-group">
                <label htmlFor="Password">Mật khẩu</label>
                <input
                  onChange={this.handleOnChange}
                  name="password"
                  type="password"
                  className="form-control"
                  id="Password"
                  autoComplete="off"
                  placeholder="Nhập Password...."
                />
                <i class="fas fa-key"></i>
              </div>

              <button
                className="dangnhap btn-login"
                onClick={this.handleOnClick}
                type="submit"
              >
                Đăng nhập
              </button>
            </div>
          </motion.div>
        </div>
      </>
    );
  }
}
export default withAlert()(withRouter(Login));
