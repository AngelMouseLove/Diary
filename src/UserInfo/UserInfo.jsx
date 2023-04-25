import React, { useState, useEffect } from "react";
import { Box, Button, Dialog } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import SetUserInfoForm from "../SetUserInfoForm/SetUserInfoForm";
import api from "../API";
import LogOutButton from "../LogOutButton/LogOutButton";

function UserInfo() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [openUserInfo, setOpenUserInfo] = useState(false);

  const handleOpenUserInfo = () => {
    setOpenUserInfo(true);
  };
  const handleCloseUserInfo = () => {
    setOpenUserInfo(false);
  };

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => setCurrentUser(userData))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box>
        <Box
          component="img"
          src={currentUser?.avatar}
          alt="user_avatar"
          sx={{ width: "32px", height: "32px", borderRadius: "50%", mr: 2 }}
        ></Box>
      </Box>
      <Box sx={{ mr: 1 }}>
        <Box component="h4">{currentUser?.name}</Box>
        <Box component="h5">{currentUser?.about}</Box>
      </Box>
      <Box sx={{ display: "grid", gridTemplateRows: "auto auto" }}>
        <LogOutButton />
        <Button onClick={handleOpenUserInfo}>Изменить</Button>
        <Dialog
          open={openUserInfo}
          onClose={handleCloseUserInfo}
          fullWidth={true}
          maxWidth="sm"
          scroll="body"
        >
          <SetUserInfoForm close={handleCloseUserInfo} />
        </Dialog>
      </Box>
    </Box>
  );
}

export default UserInfo;
