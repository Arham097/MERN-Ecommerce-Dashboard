import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const userEmail = useRef();
  const userPassword = useRef();
  const navigate = useNavigate();

  const onClickLogin = async () => {
    const email = userEmail.current.value;
    const password = userPassword.current.value;
    const result = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    console.log(data);
    if (data.status === "fail") {
      alert(data.message);
    }
    if (data.data.token) {
      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("token", JSON.stringify(data.data.token));
      navigate("/");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        ref={userEmail}
        className="inputBox"
        type="email"
        placeholder="Enter Email"
      />
      <input
        className="inputBox"
        ref={userPassword}
        type="password"
        placeholder="Enter Password"
      />
      <button className="btn appButton" onClick={onClickLogin}>
        Login
      </button>
    </div>
  );
};
export default Login;
