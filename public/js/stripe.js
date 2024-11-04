/*eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51QG5D5D5fk6ikG4dYkenzpYh90WdhFBgEv0RDdqaRepvbEvVcXbMtjGqe7DEPv9HSmSvedlxrxFSnhM0Z0nNY80100bp5NyzsD',
);

export const bookTour = async (tourId) => {
  try {
    // 1) GET CHECKOUT SESSION FROM API
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);
    // 2) CREATE CHECKOUT FORM + CHARGE CREDIT CARD
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    console.log(error);
    showAlert('error', error);
  }
};
