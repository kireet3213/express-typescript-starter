import { Umzug, SequelizeStorage } from 'umzug';
import '../env';
import connection from '../configuration/database/database.config';

export const umzug = new Umzug({
    migrations: { glob: 'database/migrations/*.ts' },
    context: connection.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize: connection }),
    logger: console,
});

export type Migration = typeof umzug._types.migration;
