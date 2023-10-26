import { createWriteStream } from "node:fs";
import { get } from "node:http";
import { Transform, Writable } from "node:stream";

const url = "http://localhost:3000";
const getHttpStream = () =>
  new Promise((resolve) => get(url, (response) => resolve(response)));

const stream = await getHttpStream();
stream
  .pipe(
    Transform({
      // this will force stream to use string instead of buffers
      objectMode: true,
      transform(chunk, enc, cb) {
        //   console.log("chunk", JSON.parse(chunk));

        const item = JSON.parse(chunk);
        const myNumber = /\d+/.exec(item.name)[0];
        const isEven = myNumber % 2 === 0;
        item.name = item.name.concat(isEven ? " is even" : " is odd");
        // console.log(item);
        cb(null, JSON.stringify(item));
      },
    })
  )
  .filter((chunk) => chunk.includes("even"))
  .map((chunk) => chunk.toUpperCase() + "\n")
  .pipe(
    createWriteStream(
      "response.log",
      // flag a => append data if exist
      { flags: "a" }
    )
  );

// we can't have two writable streams on the same pipeline
//   .pipe(
//     Writable({
//       objectMode: true,
//       write(chunk, enc, cb) {
//         console.log("chunk", chunk);
//         return cb();
//       },
//     })
//   );
