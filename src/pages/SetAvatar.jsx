import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loader from "../utils/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import { Buffer } from "buffer";
import { Container } from "react-bootstrap";
const SetAvatar = () => {
  const api = "";
  const navigate = useNavigate();
  const [avatars, SetAvatar] = useState([]);
  const [isLoading, SetIsloading] = useState(true);
  const [selectAvatar, setSelectedAvatar] = useState(undefined);
  useEffect(() => {
    if (!localStorage.getItem("Chat-User-data")) {
      navigate("/Login");
    }
  }, []);
  const SetprofilePicture = async () => {
    if (selectAvatar === undefined) {
      toast.error("Please select an Avatar", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      const user = await JSON.parse(localStorage.getItem("Chat-User-data"));
      const { data } = await axios.post(
        `https://chat-app-api-zeta.vercel.app/avatar/${user._id}`,
        {
          image: avatars[selectAvatar],
        }
      );
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.avatarImage;
        localStorage.setItem("Chat-User-data", JSON.stringify(data._doc));
        navigate("/");
      } 
    }
  };

  const getAvatar = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `https://api.multiavatar.com/SeXC42vgnLm36Y/${Math.round(
          Math.random() * 1000
        )}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    SetAvatar(data);
    SetIsloading(false);
  };
  useEffect(() => {
    getAvatar();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("Chat-User-data")) {
      navigate("/Login");
    }
  }, []);
  

  return (
    <>
      {isLoading ? (
        <div className="Container">
          <img src={loader} alt="loader" />
        </div>
      ) : (
        <div className="Container">
          <div className="title-container">
            <h1>Pick an Avatar As You Profile Picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={SetprofilePicture}>
            Set Avatar
          </button>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default SetAvatar;
