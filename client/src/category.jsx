import React from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react';

function Shirts() {
  return (
    <div>
      <h2>Shirts</h2>
      {/* Add content specific to Shirts category */}
    </div>
  );
}

function Skirts() {
  return (
    <div>
      <h2>Skirts</h2>
      {/* Add content specific to Skirts category */}
    </div>
  );
}

function Shorts() {
  return (
    <div>
      <h2>Shorts</h2>
      {/* Add content specific to Shorts category */}
    </div>
  );
}

function TwoPieces() {
  return (
    <div>
      <h2>Two Pieces</h2>
      {/* Add content specific to Two Pieces category */}
    </div>
  );
}

function Category() {
  const { url } = useRouteMatch();

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        <li>
          <NavLink to={`${url}/shirts`}>Shirts</NavLink>
        </li>
        <li>
          <NavLink to={`${url}/skirts`}>Skirts</NavLink>
        </li>
        <li>
          <NavLink to={`${url}/shorts`}>Shorts</NavLink>
        </li>
        <li>
          <NavLink to={`${url}/two-pieces`}>Two Pieces</NavLink>
        </li>
      </ul>

      <Switch>
        <Route path={`${url}/shirts`} component={Shirts} />
        <Route path={`${url}/skirts`} component={Skirts} />
        <Route path={`${url}/shorts`} component={Shorts} />
        <Route path={`${url}/two-pieces`} component={TwoPieces} />
      </Switch>
    </div>
  );
}

export default Category;
