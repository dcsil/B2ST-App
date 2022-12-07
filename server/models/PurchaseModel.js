const mongoose = require("mongoose")
const Schema = mongoose.Schema
const purchaseSchema = new Schema({
    event_time:{
        type: String,
        required: true
    },
    order_id:{
        type: String,
        required: true
    },
    product_id:{
        type: String,
        required: true
    },
    category_id:{
        type: String,
        required: true
    },
    category_code:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    }
});
module.exports = Purchase = mongoose.model("Purchase", purchaseSchema)