import { Entry } from '../shared/entry.model';

export class Category {
    constructor(
        public category: string,
        public uID:string,
        public createdAt =  Math.round((new Date()).getTime() / 1000),
        public entries: Entry[] = [],

    ) { }

}