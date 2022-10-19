import React, { Component } from "react";
import "./App.css";
import Header from "./component/Header/Header";
import TrangChuContainer from "./containers/TrangChuContainer";
import OrderManageMentContainer from "./containers/OrderManageMentContainer";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import QuanLyNguoiDungContainer from "./containers/QuanLyNguoiDungContainer";
import QuanLySanPhamContainer from "./containers/QuanLySanPhamContainer";
import QuanLyPhanHoiContainer from "./containers/QuanLyPhanHoiContainer";
import Loading from "./component/Loading/Loading";
import Login from "./component/Login/Login";
import Chat from "./component/Chat/Chat";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
class App extends Component {
  componentDidMount() {}
  render() {
    let route = [
      {
        path: "/",
        exact: true,
        component: <Login />,
      },
      {
        path: "/admin",
        exact: true,
        component: <TrangChuContainer />,
      },
      {
        path: "/quanlynguoidung",
        exact: false,
        component: <QuanLyNguoiDungContainer />,
      },
      {
        path: "/quanlygiohang",
        exact: false,
        component: <OrderManageMentContainer />,
      },
      {
        path: "/quanlysanpham",
        exact: false,
        component: <QuanLySanPhamContainer />,
      },
      {
        path: "/quanlyphanhoi",
        exact: false,
        component: <QuanLyPhanHoiContainer />,
      },
      {
        path: "/chat",
        exact: false,
        component: <Chat />,
      },
    ];
    return (
      <>
        <div class="container-children">
          <div className="containerxxx">
            <Link to="/" className="logo">
              MinhHieu
            </Link>
            <span>Z</span>
            <div className="menu">
              <NotificationsNoneIcon></NotificationsNoneIcon>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="left">
            <Header />
          </div>
          <div className="right">
            {this.props.loading ? (
              <Loading />
            ) : (
              route.map((route, index) => {
                return (
                  <Route key={index} path={route.path} exact={route.exact}>
                    {route.component}
                  </Route>
                );
              })
            )}
          </div>
        </div>
      </>
    );
  }
}
const mapStateToprops = (state) => {
  return {
    loading: state.loading,
  };
};
const mapDisptachToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToprops, mapDisptachToProps)(App);
