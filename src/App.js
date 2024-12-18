import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Details, Favorites, Home, SignIn, SignUp, History, NotFound, Search } from "./pages";
import { PATHS } from "./constants/paths";
import { MainLayout } from "./layouts/main-layout/main-layout";
import { ProtectedRoute } from "./routes/protected-route/protected-route";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path={PATHS.ROOT} element={<Home />} />
                        <Route path={PATHS.SEARCH} element={<Search />} />
                        <Route path={PATHS.SIGNIN} element={<SignIn />} />
                        <Route path={PATHS.SIGNUP} element={<SignUp />} />
                        <Route path={PATHS.DETAILS} element={<Details />} />
                        <Route path={PATHS.ANY} element={<NotFound />} />
                        <Route path={PATHS.FAVORITES}
                            element={
                                <ProtectedRoute>
                                    <Favorites />
                                </ProtectedRoute>
                            }
                        />
                        <Route path={PATHS.HISTORY}
                            element={
                                <ProtectedRoute>
                                    <History />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
