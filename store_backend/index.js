const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routers/index");
const db = require("./connectDB/connect");
const models = require("./combineModels/combine");
const bodyParser = require("body-parser");
const cors = require("cors");
const socket = require("socket.io");
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
db.connect();
models.createModel();
routes(app);
const PORT = process.env.PORT || 4444;
const server = app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
io = socket(server);
io.on("connection", (socket) => {
  console.log("a user connected" + socket.id);

  socket.on("CHANGE_STATUS", (id) => {
    socket.broadcast.emit("CHANGE_STATUS", id);
  });
  socket.on("entering_loading", (id) => {
    socket.broadcast.emit("naylacaikhacdm", id);
  });
  socket.on("BUY_PRODUCT", (id) => {
    socket.broadcast.emit("BUY_PRODUCT", id);
  });

  socket.on("join_rom", (id) => {
    socket.join(id);
  });
  socket.on("register", () => {
    socket.broadcast.emit("register");
  });
  socket.on("send_mess", (data) => {
    socket.to(data.idUser).emit("message_hi", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
