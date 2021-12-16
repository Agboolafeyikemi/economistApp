import { dbConnect } from "../../utils/dbConnect";
import { signIn } from "../../controllers/AuthController";
import User from "../../models/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  // const user = await User.findOne({ email: req.body.email });
  // console.log(
  //   "reqBIG\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
  //   req.body.email,
  //   "n\n\n\n\n\n\n\n\n\n\n\n\n\n",
  //   method,
  //   "n\n\n\n\n\n\n\n\n\n\n\n\n\n",
  //   User,
  //   "n\n\n\n\n\n\n\n\n\n\n\n\n\n",
  //   user,
  //   "reqBIG\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
  // );
  switch (method) {
    case "POST":
      // try {
      const user = await User.findOne({ email: req.body.email });
      // console.log(
      //   "USERLOGINNOWNOW'\n\n\n\n\n\n\n\n\n\n",
      //   user,
      //   req.body,
      //   req.body.password,
      //   res,
      //   User,
      //   "USERLOGINNOWNOWGREAT\n\n\n\n\n\n\n\n\n\n"
      // );
      const authenticated = await signIn(user, req.body.password, res);
      console.log(
        "NOWNOWVEWINNER\n\n\n\n\n\n\n\n\n\n",
        authenticated,
        "NOWNOWFOREVER\n\n\n\n\n\n\n\n\n\n"
      );
      // if (!authenticated) {
      //   res
      //     .status(401)
      //     .json({ success: false, error: "You are not authenticated" });
      //   return;
      // }

      res.status(201).json({ success: true, data: user });
      // } catch (error) {
      //   console.log(
      //     "\n\n\n\n\n\n\n\n\n\nerror ni o\n\n\n\n\n\n\n\\\\\\\\\\\n\n\n\n\n\n\n\n\n\n\n\n\n\n'"
      //   );
      //   res.status(400).json({ success: false, error });
      // }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
