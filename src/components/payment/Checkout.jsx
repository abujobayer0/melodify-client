import { Button } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import app from "../../utils/firebase.init";
import axios from "axios";
const auth = getAuth(app);
const Checkout = ({
  price,
  image,
  instructor,
  instructorEmail,
  name,
  itemId,
  seat,
  id,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);
  console.log(instructorEmail);
  useEffect(() => {
    axios
      .post(
        "https://melodify-server.onrender.com/create-payment-intent",
        { price },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        const data = response.data;
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [price]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        setCardError(error.message);
        return;
      }

      setCardError("");
      setProcessing(true);

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "anonymous",
            },
          },
        });

      if (confirmError) {
        console.log(confirmError);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        const payment = {
          email: user?.email,
          transactionId: paymentIntent.id,
          amount: paymentIntent.amount,
          quantity: 1,
          name: name,
          instructor: instructor,
          image: image,
          instructorEmail: instructorEmail,
        };

        const [enrollResponse, paymentResponse, selectedClassResponse] =
          await Promise.all([
            axios.put(
              `https://melodify-server.onrender.com/classes/enroll/status?id=${id}&&email=${encodeURIComponent(
                user?.email
              )}`,
              {},
              {
                headers: {
                  "Content-type": "application/json",
                },
              }
            ),
            axios.post(
              "https://melodify-server.onrender.com/payment/history",
              { payment },
              {
                headers: {
                  "Content-type": "application/json",
                },
              }
            ),
            axios.put(
              `https://melodify-server.onrender.com/user/selectedClass/${itemId}/${user?.email}`,
              {},
              {
                headers: {
                  "Content-type": "application/json",
                },
              }
            ),
          ]);

        setError(enrollResponse.error);
      }
    } catch (error) {
      console.log(error);
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Enrolled Successfully!",
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: "custom-swal-container",
        icon: "custom-swal-icon",
      },
    });

    navigate("/dashboard");
    setProcessing(false);
  };

  return (
    <div>
      {" "}
      <form
        className="w-full  mx-auto gap-10 flex flex-col  bg-[#1b2640]  py-10 px-5 rounded-lg"
        onSubmit={handleSubmit}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#fff",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <Button
          variant="contained"
          color="secondary"
          type="submit"
          disabled={!stripe || !clientSecret || processing || seat === 0}
        >
          Pay
        </Button>
      </form>
      {seat === 0 && (
        <span className="text-red-500">
          Class limit is full right now. You wont be able to enroll now. Please
          Try again later !!
        </span>
      )}
      {cardError && <span className="text-red-500">{cardError}</span>}
    </div>
  );
};

export default Checkout;
