import mongoose, {Document, Schema} from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string; // hashed password
    refreshTokens: string[]; //store active refresh tokens
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshTokens: { type: [String], default: [] }, 
},{ timestamps: true });

userSchema.pre<IUser>("save", async function (next){
    if (!this.isModified("password")) return next(); //if password is not modified skip hashing
    try {
        const salt = await bcrypt.genSalt(10); // Generate salt for hashing
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err as any);
    }
})

userSchema.methods.toJSON = function () { // Customize JSON output
    const user = this.toObject();
    delete user.password;
    delete user.refreshTokens;
    return user;
};

export const User = mongoose.model<IUser>("User", userSchema);