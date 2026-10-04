'use client';

import { motion, useReducedMotion } from 'motion/react';
import { WhatsappLogo } from '@phosphor-icons/react';

interface WhatsAppButtonProps {
  phone: string;
  message?: string;
}

export function WhatsAppButton({
  phone,
  message = 'Hello, I would like to request a quote for industrial valves.',
}: WhatsAppButtonProps) {
  const reduce = useReducedMotion();
  const href = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[300] flex flex-col items-end gap-2">
      {/* Pulse ring */}
      {!reduce && (
        <span
          className="absolute inset-0 rounded-full bg-[#25D366]/30"
          style={{
            animation: 'pulse-ring 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
          aria-hidden="true"
        />
      )}
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 hover:bg-[#1da851] transition-colors duration-200"
        whileHover={reduce ? undefined : { scale: 1.1 }}
        whileTap={reduce ? undefined : { scale: 0.95 }}
      >
        <WhatsappLogo size={28} weight="fill" className="text-white" />
      </motion.a>
    </div>
  );
}
