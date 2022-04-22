module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        username: {
            type: String
        },
        password: {
            type: String
        },
        name: {
            type: String
        },
        birth: {
            type: String
        },
        job: {
            type: String
        },
        xinjin: {
            type: String
        },
        joinDate: {
            type: String
        },
        shangji: {
            type: String
        },
        xiaji: {
            type: String
        },
        isAdmin: {
            type: Boolean,
            default: false
        },

    });
    return mongoose.model('User', UserSchema, 'user');
}