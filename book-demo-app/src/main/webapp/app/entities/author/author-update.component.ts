import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAuthor, Author } from 'app/shared/model/author.model';
import { AuthorService } from './author.service';

@Component({
  selector: 'jhi-author-update',
  templateUrl: './author-update.component.html',
})
export class AuthorUpdateComponent implements OnInit {
  isSaving = false;
  birthDateDp: any;

  editForm = this.fb.group({
    id: [],
    fname: [null, [Validators.required]],
    lname: [null, [Validators.required]],
    email: [null, [Validators.required]],
    birthDate: [null, [Validators.required]],
  });

  constructor(protected authorService: AuthorService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ author }) => {
      this.updateForm(author);
    });
  }

  updateForm(author: IAuthor): void {
    this.editForm.patchValue({
      id: author.id,
      fname: author.fname,
      lname: author.lname,
      email: author.email,
      birthDate: author.birthDate,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const author = this.createFromForm();
    if (author.id !== undefined) {
      this.subscribeToSaveResponse(this.authorService.update(author));
    } else {
      this.subscribeToSaveResponse(this.authorService.create(author));
    }
  }

  private createFromForm(): IAuthor {
    return {
      ...new Author(),
      id: this.editForm.get(['id'])!.value,
      fname: this.editForm.get(['fname'])!.value,
      lname: this.editForm.get(['lname'])!.value,
      email: this.editForm.get(['email'])!.value,
      birthDate: this.editForm.get(['birthDate'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAuthor>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
