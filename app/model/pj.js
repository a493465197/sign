module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const PjSchema = new Schema({
        orderId: {
            type: String
        },

        pj: {
            type: String
        },

        pjId: {
            type: String,
            default: () => Math.random().toString().slice(2,8)
        },
        time: {
            type: Number,
            default: Date.now()
        },

    });
    return mongoose.model('Pj', PjSchema, 'pj');
}