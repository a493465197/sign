module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const KeySchema = new Schema({
        username: {
            type: String
        },
        title: {
            type: String
        },
        key: {
            type: String,
            default: () => Math.random().toString().slice(2, 12)
        },
        isCheck: {
            type: Boolean,
            default: false
        },
        isFrozen: {
            type: Boolean,
            default: false
        },
        users: {
            type: Array,
            default: []
        },
        id: {
            type: String,
            default: () => Math.random().toString().slice(2, 12)
        },
        time: {
            type: Number,
            default: Date.now()
        },

    });
    return mongoose.model('Key', KeySchema, 'key');
}