export class Entry {
    constructor(
        public title:string,
        public uID:string,
        public createdAt =  Math.round((new Date()).getTime() / 1000),
        // public decription:string,
        public displayed = 1,
        
    ) {}
}


//title:'funnel topic 1',description:'Description',displayed:1},{title:'topic 2',description:'Description',displayed:2}],id:1},
