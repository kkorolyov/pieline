import { initTracer } from "jaeger-client";

const tracer = initTracer(
  {
    serviceName: "pi18n",
  },
  {}
);
// Ensure flush
process.on("exit", () => tracer.close());

/**
 * App-wide tracer.
 */
export default tracer;

/**
 * Function to start a new span.
 */
export const startSpan = tracer.startSpan;
