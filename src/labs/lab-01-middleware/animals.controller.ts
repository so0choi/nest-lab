import { Controller, Get } from '@nestjs/common';
import { TraceService } from './trace.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly trace: TraceService) {}

  @Get()
  findAll() {
    this.trace.push('handler:cats');
    return [];
  }

  @Get('health')
  health() {
    this.trace.push('handler:cats-health');
    return 'ok';
  }
}

@Controller('dogs')
export class DogsController {
  constructor(private readonly trace: TraceService) {}

  @Get()
  findAll() {
    this.trace.push('handler:dogs');
    return [];
  }
}
