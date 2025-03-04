"use client";

import React, {useEffect, useRef, useState} from "react";

export const YooKassaWidget = ({ confirmationToken, onComplete, onError }) => {
  const paymentFormRef = useRef(null);
  const checkoutRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (document.querySelector("script[src='https://yookassa.ru/checkout-widget/v1/checkout-widget.js']")) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://yookassa.ru/checkout-widget/v1/checkout-widget.js";
    script.async = true;

    script.onload = () => {
      if (!checkoutRef.current && window.YooMoneyCheckoutWidget && paymentFormRef.current) {
        checkoutRef.current = new window.YooMoneyCheckoutWidget({
          confirmation_token: confirmationToken,
          error_callback: (error) => onError?.(error),
        });

        checkoutRef.current.on("complete", () => {
          onComplete?.();
          checkoutRef.current?.destroy();
          checkoutRef.current = null;
        });

        checkoutRef.current.render("payment-form");
      }
      setIsLoaded(true);
    };

    script.onerror = (error) => onError?.(error);

    document.body.appendChild(script);

    return () => {
      checkoutRef.current?.destroy();
      checkoutRef.current = null;
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [confirmationToken]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Payment widget container */}
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-4 w-full max-w-md mx-4">
        <div className="text-center mb-4">
          <h3 className="text-h5">Оплата участия</h3>
        </div>
        <div id="payment-form" ref={paymentFormRef} className="w-full">
          {!isLoaded && (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
