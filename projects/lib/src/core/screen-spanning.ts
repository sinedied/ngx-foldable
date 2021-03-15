/** Represents the screen spanning mode. */
export type ScreenSpanning = 'fold-vertical' | 'fold-horizontal' | 'none';
/** Enumeration of screen spanning mode values. */
export const ScreenSpanning = {
  /** Screen spanning mode is single fold vertical. */
  Vertical: 'fold-vertical' as ScreenSpanning,
  /** Screen spanning mode is single fold horizontal. */
  Horizontal: 'fold-horizontal' as ScreenSpanning,
  /** No screen spanning (single screen mode). */
  None: 'none' as ScreenSpanning,
};
