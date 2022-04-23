module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const OrderSchema = new Schema({
        username: {
            type: String
        },
        title: {
            type: String
        },
        detail: {
            type: String
        },
        auth: {
            type: String
        },
        price: {
            type: String
        },
        buyer: {
            type: String
        },
        bookId: {
            type: String
        },
        orderId: {
            type: String,
            default: Math.random().toString().slice(2,8)
        },
        time: {
            type: Number,
            default: Date.now()
        },

    });
    return mongoose.model('Order', OrderSchema, 'order');
}