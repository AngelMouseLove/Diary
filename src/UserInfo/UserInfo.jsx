import React, { useState } from "react";
import { Box, Button, Dialog } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import SetUserInfoForm from "../SetUserInfoForm/SetUserInfoForm";

function UserInfo() {
  const { currentUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
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
      <Box>
        <Box component="h4">{currentUser?.name}</Box>
        <Box component="h5">{currentUser?.about}</Box>
      </Box>
      <Button onClick={handleOpen}>Изменить</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
        scroll="body"
      >
        <SetUserInfoForm close={handleClose} />
      </Dialog>
    </Box>
  );
}

export default UserInfo;
