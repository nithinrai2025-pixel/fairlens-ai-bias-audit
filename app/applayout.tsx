import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FairLens AI Bias Audit",
  description: "A preliminary AI fairness auditing dashboard."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#ffffff" }}>
        {children}
      </body>
    </html>
  );
}
