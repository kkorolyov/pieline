import React from "react";
import Explore from "./Explore";
import Home from "./Home";
import Market from "./Market";
import User from "./User";

export default { title: "App/Main" };

export const home = () => <Home />;
export const explore = () => <Explore />;
export const market = () => <Market />;
export const user = () => <User />;
