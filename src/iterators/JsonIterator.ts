import fs from 'fs';
import { UserData } from '../data/UserData';

export class JsonIterator implements Iterable<UserData> {
    private users: UserData[] = [];

    constructor(filepath: string) {
        const content = fs.readFileSync(filepath, 'utf-8');
        this.users = JSON.parse(content);
    }

    *[Symbol.iterator](): Generator<UserData> {
        for (const user of this.users) {
            yield user;
        }
    }
}
