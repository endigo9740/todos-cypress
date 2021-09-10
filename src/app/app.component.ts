import { Component } from '@angular/core';
import { HttpService } from './http.service';

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
    public newTodo: string = '';
    public list: listItem[] = [];
    public filterValue: any;
    public posts: any[] = [];

    constructor(
        private httpService: HttpService
    ) {
        this.storageGet();
        this.getHttpPosts();
    }

    addTodo(): void {
        this.error = this.hasError();
        if (this.error === false) {
            const li: listItem = { status: 'active', label: this.newTodo };
            this.list.unshift(li);
            this.newTodo = '';

            this.getHttpPosts();
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
        if (this.newTodo === '') { return true; }
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

    // HTTP

    getHttpPosts(): void {
        this.httpService.getPosts().then((res: any) => this.posts = res);
    }
}
