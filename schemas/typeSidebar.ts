export interface Team {
  createBy: string;
  teamName: string;
  _id: string;
}

export interface FILE {
  archive: boolean;
  createdBt: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
}
