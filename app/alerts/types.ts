export type PatientMetaData = {
    name: string,
    patientId: string,
    caseId: string,
    sex: "männlich" | "weiblich",
    birthdate: Date
};

export type Ruleset = {
    ruleset: string,
    ampelStatus: "red" | "yellow" | "green",
    message: string | null,
    resultTime: Date
};