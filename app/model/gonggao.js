module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const GonggaoSchema = new Schema({
        username: {
            type: String
        },
        time: {
            type: Number,
            default: Date.now()
        },
        detail: {
            type: String
        },
        title: {
            type: String
        },


    });
    return mongoose.model('Gonggao', GonggaoSchema, 'gonggao');
}