import { Helmet } from "react-helmet-async";
import Cover from "../../shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg";
import PopulerMenu from "../../Homepage/PopulerMenu/PopulerMenu";

const Menu = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss| Menu</title>
      </Helmet>
      <Cover img={menuImg} title="Our Menu"></Cover>
      <PopulerMenu></PopulerMenu>
      <Cover img={menuImg} title="Our Menu"></Cover>
      <PopulerMenu></PopulerMenu>
      <Cover img={menuImg} title="Our Menu"></Cover>
      <PopulerMenu></PopulerMenu>
    </div>
  );
};

export default Menu;
