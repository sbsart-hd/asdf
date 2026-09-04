import { NextResponse } from "next/server";

const NOTION_VERSION = "2022-06-28";

function formatKoreanTime(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}`;
}

export async function POST() {
  const token = process.env.NOTION_TOKEN;
  const parentPageId = process.env.NOTION_PARENT_PAGE_ID;

  if (!token || !parentPageId) {
    console.error(
      "환경변수 누락: NOTION_TOKEN 또는 NOTION_PARENT_PAGE_ID가 설정되지 않았습니다."
    );
    return NextResponse.json(
      { ok: false, error: "서버에 Notion 설정이 되어 있지 않습니다." },
      { status: 500 }
    );
  }

  const formattedTime = formatKoreanTime(new Date());

  try {
    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { page_id: parentPageId },
        properties: {
          title: [{ text: { content: "AI 자동화 시연 완료" } }],
        },
        children: [
          {
            object: "block",
            type: "heading_2",
            heading_2: {
              rich_text: [{ text: { content: "AI 자동화 시연 완료" } }],
            },
          },
          {
            object: "block",
            type: "paragraph",
            paragraph: {
              rich_text: [
                { text: { content: `실행 시간: ${formattedTime}` } },
              ],
            },
          },
          {
            object: "block",
            type: "paragraph",
            paragraph: {
              rich_text: [
                {
                  text: {
                    content: "자동화 시스템을 통해 자동 생성된 페이지입니다.",
                  },
                },
              ],
            },
          },
        ],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Notion API 오류:", data);
      return NextResponse.json(
        { ok: false, error: data.message || "Notion 페이지 생성에 실패했습니다." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, time: formattedTime, pageId: data.id });
  } catch (err: any) {
    console.error("Notion 요청 중 예외 발생:", err);
    return NextResponse.json(
      { ok: false, error: "Notion 서버에 연결할 수 없습니다." },
      { status: 500 }
    );
  }
}
