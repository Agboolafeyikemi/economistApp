import { useState } from "react";
import Router from "next/router";
import axios from "axios";
import classes from "../styles/Home.module.css";

export default function Login({ goToSignUp }) {
  const [submitting, setSubmitting] = useState(false),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const params = {
      email,
      password,
    };
    axios
      .post("/api/login", params)
      .then(() => {
        setSubmitting(false);
        Router.push("/posts");
      })
      .catch((err) => {
        setSubmitting(false);
        console.error("Error", err);
      });
  }

  return (
    <div className={classes.Auth}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div className={classes.inputBox}>
          <label></label>
          <input
            name="email"
            type="email"
            placeholder="Mail Address"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            className={classes.inputElement}
          ></input>
        </div>
        <div className={classes.inputBox}>
          <label></label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            required={true}
            className={classes.inputElement}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button className={classes.btn} type="submit">
          Log in
        </button>
        {submitting && <p>Logging in...</p>}
      </form>

      <a className={classes.goto} onClick={() => goToSignUp()}>
        Go To SignUp
      </a>
    </div>
  );
}
