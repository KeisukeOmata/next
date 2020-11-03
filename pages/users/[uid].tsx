import * as React from "react";
import firebase from 'firebase/app'
import { useEffect, useState } from 'react'
// URLにパラメータを動的に含めてアクセス
import { useRouter } from 'next/router'
import { User } from '../../types/User'
import { Query } from '../../types/Query'
import Layout from '../../components/Layout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'

export default function UserShow() {
  const router = useRouter()
  // ユーザーのstate
  // グローバルに管理する必要がないため、RecoilではなくuseState
  const [user, setUser] = useState<User>(null)
  const query = router.query as Query
  // フォームのstate
  const [body, setBody] = useState('')
  // ボタンのstate
  const [isSending, setIsSending] = useState(false)

  // query.uidが変更された場合firebaseからユーザーの読み込みを行う
  useEffect(() => {
    // queryに値がある場合だけ処理する
    if (query.uid === undefined) {
      return
    }

    // firebaseからユーザーの読み込みを行う
    async function loadUser() {
      // 複数の値を取得する場合はdocではなくsnapshot
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
      // ユーザーのstateにfirebaseから取得した値を設定
      setUser(gotUser)
    }

    loadUser()
  // query.uidが変更される度に呼び出す
  }, [query.uid])
  
  // フォームのsubmitで呼ばれる
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    // ボタンのstateを変更
    setIsSending(true)
    // firebaseにaddする
    await firebase.firestore().collection('questions').add({
    senderUid: firebase.auth().currentUser.uid,
    receiverUid: user.uid,
    // フォームのstate
    body,
    isReplied: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    // ボタンのstateを戻す
    setIsSending(false)
  
    toast.success('質問を送信しました。', {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    
    // フォームのstateを初期化
    setBody('')
  }

  return (
    <Layout>
      {user && firebase.auth().currentUser && (
        <div className="text-center">
          <h1 className="h4">{user.name}さんのページ</h1>
          <div className="m-5">{user.name}さんに質問しよう！</div>
          {/* フォーム */}
          {/* justify-content-centerでcolの中央寄せ */}
          <div className="row justify-content-center mb-3">
            {/* モバイルは横幅いっぱい、PCはcontainerの半分 */}
            <div className="col-12 col-md-6">
              {user.uid === firebase.auth().currentUser.uid ? (
                <div>自分には送信できません。</div>
              ) : (
                <div>
                  <form onSubmit={onSubmit}>
                    <textarea
                      className="form-control"
                      placeholder="おげんきですか？"
                      rows={6}
                      // formの入力値でstateを更新
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      required
                    ></textarea>
                    <div className="m-3">
                      {isSending ? (
                        // ボタンのstateがtrueの場合アニメーションを表示する
                        <div className="spinner-border text-secondary" role="status">
                        </div>
                      ) : (
                        // ボタンのstateがfalseの場合ボタンを表示する
                        <button type="submit" className="btn btn-primary">
                          質問を送信する
                        </button>
                      )}
                    </div>
                  </form>
                  <div>
                    {user && (
                      <p>
                        <Link href="/users/me">
                          <a className="btn btn-link">自分もみんなに質問してもらおう！</a>
                        </Link>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </Layout>
  )
}