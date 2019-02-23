import { Entry } from '../shared/entry.model';

export class Category {
    constructor(
        public category: string,
        public uID:string,
        public slug:string,
        public updatedAt =  Math.round((new Date()).getTime() / 1000),
        public groupID = 'digistorm',
        public entries:[] = []
    ) { }

}