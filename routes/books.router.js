import { Router } from "express";
import { listBook, bookAvailableCopies, bookAuthor, createBooks, updateBooks } from "../controllers/book.controller.js";
import { bookId, title, isbn, autorId, genre, year, totalCopies, availableCopies } from "../validators/book.validators.js";

const router = Router()

router.get("/", listBook)
router.get("/available", bookAvailableCopies)
router.get("/:id", [bookId] ,bookAuthor)
router.post("/", [bookId, title, isbn, authorId, genre, year, totalCopies, availableCopies] ,createBooks)
router.put("/:id", [bookId, title, isbn, authorId, genre, year, totalCopies, availableCopies ] ,updateBooks)

export default router