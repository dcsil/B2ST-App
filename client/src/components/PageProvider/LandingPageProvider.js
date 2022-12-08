import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandingAppBar from "../../pages/LandingAppBar";

const theme = createTheme({
  palette: {
    background: {
      default: "#dde3ea",
    },
  },
});

export default function LandingPageProvider(props) {
  const { children, containerProps, boxProps } = props;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LandingAppBar />
      <Container component="main" {...containerProps}>
        <Box {...boxProps}>{children}</Box>
      </Container>
    </ThemeProvider>
  );
}
