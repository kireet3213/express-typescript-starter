/* eslint-disable no-console */
import { umzug } from '..';

const command = process.argv[2];

if (command === '--runAll') {
    runAllMigrations();
}
if (command === '--deleteAll') {
    dropAllTables();
}

async function runAllMigrations() {
    console.log(`\x1b[34m Running all migrations \x1b[0m`);
    const migrations = await umzug.up().catch((err) => console.log(err));
    console.log(
        `\x1b[34m ${JSON.stringify(migrations?.map((file) => file.name))} \x1b[0m`
    );
}

async function dropAllTables() {
    console.log(`\x1b[34m Dropping tables \x1b[0m`);
    const deleted = await umzug.down({ to: 0 });
    console.log(
        `\x1b[34m ${JSON.stringify(deleted.map((file) => file.name))} \x1b[0m`
    );
}
