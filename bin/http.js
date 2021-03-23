const app = require("../app");
const PORT = process.env.PORT || 3000;

app.headersTimeout = 3600;
app.listen(PORT, () => {
  console.log("app listening in PORT", PORT);
});
