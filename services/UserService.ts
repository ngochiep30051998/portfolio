import Keycloak from "keycloak-js";
import { redirect } from "next/navigation";

const _kc = new Keycloak({
  realm: 'portfolio',
  url: 'http://localhost:8080',
  clientId: 'portfolio',
});

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = async () => {
  const authenticated = await _kc.init({
    onLoad: 'check-sso',
    pkceMethod: 'S256',
    redirectUri: "http://localhost:3000/admin/home",
  })
  console.log('authenticated',authenticated)
  if (authenticated) {
    return true;
  }
  return false

};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const getTokenParsed = () => _kc.tokenParsed;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback: any) =>
  _kc.updateToken(5)
    .then(successCallback)
    .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles: any[]) => roles.some((role) => _kc.hasRealmRole(role));

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  getTokenParsed,
  updateToken,
  getUsername,
  hasRole,
};

export default UserService;
