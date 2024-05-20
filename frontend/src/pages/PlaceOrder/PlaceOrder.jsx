import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";
export default function PlaceOrder() {
  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <div>
      <hr className="place-order-div-hr" />
      <form className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery information</p>
          <div className="multi-fields">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <input type="email" placeholder="Enter email address" />
          <input type="text" placeholder="Street address 1" />
          <input type="text" placeholder="Street address 2" />
          <div className="multi-fields">
            <input type="text" placeholder="City" />
            <input type="text" placeholder="State" />
          </div>
          <div className="multi-fields">
            <input type="text" placeholder="Pincode" />
            <input type="text" placeholder="Country" />
          </div>
          <input type="number" placeholder="Phone No." />
        </div>
        <div className="place-order-right">
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
            <button disabled={getTotalCartAmount() <= 0}>
              {getTotalCartAmount() <= 0
                ? "No items, can't proceed further"
                : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
