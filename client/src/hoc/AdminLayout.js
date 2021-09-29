import Header from '../components/Header'


const AdminLayout = (props)=>{

    return(
        <>
           <Header/>
            <div>
                {props.children}
            </div>
        </>

    )

}

export default AdminLayout;