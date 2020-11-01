import firebase from 'firebase/app'
import { useEffect, useState } from 'react'
// URLにパラメータを動的に含めてアクセス
import { useRouter } from 'next/router'
import { User } from '../../types/User'
import { Query } from '../../types/Query'
import Layout from '../../components/Layout'

export default function UserShow() {
  const router = useRouter()
  // グローバルに管理する必要がないため、RecoilではなくuseState
  const [user, setUser] = useState<User>(null)
  const query = router.query as Query

  useEffect(() => {
    // queryに値がある場合だけ処理する
    if (query.uid === undefined) {
      return
    }

    async function loadUser() {
      const doc = await firebase
        .firestore()
        .collection('users')
        .doc(query.uid)
        .get()
  
      if (!doc.exists) {
        return
      }
  
      const gotUser = doc.data() as User
      gotUser.uid = doc.id
      setUser(gotUser)
    }

    loadUser()
  // query.uidが変更される度に呼び出す
  }, [query.uid])
  
  return (
    <Layout>
      {user && (
        <div className="text-center">
          <h1 className="h4">{user.name}さんのページ</h1>
          <div className="m-5">{user.name}さんに質問しよう！</div>
        </div>
      )}
    </Layout>
  )
}