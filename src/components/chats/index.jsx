import { Chat, Send } from "@mui/icons-material";
import PrimaryProgress from "../progress";
import { useGetData } from "../../hooks/useGetData";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import app from "../../utils/firebase.init";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Button } from "@mui/material";
import { BsArrowReturnRight } from "react-icons/bs";

const auth = getAuth(app);
const ChatBox = () => {
  const [user] = useAuthState(auth);

  const { data, isLoading, refetch } = useGetData(
    `/instructor/question-answer?email=${user?.email}`
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const answer = form.answer.value;
    const id = form.id.value;
    try {
      fetch(
        `https://melodify-server.onrender.com/instructor/question-answer/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ answer }),
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      refetch();
      form.reset();
      console.log(answer, id);
    }
  };
  return (
    <div className="w-full bg-lightCard mt-4 md:mt-0 overflow-y-auto h-screen  md:ml-4 rounded-lg ">
      <div className="text-3xl sm:text-4xl md:text-5xl gap-2 p-4 items-center flex justify-center   text-gray-400 border-b-2  border-gray-400 rounded-full">
        <Chat sx={{ fontSize: { xs: 35, md: 45 } }} />
        Chats
      </div>
      {isLoading && <PrimaryProgress />}
      <div className="  py-4 w-full">
        {data && (
          <>
            {data?.map((item, indx) => (
              <div
                key={indx}
                className="flex  flex-col-reverse border-2  border-gray-600 px-8 py-4 my-2 rounded-lg "
              >
                <h1 className="text-xs flex flex-col my-2 justify-end text-end text-gray-200">
                  <span className="w-full my-2 flex text-end justify-end gap-2 items-center text-purple-400">
                    {item?.instructor?.name}
                    <img
                      src={item?.instructor?.image}
                      className="w-6 rounded-full h-6"
                      alt=""
                    />{" "}
                  </span>
                  <span className="flex w-full items-center gap-2 justify-end">
                    {item?.answer ? (
                      <>
                        {item?.answer}
                        <FaArrowLeft className="text-purple-500" />
                      </>
                    ) : (
                      <form
                        onSubmit={handleSubmit}
                        className="relative w-full flex items-center"
                      >
                        <span className="flex gap-2 items-center absolute -top-6">
                          <BsArrowReturnRight className="text-lg" />
                          Reply to{" "}
                          <input
                            type="text"
                            name="id"
                            className="hidden"
                            value={item?._id}
                          />
                          <span className="font-semibold text-green-400 ">
                            {item?.user?.displayName}
                          </span>
                        </span>

                        <input
                          type="text "
                          className="w-full px-4 outline-none bg-dark h-10 rounded-full"
                          name="answer"
                        />
                        <Button
                          color="secondary"
                          type="submit"
                          sx={{ "&&:focus": { outline: "none" } }}
                        >
                          <Send sx={{ color: "#a855f7", cursor: "pointer" }} />
                        </Button>
                      </form>
                    )}
                  </span>
                </h1>
                <div className="text-start flex items-center gap-2 my-2 justify-start  relative text-gray-300 text-xs">
                  <FaArrowRight className="text-green-500" />
                  {item?.question}
                </div>
                <div className="w-full flex text-start items-center gap-2 text-green-400 text-sm ">
                  <img
                    src={item?.user?.photoURL}
                    className="w-6 rounded-full h-6"
                    alt=""
                  />
                  {item?.user?.displayName}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
