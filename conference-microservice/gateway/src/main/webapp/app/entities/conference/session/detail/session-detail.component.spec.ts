import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Session } from '../session.model';
import { DataUtils } from 'app/core/util/data-util.service';

import { SessionDetailComponent } from './session-detail.component';

describe('Component Tests', () => {
  describe('Session Management Detail Component', () => {
    let comp: SessionDetailComponent;
    let fixture: ComponentFixture<SessionDetailComponent>;
    let dataUtils: DataUtils;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [SessionDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ session: new Session(123) }) },
          },
        ],
      })
        .overrideTemplate(SessionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SessionDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = TestBed.inject(DataUtils);
    });

    describe('OnInit', () => {
      it('Should load session on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.session).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from DataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from DataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeBase64, fakeContentType);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeBase64, fakeContentType);
      });
    });
  });
});
