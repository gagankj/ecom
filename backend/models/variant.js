const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    variants:[
      {
        color: { type: String, required: true },
        size: { type: String, required: true },
        price: { type: Number, required: true },
        discountPrice: { type: Number },
        stock: { type: Number, required: true, default: 0 },
        images: [{ type: String, required: true }],
        sku:{type:String,required:true},
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Variant", variantSchema);
