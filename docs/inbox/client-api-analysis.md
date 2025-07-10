# Client API 분석 보고서

## 1. 개요
`src/client/api` 디렉토리에는 클라이언트(일반 사용자)를 위한 API 엔드포인트들이 구현되어 있습니다. 주로 상품 조회, 장바구니, 블로그, 계정 관리, 결제 등의 기능을 제공합니다.

## 2. 각 파일별 API 엔드포인트와 기능

### 2.1 blogs.py - 블로그 API
| 엔드포인트 | 메소드 | 기능 |
|------------|--------|------|
| `/api/blogs` | GET | 공개된 블로그 목록 조회 (페이징 30개) |
| `/api/blogs/tags/<tags>` | GET | 특정 태그를 가진 블로그 목록 조회 |
| `/api/blogs/search` | GET | 블로그 검색 |
| `/api/blogs/<id>` | GET | 블로그 상세 정보 조회 |

### 2.2 cart.py - 장바구니 API
| 엔드포인트 | 메소드 | 기능 |
|------------|--------|------|
| `/api/cart` | GET | 장바구니 조회 |
| `/api/cart` | POST | 장바구니에 상품 추가 |
| `/api/cart/<id>` | PUT | 장바구니 상품 정보 수정 |
| `/api/cart` | PUT | 장바구니 전체 덮어쓰기 |
| `/api/cart/<id>` | DELETE | 장바구니에서 특정 상품 제거 |
| `/api/cart` | DELETE | 장바구니 전체 비우기 |

### 2.3 items.py - 상품 API
| 엔드포인트 | 메소드 | 기능 |
|------------|--------|------|
| `/api/items` | GET | 공개된 상품 목록 조회 |
| `/api/items/<category>` | GET | 특정 카테고리의 상품 목록 조회 |
| `/api/items/<category>/<tag>` | GET | 특정 카테고리와 태그의 상품 목록 조회 |
| `/api/items/<id>` | GET | 상품 상세 정보 조회 (이전/다음 상품 포함) |
| `/api/items.xml` | GET | 네이버 쇼핑 연동용 XML 형식 상품 정보 |

### 2.4 configs.py - 설정 API
| 엔드포인트 | 메소드 | 기능 |
|------------|--------|------|
| `/api/configs/<id>` | GET | 특정 설정 정보 조회 |

### 2.5 news.py - 뉴스 API
| 엔드포인트 | 메소드 | 기능 |
|------------|--------|------|
| `/api/news` | GET | 뉴스 목록 조회 (configs의 news2 데이터) |

### 2.6 files.py - 파일 업로드 API
| 엔드포인트 | 메소드 | 기능 |
|------------|--------|------|
| `/api/files/upload-url` | POST | 파일 업로드 URL 생성 |
| `/api/files` | POST | 파일 업로드 처리 (BlobstoreUploadHandler) |
| `/files/<id>` | GET | 업로드된 파일 다운로드 |

### 2.7 paypal.py - PayPal 결제 API
| 엔드포인트 | 메소드 | 기능 |
|------------|--------|------|
| `/api/paypal/token` | GET | PayPal 액세스 토큰 조회 |
| `/api/paypal/create-payment` | POST | PayPal 결제 생성 |
| `/api/paypal/execute-payment` | POST | PayPal 결제 실행 |
| `/api/paypal/orders/<id>/authorize` | POST | PayPal 주문 승인 |

### 2.8 account/__init__.py - 계정 관리 API
| 엔드포인트 | 메소드 | 기능 |
|------------|--------|------|
| `/api/account` | GET | 현재 로그인한 계정 정보 조회 |
| `/api/account` | POST | 로그인 |
| `/api/account` | DELETE | 로그아웃 |
| `/api/account/profile` | PUT | 프로필 정보 변경 |
| `/api/account/password` | PUT | 비밀번호 변경 |
| `/api/account/<email>` | POST | 회원가입 |
| `/api/account/<email>/forgot-password` | POST | 비밀번호 찾기 |
| `/api/account/<email>/password/<verify>` | PUT | 비밀번호 재설정 |
| `/account/<email>/activate/<verify>` | GET | 이메일 인증 페이지 |
| `/account/<email>/reset-password/<verify>` | GET | 비밀번호 재설정 페이지 |

### 2.9 account/orders.py - 주문 관리 API
| 엔드포인트 | 메소드 | 기능 |
|------------|--------|------|
| `/api/account/orders` | GET | 사용자의 주문 목록 조회 |
| `/api/account/orders/<id>` | GET | 주문 상세 정보 조회 |
| `/api/account/orders/npay` | GET | 네이버페이 테스트 API |
| `/api/account/orders/testpaypal` | GET | PayPal 테스트 API |

### 2.10 account/shipping.py - 배송 정보 API
| 엔드포인트 | 메소드 | 기능 |
|------------|--------|------|
| `/api/account/shipping` | PUT | 배송 정보 저장 |

### 2.11 temp.py - 임시 파일 처리
| 엔드포인트 | 메소드 | 기능 |
|------------|--------|------|
| `/temp/<filename>` | GET | 임시 이미지 리다이렉트 (GCS) |

## 3. 주요 데이터 모델과 스키마

### 3.1 사용되는 주요 데이터 모델
- **db.blogs**: 블로그 게시물 (status, type, published_at, created_at, tags, search)
- **db.items**: 상품 정보 (status, tag_categories, tags, created_at, price, thumbnail, naver_thumbnail)
- **db.cart**: 장바구니 (rows)
- **db.cart_item**: 장바구니 상품 (key, extra)
- **db.users**: 사용자 정보 (email, password, type, verify, activated, cart, shipping_info)
- **db.orders**: 주문 정보 (buyer_key, type, status, res)
- **db.configs**: 시스템 설정

### 3.2 상태 값
- 블로그/상품 status: "공개", "비공개"
- 사용자 type: "미인증회원", "일반회원", "관리자"
- 주문 status: "배송요청", PayPal state 값

## 4. 인증/권한 처리 방식

### 4.1 세션 기반 인증
- `self.session["account"]`에 사용자 ID 저장
- 로그인 시 세션에 account ID 저장
- 로그아웃 시 세션에서 account 삭제

### 4.2 권한 체크
- 대부분의 API는 공개 접근 가능
- 계정 관련 API는 로그인 필요 (account 파라미터로 전달)
- 주문 조회는 본인 주문 또는 관리자만 가능

### 4.3 비밀번호 처리
- SHA1 해시 사용 (보안상 취약점)
- 비밀번호 찾기/재설정은 이메일 인증 방식

## 5. 외부 서비스 연동

### 5.1 PayPal 결제
- CLIENT/SECRET 키 사용 (라이브/샌드박스 환경)
- OAuth2 토큰 방식 인증
- USD 환율 변환 지원
- 배송비 자동 계산

### 5.2 네이버 쇼핑
- XML 형식으로 상품 정보 제공
- 네이버 쇼핑 규격에 맞춘 상품 정보 변환

### 5.3 네이버페이
- 테스트 API 구현 (미완성 상태)

### 5.4 Google App Engine 서비스
- Blobstore: 파일 업로드/다운로드
- Images API: 이미지 서빙 URL 생성
- Mail API: 이메일 발송 (sendmail 함수)

## 6. 관리자 API와의 차이점

### 6.1 접근 권한
- **클라이언트 API**: 주로 조회 기능, 제한적인 수정/삭제
- **관리자 API**: 전체 CRUD 권한

### 6.2 기능 범위
| 기능 | 클라이언트 API | 관리자 API |
|------|----------------|------------|
| 블로그 | 공개된 것만 조회 | 전체 CRUD |
| 상품 | 공개된 것만 조회 | 전체 CRUD |
| 주문 | 본인 주문만 조회 | 전체 주문 관리, 상태 변경 |
| 사용자 | 본인 정보만 수정 | 전체 사용자 관리 |
| 설정 | 조회만 가능 | 수정 가능 |

### 6.3 API 경로
- 클라이언트: `/api/*`
- 관리자: `/admin/api/*`

### 6.4 추가 기능
관리자 API에만 있는 기능:
- 주문 상태 변경 (주문취소, 배송중, 배송완료 등)
- 사용자 관리 (생성, 삭제)
- 설정 수정
- 통계 조회 (count 엔드포인트)

## 7. 보안 및 개선 사항

### 7.1 보안 취약점
1. **SHA1 해시 사용**: 현재는 안전하지 않은 해시 알고리즘
2. **CSRF 보호 부재**: API에 CSRF 토큰 검증 없음
3. **Rate Limiting 없음**: API 호출 제한 없음

### 7.2 개선 제안
1. bcrypt 또는 Argon2 같은 안전한 해시 함수 사용
2. JWT 토큰 기반 인증 도입
3. API Rate Limiting 구현
4. 입력 검증 강화
5. 에러 처리 표준화