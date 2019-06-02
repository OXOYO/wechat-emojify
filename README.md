# wechat-emojify

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

在网页上正确显示微信昵称中的 `emoji`

## Background

微信有一套自己的 emoji 编码，即类似 `'\uexxx', x=[0-9a-f]` 的格式。在请求微信获取用户信息时，用户昵称中的 emoji 会以微信的 emoji 编码方式返回，虽然该编码在微信中能够正常解析，但在浏览器中会往往被渲染成小方块 ``。这时需要我们对用户昵称进行一些特殊处理，才能使其正常显示。

## Install

```bash
yarn add wechat-emojify
```

## Usage

```javascript
import { wechatEmojify, wechatEmojiMap } from 'wechat-emojify'
// or:
// import wechatEmojify from 'wechat-emojify'

// single emoji
wechatEmojify('\ue404') // 😁
// emoji in a string
wechatEmojify('I love you \ue327') // I love you 💓
// mixed wechat-emoji and utf-16-emoji
wechatEmojify('\ue32c I love you \ud83d\udc93') // 💛 I love you 💓

// use emoji map directly
wechatEmojiMap['\ue404'] // 😁
```

## 自己生成 emoji 对照表

```javascript
/* 请在浏览器控制台中粘贴以下代码 */
var emoji = ''
var noop = function() {}
var copy = copy || noop
var genCode = (start, end) =>
    [...Array(end - start + 1)].map((_, i) =>
        eval("'\\ue" + ('00' + (i + start + 1).toString(16)).slice(-3) + "'")
    )
// 每组字符范围的终点位置不确定，可自行调整
var code = [
    [0x000, 0x059],
    [0x100, 0x159],
    [0x200, 0x252],
    [0x300, 0x34c],
    [0x400, 0x44b],
    [0x500, 0x536]
]
    .map(([start, end]) => genCode(start, end))
    .reduce((a, b) => a.concat(b), [])
if (emoji) {
    var emojiList = emoji.split(',')
    var emojiMap = code.reduce((map, char, idx) => {
        map[char] = emojiList[idx]
        return map
    }, {})
    var result = JSON.stringify(emojiMap, null, 2)
    console.log(result, copy === noop ? '' : '\n\nemoji 对照表已复制到剪贴板')
    copy(result)
} else {
    var joined = code.join(',')
    copy(joined)
    console.log(
        [
            `请在微信客户端粘贴以下代码, 并将生成的emoji文本复制到上方的emoji变量处；`,
            `然后重新运行脚本，即可自动复制 emoji 对照表至剪贴板。`,
            `\n${joined}\n`,
            copy === noop ? '' : `(已复制，请到微信中粘贴)`
        ].join('\n')
    )
}

```
