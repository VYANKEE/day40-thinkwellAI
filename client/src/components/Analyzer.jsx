import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Zap, AlertTriangle, Compass, Quote, ArrowRight, CheckCircle2 } from 'lucide-react';

const Analyzer = () => {
  const [thought, setThought] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!thought.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // PROD URL jab deploy karoge, abhi localhost
      const response = await axios.post('http://localhost:3000/analyze-thought', { thought });
      setResult(response.data);
    } catch (err) {
      setError('Server is busy thinking hard. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="analyzer" className="relative min-h-screen py-24 px-4 bg-slate-50 font-sans">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-200/40 rounded-full mix-blend-multiply blur-3xl animate-blob" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-200/40 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* INPUT SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 md:p-12 mb-16"
        >
          <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Deep Logic Analysis</h2>
          <p className="text-lg text-slate-500 mb-8">Input your strategy. We will simulate the outcome.</p>
          
          <textarea
            className="w-full h-40 p-6 text-xl text-slate-800 border-2 border-slate-100 rounded-2xl bg-slate-50 focus:bg-white focus:border-slate-900 focus:ring-0 transition-all resize-none placeholder:text-slate-300"
            placeholder="e.g. I want to put my life savings into Crypto to recover my losses quickly..."
            value={thought}
            onChange={(e) => setThought(e.target.value)}
          ></textarea>
          
          <div className="flex justify-end mt-6">
            <button
              onClick={handleAnalyze}
              disabled={loading || !thought}
              className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 hover:scale-105 transition-all shadow-lg shadow-slate-900/20 disabled:opacity-50 disabled:scale-100 flex items-center gap-3"
            >
              {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <>Run Simulation <ArrowRight className="w-5 h-5" /></>}
            </button>
          </div>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </motion.div>

        {/* RESULTS SECTION */}
        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-10"
            >
              
              {/* 1. Assumptions & Risks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Assumptions */}
                <div className="bg-amber-50/80 backdrop-blur-sm p-8 rounded-3xl border border-amber-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-amber-100 p-3 rounded-xl"><Zap className="w-6 h-6 text-amber-700" /></div>
                    <h3 className="text-2xl font-bold text-slate-800">Hidden Assumptions</h3>
                  </div>
                  <ul className="space-y-4">
                    {result.assumptions?.map((item, i) => (
                      <li key={i} className="flex gap-4 text-slate-700 text-lg leading-relaxed">
                        <span className="font-mono text-amber-400 mt-1">0{i+1}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Risks */}
                <div className="bg-rose-50/80 backdrop-blur-sm p-8 rounded-3xl border border-rose-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-rose-100 p-3 rounded-xl"><AlertTriangle className="w-6 h-6 text-rose-700" /></div>
                    <h3 className="text-2xl font-bold text-slate-800">Critical Risks</h3>
                  </div>
                  <ul className="space-y-4">
                    {result.risks?.map((item, i) => (
                      <li key={i} className="flex gap-4 text-slate-700 text-lg leading-relaxed">
                        <span className="font-mono text-rose-400 mt-1">0{i+1}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 2. STRATEGIC PLAN (The Big Dark Box) */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-900 text-white rounded-3xl shadow-2xl overflow-hidden"
              >
                <div className="bg-white/5 p-8 border-b border-white/10 flex items-center gap-4">
                  <Compass className="w-8 h-8 text-blue-400" />
                  <div>
                    <h3 className="text-2xl font-bold">Strategic Execution Plan</h3>
                    <p className="text-slate-400">Step-by-step roadmap to success</p>
                  </div>
                </div>
                
                <div className="p-8 md:p-10 space-y-6">
                  {/* DATA MAPPING FIX: Checking for action_plan specifically */}
                  {result.action_plan && result.action_plan.length > 0 ? (
                    result.action_plan.map((step, i) => (
                      <div key={i} className="flex gap-6 group">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                            {i + 1}
                          </div>
                          {i !== result.action_plan.length - 1 && <div className="w-0.5 h-full bg-slate-800 my-2" />}
                        </div>
                        <p className="text-lg text-slate-200 leading-relaxed py-1 pb-8 border-b border-slate-800/50 w-full group-hover:text-white transition-colors">
                          {step}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 italic">No specific plan generated. Try a more detailed input.</p>
                  )}
                </div>
              </motion.div>

              {/* 3. VERDICT */}
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 p-1 rounded-3xl shadow-xl"
              >
                <div className="bg-white rounded-[22px] p-10 text-center relative overflow-hidden">
                  <Quote className="absolute top-4 left-4 text-slate-100 w-24 h-24 -rotate-12" />
                  <div className="relative z-10">
                    <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-4">Final Verdict</p>
                    <h3 className="text-2xl md:text-3xl font-serif text-slate-900 italic leading-snug">
                      "{result.verdict}"
                    </h3>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Analyzer;