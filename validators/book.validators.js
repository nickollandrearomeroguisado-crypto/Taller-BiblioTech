import { check } from "express-validator"

const bookId = check("id", "El id no es valido")
.not().isEmpty()
.isMongoId().withMessage("El id deber ser un id de mongo válido")

const title = check("title", "El titutlo es obligatorio")
.trim()
.not().isEmpty()
.isString()
.isLength({ min: 3, max: 50 })
.withMessage("EL titulo debe tener entre 3 y 50 caracteres")
.custom((value) => {
    if (value.toLowerCase().includes("book")) {
        throw new Error("El titulo no puede contener la palabra 'book'");
    }
    return true;
});

const isbn = check("isbn", "El isbn es obligatoria")
.trim()
.not().isEmpty()
.isNumeric()
.isLength({ min:6, max: 30 })
.withMessage("El isbn debe tener entre 6 y 30 caracteres")
.custom((value) => {
    if (value.toLowerCase()) {
        throw new Error("El isbn no puede tener palabras");
    }
    return true;
});



export {
    bookId, 
    title,
    isbn
}