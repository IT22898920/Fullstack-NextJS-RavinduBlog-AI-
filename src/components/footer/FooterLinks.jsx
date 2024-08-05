import Link from "next/link";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  FaApple,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
const FooterLinks = () => {
  return (
    <section className="bg-zinc-800 dark:bg-yellow-500 py-10">
      <div className="container mx-auto grid grid-cols-3 gap-8">
        <div className="space-y-2">
          <h4 className="text-lg font-bold text-white dark:text-gray-800">
            RavinduBlog
          </h4>
          <p className="text-white dark:text-gray-800">
            RavinduBlog is a blog platform where you can write and share your
            thoughts with like-minded people. We are dedicated to providing
            high-quality content and user experience.
          </p>
          <div className="contact">
            <FaFacebookF className="i" />
            <FaTwitter className="i" />
            <FaInstagram className="i" />
            <FaYoutube className="i" />
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-bold text-white dark:text-gray-800">
            Categories
          </h4>
          <ul className="flex flex-col space-y-2 text-sm">
            <li>
              <Link href="/" className="footer-links">
                HTML
              </Link>
            </li>
            <li>
              <Link href="/" className="footer-links">
                CSS
              </Link>
            </li>
            <li>
              <Link href="/" className="footer-links">
                JavaScript
              </Link>
            </li>
            <li>
              <Link href="/" className="footer-links">
                Web Development
              </Link>
            </li>
            <li>
              <Link href="/" className="footer-links">
                ReactJS
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-bold text-white dark:text-gray-800">
            Subscribe
          </h4>
          <p className="text-sm text-white dark:text-gray-800">
            Subscribe to our newsletter to get updates on our latest offers!
          </p>
          <form
            action="#"
            className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-4"
          >
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
            />
            <Button
              variant="default"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FooterLinks;
