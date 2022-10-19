import React, { Component } from "react";
import "./Account.css";
import PhoneInput from "react-phone-number-input";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { init } from "ityped";
import { withAlert } from "react-alert";
import actions from "./../../actions/inforUserActions";
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      email: "",
      password: "",
      username: "",
      numberphone: "",
      image: "",
      id: "",
    };
  }
  componentDidMount() {
    let result = JSON.parse(localStorage.getItem("info"));
    let { id, address, email, password, username, numberphone, image } =
      result.user;
    console.log(image);
    this.setState({
      address,
      email,
      password,
      username,
      numberphone,
      image,
      id,
    });
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
  handleOnchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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
  handleUpdate = (e) => {
    e.preventDefault();
    let { id, address, email, password, username, numberphone, image } =
      this.state;
    this.props.handleUpdate(id, {
      address,
      email,
      password,
      username,
      numberphone,
      image,
    });
    let result = JSON.parse(localStorage.getItem("info"));
    result.user = {
      id,
      address,
      email,
      password,
      username,
      numberphone,
      image,
    };
    localStorage.setItem("info", JSON.stringify(result));
    const alert = this.props.alert;
    setTimeout(() => {
      let { message, statusCode } = this.props.message;
      if (statusCode === 200) {
        alert.success(message);
        return;
      }
      alert.error(message);
    }, 1000);
  };

  render() {
    let { address, email, password, username, numberphone, image } = this.state;
    console.log(this.props.message);

    return (
      <>
        <div className="profile">
          <div className="profile__content">
            <div className="profile__content-avt">
              <img src={image} />{" "}
              <label for="input" className="lable-text">
                <i class="fas fa-camera"></i>
              </label>
            </div>
            <div className="profile-info">
              <div className="input__change--avt">
                <input
                  style={{ display: "none" }}
                  type="file"
                  name=""
                  id="input"
                  onChange={this.handleGetImg}
                />
              </div>
              <div class="form-group">
                <label for="">Tên của bạn</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tên của bạn . . ."
                  value={username}
                  name="username"
                  onChange={this.handleOnchange}
                />
                <i class="fas fa-signature"></i>
              </div>{" "}
              <div className="form-group">
                <label for="">Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email của bạn . . ."
                  value={email}
                  name="email"
                  onChange={this.handleOnchange}
                />
                <i class="far fa-paper-plane"></i>
              </div>
              <div className="form-group">
                <label for="">Mật khẩu</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mật khẩu. . ."
                  value={password}
                  name="password"
                  onChange={this.handleOnchange}
                />
                <i class="fas fa-key"></i>
              </div>
              <div className="form-group">
                <label for="">Địa chỉ</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Địa chỉ . . ."
                  value={address}
                  name="address"
                  onChange={this.handleOnchange}
                />
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div className="form-group">
                <label htmlFor="numberphone">Số điện thoại</label>
                <PhoneInput
                  placeholder="Nhập số điện thoại"
                  onChange={this.handleGetNumberPhone}
                  value={numberphone}
                />
                <i class="phone fas fa-phone-volume"></i>
              </div>
              <div className="update-btn">
                <button
                  onClick={this.handleUpdate}
                  type="button"
                  class="btn btn-warning warning"
                >
                  Cập nhật tài khoản
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="fake_profile">
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
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { message: state.orderMess };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleUpdate: (id, obj) => {
      dispatch(actions.handleUpdateUser(id, obj));
    },
  };
};
export default withAlert()(
  connect(mapStateToProps, mapDispatchToProps)(Account)
);
