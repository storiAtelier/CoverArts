# CoverArts

本の表紙に使える汎用的なSVG/PNGアートジェネレーター

## 概要

シンプルで美しい本の表紙デザインを、テンプレートとカラーパターンから自動生成します。

## パターン

- **pattern1**: 幾何学的抽象デザイン（縦長 800x1200）
- **pattern1-wide**: 幾何学的抽象デザイン（横長 1200x800）
- **pattern2**: ミニマルライン
- **pattern3**: グラデーションウェーブ
- **pattern4**: 二重枠（本風デザイン）
- **pattern5**: 本棚風（縦長）
- **pattern5-wide**: 本棚風（横長 2列）

## カラーバリエーション

各パターンに9色のバリエーション：

- mono（モノトーン）
- blue（濃いブルー）
- blue-pastel（淡いブルー）
- red（濃いレッド）
- red-pastel（淡いレッド）
- green（濃いグリーン）
- green-pastel（淡いグリーン）
- purple（濃いパープル）
- purple-pastel（淡いパープル）

合計: **7パターン × 9色 = 63個**のデザイン

## 使い方

### SVG生成

```bash
npm run generate
```

全てのSVGが`svgs/`フォルダに生成されます。

### PNG変換

```bash
npm run convert
```

SVGからPNGが`output/`フォルダに生成されます。

## ディレクトリ構造

```
coversvg/
├── templates/          # テンプレートファイル
│   ├── pattern1/
│   │   ├── base.svg   # 白黒ベーステンプレート
│   │   └── colors.yml # カラーパターン定義
│   └── ...
├── svgs/              # 生成されたSVG（63個）
├── output/            # 生成されたPNG（63個）
└── scripts/           # ビルドスクリプト
```

## カスタマイズ

### 新しいカラーパターンの追加

`templates/pattern*/colors.yml`を編集して、新しい色を追加できます。

例：
```yaml
custom:
  ColorBgStart: "#yourcolor"
  ColorBgEnd: "#yourcolor"
  # ...
```

### 新しいパターンの追加

1. `templates/new-pattern/`フォルダを作成
2. `base.svg`にデザインを作成（プレースホルダーは`{{ParamName}}`形式）
3. `colors.yml`にカラーパターンを定義
4. `npm run generate`で生成

## 技術スタック

- Node.js
- SVG
- js-yaml
- sharp (PNG変換)

## ライセンス

MIT
