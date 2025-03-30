import { Images } from "@/constants";
import { Clock, Mail, PhoneCall } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer
      className="overflow-hidden bg-cover bg-center pt-20"
      style={{ backgroundImage: `url(${Images.HeroBG})` }}
    >
      <div className="hs-container">
        {/* Footer Top  */}
        <div className="grid grid-cols-4 items-center gap-5 border-b border-dashed border-slate-300 pb-6">
          <div>
            <p className="text-secondary mb-2.5 text-2xl font-medium">
              Get in Touch with us
            </p>
            <p className="text-slate-500">We are just a call away</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-secondary grid aspect-square place-items-center rounded-full p-4 text-slate-50">
              <PhoneCall />
            </div>
            <div>
              <p className="text-secondary mb-1 text-lg font-medium">Call Us</p>
              <Link className="text-slate-500" to="tel:+123456789">
                +112 3456 789
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-secondary grid aspect-square place-items-center rounded-full p-4 text-slate-50">
              <Mail />
            </div>
            <div>
              <p className="text-secondary mb-1 text-lg font-medium">
                Send Us a Mail
              </p>
              <Link className="text-slate-500" to="mailto:info@gmail.com">
                info@gmail.com
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-secondary grid aspect-square place-items-center rounded-full p-4 text-slate-50">
              <Clock />
            </div>
            <div>
              <p className="text-secondary mb-1 text-lg font-medium">Support</p>
              <p className="text-slate-500">24x7 Health Care</p>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-4 gap-5 border-b border-dashed border-slate-300 py-12">
          {/* Logo */}
          <div>
            <img
              src={Images.Logo}
              width={150}
              height={150}
              alt="health sync logo"
              className="mx-auto mb-3"
            />
            <p className="text-justify text-sm leading-6 text-slate-500">
              Health Sync – Compassionate care, advanced healing. Your trusted
              healthcare partner. Emergency services available 24/7. Book
              appointments or contact us for inquiries.
            </p>
          </div>

          {/* Pages  */}
          <div className="ml-10">
            <h3 className="text-secondary mb-4 text-xl font-medium">
              Quick Links
            </h3>

            <ul className="leading-8 text-slate-500">
              <li>Home</li>
              <li>About Us</li>
              <li>Services</li>
              <li>Doctors</li>
              <li>Appointment</li>
            </ul>
          </div>

          <div className="ml-10">
            <h3 className="text-secondary mb-4 text-xl font-medium">
              Support & Legal
            </h3>

            <ul className="leading-8 text-slate-500">
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Patient Portal</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Appointment</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="ml-10">
            <h3 className="text-secondary mb-4 text-xl font-medium">Social</h3>

            <ul className="leading-8 text-slate-500">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Linkedin</li>
              <li>Youtube</li>
            </ul>
          </div>
        </div>

        {/* Copyright  */}
        <div className="py-4 text-center text-slate-500">
          © 2025 <span className="text-primary-hover">HealthSync</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
