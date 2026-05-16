# JSON 在线解析工具

免费、开箱即用的 **JSON 在线解析与转换工具**，支持格式化、压缩、校验、转义、树形编辑、编程语言代码生成等功能。纯前端实现，数据默认保存在浏览器本地。

**在线访问：** [https://ccjson.com/](https://ccjson.com/)  
**英文版：** [https://ccjson.com/?lang=en](https://ccjson.com/?lang=en)

---

## 功能特性

### 核心处理

| 功能 | 说明 |
|------|------|
| JSON 格式化 | 美化 JSON，支持 1–4 空格缩进 |
| JSON 压缩 | 去除空格与换行，生成紧凑格式 |
| JSON 验证 | 校验语法，展示错误信息与状态 |
| 转义 / 反转义 | 处理字符串中的特殊字符 |
| Unicode 互转 | 中文 ↔ `\uXXXX` Unicode 编码 |
| Get 参数转换 | JSON ↔ URL Query 字符串 |
| Dict ↔ Json | JSON ↔ Python 字典风格文本 |

### 输出与编辑

| 功能 | 说明 |
|------|------|
| 树形编辑 | 可视化折叠/展开 JSON 结构 |
| 编程语言转换 | 生成 Java、Python、TypeScript、Go、Rust、Swift、C++、C#、Kotlin、PHP 等代码 |
| 行号显示 | 输入/输出区可选行号 |
| 字号调节 | 12–20px 可调 |
| 一键复制 | 输入区、输出区分别复制 |

### 体验与其它

- **Demo 示例** — 一键加载示例 JSON  
- **历史记录** — 最近 50 条操作，点击恢复  
- **本地存储** — 可选不记录 / 24 小时 / 7 天 / 30 天 / 永久  
- **深色 / 浅色主题** — 跟随偏好记忆  
- **中英文界面** — 右上角切换，`?lang=en` 直达英文  
- **响应式布局** — 适配桌面与移动端  
- **SEO 优化** — meta、hreflang、结构化数据、sitemap  

---

## 快速开始

### 方式一：直接打开

在浏览器中打开 `index.html` 即可使用，无需安装依赖。

### 方式二：本地静态服务（推荐）

避免部分浏览器对 `file://` 协议的剪贴板限制：

```bash
# Python 3
python3 -m http.server 8080

# 或 Node.js（需安装 npx）
npx serve .
```

访问 `http://localhost:8080` 。

---

## 使用说明

1. 在左侧 **源数据** 输入框粘贴或输入 JSON。  
2. 使用工具栏按钮处理数据，结果出现在右侧 **结果** 区。  
3. 输出区可切换树形视图、选择目标编程语言、调整缩进与字号。  
4. 底部状态栏显示字符数、行数与校验状态。

### 输入区按钮

| 按钮 | 作用 |
|------|------|
| 格式化 | 美化 JSON 并写入输出区 |
| 压缩 | 生成单行紧凑 JSON |
| 验证 | 检查语法是否合法 |
| 转义 / 反转义 | 字符串转义处理 |
| 中文→Unicode / Unicode→中文 | 编码转换 |
| 转 Get 参数 | 对象转 URL 查询串 |
| Dict↔Json | 与 Python dict 风格互转 |
| Demo | 加载内置示例 |
| 历史 | 浏览并恢复历史记录 |
| 清空 | 清空输入与输出（需确认） |
| 复制 | 复制输入内容 |

### 输出区控件

| 控件 | 作用 |
|------|------|
| 树形编辑 | 切换树形 / 文本视图 |
| 编程语言转换 | 下拉选择目标语言并生成代码 |
| 行号 / 缩进 / 字号 | 编辑器显示选项 |
| 复制 | 复制输出内容 |

---

## 键盘快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl / Cmd + Enter` | 格式化 JSON |
| `Ctrl / Cmd + Shift + C` | 复制输出结果 |
| `Ctrl / Cmd + L` | 清空内容 |

---

## 项目结构

```
json/
├── index.html      # 页面结构、SEO meta、结构化数据
├── style.css       # 样式与主题变量
├── script.js       # 核心逻辑与国际化
├── robots.txt      # 搜索引擎爬虫规则
├── sitemap.xml     # 站点地图
├── .gitignore
└── README.md
```

---

## 技术栈

- **HTML5** + **CSS3**（设计令牌、深色主题、响应式 Grid/Flex）
- **原生 JavaScript**（无框架、无构建步骤）
- **Google Fonts**（Bricolage Grotesque、Source Sans 3、IBM Plex Mono）
- **localStorage** — 主题、语言、输入草稿、历史记录

---

## 浏览器兼容性

| 浏览器 | 支持 |
|--------|------|
| Chrome / Edge | ✅ 推荐 |
| Firefox | ✅ |
| Safari | ✅ |
| 其它 Chromium / WebKit 内核 | ✅ 需支持 ES6+ |

需启用 JavaScript。剪贴板 API 在 HTTPS 或 `localhost` 下体验最佳。

---

## 隐私说明

- 工具在浏览器端运行，**不会将 JSON 上传到服务器**（通过 URL 参数 `#url=` 拉取远程 JSON 除外，由用户主动触发）。  
- 输入内容、历史、主题与语言偏好保存在 **本机 localStorage**，可在「存储」下拉框中选择不记录或自动过期。  

---

## SEO 与部署

部署到 `https://ccjson.com/` 时请注意：

1. 一并上传 `robots.txt`、`sitemap.xml`。  
2. 在 [Google Search Console](https://search.google.com/search-console) 提交 sitemap：`https://ccjson.com/sitemap.xml`。  
3. 若更换域名，请同步修改 `index.html` 中的 `canonical`、`hreflang` 及 `sitemap.xml` 里的 URL。  
4. 社交分享图可补充 `og:image`（当前未内置图片资源）。  

---

## 开发说明

修改文案时，请同时更新 `script.js` 内 `translations`（中/英）与 `seoMeta` 对象，以保持界面与 SEO 标签一致。

本地开发若需 E2E 测试，项目曾使用 Playwright（见 `node_modules`，已 gitignore），可按需安装：

```bash
npm install playwright
npx playwright install chromium
```

---

## 路线图

- [x] 树形编辑  
- [x] 深色 / 浅色主题  
- [x] 多语言（中 / 英）  
- [x] 编程语言转换  
- [x] 历史记录与本地存储  
- [x] SEO（meta、JSON-LD、hreflang、sitemap）  
- [ ] JSONPath 查询  
- [ ] JSON 对比（diff）  
- [ ] JSON Schema 校验  
- [ ] JSON ↔ XML / YAML / CSV  
- [ ] 语法高亮（编辑器增强）  

---

## 许可证

MIT License

---

## 致谢

界面与交互参考了 [json.cn](https://www.json.cn/) 等常见 JSON 在线工具的设计思路，并在视觉与功能上做了独立实现与扩展。
