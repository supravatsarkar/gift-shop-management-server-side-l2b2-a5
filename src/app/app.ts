import express, { Application } from "express";
import router from "./routers";
import notFoundHandler from "./middlewares/notFoundHandler";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log({ params: req.params, query: req.query, body: req.body });
  next();
});

app.get("/", (req, res) => {
  res.send("Gift shop management server running...");
});

app.use(
  "/api/v1",
  (req, res, next) => {
    console.log("running here..1");
    next();
  },
  router
);

app.use("*", notFoundHandler);
app.use(globalErrorHandler);

export default app;
