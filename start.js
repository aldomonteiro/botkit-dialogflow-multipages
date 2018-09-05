var { spawn } = require('child_process');

var bucket = spawn('node', ['./webhook.js'], {
    stdio: 'inherit',
    cwd: __dirname
});

var pool = spawn('node', ['./bots-pool.js'], {
    stdio: 'inherit',
    cwd: __dirname
});
