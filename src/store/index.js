import { proxy } from "valtio";

const state = proxy({
  inPortal: false,
  objectOneRef: null,
  objectTwoRef: null,
  objectThreeRef: null,
});

export default state;
