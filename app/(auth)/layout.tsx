
"use client";
import Keycloak from 'keycloak-js';
const keycloak = new Keycloak({
    realm: 'portfolio',
    url: 'http://keycloak.com.au:8080',
    clientId: 'porfolio-backoffice',
});
const initKeycloak = async ()=>{
    try {
        const authenticated = await keycloak.init({
            onLoad: "check-sso",
            redirectUri: "http://localhost:3000/login",
            checkLoginIframe: true,
        });
        const url = keycloak.login();
        console.log(url)
        console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
    } catch (error) {
        console.error('Failed to initialize adapter:', error);
    }
}

const AuthLayout = (props: {
    children: React.ReactNode;
}) => {
    initKeycloak();
    return (
        <html lang="en" className="!scroll-smooth">
        <body>
            <div>
                <header>Header</header>
                <aside>Sidebar</aside>
                {props.children}
                <footer>Footer</footer>
            </div>
        </body>
    </html>
    )

}


export default AuthLayout;