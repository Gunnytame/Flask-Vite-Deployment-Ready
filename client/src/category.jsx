import React, { useState,useEffect } from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';

function Tops() {
  return(
    <div>
      <h2>Tops</h2>
      <p>Sample Product: Beautiful Blouse</p>
    </div>
  );
}

function Skirts() {
  const [skirtArray,setSkirtArray ] = useState([]);

  useEffect(() => {
    fetch("/api/sales") .then(res => res.json())
    .then(data => setSkirtArray(data))
    
    
    
  }, []);

  return (
    <div>
      <h2>Skirts</h2>
      <p>Sample Product: Elegant Skirt</p>
      {skirtArray.map((Skirt) => (
        <div> 
          <h1>
            {Skirt.product_name}
        
          </h1>
          <p>
            {Skirt.description}
          </p>
        </div>
      ))}

    </div>

  );

}

function Shorts() {
  return (
    <div>
      <h2>Shorts</h2>
      <p>Sample Product: Comfy Shorts</p>
    </div>
  );
}

function TwoPieces() {
  return (
    <div>
      <h2>Two Pieces</h2>
      <p>Sample Product: Stylish Two-Piece Outfit</p>
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
          <NavLink to={`${url}/Tops`}>Tops</NavLink>
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
        <Route path={`${url}/Tops`} component={Tops} />
        <Route path={`${url}/skirts`} component={Skirts} />
        <Route path={`${url}/shorts`} component={Shorts} />
        <Route path={`${url}/two-pieces`} component={TwoPieces} />
      </Switch>
      <NavLink to="/">Go back to Home</NavLink>
    </div>
  );
}

export default Category;
