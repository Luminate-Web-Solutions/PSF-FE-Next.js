"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import './header.css'; // Import your external CSS

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [verticalsOpen, setVerticalsOpen] = useState(false);
  const [EventsOpen, setEventsOpen] = useState(false);

  const closeAllMenus = () => {
    setIsOpen(false);
    setAboutOpen(false);
    setVerticalsOpen(false);
    setEventsOpen(false);
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="header">
      <div className="header-container">
        <Link href="/" onClick={closeAllMenus}>
          <img src='/psf_logo.png' alt="PSFLOGO" className="logo" />
        </Link>

        {/* Hamburger for Mobile */}
        <div className="hamburger">
          <button onClick={() => setIsOpen(!isOpen)} className="menu-button">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="nav-links">
          <Link href="/" className="nav-link">Home</Link>

          {/* About Us Dropdown */}
          <div className="dropdown">
            <button className="dropdown-button flex gap-1">
              About Us <ChevronDown size={18} className="dropdown-icon" />
            </button>

            <div className="dropdown-content" onClick={handleLinkClick}>
              <Link href="/about" className="dropdown-item">Mission & Vision</Link>
              <Link href="/organizationalEthics" className="dropdown-item">Organizational Ethics</Link>
              <Link href="/coreTeam" className="dropdown-item">Our Team</Link>
              <Link href="/president" className="dropdown-item">Message from the President</Link>
            </div>
          </div>

          <Link href="/membership" className="nav-link">Membership</Link>

          <Link href="/newsletter" className="nav-link">News Letter</Link>

          {/* Verticals Dropdown */}
          <div className="dropdown">
            <button className="dropdown-button flex gap-1">
              Our Verticals <ChevronDown size={18} className="dropdown-icon" />
            </button>

            <div className="dropdown-content" onClick={handleLinkClick}>
              <Link href="/verticals" className="dropdown-item">All Verticals</Link>
              <Link href="/personalWellBeing" className="dropdown-item">Personal Wellbeing</Link>
              <Link href="/professionalDev" className="dropdown-item">Professional Development</Link>
              <Link href="/skillsAcademy" className="dropdown-item">Skills Academy</Link>
              <Link href="/jobCareer" className="dropdown-item">Job & Career Guidance</Link>
              <Link href="/socialServices" className="dropdown-item">Social Services</Link>
              <Link href="/cpdp" className="dropdown-item">Continuous Professional Development Program</Link>
            </div>
          </div>


          {/** events dropdown */}
          <div className="dropdown">
            <Link href="/events" className="dropdown-button flex items-center gap-1">
              Events <ChevronDown size={18} className="dropdown-icon" />
            </Link>


            <div className="dropdown-content" onClick={handleLinkClick}>
              <a href='https://professionalssummit.com/'
                target="_blank"
                rel="noopener noreferrer" className="dropdown-item">Professionals Summit</a>
              <Link href="/agm" className="dropdown-item">Annual General Meeting(AGM)</Link>
            </div>
          </div>

          <Link href="/jobs" className="nav-link">Jobs</Link>
          <a href="#" className="nav-link">Donate</a>

          <Link href="/contact" className="nav-link">Contact</Link>

          <Link href="/register" className="register-button">
            Register
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <Link href="/" onClick={closeAllMenus} className="mobile-link">Home</Link>

          {/* About Us Mobile Dropdown */}
          <div className="mobile-dropdown">
            <button onClick={() => setAboutOpen(!aboutOpen)} className="mobile-dropdown-button">
              About Us <ChevronDown size={18} className={`dropdown-icon ${aboutOpen ? 'rotate' : ''}`} />
            </button>
            <div className={`mobile-dropdown-content ${aboutOpen ? 'open' : ''}`} onClick={handleLinkClick}>
              <Link href="/about" className="mobile-dropdown-item">Mission & Vision</Link>
              <Link href="/organizationalEthics" className="mobile-dropdown-item">Organizational Ethics</Link>
              <Link href="/coreteam" className="mobile-dropdown-item">Our Team</Link>
              <Link href="/president" className="mobile-dropdown-item">Message from the President</Link>
              <Link href="/newsletter" className="mobile-dropdown-item">News Letter</Link>
            </div>
          </div>

          <Link to="/membership" onClick={closeAllMenus} className="mobile-link">Membership</Link>

          {/* Verticals Mobile Dropdown */}
          <div className="mobile-dropdown">
            <button onClick={() => setVerticalsOpen(!verticalsOpen)} className="mobile-dropdown-button">
              Our Verticals <ChevronDown size={18} className={`dropdown-icon ${verticalsOpen ? 'rotate' : ''}`} />
            </button>
            <div className={`mobile-dropdown-content ${verticalsOpen ? 'open' : ''}`} onClick={handleLinkClick}>
              <Link href="/verticals" className="mobile-dropdown-item">All Verticals</Link>
              <Link href="/personalWellBeing" className="mobile-dropdown-item">Personal Wellbeing</Link>
              <Link href="/professionalDev" className="mobile-dropdown-item">Professional Development</Link>
              <Link href="/skillsAcademy" className="mobile-dropdown-item">Skills Academy</Link>
              <Link href="/jobCareer" className="mobile-dropdown-item">Job & Career Guidance</Link>
              <Link href="/socialServices" className="mobile-dropdown-item">Social Services</Link>
              <Link href="/cpdp" className="mobile-dropdown-item">Continuous Professional Development Program</Link>

            </div>
          </div>

          <div className="mobile-dropdown">
            <Link href='/events' onClick={() => setEventsOpen(!EventsOpen)} className="mobile-dropdown-button">
              Events <ChevronDown size={18} className={`dropdown-icon ${EventsOpen ? 'rotate' : ''}`} />
            </Link>
            <div className={`mobile-dropdown-content ${EventsOpen ? 'open' : ''}`} onClick={handleLinkClick}>
              <Link href='https://professionalssummit.com/'
                target="_blank"
                rel="noopener noreferrer" className="mobile-dropdown-item">Professionals Summit</Link>
              <Link href="/agm" className="mobile-dropdown-item">Annual General Meeting(AGM)</Link>

            </div>
          </div>
          <Link href="/jobs" onClick={closeAllMenus} className="mobile-link">Jobs</Link>
          <a href="https://pages.razorpay.com/psfhyd" onClick={closeAllMenus} className="mobile-link">Donate</a>
          <Link href="/contact" onClick={closeAllMenus} className="mobile-link">Contact Us</Link>

          <Link href="/register" onClick={closeAllMenus} className="mobile-register-button">
            Membership
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
