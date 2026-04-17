# Zi UI Skill

[English](./README.md) · **中文**

一套可移植的、token 驱动的 CSS 设计系统——以 agent skill 的形式打包，
通过 [Vercel Skills](https://skills.sh) 生态兼容 Claude Code、Cursor、
GitHub Copilot 等 18+ AI coding agent。

**它同时是两个东西：**

1. **一套能直接用的设计系统** —— 把两个 CSS 文件丢进任何项目，用
   语义类搭建克制、editorial 风格的 UI。不需要 npm install、不需要
   构建步骤、不依赖 React。
2. **Claude Design 架构的参考实现** —— 一份可读、可拆、可 fork 的
   样本，展示 Anthropic Claude Design 背后的"tokens + 语义类 + 视觉
   证明 + skill 打包"架构范式。克隆它、读它、把它改造成你自己的
   设计系统。

这个仓库是从一个 Claude Design 项目反向工程出来的——目的是把那套
架构思想搬到 Claude Design 工具本身之外，让任何人可以学、可以用、
可以 fork。

---

## 安装（作为 skill）

```bash
npx skills add bravohenry/zi-ui-skill
```

这条命令会把 skill 装进你本地的 agent（Claude Code、Cursor、Copilot
等）。装完之后你的 agent 就能按照 Zi UI 的规则生成界面——只要说
*"帮我做一个 Zi UI 风格的设置页"*，它会自动遵守整套规则。

支持所有列在 [skills.sh](https://skills.sh) 上的 agent。

## 使用（纯 CSS，不需要 agent）

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500&display=swap">
<link rel="stylesheet" href="assets/tokens.css">
<link rel="stylesheet" href="assets/components.css">

<button class="button button--primary">保存</button>
<span class="chip chip--soft chip--success">运行中</span>
```

就这么简单。两个样式表，一把语义类。HTML、React、Vue、Svelte、Astro、
Rails、甚至邮件模板——任何认识 CSS 的环境都能用。

---

## 这个仓库为什么存在 —— 把 Claude Design 的架构搬出来

2026 年 4 月 17 日，Anthropic 发布了 Claude Design，一个通过读你的
codebase 和品牌资料、自动生成完整设计系统的 AI 设计工具。它的输出
形态非常朴素：

```
foundations/        每一类 token 的视觉证明页
ref/tokens.css      真相源 DNA—所有设计决策都在这里
ref/components.css  从 tokens 派生出的语义类
components/         组件交互演示
index.html          文档站入口
```

没有 TSX。没有框架。没有构建链。整套设计系统就是**两个 CSS 文件
加一个可浏览的文档站**。

这不是"复古"，而是 GitHub Primer、Adobe Spectrum、Salesforce SLDS
这些大厂一直在用的架构——**底层用纯 CSS 做真相源，上层 React / Vue
等框架包装只是可选皮**。Claude Design 真正的贡献是把这套**原本只有
专职 Design Systems 团队才搭得起**的架构，做成了一个下午就能拥有
的东西。

**Zi UI Skill 就是这套架构被打包成可分发 skill 之后的样子**。它
具体展示了：

- `tokens.css` 如何成为单一真相源（`--accent`、`--radius`、`--spacing`...）
- `components.css` 是这些 token 的**第一次投影**——组合成语义类（`.button`、`.card`、`.field`...）
- `examples/*.html` 是 **style anchor**（风格锚点）—— AI 从真实组合里学习视觉节奏
- `references/*.md` 把"**什么时候用哪个类**"的判断力外化成文档（color-guide、do-dont、scenario-patterns）
- `SKILL.md` 把硬规则编码成 AI 可以自动执行的契约——让一致性从"人的记忆"变成"文件里的约束"

读源码，你会看到这个模式。Fork 它，换上自己的 tokens，你就有了
自己的 Zi UI。

---

## 目录导览

```
zi-ui-skill/
├── SKILL.md              ← spec：激活规则、硬规则、场景 → 组合模式映射
├── README.md             ← 英文版 README
├── README.zh-CN.md       ← 本文件
├── assets/
│   ├── tokens.css        ← DNA：颜色、圆角、间距、阴影、动效
│   └── components.css    ← tokens 投影为语义类（.button、.card...）
├── examples/
│   ├── index.html        ← 系统全貌
│   ├── button.html       ← button 风格锚点
│   ├── card.html
│   ├── chip.html
│   ├── color.html
│   ├── input.html
│   ├── table.html
│   ├── typography.html
│   └── settings.tsx      ← React 按需包装样例（3+ 次使用才生成）
└── references/
    ├── component-api.md       ← 完整类清单
    ├── color-guide.md         ← accent / success / warning / danger 何时用哪个
    ├── token-dimensions.md    ← radius / spacing / shadow / motion 的刻度
    ├── scenario-patterns.md   ← dashboard？表单？空状态？→ 标准组合
    ├── do-dont.md             ← 反例，✅ / ❌ 对照
    └── react-adapters.md      ← 项目是 React 时如何生成轻量包装组件
```

### 阅读顺序（如果你想学架构）

1. **`assets/tokens.css`** —— 5 分钟，看完整的真相源
2. **`assets/components.css`** —— 10 分钟，看 tokens 如何变成类
3. **`examples/index.html`** —— 浏览器里打开，感受整体节奏
4. **`SKILL.md`** —— 15 分钟，看 AI 要遵守的硬规则
5. **`references/`** —— 速览，这些是 AI 在具体写 UI 时按需加载的

一个小时，整套架构就吃透了。

---

## 设计哲学

一段话讲清 Zi UI 的视觉性格：

> 扁平。克制的中性色调加一个节制的 accent（默认 OKLCH 蓝）。
> 低饱和、高对比。字重上限 500——层级靠字号和颜色，不靠加粗。
> Geist 字体。没有渐变、没有发光、没有装饰性阴影。每屏只有一个
> primary 按钮。**如果它第一眼看起来有点闷，说明它在正常工作。**

**这种美学只是这套架构的一个实例**。架构本身是无关品味的——把
`tokens.css` 换成活泼的颜色、圆润的圆角、粗字重，同一副骨架就能
长出一个活泼的设计系统。

---

## 如何把它改造成你自己的品牌

这个 skill 天生就是为了被 fork 而设计的：

1. Fork 这个仓库
2. 改 `assets/tokens.css` —— 改 `--accent`、`--radius-*`、`--spacing`、字体梯度。**这是唯一一个定义你品牌的文件。**
3. （可选）在 `assets/components.css` 里加 / 删语义类，让它匹配你的组件词汇表
4. 更新 `examples/*.html`，让风格锚点反映你的新 tokens
5. 改 `SKILL.md` 的 frontmatter（`name` 和 `description`），标识你的系统
6. Push。现在别人可以用 `npx skills add <你的名>/<你的仓库>` 装你的系统

**你真正必须改的只有 `tokens.css`**。其他一切都是从它派生的。

---

## 这个 skill **不包含**的东西

这些缺失是刻意的：

- **React 组件库（`.tsx` 文件）** —— 包装组件按项目需求按需生成，
  因为不同 codebase 偏好不同的形态（TypeScript vs JavaScript、受控
  模式、命名风格）。生成模式见 `references/react-adapters.md`。
- **Tailwind preset / shadcn registry** —— 加上这些会让设计系统和
  某个框架耦合。CSS-first 的意义就是框架独立。
- **Figma 插件** —— `foundations/*.html` 视觉证明页就是给设计师
  的交付物。设计师打开浏览器验收视觉语言，不需要 Figma 账号。
- **运行时 JS** —— 没有 `ZiProvider`、没有 theme hook、没有 JS
  依赖。深色模式是 `<html data-theme="dark">`，纯 CSS 实现。

**这些缺失是刻意的克制**。这个 skill 装的东西越少，它能去的地方
就越多。

---

## 致谢

- **Claude Design**（[anthropic.com/news/claude-design-anthropic-labs](https://www.anthropic.com/news/claude-design-anthropic-labs)）
  —— 本 skill 展示的架构范式来源
- **shadcn/ui** —— 证明了"copy-paste 比 npm install 更好用"，也让
  "CSS 变量做主题"流行起来
- **GitHub Primer / Adobe Spectrum / Salesforce SLDS** —— 在 AI 让
  这件事变便宜之前，它们就已经在用这套"底层 CSS 真相源 + 上层
  框架皮"的双层架构
- **BEM** —— 让 `components.css` 对人和语言模型都可读的语义类
  命名约定
- **Vercel Skills**（[skills.sh](https://skills.sh)）—— 让 skill 分
  发变得这么简单的开放生态

---

## License

MIT。Fork 它、发布它、改名它、卖它——不要求署名（但欢迎）。

如果你用它做出了什么东西，或者把这套架构延伸到了有意思的方向，
欢迎开 issue 或 PR。我想看看。
