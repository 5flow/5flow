const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'landing commence');
const files = fs.readdirSync(dir).filter((f) => /^landing commence new_\d{5}\.png$/.test(f));

(async () => {
  for (const f of files) {
    const src = path.join(dir, f);
    const dst = path.join(dir, f.replace(/\.png$/, '.webp'));
    if (fs.existsSync(dst)) {
      console.log('skip exists', dst);
      continue;
    }

    await sharp(src).webp({ quality: 90 }).toFile(dst);
    console.log('converted', f, '->', path.basename(dst));
  }

  console.log('done');
})();
