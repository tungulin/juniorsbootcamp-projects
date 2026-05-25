import { useLocalStorage } from '@siberiacancode/reactuse';

const PREFIX = 'jbp-projects-';

export const useAuthTokenLocalStorage = () => useLocalStorage<string>(`${PREFIX}token`);
