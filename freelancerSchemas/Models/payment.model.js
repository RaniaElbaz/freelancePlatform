const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    
},{_id: false });

module.exports = paymentSchema;