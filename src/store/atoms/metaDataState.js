import { atom } from "recoil";

export const metaDataState = atom({
  key: "meta-data-state",
  default: false,
});

export const userTypeState = atom({
  key: "user-type-state",
});
