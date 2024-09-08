import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils.js';
import { ToastContainer } from 'react-toastify';
import styles from './Home.module.scss';
import bg from '../../bg.jpg';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState('');
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(name == "" || price == "" || category == ""){
            handleError("All fields are required")
        }
        else{
        axios.post("https://mernback2-vbd8.onrender.com/products/addproducts", { name, price, category }).then(
            res => {
                console.log(res, "poost")
                // handleSuccess("Product added Successfully");
                setName(""); setPrice(""); setCategory(""); 
                fetchProducts();
            }
            
        )
        
        handleSuccess("Product added Successfully");
       
        setVisible(false);
           
        

    }
  
    }
    const fetchProducts = async () => {
        try {
            axios.get("https://mernback2-vbd8.onrender.com/products/getproducts")
                .then(res =>
                    setProducts(res.data.data.products)
                )
            // const url = "http://localhost:3001/products";
            // const headers = {
            //     headers: {
            //         'Authorization': localStorage.getItem('token')
            //     }
            // }
            // const response = await fetch(url, headers);
            // const result = await response.json();
            // console.log(result);
            // setProducts(result);
        } catch (err) {
            handleError(err);
        }
    }
    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        setTimeout(() => {
            navigate('/home')
        },1000)

    }
    useEffect(() => {
        fetchProducts()
        console.log(loggedInUser, "logged in")

    }, [])
    const myStyle = {
        backgroundImage:
            `url(${bg})`,
        // height: "100vh",
        // marginTop: "-70px",
        // fontSize: "50px",

        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        height: "100vh"

    };
    const addDialogue = () => {
        if (loggedInUser) {
            setVisible(true)
        }
        else {
            setVisible(false);
            alert("Kindly login to add products")
        }
    }
    return (
        <div>
            {/* <img src={bg}></img>

            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button> */}

            <div style={myStyle}>
            {loggedInUser ? <h1 style={{color:"white",padding:"10px"}}>Welcome {loggedInUser}</h1> : ""}

                {/* <button className={styles.addProd}>Add Product</button> */}
                <Button label="Add Product" className={styles.addProd} icon="pi pi-external-link"
                    onClick={()=> addDialogue()} />
                <Dialog id="dialogueClose" header="Add Product" visible={visible}
                    onHide={() => {
                        if (!visible) return; setVisible(false);
                    }}
                    style={{ width: '50vw', color: "brown" }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                    {/* <p className="m-0"> */}

                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. */}
                    {/* </p> */}
                    <div className={styles.container}>
                        <div className={styles.formCenter}>

                            <form onSubmit={handleSubmit}>


                                <div>
                                    <label htmlFor='name'>Name of the product</label>
                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        name='Name'
                                        placeholder='Enter product name...'

                                    />
                                </div>
                                <div>
                                    <label htmlFor='price'>Price</label>
                                    <input
                                        onChange={(e) => setPrice(e.target.value)}

                                        name='price'
                                        placeholder='Enter product price...'

                                    />
                                </div>
                                <div>
                                    <label htmlFor='category'>Category</label>
                                    <input
                                        onChange={(e) => setCategory(e.target.value)}

                                        name='category'
                                        placeholder='Enter product category...'

                                    />
                                </div>


                                <button type='submit'>Add</button>


                            </form>
                            <ToastContainer />
                        </div>
                    </div>
                </Dialog>
                <div className={styles.prodContainer}     >
                    {
                        products && products?.map((item, index) => (
                            <ul key={index} className={styles.prodItems}>
                                {/* <span>{item.name} : {item.price}</span> */}
                                <div><h6>Name : {item.name}</h6></div>
                                <div><h6>Price : {item.price}</h6></div>
                                <div><h6>Category : {item.category}</h6></div>


                            </ul>
                        ))
                    }
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Home
