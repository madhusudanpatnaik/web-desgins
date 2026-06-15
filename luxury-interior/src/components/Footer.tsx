import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <footer className="footer-section" id="contact" ref={ref}>
      <div className="footer-content">
        <motion.div 
          className="philosophy"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="philosophy-text">
            WE DO NOT BUILD HOUSES. <br />
            WE ENGINEER <span>LIFESTYLES</span> <br />
            FOR THE <span>UNCOMPROMISING</span>.
          </h2>
        </motion.div>

        <motion.div 
          className="contact-box"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <h3>Commission Your Masterpiece</h3>
          <p>Our portfolio is strictly by invitation and private inquiry.</p>
          
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert("Inquiry Received."); }}>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <button type="submit" className="submit-btn">Request Invitation</button>
          </form>
        </motion.div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 AURA Real Estate. All rights reserved.</p>
      </div>
    </footer>
  );
}
