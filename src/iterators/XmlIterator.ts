import fs from 'fs';
import { UserData } from '../data/UserData';
import { DOMParser } from 'xmldom';

export class XmlIterator implements Iterable<UserData> {
    private users: UserData[] = [];

    constructor(filepath: string) {
        const xml = fs.readFileSync(filepath, 'utf-8');
        const doc = new DOMParser().parseFromString(xml, 'text/xml');
        const nodes = doc.getElementsByTagName('user');
        for (let i = 0; i < nodes.length; i++) {
            const userNode = nodes[i];
            const getText = (tag: string) => userNode.getElementsByTagName(tag)[0].textContent || '';
            this.users.push({
                id: +getText('id'),
                name: getText('name'),
                email: getText('email'),
                phone: getText('phone'),
            });
        }
    }

    *[Symbol.iterator](): Generator<UserData> {
        for (const user of this.users) {
            yield user;
        }
    }
}
