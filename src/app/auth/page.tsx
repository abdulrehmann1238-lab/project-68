'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, ArrowRight, ArrowLeft, Mail, Lock, 
  User, Check, Plus, Globe, Building
} from 'lucide-react';
import Link from 'next/link';

type AuthState = 'login' | 'register' | 'forgot' | 'otp' | 'workspaces';

export default function AuthPage() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>('login');
  
  // Form fields
  const [email, setEmail] = useState('director@greenwoodchapel.com');
  const [name, setName] = useState('John Davis');
  const [password, setPassword] = useState('solace2026');
  const [otp, setOtp] = useState(['4', '8', '2', '1']);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and take them to workspace selection
    setState('workspaces');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setState('otp');
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setState('otp');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState('workspaces');
  };

  const handleOtpChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Focus next sibling input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSelectWorkspace = (url: string) => {
    router.push(`/dashboard?url=${url}&tab=overview`);
  };

  return (
    <div className="min-h-screen bg-stone-bg flex flex-col lg:grid lg:grid-cols-12 relative overflow-hidden bg-grid-pattern">
      
      {/* Left Column: Brand Editorial Panel (Desktop only) */}
      <div className="hidden lg:flex lg:col-span-5 bg-forest text-[#FAF9F6] p-12 flex-col justify-between relative overflow-hidden">
        {/* Abstract luxury backdrop elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 rounded-full bg-sage/20 filter blur-3xl" />
        
        {/* Brand logo */}
        <div className="flex items-center space-x-2 z-10">
          <div className="w-5 h-5 rounded-full border border-[#FAF9F6] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FAF9F6]" />
          </div>
          <span className="font-sans text-xs tracking-[0.2em] uppercase font-bold">
            Solace
          </span>
        </div>

        {/* Brand Statement / Quote */}
        <div className="space-y-6 max-w-sm z-10 my-auto">
          <h2 className="font-serif text-3xl font-light leading-snug">
            Dignity in details, quiet solace in navigation.
          </h2>
          <p className="text-xs text-sage leading-relaxed font-sans font-light">
            Solace helps deathcare providers analyze digital interfaces, optimize trust scoring, and design serene experiences for grieving families.
          </p>
        </div>

        {/* Footer info */}
        <div className="flex justify-between items-center text-[10px] text-sage font-mono z-10">
          <span>PLATFORM VER: 1.12.0</span>
          <span>SECURE SYSTEM</span>
        </div>
      </div>

      {/* Right Column: Form Container (Responsive) */}
      <div className="flex-1 lg:col-span-7 flex flex-col justify-center px-6 py-12 md:px-16 lg:px-24">
        
        <div className="max-w-md mx-auto w-full bg-white border border-stone-border rounded-2xl p-8 shadow-[0_8px_32px_rgba(230,228,223,0.3)] relative">
          
          <AnimatePresence mode="wait">
            {/* LOGIN STATE */}
            {state === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="font-serif text-2xl text-forest font-medium">Welcome Back</h1>
                  <p className="text-xs text-sage mt-1">Enter your credentials to access your active website audits.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-sans tracking-widest text-sage font-semibold">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="e.g. director@chapel.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs p-3 pl-10 bg-[#FAF9F6] border border-stone-border rounded hover:border-gold focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-colors text-forest"
                      />
                      <Mail className="w-4 h-4 text-sage absolute left-3 top-3.5" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline">
                      <label className="text-[10px] uppercase font-sans tracking-widest text-sage font-semibold">Password</label>
                      <button 
                        type="button" 
                        onClick={() => setState('forgot')}
                        className="text-[10px] text-forest hover:text-gold transition-colors font-medium"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full text-xs p-3 pl-10 bg-[#FAF9F6] border border-stone-border rounded hover:border-gold focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-colors text-forest"
                      />
                      <Lock className="w-4 h-4 text-sage absolute left-3 top-3.5" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full p-3.5 bg-forest text-[#FAF9F6] rounded text-xs font-semibold hover:bg-gold hover:text-forest transition-colors flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Sign In to Console</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>

                <div className="border-t border-stone-border pt-4 text-center">
                  <p className="text-xs text-sage">
                    New to Solace?{' '}
                    <button 
                      onClick={() => setState('register')}
                      className="text-forest hover:text-gold transition-colors font-semibold"
                    >
                      Create demo account
                    </button>
                  </p>
                </div>
              </motion.div>
            )}

            {/* REGISTER STATE */}
            {state === 'register' && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <button 
                    onClick={() => setState('login')}
                    className="text-xs text-sage hover:text-forest flex items-center mb-3 group"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1 transform group-hover:-translate-x-0.5 transition-transform" />
                    Back to Sign In
                  </button>
                  <h1 className="font-serif text-2xl text-forest font-medium">Create Sandbox Account</h1>
                  <p className="text-xs text-sage mt-1">Get started with a 14-day fully-featured trial platform.</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-sans tracking-widest text-sage font-semibold">Your Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Davis"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-xs p-3 pl-10 bg-[#FAF9F6] border border-stone-border rounded hover:border-gold focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-colors text-forest"
                      />
                      <User className="w-4 h-4 text-sage absolute left-3 top-3.5" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-sans tracking-widest text-sage font-semibold">Business Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="e.g. director@chapel.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs p-3 pl-10 bg-[#FAF9F6] border border-stone-border rounded hover:border-gold focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-colors text-forest"
                      />
                      <Mail className="w-4 h-4 text-sage absolute left-3 top-3.5" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-sans tracking-widest text-sage font-semibold">Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        placeholder="Minimum 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full text-xs p-3 pl-10 bg-[#FAF9F6] border border-stone-border rounded hover:border-gold focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-colors text-forest"
                      />
                      <Lock className="w-4 h-4 text-sage absolute left-3 top-3.5" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full p-3.5 bg-forest text-[#FAF9F6] rounded text-xs font-semibold hover:bg-gold hover:text-forest transition-colors flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>
              </motion.div>
            )}

            {/* FORGOT PASSWORD STATE */}
            {state === 'forgot' && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <button 
                    onClick={() => setState('login')}
                    className="text-xs text-sage hover:text-forest flex items-center mb-3 group"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1 transform group-hover:-translate-x-0.5 transition-transform" />
                    Back to Sign In
                  </button>
                  <h1 className="font-serif text-2xl text-forest font-medium">Reset Password</h1>
                  <p className="text-xs text-sage mt-1">We will send a 4-digit security code to your email.</p>
                </div>

                <form onSubmit={handleForgot} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-sans tracking-widest text-sage font-semibold">Account Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="e.g. director@chapel.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs p-3 pl-10 bg-[#FAF9F6] border border-stone-border rounded hover:border-gold focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-colors text-forest"
                      />
                      <Mail className="w-4 h-4 text-sage absolute left-3 top-3.5" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full p-3.5 bg-forest text-[#FAF9F6] rounded text-xs font-semibold hover:bg-gold hover:text-forest transition-colors flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Request Reset Code</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>
              </motion.div>
            )}

            {/* OTP VERIFICATION STATE */}
            {state === 'otp' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="font-serif text-2xl text-forest font-medium">Verify Identity</h1>
                  <p className="text-xs text-sage mt-1">We have sent a security code. Type the 4-digit code to log in.</p>
                  <p className="text-[10px] text-gold font-mono mt-1">Simulated Code: 4 8 2 1</p>
                </div>

                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <div className="flex justify-between space-x-3">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        required
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, idx)}
                        className="w-16 h-16 text-center text-xl font-mono border border-stone-border bg-[#FAF9F6] text-forest rounded-lg hover:border-gold focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-colors"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full p-3.5 bg-forest text-[#FAF9F6] rounded text-xs font-semibold hover:bg-gold hover:text-forest transition-colors flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Confirm Security Code</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>

                <div className="text-center">
                  <button 
                    type="button"
                    onClick={() => { setOtp(['4','8','2','1']); }}
                    className="text-xs text-sage hover:text-forest font-medium underline"
                  >
                    Resend Code
                  </button>
                </div>
              </motion.div>
            )}

            {/* WORKSPACE SELECTION STATE */}
            {state === 'workspaces' && (
              <motion.div
                key="workspaces"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="font-serif text-2xl text-forest font-medium">Select Workspace</h1>
                  <p className="text-xs text-sage mt-1">Choose an active audit environment or configure a new platform.</p>
                </div>

                <div className="space-y-3.5">
                  <button
                    onClick={() => handleSelectWorkspace('www.greenwoodchapel.com')}
                    className="w-full p-4 border border-stone-border rounded-xl text-left bg-[#FAF9F6] hover:border-forest hover:bg-white transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="w-9 h-9 rounded-lg bg-forest/10 flex items-center justify-center text-forest border border-forest/15">
                        <Building className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <p className="text-xs font-serif font-bold text-forest leading-none">Greenwood Chapel</p>
                        <p className="text-[10px] text-sage font-mono mt-1">www.greenwoodchapel.com</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-sage group-hover:text-forest group-hover:translate-x-0.5 transition-all" />
                  </button>

                  <button
                    onClick={() => handleSelectWorkspace('www.solacerest.com')}
                    className="w-full p-4 border border-stone-border rounded-xl text-left bg-[#FAF9F6] hover:border-forest hover:bg-white transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="w-9 h-9 rounded-lg bg-forest/10 flex items-center justify-center text-forest border border-forest/15">
                        <Building className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <p className="text-xs font-serif font-bold text-forest leading-none">Solace Rest Gardens</p>
                        <p className="text-[10px] text-sage font-mono mt-1">www.solacerest.com</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-sage group-hover:text-forest group-hover:translate-x-0.5 transition-all" />
                  </button>

                  <div className="border-t border-stone-border pt-3 mt-4">
                    <Link
                      href="/onboarding"
                      className="w-full p-3.5 border border-dashed border-stone-border rounded-xl text-center text-xs text-sage hover:text-forest hover:bg-stone-bg/40 transition-colors flex items-center justify-center gap-2 cursor-pointer font-semibold"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Audit Another Business Website</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
