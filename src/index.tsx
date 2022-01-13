import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import ReactDOM from 'react-dom';

import { App } from './App';
import reportWebVitals from './tests/reportWebVitals';

Sentry.init({
  dsn: 'https://38a01b3251144b1a9ea65a51ea17791c@o387782.ingest.sentry.io/6131316',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 0.1,
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
