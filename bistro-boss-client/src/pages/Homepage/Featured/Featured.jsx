import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import "./Fetured.css";
const Featured = () => {
  return (
    <section className="featured-item text-white pt-8 my-20">
      <SectionTitle
        heading={"Featured Item"}
        subHeading={"check it out"}
      ></SectionTitle>
      <div className="md:flex justify-center items-center px-36 pb-20 pt-12">
        <div>
          <img src={featuredImg} alt="" />
        </div>
        <div className="md:mx-10">
          <p>Aug 20, 2025</p>
          <p className="uppercase">Where can i get some?</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde
            molestias exercitationem, totam necessitatibus minima cum quam fuga
            autem omnis, laudantium, iure quidem at delectus molestiae eveniet
            dolore labore repudiandae porro dignissimos illum nemo praesentium
            nobis saepe. Quia aut laudantium impedit asperiores, possimus
            inventore tempora beatae provident amet saepe, placeat obcaecati.
          </p>
          <button className="btn btn-outline">Order Now!</button>
        </div>
      </div>
    </section>
  );
};

export default Featured;
