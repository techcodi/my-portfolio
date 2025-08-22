import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";

import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const fullText = "Frontend Developer";
  const typingSpeed = 100;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const [selectedProject, setSelectedProject] = useState(0);
  const [copied, setCopied] = useState(false);
  const skillsChartRef = useRef();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Typing effect
  useEffect(() => {
    if (typingIndex < fullText.length) {
      const timer = setTimeout(() => {
        setTypedText((prevText) => prevText + fullText.charAt(typingIndex));
        setTypingIndex((prevText) => prevText + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    }
  }, [typingIndex]);

  // Initialize skills chart
  useEffect(() => {
    if (skillsChartRef.current) {
      const chart = echarts.init(skillsChartRef.current);
      const option = {
        animation: false,
        radar: {
          indicator: [
            { name: "React", max: 100 },
            { name: "JavaScript", max: 100 },
            { name: "CSS", max: 100 },
            { name: "Tailwind", max: 100 },
            { name: "HTML", max: 100 },
            { name: "Responsive Design", max: 100 },
            { name: "Performance", max: 99 },
            { name: "Accessibility", max: 100 },
          ],
          radius: 130,
          splitNumber: 4,
          axisName: {
            color: darkMode ? "#ffffff" : "#333333",
            fontSize: 14,
          },
          splitLine: {
            lineStyle: {
              color: darkMode
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(0, 0, 0, 0.1)",
            },
          },
          splitArea: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: darkMode
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(0, 0, 0, 0.1)",
            },
          },
        },
        series: [
          {
            name: "Skills",
            type: "radar",
            data: [
              {
                value: [95, 90, 85, 95, 80, 85, 85, 85],
                name: "Skills",
                areaStyle: {
                  color: darkMode
                    ? "rgba(64, 158, 255, 0.6)"
                    : "rgba(64, 158, 255, 0.4)",
                },
                lineStyle: {
                  color: "#409EFF",
                  width: 2,
                },
                itemStyle: {
                  color: "#409EFF",
                },
              },
            ],
          },
        ],
      };
      chart.setOption(option);
      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener("resize", handleResize);
      return () => {
        chart.dispose();
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [darkMode]);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  // Copy email to clipboard
  const copyEmail = () => {
    navigator.clipboard.writeText("joshualokossu@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Open case study
  const openCaseStudy = (index) => {
    setSelectedProject(index);
    setShowCaseStudy(true);
    document.body.style.overflow = "hidden";
  };

  // Close case study
  const closeCaseStudy = () => {
    setShowCaseStudy(false);
    document.body.style.overflow = "auto";
  };

  // Navigate between projects
  const navigateProject = (direction) => {
    if (selectedProject === null) return;
    const totalProjects = projects.length;
    let newIndex;
    if (direction === "prev") {
      newIndex = (selectedProject - 1 + totalProjects) % totalProjects;
    } else {
      newIndex = (selectedProject + 1) % totalProjects;
    }
    setSelectedProject(newIndex);
  };

  // Project data
  const projects = [
    {
      id: 0,
      title: "AI Resume Builder from GitHub Repo",
      description:
        "A web application that generates a professional resume from a GitHub repository, showcasing your skills and projects.",
      shortDescription: "Automated resume generation from GitHub",
      techStack: [
        "React.js",
        "CSS",
        "React Query",
        "Supabase",
        "React Hook Form",
        "React-Toastify",
        "React-icons",
        "React-Router",
        "OpenAI API",
      ],
      image: "ai dashboard.png",
      fullDescription:
        "This AI Resume Builder allows users to generate a professional resume by extracting information from their GitHub repositories. It features a user-friendly interface where users can input their GitHub username, and the application fetches relevant data such as repositories, contributions, and skills. The generated resume is customizable, allowing users to choose different templates and formats. The application also includes options for downloading the resume in various formats like PDF and DOCX.",
      process:
        "The development process involved integrating the GitHub API to fetch user data and repositories. The application uses React.js for the frontend, with CSS for styling. Key features include user authentication, data fetching from GitHub, and resume generation using OpenAI's API for content formatting. The project emphasizes user experience with a clean, responsive design and intuitive navigation. The application is built with a focus on performance and accessibility, ensuring it works seamlessly across devices.",
      preview: "https://kodorasaas.vercel.app/",
      duration: "3 weeks",
    },
    {
      id: 1,
      title: "Modern E-commerce Web Application",
      description:
        "A feature-rich e-commerce platform with seamless shopping experience and secure payment integration.",
      shortDescription: "Full-featured e-commerce solution",
      techStack: ["React.js", "Supabase", "Vanilla CSS"],
      duration: "2 weeks",
      image:
        "https://readdy.ai/api/search-image?query=Modern%20e-commerce%20website%20interface%20showcasing%20elegant%20product%20displays%20with%20minimalist%20design%2C%20shopping%20cart%20functionality%2C%20and%20seamless%20checkout%20process%2C%20professional%20product%20photography%20against%20clean%20white%20background%20with%20subtle%20shadows&width=600&height=400&seq=1&orientation=landscape",

      fullDescription:
        "This e-commerce platform provides a complete online shopping solution with features including product catalog management, shopping cart functionality, secure checkout process, and order tracking. The platform  includes features like user authentication, wishlist management, and order history. The responsive design ensures a seamless shopping experience across all devices.",
      process:
        "The development process focused on creating an intuitive user interface while ensuring robust functionality. Key features include advanced product filtering, real-time inventory management, and a streamlined checkout process. The project was built using React.js, with Vanilla CSS for styling and Supabse for backend. Special attention was paid to performance optimization and security implementation.",
      preview:
        "https://comepick-ecommerce-git-main-techcodis-projects.vercel.app/",
    },
    {
      id: 2,
      title: "AI Lesson Note Generator",
      description:
        "An innovative AI-powered application that generates comprehensive lesson notes from various educational inputs.",
      shortDescription: "Smart educational content generator",
      techStack: ["React.js"],
      duration: "1 month",
      image:
        "https://readdy.ai/api/search-image?query=Modern%20AI%20application%20interface%20showing%20text%20generation%20and%20note-taking%20features%2C%20clean%20layout%20with%20educational%20content%20display%2C%20minimalist%20design%20with%20blue%20accent%20colors%20on%20white%20background&width=600&height=400&seq=4&orientation=landscape",

      fullDescription:
        "The AI Lesson Note Generator transforms educational content into well-structured, comprehensive notes using advanced AI technology. It can process various inputs including text, images, and audio to generate organized lesson notes. The application includes features like custom formatting options, note organization, and easy sharing capabilities. It's designed to help educators and students create consistent, high-quality educational content efficiently.",
      process:
        "The development involved integrating OpenAI's API for content generation while creating an intuitive interface for input and output management. The application includes features for content editing, formatting customization, and export options. Significant effort was put into ensuring the AI-generated content maintains educational quality and relevance.",
      preview: "https://lesnoteai.netlify.app/",
    },
    {
      id: 3,
      title: "Pizza Ordering Platform",
      description:
        "A dynamic pizza ordering system with real-time customization and order tracking capabilities.",
      shortDescription: "Interactive food ordering platform",
      techStack: ["React"],
      duration: "1 week",
      image:
        "https://readdy.ai/api/search-image?query=Modern%20food%20ordering%20website%20interface%20showing%20pizza%20customization%20options%2C%20order%20builder%2C%20and%20menu%20display%2C%20appetizing%20food%20photography%20against%20clean%20white%20background%20with%20professional%20layout&width=600&height=400&seq=7&orientation=landscape",

      fullDescription:
        "This pizza ordering platform offers a seamless ordering experience with interactive pizza customization, real-time price calculation, and order tracking. Users can customize their pizzas with various toppings, sizes, and crust options, while seeing a real-time preview of their creation.",
      process:
        "The development focused on creating an engaging user experience with real-time updates and interactive elements. The platform was built using React , ensuring smooth order processing and tracking. Special attention was given to the pizza customization interface.",
      preview: "https://order-pizza-zeta.vercel.app/",
    },
    {
      id: 4,
      title: "AI Mood-Base Generator",
      description:
        "A web app that uses AI to detect your mood from a selfie and instantly generates Spotify playlists that match how you feel. No more endless searching for the right vibe; just upload your photo, and the perfect tunes start playing!",
      shortDescription:
        "Ai mood detector that provide you music according to your feeling",
      techStack: ["React"],
      duration: "1 week",
      image: "/preview-image.png",

      fullDescription:
        "Real-time emotion detection via Face++ API Spotify API integration to fetch mood-based playlists Smooth user experience with dynamic playlist display Dark/light mode for personalized UI Embedded Spotify player to listen within the app",
      process: "",
      preview: "https://ai-mood-base-playlist-generator.vercel.app/",
    },
  ];

  // Experience timeline data
  const experiences = [
    {
      title: "Frontend Developer Intern",
      company: "Sidmach",
      period: "March-2025 - Present",
      description:
        "Managed frontend development for an AI-powered lesson note generator using React.js. Implemented interactive UI, API integrations, and real-time previews that improved content creation speed by 40%",
    },
    {
      title: "Web Developer",
      company: "Creative Digital Agency",
      period: "",
      description:
        "Designed and developed responsive web applications for clients across various industries, focusing on user experience and performance.",
    },
    {
      title: "Frontend Developer",
      company: "StartUp Innovations",
      period: "",
      description:
        "Built interactive web applications using modern JavaScript frameworks, implemented responsive designs, and optimized web performance.",
    },
  ];

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Header */}
      <header
        className={`header ${isMenuOpen ? "menu-open" : ""} ${
          darkMode ? "dark-header" : "light-header"
        }`}
      >
        <div className="header-content">
          <a
            href="#home"
            className="logo"
            onClick={() => scrollToSection("home")}
          >
            Lokosu Joshua
          </a>
          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <a
              href="#home"
              className={`nav-link ${activeSection === "home" ? "active" : ""}`}
              onClick={() => scrollToSection("home")}
            >
              Home
            </a>
            <a
              href="#projects"
              className={`nav-link ${
                activeSection === "projects" ? "active" : ""
              }`}
              onClick={() => scrollToSection("projects")}
            >
              Projects
            </a>
            <a
              href="#about"
              className={`nav-link ${
                activeSection === "about" ? "active" : ""
              }`}
              onClick={() => scrollToSection("about")}
            >
              About
            </a>
            <a
              href="#contact"
              className={`nav-link ${
                activeSection === "contact" ? "active" : ""
              }`}
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </a>
            <button
              onClick={toggleDarkMode}
              className="theme-toggle"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
            </button>
          </nav>
          {/* Mobile Menu Button */}
          <div className="mobile-menu-buttons">
            <button
              onClick={toggleDarkMode}
              className="theme-toggle"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-toggle"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <a
              href="#home"
              className={`mobile-nav-link ${
                activeSection === "home" ? "active" : ""
              }`}
              onClick={() => scrollToSection("home")}
            >
              Home
            </a>
            <a
              href="#projects"
              className={`mobile-nav-link ${
                activeSection === "projects" ? "active" : ""
              }`}
              onClick={() => scrollToSection("projects")}
            >
              Projects
            </a>
            <a
              href="#about"
              className={`mobile-nav-link ${
                activeSection === "about" ? "active" : ""
              }`}
              onClick={() => scrollToSection("about")}
            >
              About
            </a>
            <a
              href="#contact"
              className={`mobile-nav-link ${
                activeSection === "contact" ? "active" : ""
              }`}
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </a>
          </div>
        )}
      </header>
      <main className="main-content">
        {/* Hero Section */}
        <section
          id="home"
          className="hero-section"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Minimalist%20abstract%20geometric%20pattern%20with%20subtle%20light%20blue%20and%20gray%20shapes%20on%20a%20clean%20white%20background%2C%20modern%20and%20professional%20design%20with%20balanced%20composition%2C%20soft%20shadows%20creating%20depth%2C%20perfect%20for%20website%20hero%20background&width=1920&height=1080&seq=10&orientation=landscape')`,
          }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Hello, I'm{" "}
                <span className="text-accent">Lokosu Joshua Onaolapo</span>
              </h1>
              <h2 className="hero-subtitle">
                {typedText}
                <span className="blink-cursor">|</span>
              </h2>
              <p className="hero-description">
                I create elegant, high-performance web experiences with a focus
                on responsive design and seamless user interactions.
                Specializing in modern frontend technologies.
              </p>
              <div className="hero-buttons">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="primary-button"
                >
                  View My Work
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className={`secondary-button ${darkMode ? "dark" : "light"}`}
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className={`projects-section ${darkMode ? "dark" : "light"}`}
        >
          <div className="section-container">
            <h2 className="section-title">My Projects</h2>
            <p className="section-subtitle">
              A selection of my recent work showcasing my skills in frontend
              development, and problem-solving.
            </p>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`project-card ${darkMode ? "dark" : "light"}`}
                  onClick={() => openCaseStudy(index)}
                >
                  <div className="project-image-container">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                    />
                  </div>
                  <div className="project-overlay">
                    <div className="project-overlay-content">
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description">
                        {project.shortDescription}
                      </p>

                      <div className="tech-stack">
                        {project.techStack.map((tech, i) => (
                          <>
                            <span key={i} className="tech-tag">
                              {tech}
                            </span>
                          </>
                        ))}
                      </div>
                      <a className="tech-tag" href={project.preview}>
                        Live site
                      </a>
                    </div>
                  </div>
                  <h5 style={{ padding: "1rem", fontSize: "1.5rem" }}>
                    {project.title}
                  </h5>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className={`about-section ${darkMode ? "dark" : "light"}`}
        >
          <div className="section-container">
            <div className="about-grid">
              <div className="about-content">
                <h2 className="section-title">About Me</h2>
                <p className="about-text">
                  I'm a passionate frontend developer with over 2 years of
                  experience creating modern web applications. My approach
                  combines clean code, thoughtful design, and performance
                  optimization to deliver exceptional user experiences.
                </p>
                <p className="about-text">
                  With a background in web development, I bridge the gap between
                  aesthetics and functionality. I'm constantly learning new
                  technologies and techniques to stay at the forefront of web
                  development.
                </p>
                <h3 className="subsection-title">Experience</h3>
                <div className="experience-timeline">
                  {experiences.map((exp, index) => (
                    <div
                      key={index}
                      className={`timeline-item ${
                        index !== experiences.length - 1 ? "has-line" : ""
                      } ${darkMode ? "dark" : "light"}`}
                    >
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <h4 className="timeline-title">{exp.title}</h4>
                        <p className="timeline-company">{exp.company}</p>
                        <p className="timeline-period">{exp.period}</p>
                        <p className="timeline-description">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href="Lokosu--Onaolapo--Joshua-FlowCV-Resume-20250404.pdf"
                  className="download-button"
                  style={{ padding: "10px", borderRadius: "5px" }}
                  download
                >
                  <i className="fas fa-download"></i>
                  Download Resume
                </a>
              </div>
              <div className="about-image-section">
                <div className="profile-image-container">
                  <img
                    src="/myprofile.jpeg"
                    alt="my-profile"
                    className="profile-image"
                  />
                </div>
                <h3 className="subsection-title">Skills</h3>
                <div ref={skillsChartRef} className="skills-chart"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className={`contact-section ${darkMode ? "dark" : "light"}`}
        >
          <div className="section-container">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Have a project in mind or want to discuss potential opportunities?
              I'd love to hear from you.
            </p>
            <div className="contact-grid">
              <div className={`contact-form ${darkMode ? "dark" : "light"}`}>
                <h3 className="form-title">Send Me a Message</h3>
                <form className="form-fields">
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      className={`form-input ${darkMode ? "dark" : "light"}`}
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="name"
                      className={`form-label ${darkMode ? "dark" : "light"}`}
                    >
                      Your Name
                    </label>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      className={`form-input ${darkMode ? "dark" : "light"}`}
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="email"
                      className={`form-label ${darkMode ? "dark" : "light"}`}
                    >
                      Your Email
                    </label>
                  </div>
                  <div className="form-group">
                    <textarea
                      id="message"
                      rows={5}
                      className={`form-input ${darkMode ? "dark" : "light"}`}
                      placeholder=" "
                      required
                    ></textarea>
                    <label
                      htmlFor="message"
                      className={`form-label ${darkMode ? "dark" : "light"}`}
                    >
                      Your Message
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="submit-button"
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
              <div className="contact-info-section">
                <div className={`contact-info ${darkMode ? "dark" : "light"}`}>
                  <h3 className="info-title">Contact Information</h3>
                  <div className="info-items">
                    <div className="info-item">
                      <div className="info-icon">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div className="info-content">
                        <h4 className="info-label">Email</h4>
                        <div className="info-value">
                          <p>joshualokossu@gmail.com</p>
                          <button
                            onClick={copyEmail}
                            className="copy-button"
                            aria-label="Copy email to clipboard"
                          >
                            <i
                              className={`fas ${
                                copied ? "fa-check" : "fa-copy"
                              }`}
                            ></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="info-item">
                      <div className="info-icon">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div className="info-content">
                        <h4 className="info-label">Location</h4>
                        <p className="info-value">Lagos ,Nigeria</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`social-links ${darkMode ? "dark" : "light"}`}>
                  <h3 className="social-title">Connect With Me</h3>
                  <div className="social-icons">
                    <a
                      href="https://github.com/techcodi?tab=repositories"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-icon ${darkMode ? "dark" : "light"}`}
                      aria-label="GitHub"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/joshua-onaolapo/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon linkedin"
                      aria-label="LinkedIn"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon twitter"
                      aria-label="Twitter"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      href="https://dribbble.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon dribbble"
                      aria-label="Dribbble"
                    >
                      <i className="fab fa-dribbble"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`footer ${darkMode ? "dark" : "light"}`}>
        <div className="footer-content">
          <div className="footer-copyright">
            <p>
              &copy; {new Date().getFullYear()} Lokosu Joshua. All rights
              reserved.
            </p>
          </div>
          <div className="footer-social">
            <a
              href="https://github.com/techcodi?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/joshua-onaolapo/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
        <button
          onClick={() => scrollToSection("home")}
          className="back-to-top"
          aria-label="Back to top"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      </footer>

      {/* Case Study Modal */}
      {showCaseStudy && selectedProject !== null && (
        <div className="case-study-modal">
          <div className="modal-overlay" onClick={closeCaseStudy}></div>
          <div className={`modal-container ${darkMode ? "dark" : "light"}`}>
            <div className="modal-image-container">
              <img
                src={projects[selectedProject].image}
                alt={projects[selectedProject].title}
                className="modal-image"
              />
              <div className="modal-image-overlay">
                <div className="modal-header">
                  <h2 className="modal-title">
                    {projects[selectedProject].title}
                  </h2>
                  <p className="modal-subtitle">
                    {projects[selectedProject].description}
                  </p>
                </div>
              </div>
              <button
                onClick={closeCaseStudy}
                className="modal-close-button"
                aria-label="Close case study"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-content">
              <div className="project-meta">
                <div className={`meta-item ${darkMode ? "dark" : "light"}`}>
                  <span className="meta-label">Duration:</span>
                  <span className="meta-value">
                    {projects[selectedProject].duration}
                  </span>
                </div>
                <div className={`meta-item ${darkMode ? "dark" : "light"}`}>
                  <span className="meta-label">Tech Stack:</span>
                  <span className="meta-value">
                    {projects[selectedProject].techStack.join(", ")}
                  </span>
                </div>
              </div>
              <h3 className="modal-section-title">Project Overview</h3>
              <p className="modal-text">
                {projects[selectedProject].fullDescription}
              </p>
              <h3 className="modal-section-title">Process & Approach</h3>
              <p className="modal-text">{projects[selectedProject].process}</p>
              <h3 className="modal-section-title">Project Gallery</h3>

              <div className="project-navigation">
                <button
                  onClick={() => navigateProject("prev")}
                  className={`nav-button ${darkMode ? "dark" : "light"}`}
                >
                  <i className="fas fa-arrow-left"></i>
                  Previous Project
                </button>
                <button
                  onClick={() => navigateProject("next")}
                  className={`nav-button ${darkMode ? "dark" : "light"}`}
                >
                  Next Project
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
