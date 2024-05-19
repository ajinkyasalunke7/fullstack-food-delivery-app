import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
import { useEffect } from "react";

export default function ExploreMenu({ category, setCategory }) {
  useEffect(() => {
    console.log("Menu clicked: ", category);
  }, [setCategory, category]);

  return (
    <div>
      <div className="explore-menu" id="explore-menu"></div>
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et beatae aut
        numquam fuga illo repudiandae eaque corrupti! Ullam saepe sequi ea
        incidunt tempore minus provident, necessitatibus nulla illo perferendis
        cumque!
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            key={index}
            className="explore-menu-list-item"
          >
            <img
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt={`${item.menu_name}-img`}
              draggable="false"
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>

      <hr />
    </div>
  );
}
