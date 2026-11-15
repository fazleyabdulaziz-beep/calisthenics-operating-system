// Cloudflare Worker proxy for Google Apps Script. Set GAS_URL and BRIDGE_SECRET as Worker secrets.
export default {
 async fetch(request, env) {
  const origin = request.headers.get('Origin') || '';
  const allowed = env.FRONTEND_ORIGIN || 'https://fazleyabdulaziz-beep.github.io';
  const cors = {'Access-Control-Allow-Origin': allowed, 'Vary':'Origin','Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Cache-Control':'no-store'};
  if (origin !== allowed) return new Response('Forbidden origin',{status:403});
  if (request.method === 'OPTIONS') return new Response(null,{status:204,headers:cors});
  if (request.method !== 'POST') return new Response('Method not allowed',{status:405,headers:cors});
  try {
   const raw = await request.text();
   if (raw.length > 30000) return new Response('Payload too large',{status:413,headers:cors});
   const payload = JSON.parse(raw);
   if (!payload || typeof payload.fn !== 'string' || !['loginUser','registerUser','getSessionUser','logoutUser','api'].includes(payload.fn)) throw Error('Invalid action');
   const upstream = await fetch(env.GAS_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({...payload,bridgeSecret:env.BRIDGE_SECRET}),redirect:'follow'});
   const body = await upstream.text();
   return new Response(body,{status:upstream.ok?200:502,headers:{...cors,'Content-Type':'application/json;charset=utf-8'}});
  } catch(e) { return new Response(JSON.stringify({ok:false,error:'Backend unavailable or invalid request'}),{status:502,headers:{...cors,'Content-Type':'application/json'}}); }
 }
};
