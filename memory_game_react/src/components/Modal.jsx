import { useState } from 'react';
import { createPortal } from 'react-dom';
import Instructions from './Instructions.jsx';

export default function Portal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Game Rules 🔎
      </button>
      {showModal && createPortal(
        <Instructions onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  );
}