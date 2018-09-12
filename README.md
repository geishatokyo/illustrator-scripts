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
ルート直下に「original」と名前をつけたレイヤーを作成し、その中に必要なPathを追加してください。

実行すると、「outline」「silhouette」のレイヤーが作成され、その中にそれぞれ輪郭化、シルエット化されたPathが作られます。また、それぞれの画像も出力されます。画像の名前は
* {docName}.png
* {docName}_outline.png
* {docName}_silhouette.png

で、イラストレーターのaiファイルを同じフォルダに保存されます。