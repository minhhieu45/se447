import React, { Component } from "react";
import { connect } from "react-redux";
class CartItem extends Component {
  onHandleDelete = (id) => {
    this.props.onHandleDelete(id);
  };
  handleTang = (id, quantity) => {
    this.props.handleTang(id, quantity);
  };
  render() {
    let { id, quantity, image, title, price, description } = this.props;
    return (
      <>
        <tr>
          <td>
            <img src={image} />
          </td>
          <td>{price} đ</td>
          <td>{title}</td>
          <td>
            <button
              onClick={() => this.onHandleDelete(id)}
              type="button"
              className="delete-btn btn btn-danger"
            >
              Xoá
            </button>
          </td>
          <td>
            <div className="handle__btn">
              {" "}
              <button
                onClick={() => this.handleTang(id, --quantity)}
                type="button"
                class="btn btn-default"
              >
                -
              </button>
              <span class="label label-success">{quantity}</span>
              <button
                onClick={() => this.handleTang(id, ++quantity)}
                type="button"
                class="btn btn-default"
              >
                +
              </button>
            </div>
          </td>
          <td>{Number.parseFloat(price) * quantity} đ</td>
        </tr>
      </>
    );
  }
}
export default connect()(CartItem);
