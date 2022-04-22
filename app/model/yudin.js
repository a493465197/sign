module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const YudinSchema = new Schema({
        username: {
            type: String
        },
        start: {
            type: Number,
            default: Date.now()
        },
        end: {
            type: Number,
            default: Date.now()
        },
        loca: {
            type: String,
        },

    });
    return mongoose.model('Yudin', YudinSchema, 'yudin');
}