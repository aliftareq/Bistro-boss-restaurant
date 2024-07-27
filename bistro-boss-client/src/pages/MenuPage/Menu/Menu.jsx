import { Helmet } from "react-helmet-async";
import Cover from "../../shared/Cover/Cover";
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
import menuImg from "../../../assets/menu/banner3.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupsImg from "../../../assets/menu/soup-bg.jpg";

const Menu = () => {
  const [menu] = useMenu();
  const desserts = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");
  return (
    <div>
      <Helmet>
        <title>Bistro Boss| Menu</title>
      </Helmet>
      {/* main cover */}
      <Cover img={menuImg} title="Our Menu"></Cover>
      {/* offered menu items */}
      <SectionTitle
        heading={"Today's offer"}
        subHeading={"Don't Miss"}
      ></SectionTitle>
      <MenuCategory items={offered}></MenuCategory>
      {/* dessert menu Items */}
      <MenuCategory
        items={desserts}
        title="Dessert"
        img={dessertImg}
      ></MenuCategory>
      {/* pizza menu Items */}
      <MenuCategory items={pizza} title="pizza" img={pizzaImg}></MenuCategory>
      {/* salad menu Items */}
      <MenuCategory items={salad} title="salad" img={saladImg}></MenuCategory>
      {/* soup menu Items */}
      <MenuCategory items={soup} title="soups" img={soupsImg}></MenuCategory>
    </div>
  );
};

export default Menu;
