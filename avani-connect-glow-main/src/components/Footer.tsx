import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/logo0.jpg"
                alt="Avani Enterprises"
                className="h-[70px] w-[70px] rounded-md"
              />
              <span className="ml-2 text-xl font-bold text-white">Avani Enterprises</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed text-sm">
              We transform brands through strategic digital marketing, innovative technology solutions,
              and data-driven growth strategies that deliver measurable ROI.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/avani-enterprises-india/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/avanienterprises.branding/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com/avanienterprises" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.facebook.com/share/1DKFWQiBe4/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-2 gap-8 md:col-span-1 lg:col-span-2">
            {/* Services */}
            <div>
              <h3 className="text-base font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                    Digital Marketing
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                    SEO & Content
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                    Social Media
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                    AI Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/services/business-consultation" className="text-gray-300 hover:text-white transition-colors">
                    Business Consultation
                  </Link>
                </li>
                <li>
                  <Link to="/services/business-loans" className="text-gray-300 hover:text-white transition-colors">
                    Business Loans
                  </Link>
                </li>
                <li>
                  <Link to="/services/business-insurance" className="text-gray-300 hover:text-white transition-colors">
                    Business Insurance
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                    Financial Consulting
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-base font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-300 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/courses" className="text-gray-300 hover:text-white transition-colors">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link to="/case-studies" className="text-gray-300 hover:text-white transition-colors">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-and-conditions" className="text-gray-300 hover:text-white transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <a
                href="https://maps.app.goo.gl/h4wX8BCPpE3BCsg56?g_st=ipc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-3 group"
              >
                <MapPin size={20} className="text-blue-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    Tower B, 3rd Floor, Unitech Cyber Park, Sector 39, Gurugram, Haryana 122002
                  </p>
                </div>
              </a>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-blue-400 flex-shrink-0" />
                <a href="tel:+919253625099" className="text-gray-300 hover:text-white transition-colors">
                  +91 9253625099
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-blue-400 flex-shrink-0" />
                <a href="mailto:kp@avanienterprises.in" className="text-gray-300 hover:text-white transition-colors">
                  kp@avanienterprises.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-20 md:mb-0">
            <div className="flex space-x-6">
              <span className="text-gray-400 text-sm">
                Terms of Service
              </span>
              <span className="text-gray-400 text-sm">
                Cookie Policy
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              © {currentYear} Avani Enterprises. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

