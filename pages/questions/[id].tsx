import * as React from "react";
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import Layout from '../../components/Layout'
import { Question } from '../../types/Question'
import { Answer } from '../../types/Answer'
import { useAuthentication } from '../../hooks/authentication'

// 型を内部で宣言する
type Query = {
  id: string
}

export default function QuestionsShow() {
  // URLを動的に作成
  const router = useRouter()
  // Query型のuseRouter
  const query = router.query as Query
  const { user } = useAuthentication()
  // 質問state
  const [question, setQuestion] = useState<Question>(null)
  // ボタンのstate
  const [isSending, setIsSending] = useState(false)
  // フォームのstate
  const [body, setBody] = useState('')
  // 回答state
  const [answer, setAnswer] = useState<Answer>(null)

  // 質問stateと回答stateを更新する
  async function loadData() {
    // 質問stateを更新する
    if (query.id === undefined) {
      return
    }
    // firebaseからデータを取得
    const questionDoc = await firebase
      .firestore()
      .collection('questions')
      .doc(query.id)
      .get()
    // 該当がなければreturn
    if (!questionDoc.exists) {
      return
    }
    // Question型で取得結果を変数に格納
    const gotQuestion = questionDoc.data() as Question
    gotQuestion.id = questionDoc.id
    // 質問stateを更新
    setQuestion(gotQuestion)

    // 回答stateを更新する
    if (!gotQuestion.isReplied) {
      return
    }
    // firebaseからデータを取得
    const answerSnapshot = await firebase
      .firestore()
      .collection('answers')
      .where('questionId', '==', gotQuestion.id)
      .limit(1)
      .get()
    // 該当がなければreturn
    if (answerSnapshot.empty) {
      return
    }
    // Answer型で取得結果を変数に格納
    const gotAnswer = answerSnapshot.docs[0].data() as Answer
    gotAnswer.id = answerSnapshot.docs[0].id
    // 回答stateを更新
    setAnswer(gotAnswer)
  }

  // query.idとuserが更新される度に呼ばれる
  useEffect(() => {
    // ログインチェック
    if (user === null) {
      return
    }
    // 質問stateを更新する
    loadData()
  }, [query.id, user])

  // フォームのsubmitで呼ばれる
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // ボタンのstateを更新
    setIsSending(true)
    // firebaseから回答を取得
    const answerRef = firebase.firestore().collection('answers').doc()
    // runTransactionで複数のデータを操作する
    await firebase.firestore().runTransaction(async (t) => {
      // runTransactionにはaddがないため、setメソッドを使う
      // 新規で作成する場合は引数なしのdocメソッドを使う
      t.set(answerRef, {
        uid: user.uid,
        questionId: question.id,
        body,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      // 更新処理
      t.update(firebase.firestore().collection('questions').doc(question.id), {
        // 既読フラグ
        isReplied: true,
      })
    })
    const now = new Date().getTime()
    // 回答stateを更新する
    setAnswer({
      id: answerRef.id,
      uid: user.uid,
      questionId: question.id,
      body,
      createdAt: new firebase.firestore.Timestamp(now / 1000, now % 1000),
    })
  }

  return (
    <Layout>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          {question && (
            <>
              <div className="card">
                <div className="card-body">{question.body}</div>
              </div>
              <section className="text-center mt-4">
                <h2 className="h4">回答</h2>
                {answer === null ? (
                  // 未回答の場合
                  <form onSubmit={onSubmit}>
                    <textarea
                      className="form-control"
                      placeholder="おげんきですか？"
                      rows={6}
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      required
                    ></textarea>
                    <div className="m-3">
                      {isSending ? (
                        // 送信中の場合
                        <div
                          className="spinner-border text-secondary"
                          role="status"
                        ></div>
                      ) : (
                        <button type="submit" className="btn btn-primary">
                          回答する
                        </button>
                      )}
                    </div>
                  </form>
                ) : (
                  // 回答済みの場合
                  <div className="card">
                    <div className="card-body text-left">{answer.body}</div>
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}