// server.js

const app = require("./app");
const cors = require("cors");

// Enable CORS

app.use(cors());

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
