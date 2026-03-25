export interface Weather {
  id: number;
  location: string;
  leadtime?: string;
  risk?: string;
  rainfall?: string;
  icon?: string;
  icon2?: string;
  details:any;
}
