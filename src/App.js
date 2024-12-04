import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import {Details, Favorites, Home, SignIn, SignUp, History, NotFound} from "./pages";
import {PATHS} from "./constants/paths";
import {MainLayout} from "./layouts/main-layout/main-layout";

function App() {
  return (
      <Router>
          <div>
              <Routes>
                  <Route element={<MainLayout />}>
                      <Route path={PATHS.ROOT} element={<Home />} />
                      <Route path={PATHS.SIGNIN} element={<SignIn />} />
                      <Route path={PATHS.SIGNUP} element={<SignUp />} />
                      <Route path={PATHS.FAVORITES} element={<Favorites />} />
                      <Route path={PATHS.HISTORY} element={<History />} />
                      <Route path={PATHS.DETAILS} element={<Details />} />
                      <Route path={PATHS.ANY} element={<NotFound />} />
                  </Route>
              </Routes>
          </div>
      </Router>
  );
}

export default App;
