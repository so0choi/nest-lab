import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { Lab01Module } from './lab01.module';
import { TraceService } from './trace.service';

describe('lab-01: Middleware', () => {
  let app: INestApplication;
  let trace: TraceService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [Lab01Module],
    }).compile();

    app = moduleRef.createNestApplication();

    // 전역 미들웨어(app.use)는 DI 컨테이너 밖에 있습니다.
    // 그래서 필요한 서비스를 컨테이너에서 직접 꺼내 클로저로 넘깁니다.
    trace = app.get(TraceService);
    app.use((_req: unknown, _res: unknown, next: () => void) => {
      trace.push('mw:global');
      next();
    });

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('구현 확인', () => {
    it('GET /cats 는 LoggerMiddleware 를 거친 뒤 핸들러에 도달한다', async () => {
      await request(app.getHttpServer()).get('/cats').expect(200);
      expect(trace.events).toContain('mw:logger');
      expect(trace.events.indexOf('mw:logger')).toBeLessThan(
        trace.events.indexOf('handler:cats'),
      );
    });

    it('GET /dogs 는 LoggerMiddleware 를 거치지 않는다', async () => {
      await request(app.getHttpServer()).get('/dogs').expect(200);
      expect(trace.events).toContain('handler:dogs');
      expect(trace.events).not.toContain('mw:logger');
    });

    it('GET /cats/health 는 exclude 되어 LoggerMiddleware 를 거치지 않는다', async () => {
      await request(app.getHttpServer()).get('/cats/health').expect(200);
      expect(trace.events).toContain('handler:cats-health');
      expect(trace.events).not.toContain('mw:logger');
    });

    it.each(['/cats', '/dogs'])('%s 응답에 x-request-id 헤더가 있다', async (path) => {
      const res = await request(app.getHttpServer()).get(path).expect(200);
      expect(res.headers['x-request-id']).toBeTruthy();
    });
  });

  describe('관찰', () => {
    it('전역(app.use) vs 모듈(consumer) 미들웨어 실행 순서', async () => {
      await request(app.getHttpServer()).get('/cats').expect(200);
      console.log('GET /cats trace =', trace.events);
      // README Q1 에 예측을 적은 뒤 주석을 풀고 채우세요.
      // expect(trace.events).toEqual([/* ??? */]);
    });

    it('존재하지 않는 경로에서는 어떤 미들웨어가 실행될까?', async () => {
      await request(app.getHttpServer()).get('/nope').expect(404);
      console.log('GET /nope trace =', trace.events);
      // README Q2
    });
  });
});
