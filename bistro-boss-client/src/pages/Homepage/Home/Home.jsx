import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopulerMenu from "../PopulerMenu/PopulerMenu";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Category></Category>
      <PopulerMenu></PopulerMenu>
      <Featured></Featured>
    </div>
  );
};

export default Home;
