// import clientPromise from "./mongoose";
import { connect } from "@/utils/dbConfig";
import User from "@/models/userModel";

import bcrypt from "bcrypt";

connect();

export async function signIn(email, password) {
  try {
    console.log('api/sign-in email :>> ', email);
    console.log('api/sign-in password :>> ', password);

    // check if user exists
    const userFoundByEmail = await User.findOne({email})
    if (!userFoundByEmail) {
      throw new Error("User NOT Found");
    }
    console.log('api/sign-in user :>> ', userFoundByEmail);

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, userFoundByEmail.password);
    
    if (!isPasswordCorrect) {
      throw new Error("User/Password Incorrect")
    }

    let user = userFoundByEmail;
    console.log('api/sign-in user :>> ', user);

    return user;

  } catch (error) {
    console.log('api/sign-in error :>> ', error);
    throw new Error("User NOT Found");
  }
}
