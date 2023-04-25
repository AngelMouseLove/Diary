import { Box } from "@mui/material";
import React from "react";
import SignInButton from "../../SignInButton/SignInButton";
import SignUpButton from "../../SignUpButton/SignUpButton";

function MainPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "60vh",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box component={"h1"}>Добро пожаловать в Diary</Box>
        <Box component={"p"} sx={{ textAlign: "center", mb: 2 }}>
          Ведение дневника&nbsp;&mdash; хороший способ сохранить в&nbsp;памяти
          свои воспоминания и&nbsp;впечатления. Это позволяет вам мониторить
          сво&euml; прошлое и&nbsp;размышлять о&nbsp;н&euml;м, а&nbsp;также
          учиться на&nbsp;своих ошибках. Это также может иметь терапевтический
          эффект. Пригодится не&nbsp;только для записи забавных, веселых
          и&nbsp;приключенческих моментов, но&nbsp;также и&nbsp;для фиксации
          печальных и&nbsp;страшных явлений бытия. Может быть полезно иметь
          возможность задокументировать изменения в&nbsp;своей жизни.
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "40px" }}>
        <SignUpButton />
        <SignInButton />
      </Box>
    </Box>
  );
}

export default MainPage;
