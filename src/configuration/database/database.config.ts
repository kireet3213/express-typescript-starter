import { Sequelize } from "sequelize-typescript";
import { User } from "../../database/models/user.model";
import { Dialect } from "sequelize";

const connection = new Sequelize({
    dialect: (process.env.DB_DIALECT || "mysql") as Dialect,
    host: (process.env.DB_HOST || "localhost") as string,
    username: (process.env.DB_USERNAME || "root") as string,
    password: (process.env.DB_PASSWORD || "password") as string,
    database: (process.env.DB_NAME || "sample_sequelize") as string,
    logging: (query)=>{        
        return process.env.DB_LOGGER === 'true' ? console.log('\x1b[35m%s\x1b[0m', query) : undefined        },
    models: [User],
    port: (process.env.DB_PORT || 3306) as number,
});

export default connection;
