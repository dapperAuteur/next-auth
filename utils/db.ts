// import clientPromise from "./mongoose";
import { connect } from "@/utils/dbConfig";
import User from "@/models/userModel";

import bcrypt from "bcrypt";

connect();

export async function getUserFromDB(email:string, password:string) {
  try {
    console.log('utils/db.ts User :>> ', User);
    console.log('utils/db.ts email :>> ', email);
    // console.log('utils/db.ts password :>> ', password);

    // check if user exists
    const userFoundByEmail = await User.findOne({email})
    console.log('utils/db.ts userFoundByEmail :>> ', userFoundByEmail);
    if (!userFoundByEmail) {
      throw new Error("User NOT Found");
    }
    console.log('utils/db.ts user :>> ', userFoundByEmail);

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, userFoundByEmail.password);

    console.log('isPasswordCorrect :>> ', isPasswordCorrect);
    
    if (!isPasswordCorrect) {
      throw new Error("User/Password Incorrect")
    }

    let user = userFoundByEmail;
    console.log('utils/db.ts user :>> ', user);

    return user;

  } catch (error) {
    console.log('utils/db.ts error :>> ', error);
    throw new Error("User NOT Found");
  }
}
