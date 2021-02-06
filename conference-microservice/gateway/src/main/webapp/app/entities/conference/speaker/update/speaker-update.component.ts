import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISpeaker, Speaker } from '../speaker.model';
import { SpeakerService } from '../service/speaker.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ISession } from 'app/entities/conference/session/session.model';
import { SessionService } from 'app/entities/conference/session/service/session.service';

@Component({
  selector: 'jhi-speaker-update',
  templateUrl: './speaker-update.component.html',
})
export class SpeakerUpdateComponent implements OnInit {
  isSaving = false;
  sessions: ISession[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    email: [null, [Validators.required]],
    twitter: [null, [Validators.required]],
    bio: [null, [Validators.required]],
    bioContentType: [],
    sessions: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected speakerService: SpeakerService,
    protected sessionService: SessionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ speaker }) => {
      this.updateForm(speaker);

      this.sessionService.query().subscribe((res: HttpResponse<ISession[]>) => (this.sessions = res.body ?? []));
    });
  }

  updateForm(speaker: ISpeaker): void {
    this.editForm.patchValue({
      id: speaker.id,
      firstName: speaker.firstName,
      lastName: speaker.lastName,
      email: speaker.email,
      twitter: speaker.twitter,
      bio: speaker.bio,
      bioContentType: speaker.bioContentType,
      sessions: speaker.sessions,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(
          new EventWithContent<AlertError>('gatewayApp.error', { message: err.message })
        ),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const speaker = this.createFromForm();
    if (speaker.id !== undefined) {
      this.subscribeToSaveResponse(this.speakerService.update(speaker));
    } else {
      this.subscribeToSaveResponse(this.speakerService.create(speaker));
    }
  }

  private createFromForm(): ISpeaker {
    return {
      ...new Speaker(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      email: this.editForm.get(['email'])!.value,
      twitter: this.editForm.get(['twitter'])!.value,
      bioContentType: this.editForm.get(['bioContentType'])!.value,
      bio: this.editForm.get(['bio'])!.value,
      sessions: this.editForm.get(['sessions'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISpeaker>>): void {
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

  trackSessionById(index: number, item: ISession): number {
    return item.id!;
  }

  getSelectedSession(option: ISession, selectedVals?: ISession[]): ISession {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
