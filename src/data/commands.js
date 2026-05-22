import projects from './projects';
import experience from './experience';
import skills, { typeColors } from './skills';

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
    case '-music': return { music: true, lines: ['♪ Music toggled.'] };
    case '-caught': return { caught: true };
    default:
      return [`Command not recognized: "${input}"`, '', 'Type -help for available commands.'];
  }
}

function helpOutput() {
  return [
    '',
    '╔════════════════════════════════════╗',
    '║      POKÉDEX OS v2.0 — HELP       ║',
    '╠════════════════════════════════════╣',
    '║                                    ║',
    '║  -help        Show this menu       ║',
    '║  -about       Trainer profile      ║',
    '║  -skills      Combat stats         ║',
    '║  -projects    Pokédex entries       ║',
    '║  -project <n> Entry details        ║',
    '║  -experience  Battle history       ║',
    '║  -resume      Full resume          ║',
    '║  -contact     Signal flare         ║',
    '║  -guess       Who\'s that Pokémon?  ║',
    '║  -catch       Throw a Pokéball!    ║',
    '║  -caught      View collection      ║',
    '║  -music       Toggle music         ║',
    '║  -clear       Clear screen         ║',
    '║                                    ║',
    '╚════════════════════════════════════╝',
    '',
  ];
}

function aboutOutput() {
  return [
    '',
    '┌──────── TRAINER PROFILE ────────┐',
    '',
    '  Name:   Atharva Sindwani',
    '  Class:  CS + Advertising @ UIUC',
    '  Level:  Junior (GPA: 4.00/4.00)',
    '  Region: Urbana-Champaign, IL',
    '',
    '  ═══ BIO ═══',
    '  Builder obsessed with AI, product,',
    '  and creative technology. I ship',
    '  things that people actually use.',
    '',
    '  ═══ HONORS ═══',
    '  ★ James Scholar (4x Dean\'s List)',
    '  ★ Florence J Johnson Scholar',
    '  ★ $5k Stanford Hackathon Winner',
    '  ★ 2nd Place UIUC Hackathon',
    '  ★ "Best Product" Award',
    '',
    '  ═══ BADGES ═══',
    '  [Builder] [Hacker] [Founder]',
    '  [Researcher] [Leader]',
    '',
    '└─────────────────────────────────┘',
    '',
  ];
}

function skillsOutput() {
  const lines = [
    '',
    '┌──────── TRAINER STATS ────────┐',
    '',
    '  ═══ LANGUAGES ═══',
  ];

  skills.filter(s => s.category === 'language').forEach(skill => {
    const filled = Math.round(skill.level / 5);
    const empty = 20 - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    lines.push(`  ${skill.name.padEnd(14)} ${bar} ${skill.level}`);
  });

  lines.push('');
  lines.push('  ═══ FRAMEWORKS ═══');

  skills.filter(s => s.category === 'framework').forEach(skill => {
    const filled = Math.round(skill.level / 5);
    const empty = 20 - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    lines.push(`  ${skill.name.padEnd(14)} ${bar} ${skill.level}`);
  });

  lines.push('');
  lines.push('  ═══ DOMAINS ═══');

  skills.filter(s => s.category === 'domain').forEach(skill => {
    const filled = Math.round(skill.level / 5);
    const empty = 20 - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    lines.push(`  ${skill.name.padEnd(14)} ${bar} ${skill.level}`);
  });

  lines.push('');
  lines.push('└───────────────────────────────┘');
  lines.push('');
  return lines;
}

function projectsOutput() {
  const lines = [
    '',
    '┌──────── POKÉDEX ENTRIES ────────┐',
    '',
  ];

  projects.forEach(p => {
    lines.push(`  #${p.number} ${p.name}`);
    lines.push(`  Type: ${p.type.join('/')}`);
    lines.push(`  "${p.oneLiner}"`);
    lines.push('');
  });

  lines.push('  Use: -project <name> for details');
  lines.push('');
  lines.push('└─────────────────────────────────┘');
  lines.push('');
  return lines;
}

function projectDetailOutput(name) {
  if (!name) {
    return ['Usage: -project <name>', 'Example: -project abode', '', 'Available: ' + projects.map(p => p.id).join(', ')];
  }

  const project = projects.find(
    p => p.id === name.toLowerCase() || p.name.toLowerCase() === name.toLowerCase()
  );

  if (!project) {
    return [`Project "${name}" not found.`, '', 'Available: ' + projects.map(p => p.id).join(', ')];
  }

  const lines = [
    '',
    `╔═══════════════════════════════════════╗`,
    `║  POKÉDEX ENTRY #${project.number}                   ║`,
    `╠═══════════════════════════════════════╣`,
    `║`,
    `  Name: ${project.name}`,
    `  Type: ${project.type.join(' / ')}`,
    `  "${project.oneLiner}"`,
    `║`,
    `  ═══ DESCRIPTION ═══`,
    `  ${project.description}`,
    `║`,
    `  ═══ PROBLEM SOLVED ═══`,
    `  ${project.problem}`,
    `║`,
    `  ═══ MY CONTRIBUTION ═══`,
    `  ${project.contribution}`,
    `║`,
    `  ═══ TECH STACK ═══`,
    `  ${project.tech.join(' • ')}`,
    `║`,
  ];

  if (project.github) {
    lines.push(`  ═══ LINKS ═══`);
    lines.push(`  GitHub: ${project.github}`);
    if (project.live) lines.push(`  Live: ${project.live}`);
    lines.push('║');
  }

  lines.push(`  ═══ STAT BOOSTS ═══`);
  Object.entries(project.statBoosts).forEach(([stat, val]) => {
    lines.push(`  ${stat.toUpperCase().padEnd(12)} +${val}`);
  });

  lines.push(`║`);
  lines.push(`╚═══════════════════════════════════════╝`);
  lines.push('');
  return lines;
}

function experienceOutput() {
  const lines = [
    '',
    '┌──── TRAINER BATTLE HISTORY ────┐',
    '',
  ];

  experience.forEach((exp, i) => {
    lines.push(`  ◆ ${exp.role}`);
    lines.push(`    ${exp.company} | ${exp.period}`);
    lines.push(`    ${exp.location}`);
    lines.push('');
    exp.bullets.forEach(b => {
      lines.push(`    • ${b}`);
    });
    lines.push('');
    lines.push(`    Tech: ${exp.tech.join(', ')}`);
    lines.push('');
    lines.push(`    Stat Boosts:`);
    Object.entries(exp.statBoosts).forEach(([stat, val]) => {
      lines.push(`      ${stat.toUpperCase()} +${val}`);
    });
    if (i < experience.length - 1) {
      lines.push('');
      lines.push('  ─────────────────────────────');
      lines.push('');
    }
  });

  lines.push('');
  lines.push('└─────────────────────────────────┘');
  lines.push('');
  return lines;
}

function resumeOutput() {
  return [
    '',
    '┌──────── RESUME SUMMARY ────────┐',
    '',
    '  Atharva Sindwani',
    '  BS Computer Science & Advertising',
    '  University of Illinois Urbana-Champaign',
    '  GPA: 4.00/4.00 | Dean\'s List 4x',
    '',
    '  ═══ HIGHLIGHTS ═══',
    '  • Incoming Amazon TPM Intern',
    '  • AI Intern @ Mphasis (NYC)',
    '  • ML Intern @ NCSA SPINS',
    '  • SWE Intern @ Geopop (Mumbai)',
    '  • Senior PM @ OTCR (Google)',
    '  • Founded AdTech (75+ members)',
    '  • Co-founded Abode (17k users)',
    '  • Won $5k at Stanford Treehacks',
    '  • 2nd Place UIUC Hackathon',
    '',
    '  ═══ CORE SKILLS ═══',
    '  C++ • Python • JS • Rust • Go',
    '  React • TensorFlow • PyTorch',
    '  AWS • Databricks • Node.js',
    '',
    '  ═══ HONORS ═══',
    '  James Scholar | Florence J Johnson',
    '  Scholar | Best Product Award',
    '',
    '└─────────────────────────────────┘',
    '',
  ];
}

function contactOutput() {
  return [
    '',
    '┌──────── SIGNAL FLARE ────────┐',
    '',
    '  ✉ Email:    atharva.sindwani@gmail.com',
    '  ◆ GitHub:   github.com/atharvasindwani23',
    '  ◆ LinkedIn: linkedin.com/in/atharvasindwani',
    '  ☎ Phone:    (217) 480-4938',
    '  📍 Location: Urbana, Illinois',
    '',
    '  Ready for battle! Send a signal.',
    '',
    '└───────────────────────────────┘',
    '',
  ];
}
