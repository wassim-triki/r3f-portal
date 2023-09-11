import { proxy } from "valtio";

const state = proxy({ inPortal: false });

export default state;
