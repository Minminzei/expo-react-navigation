# Expoデモ
Expo, React Native, React Navigationを使ったios/android/web向けのサンプルアプリです

#### demo
https://exp.host/@minminzei/usagi

#### 動作手順
1. cocoapodsインストール
  ```
  sudo gem install cocoapods
  pod setup
  ```

1. ライブラリをセットアップ
  ```
  git close git@github.com:Minminzei/usagi.git
  yarn && cd ios && npx pod-install
  ```

1. 実行
  ```
  # for ios
  yarn ios

  # for android
  yarn run android

  # for web
  yarn web
  ```
