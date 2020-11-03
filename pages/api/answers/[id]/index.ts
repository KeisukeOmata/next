import { NextApiRequest, NextApiResponse } from 'next'
import '../../../../lib/firebase_admin'
import { firestore } from 'firebase-admin'
import { Answer } from './../../../../types/Answer'
import { Question } from './../../../../types/Question'
import { Data } from './../../../../types/Data'

// API取得
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const id = req.query.id as string

  // firebaseから回答を取得
  const answerDoc = await firestore()
    .collection('answers')
    .doc(id)
    .get()
  // ジェネリクスでAnswer型に
  const answer = answerDoc.data() as Answer
  // id付与
  answer.id = answerDoc.id

  // firebaseから質問を取得
  const questionDoc = await firestore()
    .collection('questions')
    .doc(answer.questionId)
    .get()
  // ジェネリクスでQuestion型に
  const question = questionDoc.data() as Question
  // id付与
  question.id = questionDoc.id

  // jsonで回答と質問を返す
  res.status(200).json({
    answer,
    question,
  })
}
