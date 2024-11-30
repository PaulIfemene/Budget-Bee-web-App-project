import React, { useEffect } from 'react';

const TawkTo = () => {
  useEffect(() => {
    // Add the Tawk.to script dynamically
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/6749d6434304e3196aea78f8/1ids6pu99';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(script, firstScriptTag);

    return () => {
      // Cleanup the script when the component unmounts
      const tawkScript = document.querySelector(
        `script[src="https://embed.tawk.to/6749d6434304e3196aea78f8/1ids6pu99"]`
      );
      if (tawkScript) {
        tawkScript.remove();
      }
    };
  }, []);

  return null; // This component doesn't render any visible UI
};

export default TawkTo;
