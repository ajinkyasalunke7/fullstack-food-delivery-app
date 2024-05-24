import "./Add.css";
import { assets } from "../../assets/assets.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function Add() {
  const [image, setImage] = useState(null); // Initialize image state with null
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      console.error("Please select an image.");
      return;
    }
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/add`,
        formData
      );
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload-area-image"
            />
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
              id="image"
              hidden
              required
              disabled={isSubmitting}
            />
          </label>
          <div className="flex-col add-product-name">
            <p>Product name</p>
            <input
              type="text"
              name="name"
              placeholder="Enter item name here"
              required
              onChange={onChangeHandler}
              value={data.name}
              disabled={isSubmitting}
            />
          </div>
          <div className="flex-col add-product-description">
            <p>Product description</p>
            <textarea
              type="text"
              name="description"
              rows={6}
              placeholder="Enter item description here"
              required
              onChange={onChangeHandler}
              value={data.description}
              disabled={isSubmitting}
            />
          </div>
          <div className="add-category-price">
            <div className="flex-col add-category">
              <p>Product category</p>
              <select
                name="category"
                required
                onChange={onChangeHandler}
                value={data.category}
                disabled={isSubmitting}
              >
                <option value="">Select-Option</option>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="add-price">
              <p>Product price</p>
              <input
                type="number"
                name="price"
                placeholder="$"
                onChange={onChangeHandler}
                value={data.price}
                disabled={isSubmitting}
              />
            </div>
          </div>
          <button type="submit" className="add-button" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
