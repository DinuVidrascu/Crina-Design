import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com'; // importăm pachetul EmailJS
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [messageSent, setMessageSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Trimite emailul prin EmailJS
    emailjs
      .send(
        'service_p0lw725',        // Service ID pe care l-ai obținut din dashboard-ul EmailJS
        'template_pta45p3',       // Template ID (template-ul pentru email)
        form,                // Datele formularului
        'P4PxYbE_uSYZAr7T-'            // User ID (l-ai obținut din contul tău EmailJS)
      )
      .then(
        (response) => {
          console.log('Succes!', response);
          setMessageSent(true); // Setează mesajul de succes
          setForm({ name: '', email: '', message: '' }); // Reset formularul
          setTimeout(() => {
            setMessageSent(false); // Ascunde mesajul de succes după 3 secunde
          }, 2000);
        },
        (error) => {
          console.log('Error', error);
        }
      );
  };

  return (
    <div className="bg-[#1F1C1B] text-white min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-16 px-4">
        <motion.div
          className="bg-[#2b2b2b] backdrop-blur-sm bg-opacity-50 rounded-3xl  max-w-lg w-full p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
          >
            Contact me
          </motion.h1>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-1">
                Name
              </label>
              <motion.input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
                placeholder="Your name"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-1">
                Email
              </label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
                placeholder="exemple@email.com"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-1">
              Message
              </label>
              <motion.textarea
                id="message"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 transition resize-none"
                placeholder="Write your message here..."
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              />
            </div>
            <motion.button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 font-semibold text-white hover:opacity-90 transition-all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Send Message
            </motion.button>
          </motion.form>

          {/* Message sent confirmation */}
          {messageSent && (
            <motion.div
              className="mt-4 text-center text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Message sent! Thank you!
            </motion.div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
