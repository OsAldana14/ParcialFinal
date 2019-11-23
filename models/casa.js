const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CasaSchema = Schema({
    owner: {
        type: String,
        required: true,
        unique: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    habitaciones: {
        type: Number,
        required: true,
    },
    cochera: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model("Casa", CasaSchema);