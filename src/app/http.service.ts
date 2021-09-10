import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor() {}

    getPosts(): any {
        return fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json())
    }
}
