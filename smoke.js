const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const net = require('net');

async function freePort() {
  return await new Promise((resolve, reject) => {
    const s = net.createServer();
    s.once('error', reject);
    s.listen(0, '127.0.0.1', () => {
      const p = s.address().port;
      s.close(err => err ? reject(err) : resolve(p));
    });
  });
}
async function waitFor(url, child) {
  for (let i = 0; i < 60; i++) {
    if (child.exitCode !== null) throw new Error('Server exited before becoming ready');
    try { const r = await fetch(url); if (r.ok) return; } catch {}
    await new Promise(r => setTimeout(r, 100));
  }
  throw new Error('Server did not become ready');
}
(async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'referkaro-smoke-'));
  const port = await freePort();
  const base = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, [path.join(__dirname, '..', 'server.js')], {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: String(port), APP_URL: base, DATA_FILE: path.join(dir, 'data.json'), ADMIN_EMAIL: '', NODE_ENV: 'test', REQUIRE_PERSISTENT_STORAGE: 'false' },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  let logs = '';
  child.stdout.on('data', x => logs += x);
  child.stderr.on('data', x => logs += x);
  try {
    await waitFor(base + '/health', child);
    let r = await fetch(base + '/health');
    assert.strictEqual(await r.text(), 'ok');
    r = await fetch(base + '/');
    assert.strictEqual(r.status, 200);
    assert.match(await r.text(), /Refer Karo/i);

    const post = async (route, body, cookie) => fetch(base + '/api/' + route, {
      method: 'POST', headers: { 'content-type': 'application/json', ...(cookie ? { cookie } : {}) }, body: JSON.stringify(body)
    });
    const credentials = { name: 'Smoke Test', email: 'smoke@example.test', phone: '9876543210', password: 'StrongPass123' };
    r = await post('register', credentials);
    assert.strictEqual(r.status, 200, 'registration should succeed: ' + await r.clone().text());
    const setCookie = r.headers.get('set-cookie');
    assert.ok(setCookie && /sid=/.test(setCookie), 'registration should set a session cookie');
    const cookie = setCookie.split(';')[0];
    r = await fetch(base + '/api/state', { headers: { cookie } });
    assert.strictEqual(r.status, 200);
    const state = await r.json();
    assert.strictEqual(state.me.email, credentials.email);
    assert.strictEqual(state.me.phone, credentials.phone);

    r = await post('register', { ...credentials, email: 'duplicate@example.test' });
    assert.strictEqual(r.status, 409, 'duplicate phone should be rejected');

    r = await post('logout', {}, cookie);
    assert.strictEqual(r.status, 200);
    r = await post('login', { identifier: credentials.phone, password: credentials.password });
    assert.strictEqual(r.status, 200, 'phone login should succeed');
    r = await post('login', { email: credentials.email, password: credentials.password });
    assert.strictEqual(r.status, 200, 'email login should succeed');

    console.log('Smoke tests: OK (health, homepage, registration, duplicate phone rejection, state/session, phone login, email login)');
  } finally {
    child.kill('SIGTERM');
    await new Promise(resolve => child.once('exit', resolve));
    fs.rmSync(dir, { recursive: true, force: true });
  }
})().catch(e => { console.error(e.stack || e); process.exitCode = 1; });
