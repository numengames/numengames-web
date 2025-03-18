// Animation types
export interface AnimationProps {
  type: string;
  delay?: number;
}

// Common UI components
export interface BaseComponentProps {
  className?: string;
}

// Layout components
export interface SectionProps extends BaseComponentProps {
  id?: string;
  bgColor?: string;
  height?: string;
  fullWidth?: boolean;
}

// Content sections
export type ContentLayout = 'desktop' | 'mobile';

export interface ContentSectionProps extends BaseComponentProps {
  layout: ContentLayout;
}

// Tailwind specifics
export type TailwindColors = 
  | 'primary-beige'
  | 'primary-coralRed'
  | 'primary-darkRed'
  | 'primary-panther'
  | 'primary-mediterranean'
  | 'supportDetails-mediterranean'
  | 'supportDetails-depthSea'
  | 'supportDetails-gold'
  | string;

export type TailwindSizes = 
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | string;

export type TailwindAlignments = 'left' | 'center' | 'right' | 'justify'; 