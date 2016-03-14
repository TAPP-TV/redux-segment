redux-segment
==========

[Redux](http://rackt.github.io/redux) middleware for sending analytics to [Segment.io](https://segment.io/).

## Usage

```js
import segmentAnalytics from 'redux-segment';

// load analytics.js, globally unfortunately
analytics.load("YOUR_WRITE_KEY");
analytics.page();

let analyticsGlobals = {}; // define any globals you want to pass on with every event, such as user's browser info
let analyticsMiddleware = segmentAnalytics(window.analytics, analyticsGlobals);

```

The default export is a function requiring [segment.io](https://www.npmjs.com/package/segmentio) client instance. This function returns a middleware function, that can be applied using `applyMiddleware` from [Redux](http://rackt.github.io/redux).

If it receives an action whose `meta` property contains an `analytics` property with non-empty `collection` property, it will record the event in the Keen IO analytics.

### Actions

An action that should be recorded to analytics MUST
- have an `analytics` property inside its `meta` property
- have a `collection` property inside its `analytics` property

and MAY
- have an `event` property inside its `analytics` property

#### `collection`
The required `collection` property inside the `analytics` specifies the Keen IO [event collection](https://keen.io/docs/api/#event-collections).

#### `event`
The optional `event` property inside the `analytics` contains the data of the Keen IO [event](https://keen.io/docs/api/#events).

#### An example of an action:
```js
{
  type: ADD_TO_SHOPPING_CART,
  payload: item,
  meta: {
    analytics: {
      collection: "add_item_to_shopping_cart"
    }
  }
}
```

#### An example with optional property `event`:
```js
{
  type: ADD_TO_SHOPPING_CART,
  payload: item,
  meta: {
    analytics: {
      collection: "add_item_to_shopping_cart",
      event: {
        item: {
          title: item.title,
          itemId: item.itemId
        }
      }
    }
  }
}
```
