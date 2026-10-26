import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

/**
 * TODO 1: 클래스 미들웨어
 *  - TraceService 를 생성자로 주입받는다 (클래스 미들웨어는 DI 가 된다!)
 *  - 요청마다 trace 에 'mw:logger' 를 기록하고 다음으로 넘긴다
 *
 * 실험: next() 호출을 지우면 무슨 일이 생기나요? (README Q3)
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // TODO
    next();
  }
}
