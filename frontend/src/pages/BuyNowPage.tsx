import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
// import { useState } from "react";
import { CartItem } from "../types/CartItem";

function BuyNowPage () {
    const navigate = useNavigate();
    const {title, bookID, price} = useParams();
    const {addToCart} = useCart();
    // const [price, setPrice] = useState<number>(0);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookID: Number(bookID),
            title: title || 'Out of stock',
            price: Number(price),}
            addToCart(newItem);
        navigate('/cart');
    }
    
    return (
        <>
            <h2>{title}</h2>    
            <div>
                <p>Price: ${price}</p>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>

            <button onClick={() => navigate(-1)}>Go back</button>
        </>
    );
}

export default BuyNowPage;