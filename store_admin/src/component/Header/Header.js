import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import { connect } from "react-redux";
import actions from "./../../actions/userActions";
class Header extends Component {
  handleChangeCss = (event) => {
    let linkItem = document.querySelectorAll(".link-item");
    let id = event.target.id;
    let findTarget = document.querySelector(`#${id}`);

    linkItem.forEach((e) => {
      if (e.parentElement.parentElement.classList.contains("active__class")) {
        e.parentElement.parentElement.classList.remove("active__class");
      }
    });
    findTarget.parentElement.parentElement.classList.add("active__class");

    this.props.addLoading();
    setTimeout(() => {
      this.props.removeLoading();
    }, 1000);
  };
  componentDidMount() {
    let linkItem = document.querySelectorAll(".link-item");
    linkItem[0].parentElement.parentElement.classList.add("active__class");
  }
  render() {
    let customLink = [
      {
        text: "Quản lí người dùng",
        to: "/quanlynguoidung",
        icon: <PeopleAltOutlinedIcon className="icon"></PeopleAltOutlinedIcon>,
        id: "qlnd",
      },
      {
        text: "Quản lí giỏ hàng",
        to: "/quanlygiohang",
        icon: (
          <ShoppingCartOutlinedIcon className="icon"></ShoppingCartOutlinedIcon>
        ),
        id: "qlgh",
      },
      {
        text: "Quản lí sản phẩm",
        to: "/quanlysanpham",
        icon: <PostAddOutlinedIcon className="icon"></PostAddOutlinedIcon>,
        id: "qlsp",
      },
      {
        text: "Quản lí feedback",
        to: "/quanlyphanhoi",
        icon: <SmsOutlinedIcon className="icon"></SmsOutlinedIcon>,
        id: "qlph",
      },
      {
        text: "Quản lí chat",
        to: "/chat",
        icon: <SmsOutlinedIcon className="icon"></SmsOutlinedIcon>,
        id: "chat",
      },
    ];
    return (
      <>
        <div className="headerMenu">
          <ul className="">
            {customLink.map((link, index) => {
              return (
                <li onClick={this.handleAddCss}>
                  <div className="icon-header">
                    {link.icon}
                    <Link
                      onClick={this.handleChangeCss}
                      key={index}
                      className={`link-item `}
                      to={link.to}
                      id={link.id}
                    >
                      {link.text}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    addLoading: () => {
      dispatch(actions.addLoading());
    },
    removeLoading: () => {
      dispatch(actions.removeLoading());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
