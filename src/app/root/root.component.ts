import { Component, OnInit } from '@angular/core';
import { ThingService } from '../service/thing.service';

@Component({
  selector: 'app-main',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  constructor(private thingService: ThingService) { }

  ngOnInit() {
  }

}
