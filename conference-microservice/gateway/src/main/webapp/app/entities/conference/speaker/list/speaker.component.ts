import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISpeaker } from '../speaker.model';
import { SpeakerService } from '../service/speaker.service';
import { SpeakerDeleteDialogComponent } from '../delete/speaker-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-speaker',
  templateUrl: './speaker.component.html',
})
export class SpeakerComponent implements OnInit {
  speakers?: ISpeaker[];
  isLoading = false;

  constructor(protected speakerService: SpeakerService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.speakerService.query().subscribe(
      (res: HttpResponse<ISpeaker[]>) => {
        this.isLoading = false;
        this.speakers = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ISpeaker): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(speaker: ISpeaker): void {
    const modalRef = this.modalService.open(SpeakerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.speaker = speaker;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
