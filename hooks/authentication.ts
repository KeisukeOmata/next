import firebase from 'firebase/app'
import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { User } from '../types/User'

// stateをUser型で作成
const userState = atom<User>({
  key: 'user',
  default: null,
})

// useAuthenticationフック
export function useAuthentication() {
  // useStateの代わりにuseRecoilStateを使う
  const [user, setUser] = useRecoilState(userState)

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
        // stateを設定
        setUser({
          uid: firebaseUser.uid,
          isAnonymous: firebaseUser.isAnonymous,
        })
      } else {
        // User is signed out.
        setUser(null)
      }
    })
  // 空の配列を渡すことで1度だけ呼ばれる
  }, [])

  return { user }
}