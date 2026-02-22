import React from 'react';
import { motion } from 'framer-motion';
import { SlotMachine } from './components/SlotMachine';

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-muted/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm"
      >
        <SlotMachine />
      </motion.div>
    </div>
  );
};

export default App;