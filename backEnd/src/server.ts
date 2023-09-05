import app from "./app";

const PORT: number = 3000;

app.listen(PORT, () => {
  console.log(`Running on: http://localhost:${PORT}`);
});
