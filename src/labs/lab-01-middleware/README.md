# Lab 01 — Middleware

> 관련 문서: [Middleware](https://docs.nestjs.com/middleware)
> 랩 전에 읽기: Middleware 처음부터 `Global middleware`까지, 실습 후 `Error handling` ([읽기 가이드](../../../READING_GUIDE.md#lab-01--middleware))
> 목표: 미들웨어가 Nest의 **어느 층**에 있는지 감 잡기. DI 안인지 밖인지, 라우트 매칭 전인지 후인지.

## 진행 순서

1. 구현 전에 한 번 실행해서 무엇이 깨지는지 확인합니다.
   ```bash
   npm test -- lab-01
   ```
2. TODO 1(`logger.middleware.ts`) → TODO 2(`request-id.middleware.ts`) → TODO 3(`lab01.module.ts`) 순서로 채웁니다.
3. 관찰 테스트의 출력으로 Q1~Q2의 예측을 확인합니다.
4. Q5 소스 추적.

## 질문 (예측 → 확인)

**Q1.** `GET /cats`에서 `mw:global`, `mw:logger`, `handler:cats`는 어떤 순서로 찍힐까요? 테스트 코드에서 `app.use`가 `app.init()`보다 **먼저** 호출된다는 점도 고려하세요.
- 예측:
- 결과:

**Q2.** `GET /nope`(존재하지 않는 라우트)에서 `mw:global`은 찍힐까요? 이 결과를 보면 Nest 미들웨어는 "라우트 매칭 이후"에 실행되나요, Express 미들웨어처럼 동작하나요?
- 예측:
- 결과:

**Q3.** `LoggerMiddleware`에서 `next()`를 지우면 클라이언트는 어떤 상태가 되나요? 그렇다면 응답을 직접 보내는(`res.status(401).send()`) 미들웨어로 인증을 처리하는 것과 Guard로 처리하는 것은 무엇이 다를까요? (Guard 문서를 읽은 뒤 다시 답해보기)
- 예측:
- 결과:

**Q4.** 함수형 미들웨어 `requestId`에는 생성자가 없습니다. 여기서 `TraceService`를 쓰고 싶다면 어떤 방법이 있을까요? 최소 두 가지를 떠올려 보세요 (힌트: 클래스로 바꾸기, 팩토리 함수 + 클로저).
- 답:

**Q5. 소스 추적.**
- `node_modules/@nestjs/core/middleware/middleware-module.js`: `configure()`가 **언제** 호출되나요? (`register`, `resolveMiddleware` 근처)
- 같은 폴더의 `routes-mapper.js`: `forRoutes(CatsController)`처럼 컨트롤러 클래스를 넘기면 어떻게 경로 문자열로 바뀌나요?
- 클래스 미들웨어 인스턴스는 누가 만드나요? Lab 00의 Container와 연결해서 설명해 보세요.

## 완료 기준

설명할 수 있어야 하는 것:
- 클래스 미들웨어와 함수형 미들웨어, `app.use` 전역 미들웨어의 차이 (DI 가능 여부, 적용 범위)
- 미들웨어는 **어떤 핸들러가 실행될지 모른다**는 점, 그리고 이것이 Guard/Interceptor와 갈리는 지점
  → 다음 랩: Exception filters → Pipes → Guards → Interceptors, 최종적으로 요청 라이프사이클 전체 순서
