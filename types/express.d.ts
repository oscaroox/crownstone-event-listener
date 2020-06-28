import { createConnection } from '../src/database/db';
import { UnPromisify } from '../src/interfaces';

declare module 'express-serve-static-core' {
    interface Request {
        db: UnPromisify<ReturnType<typeof createConnection>>;
    }
}
