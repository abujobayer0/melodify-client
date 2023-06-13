import { Button } from "@mui/material";

const PrimaryButton = ({ text }) => {
  return (
    <Button
      variant="contained"
      sx={{
        padding: { xs: "10px 25px", sm: "15px 40px" },
        display: "flex",
        flexWrap: "nowrap",

        bgcolor: "#9333ea", // Set your custom background color here
        "&:hover": {
          bgcolor: "#9333ea", // Set your custom background color here
        },
      }}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
