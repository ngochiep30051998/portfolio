import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://keycloak.com.au:8080/auth',
    realm: 'portfolio',
    clientId: 'portfolio'
});

export default keycloak;