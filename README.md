#

## 導入方法

Mac

    /Applications/Adobe Illustrator CS6/プリセット/ja_JP/スクリプト

Win

    C:\program files\Adobe Illustrator CS6\プリセット/ja_JP/スクリプト

(Illustratorのバージョンによってパスはかわることがあるので、パスは自分の環境で確認して下さい)

に移動し、このレポジトリを

    git clone git@github.com:geishatokyo/illustrator-scripts.git GTE-Scripts
    
のコマンドでチェックアウトしてください。
GTE-Scriptsの部分はディレクトリ名なので、好きな名前に変更して大丈夫です。
チェックアウトが完了したら、Illustratorを再起動してください。

## 更新方法

cloneしたディレクトリで

    git pull

を実行してください。


## gitが入っていない場合の導入方法

この右側あたりにあるDownload ZIPをクリックしてzipをダウンロードしてきて、
導入方法に書かれているパスに解凍してください。
または、jsファイルを手動でダウンロードしてきてもOKです。

* bt
* hc

のディレクトリの中に入っているスクリプト以外は必要ありません。


## 実行方法

導入できたら、上部のメニュ>ファイル>スクリプトに、各種スクリプトが追加されています。



## スクリプトの種類

### Save selected items as PNG.js

選択したオブジェクトをPNGで保存するスクリプトです。
保存時に２倍サイズの画像も同時に保存します。

### Export UI positions.js

UI用の画像の吐き出しと、各要素の位置情報を出力します。
オブジェクトの名前により、出力が制御されます。
詳細はwikiを参照してください。


### Export avatar images.js

アバターの画像を出力します。
出力のルールは、visibleなレイヤーの
* 名前の付いたアイテム
* 名前の付いたグループに入っている名前の無いアイテム
になります。
グループの場合はすべての名無しの子供、孫をまとめた画像になります。
画像名は、アイテムにつけた名前.pngになります。

### export_fillit_line_pics

FillItの画像の輪郭化とシルエット化を行い、画像を保存します。
ルート直下に「original」と名前をつけたレイヤーを作成し、その中に出力したい画像のまとまり毎にサブレイヤーを作ってください。

実行すると、「outline」「silhouette」のレイヤーが作成され、その中にそれぞれ輪郭化、シルエット化されたアイテムが作られます。また、それぞれの画像も出力されます。画像の名前は
* images/{layer_name}.png
* images/{layer_name}_outline.png
* images/{layer_name}_silhouette.png

で、イラストレーターのaiファイルと同じフォルダに保存されます。





## ビルド

一部のスクリプトを除いてTypeScriptに置き換わっています。
ソースはsrcディレクトリ以下に入っています

### 事前準備

#### 1. npmの準備

nvmを利用して入れることを推奨します


#### 2. webpackのインストール

ビルドにwebpackが必要なのでglobalインストールしておいてください。

    npm install webpack -g

#### 3. ライブラリのインストール

後はライブラリをインストールしてください

    npm install

### ビルド

    npm run build
    npm run watch

前者は一回だけビルド、後者は変更があるたびに継続ビルドします
watchで初回に出る様々なエラーは無視してOKです。

### 注意

* ec5にすら対応していないAdobe javascriptで無理やり動かしている関係上、TypeScriptのPropertyが使用出来ません

## 構成

WebPackでビルド、ファイルの結合を行っています。
また、Illustratorのスクリプトの型情報は
https://github.com/pravdomil/Types-for-Adobe
を使用しています。npmからも取得可能ですが、まだかなりバギーなためgit subtreeでローカルに落としてきています。
最終的にadobe script用のpolyfillと結合しec5相当の環境で動くようにしています。