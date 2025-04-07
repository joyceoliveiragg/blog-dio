import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ILayout } from '../layout.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../layout.test-samples';

import { LayoutService } from './layout.service';

const requireRestSample: ILayout = {
  ...sampleWithRequiredData,
};

describe('Layout Service', () => {
  let service: LayoutService;
  let httpMock: HttpTestingController;
  let expectedResult: ILayout | ILayout[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(LayoutService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Layout', () => {
      const layout = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(layout).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Layout', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Layout', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLayoutToCollectionIfMissing', () => {
      it('should add a Layout to an empty array', () => {
        const layout: ILayout = sampleWithRequiredData;
        expectedResult = service.addLayoutToCollectionIfMissing([], layout);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(layout);
      });

      it('should not add a Layout to an array that contains it', () => {
        const layout: ILayout = sampleWithRequiredData;
        const layoutCollection: ILayout[] = [
          {
            ...layout,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLayoutToCollectionIfMissing(layoutCollection, layout);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Layout to an array that doesn't contain it", () => {
        const layout: ILayout = sampleWithRequiredData;
        const layoutCollection: ILayout[] = [sampleWithPartialData];
        expectedResult = service.addLayoutToCollectionIfMissing(layoutCollection, layout);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(layout);
      });

      it('should add only unique Layout to an array', () => {
        const layoutArray: ILayout[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const layoutCollection: ILayout[] = [sampleWithRequiredData];
        expectedResult = service.addLayoutToCollectionIfMissing(layoutCollection, ...layoutArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const layout: ILayout = sampleWithRequiredData;
        const layout2: ILayout = sampleWithPartialData;
        expectedResult = service.addLayoutToCollectionIfMissing([], layout, layout2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(layout);
        expect(expectedResult).toContain(layout2);
      });

      it('should accept null and undefined values', () => {
        const layout: ILayout = sampleWithRequiredData;
        expectedResult = service.addLayoutToCollectionIfMissing([], null, layout, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(layout);
      });

      it('should return initial array if no Layout is added', () => {
        const layoutCollection: ILayout[] = [sampleWithRequiredData];
        expectedResult = service.addLayoutToCollectionIfMissing(layoutCollection, undefined, null);
        expect(expectedResult).toEqual(layoutCollection);
      });
    });

    describe('compareLayout', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLayout(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 14892 };
        const entity2 = null;

        const compareResult1 = service.compareLayout(entity1, entity2);
        const compareResult2 = service.compareLayout(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 14892 };
        const entity2 = { id: 22001 };

        const compareResult1 = service.compareLayout(entity1, entity2);
        const compareResult2 = service.compareLayout(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 14892 };
        const entity2 = { id: 14892 };

        const compareResult1 = service.compareLayout(entity1, entity2);
        const compareResult2 = service.compareLayout(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
