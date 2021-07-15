interface IRetentionStudyData {
  id: number;
  campaignType: number;
  studyTitle: string;
  therapeuticArea: string;
  indication: string;
  studyDrug: string;
  startDate: string;
  endDate: boolean;
  userId: number;
  clientId: number;
  sponsorId: number;
  sponsorName: boolean;
  referralGoal: number;
  enrollmentGoals: number;
  studyStatus: number;
  studyStatusName: string;
  totalRow: string;
  studiesProtocolDto: string;
  refStatus: boolean;
  referralStatus: boolean;
  ivrno: number;
  isPatientMessaging: string;
  isWarmTransfer: boolean;
  isRiskShared: boolean;
  hasPurchasedSponsor: boolean;
}

interface IStudyData {
  id: number;
  campaignType: number;
  studyTitle: string;
  therapeuticArea: string;
  indication: string;
  studyDrug: string;
  startDate: string;
  endDate: boolean;
  userId: number;
  clientId: number;
  sponsorId: number;
  sponsorName: boolean;
  referralGoal: number;
  enrollmentGoals: number;
  studyStatus: number;
  studyStatusName: string;
  totalRow: string;
  studiesProtocolDto: string;
  refStatus: boolean;
  referralStatus: boolean;
  ivrno: number;
  isPatientMessaging: string;
  isWarmTransfer: boolean;
  isRiskShared: boolean;
  hasPurchasedSponsor: boolean;
  studyRoute?: string; // ephemeral (i.e. temporary field set after server fetch)
  arms?: IStudyArm[]; // ephemeral
}

interface IPatientData {
  referralId: number;
  siteUserId: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  latModifiedDate?: string;
  emailAddress: string;
  homePhoneNumber: string;
  cellPhoneNumber: string;
  address: string;
  owner?: string;
  city?: string;
  zip?: string;
  state?: string;
  country?: string;
  careGiverName?: string;
  careGiverPhoneNumber?: string;
  careGiverEmailAddress?: string;
  preferredCallBackTime?: string;
  timeZone?: string;
  permissionLeaveMessage?: boolean;
  ivrno: string;
  applicableProtocolNo?: string;
  siteId: number;
  uploadUserId?: number;
  randomizationDate?: string;
  eventType?: string;
  eventStatus?: string;
  referralStatus?: string;
  referralVisits: IReferralVisitsData[];
  studyId?: number;
  armLabel?: string; // ephemeral
  [key: string]: any;
}

interface IVisitStepData {
  yes: string;
  no: string;
  yes_radios: string[];
  no_radios: string[];
  date_radios: string[];
  cancel: string;
  submit: string;
}

interface IStepperData {
  id: string;
  type: string;
  label: string;
  label_indicator: string;
  status: string;
  parent_id: string | null;
  data: IVisitStepData | null;
}

interface IStudyArm {
  studyARMId: number;
  studyId: number;
  armName: string;
  armLabel: string;
  armDesc: string;
  visits?: IStudyArmVisit[]; // ephemeral
}

interface IStudyArmVisit {
  armVisitId: number;
  studyARMId: number;
  studyARMName: string;
  visitNumber: string;
  sequence: number;
  week: number;
  day: number;
  minTolerence: number;
  maxTolerence: number;
  periodTypeId: number;
  periodTypeName: string; // tied to PeriodTypes const
  messageOverride: boolean;
  active: boolean;
}

interface IListData {
  date: string;
  name: string;
  visit: string;
  vnum: string;
  time: string;
  IVRS: string;
}

interface IVisitListData {
  studyName?: string;
  patientId: number;
  patientName: string;
  visitDate: string;
  currentVisitNumber: string;
  prevVisitNumber: string;
  prevVisitIVRS: string;
}

interface IPatientPreQualificationData {
  id: number;
  referralId: number;
  questionId: number;
  question: string;
  answer: string;
}

interface IReferralVisitsData {
  referralId: number;
  armVisitId: number;
  visitNumber: string;
  appointmentDate: string;
  appointmentStatus: string;
  visitLabel: string;
  periodTypeId: string;
  periodTypeName: string;
  notes: string;
}

interface IPatientUploadResultData {
  patientName: string;
  uploadResult: string;
}

interface IPatientUploadReturnData {
  emailAddress: string;
  firstname: string;
  lastname: string;
  result: string;
}

interface IRetentionPatientData {
  patientId: number;
  patientName: string;
  owner: string;
  ivrs: string;
  nextVisitDate: string;
  visitType: string;
  [key: string]: any;
}

interface ICardItem {
  label: string,
  color: string,
  order: number,
  count: number,
}

interface ICardData {
  study: string;
  statuses: ICardItem[];
}

interface IMappedHeaderData {
  firstname: string,
  lastname: string,
  emailAddress: string,
  cellPhone: string,
  zip: string,
  randomizationDate: string
}

interface IRetentionCardData {
  referralId: number;
  siteUserId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  emailAddress: string;
  homePhoneNumber: string;
  cellPhoneNumber: string;
  address: string;
  city: string;
  zip: number;
  state: string;
  country: string;
  careGiverName: string;
  careGiverPhoneNumber: string;
  careGiverEmailAddress: string;
  preferredCallBackTime: string;
  timeZone: string;
  permissionLeaveMessage: boolean;
  ivrno: string;
  applicableProtocolNo: string;
  siteId: number;
  randomizationDate: string;
  eventType: string;
  eventStatus: string;
  referralStatus: string;
  owner: string;
  uploadUserId: number;
  referralVisits: [];
}

interface IPatientPreQualificationData {
  questionId: number;
  question: string;
  answer: string;
  referralId: number;
  id: number;
}

interface IPatientContactData {
  zip: string;
  lastName: string;
  country: string;
  applicableProtocolNo: string;
  careGiverEmailAddress: string;
  homePhoneNumber: string;
  address: string;
  city: string;
  referralId: number,
  timeZone: string;
  preferredCallBackTime: string;
  siteUserId: number,
  uploadUserId: number,
  firstName: string;
  emailAddress: string;
  cellPhoneNumber: string;
  permissionLeaveMessage: boolean;
  ivrno: string;
  siteId: number;
  middleName: string;
  state: string;
  careGiversPhoneNumber: string;
  careGiversName: string;
}

interface IPatientNoteData {
  referralNotesId: number;
  referralId: number;
  noteSubject: string;
  noteText: string;
  isPrivate: boolean;
  createdBy: string;
  modifiedBy: string;
  createdDtmUTC: string;
  modifiedDtmUTC: string;
}

interface IPatientQualificationData {
  name: string;
  birthYear: string;
  whatStage: string;
  haveTesting: string;
  biomarkerStatus: string;
  biomarkerTest: string;
  levelFunctioning: string;
  NSCLC: string;
  past6Months: string;
  describesYou: string;
}

// interface IStepperVisitData {
//   visitType: string;
//   visitNumber: number;
//   visitStatus: string;
//   date: string;
// };

interface IPatientHistoryData {
  referralEventDetailsId: number;
  eventTypeId: number;
  comments: string;
  referralStatusName: string;
  referralStatusId: number;
  eventTypeName: string;
  referralVisitId: number;
  eventDate: string;
}

interface ISite {
  id: number,
  value: string
}

