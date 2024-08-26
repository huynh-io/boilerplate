import ReactOnRails from "react-on-rails";

import App from "../bundles/HelloWorld/components/HelloWorldServer";

// This is how react_on_rails can see the App in the browser.
ReactOnRails.register({
  App,
});
