import 'reflect-metadata';
import { Container, Injectable } from './container';

// ── 실험용 클래스들 ─────────────────────────────────────────
@Injectable()
class ConfigService {
  readonly dbUrl = 'postgres://localhost/lab';
}

@Injectable()
class DbService {
  constructor(readonly config: ConfigService) {}
}

@Injectable()
class UserRepository {
  constructor(readonly db: DbService) {}
}

@Injectable()
class UserService {
  constructor(
    readonly repo: UserRepository,
    readonly config: ConfigService,
  ) {}
}

class NotDecorated {
  constructor(readonly config: ConfigService) {}
}

describe('lab-00: Nest 없이 DI 컨테이너 만들기', () => {
  // ── 관찰 단계: 구현 전에 먼저 돌려보고 README Q1~Q2에 답하세요 ──
  describe('관찰: TypeScript가 남기는 메타데이터', () => {
    it('design:paramtypes 에 무엇이 들어있나?', () => {
      const paramtypes = Reflect.getMetadata('design:paramtypes', UserService);
      console.log('UserService paramtypes =', paramtypes);
      expect(paramtypes).toEqual([UserRepository, ConfigService]);
    });

    it('데코레이터가 없는 클래스는?', () => {
      const paramtypes = Reflect.getMetadata('design:paramtypes', NotDecorated);
      console.log('NotDecorated paramtypes =', paramtypes);
      // 예측을 README에 적은 뒤 아래 줄의 주석을 풀고 기대값을 채우세요.
      // expect(paramtypes).toEqual(/* ??? */);
    });
  });

  // ── 구현 단계 ────────────────────────────────────────────
  describe('Container.resolve', () => {
    let container: Container;
    beforeEach(() => {
      container = new Container();
    });

    it('의존성 없는 클래스를 만든다', () => {
      expect(container.resolve(ConfigService)).toBeInstanceOf(ConfigService);
    });

    it('의존성 그래프를 재귀적으로 조립한다', () => {
      const userService = container.resolve(UserService);
      expect(userService.repo.db.config.dbUrl).toBe('postgres://localhost/lab');
    });

    it('같은 토큰은 같은 인스턴스(싱글턴)다', () => {
      const userService = container.resolve(UserService);
      // UserService가 직접 받은 ConfigService와 DbService가 받은 ConfigService가 같아야 함
      expect(userService.config).toBe(userService.repo.db.config);
      expect(container.resolve(UserService)).toBe(userService);
    });

    it('@Injectable 이 없는 클래스는 거부한다', () => {
      expect(() => container.resolve(NotDecorated)).toThrow(/Injectable/);
    });

    it('순환 의존은 경로가 담긴 에러로 알려준다', () => {
      // 생성자에 서로를 적는 "진짜" 순환은 선언 순서 문제를 일으킵니다 (README Q4에서 직접 실험).
      // 여기서는 컨테이너 로직만 검증하려고 메타데이터를 직접 써서 순환을 만듭니다.
      @Injectable()
      class A {}
      @Injectable()
      class B {}
      Reflect.defineMetadata('design:paramtypes', [B], A);
      Reflect.defineMetadata('design:paramtypes', [A], B);

      expect(() => container.resolve(A)).toThrow(/A -> B -> A/);
    });
  });
});
