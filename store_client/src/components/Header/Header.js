import React, { Component } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./App.css";
import io from "socket.io-client";
import { connect } from "react-redux";
import axios from "axios";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      arrMess: [],
      isToggleForm: false,
      isItyping: false,
    };
    this.socket = io(`localhost:9000/`, {
      transports: ["websocket", "polling", "flashsocket"],
    });
  }

  componentDidMount() {
    let info = JSON.parse(localStorage.getItem("info"));
    if (info) {
      this.socket.emit("join_rom", info.user.id);
      axios
        .get(`http://localhost:9000/chat/id?q=${info.user.id}`)
        .then((res) => {
          let data = res.data.result;
          this.setState({
            arrMess: data,
          });
        });
    }
    this.socket.on("message_hi", (mess) => {
      setTimeout(() => {
        axios
          .get(`http://localhost:9000/chat/id?q=${mess.idUser}`)
          .then((res) => {
            let data = res.data.result;
            this.setState(
              {
                arrMess: data,
                isItyping: false,
              },
              () => {
                if (this.state.isToggleForm) {
                  let chat = document.querySelector(".chat");
                  chat.scrollTo(0, chat.scrollHeight - chat.clientHeight);
                }
              }
            );
          });
      }, 300);
    });
    setTimeout(() => {
      this.socket.on("naylacaikhacdm", (message) => {
        this.setState({
          isItyping: true,
        });
      });
    }, 200);
  }
  handleChat = () => {
    this.setState(
      {
        isToggleForm: !this.state.isToggleForm,
      },
      () => {
        let chat = document.querySelector(".chat");
        chat.scrollTo(0, chat.scrollHeight - chat.clientHeight);
      }
    );
  };
  handleOnChange = (e) => {
    let info = JSON.parse(localStorage.getItem("info"));
    this.socket.emit("entering_loading", info.user.id);
    this.setState({
      message: e.target.value,
    });
  };
  hanleOnClick = (e) => {
    let info = JSON.parse(localStorage.getItem("info"));
    this.socket.emit("send_mess", {
      message: this.state.message,
      idUser: info.user.id,
      username: info.user.username,
      email: info.user.email,
      image: info.user.image,
      active: true,
    });
    setTimeout(() => {
      axios
        .get(`http://localhost:9000/chat/id?q=${info.user.id}`)
        .then((res) => {
          let data = res.data.result;
          this.setState({ message: "", arrMess: data }, () => {
            let chat = document.querySelector(".chat");
            chat.scrollTo(0, chat.scrollHeight - chat.clientHeight);
          });
        });
    }, 200);

    axios
      .post(`http://localhost:9000/chat`, {
        message: this.state.message,
        idUser: info.user.id,
        username: info.user.username,
        email: info.user.email,
        image: info.user.image,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  handleOnLogOut = () => {
    localStorage.clear();
  };
  handleCloseForm = () => {
    this.setState({
      isToggleForm: false,
    });
  };
  render() {
    let result = JSON.parse(localStorage.getItem("info"));
    let customLink = [
      {
        text: "Trang chủ",
        to: "/",
        className: "home",
      },
      {
        text: "Cửa hàng",
        to: "/store",
        className: "store",
      },
      {
        text: "Giỏ hàng",
        to: "/cart",
        className: "cart",
      },
      {
        text: "Liên hệ",
        to: "/feedback",
      },
      {
        text: "Chat",
        to: "/chatroom",
      },
    ];
    console.log(this.state.arrMess);

    return (
      <>
        <motion.div className="header" animate={{ y: [-940, 0] }}>
          <motion.h3
            animate={{ y: [-440, 400, -100, 200, -10, 0] }}
            transition={{ duration: 2 }}
          >
            <Link className="logo" to="/">
              MinhHieu
            </Link>
          </motion.h3>
          <ul className="menu">
            {customLink.map((link, index) => {
              return (
                <li>
                  <button>
                    <Link key={index} className="link-item" to={link.to}>
                      {link.text}
                    </Link>
                  </button>
                </li>
              );
            })}
            {result && result.user ? (
              <li className="user">
                <i class="far fa-user"></i>
                <ul className="user-menu">
                  <div className="setting">
                    <Link to="/account" className="user-menu-item">
                      Thiết lập tài khoản
                    </Link>
                    <i class="fas fa-cogs"></i>
                  </div>
                  <div className="setting">
                    <Link to="/pay-history" className="user-menu-item">
                      Lịch sử thanh toán
                    </Link>
                    <i class="far fa-money-bill-alt"></i>
                  </div>
                  <div className="setting">
                    <Link to="/feedback" className="user-menu-item">
                      FeedBack
                    </Link>
                    <i class="far fa-id-card"></i>
                  </div>
                  <div className="setting">
                    <span onClick={this.handleChat} className="user-menu-item">
                      Chat với Admin
                    </span>
                    <i class="fas fa-sign-out-alt"></i>
                  </div>
                  <div className="setting">
                    <Link
                      to="/login"
                      onClick={this.handleOnLogOut}
                      className="user-menu-item"
                    >
                      Đăng xuất
                    </Link>
                    <i class="fas fa-sign-out-alt"></i>
                  </div>
                </ul>
              </li>
            ) : (
              ""
            )}
          </ul>
        </motion.div>
        {this.state.isToggleForm && (
          <motion.div className="chat">
            <div className="form-chat-admin">
              <div className="header-admin">
                <div className="header-chat">
                  <div className="name-img">
                    <img src="https://res.cloudinary.com/artimate/image/upload/v1636172926/pfnnenusrcqyerohw2ne.jpg" />
                    <h4>ADMIN</h4>
                  </div>
                  <i
                    onClick={this.handleCloseForm}
                    class="fas fa-window-close"
                  ></i>
                </div>
              </div>
              <div className="content-chat">
                {this.state.arrMess.map((e) => {
                  return (
                    <div
                      className={`content ${
                        e.username !== "admin" ? "userr" : "admin"
                      }`}
                    >
                      {e.username === "admin" && <img src={e.image} />}
                      <span>{e.message}</span>
                    </div>
                  );
                })}
              </div>
              <div className="loadingg">
                {/* ${this.state.username} */}
                {this.state.isItyping && (
                  <span className="ityping">{`ADMIN is entering . . .`}</span>
                )}
              </div>
              <div className="form-chat">
                <div className="handle-input">
                  <input
                    onChange={this.handleOnChange}
                    type="text"
                    value={this.state.message}
                    placeholder="Enter mess  . . ."
                  />
                  <button
                    onClick={this.hanleOnClick}
                    type="button"
                    class="btn btn-PRIMARY"
                  >
                    Gửi
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
