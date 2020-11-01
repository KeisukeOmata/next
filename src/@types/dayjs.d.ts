import * as React from "react";
import dayjs from 'dayjs';

declare module 'react/types/react' {
  interface react {
    $dayjs(date?: dayjs.ConfigType, option?: dayjs.OptionType, locale?: string): dayjs.Dayjs;
  }
}
declare module 'dayjs' {
  interface Dayjs {
    weekday(): number
    weekday(value: number): Dayjs
  }
}