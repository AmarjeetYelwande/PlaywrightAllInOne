declare module 'react-big-calendar' {
  import { ComponentType } from 'react';
  
  export interface Event {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: any;
  }
  
  export interface SlotInfo {
    start: Date;
    end: Date;
    slots: Date[];
    action: 'select' | 'click' | 'doubleClick';
  }
  
  export interface CalendarProps {
    localizer: any;
    events: Event[];
    views?: string[] | { [key: string]: boolean };
    defaultView?: string;
    defaultDate?: Date;
    startAccessor?: string | ((event: Event) => Date);
    endAccessor?: string | ((event: Event) => Date);
    titleAccessor?: string | ((event: Event) => string);
    allDayAccessor?: string | ((event: Event) => boolean);
    resourceAccessor?: string | ((event: Event) => any);
    resources?: any[];
    resourceIdAccessor?: string | ((resource: any) => string | number);
    resourceTitleAccessor?: string | ((resource: any) => string);
    selectable?: boolean;
    selected?: any;
    longPressThreshold?: number;
    onSelectSlot?: (slotInfo: SlotInfo) => void;
    onSelectEvent?: (event: Event, e: React.SyntheticEvent) => void;
    onDoubleClickEvent?: (event: Event, e: React.SyntheticEvent) => void;
    onKeyPressEvent?: (event: Event, e: React.SyntheticEvent) => void;
    popup?: boolean;
    style?: React.CSSProperties;
    className?: string;
    components?: any;
  }
  
  export const Calendar: ComponentType<CalendarProps>;
  export const momentLocalizer: (moment: any) => any;
} 