module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const SignSchema = new Schema({
        username: {
            type: String
        },
        // title: {
        //     type: String
        // },
        keyId: {
            type: String,
        },
        sign: {
            type: String,
        },
        file: {
            type: Object,
        },
        jarSignFile: String,
        jarUnSignFile: String,
        time: {
            type: Number,
            default: Date.now()
        },

    });
    return mongoose.model('Sign', SignSchema, 'sign');
}