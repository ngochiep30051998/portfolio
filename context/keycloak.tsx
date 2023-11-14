'use client';

import { SSRCookies, SSRKeycloakProvider } from '@react-keycloak/ssr'
type props = {
    children: React.ReactNode,
}
const keycloakCfg = {
    realm: 'porfolio',
    url: 'http://keycloak.com.au:8080/auth',
    clientId: 'porfolio',
}

interface InitialProps {
    cookies: unknown
  }
export function KeycloakProviders({ children, cookies }: props & InitialProps) {
    return (
        <SSRKeycloakProvider
            keycloakConfig={keycloakCfg}
            persistor={SSRCookies(cookies)}
        >
            {children}
        </SSRKeycloakProvider>
    );
}


