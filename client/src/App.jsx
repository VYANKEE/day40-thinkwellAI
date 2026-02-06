import Hero from './components/Hero';
import Analyzer from './components/Analyzer';
import { motion } from 'framer-motion';

function App() {
  const scrollToAnalyzer = () => {
    const element = document.getElementById('analyzer');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50">
      {/* 1. Hero Section */}
      <Hero onStart={scrollToAnalyzer} />

      {/* 2. Main Tool Section */}
      <Analyzer />

      {/* 3. Community Insights Section (User Verified Style) */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-900"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-brand-400 font-semibold tracking-wider uppercase text-sm">Verified Analysis</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Real Thoughts. Real Clarity.</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">See how Thinkwell deconstructs complex life decisions into actionable logic.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Example 1 - Career */}
            <VerifiedCard 
              user="Alex M."
              role="Software Engineer"
              thought="I want to quit my job immediately to build an AI startup."
              verdict="High Risk: Emotional Decision"
              analysis="The AI identified that Alex had 0 months of savings and no validated idea. It advised a 'Hybrid Approach'—building on weekends first."
              tags={['Career', 'Startup']}
            />

            {/* Example 2 - Relationship/Life */}
            <VerifiedCard 
              user="Sarah K."
              role="Final Year Student"
              thought="I feel like everyone is ahead of me and I'm failing."
              verdict="Cognitive Distortion: Comparison"
              analysis="Thinkwell pointed out the 'Social Media Bias'. It restructured her thought to focus on her own 3-month progress metrics instead of others' highlights."
              tags={['Mental Health', 'Growth']}
            />

            {/* Example 3 - Finance */}
            <VerifiedCard 
              user="Rahul V."
              role="Freelancer"
              thought="I want to invest all my savings in Crypto to recover losses."
              verdict="Critical Alert: Gambler's Fallacy"
              analysis="The system flagged 'Revenge Trading' psychology. It suggested a rigid 80/20 risk management plan instead of an all-in bet."
              tags={['Finance', 'Psychology']}
            />
          </div>
        </div>
      </section>

      {/* 4. Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
        <p className="mb-4 text-white font-semibold text-xl">Thinkwell AI</p>
        <p className="text-sm">Turn thoughts into clarity.</p>
        <p className="text-xs mt-8 opacity-50">© 2026 Thinkwell. Built for the 45-Day Challenge.</p>
      </footer>
    </div>
  );
}

// Sub-component for Verified Examples
const VerifiedCard = ({ user, role, thought, verdict, analysis, tags }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl hover:bg-slate-800 transition-colors"
  >
    <div className="flex gap-2 mb-6">
      {tags.map(tag => (
        <span key={tag} className="text-xs font-bold px-3 py-1 rounded-full bg-slate-700 text-slate-300 border border-slate-600">
          {tag}
        </span>
      ))}
    </div>
    
    <div className="mb-6">
      <p className="text-slate-500 text-sm mb-2">User Thought:</p>
      <p className="font-serif text-xl italic text-slate-300">"{thought}"</p>
    </div>

    <div className="p-4 bg-brand-900/20 border border-brand-500/30 rounded-xl mb-6">
      <p className="text-brand-400 text-xs font-bold uppercase mb-1">AI Verdict</p>
      <p className="text-brand-100 font-semibold">{verdict}</p>
    </div>

    <p className="text-slate-400 text-sm leading-relaxed mb-6">
      {analysis}
    </p>

    <div className="flex items-center gap-3 border-t border-slate-700 pt-6">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
      <div>
        <p className="text-white font-medium text-sm">{user}</p>
        <p className="text-slate-500 text-xs">{role}</p>
      </div>
    </div>
  </motion.div>
);

export default App;