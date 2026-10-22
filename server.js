'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = __dirname;
const dataDir = process.env.DATA_DIR || path.join(root, 'data');
const dbFile = path.join(dataDir, 'iq63-data.json');
const sessionSecret = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
const prod = process.env.NODE_ENV === 'production';
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon','.woff':'font/woff','.woff2':'font/woff2','.ttf':'font/ttf'};
fs.mkdirSync(dataDir,{recursive:true});
function loadDB(){try{const d=JSON.parse(fs.readFileSync(dbFile,'utf8'));return d&&d.users?d:{users:{},history:[]}}catch{return {users:{},history:[]}}}
let db=loadDB();
function saveDB(){const tmp=dbFile+'.tmp';fs.writeFileSync(tmp,JSON.stringify(db));fs.renameSync(tmp,dbFile)}
function json(res,status,obj,extra={}){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...extra});res.end(JSON.stringify(obj))}
function cookie(req,name){const raw=req.headers.cookie||'';for(const part of raw.split(';')){const i=part.indexOf('=');if(i>0&&part.slice(0,i).trim()===name)return decodeURIComponent(part.slice(i+1).trim())}return ''}
function makeSession(phone){const payload=Buffer.from(JSON.stringify({phone,exp:Date.now()+7*864e5})).toString('base64url');const sig=crypto.createHmac('sha256',sessionSecret).update(payload).digest('base64url');return payload+'.'+sig}
function getUser(req){try{const [payload,sig]=cookie(req,'iq63_session').split('.');if(!payload||!sig)return null;const expected=crypto.createHmac('sha256',sessionSecret).update(payload).digest();const got=Buffer.from(sig,'base64url');if(got.length!==expected.length||!crypto.timingSafeEqual(got,expected))return null;const p=JSON.parse(Buffer.from(payload,'base64url').toString());if(p.exp<Date.now())return null;return db.users[p.phone]||null}catch{return null}}
function publicUser(u){return {phone:u.phone,createdAt:u.createdAt,balance:u.balance,inviteCode:u.inviteCode,transactions:u.transactions.slice(-40).reverse()}}
function sessionCookie(token){return `iq63_session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7*86400}${prod?'; Secure':''}`}
function clearCookie(){return `iq63_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${prod?'; Secure':''}`}
function body(req){return new Promise((resolve,reject)=>{let s='',n=0;req.on('data',c=>{n+=c.length;if(n>16384){reject(new Error('Request too large'));req.destroy();return}s+=c});req.on('end',()=>{try{resolve(s?JSON.parse(s):{})}catch{reject(new Error('Invalid JSON'))}});req.on('error',reject)})}
const limits=new Map();function rateLimit(req,res){const ip=(req.headers['x-forwarded-for']||req.socket.remoteAddress||'unknown').split(',')[0].trim();const key=ip+':'+req.url.split('?')[0],now=Date.now(),r=limits.get(key)||{n:0,start:now};if(now-r.start>60000){r.n=0;r.start=now}r.n++;limits.set(key,r);if(r.n>35){json(res,429,{error:'Too many requests. Please wait a minute.'});return false}return true}
function addTx(u,kind,title,amount,detail=''){u.transactions.push({id:crypto.randomUUID(),kind,title,amount,detail,at:new Date().toISOString()});if(u.transactions.length>200)u.transactions=u.transactions.slice(-200)}
function validPhone(p){return /^\d{10}$/.test(String(p||''))}
function hashPassword(password,salt){return crypto.scryptSync(password,salt,64).toString('hex')}
const server=http.createServer(async(req,res)=>{
  let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{return json(res,400,{error:'Bad request'})}
  if(pathname==='/healthz'){res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});return res.end('ok')}
  if(pathname.startsWith('/api/')){
    if(!rateLimit(req,res))return;
    if(req.method==='POST'&&['/api/register','/api/login','/api/logout','/api/coinflip','/api/wallet/request'].includes(pathname)){
      let b;try{b=await body(req)}catch(e){return json(res,400,{error:e.message})}
      if(pathname==='/api/register'){
        const phone=String(b.phone||'').replace(/\D/g,'');const password=String(b.password||'');if(!validPhone(phone))return json(res,400,{error:'Enter a valid 10-digit mobile number.'});if(password.length<8||password.length>128)return json(res,400,{error:'Password must be 8–128 characters.'});if(db.users[phone])return json(res,409,{error:'This mobile number is already registered. Please log in.'});
        const salt=crypto.randomBytes(16).toString('hex');const invite='IQ'+crypto.randomBytes(4).toString('hex').toUpperCase();const u={phone,salt,passwordHash:hashPassword(password,salt),createdAt:new Date().toISOString(),balance:1000,inviteCode:invite,transactions:[]};addTx(u,'credit','Welcome demo credits',1000,'Virtual credits only; no cash value');db.users[phone]=u;saveDB();return json(res,201,{user:publicUser(u),message:'Account created. 1,000 demo credits added.'},{'Set-Cookie':sessionCookie(makeSession(phone))});
      }
      if(pathname==='/api/login'){
        const phone=String(b.phone||'').replace(/\D/g,'');const password=String(b.password||'');const u=db.users[phone];if(password.length>128||!u||!crypto.timingSafeEqual(Buffer.from(hashPassword(password,u.salt),'hex'),Buffer.from(u.passwordHash,'hex')))return json(res,401,{error:'Mobile number or password is incorrect.'});return json(res,200,{user:publicUser(u)},{'Set-Cookie':sessionCookie(makeSession(phone))});
      }
      if(pathname==='/api/logout')return json(res,200,{ok:true},{'Set-Cookie':clearCookie()});
      const u=getUser(req);if(!u)return json(res,401,{error:'Please log in to continue.'});
      if(pathname==='/api/coinflip'){
        const choice=String(b.choice||'');const amount=Number(b.amount);if(!['heads','tails'].includes(choice))return json(res,400,{error:'Choose Heads or Tails.'});if(!Number.isSafeInteger(amount)||amount<1||amount>10000)return json(res,400,{error:'Enter a whole-number bet from 1 to 10,000 credits.'});if(amount>u.balance)return json(res,400,{error:'Not enough demo credits.'});
        const result=crypto.randomInt(0,2)===0?'heads':'tails';u.balance-=amount;let won=result===choice;if(won)u.balance+=amount*2;addTx(u,'game',`Coin Flip: ${result.toUpperCase()} · ${won?'WIN':'LOSS'}`,won?amount:-amount,`Picked ${choice}; bet ${amount} virtual credits`);saveDB();return json(res,200,{result,choice,won,balance:u.balance,user:publicUser(u)});
      }
      if(pathname==='/api/wallet/request'){
        const kind=String(b.kind||'');const amount=Number(b.amount);if(!['deposit','withdraw'].includes(kind))return json(res,400,{error:'Invalid request type.'});if(!Number.isSafeInteger(amount)||amount<1||amount>100000)return json(res,400,{error:'Enter a whole amount from 1 to 100,000.'});if(kind==='withdraw')return json(res,400,{error:'Demo credits have no cash value and cannot be withdrawn.'});return json(res,400,{error:'Real-money deposits are not enabled. This wallet uses demo credits only.'});
      }
    }
    if(req.method==='GET'&&pathname==='/api/me'){const u=getUser(req);return u?json(res,200,{user:publicUser(u)}):json(res,401,{error:'Not logged in.'})}
    return json(res,404,{error:'API route not found.'});
  }
  const relative=pathname.replace(/^\/+/, '');const file=path.resolve(root,relative||'index.html');if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden')}
  fs.stat(file,(err,stat)=>{if(!err&&stat.isFile())return send(file);if(!path.extname(pathname)||pathname.endsWith('/'))return send(path.join(root,'index.html'));res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Not found')});
  function send(p){fs.readFile(p,(err,data)=>{if(err){res.writeHead(500);return res.end('Could not read file')}res.writeHead(200,{'Content-Type':mime[path.extname(p).toLowerCase()]||'application/octet-stream','Cache-Control':path.extname(p)==='.html'?'no-cache':'public, max-age=3600','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Content-Security-Policy':"default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"});res.end(data)})}
});
const port=Number(process.env.PORT||4173);server.listen(port,'0.0.0.0',()=>console.log(`IQ63 server listening on port ${port}; data directory: ${dataDir}`));
