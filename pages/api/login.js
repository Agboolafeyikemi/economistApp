import { dbConnect } from "../../utils/dbConnect";
import { signIn } from "../../controllers/AuthController";
import User from "../../models/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const user = await User.findOne({ email: req.body.email });

        const authenticated = await signIn(user, req.body.password, res);
        console.log(
          "/n/n/n/n/n/n/n/nauthenticated,",
          authenticated,
          "/n/n/n/n/n/n/n/n/nauthenticatedt/n/n/n/n/n"
        );
        if (!authenticated) {
          res
            .status(401)
            .json({ success: false, error: "You are not authenticated" });
          return;
        }

        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
