import { motion } from 'framer-motion';

const socialBadges = [
  { id: 'github', label: 'GitHub', url: 'https://github.com/atharvasindwani23' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/atharva-sindwani-686b292a7/' },
  { id: 'twitter', label: 'X', url: 'https://x.com/atharwows' },
  { id: 'email', label: 'Email', url: 'mailto:atharva.sindwani@gmail.com' },
];

export default function TrainerCard() {
  return (
    <motion.div
      className="h-full flex flex-col justify-between rounded-md p-3"
      style={{
        background: 'linear-gradient(180deg, #0d1f3c 0%, #081428 100%)',
        border: '2px solid #1a3a1a',
        boxShadow: 'inset 0 0 20px rgba(74, 222, 128, 0.05)',
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {/* TOP — Identity */}
      <div className="text-center">
        <TrainerAvatar />
        <h2 className="font-pixel text-green-400 text-[8px] leading-tight mt-2">ATHARVA</h2>
        <h2 className="font-pixel text-green-400 text-[8px] leading-tight">SINDWANI</h2>
        <p className="font-pixel text-[5px] text-green-600 mt-1.5">CS + Advertising @ UIUC</p>
      </div>

      {/* Amazon logo + role — separate section */}
      <div className="text-center">
        <img
          src={`${import.meta.env.BASE_URL}assets/amazon-logo.webp`}
          alt="Amazon"
          className="pixel-render mx-auto block rounded-sm"
          style={{ width: '52px', height: '52px', objectFit: 'cover', position: 'relative', left: '32px' }}
        />
        <div className="mt-2 mx-auto px-2 py-1 rounded-sm inline-block" style={{ background: '#1a2d1a', border: '1px solid #2d5a2d' }}>
          <p className="font-pixel text-[5px] text-amber-400">AI Intern @ Amazon</p>
        </div>
      </div>

      {/* Current Quest + Core Type */}
      <div className="space-y-3">
        <MiniCard label="CURRENT QUEST" value="Leetcode Maxxing" />
        <MiniCard label="CORE TYPE" value="AI / Systems / Product" />
      </div>

      {/* Links — stacked 4x1 */}
      <div className="flex flex-col gap-3">
        {socialBadges.map((badge) => (
          <motion.a
            key={badge.id}
            href={badge.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto flex items-center gap-2 rounded-sm px-2 py-2"
            style={{ background: '#1a2d1a', border: '1px solid #2d5a2d' }}
            whileHover={{ scale: 1.02, borderColor: '#4ade80' }}
            title={badge.label}
          >
            <SocialIcon id={badge.id} />
            <span className="font-pixel text-[6px] text-green-400">{badge.label}</span>
          </motion.a>
        ))}
      </div>

      {/* Blogs & Photos — simple hyperlinks */}
      <div className="space-y-1 pointer-events-auto mt-3">
        <a href="#" className="block font-pixel text-[5px] text-green-500 hover:text-green-300 transition-colors">
          &gt; Blogs
        </a>
        <a href="#" className="block font-pixel text-[5px] text-green-500 hover:text-green-300 transition-colors">
          &gt; Photos
        </a>
      </div>
    </motion.div>
  );
}

function MiniCard({ label, value }) {
  return (
    <div className="rounded-sm p-2 text-center" style={{ background: '#0a1a2a', border: '1px solid #1a3a2a' }}>
      <p className="font-pixel text-[5px] text-green-700 mb-1">{label}</p>
      <p className="font-pixel text-[6px] text-green-300">{value}</p>
    </div>
  );
}

function TrainerAvatar() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" className="pixel-render mx-auto">
      <rect x="16" y="8" width="16" height="14" fill="#f0c8a0" />
      <rect x="14" y="6" width="20" height="6" fill="#2a2a2a" />
      <rect x="14" y="8" width="4" height="8" fill="#2a2a2a" />
      <rect x="30" y="8" width="4" height="8" fill="#2a2a2a" />
      <rect x="19" y="14" width="3" height="3" fill="#1a1a1a" />
      <rect x="26" y="14" width="3" height="3" fill="#1a1a1a" />
      <rect x="21" y="18" width="6" height="2" fill="#c88070" />
      <rect x="14" y="24" width="20" height="14" fill="#3050b0" />
      <rect x="20" y="24" width="8" height="3" fill="#ffffff" />
      <rect x="10" y="26" width="4" height="10" fill="#f0c8a0" />
      <rect x="34" y="26" width="4" height="10" fill="#f0c8a0" />
      <rect x="14" y="36" width="20" height="3" fill="#2a2a2a" />
      <rect x="16" y="39" width="6" height="5" fill="#2040a0" />
      <rect x="26" y="39" width="6" height="5" fill="#2040a0" />
      <rect x="15" y="43" width="7" height="3" fill="#e04040" />
      <rect x="26" y="43" width="7" height="3" fill="#e04040" />
    </svg>
  );
}

function SocialIcon({ id }) {
  const s = 16;
  switch (id) {
    case 'github':
      return (
        <svg width={s} height={s} viewBox="0 0 16 16" fill="#4ade80">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg width={s} height={s} viewBox="0 0 14 14" className="pixel-render">
          <rect x="2" y="2" width="10" height="10" fill="#0077b5" rx="1" />
          <rect x="4" y="4" width="2" height="2" fill="#fff" />
          <rect x="4" y="7" width="2" height="4" fill="#fff" />
          <rect x="7" y="7" width="2" height="4" fill="#fff" />
          <rect x="9" y="8" width="1" height="3" fill="#fff" />
        </svg>
      );
    case 'twitter':
      return (
        <svg width={s} height={s} viewBox="0 0 14 14" className="pixel-render">
          <rect x="2" y="2" width="10" height="10" fill="#1a1a1a" rx="1" />
          <rect x="4" y="4" width="2" height="2" fill="#fff" />
          <rect x="6" y="6" width="2" height="2" fill="#fff" />
          <rect x="8" y="4" width="2" height="2" fill="#fff" />
          <rect x="8" y="8" width="2" height="2" fill="#fff" />
          <rect x="4" y="8" width="2" height="2" fill="#fff" />
        </svg>
      );
    case 'email':
      return (
        <svg width={s} height={s} viewBox="0 0 14 14" className="pixel-render">
          <rect x="2" y="4" width="10" height="7" fill="#e04040" rx="1" />
          <rect x="3" y="5" width="8" height="5" fill="#ffd0d0" />
          <rect x="3" y="5" width="2" height="2" fill="#e04040" />
          <rect x="5" y="7" width="2" height="2" fill="#e04040" />
          <rect x="7" y="7" width="2" height="2" fill="#e04040" />
          <rect x="9" y="5" width="2" height="2" fill="#e04040" />
        </svg>
      );
    default:
      return null;
  }
}
