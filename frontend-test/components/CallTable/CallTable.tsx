//@ts-ignore
//@ts-nocheck
import * as React from "react";
import {
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Button,
} from "@mui/material";
import usePaginatedCalls from "../../hooks/paginatedCalls/usePaginatedCalls";
import useArchiveCalls from "../../hooks/archiveCalls/usearchiveCall";

import moment from "moment";
import Pagination from "../Pagination/Pagination";
import useLoggedUser from "../../hooks/loggedUser/useLoggedUser";
import Buttons from "../Button/Button";
import Model from "../Model";

function createData(
  id: any,
  callType: any,
  direction: any,
  duration: any,
  from: any,
  to: any,
  via: any,
  createdAt: any,
  status: any,
  action: any
) {
  return {
    id,
    callType,
    direction,
    duration: formatDuration(duration),
    from,
    to,
    via,
    createdAt,
    status,
    action,
  };
}

const formatDuration = (durationInSeconds: number) => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes} min ${seconds} sec`;
};

function Row(props: {
  row: ReturnType<typeof createData>;
  onNoteClick: () => void;
}) {
  const { row, onNoteClick } = props;
  const getStatusColor = (callType: string) => {
    switch (callType.toLowerCase()) {
      case "answered":
        return "green";
      case "voicemail":
        return "blue";
      case "missed":
        return "red";
      default:
        return "inherit";
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }} key={row.id}>
        <TableCell component="th" scope="row" size="small" align="left">
          <Typography
            variant="body1"
            style={{
              color: getStatusColor(row.callType),
              textTransform: "capitalize",
            }}
          >
            {row.callType}
          </Typography>
        </TableCell>
        <TableCell
          align="left"
          style={{
            textTransform: "capitalize",
          }}
        >
          {row.direction}
        </TableCell>
        <TableCell align="left">
          <Typography
            variant="body1"
            style={{
              color: "blue",
              textTransform: "capitalize",
            }}
          >
            {row.duration}
          </Typography>
        </TableCell>
        <TableCell align="left">{row.from}</TableCell>

        <TableCell align="left">{row.to}</TableCell>
        <TableCell align="left">{row.via}</TableCell>
        <TableCell align="left">{row.createdAt}</TableCell>
        <TableCell
          align="left"
          className={
            row.status === "Archived"
              ? "text-green-700 bg-green-100 h-[10px]"
              : "text-gray-700 bg-gray-100"
          }
        >
          {row.status}
        </TableCell>
        <TableCell align="left">
          <Buttons
            color="#4c44fb"
            text={row.action}
            height="44px"
            width="102px"
            radius="3px"
            onClick={onNoteClick}
          />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const CallTable = ({ ...props }) => {
  const [viewer, loadingViewer, refetchViewer] = useLoggedUser();

  const t = props.titles;
  const [itemsPerPage, setitemsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  React.useEffect(() => {
    if (loadingViewer) {
      return;
    }
    if (accessToken && !loadingViewer && viewer) {
      refetchViewer();
    }
    console.log("viewer here", viewer);
  }, [viewer, loadingViewer, accessToken, refreshToken]);

  const handleChangePage = (currentPage: any) => {
    setPage(currentPage);
  };

  const [paginatedCallsData, loading, refetch, count, hasNextPage] =
    usePaginatedCalls(itemsPerPage, page);

  const [modalOpen, setModalOpen] = React.useState(false); // State to manage modal visibility
  const [selectedRow, setSelectedRow] = React.useState<any>(null);

  const handleNoteClick = (row: any) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };
  const [archieveFunction, loadingAC, dataAC] = useArchiveCalls();
  const [archiveResults, setArchiveResults] = React.useState<Set<string>>(
    new Set()
  );
  interface Call {
    id: string;
    // Add other properties as needed
  }

  React.useEffect(() => {
    if (!paginatedCallsData) {
      refetch();
    }
    console.log(
      "paginatedCallsData here in component is",
      paginatedCallsData,
      "archiveResults",
      dataAC,
      dataAC?.archiveCall?.is_archived
    );
    // console.log('orderComing in component is', orderComing?.[0]._id)
  }, [loading, paginatedCallsData, refetch, accessToken, refreshToken, viewer]);

  React.useEffect(() => {
    if (!loading && paginatedCallsData) {
      paginatedCallsData?.nodes.forEach((call: Call) => {
        // Check if the ID has already been sent
        if (!archiveResults.has(call.id)) {
          archieveFunction({ variables: { id: call.id } })
            .then((result: { data: any }) => {
              // Define the type of 'result'
              // Update archive results
              setArchiveResults(
                (prevResults) => new Set(prevResults.add(call.id))
              );
            })
            .catch((error: any) => {
              console.error("Error archiving call:", error);
            });
        }
      });
    }
  }, [loading, paginatedCallsData]);

  const rows = paginatedCallsData?.nodes?.map((item: any) => {
    const archiveData = dataAC; // Since dataAC already contains the archive call data
    const status = archiveData?.archiveCall?.is_archived
      ? "Archived"
      : "UnArchived";
    return createData(
      item?.id,
      item?.call_type,
      item?.direction,
      item.duration,
      item.from,
      item.to,
      item.via,
      moment(item.created_at).format("YY-MM-DD"),
      item?.id === archiveData?.archiveCall?.id ? status : "",
      "Add Note"
    );
  });

  return (
    <>
      <Model
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        selectedRow={selectedRow}
      />

      <div className="p-10">
        <Typography variant="h1" style={{ fontWeight: 500, fontSize: "34px" }}>
          Turing Technologies Frontend Test
        </Typography>
        <div className="h-5"></div>
        <Typography variant="body2" className="text-base">
          Filter by: Status
        </Typography>
        <div className="h-5"></div>
        <Divider />
        <div>
          <div className="flex">
            <TableContainer
              component={Paper}
              className="w-full border border-gray-300 rounded-lg overflow-hidden"
            >
              <Table aria-label="collapsible table">
                <TableHead className="bg-gray-200">
                  <TableRow>
                    {t.map((title: any, index: number) => (
                      <TableCell key={index}>
                        <Typography variant="body2" style={{ fontWeight: 600 }}>
                          {title}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.map((r: any) => (
                    <Row
                      key={r?.orderid}
                      row={r}
                      onNoteClick={() => handleNoteClick(r)} // Pass handleNoteClick function to Row component
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      {count > itemsPerPage ? (
        <Pagination
          totalCount={count}
          changePage={handleChangePage}
          currentPage={page}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setitemsPerPage}
        />
      ) : (
        <></>
      )}
    </>
  );
};
export default CallTable;
