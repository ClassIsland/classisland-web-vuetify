import * as Sentry from '@sentry/vue';

export default async function tracedFetch(uri: string, init?: RequestInit) {
  const traceData = Sentry.getTraceData();
  const sentryTraceHeader = traceData["sentry-trace"];
  const sentryBaggageHeader = traceData["baggage"];

  init ??= {
    method: "GET",
    headers: {},

  };
  init.headers["baggage"] = sentryBaggageHeader;
  init.headers["sentry-trace"] = sentryTraceHeader;
  return fetch(uri, init);
}
