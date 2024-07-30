import { umzug } from '..';

const command = process.argv[2];

console.log(command);

if (command === '--runAll') {
    runAllMigrations();
}

async function runAllMigrations() {
    const migrations = await umzug.up().catch((err) => console.log(err));
    const pending = await umzug.pending().catch((err) => console.log(err));
    console.log(`\x1b[34m ${migrations} files ran. \x1b[0m`);
    console.log(pending);
}
