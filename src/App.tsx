import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LayoutComponent from "./layout/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <LayoutComponent>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </LayoutComponent>
      </BrowserRouter>
    </>
  );
}

export default App;
