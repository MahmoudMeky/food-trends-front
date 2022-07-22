import React, { useState } from "react";

import { Modal } from "../../UI";
import { Navbar, Navigation } from "./";

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  function toggleModal(e) {
    // To stop clicking on Children
    if (e.target !== e.currentTarget) return;

    setShowModal(!showModal);
  }

  return (
    <header className="bg-white sticky z-50 top-0 shadow-sm">
      <Navbar />

      <Navigation />
    </header>
  );
}
