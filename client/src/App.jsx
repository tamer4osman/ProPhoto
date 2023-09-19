import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
App=() =>{

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/Posts/">Posts</NavLink>
          </li>
          <li>
            <NavLink to="/Posts/id">First Pokemon base</NavLink>
          </li>
        </ul>
      </nav>

      <Routes>

        {/* <Route exact path="/" element={<Home />} />
        <Route path="/Posts/" element={<PokemonDetail />} />
        <Route path="/Posts/:id" element={<DetailedInfo />} /> */}
      </Routes>
      
    </>
  );
}

export default App;