export interface UsersRecord {
  id?: string;
  email?: string;
  username?: string;
}
export interface UsersResponse {
  id?: string;
  email?: string;
  username?: string;
}
export interface ExternalauthsResponse {
  id?: string;
  recordRef?: string;
}
export interface SuperusersResponse {
  id?: string;
  email?: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TypedPocketBase = any;
