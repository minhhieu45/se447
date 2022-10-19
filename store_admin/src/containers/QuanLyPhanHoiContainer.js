import React, { Component } from "react";
import QuanLyPhanHoi from "../component/QuanLyPhanHoi/QuanLyPhanHoi";
import { connect } from "react-redux";
import actions from "./../actions/getAllFeedback";
import actionsUser from "./../actions/userActions";
class QuanLyPhanHoiContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrFb: [],
    };
  }
  componentDidMount() {
    this.props.getAllFeedback();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.fb !== this.props.fb) {
      this.setState({
        arrFb: this.props.fb,
      });
    }
  }
  sendMessage = (obj) => {
    this.props.sendMessage(obj);
  };
  deleteFeedback = (id) => {
    this.props.deleteFeedback(id);
    setTimeout(() => {
      this.props.getAllFeedback();
    }, 300);
  };
  render() {
    return (
      <>
        <QuanLyPhanHoi
          fb={this.state.arrFb}
          sendMessage={this.sendMessage}
          messAll={this.props.messAll}
          deleteFeedback={this.deleteFeedback}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    fb: state.fb,
    messAll: state.messAll,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllFeedback: () => {
      dispatch(actions.getAllFeedback());
    },
    sendMessage: (obj) => {
      dispatch(actions.sendMessage(obj));
    },
    addLoading: () => {
      dispatch(actionsUser.addLoading());
    },
    removeLoading: () => {
      dispatch(actionsUser.removeLoading());
    },
    deleteFeedback: (id) => {
      dispatch(actions.deleteFeedback(id));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuanLyPhanHoiContainer);
