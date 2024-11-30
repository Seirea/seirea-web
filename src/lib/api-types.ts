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
export type AuthResponseData = {
	success: boolean;
	data: AuthResponseSuccess | AuthResponseFail;
};

export interface Assignment {
	name: string;
	percent: number;
	duedate: number;
	score: number;
	total: number;
	graded: boolean;
	category: string;
	description: string;
	classname?: string;
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
	public url: URL;

	constructor(
		SecretKey: string,
		DateTimeStamp: string,
		Password: string,
		UserName: string,
		url: URL
	) {
		this.SecretKey = SecretKey;
		this.DateTimeStamp = DateTimeStamp;
		this.Password = Password;
		this.UserName = UserName;
		this.url = url;
	}
}
