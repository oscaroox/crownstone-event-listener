export interface User {
    id: string;
}

interface NameIdSet {
    id: string;
    name: string;
}

export type Sphere = {
    id: string;
    uid: number;
    name: string;
};

export type Ability = {
    type: string;
    enabled: boolean;
    syncedToCrownstone: boolean;
};

export type Crownstone = {
    id: string;
    uid: number;
    name: string;
    switchState: number;
    macAddress: string;
};

export type StartEvent = {
    type: 'system';
    subType: 'TOKEN_EXPIRED' | 'STREAM_START' | string;
    code: number;
    message: string;
};

export type CommandEvent = {
    type: 'command';
    subType: 'switchCrownstone';
    sphere: Sphere;
    crownstone: Crownstone;
};

export type SwitchStateUpdateEvent = {
    type: 'switchStateUpdate';
    subType: 'stone';
    sphere: Sphere;
    crownstone: Crownstone;
};

export type AbilityChangeEvent = {
    type: 'abilityChange';
    subType: 'dimming';
    sphere: Sphere;
    stone: Crownstone;
    ability: Ability;
};

export type DataChangeEvent = {
    type: 'dataChange';
    subType: 'users' | 'spheres' | 'stones' | 'locations';
    operation: 'create' | 'delete' | 'update';
    sphere: Sphere;
    changedItem: NameIdSet;
};

export type EventType = StartEvent | CommandEvent | SwitchStateUpdateEvent | DataChangeEvent | AbilityChangeEvent;

export type UnPromisify<T> = T extends Promise<infer U> ? U : T;
