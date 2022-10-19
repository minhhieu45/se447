const OdersService = require("./../service/orders.service");
class Orders {
  orders = async (req, res) => {
    let result = await OdersService.Orders(req.body);
    return res.json(result);
  };
  getAllOrders = async (req, res) => {
    let result = await OdersService.getAllOrders();
    return res.json(result);
  };

  getOrdersById = async (req, res) => {
    let result = await OdersService.getOrdersById(req.params.id);
    return res.json(result);
  };
  updateIsActive = async (req, res) => {
    let result = await OdersService.updateIsActive(req.params.id);
    return res.json(result);
  };
  destroyOrder = async (req, res) => {
    let result = await OdersService.destroyOrder(req.params.id);
    return res.json(result);
  };
}
module.exports = new Orders();
