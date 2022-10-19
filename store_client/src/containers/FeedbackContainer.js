import React, { Component } from "react";
import { connect } from "react-redux";
import Feedback from "../components/Feedback/Feedback";
import actions from "./../actions/store";
class FeedbackContainer extends Component {
  handleSendFeedback = (obj) => {
    this.props.handleSendFeedback(obj);
  };
  render() {
    return (
      <>
        <Feedback handleSendFeedback={this.handleSendFeedback} orderMess={this.props.orderMess} />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    orderMess: state.orderMess
  };
};
const mapDispatchToProps = (disPatch) => {
  return {
    handleSendFeedback: (obj) => {
      disPatch(actions.handleSendFeedback(obj));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FeedbackContainer);
