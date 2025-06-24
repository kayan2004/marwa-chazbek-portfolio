import React from "react";

import {
  AddressIcon,
  LinkedInIcon,
  MailIcon,
  BehanceIcon,
  PhoneIcon,
  DownloadIcon,
} from "../icons/ContactIcons";

const Footer = ({ contacts }) => {
  return (
    <footer className="flex flex-col ">
      <div>
        <h2 className="text-primary text-3xl uppercase"> Contact</h2>
        <p className="text-secondary text-sm font-thin">Let's work together!</p>
        <div className="grid">
          <div></div>
          <ul className="flex flex-col gap-1.5 md:grid md:grid-cols-2">
            <li className="group">
              <div className="flex gap-4 items-center">
                <AddressIcon />
                <p className="text-secondary"> {contacts.address}</p>
              </div>
            </li>
            <li className="group">
              <div className="flex gap-4 items-center">
                <PhoneIcon />
                <p className="text-secondary">{contacts.phone}</p>
              </div>
            </li>
            <li className="group">
              <div className="flex gap-4 items-center">
                <a
                  href={`https://mail.google.com/mail/?view=cm&to=${contacts.gmail}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MailIcon />
                </a>
                <p className="text-secondary">marwachazbek@gmail.com</p>
              </div>
            </li>
            <li className="group">
              <div className="flex gap-4 items-center">
                <a
                  href="https://www.linkedin.com/in/marwa-chazbek-267404261?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                </a>
                <p className="text-secondary">marwa-chazbek</p>
              </div>
            </li>
            <li className="group">
              <div className="flex gap-4 items-center">
                <a
                  href="https://www.behance.net/marwachazbek_project"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BehanceIcon />
                </a>
                <p className="text-secondary">marwachazbek_project</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <a
        className="mt-10 flex gap-2 items-end-safe group cursor-pointer justify-end "
        href="/public/resume/Marwa chazbek cv.pdf"
        download="Marwa-chazbek-cv"
      >
        <DownloadIcon />
        <p className="font-extrabold">Download my resume</p>
      </a>
    </footer>
  );
};

export default Footer;
