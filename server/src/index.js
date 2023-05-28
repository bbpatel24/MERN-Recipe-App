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

mongoose
  .connect(
    "mongodb+srv://bhavyapatel0811:Bhavyapatel08@recipeapp.zhysm90.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  
  .then(() => {
     
    app.listen(3000, () => console.log(`Server started `));
  })
  .catch((err) => {
    console.log(err);
  });
