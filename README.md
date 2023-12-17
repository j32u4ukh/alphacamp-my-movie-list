# alphacamp-my-movie-list
Alpha camp My Movie List 專案

## 導入 Bootstrap 元件

下方示範引入 Bootstrap 第 5 版

在 `<head></head>` 中引入下方內容

```html
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
    crossorigin="anonymous"
/>
```

在 `<body></body>` 最末端引入下方內容，在 Bootstrap Bundle 的 JS 裡，包含了 Popper.js、和 Bootstrap.js ，因此不需要另外載入 Popper.js

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>
```

## 導入 axios 套件

在 `<body></body>` 最末端引入下方內容

```html
<script src="https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js"></script>
```
