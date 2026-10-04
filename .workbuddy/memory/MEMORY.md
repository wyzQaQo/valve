# ValveMaster — 工业阀门 B2B 外贸独立站

## 技术栈
- Next.js 16.2.9 (Turbopack) + React 19.2.4 + TypeScript
- Tailwind CSS v4 + @phosphor-icons/react + motion + gsap + ogl
- next-intl 4.13.0 (8 locales: en/zh/es/ar/pt/fr/de/hi)
- Cloudflare Pages (OpenNext 1.19.11 + wrangler 4.100.0)

## 项目结构
```
D:\valve\
  src/
    app/
      layout.tsx          ← 根布局 (passthrough, 只渲染 children)
      [locale]/
        layout.tsx         ← 真实文档壳 (NextIntlClientProvider, 动态 lang/dir)
        page.tsx           ← 首页
        products/
          page.tsx
          [category]/page.tsx
          [category]/[attribute]/page.tsx  ← ⭐ 参数组合 SEO 引擎
        industries/
          page.tsx
          [industry]/page.tsx
        solutions/page.tsx
        contact/page.tsx
        rfq/page.tsx
        sitemap.ts         ← 自动 sitemap
        robots.ts          ← 自动 robots
    i18n/
      routing.ts           ← locale 定义 + defineRouting
      request.ts           ← getRequestConfig
      navigation.ts        ← createNavigation (Link/usePathname/etc.)
    components/
      layout/Navbar.tsx
      layout/Footer.tsx
      home/ (各 section)
      product/ (各 product 子组件)
      industries/ (行业子组件)
      i18n/LanguageSwitcher.tsx
      react-bits/ (Particles/AnimatedContent/CountUp)
      ui/WhatsAppButton.tsx
    data/valves.ts         ← ⭐ SEO Attribute Combo Engine + 所有数据
  proxy.ts (src/)          ← Next.js 16 middleware
  messages/
    en.json                ← 主消息字典 (360+ strings)
    zh.json / es.json / ar.json / pt.json / fr.json / de.json / hi.json (待翻译)
  wrangler.jsonc
  open-next.config.ts
  next.config.ts           ← createNextIntlPlugin 包装

## build 命令
- `npm run build`        ← Next.js 构建 (2522 页)
- `npm run cf:build`     ← OpenNext Cloudflare 构建
- `npm run cf:deploy`    ← cf:build + wrangler pages deploy
- `npm run cf:dev`       ← build + wrangler pages dev
```

## 关键约定
- 图标使用 `@phosphor-icons/react/dist/ssr`，名称为 `CaretDown` 而非 `ChevronDown`
- 字体：globals.css 中 `--font-geist-sans` / `--font-geist-mono` CSS 变量（系统字体栈回退）
- AnimatedContent 组件用 `direction`/`reverse` 而非 `animation` prop
- 类型收窄：`.filter((v): v is NonNullable<typeof v> => v !== null)` 替代 `.filter(Boolean)`
- dev 模式 `adapterFn` 错误是 Turbopack + next-intl 已知兼容性问题，production 模式正常
- `shortName` 不存在于 BaseType，将相关引用改为 `cn`

## 待做
- [ ] AI 翻译 messages/ 中 7 个非英语文件
- [ ] 修复 dev 模式 `adapterFn` 错误
- [ ] RFQ 表单后端
- [ ] 真发布 wrangler pages deploy
