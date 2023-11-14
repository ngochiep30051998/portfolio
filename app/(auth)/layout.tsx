
"use client";
import Keycloak from 'keycloak-js';
const keycloak = new Keycloak({
    realm: 'porfolio',
    url: 'http://keycloak.com.au:8080${kc_base_path}',
    clientId: 'porfolio',
});
const initKeycloak = async ()=>{
    try {
        const authenticated = await keycloak.init({
            onLoad: 'login-required'
        });
        console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
    } catch (error) {
        console.error('Failed to initialize adapter:', error);
    }
}

const AdminLayout = (props: {
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


export default AdminLayout;