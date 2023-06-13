import { useState } from "react";
import "./VideoOverlay.style.css";
import Dialog from "@mui/material/Dialog";

const VideoButton = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/WsPz2UjstN4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </Dialog>
    </>
  );
};
export default VideoButton;
