module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const GetKeyAuthSchema = new Schema({
        username: {
            type: String
        },
        isComp: {
            type: Boolean,
            default: false
        },
        isAgree: {
            type: Boolean,
        },
        keyId: {
            type: String
        },
        id: {
            type: String,
            default: () => Math.random().toString().slice(2,12)
        },
        time: {
            type: Number,
            default: Date.now()
        },

    });
    return mongoose.model('GetKeyAuth', GetKeyAuthSchema, 'getKeyAuth');
}