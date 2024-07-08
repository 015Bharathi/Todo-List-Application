import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../default/Button";
import InputField from "../default/InputField";
import Text from "../default/Text";
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const navigateToTodo = () => {
    navigate("/todo");
  };

  const navigateToSignUp = () => {
    navigate("/");
  };

  const getEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const getPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLoginUserDetails = async () => {
    if (email.trim() !== "" && password.trim() !== "") {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/user/login",
          {
            email: email,
            password: password,
          }
        );
        console.log(response.data);
        console.log("response", response);
        localStorage.setItem("key", response.data);
        if (response.data) {
          setEmail("");
          setPassword("");
          navigateToTodo();
        }
      } catch (err: any) {
        if (err.response?.data?.message) {
          setError(err.response.data.message);
          setTimeout(() => {
            setError("");
          }, 3000);
        } else {
          setError("An unexpected error occurred");
        }
      }
    } else {
      setError("Please fill in all fields.");
    }
  };
  return (
    <main className="signup">
      <div className="heading">
        <Text color="success" fontSize="4xl" label="Login" fontWeight="bold" />
      </div>
      <div className="error">{error && <p>{error}</p>}</div>
      <div className="input">
        <InputField
          type="text"
          placeholder="Enter your email"
          variant="filled"
          onChange={getEmail}
        />
      </div>
      <div className="input">
        <InputField
          type="password"
          placeholder="Enter your password"
          variant="filled"
          onChange={getPassword}
        />
      </div>
      <div className="signUp-button">
        <Button variant="rounded" label="SignUp" onClick={navigateToSignUp} />
        <Button
          variant="rounded"
          label="login"
          onClick={handleLoginUserDetails}
        />
      </div>
    </main>
  );
};

export default Login;
