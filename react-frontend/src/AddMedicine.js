import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddMedicine() {
    let [productName, setProductName] = useState("");
    let [productDescription, setProductDescription] = useState("");
    let [productPrice, setProductPrice] = useState(0);
    let navigate = useNavigate();

    let addProduct = async (event) => {
        event.preventDefault();
        let product = {
            "name": productName, 
            "description": productDescription, 
            "price": productPrice
        };
        try {
            let result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/products`, product);
            if(result.status === 200) {
                alert('Product added successfully');
                navigate("/Admin");
            } else {
                alert('Failed to add product');
            }
        } catch(ex) {
            console.log(ex);
        }
    }

    return(
        <div className="AddMedicine">
            <h2>Add Product</h2>
            <form onSubmit={addProduct}>
                <label>Product Name</label>
                <input type="text" name="productName" onChange={e => setProductName(e.target.value)} /><br/>
                <label>Product Description</label>
                <input type="text" name="producDescription" onChange={e => setProductDescription(e.target.value)} /><br/>
                <label>Product Price</label>
                <input type="number" name="productPrice" onChange={e => setProductPrice(e.target.value)} /><br/>
                <input type="submit" value="Add Product"/>
            </form>
        </div>
    )
}

export default AddMedicine;
