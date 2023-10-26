// 1. terminal inputs

// const stdin = process.stdin
//     .on("data", (msg) =>
//   console.log("terminal input was: ", msg)
// );

// const stdout = process.stdout.on("data", (msg) => {
//   console.log(msg.toString().toUpperCase());
// });

// stdin.pipe(stdout);

// 2. create a random binary file
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

// 3. reading big file
import http from "http";
import { createReadStream, readFileSync } from "fs";

http
  .createServer((request, response) => {
    // const file = readFileSync("big.file");
    // response.write(file);
    // response.end();
    createReadStream("big.file").pipe(response);
  })
  .listen(3000)
  .on("listening", () => console.log("server is listening on port: 3000"));
