import fs from 'fs';
import { spawn } from 'child_process';

const logStream = fs.createWriteStream('backend_debug.log', { flags: 'a' });

const backend = spawn('npm.cmd', ['run', 'dev'], {
    cwd: 'RepasseCarros/backend',
    shell: true
});

backend.stdout.on('data', (data) => {
    const line = data.toString();
    console.log(line);
    logStream.write(line);
});

backend.stderr.on('data', (data) => {
    const line = data.toString();
    console.error(line);
    logStream.write(line);
});

console.log('Backend started with logging to backend_debug.log');
