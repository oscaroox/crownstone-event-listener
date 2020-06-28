import { User } from './database/schemas/User';
import express from 'express';
import { config } from './config';
import * as db from './database/db';
import { UserRouter } from './routes/user.route';
import { authorize } from './middlewares/authorize.middleware';
import { initializeListeners, addListener } from './listeners';
const app = express();

export async function main() {
    const database = await db.createConnection();

    database.models.User.find({}, (err, users) => {
        if (err) {
            throw err;
        }

        initializeListeners(users);
    });

    app.use(express.json());
    app.use((req, res, next) => {
        req.db = database;
        next();
    });

    app.use('/users', authorize(), UserRouter);

    app.listen(config.SERVER_PORT, (err: any) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Server running at port ${config.SERVER_PORT}`);
    });
}

main().catch(err => console.error(err));

process.on('unhandledRejection', error => {
    // Will print "unhandledRejection err is not defined"
    console.error('unhandledRejection ', error);
    // process.exit(1);
});
