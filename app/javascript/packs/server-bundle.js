import ReactOnRails from "react-on-rails";

import AppBundle from "bundles/App";

// This is how react_on_rails can see the App in the browser.
ReactOnRails.register({
  AppBundle,
});
