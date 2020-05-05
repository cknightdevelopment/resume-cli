import { CommandNames } from '../command/command-names.model';

export interface ResumeDataModel {
  options: CliOptionsModel;
  random: string[];
  education: EducationModel[];
  skills: SkillSetModel[];
  links: LinkModel[];
  workHistory: WorkHistoryModel[];
  contact: ContactModel;
  issue: IssueModel;
  help: HelpModel;
}

export interface CliOptionsModel {
  cliName: string;
  initHelp: InitHelpTypes;
}

export enum InitHelpTypes {
  Always = 'always',
  Never = 'never',
  First = 'first'
}

export interface CustomizableResumeDataModel extends Omit<ResumeDataModel, 'issue' | 'help'> {
}

export interface EducationModel {
  name: string;
  url?: string;
  logoUrl?: string;
  logoHeight?: string;
  location: string;
  start: string;
  end: string;
  highlights?: string[];
  other?: string[];
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
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export class IssueModel {
  url: string;
  title?: string;
}

export class HelpModel {
  sourceCodeUrl: string;
  buildStatus: CodeStatusModel;
  coverageStatus: CodeStatusModel;
  commands: CommandHelpModel[];
}

export class CodeStatusModel {
  linkUrl: string;
  imgUrl: string;
}

export class CommandHelpModel {
  name: string;
  description: string;
  arguments?: ArgumentHelpModel[];
}

export class ArgumentHelpModel {
  name: string;
  description: string;
  required?: boolean;
  default?: string;
}
