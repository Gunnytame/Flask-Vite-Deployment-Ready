import React, { useState } from 'react';
import Confetti from './Confetti';

const SignUpPopUp = () => {
  const [showPopUp, setShowPopUp] = useState(false);

  const handleSignUp = () => {
    setShowPopUp(true);
  };

  return (
    <div>
      <button onClick={handleSignUp}>Sign Up</button>

      {showPopUp && (
        <div className="popup">
          <p>Thank you for signing up!</p>
          <Confetti /> {}
        </div>
      )}

      <style jsx>{`
        .popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 20px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default SignUpPopUp;
