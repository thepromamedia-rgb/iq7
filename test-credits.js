'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs'); const os = require('node:os'); const path = require('node:path');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cb-credits-'));
process.env.DATA_DIR = tmp; process.env.ADMIN_EMAIL = 'admin@credits.test'; process.env.ADMIN_PASSWORD = 'AdminPass123';
process.env.CREDITS_ONLY = 'true'; delete process.env.UPSTASH_REDIS_REST_URL;
(async () => {
  const { server, loadDB, seedAdmin } = require('./server.js');
  await loadDB(); await seedAdmin(); await new Promise(r => server.listen(0, r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const mk = () => { let cookie = ''; return async (method, p, body) => { const r = await fetch(base+p, {method, headers:{'Content-Type':'application/json', ...(cookie && {Cookie:cookie})}, body: body && JSON.stringify(body)}); const sc=r.headers.get('set-cookie'); if(sc) cookie=sc.split(';')[0]; return {s:r.status,j:await r.json().catch(()=>({}))}; }; };
  try {
    const admin=mk(), user=mk();
    assert.equal((await admin('POST','/api/login',{email:'admin@credits.test',password:'AdminPass123'})).s,200);
    assert.equal((await user('POST','/api/register',{name:'Credit User',email:'user@credits.test',password:'Password123'})).s,200);
    assert.equal((await user('POST','/api/deposit',{amount:1000,utr:'TESTUTR12345'})).s,403);
    assert.equal((await user('POST','/api/withdraw',{amount:1,upi:'user@bank'})).s,403);
    assert.equal((await user('POST','/api/razorpay/order',{amount:1000})).s,403);
    const uid=(await user('GET','/api/me')).j.user.id;
    assert.equal((await user('POST','/api/admin/user',{id:uid,action:'credit',amount:100,reason:'self attempt'})).s,403);
    assert.equal((await admin('POST','/api/admin/user',{id:uid,action:'credit',amount:100,reason:'test credits'})).s,200);
    assert.equal((await user('GET','/api/me')).j.user.balance,100);
    const played=await user('POST','/api/game/play',{game:'coin',action:'heads',stake:10});
    assert.equal(played.s,200); assert.equal(played.j.bet.stake,10); assert.ok(played.j.balance>=90 && played.j.balance<=110);
    assert.equal((await user('POST','/api/game/play',{game:'coin',action:'heads',stake:1000})).s,400);
    assert.equal((await admin('POST','/api/admin/deposit',{id:1,action:'approve'})).s,403);
    assert.equal((await admin('POST','/api/admin/withdrawal',{id:1,action:'paid'})).s,403);
    console.log('PASS: credits-only mode blocks deposits, withdrawals, payout, and self-credit; admin credits + server-settled games work');
  } finally { await new Promise(r=>server.close(r)); fs.rmSync(tmp,{recursive:true,force:true}); }
})().catch(e=>{ console.error(e); process.exit(1); });
