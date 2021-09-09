import { Component } from '@angular/core';

interface listItem {
    status: string;
    label: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public error: boolean = false;
    public newTask: string = '';
    public list: listItem[] = [];
    public filterValue: any;

    constructor() {
        this.storageGet();
    }

    addTodo(): void {
        this.error = this.hasError();
        if (this.error === false) {
            const li: listItem = { status: 'active', label: this.newTask };
            this.list.unshift(li);
            this.newTask = '';
        }
        this.storageSet();
    }

    setStatus(li: listItem): void {
        li.status === 'active' ? li.status = 'done' : li.status = 'active';
        this.storageSet();
    }

    setFilter(v: any): void {
        this.filterValue = v;
    }

    // Validation

    hasError(): boolean {
        if (this.newTask === '') { return true; }
        return false;
    }

    // Local Storage

    storageGet(): any {
        const d: any = localStorage.getItem('list');
        if (d) { this.list = JSON.parse(d); }
    }

    storageSet(): void {
        localStorage.setItem('list', JSON.stringify(this.list));
    }

    storageClear(): void {
        this.list = [];
        localStorage.clear();
    }
}
