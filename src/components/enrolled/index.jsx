import { Check } from "@mui/icons-material";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

const Enrolled = ({ items }) => {
  return (
    <div className="w-full  py-4  md:py-0 md:px-4">
      <TableContainer
        sx={{ backgroundColor: "#1b2640", borderRadius: "10px" }}
        component={Paper}
      >
        <Table
          sx={{
            backgroundColor: "#1b2640",
            minHeight: items?.length === 0 && "100vh",

            borderRadius: "10px",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Thumbnail</TableCell>
              <TableCell sx={{ color: "#fff" }}>Title</TableCell>
              <TableCell sx={{ color: "#fff" }}>email</TableCell>
              <TableCell sx={{ color: "#fff" }}>Amount</TableCell>
              <TableCell sx={{ color: "#fff" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((classItem, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img
                    className="w-14 rounded-md"
                    src={classItem.payment.image}
                    alt=""
                  />
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {classItem.payment.name.length > 20
                    ? classItem.payment.name.slice(0, 20) + "..."
                    : classItem.payment.name}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {classItem.payment.email}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  $ {classItem.payment.amount / 100}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  <span className="bg-purple-400 py-2 px-4 rounded-lg flex">
                    <Check />
                    Enrolled
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Enrolled;
