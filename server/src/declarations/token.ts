import * as Cookies from 'cookies';

export default class Token {
  cookies: any;
  cookieName: string;
  constructor(req, res) {
    this.cookieName = 'access-token';
    this.cookies = new Cookies(req, res);
  }

  // get the token
  get() {
    return (this.cookies.get(this.cookieName));
  }

  set(newToken: string) {
    this.cookies.set(this.cookieName, newToken, {
      httpOnly: true,
      sameSite: true,
      overwrite: true,
      expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) // expire a week from now
    });
  }

  delete() {
    this.cookies.set(this.cookieName);
  }
}