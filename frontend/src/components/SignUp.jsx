import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const onClickSignup = async () => {
    const userName = name.current.value;
    const userEmail = email.current.value;
    const UserPassword = password.current.value;
    const result = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        password: UserPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    localStorage.setItem("user", JSON.stringify(data.data.user));
    if (data.data.user) {
      navigate("/");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        ref={name}
        className="inputBox"
        type="text"
        placeholder="Enter Name"
      />
      <input
        ref={email}
        className="inputBox"
        type="email"
        placeholder="Enter Email"
      />
      <input
        ref={password}
        className="inputBox"
        type="password"
        placeholder="Enter Password"
      />
      <button className="appButton" type="button" onClick={onClickSignup}>
        Sign Up
      </button>
    </div>
  );
};
export default SignUp;
