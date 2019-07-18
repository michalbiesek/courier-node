# `@trycourier/courier`

A node.js module for communicating with the Courier REST API.

## Installation (via [npm](https://www.npmjs.com/package/@trycourier/courier))

```bash
npm install @trycourier/courier
```

## Usage

```javascript
import { CourierClient } from "@trycourier/courier";

const courier = CourierClient({ authorizationToken: "<AUTH_TOKEN>" }); // get from the Courier UI

// Example: send a message supporting email & SMS
const { messageId } = await courier.send({
  eventId: "<EVENT_ID>", // get from the Courier UI
  recipientId: "<RECIPIENT_ID>", // usually your system's User ID
  profile: {
    email: "example@example.com",
    phone_number: "555-228-3890"
  },
  data: {} // optional variables for merging into templates
});
```

## Advanced Usage

```javascript
import { CourierClient } from "@trycourier/courier";
// const { CourierClient } = require("@trycourier/courier");

const courier = CourierClient({ authorizationToken: "<AUTH_TOKEN>" });

async function run () {

  // Example: send a message
  const { messageId } = await courier.send({
    eventId: "<EVENT_ID>",
    recipientId: "<RECIPIENT_ID>",
    profile: {}, // optional
    data: {} // optional
  });
  console.log(messageId);

  // Example: replace a recipient's profile
  const { status: replaceStatus } = await courier.replaceProfile({
    recipientId: "<RECIPIENT_ID>",
    profile: {
      "email": "example@example.com"
    }
  });
  console.log(replaceStatus);

  // Example: merge into a recipient's profile
  const { status: mergeStatus } = await courier.mergeProfile({
    recipientId: "<RECIPIENT_ID>",
    profile: {
      "sms": "555-555-5555"
    }
  });
  console.log(mergeStatus);

  // Example: get a recipient's profile
  const { profile } = await courier.getProfile({
    recipientId: "<RECIPIENT_ID>"
  });
  console.log(profile);

};

run();
```

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)

## Author

[Courier](https://github.com/trycourier) ([support@trycourier.com](mailto:support@trycourier.com))
