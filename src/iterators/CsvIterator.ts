import fs from 'fs';
import { UserData } from '../data/UserData';

export class CsvIterator implements Iterable<UserData> {
    private users: UserData[] = [];

    constructor(filepath: string) {
        const content = fs.readFileSync(filepath, 'utf-8');
        const lines = content.trim().split('\n');
        const [, ...rows] = lines; // skip header
        this.users = rows.map(line => {
            const [id, name, email, phone] = line.split(',');
            return { id: +id, name, email, phone };
        });
    }

    [Symbol.iterator](): Iterator<UserData> {
        let i = 0;
        const users = this.users;
        return {
            next(): IteratorResult<UserData> {
                if (i < users.length) {
                    return { value: users[i++], done: false };
                } else {
                    return { value: null, done: true } as any;
                }
            },
        };
    }
}