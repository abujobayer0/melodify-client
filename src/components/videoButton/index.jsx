import { useState } from "react";
import "./VideoOverlay.style.css";
import Dialog from "@mui/material/Dialog";

const VideoButton = ({ iframe }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cleanedText = iframe ? iframe.replace(/"/g, "") : "";
  return (
    <>
      <a
        id="play-video"
        className="video-play-button"
        href="#"
        onClick={handleClickOpen}
      >
        <span></span>
      </a>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {iframe ? (
          <div dangerouslySetInnerHTML={{ __html: cleanedText }} />
        ) : (
          <span className="bg-lightCard p-10 text-white text-lg">
            No Intro Video
          </span>
        )}
      </Dialog>
    </>
  );
};
export default VideoButton;
