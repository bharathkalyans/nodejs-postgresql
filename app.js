const express = require("express");
const app = express();
const port = 3001;


app.use(express.json());

const router = require("./routes/person");
app.use("/home", router);

app.listen(port, () => {
  console.log(`Server started at port : ${port}!!`);
});
