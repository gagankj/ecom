const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, },
    brand: { type: String, required: true,  },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true,  }],
    description: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Reference to Review model
    ratings: { type: Number, default: 0, min: 0, max: 5 },
    variants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Variant", default:[] }], // Reference to Variant model
    onSale: { type: Boolean, default: false, },
    saleEndDate: { type: Date, default: null },
    isFeatured: { type: Boolean, default: false, },
    featuredEndDate: { type: Date, default: null }
},{timestamps:true});


// Creating Indexes for Faster Queries
productSchema.index({ name: 1 }); // Faster name-based search
productSchema.index({ brand: 1 }); // Faster filtering by brand
productSchema.index({ categories: 1 }); // Faster filtering by categories
productSchema.index({ onSale: 1 }); // Efficient onSale filtering
productSchema.index({ isFeatured: 1 }); // Quick featured products lookup

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
