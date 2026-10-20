import { Router } from "express"
import { listAuthors, getAuthorsById, createAuthors, updateAuthors, deleteAuthors } from "../controllers/author.controllers.js"
import { authorId, name, nationality, birthYear, bookId } from "../validators/author.validators.js"

const router = Router()

router.get("/", listAuthors)
router.get("/:id", getAuthorsById)
router.post("/", [authorId,name, nationality, birthYear, bookId] ,createAuthors)
router.put("/:id", [authorId,name, nationality, birthYear, bookId] ,updateAuthors)
router.delete("/:id", [authorId] ,deleteAuthors)

export default router