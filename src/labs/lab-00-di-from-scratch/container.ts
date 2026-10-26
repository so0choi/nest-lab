import 'reflect-metadata';

// 클래스 생성자 타입. Nest 내부에서도 `Type<T>`라는 이름으로 같은 걸 씁니다.
export type Type<T = unknown> = new (...args: any[]) => T;

/**
 * TODO 1: @Injectable() 데코레이터를 완성하세요.
 *
 * 힌트: 이 데코레이터가 "아무 일도 하지 않아도" 테스트 일부는 통과합니다.
 *       왜 그런지가 이 랩의 핵심 질문입니다 (README Q1).
 *       통과 후에는 "이 클래스는 주입 가능하다"는 표시를 메타데이터로 남겨서
 *       Container가 @Injectable 없는 클래스를 거부할 수 있게 만드세요.
 */
export function Injectable(): ClassDecorator {
  return (target) => {

  };
}

export class Container {
  // 싱글턴 캐시. Nest의 InstanceWrapper가 하는 역할의 아주 작은 버전입니다.
  private readonly instances = new Map<Type, unknown>();

  /**
   * TODO 2: token 클래스의 인스턴스를 만들어 반환하세요.
   *
   * 요구사항 (container.spec.ts 참고):
   *  - 생성자 파라미터 타입을 `Reflect.getMetadata('design:paramtypes', token)`으로 읽는다
   *  - 의존성을 재귀적으로 resolve 한 뒤 `new token(...deps)`
   *  - 같은 token은 항상 같은 인스턴스 (싱글턴)
   *  - @Injectable 표시가 없으면 에러
   *  - A -> B -> A 같은 순환 의존은 무한 재귀 대신 에러 (메시지에 경로 포함)
   */
  resolve<T>(token: Type<T>): T {
    throw new Error('TODO: Container.resolve 를 구현하세요');
  }
}
