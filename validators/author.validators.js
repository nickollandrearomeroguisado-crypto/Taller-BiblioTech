import { check } from "express-validator"

const bookId = check("id", "El id no es válido")
.not().isEmpty()
.isMongoId().withMessage("El id debe ser un id de mongo válido")

const authorId = check("id", "El id de autorno es válido")
.not().isEmpty()
.isMongoId().withMessage("El id de autor debe ser un id de mongo válido")

const name = check("name", "El nombre es obligatorio")
.trim()
.not().isEmpty()
.isString()
.isLength({ min: 3, max: 50 })
.withMessage("El nombre debe tener entre 3 y 50 caracteres")
.custom((value) => {
    if (value.toLowerCase().include("author")) {
        throw new Error("El nombre no puede contener la palabra 'author'");
    }
    return true;
});

const nationality = check("nationality", "La nacionalidad es obligatorio")
.trim()
.not().isEmpty()
.isString()
.isLength({ min: 5, max: 10 })
.withMessage("La nacionalidad debe tener entre 5 a 10 caracteres")
.custom((value) => {
    if (value.toLowerCase().includes("author")) {
        throw new Error("La nacionalidad no puede tener contener la palabra 'author'");
    }
    return true;
});

const birthYear = check("birthYear", "El año que nació es obligatorio")
.trim()
.not().isEmpty()
.isNumeric()
.custom((value) => {
    if (value.toLowerCase()) {
        throw new Error("El año que nacio no puede contener palabras");
    }
    return true;
});

export {
    bookId,
    authorId,
    name,
    nationality,
    birthYear
}