import Author from "../models/autor.models.js"
import Book from "../models/book.models.js"

export const listAuthors = async (req, res, next) => {
    try {
        const authors = await Author.find({ isActive: true })
        
        console.log(authors)
        
        res.status(200).json({
            ok: true,
            authors
        })
        
        // const authors2 = await Author.create({
        //     name: "Gabriel",
        //     nationality: "Colombia",
        //     birthYear: 1993,
        //     active: true
        // })
        
        // const authors3 = await Author.create({
        //     name: "Dante",
        //     nationality: "San Andrés",
        //     birthYear: 1988,
        //     active: false
        // })

        // res.status(201).json({
        //     ok: true,
        //     authors,
        //     authors: authors2,
        //     authors2: authors3
        // })

    } catch (error) {
        next(error)
    }
}

export const getAuthorsById = async (req, res, next) => {
    try {
        const authors = await Author.findById(req.params.id).populate("book")
        
        if (!authors) {
            res.status(404).json({
                ok: false,
                msg: "Autor no encontrado"
            })
            return
        }

        
    } catch (error) {
        next(error)
    }
}

export const createAuthors = async (req, res, next) => {
    try {
        const nuevo = await Author.create(req.body)

        console.log(nuevo)

        res.status(201).json({
            ok: true, 
            nuevo
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const updateAuthors = async (req, res, next) => {
    try {
        const authors = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!authors) {
            res.status(404).json({
                ok: false,
                msg: "Autor no encontrado"
            })
            return;
        } 

        res.status(200).json({
            ok: true,
            authors
        })
    } catch (error) {
        next(error);
    }
}

export const deleteAuthors = async (req, res, next) => {
    try {
        const authors = await Author.findByIdAndDelete(req.params.id);

        const hasActiveBooks = await Book.exists({ author: authors, status: 'active' });

        if (hasActiveBooks) {
            return res.status(409).json({
                message: 'No se puede eliminar el autor porque tiene libros activos asociados.'
            })
        }

        if (!authors) {
            res.status(404).json({
                ok: false,
                msg: "Autor no encontrado"
            })
            return; 
        }

        res.status(200).json({
            ok: true,
            msg: "Autor Eliminado"
        })
    } catch (error) {
        next(error);
    }
}

