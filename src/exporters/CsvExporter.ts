import fs from 'fs';
import path from 'path';
import { DataExporter } from './DataExporter';

export class CsvExporter extends DataExporter {
    protected render(): void {
        const header = 'id,name,email,phone';
        const rows = this.data.map(u => `${u.id},${u.name},${u.email},${u.phone}`);
        this.result = [header, ...rows].join('\n');
    }

    protected save(): void {
        const outputPath = './dist/users.csv';
        const dir = path.dirname(outputPath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(outputPath, this.result);
    }
}
