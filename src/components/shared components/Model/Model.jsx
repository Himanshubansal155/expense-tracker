import React from "react";
import { Fade, Modal, Backdrop } from "@mui/material";

const Model = ({ open, handleClose, children, props }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      {...props}
    >
      <Fade in={open}>{children}</Fade>
    </Modal>
  );
};

export default Model;
