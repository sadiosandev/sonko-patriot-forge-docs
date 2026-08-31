const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'src/content/SONKOPATRIOT_FORGE.md');
const readmePath = path.join(root, 'src/content/README.md');
const changelogPath = path.join(root, 'src/content/CHANGELOG.md');
const licensePath = path.join(root, 'src/content/LICENSE.md');
const outDir = path.join(root, 'src/content/generated');

fs.mkdirSync(outDir, { recursive: true });
for (const file of fs.readdirSync(outDir)) fs.unlinkSync(path.join(outDir, file));

const slugify = (value) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[`'’]/g, '')
  .replace(/[^a-zA-Z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .toLowerCase();

const cleanTitle = (title) => title
  .replace(/^\d+\.\s*/, '')
  .replace(/^`|`$/g, '')
  .trim();

const categoryFor = (title) => {
  const t = title.toLowerCase();
  const number = Number((title.match(/^(\d+)\./) || [])[1] || 999);
  if (number <= 2) return 'Getting Started';
  if (number === 3) return 'Artisan Commands';
  if (number >= 4 && number <= 8) return 'Core Generator';
  if (number >= 9 && number <= 12) return 'API & Security';
  if (number >= 13 && number <= 19) return 'Features';
  if (number === 20) return 'Swagger / OpenAPI';
  if (number >= 21 && number <= 22) return 'Configuration';
  if (number >= 23 && number <= 29) return 'Advanced';
  if (number >= 30 && number <= 33) return 'Operations';
  if (number === 34) return 'Project';
  if (t.includes('web dashboard')) return 'Web Dashboard';
  if (t.includes('web authentication')) return 'Web Authentication';
  if (t.includes('native scaffold')) return 'Web Scaffold';
  return 'Reference';
};

const reference = fs.readFileSync(sourcePath, 'utf8').replace(/\r\n/g, '\n');
const lines = reference.split('\n');
const sections = [];

// Parse the reference with hierarchy awareness:
// - numbered/unscoped ## chapters are individual pages;
// - top-level # chapters (Dashboard/Auth) keep ALL nested ##/### content together.
let i = 0;
while (i < lines.length) {
  const line = lines[i];

  if (line === '# SonkoPatriot Forge — Complete Reference') {
    i += 1;
    continue;
  }

  const h1 = line.match(/^#\s+(.+)$/);
  if (h1) {
    const body = [line];
    i += 1;
    while (i < lines.length && !/^#\s+/.test(lines[i])) {
      body.push(lines[i]);
      i += 1;
    }
    sections.push({ rawTitle: h1[1].trim(), body, level: 1 });
    continue;
  }

  const h2 = line.match(/^##\s+(.+)$/);
  if (h2) {
    const body = [line];
    i += 1;
    while (i < lines.length && !/^#{1,2}\s+/.test(lines[i])) {
      body.push(lines[i]);
      i += 1;
    }
    sections.push({ rawTitle: h2[1].trim(), body, level: 2 });
    continue;
  }

  i += 1;
}

const pages = [];
const intro = `# SonkoPatriot Forge\n\nModern Laravel API Generator for Laravel 13.\n\nSonkoPatriot Forge (SPForge) is a modernized code generator focused on Laravel 13, native PHP attributes, APIs, web scaffolding, authentication, permissions, Data DTOs, Query Builder, DataTables, Excel, Scout, Activitylog and OpenAPI.\n\n## Start here\n\n- Install the package locally or through Composer.\n- Publish the configuration.\n- Install the optional Web Dashboard/Auth Kit.\n- Generate your first API or API + Scaffold module.\n`;
fs.writeFileSync(path.join(outDir, 'introduction.md'), intro);
pages.push({ id: 'introduction', title: 'Introduction', category: 'Getting Started', path: '/docs/introduction', file: 'introduction.md', order: 0 });

for (const [index, section] of sections.entries()) {
  const title = cleanTitle(section.rawTitle);
  const slug = slugify(title) || `section-${index + 1}`;
  const file = `${String(index + 1).padStart(2, '0')}-${slug}.md`;
  const content = section.body.join('\n')
    .replace(/^##\s+/, '# ')
    .replace(/^#\s+/, '# ');

  fs.writeFileSync(path.join(outDir, file), content.trim() + '\n');
  pages.push({
    id: slug,
    title,
    category: categoryFor(section.rawTitle),
    path: `/docs/${slug}`,
    file,
    order: index + 1,
  });
}

const readme = fs.readFileSync(readmePath, 'utf8');
fs.writeFileSync(path.join(outDir, 'quick-start.md'), readme);
pages.splice(1, 0, { id: 'quick-start', title: 'Quick Start', category: 'Getting Started', path: '/docs/quick-start', file: 'quick-start.md', order: 0.5 });

fs.writeFileSync(path.join(outDir, 'changelog.md'), fs.readFileSync(changelogPath, 'utf8'));
pages.push({ id: 'changelog', title: 'Changelog', category: 'Project', path: '/docs/changelog', file: 'changelog.md', order: 998 });
fs.writeFileSync(path.join(outDir, 'license.md'), fs.readFileSync(licensePath, 'utf8'));
pages.push({ id: 'license', title: 'License', category: 'Project', path: '/docs/license', file: 'license.md', order: 999 });

const imports = pages.map((p, idx) => `import doc${idx} from './content/generated/${p.file}';`).join('\n');
const rows = pages.map((p, idx) => `  { ...${JSON.stringify(p)}, content: doc${idx} },`).join('\n');
const ts = `${imports}\n\nexport type DocPage = {\n  id: string;\n  title: string;\n  category: string;\n  path: string;\n  file: string;\n  order: number;\n  content: string;\n};\n\nexport const docs: DocPage[] = [\n${rows}\n];\n\nexport const docCategories = Array.from(new Set(docs.map((doc) => doc.category)));\n`;
fs.writeFileSync(path.join(root, 'src/docs.generated.ts'), ts);

const tooShort = pages
  .filter((page) => page.file.endsWith('.md'))
  .map((page) => ({ page, size: fs.statSync(path.join(outDir, page.file)).size }))
  .filter(({ page, size }) => size < 100 && !['license'].includes(page.id));

if (tooShort.length) {
  console.warn('Warning: suspiciously short generated pages:');
  for (const { page, size } of tooShort) console.warn(`- ${page.title}: ${size} bytes`);
}

console.log(`Generated ${pages.length} documentation pages.`);
