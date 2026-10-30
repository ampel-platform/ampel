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
  Green,
}

export type SexUI = 'männlich' | 'weiblich' | 'unbekannt';

export interface MedicalCaseMetadata {
  id: string;
  medicalCaseId: string;
  firstname: string | null;
  lastname: string | null;
  dateOfBirth: Date | null;
  sex: SexUI;
}

export interface Link {
  displayText: string;
  href: string;
  disabled?: boolean;
}

export interface Ruleset {
  ruleset: string;
  ampelStatus: AmpelStatus;
  message?: string;
  resultTime: Date;
  history: RulesetHistory;
  severity?: string | null | undefined;
}

export interface RulesetHistory {
  data: {
    date: Date;
    analyteValue: number;
    ampelStatus: AmpelStatus;
    unit: string;
    analyteName: string;
    severity?: string | null | undefined;
  }[];
}

export interface AlertDetails {
  ruleset: string;
  ampelStatus: AlertType;
  message?: string;
  resultTime: Date;
  rulesetHistory: RulesetHistory;
}

export interface ScoringSystem {
  name: string;
  version: string;
  ampelstatus: AmpelStatus;
  analyte: string;
  analytevalue: number | string;
  unit: string;
  severity?: string | null | undefined;
  severityhint: string;
}
