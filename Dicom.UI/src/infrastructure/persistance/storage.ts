import {storageFactory} from "infrastructure/services/storageFactory";

export const localStore = storageFactory(() => localStorage);
export const sessionStore = storageFactory(() => sessionStorage);
