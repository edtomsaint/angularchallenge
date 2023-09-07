import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { PostObject } from "./post/post.model";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly messagesKey = 'messageHistory';
  private postMessages: BehaviorSubject<PostObject[]> = new BehaviorSubject<PostObject[]>([]);

  constructor() { 
  }

  public getDataFromStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  public saveDataToStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public removeDataFromStorage(key: string) {
    localStorage.removeItem(key);
  }

  getMessageHistory(): Observable<PostObject[]> {
    const messagesHistory = this.getDataFromStorage(this.messagesKey);
    this.postMessages.next(messagesHistory ? JSON.parse(messagesHistory) : '');
    return this.postMessages.asObservable();
  }

  addMessage(newMessage: string) {
    let messageHistory = this.postMessages.value;
    messageHistory.push(new PostObject(newMessage));
    this.saveMessage(messageHistory);
  }

  saveMessage(messageHistory: PostObject[]) {
    this.postMessages.next(messageHistory);
    localStorage.setItem(this.messagesKey, JSON.stringify(messageHistory));
  }
}