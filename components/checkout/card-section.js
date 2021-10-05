import React from "react";

import { CardElement } from "@stripe/react-stripe-js";

function CardSection(props) {
  return (
    <div>
      <div>
        <label htmlFor="card-element">Credit or debit card</label>

        <div>
          <fieldset style={{ border: "none" }}>
            <div>
              <div id="card-element" style={{ width: "100%" }}>
                <CardElement
                  options={{
                    style: { width: "100%", base: { fontSize: "18px" } },
                  }}
                />
              </div>
              <br />
              <div>
                <button onClick={props.submitOrder}>Confirm order</button>
              </div>
              {props.stripeError ? (
                <div>{props.stripeError.toString()}</div>
              ) : null}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default CardSection;
