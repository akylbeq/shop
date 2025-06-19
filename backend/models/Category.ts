import mongoose, {Schema} from 'mongoose';

const CategorySchema = new Schema({
    parentId: {
        type: String,
        default: null
    },
    name: {
        type: String,
        required: true
    },
    keyword: {
        type: String,
    },
    descriptionMeta: {
        type: String,
    },
    slug: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Category = mongoose.model('Category', CategorySchema);
export default Category;