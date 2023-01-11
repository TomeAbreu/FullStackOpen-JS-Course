export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CourseNormalPart extends CoursePartBase {
  type: 'normal';
}

export interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CoursePartBase {
  type: 'submission';
  exerciseSubmissionLink: string;
}

export interface CourseDescriptionPart extends CoursePartBase {
  type: 'description';
  description: string;
}

//Type for CoursePart
export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseDescriptionPart;
