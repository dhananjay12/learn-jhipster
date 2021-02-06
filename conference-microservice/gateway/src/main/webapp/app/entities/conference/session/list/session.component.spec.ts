import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SessionService } from '../service/session.service';
import { Session } from '../session.model';

import { SessionComponent } from './session.component';

describe('Component Tests', () => {
  describe('Session Management Component', () => {
    let comp: SessionComponent;
    let fixture: ComponentFixture<SessionComponent>;
    let service: SessionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SessionComponent],
      })
        .overrideTemplate(SessionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SessionComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(SessionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Session(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sessions?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
