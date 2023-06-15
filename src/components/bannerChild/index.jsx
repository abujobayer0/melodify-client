import PrimaryButton from "../PrimaryButton";
import VideoButton from "../videoButton";

const BannerChild = ({
  img,
  lineOne,
  lineTwo,
  styledText,
  buttonText,
  para,
  isButton,
}) => {
  return (
    <>
      <div className="w-full   border-0 h-[600px] ">
        <img
          src={img}
          className={`w-full  h-screen  ${!img && "opacity-0"}    md:h-auto 
           object-cover object-right-top  brightness`}
          alt=""
        />
      </div>
      <div className="absolute border-none  text-white">
        <span className="w-full headline flex-col text-3xl xs:text-4xl md:text-6xl flex items-start justify-start">
          <span className="flex">
            <h1 className="headline ">{lineOne}</h1>
            <span className="px-4  primary-text text-4xl   home border-r-4 border-gray-300 rounded-full shadow-gray-100 sm:text-6xl ">
              {styledText}
            </span>
          </span>
          <h1>{lineTwo}</h1>
        </span>
        <article className="text-xs md:text-sm my-5 pr-5 w-full md:w-1/2 text-start md:font-normal">
          {para}
        </article>
        {isButton && (
          <span className="flex w-full mt-10 md:mt-0 justify-start gap-6 md:gap-10 items-center">
            <PrimaryButton text={buttonText}></PrimaryButton>
            <VideoButton />
          </span>
        )}
      </div>
    </>
  );
};

export default BannerChild;
