import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {
  data = [
    {
      title: "Joshua Paulo",
      description: "Crazy Player"
    },
    {
      title: "Second Item",
      description: "This is the description for the second item."
    },
    {
      title: "Third Item",
      description: "This is the description for the third item."
    },
    {
      title: "Fourth Item",
      description: "This is the description for the fourth item."
    },
  ];
}
