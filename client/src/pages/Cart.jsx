import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", color: "#00796b" }}>Shopping Cart</h1>

      {cart.map((item) => (
        <div key={item._id} style={{ display: "flex", gap: "1rem", border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem", borderRadius: "10px" }}>
          <img src={item.image} alt={item.title} style={{ height: "150px", objectFit: "contain" }} />
          <div style={{ flex: 1 }}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "green", fontWeight: "bold" }}>₹{item.price}</span>
              <button onClick={() => removeFromCart(item._id)} style={{ backgroundColor: "red", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px" }}>Remove</button>
              <select value={item.quantity} onChange={(e) => updateQuantity(item._id, e.target.value)}>
                {[...Array(10).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>{x + 1}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Total: ₹{totalPrice}</h2>
        <button style={{ padding: "10px 20px", backgroundColor: "#43a047", color: "white", border: "none", borderRadius: "5px", fontSize: "16px" }}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
