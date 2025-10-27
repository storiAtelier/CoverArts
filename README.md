# CoverArts

本の表紙に使える汎用的なSVG/PNGアートジェネレーター

## 🎨 ギャラリー

**[GitHub Pagesでギャラリーを見る](https://storiAtelier.github.io/CoverArts/)**

すべてのデザインパターンとカラーバリエーションをブラウザで確認・ダウンロードできます。

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

### ギャラリーHTML生成

```bash
npm run gallery
```

`index.html`にギャラリーページが生成されます。

### すべてを一度に実行

```bash
npm run build
```

SVG生成 → PNG変換 → ギャラリー生成を一度に実行します。

## ディレクトリ構造

```
CoverArts/
├── templates/          # テンプレートファイル
│   ├── pattern1/
│   │   ├── base.svg   # 白黒ベーステンプレート
│   │   └── colors.yml # カラーパターン定義
│   └── ...
├── svgs/              # 生成されたSVG（63個）
├── output/            # 生成されたPNG（63個）
├── scripts/           # ビルドスクリプト
│   ├── apply-colors.js       # SVG生成
│   ├── svg-to-png.js         # PNG変換
│   └── generate-gallery.js   # ギャラリー生成
├── index.html         # ギャラリーページ（自動生成）
└── .github/
    └── workflows/
        └── deploy-pages.yml  # GitHub Pages自動デプロイ
```

## GitHub Pages デプロイ

このリポジトリは、mainブランチにプッシュすると自動的にGitHub Pagesにデプロイされます。

### 初回設定

1. GitHubリポジトリの Settings → Pages に移動
2. Source を "GitHub Actions" に設定
3. mainブランチにプッシュすると自動デプロイが開始されます

デプロイ後、`https://storiAtelier.github.io/CoverArts/` でギャラリーが閲覧できます。

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
4. `npm run build`で生成

## 技術スタック

- Node.js
- SVG
- js-yaml
- sharp (PNG変換)
- GitHub Actions (自動デプロイ)
- GitHub Pages (ホスティング)

## ライセンス

CC0 1.0 Universal (CC0 1.0) Public Domain Dedication

生成されたすべてのデザイン（SVG/PNG）はパブリックドメインです。
商用・非商用問わず、自由に使用・改変・配布できます。
クレジット表記は不要です。

https://creativecommons.org/publicdomain/zero/1.0/deed.ja
