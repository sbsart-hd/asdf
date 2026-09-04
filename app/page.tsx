"use client";

import { useState } from "react";

const STEPS = [
  "자동화 시작",
  "Notion 연결 중...",
  "데이터 전송 중...",
  "Notion 기록 완료 ✓",
];

type ResultState =
  | { type: "idle" }
  | { type: "success"; time: string }
  | { type: "error"; message: string };

export default function Home() {
  const [running, setRunning] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);
  const [result, setResult] = useState<ResultState>({ type: "idle" });

  async function runAutomation() {
    setRunning(true);
    setResult({ type: "idle" });
    setStepIndex(0);

    // 사용자가 단계를 눈으로 따라갈 수 있도록 짧은 간격을 둔다.
    for (let i = 1; i <= 2; i++) {
      await wait(600);
      setStepIndex(i);
    }

    try {
      const res = await fetch("/api/automate", { method: "POST" });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "알 수 없는 오류");
      }

      setStepIndex(3);
      setResult({ type: "success", time: data.time });
    } catch (err: any) {
      console.error("Notion 자동화 실패:", err);
      setResult({ type: "error", message: err.message || String(err) });
    } finally {
      setRunning(false);
    }
  }

  return (
    <main className="card">
      <h1>AI AUTOMATION</h1>
      <p className="subtitle">버튼을 눌러 AI 자동화를 실행하세요.</p>

      <button
        className="run"
        onClick={runAutomation}
        disabled={running}
      >
        {running ? "실행 중..." : "자동화 실행"}
      </button>

      <div className="status-box">
        {running && stepIndex >= 0 && (
          <>
            <span className="spinner" />
            <span>{STEPS[stepIndex]}</span>
          </>
        )}
      </div>

      {result.type === "success" && (
        <div className="result">
          <div className="headline">
            <span className="check">✓</span>
            자동화가 성공적으로 실행되었습니다.
          </div>
          <div className="detail">
            <b>결과:</b> AI 자동화 시연 완료
            <br />
            <b>실행 시간:</b> {result.time}
          </div>
        </div>
      )}

      {result.type === "error" && (
        <div className="result error">
          <div className="headline">Notion 연결 실패</div>
          <div className="detail">{result.message}</div>
        </div>
      )}
    </main>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
