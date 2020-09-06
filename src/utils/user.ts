/**
 * user.js is used to manage the user authorization cookies
 */
import Cookies from 'universal-cookie';
import axios from 'axios';
import { COOKIE_USER_TOKEN } from 'config';

interface ILoginResponse {
  access: string;
  refresh: string;
}

export function isLoggedIn(): boolean {
  const cookies = new Cookies();
  return cookies.get(COOKIE_USER_TOKEN);
}

export function deleteSession(): void {
  const cookies = new Cookies();
  cookies.remove(COOKIE_USER_TOKEN);
}

export function saveUserSession(user: ILoginResponse) {
  const cookies = new Cookies();
  const session = {
    refresh: user.refresh || cookies.get(COOKIE_USER_TOKEN).refresh,
    access: user.access
  };
  cookies.set(COOKIE_USER_TOKEN, session, { path: '/' });
  axios.defaults.headers.common['Authorization'] = `Bearer ${user.access}`;
}

export function getSession(): ILoginResponse {
  const cookies = new Cookies();
  return cookies.get(COOKIE_USER_TOKEN);
}

export function getRefreshToken(): string | null {
  const session = getSession();
  if (session && session.refresh) {
    return session.refresh;
  }
  return null;
}
