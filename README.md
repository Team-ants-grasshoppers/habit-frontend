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
