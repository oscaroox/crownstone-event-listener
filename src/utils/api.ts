import { config } from '../config';
import { SwitchStateUpdateEvent } from '../interfaces';
import { smarthome, SmartHomeV1ReportStateRequest } from 'actions-on-google';

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
