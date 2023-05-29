import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionPipe'
})
export class DescriptionPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const maxLength = args[0] as number - 3;
    const showFullText = args[1] as boolean;

    if (typeof value !== 'string') {
      return '...';
    }

    if (value.length <= maxLength) {
      return value;
    }

    if (showFullText) {
      return value;
    }

    const substring = value.substring(0, maxLength);
    const lastSpaceIndex = substring.lastIndexOf(' ');

    if (lastSpaceIndex !== -1) {
      return substring.substring(0, lastSpaceIndex) + "...";
    }
    else {
      return substring.substring(0, maxLength) + "...";
    }

    return substring;
  }

}
