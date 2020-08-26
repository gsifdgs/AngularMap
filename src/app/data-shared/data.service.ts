import {Data} from './data.model'

export class DataService{
    id1=0; id2=1; id3=2;
    private data: Data[] = [
        new Data(this.id1,'Road 51','WarmMedicine Hospital Road','Road'),
        new Data(this.id2,'Adios Bridge','Adios Trion Lake Bridge','Bridge'),
        new Data(this.id3,'Modorno Street','LookinGreat Market Street','Street'),
    ]
    getDatas(){
    return this.data.slice();
    }
    getData(index: number){
    return this.data[index];
    }
}
