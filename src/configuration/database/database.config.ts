import { Sequelize } from 'sequelize-typescript';
import { User } from '../../database/models/user.model';
import { Dialect } from 'sequelize';
import { logger } from '../../logger';

const databaseLogger = logger.child({ component: 'sequelize' });

const connection = new Sequelize({
    dialect: (process.env.DB_DIALECT || 'mysql') as Dialect,
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'sample_sequelize',
    logging: (query) => {
        if (process.env.DB_LOGGER === 'true') {
            databaseLogger.debug({ query }, 'Executed SQL query');
        }
    },
    models: [User],
    port: (process.env.DB_PORT || 3306) as number,
});

export default connection;
