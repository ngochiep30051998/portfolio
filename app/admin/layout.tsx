


const AdminLayout = (props: {
    children: React.ReactNode;
}) => {
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