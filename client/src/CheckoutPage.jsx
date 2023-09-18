import React from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';


function CheckoutPage() {
  return (
    <div>
      <h2>Checkout</h2>
      {/* Add checkout form and order summary */}
     <NavLink to="/">Go back to Home</NavLink>
    </div>

  );
}

export default CheckoutPage;
