import mongoose from "mongoose";
import config from "./app/config";
import app from "./app/app";
console.log({ config });
let server;
async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);
    console.log("DB Connected..");
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log("error=>", error);
  }
}

main();
