import {Pipe} from '@angular/core';
import {limitWithEllipsis} from '../utilities/string-utilities';

@Pipe({
  name: 'limitWithEllipsis'
})
export class LimitWithEllipsisPipe {
  transform(value, limit = 20) {
    return limitWithEllipsis(value, limit);
  }
}
