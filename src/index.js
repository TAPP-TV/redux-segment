export default function segmentAnalytics(segmentClient, getGlobals) {
  if (!segmentClient || !segmentClient.trackByJS) {
    throw new TypeError('You must provide a segment-js client instance.');
  }

  let globals = {};

  return (store) => (next) => (action) => {
    if (!action.meta || !action.meta.analytics || !action.meta.analytics.collection) {
      return next(action);
    }

    try {
      const {collection, event} = action.meta.analytics;

      if (typeof getGlobals === 'function') {
        globals = getGlobals(store.getState(), event);
      }

      segmentClient.trackByJS(collection, {
        ...globals, ...event
      });
      if (action.meta.analytics.page) {
        segmentClient.trackPage(action.meta.analytics.page);
      }
    } catch (error) {
      console.error('error', error);
    }
    return next(action);
  };
}
