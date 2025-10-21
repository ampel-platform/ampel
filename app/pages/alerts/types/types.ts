export enum AmpelStatus {
  GREEN = 1,
  YELLOW,
  RED,
}
export enum AmpelKisStatus {
  GREEN = 1,
  YELLOW,
  RED,
  NONE,
}
export enum AlertType {
  Warning,
  Critical,
}

export type SexUI = 'männlich' | 'weiblich' | 'unbekannt';

export interface MedicalCasePatientMetadata {
  id: string;
  firstname: string | null;
  lastname: string | null;
  dateOfBirth: Date | null;
  sex: SexUI;
}

export interface MedicalCaseMetadata {
  id: string;
  patient?: MedicalCasePatientMetadata;
}

export interface Link {
  displayText: string;
  href: string;
}

export interface Ruleset {
  ruleset: string;
  ampelStatus: AmpelStatus;
  message?: string;
  resultTime: Date;
  history: RulesetHistory;
  links?: Link[];
}

export interface RulesetHistory {
  data: {
    date: Date;
    analyteValue: number;
    ampelStatus: AmpelStatus;
    unit: string;
    analyteName: string;
  }[];
}

export interface AlertDetails {
  ruleset: string;
  ampelStatus: AlertType;
  message?: string;
  resultTime: Date;
  rulesetHistory: RulesetHistory;
  links: Link[];
}

export interface ScoringSystem {
  name: string;
  version: string;
  ampelstatus: AmpelStatus;
  analyte: string;
  analytevalue: number | string;
  unit: string;
  severity: string | null | undefined;
  severityhint: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: Record<string, any>;
}

export interface AmpelResult {
  medicalcase: number;
  patient: number;
  birthdate: string; // ISO string
  scoringsystems: ScoringSystem[];
}
