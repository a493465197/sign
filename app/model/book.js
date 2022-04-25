module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const BookSchema = new Schema({
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
        id: {
            type: String,
            default: Math.random().toString().slice(2,8)
        },
        mainImg: {
            type: Object
        },
        detailImg: {
            type: Object
        },
        time: {
            type: Number,
            default: Date.now()
        },

    });
    return mongoose.model('Book', BookSchema, 'book');
}