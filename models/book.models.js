import { Schema, model } from "mongoose";

const bookSchema = new Schema({
    title: { type: String, required: true, min: 1, max: 20 },
    isbn: { type: String, requireed: true, unique: true, pattern: "^\\d+$", min: 10, max: 13 },
    author: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: true
    },
    genre: { type: String, enum: ['novela', 'cuento', 'poesia', 'ensayo', 'tecnologia', 'historia', 'infantil']},
    year: { type: String, required: true, min: 0,  validate: {
      validator: Number.isInteger, //valor entero
      message: '{VALUE} no es un número entero válido.'
    }, validate: { //no mayor el año actual
      validator: function(valor) {
        const anioActual = new Date().getFullYear();
        return valor <= anioActual;
      },
      message: props => `${props.value} no puede ser mayor al año actual (${new Date().getFullYear()}).`
    }},
    totalCopies: { type: Number, required: true, miCampoEntero: {
        bsonType: 'int', 
        minimum: 1,      // Mayor o igual a 1
        description: 'Debe ser un número entero mayor o igual a 1 y es obligatorio'
    }},
    availableCopies: { type: Number, miCampoEntero: {
        bsonType: 'int', 
        minimum: 0,     
        description: 'Debe ser un número entero mayor o igual a 1 y es obligatorio'
    }},
    active: { type: Boolean, required: true}
}, {
    timestamps: true,
    versionKey: false
});

export default model("Book", bookSchema);