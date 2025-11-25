export interface VisualDetails {
  camera_movement: string;
  angle: string;
  lighting: string;
  lens_choice: string;
}

export interface Cut {
  sequence: number;
  title: string;
  action_description: string;
  visuals: VisualDetails;
  generated_prompt: string;
}

export interface DirectorResponse {
  title: string;
  logline: string;
  mood: string;
  cuts: Cut[];
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
