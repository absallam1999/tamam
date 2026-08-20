import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Stores from "../pages/Stores/index";
import StoreDetails from "../pages/Stores/StoreDetail";
import Contact from "../pages/Contact";
import Privacy from "../pages/Privacy";
import Cookies from "../pages/Cookies";
import Terms from "../pages/Terms";
import Apps from "../pages/Apps";
import Partnership from "../pages/Partnership";
import CustomerApp from "../pages/Apps/Customer";
import CourierApp from "../pages/Apps/Courier";
import FleetApp from "../pages/Apps/Fleet";
import StoreApp from "../pages/Apps/Store";
import GDPR from "../pages/GDPR";
import FAQ from "../pages/FAQ";
import NotFound from "../pages/NotFound";
import SEOHandler from "../SEO/handler";

const AppRoutes = () => {
  return (
    <>
      <SEOHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/stores/:id" element={<StoreDetails />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/apps/customer" element={<CustomerApp />} />
        <Route path="/apps/courier" element={<CourierApp />} />
        <Route path="/apps/store" element={<StoreApp />} />
        <Route path="/apps/fleet" element={<FleetApp />} />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="/download" element={<CustomerApp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/gdpr" element={<GDPR />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;