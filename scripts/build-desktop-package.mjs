import { spawnSync } from 'node:child_process';

const builderArgs = process.platform === 'darwin' ? ['--mac', 'dmg'] : ['--win', 'portable'];
const demoBrand = (process.env.DEMO_BRAND ?? '').toLowerCase();
const brandOverrides =
  demoBrand === 'ampel'
    ? ['--config.productName=AMPEL UI RELEASE', '--config.artifactName=AMPEL UI RELEASE.${ext}']
    : [];

const result = spawnSync('electron-builder', [...builderArgs, ...brandOverrides], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
