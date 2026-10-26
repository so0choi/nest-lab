# 공식 문서 읽기 가이드

각 랩을 시작하기 **전에** 어떤 문서의 어느 섹션까지 읽을지, 무엇은 건너뛰어도 되는지 정리했습니다.
섹션 이름은 2026-10 기준 [docs.nestjs.com](https://docs.nestjs.com) 원문 제목 그대로입니다 (Ctrl+F로 찾기 쉽게).

## 읽는 원칙

- **Overview는 순서대로 전부**, Fundamentals는 **랩에 필요한 페이지만**, Techniques/Recipes는 실무에서 필요할 때.
- 랩 전에는 "읽기" 섹션만 읽고 바로 실습합니다. "실습 후 읽기"는 랩을 끝낸 뒤 읽어야 더 잘 들어옵니다.
- 문서 예제를 그대로 따라 치지 말고, **랩 README의 질문을 먼저 훑어본 뒤** 읽으면 무엇을 봐야 할지 보입니다.

## 전체 순서

```
Overview                                            Fundamentals
─────────────────────────────────────────────      ───────────────────────────────────
Providers ─┐
Modules ───┼─► Lab 00 (DI 직접 구현)
           │
Middleware ┴─► Lab 01 ◄ 지금 여기
Exception filters ─┐
Pipes              ├─► Lab 02 (요청 라이프사이클)     + FAQ Request lifecycle
Guards             │                                + Execution context
Interceptors ──────┘
Custom decorators ───────────────────────────────► Lab 06 (메타데이터)
                                                    Custom providers ─► Lab 03
                                                    Asynchronous providers ┘
                                                    Dynamic modules, Circular dependency ─► Lab 04
                                                    Injection scopes, Lifecycle events ─► Lab 05
                                                    Module reference, Discovery service ─► Lab 06
                                                    Testing ─ 랩 진행 중 수시로 참고
```

---

## Lab 00 — Nest 없이 DI 컨테이너 만들기

**읽기 (랩 전)**
- [Providers](https://docs.nestjs.com/providers): `Services` → `Dependency injection` → `Scopes`까지
  - `Dependency injection`: "Nest resolves dependencies by their type"라는 한 줄이 이 랩의 출발점입니다. **타입으로** 어떻게 아는지가 Q1입니다.
- [Modules](https://docs.nestjs.com/modules): `Feature modules` → `Shared modules`

**건너뛰기**: Providers의 `Custom providers`, `Optional providers`, `Property-based injection` (Lab 03에서 읽음)

**실습 후 읽기**
- [Custom providers](https://docs.nestjs.com/fundamentals/custom-providers)의 `DI fundamentals` 섹션만. 내가 만든 Container와 문서의 설명(토큰, 등록, resolve)을 1:1로 맞춰 보세요.

---

## Lab 01 — Middleware

**읽기 (랩 전)**
- [Middleware](https://docs.nestjs.com/middleware): 처음부터 `Global middleware`까지
  - `Dependency injection`, `Applying middleware`, `Middleware consumer`, `Excluding routes`, `Functional middleware`, `Multiple middleware`, `Global middleware`
  - `Global middleware`의 Hint를 꼭 읽으세요. **`app.use()`로 등록한 전역 미들웨어는 DI 컨테이너에 접근할 수 없다**는 내용이 Q4와 직결됩니다.

**건너뛰기**: `Route wildcards` (Express 5 경로 문법이라 랩에서는 컨트롤러 클래스로 대신함)

**실습 후 읽기**
- 같은 페이지의 `Error handling`: 미들웨어에서 던진 예외를 Nest 예외 레이어가 잡습니다. Q3(`next()`를 안 부르면?)과 비교하고, Lab 02로 넘어가는 다리 역할을 합니다.

---

## Lab 02 — 요청 라이프사이클 (예정)

**읽기 (랩 전)**: Overview 나머지를 순서대로
- [Exception filters](https://docs.nestjs.com/exception-filters): `Throwing standard exceptions` → `Custom exceptions` → `Exception filters` → `Arguments host` → `Binding filters` → `Catch everything`
- [Pipes](https://docs.nestjs.com/pipes): `Built-in pipes` → `Binding pipes` → `Custom pipes` → `Global scoped pipes` → `The built-in ValidationPipe`
  - 건너뛰기: `Schema based validation`, `Object schema validation` (zod 예제라 원리와 무관)
- [Guards](https://docs.nestjs.com/guards): 전부. `Execution context` 섹션이 Middleware와 결정적으로 다른 점(핸들러를 안다)입니다.
- [Interceptors](https://docs.nestjs.com/interceptors): `Basics` → `Call handler` → `Binding interceptors` → `Response mapping` → `Exception mapping`
  - `Call handler`의 `next.handle()`이 Observable을 반환한다는 점이 핵심입니다. RxJS를 잘 몰라도 `pipe(tap(...))` 정도만 이해하면 됩니다.

**실습 후 읽기**
- [FAQ → Request lifecycle](https://docs.nestjs.com/faq/request-lifecycle): 랩에서 로그로 직접 확인한 순서와 맞춰 봅니다. **먼저 읽지 마세요.** 정답지입니다.
- [Execution context](https://docs.nestjs.com/fundamentals/execution-context): `ArgumentsHost class` → `ExecutionContext class` → `Reflection and metadata`

---

## Lab 03 — Custom providers (예정)

**읽기 (랩 전)**
- [Providers](https://docs.nestjs.com/providers): 앞에서 건너뛴 `Custom providers` → `Optional providers` → `Property-based injection` → `Provider registration`
- [Custom providers](https://docs.nestjs.com/fundamentals/custom-providers): 전부
  - `Non-class-based provider tokens`와 `Interfaces and abstract classes`는 Lab 00의 Q3(interface는 런타임에 사라진다)과 연결해서 읽으세요.
- [Asynchronous providers](https://docs.nestjs.com/fundamentals/async-providers): 짧은 페이지라 전부

---

## Lab 04 — 모듈 스코프, 순환 의존, Dynamic modules (예정)

**읽기 (랩 전)**
- [Modules](https://docs.nestjs.com/modules): `Module re-exporting` → `Dependency injection` → `Global modules` → `Dynamic modules`
- [Circular dependency](https://docs.nestjs.com/fundamentals/circular-dependency): 전부 (Lab 00 Q4 복습)
- [Dynamic modules](https://docs.nestjs.com/fundamentals/dynamic-modules): `Introduction` → `Module configuration` → `Community guidelines`
  - `Community guidelines`에서 `forRoot` / `register` / `forFeature`의 의미 차이를 꼭 보세요.

**실습 후 읽기**
- 같은 페이지의 `Configurable module builder` 이하: 손으로 만든 dynamic module을 builder로 바꿔 보는 데 씁니다.

---

## Lab 05 — Injection scopes, 앱 라이프사이클 훅 (예정)

**읽기 (랩 전)**
- [Injection scopes](https://docs.nestjs.com/fundamentals/injection-scopes): `Provider scope` → `Usage` → `Scope hierarchy` → `Request provider` → `Performance`
  - `Scope hierarchy`가 핵심입니다. REQUEST scope가 **주입하는 쪽으로 전파**되는 현상을 랩에서 직접 확인합니다.
- [Lifecycle events](https://docs.nestjs.com/fundamentals/lifecycle-events): 전부

**실습 후 읽기**
- Injection scopes의 `Durable providers`: 멀티테넌시 같은 실무 사례가 있을 때만

---

## Lab 06 — 커스텀 데코레이터 + 메타데이터 (예정)

**읽기 (랩 전)**
- [Custom decorators](https://docs.nestjs.com/custom-decorators): 전부
- [Execution context](https://docs.nestjs.com/fundamentals/execution-context): `Reflection and metadata` → `Low-level approach`
- [Module reference](https://docs.nestjs.com/fundamentals/module-ref): `Retrieving instances` → `Resolving scoped providers`
- [Discovery service](https://docs.nestjs.com/fundamentals/discovery-service): 전부

---

## 수시로 참고

- [Testing](https://docs.nestjs.com/fundamentals/testing): `Unit testing` → `Testing utilities` → `End-to-end testing`
  - 랩의 spec 파일이 쓰는 `Test.createTestingModule`, `overrideProvider`의 공식 설명입니다. Lab 01을 하면서 한 번 읽어 두면 좋습니다.

## 지금 당장 안 읽어도 되는 것

| 영역 | 이유 |
|---|---|
| Fundamentals → Lazy-loading modules, Platform agnosticism | 원리 이해 이후의 최적화·확장 주제 |
| Techniques (Database, Config, Caching, Queues …) | 특정 라이브러리 통합 방법이라 실무에서 필요할 때 읽기. 다 읽고 나면 Config 모듈이 Dynamic modules로 만들어졌다는 게 보입니다. |
| Recipes, GraphQL, WebSockets, Microservices | 같은 이유 |
