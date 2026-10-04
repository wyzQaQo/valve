'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PaperPlaneRight, WhatsappLogo, Warning } from '@phosphor-icons/react';

export function RFQSection() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call - replace with actual email service
    await new Promise(res => setTimeout(res, 1200));
    setStatus('success');
  };

  return (
    <section className="py-24 bg-[var(--bg-surface)]" id="rfq">
      <div className="container-grid">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Copy */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-5 leading-[1.1]">
              Request a{' '}
              <span className="text-gradient-accent">Technical Quote</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
              Share your specifications and our engineers will respond within 4 business hours with a detailed technical proposal.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {[
                { title: '4hr Response', desc: 'Technical review and initial pricing within 4 business hours' },
                { title: 'Full Documentation', desc: 'Datasheet, DWG files, and material cert included' },
                { title: 'MOQ Flexibility', desc: 'From single prototype valve to bulk OEM orders' },
              ].map(item => (
                <div key={item.title} className="flex gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-raised)]">
                  <div className="w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)] self-stretch" />
                  <div>
                    <p className="font-semibold text-[var(--text-primary)] text-sm mb-0.5">{item.title}</p>
                    <p className="text-[var(--text-secondary)] text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/8613800000000?text=Hello%2C%20I%20would%20like%20to%20request%20a%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 w-fit px-5 py-3 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#1da851] transition-colors"
            >
              <WhatsappLogo size={20} weight="fill" />
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 rounded-2xl border border-[var(--accent)] bg-[rgba(14,165,233,0.05)] text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center">
                  <PaperPlaneRight size={28} weight="bold" className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Quote Request Sent!</h3>
                <p className="text-[var(--text-secondary)] text-sm max-w-[280px]">
                  Our engineering team will review your requirements and respond within 4 business hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)]"
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'name', label: 'Full Name', placeholder: 'John Smith', type: 'text' },
                    { name: 'company', label: 'Company', placeholder: 'Acme Industries Ltd', type: 'text' },
                  ].map(field => (
                    <div key={field.name} className="flex flex-col gap-1.5">
                      <label htmlFor={field.name} className="text-xs font-medium text-[var(--text-secondary)]">
                        {field.label} <span className="text-[var(--danger)]">*</span>
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.name as keyof typeof form]}
                        onChange={handleChange}
                        required
                        className="px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'email', label: 'Email Address', placeholder: 'john@company.com', type: 'email' },
                    { name: 'phone', label: 'Phone / WhatsApp', placeholder: '+1 555 000 0000', type: 'tel' },
                  ].map(field => (
                    <div key={field.name} className="flex flex-col gap-1.5">
                      <label htmlFor={field.name} className="text-xs font-medium text-[var(--text-secondary)]">
                        {field.label} <span className="text-[var(--danger)]">*</span>
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.name as keyof typeof form]}
                        onChange={handleChange}
                        required
                        className="px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="country" className="text-xs font-medium text-[var(--text-secondary)]">
                    Country <span className="text-[var(--danger)]">*</span>
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    placeholder="United States"
                    value={form.country}
                    onChange={handleChange}
                    required
                    className="px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-medium text-[var(--text-secondary)]">
                    Valve Specification / Requirements <span className="text-[var(--danger)]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="e.g. 50x Ball Valve, Pneumatic, 316L SS, Flanged PN16, 2 inch, for chemical service..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-sm text-[var(--danger)] bg-red-950/30 p-3 rounded-lg border border-red-800/30">
                    <Warning size={16} />
                    Failed to send. Please try again or contact us via WhatsApp.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--accent)] text-white font-semibold rounded-xl hover:bg-[#0284c7] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <PaperPlaneRight size={18} weight="bold" />
                      Send Quote Request
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
