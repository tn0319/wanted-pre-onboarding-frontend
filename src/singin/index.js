import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
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
      <Link to="/singin">
        <button data-testid="signup-button" disabled={btnDisabled}>
          로그인
        </button>
      </Link>
    </>
  );
};

export default Signup;
