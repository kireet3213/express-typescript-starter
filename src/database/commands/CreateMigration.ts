import { appendFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const migrationContent = `import { DataTypes} from 'sequelize';
import type { Migration } from '..';

export const up: Migration = async function ({ context: queryInterface }) {
    await queryInterface.createTable('table_name', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });
};

export const down: Migration = async function ({ context: queryInterface }) {
    await queryInterface.dropTable('table_name');
};

module.exports = { up, down };`;

const fileNameArg = process.argv[2];

if (
    !fileNameArg ||
    !fileNameArg.includes('--name') ||
    fileNameArg.split('=')[1] === undefined
) {
    throw new Error(
        'Specify name argument to create migration. Example: npm run migration:create --name=sampleMigration'
    );
}
const fileName = fileNameArg.split('=')[1];

function createMigration() {
    appendFile(
        `${resolve(__dirname, '..') + '/' + Date.now() + fileName}.ts`,
        migrationContent
    );
}
createMigration();
