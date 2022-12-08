import { TableRow, TableCell, Checkbox } from "@mui/material";
import { stableSort, getComparator } from "./helpers";
export function TableInfo(props) {
  const isSelected = (phone) => props.selected.indexOf(phone) !== -1;
  const handleClick = (event, phone) => {
    const selectedIndex = props.selected.indexOf(phone);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(props.selected, phone);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(props.selected.slice(1));
    } else if (selectedIndex === props.selected.length - 1) {
      newSelected = newSelected.concat(props.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        props.selected.slice(0, selectedIndex),
        props.selected.slice(selectedIndex + 1)
      );
    }
    props.setSelected(newSelected);
  };
  return stableSort(props.rows, getComparator(props.order, props.orderBy))
    .slice(
      props.page * props.rowsPerPage,
      props.page * props.rowsPerPage + props.rowsPerPage
    )
    .map((row, index) => {
      const isItemSelected = isSelected(row.phone);
      const labelId = `enhanced-table-checkbox-${index}`;
      return (
        <TableRow
          hover
          onClick={(event) => handleClick(event, row.phone)}
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={row.name}
          className="ContactRow"
          selected={isItemSelected}
        >
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              checked={isItemSelected}
              inputProps={{
                "aria-labelledby": labelId,
              }}
            />
          </TableCell>
          <TableCell component="th" id={labelId} scope="row" padding="none">
            {row.name}
          </TableCell>
          <TableCell align="left">{row.phone}</TableCell>
        </TableRow>
      );
    });
}
