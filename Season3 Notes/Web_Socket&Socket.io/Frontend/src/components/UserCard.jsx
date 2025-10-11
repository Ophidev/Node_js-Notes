import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/Redux/feedSlice";

const UserCard = ({ user }) => {

  const dispatch = useDispatch();
  if(!user) return <h1 className="text-center">No feed Avaliable!</h1>


  const {_id,firstName, lastName, photoUrl, about, age, gender } = user;

  const handleSendRequest = async (status, userId) => {
    const res = await axios.post(
      BASE_URL + "/request/send/" + status + "/" + userId,
      {},
      { withCredentials: true }
    );

    dispatch(removeUserFromFeed(_id));

  };
  
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="user" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={()=> handleSendRequest("ignored",user._id)}>Ignored</button>
          <button className="btn btn-secondary" onClick={() => handleSendRequest("interested",user._id)} >Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
