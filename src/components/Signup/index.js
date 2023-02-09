import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [emailVal, setEmailVal] = useState("");
  const [pwVal, setPwVal] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    localStorage.getItem("access_token") && navigate("/todo");
  }, [])

  useEffect(() => {
    if (emailVal.includes("@") && pwVal.length > 7) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [emailVal, pwVal]);

  const handleSignupClick = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signup`,
        { email: emailVal, password: pwVal },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/signin");
    } catch (err) {
      setErrMsg(err.response.data.message);
    }
  };

  return (
    <div className="signup-wrap">
      <h1>SIGN UP</h1>
      <dl>
        <dt>이메일:</dt>
        <dd>
          <input
            type="text"
            data-testid="email-input"
            onChange={(e) => {
              setEmailVal(e.target.value);
            }}
          />
          <span className="info-txt">* @ 필수입니다.</span>
        </dd>
      </dl>
      <dl>
        <dt>비밀번호:</dt>
        <dd>
          <input
            type="password"
            data-testid="password-input"
            onChange={(e) => {
              setPwVal(e.target.value);
            }}
          />
          <span className="info-txt">* 8글자 이상이어야 합니다.</span>
        </dd>
      </dl>
      <div className="btn-wrap">
        <button
          data-testid="signup-button"
          disabled={btnDisabled}
          onClick={handleSignupClick}
        >
          회원가입
        </button>
        <a href="javascript:history.back();"
          className="btn-c-black"
        >
          뒤로가기
        </a>
      </div>
      {errMsg && <span className="info-txt">{errMsg}</span>}
    </div>
  );
};

export default Signup;
