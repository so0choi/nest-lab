import { Module } from '@nestjs/common';
import { Lab01Module } from './labs/lab-01-middleware/lab01.module';

// `npm run start:dev`로 직접 띄워 curl로 확인하고 싶을 때 쓰는 루트 모듈입니다.
@Module({
  imports: [Lab01Module],
})
export class AppModule {}
