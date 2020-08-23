import { initTracer } from "jaeger-client";

const tracer = initTracer(
  {
    serviceName: "pi18n",
    sampler: {
      type: "const",
      param: 1,
    },
    reporter: {
      logSpans: false,
    },
  },
  {
    logger: {
      info: (msg) => console.log("INFO ", msg),
      error: (msg) => console.log("ERROR ", msg),
    },
  }
);
// Ensure flush
process.on("exit", () => tracer.close());

/**
 * App-wide tracer.
 */
export default tracer;
