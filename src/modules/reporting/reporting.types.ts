export interface ReportRecord {
  id: string;
  teamId: string;
  ownerId: string;
  name: string;
  slug: string;
  status: string;
  format: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportRow {
  key: string;
  label: string;
  value: string | number;
}
