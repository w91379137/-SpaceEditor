import { Component } from '@angular/core';
import { PodcastCenterService } from './service/podcast-center/podcast-center.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private podcastCenter: PodcastCenterService,
  ) {

  }
}
