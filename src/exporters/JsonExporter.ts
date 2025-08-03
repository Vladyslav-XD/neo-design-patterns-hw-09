import fs from 'fs';
import path from 'path';
import { DataExporter } from './DataExporter';

export class JsonExporter extends DataExporter {
    protected render(): void {
        this.result = JSON.stringify(this.data, null, 2);
    }

    protected save(): void {
        const outputPath = './dist/users.json';
        const dir = path.dirname(outputPath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(outputPath, this.result);
    }
}
