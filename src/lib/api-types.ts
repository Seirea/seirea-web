export interface Address {
	Address: string;
	City: string;
	State: string;
	TypeCode?: string;
	TypeDescription?: string;
	ZipCode: string;
	ZipExt: string;
}

export interface Demographics {
	Age: number;
	Birthdate: string;
	Contact1PhoneNumber: string;
	Contact1Title: string;
	Contact2PhoneNumber: string;
	Contact2Title: string;
	CorrespondenceLanguageCode: string;
	CorrespondenceLanguageDescription?: string;
	CounselorEmailAddress?: string;
	CounselorName?: string;
	CounselorNumber: number;
	DisplayText: string;
	DoNotRelease: string;
	EmailAddress: string;
	EthnicityCode: string;
	EthnicityDescription: string;
	FirstName: string;
	Gender: string;
	Grade: string;
	IsSecondary: boolean;
	LanguageFluencyCode: string;
	LanguageFluencyDescription: string;
	LastName: string;
	LockerCombination: string;
	LockerLocation: string;
	LockerNumber: string;
	LockerPosition: string;
	MailingAddress: Address;
	MiddleName: string;
	MobilePhone: string;
	ParentGuardianEmailAddress: string;
	ParentGuardianName: string;
	PrimaryPhoneNumber: string;
	RaceCode: string;
	RaceDescription: string;
	ResidenceAddress: Address;
	SchoolCode: number;
	SchoolName: string;
	StudentID: number;
}

export interface View {
	CanViewDetails: boolean;
	ViewCode: string;
	ViewDescription: string;
}

export interface Student {
	Demographics: Demographics;
	HideWhatIf: boolean;
	UseFlexibleScheduling: boolean;
	Views: View[];
}

export interface AuthenticatedStudent {
	Username: string;
	Password: string;

	Token: string;
	Student: Student;
}

export interface PasswordRequirement {
	DifferentThanOld: boolean;
	MinimumLength: number;
	RequireLettersAndNumbers: boolean;
	RequireSpecialCharacter: boolean;
	RequireUpperLowerCases: boolean;
}

export interface PasswordRule {
	PasswordExpireInDays: number;
	PasswordRequirement: PasswordRequirement;
	RequirePasswordChange: boolean;
	RequirePasswordChangeMessage: string;
}

export interface AuthResponseSuccess {
	AccessToken: string;
	AeriesCommunications: boolean;
	DefaultStudentID: number;
	ErrorMessage?: string;
	PasswordRule: PasswordRule;
	RefreshToken: string;
	SignalKit: boolean;
	Status?: string;
	Students: Student[];
	Titan: boolean;
	UserType: string;
}

export interface AuthResponseFail {
	error: string;
	success: false;
}

export type AuthResponseData = AuthResponseSuccess | AuthResponseFail;

export function isFail(object: any): object is AuthResponseFail {
	return "success" in object && !object["success"];
}

export class AuthRequestData {
	public AppType: string = "PSP";
	public ClientId: string =
		"q3C/7jHXNOSUKze1RfIgE4jOUpCxXqOQE7U8xfSbJED3Qbrl7aYd2DPldruo29YG6LgnO7AC83ktvqLryBGEdKc8zmmw2TrWCASkRcHxDlo=";
	public SecretKey: string;
	public DateTimeStamp: string;
	public Password: string;
	public Platform: string = "android";
	public UserName: string;
	public UserType: string = "Student";

	constructor(
		SecretKey: string,
		DateTimeStamp: string,
		Password: string,
		UserName: string
	) {
		this.SecretKey = SecretKey;
		this.DateTimeStamp = DateTimeStamp;
		this.Password = Password;
		this.UserName = UserName;
	}
}

export interface HomeScreenData {
	Assignments: Assignment[];
	RecentChanges: Assignment[];
	Messages: Message[];
	ClassSummaryData: ClassSummaryDatum[];
	status: string;
	errors: any[];
}

export interface Assignment {
	AssignedDate: string;
	DueDate: string;
	LastUpdated: string;
	GradingCompleted: boolean;
	GradingCompletedDate: string;
	SchoolCode: number;
	GradebookNumber: number;
	GradebookName: string;
	Period: string;
	AssignmentNumber: number;
	CategoryDescription: string;
	AssignmentName: string;
	Comment: string;
	Status: string;
	Mark: string;
	NumberCorrect: number;
	MaxNumberCorrect: number;
	Score: number;
	MaxScore: number;
	Percentage: number;
	IsExtraCredit: boolean;
	RubricAssignment: boolean;
	IsScoreVisibleToParents: boolean;
	IsMissing: boolean;
	PeriodTitle: string;
}

export interface GradebookAssignment {
	AssignmentDescription: string;
	AssignmentNumber: number;
	Category: string;
	Comment: string;
	DateAssigned: string;
	DateCompleted: string;
	DateDue: string;
	Description: string;
	IsExtraCredit: boolean;
	IsGraded: boolean;
	IsScoreValueACheckMark: boolean;
	IsScoreVisibleToParents: boolean;
	Mark: string;
	MaxScore: number;
	NumberCorrect: number;
	NumberPossible: number;
	Percent: number;
	RubricAssignment: boolean;
	Score: number;
	Type: string;
}

export interface ClassSummaryDatum {
	SchoolCode: number;
	SchoolName: string;
	StudentID: number;
	ShowPeriod: boolean;
	HideScores: boolean;
	ClassSummary: ClassSummary[];
}

export interface ClassSummary {
	Period: number;
	StartTime: string;
	EndTime: string;
	SectionNumber: number;
	GradeBookNumber: number;
	GradeBookName: string;
	DoingRubric: boolean;
	CourseNumber: string;
	CourseTitle: string;
	TeacherNumber: number;
	TeacherName: string;
	RoomNumber: string;
	CurrentMark: string;
	Percent: number;
	Average: string;
	MissingAssignment: number;
	Term: string;
	TermCode: string;
	LastUpdated: null | string;
	PeriodTitle: string;
}

export interface Message {
	ID: string;
	URL: string;
	Title: string;
	Description: string;
	CreateDate: string;
	Priority: number;
}

export interface Category {
	Name: string;
	NumberOfAssignment: number;
	Mark: string;
	PointsEarned: number;
	PointsPossible: number;
	Percent: string;
}

export interface Gradebook {
	GradebookName: string;
	GradebookNumber: number;
	Assignments: GradebookAssignment[];
	Period: number;
	Status: string;
	TermCode: string;
	TermDescription: string;
	StartDate: string;
	EndDate: string;
	Categories: Category[];
}



export enum AbscenceType {
	PRESENT = 0,
	TARDY = 5
}

export interface AttendancePeriod {
	Absencetype: AbscenceType | number;
	Code: string;
	CourseTitle: string | null;
	Description: string;
	Period: number;
	PeriodTitle: string | null
}

export interface AttendanceDetail {
	AbscenceType: AbscenceType | number;
	AllDayCode: string;
	AllDayDescription: string | null;
	AttendanceDate: string;
	AttendancePeriod: number;
}

export type Attendance = {
	AttendanceDetails: AttendanceDetail;
	AttendanceMessage: string | null;
	SchoolCode: number;
	SchoolName: string;
	StudentAttendanceType: number; // TODO
	StudentID: number;
	StudentRedFlag: unknown | null;
}[];


// DOUBLE CHECK COULD BE FAKE
export interface SearchedSchool {
	CDS: string;
	ManagedBy: string;
	isDistrict: boolean;
	SchoolName: string;
	DistrictName: string;
	Status: string;
	County: string;
	StreetAddress: string;
	City: string;
	State: string;
	ZipCode: string;
	MailingAddress: string;
	MailingCity: string;
	MailingState: string;
	MailingZipCode: string;
	AeriesAppParentURL: string;
	AeriesAppStaffURL: string;
	AeriesAppTeacherURL: string;
	AeriesAppParent: boolean;
	AeriesAppStaff: boolean;
	AeriesAppTeacher: boolean;
	RecordsTransferURL: string;
	RecordsTransfer: boolean;
	Fax: string | null;
	PublicPhone: string;
	PublicWebsite: string;
	OpenDate: string;
	CloseDate: string;
	isCharter: boolean;
	Latitude: string;
	Longitude: string;
	PublicAdminFirstName: string;
	PublicAdminLastName: string;
	PublicAdminEmail: string;
	HighGrade: number;
	LowGrade: number;
	LocationType: number;
  }
  
  // For an array of schools
  type SearchResult = SearchedSchool[];
  


// NON AERIES TYPES
export interface GradeChange {
	MaxScore: number;
	Score: number;
	Category: string;
	AssignmentNumber: number;
	Mark: "";
};


export type TermCode = "F" | "S" | string;