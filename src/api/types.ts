export interface IError {
  response?: {
    data?: any;
    status: number;
  };
}

export interface IUserProfile {
  user: {
    id: number;
    uuid: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  avatar: string;
  title: string;
  time_zone: string;
  region: number;
}
