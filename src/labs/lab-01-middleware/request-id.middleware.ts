import type { NextFunction, Request, Response } from 'express';

/**
 * TODO 2: 함수형 미들웨어
 *  - 응답 헤더 'x-request-id' 에 임의의 값을 넣는다 (crypto.randomUUID() 등)
 *
 * 질문: 함수형 미들웨어에서 TraceService 를 쓰고 싶다면? (README Q4)
 */
export function requestId(req: Request, res: Response, next: NextFunction) {
  // TODO
  next();
}
