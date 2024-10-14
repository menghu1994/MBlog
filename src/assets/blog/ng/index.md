# Angular17

## 创建angular17项目
`ng new project001 --style=scss --skip-tests --routing=false --ssr=false -s -t`
--style=scss 使用scss作为css
--skip-tests 不生成测试代码
--routing=false 不生成路由代码
--ssr=false 不支持ssr(服务端渲染)
-s （--inline-style）移除.scss文件，直接在ts文件中写样式
-t  (--inline-template) 移除.html文件，直接在ts文件中写


`npm run ngc -p tsconfig.json` 编译成js文件输出(dist/out-tsc)


独立组件可以直接导入，无需在模块中声明
```js
@Component({
    standAlone: true,
    selector: 'demo'
})
export class demo {}

@Component({
    standAlone: true,
    selector: 'HelloWorld',
    template: `<demo />`
})
export class helloWorld {}
```

# h1 101
sdf
## h2 102
g
# h1 02
d
## h1 02
### h1 03
gh
## h1 02
