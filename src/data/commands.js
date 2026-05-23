import projects from './projects';
import experience from './experience';
import skills from './skills';

export function executeCommand(input) {
  const parts = input.trim().split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1).join(' ');

  switch (cmd) {
    case '-help': return helpOutput();
    case '-about': return aboutOutput();
    case '-skills': return skillsOutput();
    case '-projects': return projectsOutput();
    case '-project': return projectDetailOutput(args);
    case '-experience': return experienceOutput();
    case '-resume': return resumeOutput();
    case '-contact': return contactOutput();
    case '-clear': return { clear: true };
    case '-music': return { music: true, lines: ['', '  ♪ Music toggled.', ''] };
    case '-caught': return { caught: true };
    default:
      return ['', `  Command not found: "${input}"`, '  Type -help for commands.', ''];
  }
}

function helpOutput() {
  return [
    '',
    '  ┌─────────────────────────────┐',
    '  │   POKÉDEX OS — COMMANDS     │',
    '  ├─────────────────────────────┤',
    '  │                             │',
    '  │  -about       Quick bio     │',
    '  │  -experience  Work history  │',
    '  │  -projects    What I built  │',
    '  │  -skills      Stat bars     │',
    '  │  -resume      Full summary  │',
    '  │  -contact     Reach me      │',
    '  │  -guess       Pokémon quiz  │',
    '  │  -catch       Throw ball!   │',
    '  │  -music       Toggle BGM    │',
    '  │  -clear       Clear screen  │',
    '  │                             │',
    '  └─────────────────────────────┘',
    '',
  ];
}

function aboutOutput() {
  return [
    '',
    '  ══ TRAINER PROFILE ══',
    '',
    '  ┌─ Identity ─────────────────┐',
    '  │                             │',
    '  │  Atharva Sindwani           │',
    '  │  CS + Advertising @ UIUC   │',
    '  │                             │',
    '  │  Builder focused on AI,     │',
    '  │  backend systems, and       │',
    '  │  product strategy.          │',
    '  │                             │',
    '  └─────────────────────────────┘',
    '',
    '  ┌─ Current Quest ────────────┐',
    '  │                             │',
    '  │  Incoming TPM Intern        │',
    '  │  @ Amazon                   │',
    '  │                             │',
    '  └─────────────────────────────┘',
    '',
    '  ┌─ Experience Snapshot ──────┐',
    '  │                             │',
    '  │  • Amazon — Incoming TPM    │',
    '  │  • Mphasis — ML infra,     │',
    '  │    10k+ rec/min, -35% lat   │',
    '  │  • NCSA — Distributed AI,   │',
    '  │    500+ concurrent sessions  │',
    '  │  • Geopop — NLP + geo       │',
    '  │    analytics, 50k+ points   │',
    '  │  • Google — Risk assessment │',
    '  │    & AI-powered insights    │',
    '  │                             │',
    '  └─────────────────────────────┘',
    '',
    '  ┌─ Core Signal ──────────────┐',
    '  │                             │',
    '  │  I build technical products │',
    '  │  that combine software,     │',
    '  │  AI systems, and product    │',
    '  │  thinking.                  │',
    '  │                             │',
    '  └─────────────────────────────┘',
    '',
  ];
}

function skillsOutput() {
  const lines = [
    '',
    '  ══ SKILL STATS ══',
    '',
  ];

  skills.forEach(skill => {
    const filled = Math.round(skill.level / 10);
    const empty = 10 - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    lines.push(`  ${skill.name.padEnd(20)} ${bar} ${skill.level}`);
  });

  lines.push('');
  lines.push('  ─────────────────────────────────');
  lines.push('  Strongest: Backend, AI/ML, Product');
  lines.push('');
  return lines;
}

function projectsOutput() {
  const lines = [
    '',
    '  ══ POKÉDEX ENTRIES ══',
    '',
  ];

  projects.forEach(p => {
    lines.push({ text: `  #${p.number}  ${p.name}`, clickCommand: `-project ${p.id}` });
    lines.push(`        ${p.oneLiner}`);
    lines.push('');
  });

  lines.push('  ─────────────────────────────────');
  lines.push('  Click a project or type');
  lines.push('  -project <name> for details.');
  lines.push('');
  return lines;
}

function projectDetailOutput(name) {
  if (!name) {
    return ['', '  Usage: -project <name>', '  Try: ' + projects.map(p => p.id).join(', '), ''];
  }

  const project = projects.find(
    p => p.id === name.toLowerCase() || p.name.toLowerCase() === name.toLowerCase()
  );

  if (!project) {
    return ['', `  Project "${name}" not found.`, '  Available: ' + projects.map(p => p.id).join(', '), ''];
  }

  const lines = [
    '',
    `  ══ ENTRY #${project.number} — ${project.name.toUpperCase()} ══`,
    '',
    `  ┌─ Overview ──────────────────┐`,
    `  │`,
    `  │  Type: ${project.type.join(' / ')}`,
    `  │  "${project.oneLiner}"`,
    `  │`,
    `  └─────────────────────────────┘`,
    '',
    `  ┌─ Description ──────────────┐`,
    `  │`,
  ];

  wrapText(project.description, 35).forEach(l => lines.push(`  │  ${l}`));
  lines.push(`  │`);
  lines.push(`  └─────────────────────────────┘`);

  lines.push('');
  lines.push(`  ┌─ Problem ────────────────────┐`);
  lines.push(`  │`);
  wrapText(project.problem, 35).forEach(l => lines.push(`  │  ${l}`));
  lines.push(`  │`);
  lines.push(`  └─────────────────────────────┘`);

  lines.push('');
  lines.push(`  ┌─ My Role ────────────────────┐`);
  lines.push(`  │`);
  wrapText(project.contribution, 35).forEach(l => lines.push(`  │  ${l}`));
  lines.push(`  │`);
  lines.push(`  └─────────────────────────────┘`);

  if (project.impact) {
    lines.push('');
    lines.push(`  ┌─ Impact ────────────────────┐`);
    lines.push(`  │  ${project.impact}`);
    lines.push(`  └─────────────────────────────┘`);
  }

  lines.push('');
  lines.push(`  Tech: ${project.tech.join(' • ')}`);

  if (project.github) {
    lines.push('');
    lines.push(`  GitHub: ${project.github}`);
  }

  lines.push('');
  return lines;
}

function experienceOutput() {
  const lines = [
    '',
    '  ══ BATTLE HISTORY ══',
    '',
  ];

  experience.forEach((exp, i) => {
    const num = String(i + 1).padStart(3, '0');
    lines.push(`  ┌─ [${num}] ${exp.company.toUpperCase()} ─────┐`);
    lines.push(`  │`);
    lines.push(`  │  Role: ${exp.role}`);
    lines.push(`  │  ${exp.period} | ${exp.location}`);
    lines.push(`  │`);
    lines.push(`  │  Impact:`);
    exp.bullets.slice(0, 3).forEach(b => {
      lines.push(`  │  • ${b}`);
    });
    lines.push(`  │`);
    lines.push(`  │  Stack: ${exp.tech.join(', ')}`);
    lines.push(`  │`);
    lines.push(`  └─────────────────────────────┘`);
    lines.push('');
  });

  return lines;
}

function resumeOutput() {
  return [
    '',
    '  ══ RESUME SUMMARY ══',
    '',
    '  ┌─ Education ────────────────┐',
    '  │  BS CS + Advertising       │',
    '  │  UIUC | James Scholar      │',
    '  │  Dean\'s List 4x            │',
    '  └─────────────────────────────┘',
    '',
    '  ┌─ Experience ───────────────┐',
    '  │  • Amazon — TPM Intern     │',
    '  │  • Mphasis — AI Intern     │',
    '  │  • NCSA — ML Intern        │',
    '  │  • Geopop — SWE Intern     │',
    '  │  • Google — Senior PM      │',
    '  │  • AAF — AdTech President  │',
    '  └─────────────────────────────┘',
    '',
    '  ┌─ Projects ─────────────────┐',
    '  │  • Abode — 17,000 users    │',
    '  │  • DevangarAI — Best Prod  │',
    '  │  • Matrix — 2nd UIUC hack  │',
    '  │  • Voider — $5k Stanford   │',
    '  └─────────────────────────────┘',
    '',
    '  ┌─ Languages ────────────────┐',
    '  │  C++ • Python • JS • Rust  │',
    '  │  Go • Swift • Bash         │',
    '  └─────────────────────────────┘',
    '',
    '  ┌─ Frameworks ───────────────┐',
    '  │  React • TensorFlow • AWS  │',
    '  │  PyTorch • Node.js         │',
    '  └─────────────────────────────┘',
    '',
  ];
}

function contactOutput() {
  return [
    '',
    '  ══ SIGNAL FLARE ══',
    '',
    '  ┌─────────────────────────────┐',
    '  │                             │',
    { text: '  │  ✉ atharva.sindwani@gmail.com', href: 'mailto:atharva.sindwani@gmail.com' },
    '  │                             │',
    { text: '  │  ◆ github.com/atharvasindwani23', href: 'https://github.com/atharvasindwani23' },
    '  │                             │',
    { text: '  │  ◆ linkedin.com/in/atharva-sindwani', href: 'https://linkedin.com/in/atharva-sindwani' },
    '  │                             │',
    { text: '  │  ◆ x.com/atharwows', href: 'https://x.com/atharwows' },
    '  │                             │',
    '  │  ☎ (217) 480-4938          │',
    '  │  ◍ Urbana, Illinois         │',
    '  │                             │',
    '  └─────────────────────────────┘',
    '',
    '  Ready for battle. Send a signal.',
    '',
  ];
}

function wrapText(text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let current = '';

  words.forEach(word => {
    if ((current + ' ' + word).trim().length > maxWidth) {
      lines.push(current.trim());
      current = word;
    } else {
      current = current ? current + ' ' + word : word;
    }
  });
  if (current) lines.push(current.trim());
  return lines;
}
