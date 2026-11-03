const assert=require('assert'),fs=require('fs'),os=require('os'),path=require('path'),{spawn}=require('child_process'),net=require('net');
(async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rk-unlock-'));
 const port=await new Promise((resolve,reject)=>{const s=net.createServer();s.listen(0,'127.0.0.1',()=>{const p=s.address().port;s.close(()=>resolve(p))});s.on('error',reject)});
 const base=`http://127.0.0.1:${port}`;
 const child=spawn(process.execPath,['server.js'],{cwd:process.cwd(),env:{...process.env,PORT:String(port),APP_URL:base,DATA_FILE:path.join(dir,'data.json'),ADMIN_EMAIL:'admin@unlock.test',ADMIN_PASSWORD:'AdminPass123',NODE_ENV:'test',REQUIRE_PERSISTENT_STORAGE:'false'},stdio:['ignore','pipe','pipe']});let logs='';child.stdout.on('data',x=>logs+=x);child.stderr.on('data',x=>logs+=x);
 try{
  for(let i=0;i<80;i++){if(child.exitCode!==null)throw Error(logs);try{if((await fetch(base+'/health')).ok)break}catch{}await new Promise(r=>setTimeout(r,100))}
  const post=async(route,b,c)=>fetch(base+'/api/'+route,{method:'POST',headers:{'content-type':'application/json',...(c?{cookie:c}:{})},body:JSON.stringify(b)});
  const cookie=r=>r.headers.get('set-cookie').split(';')[0];
  let r=await post('login',{email:'admin@unlock.test',password:'AdminPass123'});assert.equal(r.status,200);const admin=cookie(r);
  r=await post('admin/business-config',{price:100,fee:0,minWd:500,minDirectRefs:3,withdrawalDay:'any'},admin);assert.equal(r.status,200,await r.text());
  const reg=async(name,email,phone,ref)=>{const z=await post('register',{name,email,phone,password:'StrongPass123',ref});assert.equal(z.status,200,await z.text());return cookie(z)};
  let ref=await reg('Referrer','ref@unlock.test','9876500001','ADMIN0');
  let refState=await (await fetch(base+'/api/state',{headers:{cookie:ref}})).json();
  let target=await reg('Target','target@unlock.test','9876500002',refState.me.ref);
  let targetState=await (await fetch(base+'/api/state',{headers:{cookie:target}})).json();
  // Give referrer a real claimed wallet bonus using existing reward flow.
  r=await post('admin/user-bonus',{uid:refState.me.id,amount:150,reason:'Test wallet funding'},admin);assert.equal(r.status,200,await r.text());
  refState=await (await fetch(base+'/api/state',{headers:{cookie:ref}})).json();
  const bonus=refState.me.bonuses[0];r=await post('bonus/claim',{id:bonus.id},ref);assert.equal(r.status,200,await r.text());
  r=await post('referral/status',{uid:targetState.me.id},ref);assert.equal(r.status,200);let status=await r.json();assert.equal(status.canWalletUnlock,true);assert.equal(status.walletSufficient,true);assert.equal(status.unlockPrice,100);
  r=await post('referral/wallet-unlock',{uid:targetState.me.id},ref);let result=await r.json();assert.equal(r.status,200,JSON.stringify(result));assert.equal(result.amount,100);assert.equal(result.balance,50);
  refState=await (await fetch(base+'/api/state',{headers:{cookie:ref}})).json();targetState=await (await fetch(base+'/api/state',{headers:{cookie:target}})).json();
  assert.equal(refState.me.wallet.balance,50);assert.equal(refState.me.wallet.entries.some(x=>x.kind==='walletDebit'&&x.amt===-100),true);assert.equal(targetState.me.referralUnlockAt>0,true);assert.ok(targetState.me.task,'referred task should now be active');
  r=await post('referral/wallet-unlock',{uid:targetState.me.id},ref);assert.equal(r.status,409,'duplicate unlock blocked');
  // Second referrer has no balance. Referred user completes the existing QR/UTR + admin verify flow.
  const poor=await reg('Poor Referrer','poor@unlock.test','9876500003','ADMIN0');let poorState=await (await fetch(base+'/api/state',{headers:{cookie:poor}})).json();
  const qrTarget=await reg('QR Target','qrtarget@unlock.test','9876500004',poorState.me.ref);let qrState=await (await fetch(base+'/api/state',{headers:{cookie:qrTarget}})).json();
  r=await post('referral/wallet-unlock',{uid:qrState.me.id},poor);assert.equal(r.status,409);const insuff=await r.json();assert.equal(insuff.code,'INSUFFICIENT_BALANCE');
  r=await post('admin/payment',{slot:0,upi:'test@upi',payee:'Test Payee',qr:'data:image/png;base64,aGVsbG8='},admin);assert.equal(r.status,200,await r.text());
  r=await post('admin/settings',{telegramJoin:'https://t.me/test',telegramSupport:'https://t.me/test',authSupport:'https://t.me/test',upiOpenApp:true,paymentMode:'qr'},admin);assert.equal(r.status,200,await r.text());
  r=await post('pay',{slot:0,utr:'ABC123456789'},qrTarget);const payResult=await r.json();assert.equal(r.status,200,JSON.stringify(payResult));const payment=payResult.payment;
  r=await post('admin/pay',{id:payment.id,status:'Verified'},admin);assert.equal(r.status,200,await r.text());
  qrState=await (await fetch(base+'/api/state',{headers:{cookie:qrTarget}})).json();assert.ok(qrState.me.task,'QR verified user should have active tasks');
  poorState=await (await fetch(base+'/api/state',{headers:{cookie:poor}})).json();assert.equal(poorState.me.wallet.balance,100,'existing referral payment commission should still be credited');assert.equal(poorState.me.wallet.entries.some(x=>x.kind==='walletDebit'),false,'QR payment must not create a wallet debit for the referrer');
  console.log('Referral unlock integration: OK (wallet debit, referred task activation, duplicate prevention, insufficient-balance handoff, existing QR submission + admin verification, no referrer debit on QR path).');
 }finally{child.kill('SIGTERM');await new Promise(r=>child.once('exit',r));fs.rmSync(dir,{recursive:true,force:true})}
})().catch(e=>{console.error(e.stack);process.exitCode=1});
