import { atom } from "recoil";

export const isInitState = atom({
  key: "is-init-state",
  default: false,
});

export const userTypeState = atom({
  key: "user-type-state",
});
