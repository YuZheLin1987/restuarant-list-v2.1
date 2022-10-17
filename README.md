# restuarant-list-v2.1

<img width="1512" alt="w2-3s3a7" src="https://user-images.githubusercontent.com/113798606/196180826-bcbd2b1f-2d5b-4fc5-93fe-f0706559b78f.png">

## 功能
1. 瀏覽全部餐廳列表
2. 瀏覽單一餐廳詳細資料
3. 可使用餐廳名稱或餐廳類別來搜尋餐廳
4. 可以新增一家餐廳
5. 可以修改一家餐廳資料
6. 可以刪除一家餐廳

## 開始使用
1. 請先安裝node.js以及npm
2. 將專案複製到本地
3. 使用終端機進入資料夾的位置，安裝相關套件
```
npm install
```
4. 設定MongoDB環境變數
```
export MONGODB_URI="你的MongoDB連接字串" // for MacOS bash or Windows Git bash
set MONGODB_URI="你的Mongodb連接字串" // for Windows cmd
```
5. 寫入種子資料
```
npm run seed
```
6. 執行程式
```
npm run start
```
7. 成功時終端機會顯示
```
This express server is running at http://localhost:3000
mongodb connected!
```
8. 到瀏覽器輸入下列網址：http://localhost:3000
9. 結束請在終端機輸入ctrl+c

## 使用工具
+ Node.js@16.17.1
+ Express@4.16.4
+ Express-handlebars@3.0.0
+ Bootstrap@5.2.1
+ Mongoose@5.9.7
+ body-parser@1.20.1
