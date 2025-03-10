import mongoose, {Schema} from "mongoose"; 
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "password must require."]
    },
    fullName: {
        type: String,
        required: true,
        index: true
    },
    avatar: {
        type: String, // cloudinary url
        required: true,
    },
    coverImage: {
        type: String,
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    refreshToken: {
        type: String
    }
}, {timestamps: true})

// Encrypt Password
userSchema.pre("save", async function (next){
    if (!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password, 10)
    next()
})

// Password Check Function
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// Generate Access Token
userSchema.methods.generateAccessToken = function (){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    }),
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
}

// Generate Refresh Token
userSchema.methods.generateRfreshToken = function (){
    return jwt.sign({
        _id: this._id
    }),
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_SECRET_EXPIRY
    }
}

export const User = mongoose.model("User", userSchema)