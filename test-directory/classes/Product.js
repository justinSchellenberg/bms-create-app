

export default class Product {
  constructor(handle, id) {
    this._handle = handle;
    this._id = id;
  }
  static get staticVariable(){
    return "staticVariable";
  }
  get handle(){
    return this._handle;
  }
  set handle(handle){
    this._handle = handle;
  }
  get id(){
    return this._id;
  }
  set id(id){
    this._id = id;
  }
}