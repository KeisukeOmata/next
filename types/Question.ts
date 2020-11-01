import firebase from 'firebase/app'

// Question型
export interface Question {
  id: string
  senderUid: string
  receiverUid: string
  body: string
  isReplied: boolean
  createdAt: firebase.firestore.Timestamp
}