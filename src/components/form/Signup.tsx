import React, { useState } from "react";
import Button from "../default/Button";
import InputField from "../default/InputField";
import Text from "../default/Text";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const getUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const getEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const getPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignUpUserDetails = async () => {
    if (
      username.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== ""
    ) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/user/register",
          {
            name: username,
            email: email,
            password: password,
          }
        );
        if (response.data.savedUser) {
          setUsername("");
          setEmail("");
          setPassword("");
          navigateToLogin();
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
        <Text color="success" fontSize="4xl" label="SignUp" fontWeight="bold" />
      </div>
      <div className="error">{error && <p>{error}</p>}</div>
      <div className="input">
        <InputField
          type="text"
          value={username}
          placeholder="Enter your name"
          variant="filled"
          onChange={getUsername}
        />
      </div>
      <div className="input">
        <InputField
          type="email"
          value={email}
          placeholder="Enter your email"
          variant="filled"
          onChange={getEmail}
        />
      </div>
      <div className="input">
        <InputField
          type="password"
          value={password}
          placeholder="Enter your password"
          variant="filled"
          onChange={getPassword}
        />
      </div>
      <div className="signUp-button">
        <Button
          variant="rounded"
          label="SignUp"
          onClick={handleSignUpUserDetails}
        />
        <Button variant="rounded" label="login" onClick={navigateToLogin} />
      </div>
    </main>
  );
};

export default Signup;
