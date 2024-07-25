import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../shared/MenuItem/MenuItem";

const PopulerMenu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        const populerItems = data.filter((item) => item.category === "popular");
        setMenu(populerItems);
      });
  }, []);
  return (
    <section className="mb-12">
      <SectionTitle
        heading={"From Our Menu"}
        subHeading={"Populer Items"}
      ></SectionTitle>
      <div className="grid md:grid-cols-2 gap-10">
        {menu.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
    </section>
  );
};

export default PopulerMenu;
