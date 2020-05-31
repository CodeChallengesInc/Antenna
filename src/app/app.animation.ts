
import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const ANIMATION_TIMING = '500ms cubic-bezier(0.4,0.0,0.2,1)';

export const routeAnimations =
  trigger('routeAnimations', [
    transition('0 => 1', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          right: 0,
          width: '100%',
          height: '100%',
        })
      ], { optional: true }),
      query(':enter', [
        style({ right: '-100%' })
      ]),
      group([
        query(':leave', [
          animate(ANIMATION_TIMING, style({ right: '100%' }))
        ], { optional: true }),
        query(':enter', [
          animate(ANIMATION_TIMING, style({ right: '0%' }))
        ], { optional: true }),
      ]),
    ]),
    transition('1 => 0', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          height: '100%',
        })
      ], { optional: true }),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      group([
        query(':leave', [
          animate(ANIMATION_TIMING, style({ left: '100%' }))
        ], { optional: true }),
        query(':enter', [
          animate(ANIMATION_TIMING, style({ left: '0%' }))
        ], { optional: true }),
      ]),
    ]),
  ]);
