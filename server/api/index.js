const express = require("express");
const userRouter = require("./routes/userRoutes");
const auth = require("./middlewares/auth");
const { login, signup } = require("./controllers/userControllers");
const problemsetRouter = require("./routes/problemset");
const app = express();
const cors = require("cors");
const {
  updateExecutionState,
  getSubmissionState,
} = require("./controllers/updateExecutionState");
const { createProblem } = require("./controllers/ProblemsController");

// Parsing all the req objects
app.use(express.json());
app.use(cors())

// Routes
app.post("/signup", signup);
app.post("/login", login);
app.use("/problemset", problemsetRouter);

// auth Middleware needed for these route
app.use("/users", userRouter);

// TODO make route to create a new problem
app.post("/createproblem", createProblem);

// WIP: add route/webhook where the worker will hit after it's done executing user code (This route updates the data base)
app.post("/execution_finished", updateExecutionState);

// WIP: route for client side polling to check if the submission is pending or not
app.post("/submissionState", auth, getSubmissionState);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Root Page</h1>");
});

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`);
});
