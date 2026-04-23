import { useNavigate } from "react-router-dom";
import {
  CreditCardIcon,
  SparklesIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: CreditCardIcon,
      title: "Financial Tracking",
      description:
        "Easily track your income and expenses in real-time with detailed categorization and insights",
    },
    {
      icon: SparklesIcon,
      title: "AI Insights",
      description:
        "Get intelligent financial recommendations powered by AI to optimize your spending habits",
    },
    {
      icon: MapPinIcon,
      title: "Location Awareness",
      description:
        "Tag your transactions with location data for better geographical spending analysis",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div
              className="absolute top-40 right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          {/* Badge */}
          <div className="mb-8 inline-block">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              ✨ Manage Your Finances Smartly
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-5xl sm:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            Smart Financial Tracking with AI Insight
          </h1>

          {/* Subtext */}
          <p className="mb-12 text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Take control of your finances with intelligent tracking, AI-powered
            insights, and personalized recommendations. All in one beautiful,
            easy-to-use platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              Get Started - Register
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
            >
              Sign In
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Secure & Private
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Real-time Data
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              AI-Powered
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 bg-white bg-opacity-40 backdrop-blur">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage your finances efficiently
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-purple-200"
                >
                  {/* Icon */}
                  <div className="mb-6 inline-flex p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover effect divider */}
                  <div className="mt-6 h-1 w-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to take control of your finances?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of users who are already managing their money smarter
            with AI-powered insights.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            Start Your Free Account Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 sm:px-6 lg:px-8 border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                SmartFinance
              </h3>
              <p className="text-gray-600">
                AI-powered personal finance management for everyone.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate("/register")}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Register
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/login")}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-blue-600 transition-colors">
                    Features
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <button className="text-gray-600 hover:text-blue-600 transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-blue-600 transition-colors">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-blue-600 transition-colors">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm">
                &copy; 2026 SmartFinance. All rights reserved.
              </p>
              <p className="text-gray-600 text-sm mt-4 md:mt-0">
                Made with ❤️ for better financial management
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
