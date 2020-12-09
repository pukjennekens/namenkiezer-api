import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: Array,
    default: ['ROLE_USER'],
  },
});

export default mongoose.model('user', UserSchema);
