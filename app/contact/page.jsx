"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Globe, Home, MessageSquare } from "lucide-react";

// ==============================
// Helpers
// ==============================
const sendWhatsAppMessage = ({ name, email, message }) => {
  const phone = "919346347775"; // your WhatsApp number
  const text = encodeURIComponent(
    `Hello Chandu 👋\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );
  window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
};

// ==============================
// Animations
// ==============================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

// ==============================
// Contact Items
// ==============================
const contactItems = [
  {
    href: "mailto:chanduchanduchalla7@gmail.com",
    display: "chanduchanduchalla7@gmail.com",
    description: "Reach out via email for inquiries or collaborations.",
    icon: <Mail className="w-5 h-5 text-cyan-400" />,
  },
  {
    href: "https://wa.me/919346347775",
    display: "+91 9346347775",
    description: "Chat with me directly on WhatsApp.",
    icon: <Phone className="w-5 h-5 text-cyan-400" />,
  },
  {
    href: "https://www.google.com/maps/search/?api=1&query=Menakuru%2C+Andhra+Pradesh%2C+India",
    display: "Menakuru, Andhra Pradesh, India",
    description: "Currently based in Andhra Pradesh, India.",
    icon: <MapPin className="w-5 h-5 text-cyan-400" />,
  },
  {
    href: "/",
    display: "Portfolio Home",
    description: "Explore my work and projects.",
    icon: <Globe className="w-5 h-5 text-cyan-400" />,
  },
];

// ==============================
// Component
// ==============================
export default function ContactPage() {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [failure, setFailure] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess("");
    setFailure("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSuccess("");
    setFailure("");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      sendWhatsAppMessage(formData);

      setFormData({ name: "", email: "", message: "" });
      setSuccess("Message sent successfully! I’ll get back to you soon 🚀");
    } catch (err) {
      setFailure("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-5 py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs text-gray-400 flex items-center gap-2">
          <a href="/" className="flex items-center gap-1 hover:text-cyan-400">
            <Home className="w-3 h-3" /> Home
          </a>
          <span>/</span>
          <span className="text-cyan-400">Contact</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs mb-3">
            <MessageSquare className="w-3 h-3" /> Contact
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-gray-400 mt-2">
            Open to opportunities, collaborations, and discussions.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6"
          >
            <motion.h3 variants={itemVariants} className="text-lg font-semibold text-cyan-400 mb-4">
              Send a Message
            </motion.h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {['name', 'email'].map((field) => (
                <motion.div key={field} variants={itemVariants}>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    placeholder={field === 'name' ? 'Your Name' : 'Your Email'}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-900/60 border ${errors[field] ? 'border-red-500' : 'border-slate-700'} focus:border-cyan-500 outline-none`}
                  />
                  {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field]}</p>}
                </motion.div>
              ))}

              <motion.div variants={itemVariants}>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-900/60 border ${errors.message ? 'border-red-500' : 'border-slate-700'} focus:border-cyan-500 outline-none`}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </motion.div>

              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 font-medium hover:scale-105 transition disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>

              {success && <p className="text-green-400 text-center">{success}</p>}
              {failure && <p className="text-red-400 text-center">{failure}</p>}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {contactItems.map((item, i) => (
              <motion.a
                key={i}
                variants={itemVariants}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 hover:border-cyan-500/30 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">{item.icon}</div>
                  <div>
                    <h4 className="text-sm font-semibold">{item.display}</h4>
                    <p className="text-xs text-gray-400">{item.description}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
