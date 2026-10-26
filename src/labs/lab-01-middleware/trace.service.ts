import { Injectable } from '@nestjs/common';

// 요청이 어떤 지점을 어떤 순서로 지나갔는지 기록하는 관찰용 서비스. 수정할 필요 없습니다.
@Injectable()
export class TraceService {
  readonly events: string[] = [];

  push(event: string) {
    this.events.push(event);
  }
}
