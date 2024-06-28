export enum AmpelStatus {
    RED,
    YELLOW,
    GREEN
}

export enum AlertType {
    Warning,
    Critical
}

export type PatientMetaData = {
    name: string,
    patientId: string,
    caseId: string,
    sex: "männlich" | "weiblich",
    birthdate: Date
};

export type Link = {
    displayText: string,
    href: string
}

export type Ruleset = {
    ruleset: string,
    ampelStatus: AmpelStatus,
    message: string | null,
    resultTime: Date,
    history: RulesetHistory
    links?: Link[]
};

export type RulesetHistory = {
    data: {
        date: Date,
        analyteValue: number,
        ampelStatus: AmpelStatus,
    }[]
}

export type AlertDetails = {
    ruleset: string,
    ampelStatus: AlertType,
    message: string | null,
    resultTime: Date,
    rulesetHistory: RulesetHistory,
    links: Link[]
}