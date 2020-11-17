import firebase from 'firebase/app'
import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { User } from '../types/User'

// グローバルなstate
// stateをUser型で作成
const userState = atom<User>({
  key: 'user',
  // デフォルト値はnull => 未ログインを表す
  default: null,
})

// useAuthenticationフック
export function useAuthentication() {
  // useStateの代わりにuseRecoilStateを使う
  // グローバルなstate管理
  const [user, setUser] = useRecoilState(userState)

  async function createUserIfNotFound(user: User) {
    const userRef = firebase.firestore().collection('users').doc(user.uid)
    const doc = await userRef.get()
    if (doc.exists) {
      return
    }
  
    await userRef.set({
      name: 'taro' + new Date().getTime(),
    })
  }
  // domがマウントされたタイミングで呼ばれる
  useEffect(() => {
    // userの値が設定されていればreturn
    if (user !== null) {
      return
    }

    // firebase初期化
    firebase
      .auth()
      .signInAnonymously()
      .catch(function (error) {
        // Handle Errors here.
        console.error(error)
      })

    firebase.auth().onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        const loginUser: User = {
          uid: firebaseUser.uid,
          isAnonymous: firebaseUser.isAnonymous,
          name: '',
        }
        setUser(loginUser)
        createUserIfNotFound(loginUser)
      } else {
        // User is signed out.
        setUser(null)
      }
    })
  // 空の配列を渡すことで1度だけ呼ばれる
  }, [])

  return { user }
}