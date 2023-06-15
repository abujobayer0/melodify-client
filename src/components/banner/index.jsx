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
              "https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/p22-011-147-web.jpg"
            }
          />
        </SwiperSlide>

        <SwiperSlide>
          <BannerChild
            img={
              "https://www.fmsp.com/wp-content/uploads/2018/01/Kennedy-Space-Center-Visitor_Space-Shuttle-Atlantis_1.jpg"
            }
          />
        </SwiperSlide>
      </Swiper>
      <div className="absolute bottom-96 z-10    px-5 md:px-10 w-full    ">
        <BannerChild
          isButton
          lineOne={"Learn The "}
          styledText={"Space"}
          lineTwo={"From The Masters"}
          buttonText={"Learn More"}
          para={
            "SpaceCamp: Ignite Your Passion for the Cosmos. Explore the Vast Frontiers of Space with Expert Instructors. Dive into captivating lessons on Planets, Stars, and Galaxies. Engage in Interactive Activities, Uncover Cosmic Mysteries, and Connect with a Thriving Community of Space Enthusiasts. Embark on a Stellar Learning Journey and Unlock the Wonders of the Universe at SpaceCamp."
          }
        />
      </div>
    </div>
  );
};

export default Banner;
