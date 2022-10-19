import React, { Component } from "react";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import "./TrangChu.css";
import Chart from "../Chart/Chart";
import { Link } from "react-router-dom";

export default class TrangChu extends Component {
  componentDidMount() {
    this.props.getAllUser();
  }
  render() {
    return (
      <>
        <div className="fix-container">
          <Link to="/quanlynguoidung" className="tb new__member">
            <h3>New Member</h3>
            <div className="down">
              <GroupAddOutlinedIcon
                className="GroupAddOutlinedIcon"
                style={{ color: "red" }}
              ></GroupAddOutlinedIcon>
              <div className="count-member">{this.props.listUser.length}</div>
            </div>
            <h4>Instant Access</h4>
          </Link>
          <Link to="/quanlysanpham" className="tb total">
            <h3>Payment Order</h3>
            <div className="down">
              <div className="count-member">19</div>
              <GroupAddOutlinedIcon
                className="GroupAddOutlinedIcon"
                style={{ color: "red" }}
              ></GroupAddOutlinedIcon>
            </div>
            <h4>Instant Access</h4>
          </Link>
          <Link to="/quanlyphanhoi" className="tb contact">
            <h3>Contact Unanswered</h3>
            <div className="down">
              <div className="count-member">2</div>
              <GroupAddOutlinedIcon
                className="GroupAddOutlinedIcon"
                style={{ color: "red" }}
              ></GroupAddOutlinedIcon>
            </div>
            <h4>Instant Access</h4>
          </Link>
        </div>
        <div className="chart">
          <Chart />
        </div>
        <div className="user">
          <div className="hot-user"></div>
        </div>
      </>
    );
  }
}
