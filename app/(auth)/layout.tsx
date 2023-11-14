const AdminLayout = (props: {
    children: React.ReactNode;
}) => {
    return <div>
        <header>Header</header>
        <aside>Sidebar</aside>
        {props.children}
        <footer>Footer</footer>
    </div>
}


export default AdminLayout;