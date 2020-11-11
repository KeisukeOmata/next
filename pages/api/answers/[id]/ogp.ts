import { NextApiRequest, NextApiResponse } from 'next'
import { createCanvas, registerFont, loadImage } from 'canvas'
import * as path from 'path'
import { SeparatedText } from '../../../../types/SeparatedText'
import '../../../../lib/firebase_admin'
import { firestore } from 'firebase-admin'
import { Answer } from '../../../../types/Answer'
import { Question } from '../../../../types/Question'

// canvas
// canvas_lib64が必要
// package.jsonのscriptsに以下を記載
// "now-build": "cp canvas_lib64/*so.1 node_modules/canvas/build/Release/ && yarn build"

// API取得
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // 回答を取得
  const id = req.query.id as string
  const answerDoc = await firestore()
    .collection('answers')
    .doc(id)
    .get()
  const answer = answerDoc.data() as Answer
  // 質問を取得
  const questionDoc = await firestore()
    .collection('questions')
    // 回答から質問idを取得する
    .doc(answer.questionId)
    .get()
  const question = questionDoc.data() as Question

  function createTextLine(context, text: string): SeparatedText {
    const maxWidth = 400
    for (let i = 0; i < text.length; i++) {
      const line = text.substring(0, i + 1)
      if (context.measureText(line).width > maxWidth) {
        return {
          line,
          remaining: text.substring(i + 1),
        }
      }
    }
    return {
      line: text,
      remaining: '',
    }
  }
  
  function createTextLines(context, text: string): string[] {
    const lines: string[] = []
    let currentText = text
    while (currentText !== '') {
      const separatedText = createTextLine(context, currentText)
      lines.push(separatedText.line)
      currentText = separatedText.remaining
    }
    return lines
  }

  // canvasの作成
  const width = 600
  const height = 315
  const canvas = createCanvas(width, height)
  // 2D描画用のコンテキストを取得
  const context = canvas.getContext('2d')
  // 背景色
  // context.fillStyle = '#fafafa'
  // 背景画像
  const backgroundImage = await loadImage(
    path.resolve('./images/image.jpg')
  )
  context.drawImage(backgroundImage, 0, 0, width, height)
  // テキスト
  // フォントのpathを指定
  registerFont(path.resolve('./fonts/ipagp.ttf'), {
    family: 'ipagp',
  })
  context.font = '20px ipagp'
  // 文字色
  context.fillStyle = '#424242'
  // 設定された色で塗る
  // context.fillRect(0, 0, width, height)
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  // 改行を作成
  const lines = createTextLines(context, question.body)
  lines.forEach((line, index) => {
    const y = 157 + 40 * (index - (lines.length - 1) / 2)
    context.fillText(line, 300, y)
  })
  // 画像のバッファを取得
  const buffer = canvas.toBuffer()
  // バイナリとしてレスポンスすることでブラウザに表示
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length,
  })
  res.end(buffer, 'binary')

}