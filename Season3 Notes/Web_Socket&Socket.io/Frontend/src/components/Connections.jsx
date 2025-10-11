import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/Redux/connectionSlice";

export const Connections = () => {

  const dispatch = useDispatch();
  const connections = useSelector((appStore) => appStore?.connection);

const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
      console.error(err);
    }
  };

  useState(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1 className="text-center mt-5">No connection found</h1>;

  return (
    <div className="w-full flex justify-center p-5">
      {connections?.map((connection) => {
        const { _id,firstName, lastName, photoUrl, about, age, gender } =
          connection;
        return (
          <div className="w-[35%] bg-neutral flex gap-2 p-3 rounded-2xl" key={_id}>
            <img className="w-[100px] rounded-[50%]" src={photoUrl}></img>
            <div className="flex flex-col justify-center">
              <h1 className="font-bold text-2xl">{firstName + " " + lastName}</h1>
              {age && gender && (
                <p>{" age : " + age + " gender : " + gender}</p>
              )}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
