import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <>
        <Routes>
          <Route path="/" element={<Coins />} />
          <Route path="/:coinId/*" element={<Coin />} />
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default Router;
