import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCreditCard, FiDollarSign, FiCheck, FiArrowLeft, FiLock } from "react-icons/fi";
import { authAPI } from "../services/api";

const Payment = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = {
    monthly: { price: 9.99, period: "month", savings: null },
    yearly: { price: 99.99, period: "year", savings: "Save 17%" }
  };

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: <FiCreditCard className="w-5 h-5" /> },
    { id: "paypal", name: "PayPal", icon: <FiDollarSign className="w-5 h-5" /> },
    { id: "apple", name: "Apple Pay", icon: <FiDollarSign className="w-5 h-5" /> },
    { id: "google", name: "Google Pay", icon: <FiDollarSign className="w-5 h-5" /> }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Call backend API to upgrade to premium
      await authAPI.upgradeToPremium(
        selectedPlan,
        selectedPayment,
        plans[selectedPlan].price
      );

      // Update local storage
      localStorage.setItem("isPremium", "true");

      // Update user data in localStorage
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      userData.isPremium = true;
      localStorage.setItem("user", JSON.stringify(userData));

      setIsProcessing(false);
      navigate("/dashboard");
    } catch (error) {
      setIsProcessing(false);
      alert(error.message || "Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="px-6 py-4 flex items-center bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <button 
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors"
        >
          <FiArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <div className="flex items-center gap-2 mx-auto">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 flex items-center justify-center">
            <span className="text-white font-bold text-xs">SR</span>
          </div>
          <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">
            Smart Recipes
          </span>
        </div>
        <div className="w-24"></div> {/* Spacer for centering */}
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upgrade to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">Premium</span>
          </h1>
          <p className="text-xl text-gray-600">
            Unlock exclusive features and elevate your culinary journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Plan Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Plan</h2>
            
            <div className="space-y-4 mb-8">
              {Object.entries(plans).map(([key, plan]) => (
                <div
                  key={key}
                  onClick={() => setSelectedPlan(key)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedPlan === key
                      ? "border-amber-500 bg-amber-50"
                      : "border-gray-200 hover:border-amber-300"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900 capitalize">{key} Plan</h3>
                      <p className="text-gray-600">${plan.price}/{plan.period}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {plan.savings && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                          {plan.savings}
                        </span>
                      )}
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        selectedPlan === key
                          ? "border-amber-500 bg-amber-500"
                          : "border-gray-300"
                      }`}>
                        {selectedPlan === key && (
                          <FiCheck className="w-3 h-3 text-white m-0.5" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Features */}
            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
              <h3 className="font-bold text-lg text-amber-800 mb-4">Premium Benefits</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <FiCheck className="text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>Access to Photo-based Search</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>AI-powered Meal Planning</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>Premium recipe collections</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>Ad-free experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>Priority customer support</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
            
            <div className="space-y-4 mb-8">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedPayment === method.id
                      ? "border-amber-500 bg-amber-50"
                      : "border-gray-200 hover:border-amber-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {method.icon}
                      <span className="font-medium text-gray-900">{method.name}</span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      selectedPayment === method.id
                        ? "border-amber-500 bg-amber-500"
                        : "border-gray-300"
                    }`}>
                      {selectedPayment === method.id && (
                        <FiCheck className="w-3 h-3 text-white m-0.5" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Form */}
            {selectedPayment === "card" && (
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Order Summary</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Premium {selectedPlan} plan</span>
                <span className="font-semibold">${plans[selectedPlan].price}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>${plans[selectedPlan].price}</span>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
                isProcessing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 hover:shadow-lg"
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <FiLock size={18} />
                  Complete Payment - ${plans[selectedPlan].price}
                </div>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              🔒 Your payment information is secure and encrypted
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
