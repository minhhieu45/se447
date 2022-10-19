const order = require("./../models/order");
class Orders {
  Orders = async (orders) => {
    const ordersModel = await order();
    try {
      orders.forEach(async (order) => {
        delete order.id;
        order.active = false;
        ordersModel.create(order);
      });
      return {
        statusCode: 200,
        message: `Order successfully !`,
      };
    } catch (error) {
      console.log(error);

      return {
        statusCode: 400,
        message: `Orders fail, plz order again !`,
      };
    }
  };
  getAllOrders = async () => {
    const ordersModel = await order();
    try {
      let orderList = await ordersModel.findAll();
      return {
        statusCode: 200,
        message: `Get Order successfully !`,
        orderList,
      };
    } catch (error) {
      console.log(error);

      return {
        statusCode: 400,
        message: `Orders fail, plz order again !`,
      };
    }
  };
  getOrdersById = async (id) => {
    const ordersModel = await order();
    try {
      let orderList;
      orderList = await ordersModel.findAll({
        where: {
          idUser: id,
        },
      });
      return {
        statusCode: 200,
        message: `Get Order successfully !`,
        orderList,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 400,
        message: `Orders fail, plz order again !`,
      };
    }
  };
  updateIsActive = async (id) => {
    const ordersModel = await order();
    let findOne = await ordersModel.findOne({
      where: {
        id,
      },
    });
    try {
      ordersModel.update(
        {
          active: !findOne.active,
        },
        {
          where: {
            id,
          },
        }
      );
      return {
        statusCode: 200,
        message: `Approved success!`,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: `Approved failed!`,
      };
    }
  };
  destroyOrder = async (id) => {
    const ordersModel = await order();
    try {
      ordersModel.destroy({
        where: {
          id,
        },
      });
      return {
        statusCode: 200,
        message: `Destroy Order Successfully !`,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: `Destroy Order Failed !`,
      };
    }
  };
}
module.exports = new Orders();
