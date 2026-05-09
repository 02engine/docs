---
slug: /02agent-addon
title: 02Agent Addon
hide_table_of_contents: false
---

# 02Agent Addon

02Agent 是内置在 02Engine 编辑器里的 AI 助手 addon。它基于 Gandi IDE AI assistant addon 二次开发，可以读取当前 Scratch 项目结构、理解积木脚本、生成或修改角色和造型，并通过工具调用把 AI 的修改同步回编辑器。

02Agent 的目标不是替代 Scratch 编辑器，而是让 AI 能像一个项目内的编程助手一样工作：先检查项目，再给出或应用小范围修改，最后用诊断工具确认脚本和资源是否有效。

## 入口和界面

02Agent 默认启用。进入编辑器后，页面上会显示一个可拖动的浮动入口按钮。点击按钮可以打开或恢复 02Agent 聊天窗口。

主要界面包括：

- 聊天区：显示用户消息、AI 回复、工具调用和结果。
- 输入区：输入需求，发送给当前选择的模型。
- 历史区：管理会话、切换会话、查看会话快照。
- 设置区：配置 AI 服务商、模型、API 地址和 API Key。
- Skill 桥接区：连接本机 02Agent Skill bridge，让外部 AI 客户端调用当前编辑器里的 02Agent 工具。
- 附件和选择层：把选中的积木范围、文件内容或其它上下文附加到消息中。

窗口隐藏或最小化后，浮动入口仍会保留。再次点击入口会恢复窗口。02Agent UI 使用很高的层级显示，避免被普通编辑器窗口遮挡。

## 支持的模型服务商

02Agent 可以配置多个 AI agent，每个 agent 可包含一个或多个模型。当前支持的服务商类型包括：

- OpenAI 兼容接口。
- Anthropic 兼容接口。
- Google Gemini 接口。
- DeepSeek 接口。
- 智谱接口。
- Azure OpenAI。
- 自定义 OpenAI 兼容接口。
- 自定义 Anthropic 兼容接口。

每个 agent 通常需要配置：

- 名称。
- 服务商类型。
- Base URL。
- API Key。
- 模型 ID。
- 可选的最大输出 token 数。

API Key 只用于浏览器内的 02Agent 调用，不会通过 Skill bridge manifest 暴露给外部客户端。

## 推荐工作流

对复杂项目，推荐按以下方式使用 02Agent：

1. 先让 02Agent 查看项目概览。
2. 只读取将要编辑的舞台或角色脚本文件。
3. 搜索需要使用的积木或扩展。
4. 对不熟悉的 opcode 调用积木帮助工具。
5. 每次只修改一个较小的脚本或资源范围。
6. 修改后运行诊断，确认生成的 Scratch JS DSL 可以同步回积木。
7. 如果涉及造型或背景，优先使用 SVG 工具创建或修改资源。

不要要求 02Agent 一次性重写整个大型项目。更稳定的做法是把任务拆成多个小步骤，例如先创建角色，再添加变量，再写主要脚本，再补充视觉效果。

## 虚拟项目文件

02Agent 会把当前 Scratch 项目映射成一组虚拟文件。AI 修改这些文件后，02Agent 会把变更重新同步回 Scratch VM。

常见虚拟路径包括：

- `/stage.js`：舞台脚本。
- `/sprites/<角色名>.js`：角色脚本。
- `/sprites/<角色名>/costumes/<编号>-<造型名>.svg`：角色造型。
- `/stage/costumes/<编号>-<背景名>.svg`：舞台背景。
- `/docs/scratch-agent.md`：内置 Scratch JS DSL 指南。
- `/docs/block-catalog.md`：当前可用积木目录，包括已经加载的扩展积木。

脚本文件使用 02Agent 的 Scratch JS DSL 表达 Scratch 积木。例如：

```js
// @script new-hello
event.whenflagclicked({ $xy: { x: 80, y: 80 } }, () => {
  looks.say({ MESSAGE: "hello" });
});
```

`// @script <id>` 标记用于定位顶层脚本。编辑已有脚本时应保留已有标记和 `// blockId` 注释，这有助于同步层更准确地更新原有积木。

## 主要工具能力

02Agent 暴露一组工具给聊天模型和 Skill bridge。工具 schema 由代码动态生成，聊天和桥接使用同一套定义。

项目和文件工具：

- `getProjectOverview`：获取项目、舞台尺寸、目标、造型、变量、列表和已加载扩展概览。
- `listFiles`：列出所有虚拟文件。
- `readFile`：读取虚拟文件，支持行号范围。
- `searchFiles`：搜索虚拟文件和内置文档。
- `getDiagnostics`：检查脚本、积木转换和 SVG 资源问题。

积木和 DSL 工具：

- `getScratchGuide`：获取任务导向的 DSL 指南。
- `searchBlocks`：按 opcode、中英文关键词或 DSL 名称搜索积木。
- `getBlockHelp`：获取单个积木的字段、输入、菜单、子堆栈和示例。

编辑工具：

- `applyPatch`：用 Codex 风格 patch 修改虚拟 JS 或 SVG 文件。
- `createSpriteWithSvg`：用一个 SVG 造型创建新角色。
- `updateSpriteProperties`：修改角色位置、大小、方向、旋转方式、显示状态和当前造型。
- `addCostumeWithSvg`：给已有角色或舞台添加一个 SVG 造型或背景。
- `batchAddCostumesWithSvg`：批量添加 SVG 造型或背景。
- `deleteCostume`：删除单个造型或背景。
- `batchDeleteCostumes`：批量删除造型或背景。
- `reorderCostume`：移动单个造型或背景顺序。
- `setCostumeOrder`：一次性设置完整造型或背景顺序。
- `deleteSprite`：删除角色，不能删除舞台。

扩展工具：

- `searchExtensions`：搜索内置扩展和已知远程扩展库。
- `installExtension`：安装一个内置或已知可信扩展，并返回加载后的扩展积木。

会改变项目状态的工具会被串行排队，避免聊天窗口和 Skill bridge 同时修改同一个工作区造成冲突。

## 扩展搜索和安装

02Agent 可以在需要扩展积木时先搜索再安装扩展。例如需要画笔积木时，AI 应先搜索 `pen`，安装内置 Pen 扩展，再调用 `searchBlocks` 或 `getBlockHelp` 确认 `pen.*` 积木语法。

扩展来源包括：

- Official Scratch 内置扩展。
- 02Engine 扩展库。
- TurboWarp 扩展库。
- PenguinMod 扩展库。
- Mist 扩展库。
- SharkPool 扩展库。
- 特殊功能项，例如自定义返回值支持。

:::caution
当前 02Engine VM 中，远程扩展 URL 会通过 unsandboxed 扩展运行器加载。只安装你信任的扩展。不要让 AI 自动安装无关扩展，也不要安装用户未明确指定的任意外部 URL。
:::

外部直接 URL 默认不会被接受。只有用户明确提供可信 URL，并且工具调用显式设置 `allowExternalUrl: true` 时，02Agent 才应尝试安装任意外部 URL。

## Skill Bridge

02Agent 内置浏览器侧 WebSocket 客户端，用于连接本机 bridge server。该 bridge 允许 OpenCode 或其它本地 AI 客户端通过 HTTP 调用当前浏览器编辑器里的 02Agent 工具。

默认连接地址：

```text
ws://127.0.0.1:40202/agent?token=<token>
```

配套 Skill bridge 默认 HTTP 地址：

```text
http://127.0.0.1:40202
```

Bridge manifest 会公开：

- 协议名称和版本。
- 02Agent 基本信息。
- 工具 schema。
- 系统提示词和公开使用指引。
- 当前项目概览。
- 安全声明。

Bridge manifest 不会公开：

- API Key。
- 用户配置的模型密钥。
- 浏览器 localStorage 中的完整 agent 配置。

本地 bridge server 应只监听 `127.0.0.1`。不要把 bridge 端口暴露到公网或局域网。

## Bridge HTTP API

配套 Skill bridge 通常提供这些本地接口：

- `GET /health`：检查 bridge server 是否运行。
- `GET /manifest`：读取当前 02Agent manifest。
- `GET /tools`：读取当前工具列表。
- `GET /prompts`：读取公开提示词。
- `POST /call`：调用 02Agent 工具。
- `POST /reloadManifest`：请求刷新 manifest。

浏览器侧 02Agent 不主动开放 HTTP 端口。它只通过 WebSocket 向本机 bridge server 建立出站连接。

## 中文和 Windows 参数

在 Windows 环境中，如果外部 Skill 客户端要调用包含中文或其它非 ASCII 字符的工具参数，推荐使用 UTF-8 stdin 或 base64 编码传参，而不是直接把 JSON 放在命令行 argv 中。

推荐方式：

```powershell
node src/client.js call searchBlocks --stdin
```

备用方式：

```powershell
node src/client.js call searchBlocks --base64 <base64Json>
```

这样可以避免 Windows 命令行编码导致中文参数损坏。

## 安全边界

02Agent 可以修改当前打开的 Scratch 项目。使用时要注意：

- AI 工具调用可能新增、删除或重排角色、脚本、造型和变量。
- 远程扩展可能运行非沙盒 JavaScript。
- Skill bridge 允许本机其它进程调用 02Agent 工具。
- Token 用于阻止无关 WebSocket 连接，但不应把 bridge 暴露到非本机网络。
- API Key 不会通过 manifest 暴露，但仍保存在浏览器侧配置中，应避免在共享电脑上保存敏感 key。

在重要项目中，建议先保存副本，再让 02Agent 执行大范围修改。

## 常见问题

### 连接 Skill 后一直显示等待

确认本机 bridge server 已启动，并且端口与 02Agent 设置一致。默认端口是 `40202`。如果 bridge server 稍后启动，02Agent 会自动重试连接。

### AI 使用了不存在的积木

要求 AI 先调用 `searchBlocks` 或 `getBlockHelp`。如果是扩展积木，先调用 `searchExtensions` 和 `installExtension`，再重新搜索积木。

### 修改脚本后没有同步到积木

运行 `getDiagnostics` 检查 DSL 语法、字段名、输入类型和菜单值。常见问题包括遗漏 `$field_`、把 Boolean 输入写成普通变量、或使用了未加载扩展的 opcode。

### 创建角色失败或角色名冲突

`createSpriteWithSvg` 只用于创建全新角色。给已有角色添加造型时应使用 `addCostumeWithSvg` 或 `batchAddCostumesWithSvg`。

### 远程扩展安装失败

确认扩展 URL 可访问，扩展代码本身能在 02Engine 的 unsandboxed 扩展运行器中加载。对于外部直接 URL，必须显式允许外部 URL。

## 开发者备注

02Agent addon 源码位于 `scratch-gui/src/addons/addons/02agent`。关键模块包括：

- `manifest.ts`：addon 元数据。
- `index.tsx`：addon 入口和 UI 挂载。
- `hooks/useChat.ts`：聊天状态、系统提示词和模型工具调用流程。
- `tools.ts`：项目读取、编辑、诊断、积木查询和扩展安装工具实现。
- `toolSchemas.ts`：工具 schema，聊天和 bridge 共用。
- `toolRuntime.ts`：工具参数校验、分发和项目变更队列。
- `workspaceRangeTools.ts`：积木范围替换、插入和删除。
- `extensionRegistry.ts`：内置和远程扩展检索、缓存、解析。
- `bridgeManifest.ts`：bridge manifest 生成。
- `hooks/useBridgeClient.ts`：浏览器侧 bridge WebSocket 客户端。

修改 02Agent 后，建议至少运行：

```powershell
bun run build
```

如果修改了工具 schema、bridge 或 prompt，建议同时手动验证聊天工具调用和 Skill bridge 工具调用。
