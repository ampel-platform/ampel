export enum AmpelStatus {
    GREEN = 1,
    YELLOW,
    RED
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
    message?: string,
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
    message?: string,
    resultTime: Date,
    rulesetHistory: RulesetHistory,
    links: Link[]
}