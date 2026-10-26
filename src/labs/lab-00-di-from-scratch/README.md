# Lab 00 — Nest 없이 DI 컨테이너 만들기

> 관련 문서: [Providers](https://docs.nestjs.com/providers), 이후 [Custom providers](https://docs.nestjs.com/fundamentals/custom-providers)
> 랩 전에 읽기: Providers의 `Services`~`Scopes`, Modules의 `Feature modules`~`Shared modules` ([읽기 가이드](../../../READING_GUIDE.md#lab-00--nest-없이-di-컨테이너-만들기))
> 목표: "생성자에 타입만 적으면 주입된다"는 마법을 직접 50줄 안팎으로 재현한다.

## 진행 순서

1. **관찰**: `container.ts`는 그대로 두고 관찰 테스트만 실행합니다.
   ```bash
   npm test -- lab-00 -t 관찰
   ```
2. 아래 Q1~Q2에 **예측을 먼저 적고** 출력과 비교합니다.
3. **구현**: `container.ts`의 TODO 1, 2를 채워 전체 테스트를 통과시킵니다.
   ```bash
   npm test -- lab-00
   ```
4. **소스 추적**: Q5를 따라 Nest 실제 코드에서 같은 동작을 찾습니다.
5. 본인 말로 정리한 설명을 Claude에게 보내 검증받습니다.

## 질문 (예측 → 확인)

**Q1.** `@Injectable()`이 지금은 아무것도 하지 않는데 왜 `design:paramtypes`가 생길까요? 이 메타데이터는 누가 언제 만드나요? (힌트: `tsconfig.json`의 옵션 하나)
- 예측: tsconfig.json의 declaration이 true이기 때문에 
- 결과:

**Q2.** 데코레이터가 없는 `NotDecorated`의 paramtypes는 무엇일까요? 그렇다면 Nest에서 의존성이 없는 서비스에도 `@Injectable()`을 붙이라고 하는 이유, 혹은 붙이지 않아도 동작하는 경우는 무엇일까요?
- 예측: paramtypes는 undefined로 나온다. 의존성이 없어도 Injectable이 붙어있어야 Nest.js가 메타데이터를 읽어 클래스를 관리하기 용이하다. 
- 결과: 

**Q3.** 생성자 타입을 `interface`로 적으면(`constructor(private repo: IUserRepo)`) paramtypes에는 무엇이 들어갈까요? 이 결과가 Nest에서 interface를 주입하려면 `@Inject('TOKEN')`이 필요한 이유와 어떻게 연결되나요? (직접 실험해 보세요)
- 예측:
- 결과:

**Q4.** 순환 테스트에서 왜 메타데이터를 직접 정의해야 했을까요? spec 파일에 `class A { constructor(b: B) {} }`, `class B { constructor(a: A) {} }`를 직접 선언해 실행해 보세요. A의 메타데이터가 평가되는 시점에 B는 어떤 상태인가요? Nest의 `forwardRef(() => B)`는 이 문제를 어떻게 피하나요?
- 예측:
- 결과:

**Q5. 소스 추적.** `node_modules/@nestjs/core/injector/injector.js`를 열고 다음을 찾아보세요.
- 생성자 파라미터 목록을 읽는 함수 (힌트: `reflectConstructorParams`)
- 의존성을 하나씩 resolve하는 함수 (힌트: `resolveConstructorParams`)
- 내 `instances` Map에 대응하는 것은? (힌트: `InstanceWrapper`, `injector/instance-wrapper.js`)
- 내 구현과 가장 크게 다른 점 하나는?

## 완료 기준

설명할 수 있어야 하는 것:
- 컨테이너가 "무엇을 주입할지"를 알아내는 정보는 **어디서** 오는가
- 토큰이 클래스일 때와 아닐 때 무엇이 다른가 → 랩 2(Custom providers)로 이어짐
- 싱글턴은 어디에 저장되는가
