import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = ({
  price,
  email,
  name,
  instructor,
  image,
  itemId,
  instructorEmail,
  seat,
  userEmail,
  id,
}) => {
  return (
    <div className="w-full">
      <Elements stripe={stripePromise}>
        <Checkout
          price={price}
          image={image}
          name={name}
          userEmail={userEmail}
          instructor={instructor}
          instructorEmail={instructorEmail}
          email={email}
          seat={seat}
          id={id}
          itemId={itemId}
        ></Checkout>
      </Elements>
    </div>
  );
};

export default Payment;
