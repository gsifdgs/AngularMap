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
export interface PointData {
  id: number;
  name: string;
  type: string;
  description: string;
  x: number;
  y: number;
  active: boolean;
}
export interface SaveData{
  name: string;
  description: string;
  x: number;
  y: number;
  type: string;
  active: boolean;
}