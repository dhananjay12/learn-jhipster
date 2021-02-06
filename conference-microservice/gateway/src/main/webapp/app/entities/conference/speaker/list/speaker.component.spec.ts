import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SpeakerService } from '../service/speaker.service';
import { Speaker } from '../speaker.model';

import { SpeakerComponent } from './speaker.component';

describe('Component Tests', () => {
  describe('Speaker Management Component', () => {
    let comp: SpeakerComponent;
    let fixture: ComponentFixture<SpeakerComponent>;
    let service: SpeakerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SpeakerComponent],
      })
        .overrideTemplate(SpeakerComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SpeakerComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(SpeakerService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Speaker(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.speakers?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});