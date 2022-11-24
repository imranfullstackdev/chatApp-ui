import React, { useState, useEffect } from "react";

const Contacts = ({ contact, currentChat,changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const alluser = async () => {
    const data = await JSON.parse(localStorage.getItem(`Chat-User-data`));
    setCurrentUserName(data.name);
    setCurrentUserImage(data.avatarImage);
  };

const changeCurrentChat=(index,Contact)=>{
  setCurrentSelected(index);
  changeChat(Contact)
}

  useEffect(() => {
    alluser();
  }, [contact]);
  return (
    <>
    {currentUserImage && currentUserImage && (
        <div className="ContactMain">
          <div className="brand">
            <h3>All Contacts</h3>
          </div>
          <div className="contacts">
            {contact.map((contact, index) => {
              console.log(contact,"hello")
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
