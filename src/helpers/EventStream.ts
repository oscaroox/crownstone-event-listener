import { EventType } from '../interfaces';
import got from 'got';
import { config } from '../config';
import { ProxyStream } from 'got/dist/source/as-stream';
import debounce from 'lodash.debounce';

export class EventStream {
    private stream!: ProxyStream;

    constructor(private accessToken: string, private cb: (event: EventType) => Promise<void>) {}

    onData = async (data: any) => {
        const str = Buffer.from(data).toString();
        if (str && str.substring(0, 4) === 'data') {
            const jsonString = str.split('data:').pop() as string;
            const result = JSON.parse(jsonString) as EventType;
            await this.cb(result);
        }
    };

    start() {
        const stream = (this.stream = got.stream({
            url: config.CROWNSTONE_EVENTS_URL,
            searchParams: {
                accessToken: this.accessToken,
            },
        }));

        stream.on('data', debounce(this.onData, 500));

        stream.on('error', error => {
            console.error(error);
        });

        stream.on('end', () => {
            console.log('Stream ended');
        });
    }

    end() {
        this.stream.destroy();
    }
}
