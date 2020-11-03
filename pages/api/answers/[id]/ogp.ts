import { NextApiRequest, NextApiResponse } from 'next'
import { createCanvas, registerFont, loadImage } from 'canvas'
import { ApiError } from 'next/dist/next-server/server/api-utils'
import * as path from 'path'
import { SeparatedText } from '../../../../types/SeparatedText'

// canvas
// canvas_lib64が必要
// package.jsonのscriptsに以下を記載
// "now-build": "cp canvas_lib64/*so.1 node_modules/canvas/build/Release/ && yarn build"


// APIを作成
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // 渡されたテキストを分割して返す
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

  // createTextLineにテキストを渡す
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
  // const lines = createTextLines(context, question.body)
  // lines.forEach((line, index) => {
  //   const y = 157 + 40 * (index - (lines.length - 1) / 2)
  //   context.fillText(line, 300, y)
  // })
  // 画像のバッファを取得
  const buffer = canvas.toBuffer()

  // バイナリとしてレスポンスすることでブラウザに表示
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length,
  })
  res.end(buffer, 'binary')

}