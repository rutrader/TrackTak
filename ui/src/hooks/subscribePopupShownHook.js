import { createLocalStorageStateHook } from "use-local-storage-state";

const subscribePopupShownHook = createLocalStorageStateHook(
  "subscribePopupShown",
  false,
);
export default subscribePopupShownHook;
