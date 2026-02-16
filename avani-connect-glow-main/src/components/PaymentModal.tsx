import React, { useState, useEffect } from 'react';
import { X, CreditCard, Mail, Phone, User, CheckCircle } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, course, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseId: course?.id || '',
    courseName: course?.title || '',
    amount: course?.price || '₹19,999'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (course) {
      setFormData(prev => ({
        ...prev,
        courseId: course.id,
        courseName: course.title,
        amount: course.price
      }));
    }
  }, [course]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve();
      script.onerror = () => resolve();
      document.body.appendChild(script);
    });
  };

  const sendEmailNotification = async (paymentData) => {
    try {
      const emailData = {
        to: 'hello@avanienterprises.com',
        subject: `New Course Enrollment - ${course.title}`,
        html: `
          <h2>New Course Enrollment</h2>
          <p><strong>Student Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Course:</strong> ${course.title}</p>
          <p><strong>Amount:</strong> ${course.price}</p>
          <p><strong>Payment ID:</strong> ${paymentData.razorpay_payment_id}</p>
          <p><strong>Order ID:</strong> ${paymentData.razorpay_order_id}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        `
      };

      // In a real application, you would send this to your backend
      // For now, we'll simulate the email sending
      console.log('Email notification data:', emailData);
      
      // You can integrate with your backend API here
      // await fetch('/api/send-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(emailData)
      // });
      
    } catch (error) {
      console.error('Error sending email notification:', error);
    }
  };

  const handlePayment = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      // Load Razorpay script
      await loadRazorpayScript();

      // In a real application, you would get the order ID from your backend
      const orderId = `order_${Date.now()}`;
      
      const options = {
        key: 'rzp_test_YOUR_RAZORPAY_KEY', // Replace with your actual Razorpay key
        amount: parseInt(formData.amount.replace('₹', '').replace(',', '')) * 100, // Amount in paise
        currency: 'INR',
        name: 'Avani Enterprises',
        description: `Course Enrollment - ${course.title}`,
        order_id: orderId,
        handler: async function (response) {
          try {
            // Payment successful
            setPaymentSuccess(true);
            
            // Send email notification
            await sendEmailNotification(response);
            
            // Call success callback
            if (onSuccess) {
              onSuccess(response);
            }
            
            // Close modal after 3 seconds
            setTimeout(() => {
              onClose();
              setPaymentSuccess(false);
            }, 3000);
            
          } catch (error) {
            console.error('Error handling payment success:', error);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#3B82F6'
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Course Enrollment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {paymentSuccess ? (
          <div className="p-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-4">
              Thank you for enrolling in {course.title}. You will receive a confirmation email shortly.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-700">
                Our team will contact you within 24 hours to provide course access details.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6">
            {/* Course Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                <span className="text-lg text-gray-400 line-through">{course.originalPrice}</span>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Payment Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Course Fee</span>
                    <span className="text-gray-900">{course.originalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600">-{Math.round(((parseInt(course.originalPrice.replace('₹', '').replace(',', '')) - parseInt(course.price.replace('₹', '').replace(',', ''))) / parseInt(course.originalPrice.replace('₹', '').replace(',', ''))) * 100)}%</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total Amount</span>
                      <span className="font-bold text-blue-600">{course.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <button
                type="button"
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 w-5 h-5" />
                    Pay {course.price} & Enroll
                  </>
                )}
              </button>
            </form>

            {/* Security Notice */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                🔒 Your payment is secured by Razorpay. We never store your payment information.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal; 