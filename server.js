const express = require("express");
const cors = require("cors")
const {createServer} = require("node:http")
const {Server} = require("socket.io")
const dotenv = require("dotenv")
const connectDb = require("./utils/connectDb")
const  userRoute = require("./routes/userRoutes");
const appRoute = require("./routes/appRoutes");

dotenv.config()

const app = express();
const server = createServer(app)

connectDb()


const io = new Server(server)

io.on("connection", (socket) => {
    console.log("Socket connected")
    socket.on("disconnect", () => {
        console.log("Socket disconnected: " + socket.id);
    });
})

app.use(cors())
app.use(express.json())

app.use("/", appRoute)
app.use("/auth", userRoute)


app.listen(process.env.port || 8000 , () => {
    console.log("Server started successfully at port 8000")
})