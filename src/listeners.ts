import { EventType, DataChangeEvent, SwitchStateUpdateEvent, AbilityChangeEvent } from './interfaces';
import { EventStream } from './helpers/EventStream';
import { User } from './database/schemas/User';
import { reportState, requestSync } from './utils/api';

const listeners = new Map<string, EventStream>();

export const addListener = (user: User) => {
    console.log(`adding user with id ${user._id} to listeners`);
    listeners.set(user._id, createListener(user));
};

export const removeListener = (userId: string) => {
    const listener = listeners.get(userId);
    if (listener) {
        listeners.delete(userId);
        listener.end();
    }
};

export const initializeListeners = (users: User[]) => {
    users.forEach(user => {
        addListener(user);
    });
};

export const clearListeners = () => {
    listeners.forEach(v => v.end());
};

const canTriggerReportState = (event: EventType): event is SwitchStateUpdateEvent =>
    event.type === 'switchStateUpdate' && event.subType === 'stone';

const canTriggerRequestSync = (event: EventType): event is DataChangeEvent | AbilityChangeEvent =>
    (event.type === 'dataChange' &&
        event.subType === 'stones' &&
        (event.operation === 'create' || event.operation === 'delete')) ||
    (event.type === 'abilityChange' && event.subType === 'dimming');

const createListener = (user: User) => {
    const stream = new EventStream(user.accessToken, async event => {
        // for now we only handle the update event
        if (event.type === 'system') return;
        console.log({ event, user });
        if (canTriggerReportState(event)) {
            console.log(`reporting new state for user ${user._id} and device ${event.crownstone.id}`);
            try {
                await reportState(user._id, event);
            } catch (error) {
                console.log(error);
            }
        } else if (canTriggerRequestSync(event)) {
            console.log(`requesting new sync request for user ${user._id}`);
            try {
                await requestSync(user.id);
            } catch (error) {
                console.log(error);
            }
        }
    });
    stream.start();
    return stream;
};
