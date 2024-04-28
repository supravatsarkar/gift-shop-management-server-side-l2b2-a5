import express, { Application } from "express";
import router from "./routers";
import notFoundHandler from "./middlewares/notFoundHandler";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import cookeParser from "cookie-parser";
import cors from "cors";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookeParser());
app.use(
  cors({
    // origin: "*",
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      `${process.env.UI_HOST}`,
    ],
    credentials: true,
  })
);
// app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log({
    cookies: req.cookies,
    params: req.params,
    query: req.query,
    body: req.body,
  });
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
