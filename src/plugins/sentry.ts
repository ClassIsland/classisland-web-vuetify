import * as Sentry from '@sentry/vue';

export function registerSentry(app: App) {
  // 向应用程序实例注册Vuetify插件，然后注册路由器插件
  Sentry.init({
    app,
    dsn: 'http://eb3c67ef422758f3b517f40c65e6cb7b@110.40.26.143:9000/3',
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}
