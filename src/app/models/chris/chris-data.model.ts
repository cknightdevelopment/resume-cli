export interface ChrisDataModel {
  facts: string[];
  education: EducationModel;
  skills: SkillSetModel[];
  links: LinkModel[];
  workHistory: WorkHistoryModel[];
  contact: ContactModel;
  issue: IssueModel;
}

export interface EducationModel {
  college: CollegeModel;
}

export interface CollegeModel {
  name: string;
  url: string;
  logo: string;
  location: string;
  start: string;
  end: string;
  degree: string;
  highlights: string[];
  other: string[];
}

export interface SkillSetModel {
  title: string;
  maxRating: number;
  ratings: SkillRatingModel[];
}

export interface SkillRatingModel {
  name: string;
  rating: number;
}

export interface LinkModel {
  title: string;
  url: string;
  icon: string;
}

export interface WorkHistoryModel {
  employer: string;
  position: string;
  start: string;
  end: string;
  details: string[];
}

export class ContactModel {
  email: string;
  phone: string;
}

export class IssueModel {
  url: string;
}
