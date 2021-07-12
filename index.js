const app = require("express")();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const mongoose = require("./config/database");
const apiConnect = require("./routes");
const bodyParser = express.json();

function main() {
  const app = express();
  const server = require("http").createServer(app);
  app.use(cors());
  app.use(bodyParser);

  mongoose;

  app.use(morgan("dev"));

  app.use("/api", apiConnect);
  app.use(express.static("public"));

  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  const PORT = process.env.PORT || 5000;

  app.get("/", (req, res) => {
    res.send("Running");
  });

  io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
      socket.broadcast.emit("endCall");
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
      io.to(userToCall).emit("callUser", {
        signal: signalData,
        from,
        name,
      });
    });

    socket.on("updateMyMedia", ({ type, currentMediaStatus }) => {
      console.log("updateMyMedia");
      socket.broadcast.emit("updateUserMedia", { type, currentMediaStatus });
    });

    socket.on("msgUser", ({ name, to, msg, sender }) => {
      io.to(to).emit("msgRcv", { name, msg, sender });
    });

    socket.on("answerCall", (data) => {
      socket.broadcast.emit("updateUserMedia", {
        type: data.type,
        currentMediaStatus: data.myMediaStatus,
      });
      io.to(data.to).emit("callAccepted", data);
    });
    socket.on("endCall", ({ id }) => {
      io.to(id).emit("endCall");
    });
  });

  server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}
main();
