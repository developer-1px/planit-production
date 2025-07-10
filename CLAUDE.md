# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

SvelteKit 기반의 비디오 포트폴리오 웹사이트로, Google App Engine에 배포되도록 설계됨. 클라이언트와 관리자 섹션으로 구분되어 있으며, Vimeo API를 통한 비디오 콘텐츠 관리 기능 포함.

- `src/admin`과 `src/client`는 구 Google App Engine Python 기반 홈페이지이며, SvelteKit으로 고도화하는 것이 현재 목표임

## 개발 명령어

### 개발 서버
```bash
pnpm dev  # 주의: hang up 이슈가 있으므로 권장하지 않음
```

### 빌드 및 테스트
```bash
pnpm build      # 프로덕션 빌드
pnpm preview    # 빌드된 앱 미리보기
pnpm check      # TypeScript 체크
pnpm lint       # 코드 스타일 체크
pnpm format     # 코드 포맷팅
```

### 배포
```bash
pnpm deploy     # Google App Engine에 배포 (build 포함)
```

## 아키텍처 구조

### 라우트 구조
- `/(client)/` - 공개 웹사이트 (기본 레이아웃)
  - 메인 페이지, 비디오 갤러리, 블로그 등
  - Vimeo 플레이어 통합
- `/(admin)/admin/` - 관리자 패널
  - 컨텐츠 관리 (비디오, 블로그, 태그)
  - 사용자 관리
  - 설정 관리

### 주요 디렉토리
- `/src/lib/` - 공통 라이브러리 및 유틸리티
  - `api/` - HTTP 클라이언트 및 API 래퍼
  - `$timeout.ts`, `Vimeo$.ts` 등 커스텀 유틸리티
- `/src/shared/` - 공유 컴포넌트 및 모델
  - `api/`, `model/`, `ui/` 구조
- `/src/widgets/` - 재사용 가능한 위젯 컴포넌트
- `/src/admin/` - 레거시 관리자 HTML/JS/CSS (점진적 마이그레이션 중)
- `/src/client/` - 레거시 클라이언트 HTML/JS/CSS

### API 구조
- SvelteKit의 `+server.ts` 파일을 통한 API 엔드포인트
- `apiForge.ts`를 사용한 타입 세이프 API 클라이언트 생성
- 동적 경로 파라미터 지원 (`:param`, `[param]` 등)

### 스타일링
- Adorable CSS 프레임워크 사용
- Stylus 전처리기 (`.styl` 파일)
- 레거시 CSS와 모던 CSS 혼재

### 상태 관리
- Svelte 5의 runes 사용 (`.svelte.ts` 파일)
- 컴포넌트 레벨 상태 관리 중심

### 빌드 설정
- Vite 기반 빌드 시스템
- Node.js 어댑터 사용 (App Engine 배포용)
- TypeScript strict 모드 활성화

## 개발 시 주의사항

### 성능
- `pnpm dev` 대신 `pnpm build`나 `pnpm test` 사용 권장 (hang up 이슈)

### 코드 스타일
- 순수 함수와 추상화 벽을 활용한 코딩
- 300라인 넘어가면 리팩토링 고려
- 가능한 한 코드 라인 수 최소화
- 파일명과 주요 함수명 일치시키기

### API 개발
- 기존 `apiForge` 패턴 따르기
- 타입 세이프티 유지
- 동적 라우트 파라미터 처리 시 인코딩 확인

### 레거시 코드
- `/src/admin/`과 `/src/client/` 디렉토리의 HTML/JS는 레거시
- 점진적으로 SvelteKit 컴포넌트로 마이그레이션 진행 중
- 레거시 코드 수정 시 기존 패턴 유지

### 배포
- Google App Engine Node.js 20 런타임 사용
- `app.yaml` 설정 확인
- 빌드 후 배포 필수

## 보고서 작성 규칙

### 문서화 가이드라인
- 보고서 위치: `/docs/inbox/YYYYMMDD/` 폴더 아래에 생성
- 파일명 형식: `yyyyMMdd-HHMMSS-제목.md` (반드시 대문자 사용)
  - yyyy: 4자리 연도
  - MM: 2자리 월 (01-12)
  - dd: 2자리 일 (01-31)
  - HH: 2자리 시간 24시간 형식 (00-23)
  - MM: 2자리 분 (00-59)
  - SS: 2자리 초 (00-59)
- 시스템 날짜/시간 사용 (`date +"%Y%m%d-%H%M%S"`)
- 원본 요청사항을 시작 부분에 인용문(blockquote)으로 표시
- 모든 문서를 한국어로 작성
- 솔루션 제안 전 컨텍스트 및 발견 사항 포함
- 패키지 업데이트 시 버전 충돌 및 주요 변경 사항 문서화