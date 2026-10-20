import { Router } from "express";
import { listBook, bookAvailableCopies, bookAuthor, createBooks, updateBooks } from "../controllers/book.controller.js";

const router = Router()

router.get("/", listBook)
router.get("/available", bookAvailableCopies)
router.get("/:id", bookAuthor)
router.post("/", createBooks)
router.put("/:id", updateBooks)

export default router