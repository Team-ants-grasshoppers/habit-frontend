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
```
