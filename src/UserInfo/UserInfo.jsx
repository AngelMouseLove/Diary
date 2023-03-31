import React from "react";
import { Box, Button } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function UserInfo() {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box>
        <Box
          component="img"
          src={currentUser.avatar}
          alt="user_avatar"
          sx={{ width: "32px", height: "32px", borderRadius: "50%", mr: 2 }}
        ></Box>
      </Box>
      <Box>
        <Box component="h4">{currentUser.name}</Box>
        <Box component="h5">{currentUser.about}</Box>
      </Box>
      <Button>Изменить</Button>
    </Box>
  );
}

export default UserInfo;
