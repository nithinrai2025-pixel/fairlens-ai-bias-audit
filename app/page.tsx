"use client";

import { useState } from "react";

export default function Home() {
  const [groupA, setGroupA] = useState("80");
  const [totalA, setTotalA] = useState("100");
  const [groupB, setGroupB] = useState("60");
  const [totalB, setTotalB] = useState("100");
  const [result, setResult] = useState("");

  function audit() {
    const a = Number(groupA);
    const ta = Number(totalA);
    const b = Number(groupB);
    const tb = Number(totalB);

    if (
      ta <= 0 || tb <= 0 ||
      a < 0 || b < 0 ||
      a > ta || b > tb ||
      ![a, ta, b, tb].every(Number.isFinite)
    ) {
      setResult("Please enter valid numbers.");
      return;
    }

    const rateA = (a / ta) * 100;
    const rateB = (b / tb) * 100;
    const difference = Math.abs(rateA - rateB);
    const ratio =
      Math.min(rateA, rateB) / Math.max(rateA, rateB || 1);

    setResult(
      `Group A approval rate: ${rateA.toFixed(1)}%
Group B approval rate: ${rateB.toFixed(1)}%
Difference: ${difference.toFixed(1)} percentage points
Selection rate ratio: ${ratio.toFixed(2)}

${difference > 10
  ? "Potential disparity detected. Investigate further."
  : "No large difference detected by this simple check."}

This is a preliminary statistical check, not proof of fairness or discrimination.`
    );
  }

  return (
    <main style={{
      maxWidth: 760,
      margin: "40px auto",
      padding: 24,
      fontFamily: "Arial, sans-serif",
      color: "#172033"
    }}>
      <h1>FairLens AI Bias Audit</h1>
      <p>
        Explore differences in outcomes between two groups.
        Enter sample counts to run a preliminary fairness check.
      </p>

      <section style={{
        padding: 20,
        border: "1px solid #d1d5db",
        borderRadius: 12,
        marginTop: 24
      }}>
        <h2>Group A</h2>
        <label>
          Favorable outcomes
          <input
            type="number"
            min="0"
            value={groupA}
            onChange={e => setGroupA(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label>
          Total cases
          <input
            type="number"
            min="1"
            value={totalA}
            onChange={e => setTotalA(e.target.value)}
            style={inputStyle}
          />
        </label>

        <h2>Group B</h2>
        <label>
          Favorable outcomes
          <input
            type="number"
            min="0"
            value={groupB}
            onChange={e => setGroupB(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label>
          Total cases
          <input
            type="number"
            min="1"
            value={totalB}
            onChange={e => setTotalB(e.target.value)}
            style={inputStyle}
          />
        </label>

        <button onClick={audit} style={{
          marginTop: 16,
          padding: "12px 20px",
          background: "#2563eb",
          color: "white",
          border: 0,
          borderRadius: 8,
          cursor: "pointer"
        }}>
          Run Bias Audit
        </button>

        {result && (
          <pre style={{
            whiteSpace: "pre-wrap",
            background: "#f3f4f6",
            padding: 16,
            borderRadius: 8,
            marginTop: 20
          }}>
            {result}
          </pre>
        )}
      </section>

      <p style={{ fontSize: 13, marginTop: 20 }}>
        Demo only: uses counts entered by the user. It does not
        connect to an AI model or establish whether discrimination
        has occurred.
      </p>
    </main>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  boxSizing: "border-box" as const,
  padding: 10,
  marginTop: 6,
  marginBottom: 16,
  border: "1px solid #d1d5db",
  borderRadius: 6
};
