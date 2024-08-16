import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <section>
      <SectionTitle
        heading={"order online"}
        subHeading={"From 11:00 am to 10:00 pm"}
      ></SectionTitle>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-24"
      >
        <SwiperSlide>
          <Link to="/order/salad">
            <img src={slide1} alt="slide1" />
            <h3 className="text-4xl uppercase text-center -mt-16 text-white">
              Salads
            </h3>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/order/pizza">
            <img src={slide2} alt="slide2" />
            <h3 className="text-4xl uppercase text-center -mt-16 text-white">
              Pizza
            </h3>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/order/soups">
            <img src={slide3} alt="slide3" />
            <h3 className="text-4xl uppercase text-center -mt-16 text-white">
              Soups
            </h3>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/order/dessert">
            <img src={slide4} alt="slide4" />
            <h3 className="text-4xl uppercase text-center -mt-16 text-white">
              Desserts
            </h3>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/order/salad">
            <img src={slide5} alt="slide6" />
            <h3 className="text-4xl uppercase text-center -mt-16 text-white">
              Salads
            </h3>
          </Link>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Category;
