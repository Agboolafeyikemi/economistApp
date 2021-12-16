import { verify, sign } from "jsonwebtoken";
import cookie from "cookie";
import bcrypt from "bcryptjs";
import Constants from "../utils/constants";
import User from "../models/User";
import { ValidationError } from "../utils/errors";

const secret = Constants.secret;
console.log(secret, "\n\n\n\n\n\nTIRED\n\n\n\n\n\n\n\n\n");
require("dotenv").config();
const signIn = async (user, password, res) => {
  // console.log(
  //   "PROOFBE\n\n\n\n\n\\nm\nSIGNIN\nn\\n\n\n\n\n\n\n\n\n\n\\n\n\n",
  //   user,
  //   "\nn\\n\n\n\n\n\n\n\n\n\n\\n\n\n",
  //   password,
  //   "\nn\\n\n\n\n\n\n\n\n\n\n\\n\n\n",
  //   res,
  //   "BE\n\n\n\n\n\\nm\nSIGNIN\nn\\n\n\n\n\n\n\n\n\n\n\\n\n\n"
  // );
  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log(
    passwordMatch,
    password,
    user.password,
    "\n\n\n\n\n\n\n\n\n\\n\nPASSSWORDWAHALW\n\n\n\nn\\n\n\n\n\\n\n\n\n\n"
  );
  if (passwordMatch) {
    // console.log("TRUEALWYSA\n\n\n\n\n\n\nJWT\n\n\n\n\n\n\n\n\n\n\n\n");
    const claims = {
      id: user.id,
      email: user.email,
    };

    const jwt = await sign(claims, process.env.SECRET, { expiresIn: "1h" });
    console.log(jwt, "working?\n\n\n\n\n\n\nJWT\n\n\n\n\n\n\n\n\n\n\n\n");

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth", jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      })
    );
  }

  return passwordMatch;
};

const signUp = async (params) => {
  let user = await new User(params);

  await user.save((err) => {
    if (err) throw new ValidationError(err);
  });

  return user;
};

const verifyCookie = async (cookie) => {
  if (!cookie) {
    return false;
  }

  const verified = await verify(cookie, secret);

  return verified;
};

module.exports = { verifyCookie, signUp, signIn };
