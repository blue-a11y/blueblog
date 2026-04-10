# 编码规范

## 文件命名

- UI 组件：kebab-case（`avatar.tsx`、`grid-background.tsx`、`gooey-text-morphing.tsx`）
- 页面：kebab-case 目录 + `index.tsx`（`pages/blog-detail/index.tsx`）
- 工具函数：kebab-case（`utils.ts`）

## 文件/目录创建原则（File-first / YAGNI）

- **单文件时直接创建文件**，不建目录：`components/ui/button.tsx`
- **只有需要多个关联文件时才创建目录**：如同时存在 `index.tsx` + `types.ts`，则建 `button/` 目录
- 不要预先创建空目录或假设未来会有的文件，按当前需求最小化创建：

  ```
  // 只有一个文件 ✓
  components/ui/button.tsx

  // 有多个关联文件 ✓
  components/ui/button/
  ├── index.tsx
  └── types.ts

  // 只有一个文件却建了目录 ✗
  components/ui/button/
  └── index.tsx
  ```

## 组件声明

- **一律使用箭头函数**定义组件，仅在 forwardRef 等特殊场景除外：
  ```tsx
  const Avatar = ({ className, ...props }: AvatarProps) => { ... }
  ```
- 仅在需要转发 ref 时使用 `React.forwardRef`（交互式 / 包装 DOM 的组件）
- forwardRef 组件需设置 `displayName`
- **文件内的声明顺序必须与实际调用顺序一致** —— 被调用的变量/函数/组件必须先于调用者声明：

  ```tsx
  // 正确 ✓ — 子组件在前，使用它的父组件在后
  const Child = () => { ... }
  const Parent = () => { return <Child /> }

  // 错误 ✗ — 使用在声明之前
  const Parent = () => { return <Child /> }
  const Child = () => { ... }
  ```

## 导出约定

- **UI 组件**：在文件底部具名导出（`export { Avatar, AvatarImage }`）
- **页面和布局**：默认导出（`export default Home`）
- **外部使用的类型**：一律使用 `export type`
- **工具函数**：具名导出（`export const cn = (...) => ...`）

## 导入顺序

1. React 及其子模块（`import * as React from "react"`）
2. 第三方库（`framer-motion`、`react-router`、`@base-ui/react`）
3. ahooks（`import { useRequest } from "ahooks"`）
4. 内部模块使用 `@/` 别名（`@/helpers/utils`、`@/components/ui/avatar`）
5. 纯类型导入使用 `import type` 语法

## Hooks 使用规范

- **功能类 Hook 优先从 ahooks 引入**（useDebounce、useToggle、useLocalStorage、useScroll 等），不要在项目中自行实现或放到 `src/hooks/`
- **`src/hooks/` 仅存放业务类 Hook**（useAuth、useUserPermissions 等包含业务逻辑的 Hook）
- **所有数据请求统一使用 ahooks 的 `useRequest`**，禁止自行封装 useState + useEffect 请求模式：

  ```tsx
  // 正确 ✓
  const { data, loading, error } = useRequest(fetchBlogList);

  // 错误 ✗
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchBlogList().then(setData);
  }, []);
  ```

## useRequest 使用规范

直接使用 useRequest 的 options 配置即可覆盖绝大多数场景，**禁止对 useRequest 做二次封装**（如自行封装 useFetch、useApi 等）。

**核心用法速查：**

| 场景         | 配置                   | 示例                                                                |
| ------------ | ---------------------- | ------------------------------------------------------------------- |
| 自动请求     | 默认行为               | `useRequest(fn)`                                                    |
| 手动触发     | `manual: true`         | `const { run } = useRequest(fn, { manual: true })`                  |
| 防抖搜索     | `debounceWait`         | `useRequest(fn, { manual: true, debounceWait: 300 })`               |
| 节流请求     | `throttleWait`         | `useRequest(fn, { manual: true, throttleWait: 300 })`               |
| 轮询         | `pollingInterval`      | `const { run, cancel } = useRequest(fn, { pollingInterval: 3000 })` |
| 缓存/SWR     | `cacheKey`             | `useRequest(fn, { cacheKey: 'user-list' })`                         |
| 缓存保鲜     | `staleTime`            | `useRequest(fn, { cacheKey: 'user', staleTime: 5000 })`             |
| 窗口聚焦刷新 | `refreshOnWindowFocus` | `useRequest(fn, { refreshOnWindowFocus: true })`                    |
| 依赖刷新     | `refreshDeps`          | `useRequest(fn, { refreshDeps: [userId] })`                         |
| 条件请求     | `ready`                | `useRequest(fn, { ready: !!userId })`                               |
| 延迟 loading | `loadingDelay`         | `useRequest(fn, { loadingDelay: 300 })`                             |
| 错误重试     | `retryCount`           | `useRequest(fn, { retryCount: 3 })`                                 |

**常用返回值：**

- `data` / `loading` / `error` — 请求状态
- `run(params)` / `runAsync(params)` — 手动触发（runAsync 返回 Promise）
- `cancel()` — 取消请求/停止轮询
- `refresh()` — 用上次参数重新请求
- `mutate(newData)` — 直接修改 data

## Props 与类型

- **类型定义一律使用 `type` 关键字**，不使用 `interface`
- **Props 命名规范：`I组件名Props`**，声明在文件顶部，紧跟 import 之后：

  ```tsx
  type IAvatarProps = {
    className?: string;
    size?: "sm" | "default" | "lg";
  }

  const Avatar = ({ className, size = "default", ...props }: IAvatarProps) => { ... }
  ```

- **禁止行内复杂类型** — 超过简单基础类型的 props 定义，必须用 `type` 抽离，不允许直接写在函数参数中：

  ```tsx
  // 正确 ✓ — 类型抽离到顶部
  type IMenuBarProps = {
    items: MenuItem[];
    active?: string;
    onItemClick?: (item: MenuItem) => void;
  }
  const MenuBar = ({ items, active, onItemClick }: IMenuBarProps) => { ... }

  // 错误 ✗ — 行内复杂类型
  const MenuBar = ({ items, active, onItemClick }: {
    items: MenuItem[];
    active?: string;
    onItemClick?: (item: MenuItem) => void;
  }) => { ... }
  ```

- 在函数参数中解构 props，默认值内联
- 先提取 `className`，最后展开剩余 props：
  ```tsx
  const Button = ({ className, variant = "default", size = "default", ...props }: IButtonProps) => { ... }
  ```
- 使用 `cn()` 合并类名 —— 始终将用户传入的 `className` 放在最后
- 组件不加显式返回类型注解
- **禁止将回调函数直接写在 JSX 元素属性中**，必须先声明再引用：

  ```tsx
  // 正确 ✓
  const handleClick = () => { ... }
  return <button onClick={handleClick} />

  // 错误 ✗
  return <button onClick={() => { ... }} />
  ```

## 样式

- 仅使用 Tailwind 工具类 —— 除动态值（如 framer-motion 驱动）外不使用内联样式
- 使用 `@/helpers/utils` 中的 `cn()` 进行条件/合并类名
- 多变体组件使用 CVA（`class-variance-authority`）
- 每个 UI 组件的根元素添加 `data-slot="component-name"` 属性
- 使用语义化颜色 token（`text-foreground`、`bg-primary`、`border-border`）—— 不硬编码颜色值

## 组件模式

- UI 组件包装 base-ui 原语（不直接使用原生 HTML 元素）
- 复合组件使用子组件模式（Avatar + AvatarImage + AvatarFallback）
- 动画逻辑（framer-motion variants）作为 const 对象放在模块顶层
- 相关类型与导出它的组件放在一起
- **JSX 内容较多时，拆分为子渲染变量或函数来组合**，保持主 return 简洁：

  ```tsx
  // 无参数 → 用 const 变量（JSX 直接赋值）
  const header = (
    <header className="...">
      <Title />
      <Description />
    </header>
  );

  // 有参数 → 用函数
  const renderList = (items: Item[]) => items.map((item) => <Item key={item.id} {...item} />);

  return (
    <div>
      {header}
      {renderList(items)}
    </div>
  );
  ```

- **禁止无参数的 render 函数** — 如果渲染函数不需要参数，直接写成 const 变量：

  ```tsx
  // 正确 ✓ — 无参数，用变量
  const socialLinks = (
    <div>{links.map(...)}</div>
  )

  // 错误 ✗ — 无意义的函数调用
  const renderSocialLinks = () => <div>{links.map(...)}</div>
  // {renderSocialLinks()} ← 多余的函数调用
  ```

  ```

  ```

## 代码质量

- **条件渲染统一风格**：
  - 二选一场景用三元表达式：`condition ? <A /> : <B />`
  - 显示/隐藏用 `&&`：`condition && <A />`
  - 组件内有多个守卫条件时用 early return，减少嵌套：

    ```tsx
    // 正确 ✓ — early return 减少嵌套
    if (!user) {
      return <Empty />;
    }
    if (loading) {
      return <Spinner />;
    }
    return <Content user={user} />;

    // 错误 ✗ — 不必要的深层嵌套
    return <div>{!user ? <Empty /> : loading ? <Spinner /> : <Content user={user} />}</div>;
    ```

- **禁止魔法值** — 硬编码的数字、字符串必须提取为命名常量：

  ```tsx
  // 正确 ✓
  const MAX_RETRY = 3
  const DEFAULT_PAGE_SIZE = 20

  // 错误 ✗
  if (retry > 3) { ... }
  useRequest(fn, { pollingInterval: 5000 })
  ```

- **禁止注释掉的代码** — 不需要的代码直接删除，需要时从 git 历史找回
- **单组件文件不超过 200 行** — 超过必须拆分为子组件或 render 变量

## 状态管理

- **状态就近原则** — 状态声明在最近的共同父组件中，不要过早提升到全局（stores）。只有多页面/多模块共享的数据才放 `stores/`
- **派生状态不存 state** — 能从已有数据直接计算的结果，不要用 `useState` 单独存：

  ```tsx
  // 正确 ✓ — 直接计算
  const fullName = `${firstName} ${lastName}`;

  // 错误 ✗ — 多余的 state
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    setFullName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);
  ```

## 模块共享

- **兄弟模块之间的通用组件/方法/类型，必须提升到父级目录**。例如两个页面共享同一个子组件时，将该组件提取到 `pages/` 下的公共目录或 `components/` 中，禁止跨兄弟目录直接引用
- **相同代码在两个以上地方使用时，必须抽取为公共内容**（组件、工具函数、常量、类型等），放到合适的公共目录中
