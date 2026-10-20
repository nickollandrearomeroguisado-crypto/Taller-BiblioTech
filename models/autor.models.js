import { Schema, model } from "mongoose";

const autorSchema = new Schema({
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    name: { type: String, required: true, min: 3, max: 80, unique: true },
    nationality: { type: String, required: true, min: 2, max: 40 },
    birthYear: { type: Number, required: true,  min: [0, 'El año de nacimiento no puede ser menor a 0'], validate: {
      validator: Number.isInteger,
      message: '{VALUE} no es un número entero válido.'
    }, 
    // el año actual
    default: () => new Date().getFullYear()}, 
    active: { type: Boolean, required: true, isDeleted: { //borrador logico
    type: Boolean,
    default: true 
  }}
}, {
    timestamps: true,
    versionKey: false 
});

export default model("Author", autorSchema);