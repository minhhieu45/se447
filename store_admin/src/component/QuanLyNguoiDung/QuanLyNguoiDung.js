import React, { Component } from "react";
import { TextField, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { withAlert } from "react-alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import "./QuanLyNguoiDung.css";
import io from "socket.io-client";
class QuanLyNguoiDung extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      listUser: [],
      username: "",
      email: "",
      password: "",
      address: "",
      numberphone: "",
      role: "",
      toggleForm: true,
      isLoading: true,
    };
    this.socket = io(`localhost:9000/`, {
      transports: ["websocket", "polling", "flashsocket"],
    });
  }
  componentDidMount() {
    this.props.getHotCustomer();
    this.socket.on("register", () => {
      this.props.getAllUser();
    });
  }
  callFunctionHandleMessage = () => {
    setTimeout(() => {
      this.props.getAllUser();
      let { statusCode, message } = this.props.message;
      console.log(message);
      const alert = this.props.alert;
      if (statusCode === 200) {
        alert.success(message);
        this.setState({
          username: "",
          email: "",
          password: "",
          id: "",
          address: "",
          numberphone: "",
          role: "",
        });
        return;
      }
      alert.error(message);
    }, 900);
  };
  handleClick = (value) => {
    let { id } = value.row;
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản không ?`)) {
      this.props.deleteUser(id);
      this.callFunctionHandleMessage();
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.listUser !== this.props.listUser) {
      this.setState({
        listUser: [...this.props.listUser],
        isLoading: false,
      });
    }
  }
  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  createNewUser = (e) => {
    e.preventDefault();
    let { role, id, username, email, password, address, numberphone } =
      this.state;
    if (!id) {
      this.props.createNewUser({
        username,
        email,
        password,
        address,
        numberphone,
        role,
      });
      this.callFunctionHandleMessage();
      return;
    }
    this.props.handleUpdateUser({
      id,
      role,
      username,
      email,
      password,
      address,
      numberphone,
    });
    this.callFunctionHandleMessage();
  };
  handleUpdateUser = (value) => {
    this.setState({
      toggleForm: true,
    });
    let { role, id, email, username, password, address, numberphone } =
      value.row;
    this.setState({
      id,
      email,
      username,
      password,
      address,
      numberphone,
      role,
    });
  };
  handleToggleForm = () => {
    this.setState({
      toggleForm: !this.state.toggleForm,
    });
  };
  handleCloseForm = () => {
    this.setState({
      toggleForm: false,
    });
  };
  handleGetNumberPhone = (e) => {
    this.setState({
      numberphone: e,
    });
  };
  handleOnchange = (e) => {
    console.log(e.target.name);
  };
  render() {
    const columns = [
      { field: "id", headerName: "ID", width: 70, headerAlign: "center" },
      {
        field: "username",
        headerName: "Username",
        width: 100,
      },
      {
        field: "email",
        headerName: "Email",
        width: 200,
      },
      {
        field: "role",
        headerName: "Role",
        width: 100,
      },
      {
        field: "password",
        headerName: "Mật khẩu",
        width: 100,
      },
      {
        field: "address",
        headerName: "Địa chỉ",
        width: 100,
        type: "text",
      },
      {
        field: "numberphone",
        headerName: "Số điện thoại",
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
                color="success"
                onClick={() => this.handleUpdateUser(cellValues)}
              >
                Chỉnh sửa
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => this.handleClick(cellValues)}
              >
                Xoá
              </Button>
            </>
          );
        },
        headerAlign: "center",
      },
    ];

    const rows = [...this.state.listUser.reverse()];
    let { hotCus } = this.props;
    let getKey = [];
    for (const key in hotCus) {
      getKey.push([key, hotCus[key]]);
    }
    let sortKey = [...getKey.sort((a, b) => b[1] - a[1])];
    let getArr = [];
    let top = 1;
    sortKey.forEach((e) => {
      let mang = this.state.listUser.filter(
        (user) => user.id === parseInt(e[0])
      );
      const obj = Object.assign({}, mang);
      let newObj = { ...obj[0] };
      newObj.total = e[1];
      newObj.top = top++;
      getArr.push({ ...newObj });
    });
    const rowss = [...getArr];
    return (
      <div className="container">
        {this.state.toggleForm ? (
          <div className="form">
            <span className="text-controll">FORM COTROLL CUSTOMER</span>
            <CancelPresentationOutlinedIcon
              onClick={this.handleCloseForm}
              className="close-button"
            ></CancelPresentationOutlinedIcon>
            <TextField
              onChange={this.handleOnChange}
              className="input"
              id="outlined-basic"
              label="User Name"
              variant="standard"
              size="small"
              name="username"
              value={this.state.username}
            />
            <TextField
              onChange={this.handleOnChange}
              className="input"
              id="filled-basic"
              label="Email"
              variant="standard"
              size="small"
              name="email"
              aria-controls
              value={this.state.email}
            />
            <TextField
              onChange={this.handleOnChange}
              className="input"
              id="standard-basic"
              label="Pass word"
              variant="standard"
              size="small"
              name="password"
              type="password"
              value={this.state.password}
            />
            <TextField
              onChange={this.handleOnChange}
              className="input"
              id="standard-basic"
              label="Address"
              variant="standard"
              size="small"
              name="address"
              value={this.state.address}
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Age"
                onChange={this.handleOnChange}
                name="role"
                value={this.state.role}
              >
                <MenuItem value="customer" selected={true}>
                  customer
                </MenuItem>
                <MenuItem value="admin">admin</MenuItem>
              </Select>
            </FormControl>
            <div className="form-group">
              <label htmlFor="numberphone">Number Phone</label>
              <PhoneInput
                placeholder="Enter phone number"
                onChange={this.handleGetNumberPhone}
                value={this.state.numberphone}
              />
            </div>

            <Button
              variant="contained"
              color="success"
              onClick={this.createNewUser}
              className="success-btn"
            >
              {this.state.id ? `Update` : `Register`}
            </Button>
          </div>
        ) : (
          ""
        )}
        {this.state.isLoading ? (
          `Loading Data . . . Please waiting !!! `
        ) : (
          <>
            <div className="data">
              <Button
                onClick={this.handleToggleForm}
                style={{ marginBottom: "20px" }}
                className="edit"
                variant="contained"
                color="success"
              >
                Add Account
                <AddOutlinedIcon style={{ paddingLeft: "10px" }} />
              </Button>
              <DataGrid rows={rows} columns={columns} pageSize={4} />
            </div>
            <div className="user">
              <div className="hot-customer">
                <span className="top-customer">TOP CUSTOMER :v</span>
                {/* {getArr.map((user) => {
                  return (
                    <div className="custommer">
                      <h4>{user.top}</h4>
                      <div className="custommer__name">{user.name}</div>
                      <div className="custommer__email">{user.email}</div>
                      <div className="custommer__creadAt">{user.createdAt}</div>
                      <div className="custommer__total">{user.total}</div>
                    </div>
                  );
                })} */}
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650, textAlign: "center" }}
                    aria-label="caption table"
                  >
                    <caption>TOP CUSTOMERS</caption>
                    <TableHead>
                      <TableRow>
                        <TableCell>Top</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Email&nbsp;(g)</TableCell>
                        <TableCell align="center">
                          Created At&nbsp;(g)
                        </TableCell>
                        <TableCell align="center">Total&nbsp;($)</TableCell>
                        <TableCell align="center">Sticket&nbsp;($)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ textAlign: "center" }}>
                      {rowss.map((row) => (
                        <TableRow
                          className="row-username"
                          style={{ color: "red !important" }}
                          key={row.name}
                        >
                          <TableCell component="th" scope="row">
                            {row.top}
                          </TableCell>
                          <TableCell className="text-row" align="center">
                            {row.username}
                          </TableCell>
                          <TableCell className="text-row" align="center">
                            {row.email}
                          </TableCell>
                          <TableCell className="text-row" align="center">
                            {row.createdAt}
                          </TableCell>
                          <TableCell className="text-row" align="center">
                            {row.total} đ
                          </TableCell>
                          <TableCell className="text-row" align="center">
                            <Button
                              className="edit"
                              variant="contained"
                              color="success"
                            >
                              Sticket
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                ;
              </div>
              <div className="active-customer">
                <h3>New Customer</h3>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={6}
                  autoHeight
                />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
export default withAlert()(QuanLyNguoiDung);
