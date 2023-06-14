import { useParams } from "react-router-dom";
import { Footer, NavBar, Payment, PrimaryProgress } from "../components";

import { FaChair } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import app from "../utils/firebase.init";
import { useGetData } from "../hooks/useGetData";
const auth = getAuth(app);
const PaymentPage = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);

  const {
    data: item,
    isLoading,
    error,
  } = useGetData(`/user/selectedClass/${id}/${user?.email}`);
  console.log(error);
  const price = item?.selectedClass?.newClass?.price;
  const Instructoremail = item?.selectedClass?.newClass?.email;
  console.log(Instructoremail);
  return (
    <div className="bg-dark  flex flex-col justify-between   w-full ">
      <NavBar isBlack />
      <h1 className="text-4xl text-gray-200 uppercase md:pb-5 md:text-5xl">
        Enroll Now
      </h1>
      <div className="px-5 md:py-10 py-5 flex flex-col md:flex-row gap-5 md:gap-5">
        {isLoading && (
          <div className="w-full">
            {" "}
            <PrimaryProgress />
          </div>
        )}
        {!isLoading && (
          <div className="flex flex-col max-w-lg p-6  bg-lightCard mx-auto space-y-6 overflow-hidden rounded-lg shadow-md text-gray-100">
            <div className="flex space-x-4">
              <img
                alt=""
                src={item?.selectedClass?.newClass?.instructorIcon}
                className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
              />
              <div className="flex flex-col space-y-1">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-sm text-start font-semibold"
                >
                  {item?.selectedClass?.newClass?.instructor}
                </a>
                <span className="text-xs dark:text-gray-400">
                  {item?.selectedClass?.newClass?.email}
                </span>
              </div>
            </div>
            <div>
              <img
                src={item?.selectedClass?.newClass?.image}
                alt=""
                className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
              />
              <h2 className="mb-1 text-xl font-semibold">
                {item?.selectedClass?.newClass?.name}
              </h2>
              <p className="text-sm dark:text-gray-400">
                {item?.selectedClass?.newClass?.detail}
              </p>
            </div>
            <div className="flex flex-wrap justify-between">
              <div className="flex space-x-2 text-sm dark:text-gray-400">
                <button
                  type="button"
                  className="flex items-center p-1 space-x-1.5"
                >
                  <FaChair />
                  <span>{item?.selectedClass?.newClass?.available_seat}</span>
                </button>
                <button
                  type="button"
                  className="flex items-center p-1  space-x-1.5"
                >
                  ${" "}
                  <span className="pl-1">
                    {item?.selectedClass?.newClass?.price}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="w-full flex flex-col">
          <h1 className="md:hidden text-2xl text-gray-200 pb-5">Payment</h1>
          <div className="w-full bg-lightCard p-4 rounded-lg text-gray-200 text-xl text-start uppercase mb-4">
            <h1>
              Your Total Price :{" "}
              <span className=" text-purple-400">
                ${item?.selectedClass?.newClass?.price}
              </span>
            </h1>
            <p className="mt-4 text-sm text-gray-400">
              DEMO CARD Number : 4242 4242 4242 4242
            </p>
            <span className="flex gap-4">
              <p className="mt-4 text-sm text-gray-400">MM : 12</p>
              <p className="mt-4 text-sm text-gray-400">YY : 45</p>
              <p className="mt-4 text-sm text-gray-400">cvc : 456</p>
              <p className="mt-4 text-sm text-gray-400">zip : 12345</p>
            </span>
          </div>
          <Payment
            email={item?.selectedClass?.newClass?.email}
            seat={item?.selectedClass?.newClass?.available_seat}
            name={item?.selectedClass?.newClass?.name}
            image={item?.selectedClass?.newClass?.image}
            instructor={item?.selectedClass?.newClass?.instructor}
            price={price}
            instructorEmail={item?.selectedClass?.newClass?.email}
            id={item?.selectedClass?._id}
            itemId={item?._id}
          />
        </div>
      </div>
      <Footer isDarkMode />
    </div>
  );
};

export default PaymentPage;
