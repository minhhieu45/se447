import React, { Component } from "react";
import { connect } from "react-redux";
class PayHistoryItem extends Component {
  destroyOrder = (id, obj) => {
    if (window.confirm(`Bạn có chắc chắn huỷ đơn hàng này không ?`)) {
      this.props.destroyOrder(id);
      this.props.addCancelProduct(obj);
    }
  };
  render() {
    let { id, image, title, price, active, description } = this.props;
    return (
      <>
        <tr>
          <td>
            <img src={image} />
          </td>
          <td>{price} đ</td>
          <td>{title}</td>
          <td>
            <span
              className={active ? `label label-success` : `label label-danger`}
            >
              {active ? `Đã phê duyệt ` : `Chưa được phê duyệt`}
            </span>
          </td>
          <td style={{ textAlign: "center" }}>
            {active ? (
              <button
                type="button"
                className="btn btn-sm btn-primary"
                title="Không thể hủy đơn đặt hàng vì cửa hàng gửi sản phẩm"
                disabled
                onMouseOver={this.handleOnMouseEvent}
              >
                Huỷ đơn hàng
              </button>
            ) : (
              <button
                onClick={() =>
                  this.destroyOrder(id, {
                    id,
                    image,
                    title,
                    price,
                    active,
                    description,
                  })
                }
                type="button"
                className="btn btn-sm btn-primary"
              >
                Huỷ đơn hàng
              </button>
            )}
          </td>
        </tr>
      </>
    );
  }
}
export default connect()(PayHistoryItem);
