import mongoose, {Schema} from 'mongoose';

const SessionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    deviceInfo: {
        type: String,
        default: "unknown"
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '30d'
    }
});

const Session = mongoose.model('Session', SessionSchema);
export default Session;