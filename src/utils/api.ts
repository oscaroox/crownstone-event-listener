import got from 'got';
import { config } from '../config';
import { SwitchStateUpdateEvent } from '../interfaces';
import { User } from '../database/schemas/User';
import { smarthome, SmartHomeV1ReportStateRequest } from 'actions-on-google';

const cloudHttp = got.extend({
    prefixUrl: config.CROWNSTONE_CLOUD_URL,
    responseType: 'json',
});

const lambdaHttp = cloudHttp.extend({
    prefixUrl: config.LAMBDA_URL,
    headers: {
        'x-api-key': config.API_GATEWAY_KEY,
    },
    responseType: 'json',
    hooks: {
        beforeError: [
            error => {
                console.log(JSON.stringify(error));
                return error;
            },
        ],
    },
});

const smarthomeApp = smarthome({
    jwt: config.GOOGLE_SERVICE_KEY,
    debug: true,
});

export const reportState = (userId: string, event: SwitchStateUpdateEvent) => {
    const stone = event.crownstone;
    console.log(event);
    const newState: SmartHomeV1ReportStateRequest = {
        agentUserId: userId,
        requestId: Math.random().toString(),
        payload: {
            devices: {
                states: {
                    [stone.id]: {
                        on: stone.switchState > 0,
                        brightness: stone.switchState * 100,
                        online: true,
                    },
                },
            },
        },
    };
    console.log(`new state`);
    console.log(newState.payload.devices);
    return smarthomeApp.reportState(newState);
};

export const requestSync = (userId: string) => {
    return smarthomeApp.requestSync(userId);
};

export const getApi = () => {
    // homegraphApi
    const lambda = {
        reportState: (user: User, event: SwitchStateUpdateEvent) => {
            return lambdaHttp
                .post('/reportstate', {
                    json: {
                        userId: user._id,
                        device: { id: event.crownstone.id },
                    },
                })
                .catch(err => {
                    console.log(err);
                });
        },
        reportSync: (user: User) => {
            return lambdaHttp
                .post('/requestsync', {
                    json: {
                        userId: user._id,
                    },
                })
                .catch(err => {
                    console.log(err);
                });
        },
    };

    return { lambda };
};
