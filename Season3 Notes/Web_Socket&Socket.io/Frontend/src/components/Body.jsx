import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/Redux/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((appStore) => appStore?.user);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      if (user) return;

      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="w-screen h-screen h-full overflow-x-hidden">
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
};

export default Body;
