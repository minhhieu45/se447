import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Header from "./components/Header/Header";
import RegisterContainer from "./containers/RegisterContainer";
import LoginContainer from "./containers/LoginContainer";
import HomeContainer from "./containers/HomeContainer";
import StoreContainer from "./containers/StoreContainer";
import CartContainer from "./containers/CartContainer";
import Feedback from "./containers/FeedbackContainer";
import PayHistoryContainer from "./containers/PayHistoryContainer";
import ViewDetailsContainer from "./containers/ViewDetailsContainer";
import AccountContainer from "./containers/AccountContainer";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let heightHeader = document.querySelector(".header");
    let { height } = heightHeader.getBoundingClientRect();

    window.addEventListener("scroll", function () {
      if (this.window.pageYOffset > height + 100) {
        heightHeader.classList.add("add-header");
        heightHeader.style.height = "70px";
        heightHeader.style.overflow = "hidden";
      } else {
        heightHeader.classList.remove("add-header");
        heightHeader.style.height = "80px";
      }
    });
  }
  render() {
    let route = [
      {
        path: "/",
        exact: true,
        component: <HomeContainer />,
      },
      {
        path: "/store",
        exact: false,
        component: <StoreContainer />,
      },
      {
        path: "/register",
        exact: false,
        component: <RegisterContainer />,
      },
      {
        path: "/login",
        exact: false,
        component: <LoginContainer />,
      },
      {
        path: "/cart",
        exact: false,
        component: <CartContainer />,
      },
      {
        path: "/feedback",
        exact: false,
        component: <Feedback />,
      },
      {
        path: "/pay-history",
        exact: false,
        component: <PayHistoryContainer />,
      },
      {
        path: "/view-details/:id",
        exact: false,
        component: <ViewDetailsContainer />,
      },
      {
        path: "/account",
        exact: false,
        component: <AccountContainer />,
      },
    ];
    return (
      <>
        {route.map((route, index) => {
          return (
            <Route key={index} path={route.path} exact={route.exact}>
              {route.component}
            </Route>
          );
        })}
        <Header />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isSpinner: state.spinnersReducer,
  };
};
export default connect(mapStateToProps, null)(App);
