import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Props {
  totalCount: number;
  changePage: (pageNumber: number) => void;
  currentPage: number;
  itemsPerPage: number;
  setItemsPerPage: (perPage: number) => void;
}

const Paginator: React.FC<Props> = ({
  totalCount,
  changePage,
  currentPage,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    setMaxPage(Math.ceil(totalCount / itemsPerPage));
  }, [totalCount, itemsPerPage]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={maxPage}
          page={currentPage / itemsPerPage + 1}
          onChange={(event, value) => {
            changePage((value - 1) * itemsPerPage);
          }}
          sx={{
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#4c44fb",
              color: "white",
              borderRadius: "10%",
            },
          }}
        />
      </div>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <Typography variant="body1">
          {currentPage / itemsPerPage + 1}-{maxPage}{" "}
          of {totalCount} results
        </Typography>
      </div>
    </>
  );
};

export default Paginator;
