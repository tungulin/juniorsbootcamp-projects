import { useLocalStorage } from '@siberiacancode/reactuse';

import type { User } from '@/generated/api';

const PREFIX = 'jbp-projects';

export const useAuthTokenLocalStorage = () => useLocalStorage<string>(`${PREFIX}-token`);
export const useUserLocalStorage = () => useLocalStorage<User>(`${PREFIX}-user`);
