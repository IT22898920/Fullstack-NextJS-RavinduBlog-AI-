"use server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const getErrorMessage = (error) => {
  let message;
  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }
  return message;
};

export const registerUser = async (formData) => {
    try {
        const {name, email, password} = formData;
        
        if (!name || !email || !password) {
            return {error: "All fields are required"}
        }

        await connectMongoDB()

        const userExists = await User.findOne({email})
        if (userExists) {
          return { error: "Email has already been registered" };
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        await User.create({
          name,
          email,
          password: hashedPassword,
        });

        return {message: "Registration successful, please login"};

    } catch (error) {
        console.log("Error",error);
        return {
        error: getErrorMessage(error),
        }    
    }
}