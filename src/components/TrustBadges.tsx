import React from 'react';
import { Award, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Award,
      title: 'GIA & IGI Certified',
      description: 'Dual gemological report & microscopic laser inscription with every diamond.',
    },
    {
      icon: Truck,
      title: 'Armored White-Glove Transit',
      description: 'Discreet armored delivery insured under Lloyd’s of London syndicate protocols.',
    },
    {
      icon: RefreshCw,
      title: '30-Day Heritage Guarantee',
      description: 'Complimentary ring resizing, prong audit, and lifetime ultrasonic cleaning.',
    },
    {
      icon: ShieldCheck,
      title: 'Atelier Escrow Protection',
      description: 'Encrypted tier-1 payments with certified provenance and bespoke serial marking.',
    },
  ];

  return (
    <section className="py-14 bg-[#0d0d10] border-y border-[#1e1e26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div key={idx} className="flex items-start gap-4 p-2">
                <div className="w-10 h-10 rounded-none bg-[#16161e] border border-[#262634] flex items-center justify-center shrink-0 text-[#c5a059]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                    {b.title}
                  </h4>
                  <p className="mt-1 text-xs text-[#9d9b94] font-light leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
