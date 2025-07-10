# SvelteKit 마이그레이션 현황 분석 보고서

> @src/admin/ @src/client/ 이 두코드가 아주 오래전에 python기반으로 만들어진 페이지야. 이걸 sveltekit로 이전 중이던 프로젝트야. 하다가 중간에 멈춘 프로젝트라서 우선 어떤 기능이 누락이 되어 있는지 무슨 기능들을 옮겨야 하는지 분석해서 리포트를 작성해줘

## 프로젝트 개요

- **레거시 시스템**: Python 2 + Google App Engine (ndb) 기반
- **신규 시스템**: SvelteKit + Node.js 기반  
- **현재 상태**: 일부 기능만 마이그레이션 완료, 대부분 하드코딩된 상태

## 1. 레거시 시스템 (Python) 기능 분석

### 1.1 관리자(Admin) API

| API | 엔드포인트 | 주요 기능 |
|-----|----------|----------|
| **계정 관리** | `/admin/api/account` | 로그인/로그아웃, 세션 관리 |
| **블로그 관리** | `/admin/api/blogs` | CRUD, 페이징, 검색, 태그별 필터링 |
| **설정 관리** | `/admin/api/configs` | 키-값 형태의 시스템 설정 |
| **작품 관리** | `/admin/api/items` | CRUD, 카테고리/태그 필터링, 검색 |
| **주문 관리** | `/admin/api/orders` | 주문 처리, 배송 관리, 아임포트 연동 |
| **태그 관리** | `/admin/api/tags` | 전체 태그 목록 조회 |
| **사용자 관리** | `/admin/api/users` | CRUD, 사용자 타입별 관리 |

### 1.2 클라이언트(Client) API

| API | 엔드포인트 | 주요 기능 |
|-----|----------|----------|
| **블로그** | `/api/blogs` | 목록 조회, 태그별 필터링, 상세 조회 |
| **장바구니** | `/api/cart` | 장바구니 CRUD |
| **설정** | `/api/configs` | 공개 설정 정보 조회 |
| **파일** | `/api/files` | 파일 업로드/다운로드 (Blobstore) |
| **작품** | `/api/items` | 목록/상세 조회, 네이버 쇼핑 XML |
| **뉴스** | `/api/news` | 뉴스 목록 조회 |
| **PayPal** | `/api/paypal` | 결제 처리, 환율 변환 |
| **계정** | `/api/account/*` | 회원가입, 로그인, 주문 조회 |

### 1.3 주요 기능 특징

- **인증**: 세션 기반 인증 (SHA1 해싱)
- **데이터베이스**: Google Datastore (ndb)
- **파일 저장**: Google Blobstore
- **이미지 처리**: Google Images API
- **결제**: PayPal, 아임포트 연동
- **외부 연동**: 네이버 쇼핑

## 2. 현재 SvelteKit 구현 상태

### 2.1 구현된 API

| 구분 | 엔드포인트 | 구현 상태 |
|------|----------|-----------|
| Admin | `/admin/api/configs/[config]` | 빈 함수 |
| Admin | `/admin/api/items` | 빈 함수 |
| Client | `/api/items/main` | 하드코딩된 데이터 |
| Client | `/api/items/[category]/[tag]` | 하드코딩된 데이터 |
| Client | `/api/items/[category]/latest` | 하드코딩된 데이터 |
| Client | `/api/blogs` | 하드코딩된 데이터 |
| Client | `/api/configs/tags` | 하드코딩된 데이터 |

### 2.2 구현된 페이지

**클라이언트 페이지:**
- 메인 페이지 (`/`)
- 비디오 목록 (`/[videos]/[tag]`)
- 블로그 페이지 (`/blog`)

**관리자 페이지:**
- 비디오 관리 (`/admin/videos`)
- 태그 관리 (`/admin/tags`)
- 사용자 관리 (`/admin/users`)
- 블로그 관리 (`/admin/pages/blog`)

### 2.3 구현 상태 요약

- ✅ 기본적인 라우팅 구조 설정
- ✅ UI 컴포넌트 일부 구현
- ✅ 하드코딩된 데이터로 화면 표시
- ❌ 데이터베이스 연동
- ❌ 실제 CRUD 기능
- ❌ 인증/권한 시스템
- ❌ 파일 업로드/다운로드
- ❌ 검색 기능
- ❌ 결제 시스템

## 3. 마이그레이션 필요 기능 목록

### 3.1 우선순위 1 - 핵심 기능

1. **데이터베이스 연동**
   - Google Datastore → 현대적인 DB 솔루션으로 전환
   - 데이터 모델 정의 및 마이그레이션

2. **인증 시스템**
   - 세션 기반 → JWT 또는 현대적인 인증 방식
   - SHA1 → bcrypt 등 안전한 해싱 알고리즘

3. **기본 CRUD API**
   - items, blogs, users 등 핵심 엔티티
   - 하드코딩된 데이터를 실제 DB 조회로 교체

### 3.2 우선순위 2 - 주요 기능

4. **파일 업로드**
   - Google Blobstore → Cloud Storage 또는 S3
   - 이미지 리사이징 기능

5. **검색 기능**
   - 전문 검색 구현
   - 필터링 및 정렬

6. **주문/결제 시스템**
   - 장바구니 기능
   - PayPal/아임포트 연동

### 3.3 우선순위 3 - 추가 기능

7. **관리자 기능**
   - 대시보드
   - 통계/리포트
   - 배송 관리

8. **외부 연동**
   - 네이버 쇼핑 XML
   - 이메일 발송

## 4. 기술적 고려사항

### 4.1 데이터베이스 전환
- **현재**: Google Datastore (NoSQL)
- **추천**: PostgreSQL/MySQL (관계형) 또는 MongoDB (NoSQL)
- **ORM**: Prisma 또는 Drizzle 사용 권장

### 4.2 인증 개선
- **현재**: SHA1 해싱 (보안 취약)
- **추천**: bcrypt/argon2 + JWT/세션
- **라이브러리**: Lucia Auth 또는 Auth.js

### 4.3 파일 저장소
- **현재**: Google Blobstore
- **추천**: AWS S3, Cloudflare R2, 또는 로컬 스토리지
- **라이브러리**: @aws-sdk/client-s3 등

### 4.4 API 설계
- RESTful 원칙 준수
- TypeScript 타입 정의
- Zod 등을 활용한 런타임 검증

## 5. 단계별 마이그레이션 계획

### Phase 1 (1-2주)
1. 데이터베이스 설정 및 스키마 정의
2. 기본 인증 시스템 구현
3. Items API CRUD 구현
4. Blogs API CRUD 구현

### Phase 2 (2-3주)
5. 파일 업로드 시스템 구현
6. 검색 및 필터링 기능
7. 사용자 관리 기능
8. 관리자 페이지 완성

### Phase 3 (2-3주)
9. 장바구니 기능
10. 결제 시스템 연동
11. 주문 관리
12. 이메일 알림

### Phase 4 (1-2주)
13. 성능 최적화
14. 보안 강화
15. 테스트 작성
16. 배포 준비

## 6. 즉시 필요한 작업

1. **환경 설정**
   - 데이터베이스 선택 및 설정
   - 환경 변수 관리 (.env)
   - TypeScript 타입 정의

2. **첫 번째 API 구현**
   - `/api/items` GET (목록 조회)
   - 실제 DB 연동
   - 페이징 처리

3. **인증 기초**
   - 로그인/로그아웃 API
   - 세션 또는 JWT 구현
   - 미들웨어 설정

이 보고서를 바탕으로 단계적으로 마이그레이션을 진행하시면 됩니다. 각 단계마다 테스트를 충분히 진행하고, 레거시 시스템과 병행 운영하면서 점진적으로 전환하는 것을 권장합니다.