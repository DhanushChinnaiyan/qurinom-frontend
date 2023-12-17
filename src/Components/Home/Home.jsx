import React, { useEffect } from "react";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import Base from "../Base/Base";
import Tasks from "../Tasks/Tasks";
import { useCommonContext } from "../../State Management/ContextApi";
import { CircularProgress, Typography } from "@mui/material";

// Style for circular prograss
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 4,
};

const Home = () => {
  const navigate = useNavigate();
  const { getData, loading } = useCommonContext();

//   Verify user toke
  const checkUserToken = () => {
    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      navigate("/login", { replace: true });
    } else {
      try {
        const user = decodeToken(userToken).user;

        if (!user._id) {
          localStorage.removeItem("userToken");
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/login", { replace: true });
      }
    }
  };

  useEffect(() => {

    checkUserToken();
    // Get tasks datas
    getData();
  }, []);

  return (
    <Base>
      {loading ? (
        <Typography component="div" sx={style}>
          <CircularProgress />
        </Typography>
      ) : (
        <Tasks />
      )}
    </Base>
  );
};

export default Home;
