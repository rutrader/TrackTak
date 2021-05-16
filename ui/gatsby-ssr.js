import React from "react";

export { wrapPageElement, wrapRootElement } from "./sharedGatsby";

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script
      async
      dangerouslySetInnerHTML={{
        __html: `
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/609a83cab1d5182476b7dc87/1f5dp5jsq';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
    `,
      }}
    />,
  ]);
};
