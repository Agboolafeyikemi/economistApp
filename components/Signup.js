import { useState } from "react";
import axios from "axios";
import classes from "../styles/Home.module.css";

export default function Signup({ goToSignIn }) {
  const [submitting, setSubmitting] = useState(false),
    [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitting(true);

    const params = {
      name,
      email,
      password,
    };

    axios
      .post("/api/users", params)
      .then(() => {
        setSubmitting(false);
        window.location.reload();
      })
      .catch((err) => {
        setSubmitting(false);
        console.error("Error", err);
      });
  }

  return (
    <div className={classes.Auth}>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <div className={classes.inputBox}>
          <label></label>
          <input
            name="name"
            type="text"
            placeholder="User Name"
            onChange={(e) => setName(e.target.value)}
            required={true}
            className={classes.inputElement}
          ></input>
        </div>
        <div className={classes.inputBox}>
          <label></label>
          <input
            name="email"
            type="email"
            placeholder="Mail Address"
            onChange={(e) => setEmail(e.target.value)}
            required={true}
            className={classes.inputElement}
          ></input>
        </div>
        <div className={classes.inputBox}>
          <label></label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required={true}
            className={classes.inputElement}
          ></input>
        </div>
        <button className={classes.btn} type="submit">
          Sign Up
        </button>

        {submitting && <p>Submitting...</p>}
      </form>

      <a className={classes.goto} onClick={() => goToSignIn()}>
        Go To Login
      </a>
    </div>
  );
}
