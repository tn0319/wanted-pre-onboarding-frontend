import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
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

  const handleSignupClick = async () => {
    try {
      axios.post(
        "https://pre-onboarding-selection-task.shop/auth/signup",
        { email: emailVal, password: pwVal },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/singin");
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
        data-testid="signup-button"
        disabled={btnDisabled}
        onClick={handleSignupClick}
      >
        회원가입
      </button>
    </>
  );
};

export default Signup;
