import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = ({ onStart }) => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-brand-50 to-white px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl z-10"
      >
        <span className="inline-block py-1 px-3 rounded-full bg-brand-100 text-brand-900 text-sm font-semibold mb-6">
          Thinkwell AI Beta
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
          Turn your thoughts into <br />
          <span className="text-brand-500">absolute clarity.</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Stop overthinking. Start analyzing. Thinkwell uses AI to help you identify assumptions, risks, and blind spots in your reasoning.
        </p>
        <button 
          onClick={onStart}
          className="bg-slate-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Analyze a Thought Now
        </button>
      </motion.div>

      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 text-slate-400"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;