import { Table, TableRow } from "@mui/material";
import { styled } from "@mui/system";

export const ModalContainer = styled("div")({
  margin: "35px 20px",
  textAlign: "center",
});

export const StyledHeaderRow = styled(TableRow)({
  backgroundColor: "aliceblue",
});

export const MuiTable = styled(Table)({
  minWidth: "33rem",
});
