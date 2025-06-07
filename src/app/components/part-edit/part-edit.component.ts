import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartsService } from '../../services/parts.service';
import { Part } from '../../models/part.model';

@Component({
  selector: 'app-part-edit',
  templateUrl: './part-edit.component.html',
  styleUrls: ['./part-edit.component.css']
})
export class PartEditComponent implements OnInit {
  partForm: FormGroup;
  partId!: number;

  constructor(
    private fb: FormBuilder,
    private partsService: PartsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.partForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      name: ['', Validators.required],
      year: [null, Validators.required],
      imageUrl: ['', Validators.required],
      description: [''],
      quantity: [0, Validators.required],
      price: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.partId = idParam ? +idParam : 0;
    if (this.partId) {
      this.loadPart();
    }
  }

  loadPart(): void {
    this.partsService.getPartById(this.partId).subscribe(part => {
      this.partForm.patchValue({
        ...part,
        imageUrl: part.imageUrl || part.image_url,
        year: part.year
      });
    });
  }

  onSubmit(): void {
    if (this.partForm.valid) {
      const formValue = this.partForm.value;
      const part: any = {
        make: formValue.make,
        model: formValue.model,
        name: formValue.name,
        year: Number(formValue.year),
        description: formValue.description,
        image_url: formValue.imageUrl,
        quantity: Number(formValue.quantity),
        price: Number(formValue.price)
      };
      if (this.partId) {
        part.id = this.partId;
        this.partsService.updatePart(part).subscribe(() => {
          this.router.navigate(['/parts']);
        });
      } else {
        this.partsService.addPart(part).subscribe(() => {
          this.router.navigate(['/parts']);
        }, err => {
          alert('Failed to add part: ' + (err.error?.error || err.message));
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/parts']);
  }
}