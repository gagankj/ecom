const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,

    },
    resetPasswordToken:{
        type:String,
        default:null,
    },
    resetPasswordExpires:{
        type:Date,
        default:null,
        },
    address:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Address",
        },
    ],
    wishlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Products",
        },
    ],
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Orders",
        },
    ],
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Reviews",
        },
    ],
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",

    },
    phoneNumber:{
        type: String, // Changed from Number to String to handle phone numbers properly
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v); // Simple validation for a 10-digit phone number
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    avatar:{
        type:String,
        default:"https://lh4.googleusercontent.com/proxy/rxQrcISNW6c152TqWIA9iND_qakd02mJVLg8nSRrwxla5LSGonSX6tOxyhSbS9NWTuXZ4xXKJvzXPPfsfLxHEflyoqfrUDN3HMnLqJUpuE6y"
    },
    
},
{timestamps:true}
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Only hash if modified
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});


const User=mongoose.model("User",userSchema);

module.exports=User;

