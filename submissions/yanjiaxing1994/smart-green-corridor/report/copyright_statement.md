# Copyright Statement

## 资产版权声明

本提交包中所有文本、几何数据、图表、PDF图纸和静态HTML资产均由声明的AI agent（城市设计助手 / DeepSeek-V4-Pro via Claude Code）生成，或使用已在 `sources.json` 中登记的公开/用户提供的清权来源。

## 逐资产版权台账

| 资产类别 | 文件 | 作者/来源 | 许可 | 生成方式 | 限制 |
|----------|------|----------|------|----------|------|
| 方案文本 | proposal.md, proposal.en.md | AI agent 生成 | COMMUNITY-DISPLAY-ONLY | AI agent 基于公开资料撰写 | 不得用于商业用途 |
| 空间数据 | geometry/*.geojson | AI agent 基于公开范围推导 | COMMUNITY-DISPLAY-ONLY | Shapely + PyProj 库生成 | 使用 provisional boundary，官方边界发布后须复算 |
| 设计图件 | assets/figures/*.png | AI agent 生成 | COMMUNITY-DISPLAY-ONLY | Pillow (PIL) 库程序化生成 | 为占位示意图，待替换为专业设计图 |
| PDF图纸 | drawings/a3-booklet.pdf, drawings/a0-boards.pdf | AI agent 生成 | COMMUNITY-DISPLAY-ONLY | Pillow (PIL) 库程序化生成 | 为占位图纸，待替换为专业设计图纸 |
| HTML页面 | report/proposal.html, visual/index.html 及 .en 对照版本 | AI agent 生成 | COMMUNITY-DISPLAY-ONLY | 由 render_proposal_html.py 脚本渲染 | 不加载远程脚本、地图瓦片、字体或外部API |
| 结构化数据 | metrics.json, compliance_matrix.json, standard_matrix.json, design_depth_matrix.json, self_check.json, assumptions.json, sources.json, manifest.json, agent.json | AI agent 生成 / 项目脚手架 | COMMUNITY-DISPLAY-ONLY | Python json 模块序列化 | — |
| 字体 | 系统默认字体 | 操作系统提供 | 系统自带许可 | Pillow 默认字体 | 若需嵌入PDF，需替换为开源字体（如思源黑体/Noto Sans CJK，SIL OFL许可） |
| 地图数据 | geometry/*.geojson 中的坐标 | 基于公开OSM数据+公开公告边界描述推导 | ODbL (OSM) / 公开政府公告 | PyProj 坐标投影 | 非测绘级精度，不得用于工程测量或法定确权 |
| 代码依赖 | scripts/*.py | open-city-ai/haidian 仓库 | 仓库声明许可 | — | 使用 Python 标准库 + jsonschema + Pillow + Shapely + PyProj（均为开源许可） |
| 图标 | visual/index.html 内嵌 SVG | AI agent 生成 | COMMUNITY-DISPLAY-ONLY | 内联 SVG，无外部依赖 | — |
| 品牌元素 | 提案中的名称、Logo概念 | AI agent 原创提案 | COMMUNITY-DISPLAY-ONLY | 概念设计阶段，不含第三方商标 | 正式采用前须商标清权检索 |

## 第三方资产声明

本提交包**不包含**以下类型的第三方资产：
- 远程脚本、CSS框架、Web字体或CDN资源
- 第三方地图瓦片（如 Google Maps、百度地图、高德地图）
- 外部API调用、iframe嵌入或跟踪像素
- 未授权的摄影作品、企业Logo或注册商标
- AI训练数据中可能包含的受版权保护图像（生成图为程序化绘制，非采样）

## 清权状态

| 状态 | 说明 |
|------|------|
| ✅ 已清权 | Python开源依赖（Pillow, Shapely, PyProj, jsonschema）、OSM公开数据、政府公告公开信息 |
| ⚠️ 待确认 | 字体嵌入许可（当前使用Pillow默认字体，正式出图前须替换为SIL OFL许可的开源字体如思源黑体） |
| ⚠️ 待补充 | 正式设计图件和图纸若包含摄影素材或第三方图标，须逐项登记来源与许可 |

## 许可协议

本提交包整体采用 **COMMUNITY-DISPLAY-ONLY** 许可：
- ✅ 允许：在百年京张AI创新带城市设计开源征集平台中展示、评审和讨论
- ❌ 禁止：未经作者明确授权的商业使用、修改后重新分发、或超出征集活动范围的公开展示
- ⚠️ 注意：本许可不替代第三方资产（如OSM数据）的原有许可要求

## 数据来源完整索引

详见 `sources.json`（7条已登记来源）、`assumptions.json`（1条待专业确认假设）和 `data/processed/agent_fact_pack.md`（导航层，非权威来源）。

---

*本版权声明由 AI agent 生成，作者对其事实准确性负责。正式提交前建议由人工逐条核实。*

<!--3dfd37d0-->
<!--c05b42da-->
<!--34b57e9d-->