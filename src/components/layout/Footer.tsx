import Link from 'next/link';
import { Factory, Envelope, Phone, MapPin } from '@phosphor-icons/react/dist/ssr';
import { BASE_TYPES, INDUSTRIES } from '@/data/valves';

const FOOTER_LINKS = {
  Products: BASE_TYPES.slice(0, 6).map(b => ({ label: b.name, href: `/products/${b.slug}` })),
  Industries: INDUSTRIES.slice(0, 5).map(i => ({ label: i.name, href: `/industries/${i.slug}` })),
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Factory Tour', href: '/factory' },
    { label: 'Certificates', href: '/certificates' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
  ],
  Resources: [
    { label: 'Product Catalog', href: '/resources/catalog' },
    { label: 'Technical Datasheets', href: '/resources/datasheets' },
    { label: 'CAD Drawings', href: '/resources/cad' },
    { label: 'Installation Guides', href: '/resources/manuals' },
    { label: 'Request Quote', href: '/rfq' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#030b16] border-t border-[rgba(14,165,233,0.1)]">
      <div className="container-grid py-16">
        {/* Top: Brand + Contact + Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-lg bg-[var(--accent)] opacity-20" />
                <Factory size={20} weight="bold" className="absolute inset-0 m-auto text-[var(--accent)]" />
              </div>
              <span className="font-semibold text-lg text-[var(--text-primary)]">
                Valve<span className="text-[var(--accent)]">Master</span>
              </span>
            </Link>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 max-w-[280px]">
              Industrial flow control engineering for oil & gas, chemical, water treatment, and power generation industries worldwide.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:sales@valvemaster.com"
                className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                <Envelope size={15} className="text-[var(--accent)] flex-shrink-0" />
                sales@valvemaster.com
              </a>
              <a
                href="tel:+8613800000000"
                className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                <Phone size={15} className="text-[var(--accent)] flex-shrink-0" />
                +86 138 0000 0000
              </a>
              <div className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                <MapPin size={15} className="text-[var(--accent)] flex-shrink-0 mt-0.5" />
                <span>Industrial Zone, Wenzhou, Zhejiang, China</span>
              </div>
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group} className="lg:col-span-1">
              <h3 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">
                {group}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications strip */}
        <div className="border-t border-[var(--border)] pt-8 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-[var(--text-muted)] mr-2">Certified:</span>
            {['ISO 9001:2015', 'API 6D', 'CE PED', 'ATEX', 'BV Marine', 'NACE MR0175'].map(cert => (
              <span key={cert} className="badge-industrial">
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} ValveMaster Industrial Co., Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
