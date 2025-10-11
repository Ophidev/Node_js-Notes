import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import appStore from "../utils/Redux/appStore";

const Profile = () => {
  const user = useSelector((appStore) => appStore?.user);

  return (
    user && (
      <div className="flex justify-center">
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
