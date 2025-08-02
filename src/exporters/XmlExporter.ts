import fs from 'fs';
import { DataExporter } from './DataExporter';

export class XmlExporter extends DataExporter {
    protected render(): void {
        const usersXml = this.data
            .map(u => `  <user>\n    <id>${u.id}</id>\n    <name>${u.name}</name>\n    <email>${u.email}</email>\n    <phone>${u.phone}</phone>\n  </user>`)
            .join('\n');
        this.result = `<?xml version="1.0" encoding="UTF-8"?>\n<users>\n${usersXml}\n</users>`;
    }

    protected override afterRender(): void {
        this.result += `\n<!-- Експорт згенеровано: ${new Date().toISOString()} -->`;
    }

    protected save(): void {
        fs.writeFileSync('./dist/users.xml', this.result);
    }
}