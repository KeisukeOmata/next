FROM node:12.18.4 AS nodejs

# 作業用（working）ディレクトリを指定
WORKDIR /tmp

# Node.jsのダウンロード
RUN curl -LO https://nodejs.org/dist/v12.18.4/node-v12.18.4-linux-x64.tar.xz
RUN tar xvf node-v12.18.4-linux-x64.tar.xz
RUN mv node-v12.18.4-linux-x64 node

FROM node:12.18.4

# node.jsをコピー
COPY --from=nodejs /tmp/node /opt/node
ENV PATH /opt/node/bin:$PATH

# yarnのインストール
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH /root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin:$PATH

# 作業用（working）ディレクトリを指定
WORKDIR /app

# 実行時、コマンド指定がない場合に実行されるコマンド
CMD ["bash"] 