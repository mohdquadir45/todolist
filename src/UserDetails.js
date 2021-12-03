import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";

export default function UserDetails(props) {
  const { userId, open, handleClose, id, title } = props;
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
      });
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">User Details</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            UserId: {userId}
            <br />
            TodoId: {id}
            <br />
            Todo Title: {title}
            <br />
            Name: {details.name}
            <br />
            Email: {details.email}
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
