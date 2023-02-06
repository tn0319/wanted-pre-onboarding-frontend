import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [emailVal, setEmailVal] = useState("");
  const [pwVal, setPwVal] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    if (emailVal.includes("@") && pwVal.length > 7) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [emailVal, pwVal]);

  const handleSigninClick = async () => {
    try {
      const res = await axios.post(
        "https://pre-onboarding-selection-task.shop/auth/signin",
        { email: emailVal, password: pwVal },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("access_token", res.data.access_token);
      navigate("/todo");
    } catch (err) {
      console.log("Error...");
    }
  };

  return (
    <>
      이메일 :{" "}
      <input
        data-testid="email-input"
        onChange={(e) => {
          setEmailVal(e.target.value);
        }}
      />
      비밀번호 :{" "}
      <input
        data-testid="password-input"
        onChange={(e) => {
          setPwVal(e.target.value);
        }}
      />
      <button
        data-testid="signin-button"
        disabled={btnDisabled}
        onClick={handleSigninClick}
      >
        로그인
      </button>
    </>
  );
};

export default Signin;
