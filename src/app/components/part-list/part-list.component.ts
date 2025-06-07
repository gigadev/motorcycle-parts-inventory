import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartsService } from '../../services/parts.service';
import { Part } from '../../models/part.model';

@Component({
  selector: 'app-part-list',
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.css']
})
export class PartListComponent implements OnInit {
  parts: Part[] = [];
  showConfirmDialog = false;
  partToDelete: number | null = null;

  constructor(private partsService: PartsService, private router: Router) {}

  ngOnInit(): void {
    this.fetchParts();
  }

  fetchParts(): void {
    this.partsService.getParts().subscribe((data: Part[]) => {
      this.parts = data;
    });
  }

  confirmDelete(id: number): void {
    this.partToDelete = id;
    this.showConfirmDialog = true;
  }

  cancelDelete(): void {
    this.showConfirmDialog = false;
    this.partToDelete = null;
  }

  deleteConfirmed(): void {
    if (this.partToDelete !== null) {
      this.partsService.deletePart(this.partToDelete).subscribe(() => {
        this.fetchParts();
        this.showConfirmDialog = false;
        this.partToDelete = null;
      });
    }
  }

  editPart(part: Part): void {
    this.router.navigate(['/edit', part.id]);
  }
}