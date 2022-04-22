module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const DakaSchema = new Schema({
        username: {
            type: String
        },
        time: {
            type: Number,
            default: Date.now()
        }

    });
    return mongoose.model('Daka', DakaSchema, 'daka');
}