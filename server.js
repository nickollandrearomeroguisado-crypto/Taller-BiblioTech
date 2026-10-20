import express from "express"
import 'dotenv/config'
import { dbconnection } from "./database/config.js";
import authorRouter from "./routes/authors.router.js";
import Author from "./models/autor.models.js";
import bookRouter from "./routes/books.router.js";
import Book from "./models/book.models.js";

export default class Server {
    app
    port
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.middlewares()
        this.routes()
        this.connectDB()
    }

    middlewares() {
        this.app.use(express.json())
        console.log(process.env.PORT)
    }

    routes() {
        this.app.use("/api/author", authorRouter)

        this.app.use("/api/book", bookRouter)
    }

    async connectDB() {
        await dbconnection()
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Listen port " + this.port)
        })
    }
}

// new Server().listen()
