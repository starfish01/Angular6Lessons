export class Entry {
    constructor(
        public title:string,
        public uID:string,
        public slug:string,
        public updatedAt =  Math.round((new Date()).getTime() / 1000),
        public content:string = 'New Entry',
        public displayed = 1,
        public id:string = null,

        
    ) {}
}


//title:'funnel topic 1',description:'Description',displayed:1},{title:'topic 2',description:'Description',displayed:2}],id:1},
