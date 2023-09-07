import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatService } from '../chat.service';
import { PostObject } from '../post/post.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  postMaxLength = 130;
  charCount = 0;
  chatHistory: PostObject[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getMessageHistory().subscribe((results: PostObject[]) => {
      this.chatHistory = results;
    });
  }

  submit(formMessage: NgForm){
    this.chatService.addMessage(formMessage.value.postText);
    formMessage.reset();
  }

  removePost(index: number) {
    this.chatHistory.splice(index, 1)
    this.chatService.saveMessage(this.chatHistory);
  }

}
