# AutoNavi

## 프로젝트 소개
AutoNavi는 무인 자동차 충전소 위치정보를 제공하고, 무인운송차량의 실시간 위치, 상태를 확인하고, 관리하는 프로젝트입니다.
차량의 배터리를 확인 후 배터리가 없으면 가장 빨리 충전할 수 있는 충천소를 추천해주고, 무인운송차량을 이동 시킵니다.  

## 팀원 소개
김남운(팀장), 박범현, 부반손, 신규림, 조채은

## 개발 일정
2023-09-01 ~ 2023-10-13

## 개발 환경


<img src = 'https://github.com/knu9910/AutoNavi/assets/59068144/7b5e3714-2722-400c-a1e2-10a149afd592' alt="redux" width=300, height=200 />
<img src = 'https://github.com/knu9910/AutoNavi/assets/59068144/bf8cf872-9e44-4bd3-acab-92ac5fad2970' alt="react" width=250, height=200 />
<img src = 'https://github.com/knu9910/AutoNavi/assets/59068144/00fe32f2-2a61-49ba-bde0-23f55d53087b' alt="mysql" width=300, height=200 />
<img src = 'https://github.com/knu9910/AutoNavi/assets/59068144/82b21cd2-08c3-4063-ad35-5c24502648bf' alt="nodejs" width=300, height=200 />
<img src = 'https://github.com/knu9910/AutoNavi/assets/59068144/8c8368ab-be35-4234-bfd8-9ea511927e37' alt="express" width=300, height=200 />
<img src = 'https://github.com/knu9910/AutoNavi/assets/59068144/9bdf02b5-3c02-4836-846c-9495838e3700' alt="soketio" width=200, height=200 />


## 컨벤션
### 코드 컨벤션
- eslint recommended 규칙 사용 / 필요한 규칙 추가
- 들여쓰기 스페이스바 두번
- js string type '' 사용
- html 속성 값들은 "" 사용
- === 일치 연산자 사용
  
```
const string = 'hello' // js string type '' 사용

<img id="user_image" style={{ display: 'flex' }} src="#" alt="" /> // html 속성 "" 사용

if(id === 1) {  // 일치 연산자 사용
  return 1;  // 들여쓰기 두번 
}

```
# 깃 커밋 메세지 컨벤션
- type의 유형

  - feat: 새로운 기능
  - fix: 버그 수정
  - docs: 문서 변경 사항(readme.md, json 파일 등)
  - style: 코드 포맷 변경, 세미콜론 수정 등. 기능 변경 없음
  - refactor: 코드 리팩토링 
  - test: 테스트 코드. 기능 변경 없음
  - chore: 빌드 작업 수정, 패키지 매니저 수정 등. 기능 변경 없음
  - design: css 코드 작성
 



