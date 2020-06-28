import * as jwt from './utils/jwt';

async function cli() {
    const token = await jwt.generateToken({});

    console.log(`JWT token: ${token}`);
}

cli();
