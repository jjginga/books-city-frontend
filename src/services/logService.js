import * as Sentry from '@sentry/react';

function init() {
  Sentry.init({
    dsn:
      'https://38381b8e79cd41f08698c2045f5da480@o423815.ingest.sentry.io/5354746',
  });
}

function log(error) {
  console.log(error);
  //Sentry.captureException(error);
}

export default {
  init,
  log,
};
