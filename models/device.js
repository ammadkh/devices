export class Device {
  constructor(id, model, os, currentOwner, notes, imageUrl) {
    this.id = id;
    this.model = model;
    this.os = os;
    this.currentOwner = currentOwner;
    this.notes = notes;
    this.imageUrl = imageUrl;
  }
}
