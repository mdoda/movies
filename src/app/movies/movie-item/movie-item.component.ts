import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() movie: Movie;
  toggle = true;
  status = 'Enable';
  constructor() { }

  ngOnInit() {
  }

  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
}
}
