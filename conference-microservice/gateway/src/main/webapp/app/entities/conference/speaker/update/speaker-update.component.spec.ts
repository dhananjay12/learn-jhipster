jest.mock('@angular/router');

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SpeakerService } from '../service/speaker.service';
import { Speaker } from '../speaker.model';
import { Session } from 'app/entities/conference/session/session.model';

import { SpeakerUpdateComponent } from './speaker-update.component';

describe('Component Tests', () => {
  describe('Speaker Management Update Component', () => {
    let comp: SpeakerUpdateComponent;
    let fixture: ComponentFixture<SpeakerUpdateComponent>;
    let service: SpeakerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SpeakerUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(SpeakerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SpeakerUpdateComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(SpeakerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Speaker(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Speaker();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackSessionById', () => {
        it('Should return tracked Session primary key', () => {
          const entity = new Session(123);
          const trackResult = comp.trackSessionById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });

    describe('Getting selected relationships', () => {
      describe('getSelectedSession', () => {
        it('Should return option if no Session is selected', () => {
          const option = new Session(123);
          const result = comp.getSelectedSession(option);
          expect(result === option).toEqual(true);
        });

        it('Should return selected Session for according option', () => {
          const option = new Session(123);
          const selected = new Session(123);
          const selected2 = new Session(456);
          const result = comp.getSelectedSession(option, [selected2, selected]);
          expect(result === selected).toEqual(true);
          expect(result === selected2).toEqual(false);
          expect(result === option).toEqual(false);
        });

        it('Should return option if this Session is not selected', () => {
          const option = new Session(123);
          const selected = new Session(456);
          const result = comp.getSelectedSession(option, [selected]);
          expect(result === option).toEqual(true);
          expect(result === selected).toEqual(false);
        });
      });
    });
  });
});
