import React, { useState } from "react";

const ContactUs = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" }); // Reset form after submission
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 pt-[80px]">
      {/* Container for the content */}
      <div className="container mx-auto px-6 lg:px-20">
        
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Contact Us
        </h1>
        
        {/* Introductory Text */}
        <p className="text-lg text-gray-600 text-center mb-10">
          We'd love to hear from you! Whether you have a question, feedback, or just want to say hi, drop us a message below.
        </p>

        {/* Contact Form */}
        <form
          className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          {/* Name Input */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Message Textarea */}
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
