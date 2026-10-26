import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsController, DogsController } from './animals.controller';
import { TraceService } from './trace.service';

@Module({
  controllers: [CatsController, DogsController],
  providers: [TraceService],
})
export class Lab01Module implements NestModule {
  /**
   * TODO 3: 미들웨어 등록
   *  - LoggerMiddleware: CatsController 에만 적용, 단 GET /cats/health 는 제외
   *  - requestId: CatsController, DogsController 둘 다 적용
   *
   * 문서: https://docs.nestjs.com/middleware#applying-middleware
   *       (forRoutes, exclude, RequestMethod)
   */
  configure(consumer: MiddlewareConsumer) {
    // TODO
  }
}
