import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
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

  const handleSigninClick = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signin`,
        { email: emailVal, password: pwVal },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("access_token", res.data.access_token);
      navigate("/todo");
    } catch (err: any) {
      setErrMsg(err.response.data.message);
    }
  };

  return (
    <div className="signin-wrap">
      <h1>SIGN IN</h1>
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
        </dd>
      </dl>
      <div className="btn-wrap">
        <button
          data-testid="signin-button"
          disabled={btnDisabled}
          onClick={handleSigninClick}
        >
          로그인
        </button>
        <a
          onClick={() => { navigate("/signup") }}
          className="btn-c-red"
        >
          회원가입
        </a>
      </div>
      {errMsg && <span className="info-txt">{errMsg}</span>}
    </div >
  );
};

export default Signin;
