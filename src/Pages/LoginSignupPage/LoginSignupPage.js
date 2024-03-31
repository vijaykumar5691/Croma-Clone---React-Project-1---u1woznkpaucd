import React, { useContext, useState } from "react";
import styles from "./LoginSignupPage.module.css";
import { fetcher } from "../../helpers";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../helpers/ContextProvider";

const LoginSignupPage = () => {
  const [tab, setTab] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const { setLoginState } = useContext(LoginContext);
  var nameRegex = /^[a-z,',-]+(\s)[a-z,',-]+$/i;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === "login") {
      if (!email && !password) {
        setMessage("All fields are Mandatory");
      } else if (!email.match(mailformat)) {
        setMessage("Invalid email");
      } else if (password.length < 6) {
        setMessage("password must be greater than 5 characters.");
      } else {
        // let localName=localStorage.getItem("name")
        let localEmail = localStorage.getItem("email");
        let localPassword = localStorage.getItem("password");
        if (email !== localEmail) {
          setMessage("Email is not correct");
        } else if (password !== localPassword) {
          setMessage("Password is not correct");
        } else {
          fetcher(
            "user/login",
            {
              method: "POST",
              body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                appType: "ecommerce",
              }),
            },
            false
          )
            .then((res) => {
              console.log(res);
              localStorage.setItem("token", res.token);
              setLoginState(true);
              setTimeout(() => {
                navigate("/");
                // setTab("login");
                setEmail("");
                setPassword("");
                setName("");
                setMessage("");
              }, 500);
            })
            .catch((err) => console.log(err));
        }
      }
    } else {
      if (!name && !email && !password) {
        setMessage("All fields are Mandatory");
      } else if (!name.match(nameRegex) || name.length < 3) {
        setMessage(
          "Name must be greater than 2 characters and should be numeric "
        );
      } else if (!email.match(mailformat)) {
        setMessage("Invalid email");
      } else if (password.length < 6) {
        setMessage("password must be greater than 5 characters.");
      } else {
        fetcher(
          "user/signup",
          {
            method: "POST",
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
              appType: "ecommerce",
            }),
          },
          false
        )
          .then((res) => {
            console.log(res);
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            setTimeout(() => {
              setTab("login");
              setEmail("");
              setPassword("");
              setName("");
            }, 500);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <>
      {show && (
        <div className={styles.main_container}>
          <div className={styles.container}>
            <form onSubmit={handleSubmit}>
              <div
                className={styles.close}
                onClick={() => {
                  setShow(false);
                  navigate("/");
                }}
              >
                X
              </div>
              <div className={styles.button_container}>
                <button
                  className={tab === "login" ? styles.active : styles.login}
                  onClick={() => setTab("login")}
                >
                  Login
                </button>
                <button
                  className={
                    tab === "createAccount"
                      ? styles.active
                      : styles.create_account
                  }
                  onClick={() => setTab("createAccount")}
                >
                  Create Account
                </button>
              </div>
              <div className={styles.input_container}>
                {tab === "login" ? (
                  <div></div>
                ) : (
                  <input
                    className={styles.input}
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your Name"
                  />
                )}
                <input
                  className={styles.input}
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email ID"
                />
                <input
                  className={styles.input}
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                />
              </div>
              {message === "" ? (
                ""
              ) : (
                <div className={styles.message}>Error: {message}</div>
              )}
              {tab === "createAccount" ? (
                <div></div>
              ) : (
                <div className={styles.forget}>
                  Forgot Password{" "}
                  <span className={styles.span_click}>click here !</span>
                </div>
              )}
              <input
                className={styles.continue}
                type="submit"
                value="Continue"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignupPage;
