# AI 자동화 시연 웹앱

버튼 하나를 누르면 실제 Notion에 "AI 자동화 시연 완료" 페이지가 생성되는
아주 단순한 데모 웹앱입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

`.env.local` 파일을 만들고 아래 두 값을 입력하세요. (`.env.example` 참고)

```
NOTION_TOKEN=
NOTION_PARENT_PAGE_ID=
```

## 설정 방법 (초보자용)

### 1. Notion Integration 만드는 방법

1. [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations) 접속 후 로그인합니다.
2. **"+ New integration"** 버튼을 클릭합니다.
3. 이름을 입력합니다. (예: `AI Automation Demo`)
4. 연결할 워크스페이스를 선택하고 **Submit**을 누릅니다.
5. 생성된 화면에서 **"Internal Integration Secret"** 값을 복사합니다.
   (`secret_...` 또는 `ntn_...` 로 시작하는 문자열입니다.)

### 2. NOTION_TOKEN 입력 위치

방금 복사한 값을 아래에 붙여넣습니다.

- **로컬에서 실행할 때**: 프로젝트 루트에 `.env.local` 파일을 만들고

  ```
  NOTION_TOKEN=여기에_복사한_시크릿_붙여넣기
  ```

- **Vercel에 배포할 때**: Vercel 프로젝트 → **Settings → Environment Variables**
  에서 `NOTION_TOKEN` 이름으로 같은 값을 추가합니다.

### 3. NOTION_PARENT_PAGE_ID 확인 및 입력 방법

새 페이지가 생성될 "부모 페이지"를 Notion에서 하나 만들거나 선택합니다.

1. 새 페이지를 열면 브라우저 주소창에 아래와 같은 URL이 보입니다.

   ```
   https://www.notion.so/내페이지제목-1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d
   ```

2. 맨 뒤의 32자리 문자열(하이픈 없이 붙어있는 부분)이 **페이지 ID**입니다.
   위 예시라면 `1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d` 가 페이지 ID입니다.
3. 이 값을 `NOTION_PARENT_PAGE_ID` 에 입력합니다. (로컬은 `.env.local`,
   배포는 Vercel 환경변수에 동일하게 추가)

4. **중요**: 이 부모 페이지 오른쪽 위 **"..." 메뉴 → Connections(연결)** 에서
   1번에서 만든 Integration(`AI Automation Demo`)을 반드시 추가해야 합니다.
   연결하지 않으면 "Notion 연결 실패" 오류가 발생합니다.

## Vercel 배포

1. 이 저장소를 GitHub에 올리고 [Vercel](https://vercel.com)에서 Import 합니다.
2. 위 2단계, 3단계에서 설명한 `NOTION_TOKEN`, `NOTION_PARENT_PAGE_ID` 를
   Vercel 프로젝트의 Environment Variables에 추가합니다.
3. Deploy를 누르면 완료됩니다.

## 사용 방법

1. 웹앱 접속 후 화면 중앙의 **[ 자동화 실행 ]** 버튼을 누릅니다.
2. 아래 순서로 상태가 표시됩니다.
   - 자동화 시작
   - Notion 연결 중...
   - 데이터 전송 중...
   - Notion 기록 완료 ✓
3. 성공하면 초록색 체크와 함께 결과가 표시되고, 지정한 Notion 페이지 하위에
   "AI 자동화 시연 완료" 페이지가 실제로 생성됩니다.
4. 실패하면 "Notion 연결 실패" 메시지가 표시되며, 자세한 오류 내용은
   브라우저 콘솔 및 서버 로그에서 확인할 수 있습니다.
