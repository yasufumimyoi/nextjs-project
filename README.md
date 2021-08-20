# Anime Tracker

## 目次

- アプリ概要
- アプリ機能一覧
- 使用イメージ
- 利用ツール・フレームワーク・ライブラリ
- データ設計
- Firestore セキュリティルールの設定

# アプリ概要

アニメの検索・お気に入り登録する事ができるアプリケーションです。  
アプリ URL: <https://nextjs-project-ochre.vercel.app/>

# アプリ仕様

## 現在実装済みの機能

| 機能名称                |                                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------- |
| サインアップ            | メール・SNS でのサインアップ機能                                                    |
| ログイン / ログアウト   | メール・SNS・匿名ユーザーでのログイン機能                                           |
| プロフィール登録 / 編集 | ユーザーネーム、ユーザー画像などを登録 / 編集出来る                                 |
| アニメ検索機能          | キーワード・ 年度別検索                                                             |
| アニメ詳細表示          | 外部 API からレーティング・エピソード数・放送状況・YouTube 動画情報を取得し表示する |
| 無限スクロール機能      | スクロールを行い、外部 API から新たな情報を取得し、画像表示する                     |

## 使用イメージ

## 利用ツール・フレームワーク・ライブラリ

- Firebase
  - Firestore
  - Cloud Functions
  - Firebase Authentication
- Vercel （ホスティング先）
- React + React Hooks
- Next.js
- TypeScript
- Tailwindcss
- jest
- React Testing Library
- React Hook Form
- Yup
- React Infinite Scroll Component
- recharts
- ESLint
- Prettier
- husky

## データ設計

### フロントエンド（redux toolkit）にて管理するデータ

- user
  - uid
  - isLogin
  - profile
    - name
    - location
    - comment
    - image
    - genre
    - recommend
- movie
  - movies
  - movieList
  - keyword
  - status

### Firestore のデータ設計

users > lists サブコレクション(各ユーザーの動画視聴情報)
| Column | Type | Details |
| ------------ | --------------------------- | ----- |
| id | string | アニメの ID|
| image | string | アニメサムネイル|
| title | string |　アニメのタイトル |
| status | string |　アニメの放送状態（放送中・終了・放送予定） |
| createdAt | string |制作時期 |
| episodeLength | string |エピソード数 |
| averageRating | string |平均レーティング |
