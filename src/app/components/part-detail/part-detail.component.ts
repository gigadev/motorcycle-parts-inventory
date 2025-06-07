import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartsService } from '../../services/parts.service';
import { Part } from '../../models/part.model';

@Component({
  selector: 'app-part-detail',
  templateUrl: './part-detail.component.html',
  styleUrls: ['./part-detail.component.css']
})
export class PartDetailComponent implements OnInit {
  part: Part | null = null;

  constructor(
    private route: ActivatedRoute,
    private partsService: PartsService
  ) {}

  ngOnInit(): void {
    this.getPartDetail();
  }

  getPartDetail(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;
    if (id !== null) {
      this.partsService.getPartById(id).subscribe(part => {
        this.part = part;
      });
    }
  }
}