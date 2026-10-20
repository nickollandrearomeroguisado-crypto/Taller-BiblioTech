import Book from "../models/book.models.js"

export const listBook = async (req, res, next) => {
    try {
        const activeBooks = await Book.find({ active: true }).populate("author", "name");

        console.log(activeBooks);

        // const idAuthor = "6ad1661b9940444586f8d4f0";
        // const idAuthor2 = "6ad1661b9940444586f8d4f1";

        // const book = await Book.create({
        //     title: "100 de años de Soledad",
        //     isbn: 123.456,
        //     autor: idAuthor,
        //     genre: "novela",
        //     year: 1995,
        //     totalCopies: 4,
        //     availableCopies: 2,
        //     active: true
        // })

        // const book2 = await Book.create({
        //     title: "La Divina Comedia",
        //     isbn: 789.123,
        //     autor: idAuthor2,
        //     genre: "historia",
        //     year: 1989,
        //     totalCopies: 5,
        //     availableCopies: 3,
        //     active: false
        // })

        // res.status(201).json({
        //     ok: true,
        //     book: book,
        //     book2: book2
        // })

        res.status(200).json({
            ok: true,
            activeBooks
        });
    } catch (error) {
        next (error)
    }
}

export const bookAvailableCopies = async (req, res, next) => {
    try {
        const books = await Book.find({ availableCopies: { $gt: 0 } })

        res.status(200).json({
            ok: true,
            books
        })
    } catch (error) {
        next(error)
    }
}

export const bookAuthor = async (req, res, next) => {
    try {
        const books = await Book.find().populate("author")

        res.status(200).json({
            ok: true,
            books
        })
    } catch (error) {
        next(error)
    }
}

export const createBooks = async (req, res, next) => {
    try {
        // const nuevo = await Book.create(req.body)
        const { title, isbn, author, genre, year, totalCopies, active } = req.body;

        const book = await Book.create({
            title,
            isbn,
            author,
            genre,
            year,
            totalCopies,
            availableCopies: totalCopies, // igual al total al crear
            active
        });

        res.status(201).json({
            ok: true,
            book
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const updateBooks = async (req, res, next) => {
    try {
        const books = await Book.findByIdAndUpdate(req.params.id, req.body, { new : true });

        if(!books) {
            res.status(404).json({
                ok: false,
                msg: "Libro no encontrado"
            })
            return;
        }

        res.status(200).json({
            ok: true,
            books
        })
    } catch (error) {
        next(error);
    }
};

//pendiente crear la funcion para eliminar libros cuando prestmaos(loan) esten activos