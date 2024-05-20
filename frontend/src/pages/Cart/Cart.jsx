import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(StoreContext);
  const navigate = useNavigate();
  // console.log("cartItems", cartItems);
  // console.log(getTotalCartAmount());
  return (
    <div>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Update Item</p>
          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              {
                return (
                  <div key={index}>
                    <div className="cart-items-title cart-items-item">
                      <img src={item.image} alt={item.name + "-image"} />
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                      <p>{cartItems[item._id]}</p>
                      <p>${item.price * cartItems[item._id]}</p>

                      <div className="counter">
                        <img
                          onClick={() => {
                            removeFromCart(item._id);
                            navigator.vibrate(100);
                          }}
                          src={assets.remove_icon_red}
                          alt="remove-icon"
                          draggable="false"
                        />

                        <img
                          onClick={() => {
                            addToCart(item._id);
                            navigator.vibrate(100);
                          }}
                          src={assets.add_icon_green}
                          alt="add-icon"
                          draggable="false"
                        />
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              }
            }
          })}
          {getTotalCartAmount() <= 0 && (
            <div className="empty  bounce">
              <p>Your cart is empty. </p>
              <br />
              {/* <Link to={`/#menu`}>
                <span className="message">Menu here</span>
              </Link> */}
            </div>
          )}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </b>
              </div>
            </div>
            <button
              disabled={getTotalCartAmount() <= 0}
              onClick={() => {
                navigate(`/place-order`);
              }}
            >
              {getTotalCartAmount() <= 0
                ? "Add item to cart"
                : "Proceed to checkout"}
            </button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, Enter it here </p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="Promocode " />
                <button>Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
