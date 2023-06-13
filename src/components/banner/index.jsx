import { SwiperSlide, Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";

import "./styles.css";

// import required modules
import { Autoplay, Pagination } from "swiper";
import { BannerChild } from "../";
const Banner = () => {
  return (
    <div className="relative w-full">
      <Swiper
        grabCursor={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <BannerChild
            img={
              "https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerChild
            img={
              "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerChild
            img={
              "https://images.unsplash.com/photo-1524578471438-cdd96d68d82c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerChild
            img={
              "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            }
          />
        </SwiperSlide>
      </Swiper>
      <div className="absolute bottom-96 z-10    px-5 md:px-10 w-full    ">
        <BannerChild
          isButton
          lineOne={"Learn The "}
          styledText={"Music"}
          lineTwo={"From The Masters"}
          buttonText={"Learn More"}
          para={
            "Milodify Empowering musicians with video lessons, interactive exercises, and personalized progress tracking. Unlock your creative potential and connect with a vibrant community."
          }
        />
      </div>
    </div>
  );
};

export default Banner;
