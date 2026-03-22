import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Conferences from "./pages/Conferences";
import Conferencedetail from "./pages/Conferencedetail";
import Itemdetail from "./pages/Itemdetail";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/conferences" element={<Conferences />} />
          <Route path="/conferences/:id" element={<Conferencedetail />} />
          <Route path="/conferences/:id/item/:item_id" element={<Itemdetail />} />
          <Route path="/conferences/:id/reports" element={<Reports />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
