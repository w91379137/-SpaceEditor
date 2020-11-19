import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ControlCenterService } from 'src/app/service/control-center/control-center.service';

@Component({
  selector: 'app-iframe-view',
  templateUrl: './iframe-view.component.html',
  styleUrls: ['./iframe-view.component.scss']
})
export class IframeViewComponent implements OnInit {

  lastURL = '';
  securityURL: any;

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor(
    public controlCenter: ControlCenterService,
    private sanitizer: DomSanitizer,
  ) {

  }

  ngOnInit() {

  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  // https://stackoverflow.com/questions/39429293/url-sanitization-is-causing-refresh-of-the-embedded-youtube-video
  get checkURL() {

    if (this.lastURL !== this.controlCenter.iframeURL) {
      this.securityURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.controlCenter.iframeURL);
      this.lastURL = this.controlCenter.iframeURL;
    }
    return true;
  }
}
