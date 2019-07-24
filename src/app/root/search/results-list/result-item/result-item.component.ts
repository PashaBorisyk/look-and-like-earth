import {Component, Input, OnInit} from '@angular/core';
import {Thing} from "../../../../class/thing";

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css']
})
export class ResultItemComponent implements OnInit {

  @Input() thing: Thing;
  description: boolean;

  constructor() { }

  ngOnInit() {
  }

}
