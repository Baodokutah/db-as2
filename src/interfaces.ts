export interface ClassDetail {
    id: string;
    group: string;
    attendantnumber: number;
    maxstudent: number;
    instructor:string;
    rnumber: number;
    sweek: number;
    startTime: Date;
    endTime: Date;
  }
  

export interface Subject {
    id: string;
    name: string;
    coursecredit: number;
    // tuitioncredit: number;
    // periodnumber
    details: ClassDetail[];
  }