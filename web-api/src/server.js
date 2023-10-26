import { randomUUID } from "node:crypto";
import http from "node:http";
import { Readable } from "node:stream";

function* run() {
  for (let index = 0; index <= 99; index++) {
    const data = {
      id: randomUUID(),
      name: `sampath-${index}`,
      at: Date.now(),
    };
    yield data;
  }
}

function handler(request, response) {
  //   const readableStream = Readable({
  //     read() {
  //       this.push("Hello");
  //       this.push("world");
  //       this.push(null);
  //     },
  //   });

  const readableStream = Readable({
    read() {
      for (const data of run()) {
        this.push(JSON.stringify(data).concat("\n"));
      }
      this.push(null); //to end the stream
    },
  });

  readableStream.on("data", (chunk) => {
    console.log(`Received ${chunk.length} bytes of data`);
  });

  readableStream.pipe(response);
}

http
  .createServer(handler)
  .listen(3000)
  .on("listening", () => console.log("server listening on port: 3000"));
