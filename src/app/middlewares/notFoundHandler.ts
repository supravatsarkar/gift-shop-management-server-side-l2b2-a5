import { RequestHandler } from "express";

const notFoundHandler: RequestHandler = (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API not found!",
    error: "",
  });
};

export default notFoundHandler;
