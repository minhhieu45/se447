import React, { Component } from "react";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import { DataGrid } from "@mui/x-data-grid";
import { withAlert } from "react-alert";
import { TextField, Button } from "@mui/material";
import "./QuanLyPhanHoi.css";
class QuanLyPhanHoi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleForm: false,
      email: "",
      subject: "",
      message: "",
      idUser: "",
      from: "Tiendz Store",
    };
  }
  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleToggle = (e) => {
    this.setState({
      toggleForm: true,
      email: e.row.email,
      idUser: e.row.idUser,
    });
  };
  handleCloseForm = () => {
    this.setState({
      toggleForm: false,
    });
  };
  sendMessage = () => {
    let { email, subject, message, idUser } = this.state;
    this.props.sendMessage({ email, subject, message, idUser });
    setTimeout(() => {
      let { message, statusCode } = this.props.messAll;
      let { success, error } = this.props.alert;
      if (statusCode === 200) {
        success(message);
        return;
      }
      error(message);
    }, 800);
    this.setState({
      email: "",
      subject: "",
      message: "",
      idUser: "",
    });
  };
  handleClick = (e) => {
    if (window.confirm(`Are u sure delete feebback ?`)) {
      this.props.deleteFeedback(e.row.id);
    }
    setTimeout(() => {
      let { message, statusCode } = this.props.messAll;
      let { success, error } = this.props.alert;
      if (statusCode === 200) {
        success(message);
        return;
      }
      error(message);
    }, 800);
  };
  render() {
    const columns = [
      { field: "id", headerName: "ID", width: 70, headerAlign: "center" },
      {
        field: "username",
        headerName: "Username",
        width: 140,
      },
      {
        field: "email",
        headerName: "Email",
        width: 150,
      },
      {
        field: "subject",
        headerName: "Subject",
        width: 100,
      },
      {
        field: "message",
        headerName: "Message",
        width: 100,
        type: "text",
      },
      {
        field: "createdAt",
        headerName: "Send Date",
        width: 100,
        type: "text",
      },
      {
        field: "button",
        headerName: "Action",
        width: 200,

        renderCell: (cellValues) => {
          return (
            <>
              <Button
                className="edit"
                variant="contained"
                color="primary"
                onClick={() => this.handleToggle(cellValues)}
                style={{ marginRight: "10px" }}
              >
                Messenger
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => this.handleClick(cellValues)}
              >
                Xóa
              </Button>
            </>
          );
        },
        headerAlign: "center",
      },
    ];
    const rows = [...this.props.fb.reverse()];

    return (
      <>
        <div class="fb">
          {this.state.toggleForm && (
            <div className="form">
              <span className="text-controll">FORM COTROLL FEEDBACK</span>
              <CancelPresentationOutlinedIcon
                onClick={this.handleCloseForm}
                className="close-button"
              ></CancelPresentationOutlinedIcon>
              <TextField
                onChange={this.handleOnChange}
                className="input"
                id="standard-basic"
                label="From"
                variant="standard"
                size="small"
                name="from"
                value={this.state.from}
              />
              <TextField
                onChange={this.handleOnChange}
                className="input"
                id="filled-basic"
                label="SEND TO"
                variant="standard"
                size="small"
                name="email"
                aria-controls
                value={this.state.email}
              />
              <TextField
                onChange={this.handleOnChange}
                className="input"
                id="outlined-basic"
                label="Subject"
                variant="standard"
                size="small"
                name="subject"
                value={this.state.subject}
              />

              <TextField
                onChange={this.handleOnChange}
                className="input"
                id="standard-basic"
                label="Message"
                variant="standard"
                size="small"
                name="message"
                value={this.state.message}
              />

              <Button
                variant="contained"
                color="success"
                onClick={this.sendMessage}
                className="success-btn"
              >
                SEND
              </Button>
            </div>
          )}
          <DataGrid rows={rows} columns={columns} pageSize={14} />
        </div>
      </>
    );
  }
}
export default withAlert()(QuanLyPhanHoi);
