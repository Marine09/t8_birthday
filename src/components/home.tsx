import React from "react";
import BirthdayDashboard from "./birthday/BirthdayDashboard";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Helmet>
        <title>Birthday Celebration Dashboard</title>
        <meta
          name="description"
          content="Interactive birthday dashboard with countdown timer and birthday cards"
        />
      </Helmet>

      <main>
        <BirthdayDashboard />
      </main>
    </motion.div>
  );
};

export default Home;
