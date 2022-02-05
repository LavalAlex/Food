const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var model = mongoose.model;
// var Diet = model('Diet');

const recipeShema = new Schema({
    id:String,
    name:String,
    summary:String,
    score: Number,
    health: Number,
    step:[{
        type:String
    }],
    createInDB:Boolean,
    img:String,
    dishTypes:[{
        type: String
    }],
    diet:{type: [String], ref: "Diet"}
});

module.exports = model('Recipe', recipeShema);