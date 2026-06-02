export type FlowStep =
  | 'entry'
  | 'occasion'
  | 'recipient'
  | 'recipient_context'
  | 'format_family'
  | 'format_subtype'
  | 'photo_upload'
  | 'art_style'
  | 'tone'
  | 'text_format'
  | 'handoff'
  | 'agent';

export interface TileOption {
  value: string;
  label: string;
  description?: string;
  gradient: string;
  emoji?: string;
  badge?: string;
}

export interface HeartData {
  occasion: string | null;
  occasionLabel: string | null;
  relationship: string | null;
  recipientAgeRange: string | null;
  recipientContext: string | null;
  formatFamily: string | null;
  formatFamilyLabel: string | null;
  primaryType: string | null;
  primaryTypeLabel: string | null;
  artStyleId: string | null;
  artStyleName: string | null;
  photoHandling: 'include_as_is' | 'transform_to_style' | 'none';
  tone: string | null;
  toneLabel: string | null;
  insideTextFormat: string | null;
  insideTextFormatLabel: string | null;
  freeTextOverrides: Record<string, string>;
  uploadedPhotos: string[];
}

export interface ChatMessage {
  id: string;
  type: 'stampy' | 'user' | 'typing';
  text?: string;
  tiles?: TileOption[];
  tileColumns?: 2 | 3;
  showSkip?: boolean;
  skipLabel?: string;
  ageRangeTiles?: TileOption[];
  contextPrompt?: string;
  isEntry?: boolean;
  isHandoff?: boolean;
  heartSummary?: HeartData;
}

export const INITIAL_HEART_DATA: HeartData = {
  occasion: null,
  occasionLabel: null,
  relationship: null,
  recipientAgeRange: null,
  recipientContext: null,
  formatFamily: null,
  formatFamilyLabel: null,
  primaryType: null,
  primaryTypeLabel: null,
  artStyleId: null,
  artStyleName: null,
  photoHandling: 'none',
  tone: null,
  toneLabel: null,
  insideTextFormat: null,
  insideTextFormatLabel: null,
  freeTextOverrides: {},
  uploadedPhotos: [],
};

export const STEP_NUMBERS: Partial<Record<FlowStep, number>> = {
  occasion: 1,
  recipient: 2,
  recipient_context: 3,
  format_family: 4,
  format_subtype: 5,
  photo_upload: 6,
  art_style: 7,
  tone: 8,
  text_format: 9,
};

export const TOTAL_STEPS = 9;
