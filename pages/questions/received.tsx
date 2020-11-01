import * as React from "react";
import { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import { useAuthentication } from '../../hooks/authentication'
import { Question } from '../../types/Question'
import Layout from '../../components/Layout'
// import * as dayjs from 'dayjs'
const dayjs = require('dayjs');
import 'dayjs/locale/ja'

// 日本時間対応
dayjs.locale('ja')

export default function QuestionsReceived() {
  // Question型の配列を持つ質問state
  const [questions, setQuestions] = useState<Question[]>([])
  const { user } = useAuthentication()

  useEffect(() => {
    // SSRの場合return
    if (!process.browser) {
      return
    }
    // ログインしていない場合return
    if (user === null) {
      return
    }

    async function loadQuestions() {
      // 複数の値を取得する場合はdocではなくsnapshot
      const snapshot = await firebase
        .firestore()
        .collection('questions')
        // userのuidに紐づくデータをfirebaseから取得
        // currentUser.uidではリロードでエラーになるため、既に作成済みのuseAuthenticationから取得する
        .where('receiverUid', '==', user.uid)
        .orderBy('createdAt', 'desc')
        .get()

      if (snapshot.empty) {
        return
      }

      const gotQuestions = snapshot.docs.map((doc) => {
        const question = doc.data() as Question
        question.id = doc.id
        return question
      })
      setQuestions(gotQuestions)
    }

    loadQuestions()

  // process.browserかuserが更新された場合、再度呼び出す
  }, [process.browser, user])

  return (
    <Layout>
      <h1 className="h4"></h1>
      {/* justify-content-centerでcolの中央寄せ */}
      <div className="row justify-content-center">
        {/* モバイルは横幅いっぱい、PCはcontainerの半分 */}
        <div className="col-12 col-md-6">
          {questions.map((question) => (
            <div className="card my-3" key={question.id}>
              <div className="card-body">
                {/* text-truncateではみ出る部分を省略 */}
                <div className="text-truncate">{question.body}</div>
                <div className="text-muted text-right">
                  {/* createdAtをdayjsで日本時間表示 */}
                  <small>{dayjs(question.createdAt.toDate()).format('YYYY/MM/DD HH:mm')}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}