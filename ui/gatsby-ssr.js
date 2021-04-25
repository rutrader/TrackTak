import React from "react";

export { wrapPageElement, wrapRootElement } from "./sharedGatsby";

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script
      data-name="BMC-Widget"
      data-cfasync="false"
      src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
      data-id="tracktak"
      data-description="Support me on Buy me a coffee!"
      data-message=""
      data-color="#BD5FFF"
      data-position="Right"
      data-x_margin="18"
      data-y_margin="18"
    />,
  ]);
};
