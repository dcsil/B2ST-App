import { Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Add, Send } from '@mui/icons-material';
export function EnhancedTableToolbar(props) {
    const { numSelected,sendText,addContact } = props;
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Contact
          </Typography>
        )}
  
          <div>
          <Tooltip title="AddContact">
            <IconButton onClick={addContact}>
              <Add />
            </IconButton>
          </Tooltip>
          </div>
  
        {numSelected > 0 ? (
          <div>
          <Tooltip title="SendText">
            <IconButton onClick={sendText}>
              <Send />
            </IconButton>
          </Tooltip>
          </div>
        ) : ""}
        <div>
          <Tooltip title="Refresh">
            <Button variant="text" color="primary" onClick={()=>props.refresh()}>
              Refresh  
            </Button>
          </Tooltip>
        </div>
      </Toolbar>
    );
  }