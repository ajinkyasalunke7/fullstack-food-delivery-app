import { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function List() {
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const fetchList = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/all-food-items`
      );

      if (response.data.success) {
        setList(response.data.data);
        toast.success(
          response.data.message || "Food items loaded successfully"
        );
      } else if (response.data.statusCode === 400) {
        toast.success(response.data.message);
      } else {
        throw new Error(
          response.data.message || "Error occurred while fetching food items"
        );
      }
    } catch (error) {
      console.error("Error fetching food items:", error);
      toast.error("Failed to fetch food items. Please try again later.");
    } finally {
      setIsFetching(false);
    }
  };

  const removeFoodItem = async (id) => {
    console.log(id);
    try {
      setIsFetching(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/remove-food-item`,
        { id: id }
      );
      if (response.data.success) {
        console.log(response.data);
        // Remove the item from the list locally
        setList((prevList) => prevList.filter((item) => item._id !== id));
        setIsFetching(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Error occurred");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All food item list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length === 0 ? (
          <p className="mt">No items available</p>
        ) : (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/images/${item.image}`}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p
                className="cursor"
                onClick={() => {
                  removeFoodItem(item._id);
                }}
              >
                x
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
