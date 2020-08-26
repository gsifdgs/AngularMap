export class Data {
  public id: number;
    public name: string;
    public description: string;
    public type: string;
  
    constructor(id: number, name: string, desc: string, type: string) {
      this.id = id;
      this.name = name;
      this.description = desc;
      this.type = type;
    }
  }