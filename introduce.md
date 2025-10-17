# Badminton Score

这是一个使用 React、TypeScript 和 Material-UI 构建的羽毛球计分板应用程序。该应用旨在提供一个简单、直观的方式来记录羽毛球比赛的分数。

同时，本项目也通过 Capacitor 进行了封装，可以轻松构建为 iOS 原生应用。

## ✨ 主要功能

*   **实时计分**: 为双方球员或队伍实时增加分数。
*   **发球方高亮**: 当前发球方会以主题色高亮显示，一目了然。
*   **自定义球员名称**: 可以修改默认的 "球员 1" 和 "球员 2" 为自定义名称。
*   **胜利条件设置**:
    *   可选择每局的获胜分数（例如 11, 21, 30 分）。
    *   可选择比赛的获胜局数（例如三局两胜、五局三胜）。
*   **局数与比赛历史**:
    *   自动跟踪双方赢得的局数。
    *   当一方达到获胜局数时，显示比赛胜利者。
    *   记录并展示每一局的比赛结果历史。
*   **主题切换**:
    *   支持浅色 (Light) 和深色 (Dark) 模式。
    *   可选择跟随系统设置自动切换主题。
*   **重置功能**: 一键“新比赛”即可清空所有计分和历史记录，开始一场全新的比赛。
*   **跨平台**: 基于 Web 技术构建，并使用 Capacitor 打包，可同时在浏览器和 iOS 设备上运行。

## 🚀 技术栈

*   **前端框架**: [React](https://reactjs.org/)
*   **语言**: [TypeScript](https://www.typescriptlang.org/)
*   **UI 组件库**: [Material-UI (MUI)](https://mui.com/)
*   **移动端打包**: [Capacitor](https://capacitorjs.com/)
*   **构建工具**: [Create React App](https://create-react-app.dev/)

## 📂 项目结构

```
.
├── ios/                  # Capacitor 生成的 iOS 原生项目
├── public/               # 公共静态资源
├── src/
│   ├── App.tsx           # 应用主组件
│   ├── Scoreboard.tsx    # 核心计分板组件，包含所有逻辑和 UI
│   ├── ThemeContext.tsx  # 主题管理上下文 (Context)
│   ├── index.tsx         # React 应用入口文件
│   └── ...
├── package.json          # 项目依赖和脚本配置
└── tsconfig.json         # TypeScript 配置文件
```

## 🛠️ 如何运行

1.  **克隆仓库**
    ```bash
    git clone <repository-url>
    cd badminton_score
    ```

2.  **安装依赖**
    ```bash
    npm install
    ```

3.  **启动 Web 应用**
    ```bash
    npm start
    ```
    应用将在 `http://localhost:3000` 上运行。
