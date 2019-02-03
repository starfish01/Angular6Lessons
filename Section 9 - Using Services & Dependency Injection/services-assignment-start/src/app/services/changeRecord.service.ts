export class ChangeRecordService {

    changes = [];

    addItemToChangeLog(name:string,newStatus:string) {

        this.changes.push({name,status:newStatus})

        this.printChangeLog();
    }

    printChangeLog(){
        console.log(this.changes)
    }

}