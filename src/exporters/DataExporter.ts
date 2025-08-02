import axios from 'axios';
import fs from 'fs';
import { UserData } from '../data/UserData';

export abstract class DataExporter {
    protected data: UserData[] = [];
    protected result: string = '';

    public async export(): Promise<void> {
        await this.load();
        this.transform();
        this.beforeRender();
        this.render();
        this.afterRender();
        this.save();
    }

    protected async load(): Promise<void> {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.data = response.data;
    }

    protected transform(): void {
        this.data = this.data
            .map(({ id, name, email, phone }) => ({ id, name, email, phone }))
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    protected beforeRender(): void { }
    protected abstract render(): void;
    protected afterRender(): void { }
    protected abstract save(): void;
}
