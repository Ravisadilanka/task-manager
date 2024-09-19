import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LayoutComponent from "./layout/Layout";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <LayoutComponent>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </LayoutComponent>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
