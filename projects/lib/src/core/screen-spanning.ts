/** Represents the screen spanning mode. */
export type ScreenSpanning = 'dual-horizontal' | 'dual-vertical' | 'none';
/** Enumeration of screen spanning mode values. */
export const ScreenSpanning = {
  /** Screen spanning mode is dual horizontal viewports. */
  DualHorizontal: 'dual-horizontal' as ScreenSpanning,
  /** Screen spanning mode is dual vertical viewports. */
  DualVertical: 'dual-vertical' as ScreenSpanning,
  /** No screen spanning (single screen mode). */
  None: 'none' as ScreenSpanning,
};
