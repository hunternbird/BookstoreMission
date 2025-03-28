import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  return (
    <div>
      <h2>Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.bookID}>
                {item.title}: ${item.price.toFixed(2)}
                <button onClick={() => removeFromCart(item.bookID)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>Total</h3>
      <button onClick={() => navigate("/cart")}>Checkout</button>
      <button onClick={() => navigate("/books")}>Continue Browsing</button>
    </div>
  );
}

export default CartPage;
