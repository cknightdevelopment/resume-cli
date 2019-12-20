export interface ChrisDataModel {
  facts: string[];
  education: EducationModel;
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
