import React, { useEffect } from 'react';

const Confetti = () => {
  useEffect(() => {
    const startConfettiAnimation = () => {
      const confettiContainer = document.getElementById('confetti-container');

      for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDuration = `${Math.random() * 2 + 0.5}s`;
        confettiContainer.appendChild(confetti);
      }
    };

    startConfettiAnimation();

    const stopConfettiAnimation = () => {
      const confettiContainer = document.getElementById('confetti-container');
      confettiContainer.innerHTML = '';
    };

    const stopAnimationTimeout = setTimeout(() => {
      stopConfettiAnimation();
    }, 5000);

    return () => {
      clearTimeout(stopAnimationTimeout);
      stopConfettiAnimation();
    };
  }, []);

  return <div id="confetti-container"></div>;
};

export default Confetti;
