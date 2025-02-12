import { ENV } from "./getEnv";
import { DATABASE_URL } from "./getEnv";
import { connect } from "mongoose";
import app from "./app";
import { createServer } from "http";
// import initDefaultData from './defaultData';
// import redisClient from "./config/redis";

const PORT = process.env.PORT || 5000;

// main db connecion
connect(DATABASE_URL)
  .then(async () => {
    console.log("Connected to database");
    // init default data
    // await initDefaultData();
  })
  .catch((err) => {
    console.log("error", err);
  })
  // .then(async () => {
  //   // connect to redis
  //   await redisClient
  //     .on("error", (err) => {
  //       console.log("Redis error: ", err);
  //     })
  //     .connect()
  //     .then(async () => redisClient.set("test", "test"));
  // })
  .catch((err) => {
    console.log("Redis error: ", err);
  })
  .then(async () => {
    app.set("port", PORT);

    const server = createServer(app);

    server.listen(PORT).on("listening", () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
