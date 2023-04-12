import { Box } from "@mui/material";
import React from "react";
import cn from "classnames";
import "./index.css";

const Sort = ({ currentSort, tabs = [], onChangeSort }) => {
  const handleClick = (e, tab) => {
    e.preventDefault();
    onChangeSort(tab.id);
  };

  return (
    <Box className="sort">
      {tabs.map((tab) => (
        <Box key={tab.id} id={tab.id}>
          <a
            className={cn("sort__link", {
              sort__link_selected: currentSort === tab.id,
            })}
            onClick={(e) => handleClick(e, tab)}
          >
            {tab.title}
          </a>
        </Box>
      ))}
    </Box>
  );
};

export default Sort;
