const express = require("express");
const app = express();
const port = 3001;


app.use(express.json());

const personRouter = require("./routes/person");
app.use("/person", personRouter);

app.listen(port, () => {
  console.log(`Server started at port : ${port}!!`);
});
