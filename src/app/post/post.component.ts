import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { PostObject } from './post.model';
import moment from 'moment/moment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  timePassed = '0';
  timeAsSeconds = 0;

  @Input() post: PostObject = new PostObject('');
  @Output() onRemovePost: EventEmitter<PostObject> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.showPostDuration();
  }

  showPostDuration() {
    let duration = moment.duration(moment().diff(moment(this.post.postDate)));
    this.timeAsSeconds = duration.asSeconds();

    if(this.timeAsSeconds > 59) {
      return;
    }

    var id = setInterval(()=> {
      let duration = moment.duration(moment().diff(moment(this.post.postDate)));
      this.timeAsSeconds = duration.asSeconds();
      if(this.timeAsSeconds > 59) {
        clearInterval(id);
      }
      this.timePassed = this.timeAsSeconds.toFixed(0);
    }, 1000);
  }

  removePost() {
    if (confirm("Remove selected Post?")) {
      this.onRemovePost.emit(this.post);
    }
  }
}
