import React from "react";
const { registerRootComponent } = require("expo");
const { RecoilRoot } = require("recoil");
const { default: App } = require("./src/App");

const main = function () {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
};

registerRootComponent(main);
