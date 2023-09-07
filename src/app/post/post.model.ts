export class PostObject {

    message: string;
    postDate: Date;
  
    constructor(message: string) {
      this.message = message;
      this.postDate = new Date();
    }
}