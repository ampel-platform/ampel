import { spawnSync } from 'node:child_process';

const builderArgs = process.platform === 'darwin' ? ['--mac', 'dmg'] : ['--win', 'portable'];

const result = spawnSync('electron-builder', builderArgs, {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
