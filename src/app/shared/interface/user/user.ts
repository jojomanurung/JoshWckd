import firebase from 'firebase/app';

export interface User extends firebase.UserInfo {
  permission?: Permission | null
}

interface Permission {
  create: boolean,
  read: boolean,
  update: boolean,
  delete: boolean,

}
