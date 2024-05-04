import * as React from "react";
import { Typography, Modal, TextField, Button, Divider } from "@mui/material";
import Buttons from "../Button/Button";
import CloseIcon from "@mui/icons-material/Close";
import useAddedNotes from "../../hooks/addNotes/addNotes";

const ModalForMessage = ({ ...props }) => {
  const { modalOpen, handleCloseModal, selectedRow } = props;
  const [addedNotesFunction, data, loading] = useAddedNotes();
  const [addNotesValue, setaddNotesValue] = React.useState("");
  const [isLoading, setisLoading] = React.useState(false);
  const [added, setadded] = React.useState(false);
  const [showAddedModal, setShowAddedModal] = React.useState(false); // State to control the visibility of the "Added" modal

  const handleAddNotes = async () => {
    setisLoading(true);
    try {
      const addedNotesFunctionInput = await addedNotesFunction({
        variables: {
          input: {
            activityId: selectedRow?.id,
            content: addNotesValue,
          },
        },
      });
      console.log("added notes", addedNotesFunctionInput);
      if (addedNotesFunctionInput?.data?.addNote?.id) {
        setadded(true);
        setShowAddedModal(true); // Show the "Added" modal
        setTimeout(() => {
          setShowAddedModal(false); // Hide the "Added" modal after 3 seconds
        }, 3000);
      }
      setisLoading(false);
      setaddNotesValue("");
    } catch (error) {
      setadded(false);
      setisLoading(false);
      console.log("here error testing", error);
    }
  };

  return (
    <>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            width: "600px", // Adjust the width as needed
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Add Notes
            </Typography>
            <Button
              onClick={handleCloseModal}
              style={{
                minWidth: "auto",
                padding: "6px",
                marginLeft: "auto",
              }}
            >
              <CloseIcon />
            </Button>
          </div>
          <Typography variant="body1" style={{ color: "blue" }}>
            Call ID: {selectedRow?.id}
          </Typography>
          <Divider style={{ margin: "10px 0" }} />
          {selectedRow && (
            <div>
              <Typography variant="body1">
                <span style={{ fontWeight: "bold" }}>Call Type:</span>{" "}
                {selectedRow.callType}
              </Typography>

              <Typography variant="body1">
                <span style={{ fontWeight: "bold" }}>Duration:</span>{" "}
                {selectedRow.duration}
              </Typography>
              <Typography variant="body1">
                <span style={{ fontWeight: "bold" }}>From:</span>{" "}
                {selectedRow.from}
              </Typography>
              <Typography variant="body1">
                <span style={{ fontWeight: "bold" }}>To:</span>{" "}
                {selectedRow.to}
              </Typography>
              <Typography variant="body1">
                <span style={{ fontWeight: "bold" }}>Via:</span>{" "}
                {selectedRow.via}
              </Typography>

              <div style={{ marginTop: "20px" }}>
                <Typography variant="body1">
                  <span style={{ fontWeight: "bold" }}>Notes:</span>
                </Typography>
                <TextField
                  id="notes"
                  label="Notes"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  value={addNotesValue}
                  onChange={(e) => setaddNotesValue(e.target.value)}
                />
              </div>
            </div>
          )}
          <div style={{ marginTop: "20px" }}>
           
              <Buttons
                color="#4c44fb"
                text="Save"
                height="51px"
                isLoading={isLoading}
                onClick={handleAddNotes}
                width="100%"
                radius="3px"
              />
            
          </div>
        </div>
      </Modal>
      {/* Added modal */}
      <Modal open={showAddedModal} onClose={() => setShowAddedModal(false)}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            width: "400px",
          }}
        >
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            Note Added Successfully
          </Typography>
        </div>
      </Modal>
    </>
  );
};

export default ModalForMessage;
