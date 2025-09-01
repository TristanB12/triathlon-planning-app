import { defineStore, acceptHMRUpdate } from 'pinia';
import { AppStatus, type AppSession } from './models';
import { LocalStorage } from 'quasar';
import { AuthClient } from '../api';
import type { CurrentUser, LoginBody, RegisterBody } from '../api/types/auth.type';
import { setAuthorizationHeader } from '../api/utils/set-authorization-header';
import { useGoalsStore } from './goals.store';

export const useSessionStore = defineStore('session', {
  state: () => ({
    session: LocalStorage.getItem<AppSession>('session') || undefined,
    status: AppStatus.LOADING,
    user: undefined as CurrentUser | undefined,
  }),

  getters: {
    isLoaded(): boolean {
      return this.status !== AppStatus.LOADING;
    },
    isAuthenticated(): boolean {
      return this.status === AppStatus.AUTHENTICATED;
    },
  },

  actions: {
    async login(authBody: LoginBody) {
      this.session = await AuthClient.login(authBody);
      LocalStorage.set('session', this.session);
      this.status = AppStatus.AUTHENTICATED;
      setAuthorizationHeader(this.session.access_token);
      await this.startApp();
    },
    async register(authBody: RegisterBody) {
      this.session = await AuthClient.register(authBody);
      LocalStorage.set('session', this.session);
      this.status = AppStatus.AUTHENTICATED;
      setAuthorizationHeader(this.session.access_token);
      await this.startApp();
    },
    logout() {
        this.status = AppStatus.UNAUTHENTICATED;
        this.session = undefined;
        LocalStorage.remove('session');
    },
    async load() {
      try {
        if (!this.session) {
          this.status = AppStatus.UNAUTHENTICATED;
          return;
        }
  
        if (this.session.expires_at < Date.now()) {
          await this.refreshSession();
        }
        setAuthorizationHeader(this.session.access_token);
        await this.startApp();
        this.status = AppStatus.AUTHENTICATED;
      } catch {
        this.logout();
      }
    },
    async refreshSession() {
      this.session = await AuthClient.refreshTokens(this.session!.refresh_token);
      LocalStorage.set('session', this.session);

    },
    async startApp() {
      const goalsStore = useGoalsStore();

      this.user = await AuthClient.getMe();
      await goalsStore.fetchGoals();
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSessionStore, import.meta.hot));
}
