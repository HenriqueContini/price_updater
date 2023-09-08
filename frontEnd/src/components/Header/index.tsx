import { Container, Typography } from "@mui/material";

export default function Header() {
  return (
    <Container
      maxWidth={false}
      sx={{ backgroundColor: "primary.dark", padding: "24px" }}
    >
      <Typography component="h1" variant="h3" align="center">
        Price Updater
      </Typography>
    </Container>
  );
}
