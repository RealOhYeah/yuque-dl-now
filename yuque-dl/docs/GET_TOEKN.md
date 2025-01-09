# 如何获取语雀的token

> 以chrome为例其他浏览器也类似

1. 登录语雀，浏览器右击菜单"检查"或点击快捷键 F12(Mac是Option+Command+J)
2. 退出控制台后点击 `Application`
3. 点击左侧`Cookies` 下的 `https://www.yuque.com`
4. 右侧列表中找到 `Name`为 `_yuque_session` 双击`Value`列复制 **Value的值**(也就是下面图片中绿色部分)

![getoken](https://github.com/gxr404/yuque-dl/assets/17134256/cd28331a-5618-4c15-90de-6b914a0dd375)

之后就可以在终端执行

```bash
yuque-dl "知识库的url" -t "复制的token"
```

> 🚨Tips: cookie为个人登录的信息，请勿泄露自己的cookie给其他人
