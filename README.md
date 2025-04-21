# 하빗 (Havit)

> 동호회(모임)를 중심으로 한 커뮤니티 사이트

하빗(Havit)은 다양한 관심사를 가진 사용자들이 동호회를 생성하고, 참여하며, 소통할 수 있는 커뮤니티 플랫폼입니다.  
모임 활동 중심의 구조로 누구나 쉽게 모임을 만들고, 함께하는 문화를 경험할 수 있도록 개발되었습니다.

---

## 🔧 기술 스택

- **Frontend**: React, TypeScript  
- **Backend**: Node.js, Express

---

## 🧾 코드 컨벤션

### 1. 네이밍 규칙

- **클래스 및 인터페이스**: `PascalCase`  
  예: `UserService`, `CreateUserDto`

- **변수 및 함수**: `camelCase`  
  예: `getUser`, `createUser`

- **폴더명**: `kebab-case`  
  예: `api-services`, `user-profile`

### 2. 주석 작성

- `JSDoc` 스타일 사용

```ts
/**
 * 유저 데이터를 가져오는 함수
 * @param {number} userId - 가져올 유저의 ID
 * @returns {Promise<User>} 유저 데이터
 */
```
## 🧷 Git 커밋 컨벤션

커밋 메시지는 다음의 규칙을 따릅니다.

### ✅ 커밋 타입

| 타입       | 설명                                      |
|------------|-------------------------------------------|
| `feat`     | 새로운 기능을 추가할 경우                 |
| `fix`      | 버그를 고친 경우                          |
| `!HOTFIX`  | 급하게 치명적인 버그를 고칠 경우          |
| `design`   | CSS 등 사용자 UI 디자인 변경              |
| `style`    | 코드 포맷팅, 세미콜론 누락 등 (코드 수정 없음) |
| `refactor` | 코드 리팩토링                             |
| `comment`  | 주석 추가 및 변경                         |
| `docs`     | 문서 수정 (예: README.md 등)              |
| `test`     | 테스트 코드 추가 또는 테스트 리팩토링     |
| `rename`   | 파일, 폴더명 수정                         |
| `remove`   | 파일, 폴더 삭제                           |
| `chore`    | 기타 작업                                 |
| `set`      | 프로젝트 세팅 관련 작업                   |


### 📝 커밋 메시지 규칙

- 제목은 **영문 소문자**로 시작  
- 제목 끝에는 **마침표(.)를 사용하지 않음**  
- 제목과 본문은 한 줄 띄워 **구분**  
- 본문에는 `"어떻게"`보단 **"무엇을"**, `"왜"`를 중심으로 작성  
- 이슈가 있다면 마지막 줄에 `issue: SCRUM-123` 형태로 작성


### ✏ 커밋 메시지 예시

<pre>
commit message:

feat: 로그인 기능 구현

- 로그인 API 연동
- 유효성 검사 로직 추가

issue: SCRUM-89
</pre>

---

## 📁 프로젝트 폴더 구조

```
src/
├── assets/             # 이미지 및 아이콘 리소스
│   ├── img/
│   └── icon/
├── common/             # 공통 컴포넌트 및 유틸
│   ├── Layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   ├── components/
│   │   ├── Modal.tsx
│   │   └── UI/
│   │       ├── Buttons.tsx
│   │       ├── Chat.tsx
│   │       ├── Tag.tsx
│   │       ├── Area.tsx
│   │       ├── Calendar.tsx
│   │       └── Video.tsx
│   ├── style/
│   └── utils/
├── features/           # 주요 도메인 기능
│   ├── User/
│   │   ├── components/
│   │   │   ├── UserForm.tsx
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── FindId.tsx
│   │   │   ├── FindPassword.tsx
│   │   │   ├── JoinPage.tsx
│   │   │   ├── MyInfoPage.tsx
│   │   │   ├── MyClubPage.tsx
│   │   ├── hooks/
│   │   │   └── useUser.ts
│   │   └── types.ts
│   ├── Club/
│   │   ├── components/
│   │   │   ├── ClubForm.tsx
│   │   │   ├── ClubList.tsx
│   │   │   ├── ClubMembers.tsx
│   │   │   ├── ClubDetail.tsx
│   │   │   ├── ClubChat.tsx
│   │   │   ├── ClubRequests.tsx
│   │   ├── pages/
│   │   │   ├── ClubRecent.tsx
│   │   │   ├── ClubListPage.tsx
│   │   │   ├── ClubDetailPage.tsx
│   │   │   ├── ClubModifyPage.tsx
│   │   ├── hooks/
│   │   │   └── useClub.ts
│   │   └── types.ts
│   └── Thunder/
│       ├── components/
│       │   ├── ThunderForm.tsx
│       │   ├── ThunderDetail.tsx
│       ├── pages/
│       │   ├── ThunderRecent.tsx
│       │   ├── ThunderListPage.tsx
│       │   ├── ThunderDetailPage.tsx
│       ├── hooks/
│       │   └── useThunder.ts
│       └── types.ts
├── pages/              # 공통 페이지
│   ├── MainPage.tsx
│   ├── NotFoundPage.tsx
│   ├── RecentPage.tsx
│   └── CalendarPage.tsx
├── routes/             # 라우팅 설정
│   └── index.tsx
├── store/              # 전역 상태 관리
│   ├── index.ts
│   ├── userSlice.ts
│   ├── thunderSlice.ts
│   └── clubSlice.ts
├── App.tsx             # 엔트리 포인트
---

```
# 🧠 habit-frontend 개발 가이드

이 프로젝트는 다음과 같은 코드 품질 도구들이 적용되어 있어요:

- ✅ **ESLint**: 코드 스타일 검사
- ✅ **Prettier**: 자동 코드 포맷팅
- ✅ **Husky + lint-staged**: 커밋 전 자동 검사 및 포맷팅 수행
- ✅ **@typescript-eslint**: TypeScript 기반 규칙 적용

---

## 📦 프로젝트 설치

```bash
git clone https://github.com/your-org/habit-frontend.git
cd habit-frontend
yarn install
```

> `yarn install` 시 자동으로 `husky`가 설치되며, pre-commit hook이 활성화됩니다.

---

## 🔐 커밋 전 자동 검사

Git 커밋 시 아래 작업이 **자동 실행**됩니다:

- `eslint` 기반 코드 검사 및 자동 수정
- `prettier` 기반 코드 포맷팅
- `@typescript-eslint/naming-convention` 규칙 검사

⚠️ 문제가 발견되면 커밋이 **차단**되며, 아래와 같은 메시지를 볼 수 있어요:

```bash
✖ eslint --fix:

src/test.tsx
  1:7  error    Variable name `Test_Var` must match camelCase format  @typescript-eslint/naming-convention
  2:1  warning  Unexpected console statement                          no-console
```

---

## 🛠 수동 코드 포맷팅

수동으로 검사/수정을 하고 싶을 땐 다음 명령어를 사용하세요:

```bash
# 코드 검사만
yarn lint

# 자동 수정까지 포함
yarn lint:fix
```

> `package.json`에 다음과 같은 스크립트가 정의되어 있습니다:

```json
"scripts": {
  "lint": "eslint . --ext .ts,.tsx",
  "lint:fix": "eslint . --ext .ts,.tsx --fix",
  "prepare": "husky install"
}
```

---

## 🧩 적용된 주요 도구 목록

| 도구명                     | 설명                                            |
|--------------------------|-------------------------------------------------|
| `eslint`                 | 코드 스타일 검사 도구                            |
| `prettier`               | 코드 포맷터 (자동 정렬)                           |
| `@typescript-eslint`     | TypeScript 코드 규칙용 ESLint 플러그인           |
| `husky`                  | Git 커밋/푸시 훅 설정 도구                         |
| `lint-staged`            | Git staging된 파일만 lint 검사로 속도 향상          |
---

## 📁 Husky Hook 설명

모든 Git hook은 `.husky/` 폴더에 있으며, 현재 다음 Hook이 활성화되어 있습니다:

```bash
.husky/
├── pre-commit   # 커밋 전 eslint + prettier 자동 실행
```

---

## ⚠️ 문제 해결 가이드

- `@typescript-eslint/naming-convention` 규칙은 타입 정보를 필요로 합니다.
  - 따라서 `.tsx/.ts` 파일은 반드시 `tsconfig.app.json`의 `"include"` 범위에 포함된 경로(`src/`)에 있어야 합니다.
- 만약 오류가 발생한다면, 다음을 확인하세요:
  1. 파일이 `src/` 폴더 하위에 있는가?
  2. `tsconfig.app.json`에 포함되는 경로인가?
  3. `eslint.config.js`에 `parserOptions.project`가 잘 연결되어 있는가?

---

## ✨ 기타 팁

- 커밋 에러가 발생하면, `yarn lint:fix`로 먼저 코드 자동 수정을 시도하세요.
- 문제가 해결되지 않을 경우 `src/` 밖의 파일은 제외하거나 `tsconfig.app.json`에서 처리 범위를 확장해야 합니다.

---
# 📘 Storybook 사용 가이드

우리 프로젝트는 UI 컴포넌트를 개발하고 문서화하기 위해 **[Storybook](https://storybook.js.org/)**을 사용합니다.  
이 문서는 팀원들이 Storybook을 쉽게 설치하고 사용하는 방법, 그리고 새로운 컴포넌트에 대한 스토리를 작성하는 방법을 안내합니다.

---

## 📦 설치 방법

로컬에서 Storybook을 사용하려면 아래 명령어를 실행하세요:

```bash
yarn install
```

> 📌 Storybook 관련 의존성은 이미 `package.json`에 포함되어 있습니다.

---

## 🚀 Storybook 실행 방법

```bash
yarn storybook
```

- 실행 후 브라우저에서 자동으로 `http://localhost:6006`이 열립니다.
- 각 컴포넌트에 대한 스토리를 확인할 수 있습니다.

---

## ✍️ 스토리 작성 방법

### 1. 스토리 파일 생성

루트 디렉토리의 `stories/` 폴더 안에 `<ComponentName>.stories.tsx` 파일을 새로 생성합니다.

예시: `stories/Button.stories.tsx`

### 2. 기본 스토리 템플릿

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Component from '../src/path/to/Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Component',
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {
    // 필요한 props 작성
  },
};
```

### 3. 상태(Redux 등)가 필요한 경우

`ProviderWrapper`로 감싸야 합니다:

```tsx
import ProviderWrapper from '../stories/ProviderWrapper';

decorators: [
  (Story) => (
    <ProviderWrapper>
      <Story />
    </ProviderWrapper>
  ),
],
```

---

## 🎨 스타일 적용

Storybook 환경은 실제 앱과 동일한 스타일이 적용되도록 구성되어 있습니다:

| 구성 요소        | 설명                              | 적용 방식                            |
|------------------|-----------------------------------|--------------------------------------|
| GlobalStyle.tsx  | reset + 공통 스타일 포함          | `<GlobalStyle />`                    |
| common.css.ts    | 클래스, 유틸 스타일                | `GlobalStyle` 내부에서 포함됨       |
| theme.css.ts     | Emotion 기반 테마 (colors 등)     | `<ThemeProvider theme={theme}>`     |
| preview.tsx      | 전역 스타일 및 테마 적용 설정 파일 | 자동 로딩됨                          |

- 글로벌 스타일은 `.storybook/preview.tsx`에서 전역으로 적용됩니다.
- 컴포넌트에서는 `props.theme.xxx`로 테마 값 사용 가능

```tsx
const Box = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
`;
```
---


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
