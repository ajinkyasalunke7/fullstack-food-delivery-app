import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";
export default function FoodItem({ id, name, price, description, image }) {
  // const [itemCount, setItemCount] = useState(0);
  const { cartItems, setCartItems, addToCart, removeFromCart } =
    useContext(StoreContext);

  return (
    <div>
      <div className="food-item">
        <div className="food-item-img-container">
          <img
            className="food-item-image"
            src={image}
            alt={`${name}-food-image`}
            draggable="false"
          />
          {!cartItems[id] ? (
            <img
              className="add"
              onClick={() => {
                // setItemCount((prev) => prev + 1);
                addToCart(id);
                navigator.vibrate(100);
              }}
              src={assets.add_icon_white}
              alt="add-icon"
              draggable="false"
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={() => {
                  // setItemCount((prev) => prev - 1);
                  removeFromCart(id);
                  navigator.vibrate(100);
                }}
                src={assets.remove_icon_red}
                alt="remove-icon"
                draggable="false"
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={() => {
                  // setItemCount((prev) => prev + 1);
                  addToCart(id);
                  navigator.vibrate(100);
                }}
                src={assets.add_icon_green}
                alt="add-icon"
                draggable="false"
              />
            </div>
          )}
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img
              src={assets.rating_starts}
              alt="rating-stars"
              draggable="false"
            />
          </div>
          <p className="food-item-desc">{description}</p>
          <p className="food-item-price">${price}</p>
        </div>
      </div>
    </div>
  );
}
