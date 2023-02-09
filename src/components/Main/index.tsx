import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/todo");
  }, [])

  return (
    <></>
  );
};

export default Main;
