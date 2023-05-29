import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

// app.get("/", function (req, res) {
//   res.json("server started")
// })

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

PORT =
  process.env.PORT ||
  (8080)
    .then(() => {
      app.listen(PORT, () => console.log(`Server started `));
    })
    .catch((err) => {
      console.log(err);
    });
