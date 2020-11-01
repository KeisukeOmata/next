import * as React from "react";
import { useEffect, useState, useRef } from 'react'
import firebase from 'firebase/app'
import { useAuthentication } from '../../hooks/authentication'
import { Question } from '../../types/Question'
import Layout from '../../components/Layout'
// import * as dayjs from 'dayjs'
const dayjs = require('dayjs');
import 'dayjs/locale/ja'
import Link from 'next/link'

// 日本時間対応
dayjs.locale('ja')

export default function QuestionsReceived() {
  // Question型の配列を持つ質問state
  const [questions, setQuestions] = useState<Question[]>([])
  // スクロールstate
  const [isPaginationFinished, setIsPaginationFinished] = useState(false)
  // useRefでDOMの参照を行う
  // 質問一覧を囲んでいるコンテナを参照
  const scrollContainerRef = useRef(null)
  const { user } = useAuthentication()  

  // クエリを作成
  function createBaseQuery() {
    return firebase
      .firestore()
      .collection('questions')
      // userのuidに紐づくデータをfirebaseから取得
      // currentUser.uidではリロードでエラーになるため、既に作成済みのuseAuthenticationから取得する
      .where('receiverUid', '==', user.uid)
      // indexを作成していない場合、エラー画面からindex作成のリンクが表示される
      .orderBy('createdAt', 'desc')
      // 10件取得する
      .limit(10)
  }
  
  // 質問stateを更新する
  function appendQuestions(snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) {
    // question.idにfirebaseに登録されているidを振ったgotQuestions配列を作成
    const gotQuestions = snapshot.docs.map((doc) => {
      const question = doc.data() as Question
      // question.idにfirebaseに登録されているidを振った値を返す
      question.id = doc.id
      return question
    })
    // 質問stateを更新
    // concat()で2つ以上の配列を結合し、新しい配列を返す
    // Question型の配列を持つ質問state配列に、gotQuestionsを統合する
    setQuestions(questions.concat(gotQuestions))
  }
  
  // データを取得する
  async function loadQuestions() {
    // クエリを作成
    const snapshot = await createBaseQuery().get()
    // 該当なしの場合
    if (snapshot.empty) {
      // スクロールstateを更新
      setIsPaginationFinished(true)
      return
    }
    // 質問stateを更新する
    appendQuestions(snapshot)
  }
  
  // 無限スクロールで呼ばれる
  async function loadNextQuestions() {
    // 質問stateが空であればreturn
    if (questions.length === 0) {
      return
    }
    // 質問stateの最後に格納されている値
    const lastQuestion = questions[questions.length - 1]
    const snapshot = await createBaseQuery()
      // startAfterで現在取得済みの値以降のデータを取得する
      // 質問stateの最後に格納されている値のcreatedAtを渡す
      .startAfter(lastQuestion.createdAt)
      .get()
    // 該当なしの場合
    if (snapshot.empty) {
      // スクロールstateを更新
      setIsPaginationFinished(true)
      return
    }
    // 質問stateを更新する
    appendQuestions(snapshot)
  }

  useEffect(() => {
    // SSRの場合return
    if (!process.browser) {
      return
    }
    // ログインしていない場合return
    if (user === null) {
      return
    }
    // データを取得する
    loadQuestions()
  // process.browserかuserが更新された場合、再度呼び出す
  }, [process.browser, user])

  // データの続きを取得する
  function onScroll() {
    // 無限スクロールが終わった(snapshotが空)場合return
    if (isPaginationFinished) {
      return
    }
    // 質問一覧を囲んでいるコンテナを参照
    const container = scrollContainerRef.current
    // まだDOMが生成されていない場合return
    if (container === null) {
      return
    }
    // getBoundingClientRectで要素の寸法と、そのビューポートに対する位置を返す
    const rect = container.getBoundingClientRect()
    // 取得したDOMの高さが、ブラウザウィンドウのビューポートの高さよりも大きければreturn
    if (rect.top + rect.height > window.innerHeight) {
      return
    }
    // 取得したDOMの高さが、ブラウザウィンドウのビューポートの高さよりも小さければデータの続きを取得する
    loadNextQuestions()
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    // returnでDOM が破棄されたとき
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  // useEffectの中で使っている値が変わった場合は。useEffectを再実行する
  // setstateしたから中身が置き換わるわけではない
  // useEffectの中は再実行されない限り変更されない
  }, [
    // 質問stateが更新されたとき
    questions,
    // 質問一覧を囲んでいるコンテナが更新されたとき
    scrollContainerRef.current,
    // スクロールstateが更新されたとき
    isPaginationFinished
  ])

  return (
    <Layout>
      <h1 className="h4"></h1>
      {/* justify-content-centerでcolの中央寄せ */}
      <div className="row justify-content-center">
        {/* モバイルは横幅いっぱい、PCはcontainerの半分 */}
        {/* useRefでDOMの参照を行う */}
        {/* 質問一覧を囲んでいるコンテナを参照 */}
        <div className="col-12 col-md-6" ref={scrollContainerRef}>
          {questions.map((question) => (
            <Link
              href="/questions/[id]"
              as={`/questions/${question.id}`}
              key={question.id}
            >
              <a>
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
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}