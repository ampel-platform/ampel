/* eslint-env node */

import { spawn } from 'node:child_process';
import { appendFile, mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const repositoryReportDir = path.join(process.cwd(), 'app', 'tests', 'reports');
const localHtmlReportDir = path.join(process.cwd(), 'reports', 'ci');

const checks = [
  {
    id: 'format-check',
    title: 'Prettier Format-Check',
    command: npmCommand,
    args: ['run', 'format:check'],
  },
  {
    id: 'eslint-check',
    title: 'ESLint Code-Analyse',
    command: npmCommand,
    args: ['run', 'eslint:check'],
  },
  {
    id: 'coverage',
    title: 'Vitest Coverage',
    command: npmCommand,
    args: ['run', 'coverage'],
  },
];

function isCiRun() {
  return process.env.GITHUB_ACTIONS === 'true';
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function sanitizeFilename(value) {
  return value.replaceAll(/[^a-zA-Z0-9._-]+/g, '-');
}

function formatDuration(durationMs) {
  return `${(durationMs / 1000).toFixed(2)} s`;
}

function formatPercent(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 'n/a';
  }

  return `${value.toFixed(2)} %`;
}

function determineReportBasename() {
  const refType = process.env.GITHUB_REF_TYPE;
  const refName = process.env.GITHUB_REF_NAME;
  const runId = process.env.GITHUB_RUN_ID;

  if (refType === 'tag' && refName) {
    return `bericht-${sanitizeFilename(refName)}`;
  }

  if (runId) {
    return `bericht-run-${sanitizeFilename(runId)}`;
  }

  const timestamp = new Date().toISOString().replaceAll(/[:.]/g, '-');
  return `bericht-local-${timestamp}`;
}

async function readProjectVersion() {
  const packagePath = path.join(process.cwd(), 'package.json');

  try {
    const raw = await readFile(packagePath, 'utf8');
    const parsed = JSON.parse(raw);
    const version = parsed?.version;
    return typeof version === 'string' && version.trim().length > 0 ? version : 'unbekannt';
  } catch {
    return 'unbekannt';
  }
}

function getMetadata(version) {
  return {
    repository: process.env.GITHUB_REPOSITORY ?? null,
    version,
    sha: process.env.GITHUB_SHA ?? null,
    refName: process.env.GITHUB_REF_NAME ?? null,
    refType: process.env.GITHUB_REF_TYPE ?? null,
    runId: process.env.GITHUB_RUN_ID ?? null,
    runNumber: process.env.GITHUB_RUN_NUMBER ?? null,
    generatedAt: new Date().toISOString(),
  };
}

function runCheck(check) {
  return new Promise((resolve) => {
    const startedAt = new Date();
    const stdoutChunks = [];
    const stderrChunks = [];

    const child = spawn(check.command, check.args, {
      env: process.env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    child.stdout.on('data', (chunk) => {
      stdoutChunks.push(Buffer.from(chunk));
      process.stdout.write(chunk);
    });

    child.stderr.on('data', (chunk) => {
      stderrChunks.push(Buffer.from(chunk));
      process.stderr.write(chunk);
    });

    child.on('error', (error) => {
      const endedAt = new Date();
      resolve({
        id: check.id,
        title: check.title,
        command: `${check.command} ${check.args.join(' ')}`,
        startedAt: startedAt.toISOString(),
        endedAt: endedAt.toISOString(),
        durationMs: endedAt.getTime() - startedAt.getTime(),
        exitCode: 1,
        signal: null,
        stdout: Buffer.concat(stdoutChunks).toString('utf8'),
        stderr:
          `${Buffer.concat(stderrChunks).toString('utf8')}\nSpawn-Fehler: ${error.message}`.trim(),
      });
    });

    child.on('close', (code, signal) => {
      const endedAt = new Date();

      resolve({
        id: check.id,
        title: check.title,
        command: `${check.command} ${check.args.join(' ')}`,
        startedAt: startedAt.toISOString(),
        endedAt: endedAt.toISOString(),
        durationMs: endedAt.getTime() - startedAt.getTime(),
        exitCode: code ?? 1,
        signal: signal ?? null,
        stdout: Buffer.concat(stdoutChunks).toString('utf8'),
        stderr: Buffer.concat(stderrChunks).toString('utf8'),
      });
    });
  });
}

async function readCoverageSummary() {
  const summaryPath = path.join(process.cwd(), 'coverage', 'coverage-summary.json');

  try {
    const raw = await readFile(summaryPath, 'utf8');
    const parsed = JSON.parse(raw);
    const total = parsed?.total ?? {};

    return {
      found: true,
      warning: null,
      sourcePath: summaryPath,
      metrics: {
        lines: total?.lines?.pct,
        statements: total?.statements?.pct,
        functions: total?.functions?.pct,
        branches: total?.branches?.pct,
      },
    };
  } catch (error) {
    return {
      found: false,
      warning: `Coverage-Zusammenfassung nicht lesbar: ${error.message}`,
      sourcePath: summaryPath,
      metrics: null,
    };
  }
}

async function removeOldReportsFromDir(reportDir, extensions) {
  try {
    const entries = await readdir(reportDir, { withFileTypes: true });
    const deletions = entries
      .filter(
        (entry) =>
          entry.isFile() &&
          entry.name.startsWith('bericht-') &&
          extensions.some((extension) => entry.name.endsWith(extension)),
      )
      .map((entry) => unlink(path.join(reportDir, entry.name)));

    await Promise.all(deletions);
  } catch (error) {
    if (!(error instanceof Error) || !('code' in error) || error.code !== 'ENOENT') {
      throw error;
    }
  }
}

async function cleanupLocalReports() {
  await removeOldReportsFromDir(repositoryReportDir, ['.txt', '.html']);
  await removeOldReportsFromDir(localHtmlReportDir, ['.html']);
}

function normalizeLogOutput(value, label) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? value : `Keine ${label}-Ausgabe.`;
}

function buildTextReport({ metadata, results, coverageSummary }) {
  const hasFailures = results.some((result) => result.exitCode !== 0);
  const overallStatus = hasFailures ? 'FEHLER' : 'ERFOLG';
  const totalDurationMs = results.reduce((sum, result) => sum + result.durationMs, 0);
  const metadataFields = [
    ['Repository', metadata.repository],
    ['Version', metadata.version],
    ['Commit SHA', metadata.sha],
    ['Ref-Typ', metadata.refType],
    ['Branch/Tag', metadata.refName],
    ['Run-ID', metadata.runId],
    ['Run-Nummer', metadata.runNumber],
  ];

  const lines = [
    'CI Bericht: Tests und Code-Review',
    '================================',
    '',
    'Kopfbereich',
    '----------',
    ...metadataFields
      .filter(([, value]) => Boolean(value))
      .map(([label, value]) => `${label}: ${value}`),
    `Zeitstempel: ${metadata.generatedAt}`,
    '',
    'Zusammenfassung',
    '--------------',
    `Gesamtstatus: ${overallStatus}`,
    `Gesamtdauer: ${formatDuration(totalDurationMs)}`,
    '',
    'Pruefungen:',
  ];

  for (const result of results) {
    const statusText = result.exitCode === 0 ? 'OK' : 'Fehlgeschlagen';
    const signalText = result.signal ? `, Signal: ${result.signal}` : '';
    lines.push(
      `- ${result.title}: ${statusText} (Exit-Code: ${result.exitCode}${signalText}, Dauer: ${formatDuration(result.durationMs)})`,
    );
    lines.push(`  Befehl: ${result.command}`);
  }

  lines.push('');
  lines.push('Coverage-Zusammenfassung');
  lines.push('-----------------------');

  if (coverageSummary.found) {
    lines.push(`Lines: ${formatPercent(coverageSummary.metrics.lines)}`);
    lines.push(`Statements: ${formatPercent(coverageSummary.metrics.statements)}`);
    lines.push(`Functions: ${formatPercent(coverageSummary.metrics.functions)}`);
    lines.push(`Branches: ${formatPercent(coverageSummary.metrics.branches)}`);
  } else {
    lines.push(coverageSummary.warning);
  }

  lines.push('');
  lines.push('Detail-Logs');
  lines.push('-----------');

  for (const result of results) {
    lines.push('');
    lines.push(`### ${result.title}`);
    lines.push(`Status: ${result.exitCode === 0 ? 'OK' : 'Fehlgeschlagen'}`);
    lines.push(`Befehl: ${result.command}`);
    lines.push(`Start: ${result.startedAt}`);
    lines.push(`Ende: ${result.endedAt}`);
    lines.push(`Dauer: ${formatDuration(result.durationMs)}`);
    const stdoutText = result.stdout.trim();
    if (stdoutText.length > 0) {
      lines.push('');
      lines.push(result.stdout);
    }

    const stderrText = result.stderr.trim();
    if (stderrText.length > 0) {
      lines.push('');
      lines.push(result.stderr);
    }
  }

  lines.push('');
  return lines.join('\n');
}

function buildHtml({ metadata, results, coverageSummary }) {
  const hasFailures = results.some((result) => result.exitCode !== 0);
  const overallStatus = hasFailures ? 'FEHLER' : 'ERFOLG';
  const totalDurationMs = results.reduce((sum, result) => sum + result.durationMs, 0);
  const metadataRows = [
    ['Repository', metadata.repository],
    ['Version', metadata.version],
    ['Commit SHA', metadata.sha],
    ['Ref-Typ', metadata.refType],
    ['Branch/Tag', metadata.refName],
    ['Run-ID', metadata.runId],
    ['Run-Nummer', metadata.runNumber],
    ['Zeitstempel', metadata.generatedAt],
  ]
    .filter(([, value]) => Boolean(value))
    .map(([label, value]) => `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`)
    .join('\n');

  const summaryRows = results
    .map((result) => {
      const statusClass = result.exitCode === 0 ? 'ok' : 'error';
      const statusText = result.exitCode === 0 ? 'OK' : 'Fehlgeschlagen';
      const signalInfo = result.signal ? ` (Signal: ${result.signal})` : '';

      return `
        <tr>
          <td>${escapeHtml(result.title)}</td>
          <td class="${statusClass}">${statusText}</td>
          <td>${result.exitCode}${escapeHtml(signalInfo)}</td>
          <td>${escapeHtml(formatDuration(result.durationMs))}</td>
          <td><code>${escapeHtml(result.command)}</code></td>
        </tr>
      `;
    })
    .join('\n');

  const detailBlocks = results
    .map((result) => {
      const statusText = result.exitCode === 0 ? 'OK' : 'Fehlgeschlagen';
      const stdoutText = normalizeLogOutput(result.stdout, 'stdout');
      const stderrText = normalizeLogOutput(result.stderr, 'stderr');

      return `
        <details>
          <summary>${escapeHtml(result.title)} | Status: ${statusText} | Dauer: ${escapeHtml(formatDuration(result.durationMs))}</summary>
          <p><strong>Befehl:</strong> <code>${escapeHtml(result.command)}</code></p>
          <p><strong>Start:</strong> ${escapeHtml(result.startedAt)}<br /><strong>Ende:</strong> ${escapeHtml(result.endedAt)}</p>
          <h4>stdout</h4>
          <pre>${escapeHtml(stdoutText)}</pre>
          <h4>stderr</h4>
          <pre>${escapeHtml(stderrText)}</pre>
        </details>
      `;
    })
    .join('\n');

  const coverageSection = coverageSummary.found
    ? `
      <section>
        <h2>Coverage-Zusammenfassung</h2>
        <table>
          <thead>
            <tr>
              <th>Metrik</th>
              <th>Wert</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Lines</td><td>${formatPercent(coverageSummary.metrics.lines)}</td></tr>
            <tr><td>Statements</td><td>${formatPercent(coverageSummary.metrics.statements)}</td></tr>
            <tr><td>Functions</td><td>${formatPercent(coverageSummary.metrics.functions)}</td></tr>
            <tr><td>Branches</td><td>${formatPercent(coverageSummary.metrics.branches)}</td></tr>
          </tbody>
        </table>
      </section>
    `
    : `
      <section>
        <h2>Coverage-Zusammenfassung</h2>
        <p class="warning">${escapeHtml(coverageSummary.warning)}</p>
      </section>
    `;

  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CI Bericht - Tests und Code-Review</title>
    <style>
      :root {
        color-scheme: light;
      }

      body {
        margin: 0;
        padding: 2rem;
        font-family: "Segoe UI", Arial, sans-serif;
        background: #f5f7fb;
        color: #1f2937;
      }

      main {
        max-width: 1000px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #dbe3ef;
        border-radius: 12px;
        padding: 1.5rem;
      }

      h1, h2, h3, h4 {
        margin-top: 0;
      }

      section + section {
        margin-top: 1.5rem;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th, td {
        border: 1px solid #dbe3ef;
        padding: 0.55rem;
        text-align: left;
        vertical-align: top;
      }

      th {
        background: #eef3fb;
      }

      .ok {
        color: #166534;
        font-weight: 600;
      }

      .error {
        color: #991b1b;
        font-weight: 600;
      }

      .status {
        font-size: 1.1rem;
        font-weight: 700;
      }

      .warning {
        background: #fff7ed;
        color: #9a3412;
        border: 1px solid #fed7aa;
        padding: 0.65rem;
        border-radius: 8px;
      }

      details {
        border: 1px solid #dbe3ef;
        border-radius: 8px;
        padding: 0.65rem;
        margin-bottom: 0.75rem;
        background: #fafcff;
      }

      summary {
        cursor: pointer;
        font-weight: 600;
      }

      pre {
        background: #0f172a;
        color: #e2e8f0;
        border-radius: 8px;
        padding: 0.75rem;
        overflow-x: auto;
        white-space: pre-wrap;
      }

      code {
        background: #eef3fb;
        padding: 0.1rem 0.25rem;
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>CI Bericht: Tests und Code-Review</h1>
      <section>
        <h2>Kopfbereich</h2>
        <table>
          <tbody>
            ${metadataRows}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Zusammenfassung</h2>
        <p class="status">Gesamtstatus: <span class="${hasFailures ? 'error' : 'ok'}">${overallStatus}</span></p>
        <p>Gesamtdauer: ${escapeHtml(formatDuration(totalDurationMs))}</p>
        <table>
          <thead>
            <tr>
              <th>Pruefung</th>
              <th>Status</th>
              <th>Exit-Code</th>
              <th>Dauer</th>
              <th>Befehl</th>
            </tr>
          </thead>
          <tbody>
            ${summaryRows}
          </tbody>
        </table>
      </section>

      ${coverageSection}

      <section>
        <h2>Detail-Logs</h2>
        ${detailBlocks}
      </section>
    </main>
  </body>
</html>
`;
}

async function writeReportToDir(reportDir, filename, content) {
  await mkdir(reportDir, { recursive: true });
  const reportPath = path.join(reportDir, filename);
  await writeFile(reportPath, content, 'utf8');
  return reportPath;
}

async function writeTextReport(textReport, basename) {
  return writeReportToDir(repositoryReportDir, `${basename}.txt`, textReport);
}

async function writeLocalHtmlReport(htmlReport, basename) {
  return writeReportToDir(localHtmlReportDir, `${basename}.html`, htmlReport);
}

async function writeGithubOutputs({ txtReportPath, htmlReportPath }) {
  const outputFile = process.env.GITHUB_OUTPUT;
  if (!outputFile) {
    return;
  }

  const relativeTxtPath = path.relative(process.cwd(), txtReportPath);
  const payloadLines = [
    `report_path=${relativeTxtPath}`,
    `report_txt_path=${relativeTxtPath}`,
    `report_txt_filename=${path.basename(txtReportPath)}`,
  ];

  if (htmlReportPath) {
    const relativeHtmlPath = path.relative(process.cwd(), htmlReportPath);
    payloadLines.push(`report_html_path=${relativeHtmlPath}`);
    payloadLines.push(`report_html_filename=${path.basename(htmlReportPath)}`);
  }

  await appendFile(outputFile, `${payloadLines.join('\n')}\n`, 'utf8');
}

async function run() {
  console.log('Starte CI Bericht-Generierung...');
  const projectVersion = await readProjectVersion();
  const metadata = getMetadata(projectVersion);
  const results = [];
  const ciRun = isCiRun();

  if (!ciRun) {
    await cleanupLocalReports();
  }

  for (const check of checks) {
    console.log(`\n--- ${check.title} ---`);
    // Execute checks serially to preserve deterministic output order.
    const result = await runCheck(check);
    results.push(result);
  }

  const coverageSummary = await readCoverageSummary();
  const basename = determineReportBasename();
  const textReport = buildTextReport({ metadata, results, coverageSummary });
  const txtReportPath = await writeTextReport(textReport, basename);
  let htmlReportPath = null;

  if (!ciRun) {
    const htmlReport = buildHtml({ metadata, results, coverageSummary });
    htmlReportPath = await writeLocalHtmlReport(htmlReport, basename);
  }

  await writeGithubOutputs({ txtReportPath, htmlReportPath });

  const hasFailures = results.some((result) => result.exitCode !== 0);
  console.log(`\nText-Bericht gespeichert unter: ${txtReportPath}`);
  if (htmlReportPath) {
    console.log(`Lokaler HTML-Bericht gespeichert unter: ${htmlReportPath}`);
  }

  process.exit(hasFailures ? 1 : 0);
}

run().catch(async (error) => {
  const message = error instanceof Error ? (error.stack ?? error.message) : String(error);
  const projectVersion = await readProjectVersion();
  const metadata = getMetadata(projectVersion);
  const ciRun = isCiRun();
  if (!ciRun) {
    await cleanupLocalReports();
  }

  const fallbackResults = [
    {
      id: 'bericht-internal-error',
      title: 'Interner Berichtsfehler',
      command: 'node scripts/generate-ci-bericht.mjs',
      startedAt: metadata.generatedAt,
      endedAt: new Date().toISOString(),
      durationMs: 0,
      exitCode: 1,
      signal: null,
      stdout: '',
      stderr: message,
    },
  ];
  const fallbackCoverage = {
    found: false,
    warning: 'Coverage-Daten konnten wegen eines internen Fehlers nicht geladen werden.',
    sourcePath: path.join(process.cwd(), 'coverage', 'coverage-summary.json'),
    metrics: null,
  };
  const basename = determineReportBasename();
  const fallbackText = buildTextReport({
    metadata,
    results: fallbackResults,
    coverageSummary: fallbackCoverage,
  });
  const txtReportPath = await writeTextReport(fallbackText, basename);
  let htmlReportPath = null;

  if (!ciRun) {
    const fallbackHtml = buildHtml({
      metadata,
      results: fallbackResults,
      coverageSummary: fallbackCoverage,
    });
    htmlReportPath = await writeLocalHtmlReport(fallbackHtml, basename);
  }

  await writeGithubOutputs({ txtReportPath, htmlReportPath });
  console.error(`Interner Fehler bei der Berichtserstellung: ${message}`);
  console.error(`Fallback-Text-Bericht gespeichert unter: ${txtReportPath}`);
  if (htmlReportPath) {
    console.error(`Lokaler HTML-Fallback-Bericht gespeichert unter: ${htmlReportPath}`);
  }
  process.exit(1);
});
