# nest-lab

NestJS 동작 원리를 공식 문서와 함께 실습하는 랩입니다. 기능을 만드는 프로젝트가 아니라 **프레임워크를 관찰하는 실험실**입니다.

## 문서 읽기 순서

랩마다 공식 문서의 어느 페이지, 어느 섹션까지 읽고 시작할지는 [READING_GUIDE.md](READING_GUIDE.md)에 정리했습니다.

## 각 랩의 진행 방식

질문 → **먼저 예측** → 실행해서 비교 → `node_modules/@nestjs/core` 소스 추적 → 본인 말로 설명 → Claude가 검증

## 랩 목록

| # | 랩 | 문서 | 상태 |
|---|---|---|---|
| 00 | [Nest 없이 DI 컨테이너 만들기](src/labs/lab-00-di-from-scratch/README.md) | Providers | 준비됨 |
| 01 | [Middleware](src/labs/lab-01-middleware/README.md) | Middleware | 준비됨 |
| 02 | Exception filters → Pipes → Guards → Interceptors, 요청 라이프사이클 순서 | Overview 나머지 | 예정 |
| 03 | Custom providers (`useValue` / `useClass` / `useFactory` / `useExisting`) | Fundamentals | 예정 |
| 04 | 모듈 스코프, 순환 의존, Dynamic modules | Fundamentals | 예정 |
| 05 | Injection scopes, 앱 라이프사이클 훅 | Fundamentals | 예정 |
| 06 | 커스텀 데코레이터 + Reflector + DiscoveryService | Fundamentals | 예정 |

## 실행

```bash
npm install
npm test -- lab-00      # 특정 랩만 실행
npm test -- lab-01 -t 관찰
```

스택: Nest 12, TypeScript 6, Jest 30 (공식 `nest new` TS 템플릿과 같은 구성)
