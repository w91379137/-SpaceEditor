import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-iframe-view',
  templateUrl: './iframe-view.component.html',
  styleUrls: ['./iframe-view.component.scss']
})
export class IframeViewComponent implements OnInit {

  isShow = false;

  private purl = '';
  set url(value: string) {
    this.purl = value;
    this.transform(value);
  }
  get url() {
    return this.purl;
  }

  securityURL: any;

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor(
    private sanitizer: DomSanitizer,
  ) {

  }

  ngOnInit() {

  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  transform(url) {
    this.securityURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
