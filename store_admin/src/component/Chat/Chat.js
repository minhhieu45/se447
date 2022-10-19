import React, { Component } from "react";
import { Button, TextField } from "@mui/material";
import { connect } from "react-redux";
import io from "socket.io-client";
import actions from "./../../actions/userActions";
import CloseIcon from "@mui/icons-material/Close";
import "./Chat.css";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      arr: [],
      isSeen: true,
      idUser: 0,
      id: 0,
      message: "",
      username: "",
      image: "",
      messBuyId: [],
      newArr: [],
      isToggleForm: false,
      isEntering: false,
    };
    this.socket = io(`localhost:9000/`, {
      transports: ["websocket", "polling", "flashsocket"],
    });
  }
  componentDidMount() {
    this.props.getAllUser();
    this.props.getAllMess();
    let idUser = [];
    this.props.listUser.forEach((element) => {
      idUser.push(element.id);
    });
    idUser.forEach((element) => {
      this.socket.emit("join_rom", element);
    });
    let arrObj = [];
    setTimeout(() => {
      this.props.chat.forEach((el, i) => {
        if (el.username !== "admin") {
          let result = arrObj.findIndex((e) => e.email === el.email);
          if (result === -1) {
            arrObj.push(el);
          } else {
            arrObj[result].email = el.email;
            arrObj[result].message = el.message;
            arrObj[result].username = el.username;
            arrObj[result].image = el.image;
            arrObj[result].active = el.active;
          }
        }
      });
      this.setState({
        arr: arrObj,
        newArr: arrObj,
      });
    }, 300);

    this.socket.on("message_hi", (message) => {
      let { arr } = this.state;
      let findIndex = arr.findIndex((e) => e.email === message.email);
      if (findIndex === -1) {
        arr.push(message);
      } else {
        arr[findIndex].username = message.username;
        arr[findIndex].message = message.message;
        arr[findIndex].image = message.image;
        arr[findIndex].active = true;
      }
      this.setState({
        arr: arr,
        isEntering: false,
      });
    });
    let { arr } = this.state;
    setTimeout(() => {
      arrObj.forEach((e) => {
        axios
          .get(`http://localhost:9000/chat/id?q=${e.idUser}`)
          .then((res) => {
            let data = res.data.result;
            e.message = data[data.length - 1].message;
            arr.push(e);
            return arr;
          })
          .then((data) => {
            this.setState({
              arr: data,
            });
          });
      });
    }, 700);
    this.socket.on("naylacaikhacdm", (message) => {
      this.setState({
        isEntering: true,
      });
    });
  }
  handleOnChange = (e) => {
    console.log(this.state.id);

    this.setState({
      message: e.target.value,
    });
    this.socket.emit("entering_loading", this.state.idUser);
  };
  // SEEN TIN NHẮN MỖI KHI CLICK VÀO
  handleRepMess = (id, idUser) => {
    this.props.handleRepMess(idUser);
    setTimeout(() => {
      let { arr } = this.state;
      let findId = this.state.arr.findIndex((e) => e.id === id);
      arr[findId].active = false;
      this.setState(
        {
          id: id,
          arr: arr,
          username: arr[findId].username,
          image: arr[findId].image,
          isToggleForm: true,
        },
        () => {
          let app = document.querySelector(".app");
          app.scrollTo(0, app.scrollHeight - app.clientHeight);
        }
      );
    }, 300);
    // Lấy tin nhắn của mỗi người dùng ứng với id user
    axios
      .get(`http://localhost:9000/chat/id?q=${idUser}`)
      .then((res) => {
        let data = res.data.result;
        this.setState({
          messBuyId: data,
          idUser: idUser,
          id: id,
        });
      })
      .catch((e) => console.log(e));
    // Khi lắng nghe được sự kiện thì lập tức phản hồi với on socket
    this.socket.on("message_hi", (message) => {
      setTimeout(() => {
        axios
          .get(`http://localhost:9000/chat/id?q=${this.state.idUser}`)
          .then((res) => {
            let data = res.data.result;
            this.setState(
              {
                messBuyId: data,
              },
              () => {
                let app = document.querySelector(".app");
                app.scrollTo(0, app.scrollHeight);
              }
            );
          });
      }, 200);
    });
  };
  // MỞ RA 1 TAB MỚI ĐỂ CHÁT
  handleOnClick = (e) => {
    e.preventDefault();
    let { message, idUser, arr, id } = this.state;
    // DISPLAY 1 THÔNG TIN TỚI NGƯỜI DÙNG
    this.socket.emit("send_mess", {
      message: message,
      idUser: +idUser,
      username: "admin",
      email: "admin123@gmail.com",
      image:
        "https://res.cloudinary.com/artimate/image/upload/v1636128070/dxj8ut8elprbqguoxblh.jpg",
    });
    // LƯU MESS NÀY VÀO DATABASE
    axios
      .post(`http://localhost:9000/chat`, {
        message: message,
        idUser: idUser,
        username: "admin",
        email: "admin123@gmail.com",
        image:
          "https://res.cloudinary.com/artimate/image/upload/v1636128070/dxj8ut8elprbqguoxblh.jpg",
      })
      .then((res) => {
        setTimeout(() => {
          axios.get(`http://localhost:9000/chat/id?q=${idUser}`).then((res) => {
            let data = res.data.result;
            this.props.getAllMess();
            setTimeout(() => {
              let findId = arr.findIndex((e) => e.idUser === idUser);
              arr[findId].message = data[data.length - 1].message;
              arr[findId].active = false;
              arr[findId].usernameAdmin = "admin";
              this.setState({
                arr: arr,
              });
            }, 300);
            this.setState(
              {
                messBuyId: data,
                message: "",
                arr: arr,
              },
              () => {
                let app = document.querySelector(".app");
                app.scrollTo(0, app.scrollHeight - app.clientHeight);
              }
            );
          });
        }, 100);
      })
      .catch((err) => console.log(err));
  };
  handleOnCloseForm = () => {
    this.setState({
      isToggleForm: false,
    });
  };
  handleOnFocus = (e) => {
    let { arr, idUser, id } = this.state;
    let findId = arr.findIndex((e) => e.idUser === idUser);
    arr[findId].active = false;
    this.setState({
      arr: arr,
    });
  };
  handleSearch = (e) => {
    let value = e.target.value;
    let { arr } = this.state;
    if (value.length > 1) {
      let findArr = this.state.newArr.filter((e) =>
        e.username.toLowerCase().includes(value)
      );
      this.setState({
        arr: findArr,
      });
    } else {
      this.setState({
        arr: this.state.newArr,
      });
    }
  };
  render() {
    return (
      <div className="contasiner">
        <div className="form__chat">
          <h1>MESSENGER</h1>
          <div className="input-mess">
            <SearchIcon className="search-icon" />
            <input onChange={this.handleSearch} placeholder="Search . . ." />
          </div>

          {this.state.arr.map((e) => {
            return (
              <div
                onClick={() => this.handleRepMess(e.id, e.idUser)}
                className="mess"
              >
                <div className="avt">
                  <img src={e.image} />
                </div>
                <div className="content">
                  <div className="content-mess">
                    <h3 className="username">{e.username}</h3>
                    <span className={e.active ? `message isActive` : `message`}>
                      {e.message}
                    </span>
                  </div>
                  <div className={e.active ? `seen` : ""}></div>
                </div>
              </div>
            );
          })}
        </div>
        {this.state.isToggleForm && (
          <div className="data">
            <div className="app">
              <div className="chat__realtime">
                <div className="info">
                  <div className="img">
                    <img src={this.state.image} />
                  </div>
                  <div className={`name ${this.state.username}`}>
                    <h3>{this.state.username}</h3>
                  </div>
                </div>
                <div className="close-icon">
                  <CloseIcon onClick={this.handleOnCloseForm} />
                </div>
              </div>
              <div className="mt-mess">
                {this.state.messBuyId.map((e) => {
                  return (
                    <div className="all__mess">
                      <div className="all__mess-img">
                        {e.username !== "admin" && <img src={e.image} />}
                      </div>
                      <span className={`mess__detail ${e.username}`}>
                        {e.message} <br />{" "}
                      </span>
                    </div>
                  );
                })}
                {this.state.isEntering && (
                  <span className="ityping">{`${this.state.username}  is entering . . .`}</span>
                )}
              </div>

              <div className="input__message">
                <TextField
                  className="input"
                  id="standard-basic"
                  label="Message . . ."
                  variant="standard"
                  size="small"
                  name="address"
                  onChange={this.handleOnChange}
                  value={this.state.message}
                  autoComplete="off"
                  onFocus={this.handleOnFocus}
                />
                <div>
                  <span class="bottom"></span>
                  <span class="right"></span>
                  <span class="top"></span>
                  <span class="left"></span>
                </div>
                <Button
                  variant="contained"
                  color="success"
                  onClick={this.handleOnClick}
                >
                  SEND
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { listUser: state.listUser, chat: state.chat };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: () => {
      dispatch(actions.getAllUser());
    },
    getAllMess: () => {
      dispatch(actions.getAllMess());
    },
    handleRepMess: (id) => {
      dispatch(actions.handleRepMess(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
