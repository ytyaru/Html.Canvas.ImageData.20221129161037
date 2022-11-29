ImageData.dataでピクセルをバイナリ操作する

　1画像あたり1バイトの配列データとして操作する。1ピクセルあたり4バイト分のデータをもつ。その中身はRGBA各8bit計32bitである。

<!-- more -->

# ブツ

* [DEMO][]
* [リポジトリ][]

[DEMO]:
[リポジトリ]:

# 前回まで

* [][]

# 最少コード

　紫色の四角形が描画される。

## index.html

```html
<canvas id="canvas"></canvas>
<script src="main.js"></script>
```

## main.js

```javascript
const canvas = document.getElementById(`canvas-0`);
const ctx = canvas.getContext(`2d`);
const imageData = ctx.createImageData(100, 100);
for (let i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i + 0] = 190;  // R
    imageData.data[i + 1] = 0;    // G
    imageData.data[i + 2] = 210;  // B
    imageData.data[i + 3] = 255;  // A
}
ctx.putImageData(imageData, 20, 20);
```

# 情報源

* [ImageData][]
* [createImageData][]
* [putImageData][]

[ImageData]:https://developer.mozilla.org/en-US/docs/Web/API/ImageData
[createImageData]:https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createImageData
[putImageData]:https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData

# ImageData.data

　ポイントは`ImageData.data`におけるデータ設定。これは8bitの配列である。要素数はキャンバスサイズX軸とY軸をかけ、さらに色深度`4`をかけた個数になる。たとえば縦横16x16なら16x16x4=1024個になる。

```
0 1 2 3 ...       1023
R|G|B|A|...|R|G|B|A
```

　1ピクセルあたりR,G,B,Aの4個の要素で表現する。[RGBAカラーモデル][]参照。

[RGBAカラーモデル]https://en.wikipedia.org/wiki/RGBA_color_model

名|値|成分
--|----|--
`R`|0〜255|赤色成分
`G`|0〜255|緑色成分
`B`|0〜255|青色成分
`A`|0〜255|アルファ成分（透明）

　これをX,Y各座標における全ピクセル数だけもったものが`ImageData.data`である。つまり特定の座標(X,Y)にある1ピクセルの色を設定するには4個の連続した配列データにそれぞれ色成分値をセットする必要がある。

## 座標位置からインデックスを算出する

　ふつう2DグラフィクスはX,Yの2次元軸で座標指定する。そこで座標`x`,`y`の位置に色成分`r`,`g`,`b`,`a`をセットする関数を作った。

```javascript
function dot(imageData, x, y, r, g, b, a) { // 点を打つ（指定した座標x,yに指定した色rgbaの）
    imageData.data[(x + y * imageData.width) * 4] = r
    imageData.data[(x + y * imageData.width) * 4 + 1] = g
    imageData.data[(x + y * imageData.width) * 4 + 2] = b
    imageData.data[(x + y * imageData.width) * 4 + 3] = a
}
```

　はっきりいってこの程度のメソッドは最初からImageDataに持っててほしかった。以下のようなメソッドがあっても良さそうな気がするのに見つけられなかった。

```javascript
ImageData.dot(16,9, 255,0,0,255)
ImageData.dot(new Point(16,9), new RGBA(255,0,0,255))
```

　[fillRect][]でも可能っぽい。`ImageData.data`より遅いようだが座標指定できるので楽。サイズを1にすればドットと同じ意味になる。色は[fillStyle][]で指定するようだが、なぜ文字列なんだ。関数っぽいのに。`green`などの色名も使えるようで、それは便利だと思うが。

```javascript
ctx.fillStyle = `rgb(0,255,0)`;
ctx.fillRect(x,y,1,1);
```

[fillRect]:https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/fillRect
[fillStyle]:https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/fillStyle

　とにかく、座標を指定して点を打つには[ImageData][]の`data`または[fillRect][]で行うらしい。ジャストなAPIがないのはなぜ？

