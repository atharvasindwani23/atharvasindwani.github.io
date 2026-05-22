import { motion } from 'framer-motion';

function TrainerAvatar() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" className="pixel-render mx-auto">
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
      <rect x="22" y="36" width="4" height="3" fill="#f0f0f0" />
      <rect x="16" y="39" width="6" height="6" fill="#2040a0" />
      <rect x="26" y="39" width="6" height="6" fill="#2040a0" />
      <rect x="15" y="44" width="7" height="4" fill="#e04040" />
      <rect x="26" y="44" width="7" height="4" fill="#e04040" />
    </svg>
  );
}

const socialBadges = [
  { id: 'github', label: 'GitHub', color: '#2a2a2a', url: 'https://github.com/atharvasindwani23' },
  { id: 'linkedin', label: 'LinkedIn', color: '#0077b5', url: 'https://www.linkedin.com/in/atharva-sindwani-686b292a7/' },
  { id: 'twitter', label: 'X/Twitter', color: '#1a1a1a', url: 'https://x.com/atharwows' },
  { id: 'email', label: 'Email', color: '#e04040', url: 'mailto:atharva.sindwani@gmail.com' },
];

function SocialBadgeIcon({ badge }) {
  const icons = {
    github: (
      <svg width="24" height="24" viewBox="0 0 24 24" className="pixel-render">
        <rect x="2" y="2" width="20" height="20" fill="#1a1a1a" rx="3" />
        {/* Octocat shape */}
        <rect x="8" y="4" width="8" height="2" fill="#ffffff" />
        <rect x="6" y="6" width="12" height="2" fill="#ffffff" />
        <rect x="6" y="8" width="12" height="2" fill="#ffffff" />
        <rect x="6" y="10" width="12" height="2" fill="#ffffff" />
        <rect x="8" y="12" width="8" height="2" fill="#ffffff" />
        <rect x="8" y="14" width="8" height="2" fill="#ffffff" />
        <rect x="8" y="16" width="3" height="2" fill="#ffffff" />
        <rect x="13" y="16" width="3" height="2" fill="#ffffff" />
        <rect x="5" y="14" width="3" height="3" fill="#ffffff" />
      </svg>
    ),
    linkedin: (
      <svg width="24" height="24" viewBox="0 0 24 24" className="pixel-render">
        <rect x="2" y="2" width="20" height="20" fill="#0077b5" rx="3" />
        {/* "in" letters */}
        <rect x="6" y="6" width="3" height="3" fill="#ffffff" />
        <rect x="7" y="10" width="2" height="8" fill="#ffffff" />
        <rect x="11" y="10" width="2" height="8" fill="#ffffff" />
        <rect x="13" y="12" width="2" height="6" fill="#ffffff" />
        <rect x="15" y="10" width="2" height="8" fill="#ffffff" />
        <rect x="11" y="10" width="6" height="2" fill="#ffffff" />
      </svg>
    ),
    twitter: (
      <svg width="24" height="24" viewBox="0 0 24 24" className="pixel-render">
        <rect x="2" y="2" width="20" height="20" fill="#000000" rx="3" />
        {/* X shape */}
        <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
        <rect x="9" y="9" width="2" height="2" fill="#ffffff" />
        <rect x="11" y="11" width="2" height="2" fill="#ffffff" />
        <rect x="13" y="13" width="2" height="2" fill="#ffffff" />
        <rect x="15" y="15" width="2" height="2" fill="#ffffff" />
        <rect x="15" y="7" width="2" height="2" fill="#ffffff" />
        <rect x="13" y="9" width="2" height="2" fill="#ffffff" />
        <rect x="9" y="13" width="2" height="2" fill="#ffffff" />
        <rect x="7" y="15" width="2" height="2" fill="#ffffff" />
      </svg>
    ),
    email: (
      <svg width="24" height="24" viewBox="0 0 24 24" className="pixel-render">
        <rect x="2" y="2" width="20" height="20" fill="#e04040" rx="3" />
        {/* Envelope */}
        <rect x="4" y="7" width="16" height="11" fill="#ffffff" rx="1" />
        <rect x="4" y="7" width="2" height="2" fill="#e04040" />
        <rect x="6" y="9" width="2" height="2" fill="#e04040" />
        <rect x="8" y="11" width="2" height="2" fill="#e04040" />
        <rect x="10" y="13" width="4" height="2" fill="#e04040" />
        <rect x="14" y="11" width="2" height="2" fill="#e04040" />
        <rect x="16" y="9" width="2" height="2" fill="#e04040" />
        <rect x="18" y="7" width="2" height="2" fill="#e04040" />
      </svg>
    ),
  };
  return icons[badge.id] || null;
}

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
      {/* Avatar */}
      <div className="text-center mb-3">
        <TrainerAvatar />
        <h2 className="font-pixel text-green-400 text-[8px] leading-tight mt-2">ATHARVA</h2>
        <h2 className="font-pixel text-green-400 text-[8px] leading-tight">SINDWANI</h2>
        <p className="font-pixel text-green-700 text-[6px] mt-1">CS + ADV @ UIUC</p>
      </div>

      {/* Stats */}
      <div className="border-t border-green-900/50 pt-2 space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="font-pixel text-[6px] text-green-600">LVL</span>
          <span className="font-pixel text-[6px] text-green-400">JUNIOR</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-pixel text-[6px] text-green-600">GPA</span>
          <span className="font-pixel text-[6px] text-green-400">4.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-pixel text-[6px] text-green-600">TYPE</span>
          <span className="font-pixel text-[6px] text-green-400">AI/SWE</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-pixel text-[6px] text-green-600">REGION</span>
          <span className="font-pixel text-[6px] text-green-400">UIUC</span>
        </div>
      </div>

      {/* Social Badges */}
      <div className="border-t border-green-900/50 pt-2 mt-2">
        <p className="font-pixel text-[6px] text-green-700 mb-1.5">LINKS</p>
        <div className="grid grid-cols-2 gap-1">
          {socialBadges.map((badge) => (
            <motion.a
              key={badge.id}
              href={badge.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center pointer-events-auto"
              whileHover={{ scale: 1.2 }}
              title={badge.label}
            >
              <SocialBadgeIcon badge={badge} />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="border-t border-green-900/50 pt-2 mt-2 flex items-center gap-2">
        <motion.div
          className="w-2 h-2 rounded-full bg-green-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="font-pixel text-[6px] text-green-500">ONLINE</span>
      </div>
    </motion.div>
  );
}
