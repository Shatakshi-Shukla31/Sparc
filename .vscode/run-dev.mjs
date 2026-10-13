import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const url='http://127.0.0.1:5173';
async function running() {
  try {
    const response=await fetch(url,{signal:AbortSignal.timeout(1000)});
    return (await response.text()).includes('SPARC 2026') ? 'mdwh' : 'other';
  } catch { return 'none'; }
}
const existing=await running();
if(existing==='mdwh') console.log(`SPARC ready: ${url} (already running)`);
else if(existing==='other') { console.error('ERROR: Port 5173 is used by another website. Stop it before running SPARC.'); process.exitCode=1; }
else {
  console.log('SPARC: starting local React website...');
  const child=spawn(process.execPath,[fileURLToPath(new URL('../node_modules/vite/bin/vite.js',import.meta.url)),'--host','127.0.0.1','--port','5173','--strictPort'],{stdio:'inherit'});
  const timer=setInterval(async()=>{if(await running()==='mdwh'){clearInterval(timer);console.log(`SPARC ready: ${url}`);}},500);
  child.on('error',error=>{clearInterval(timer);console.error('ERROR: '+error.message);process.exitCode=1;});
  child.on('exit',code=>{clearInterval(timer);process.exitCode=code??0;});
  process.on('SIGINT',()=>child.kill('SIGINT'));
  process.on('SIGTERM',()=>child.kill('SIGTERM'));
}
