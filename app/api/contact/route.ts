import { NextResponse } from "next/server";

export const runtime = "nodejs";

const fields = [
  "name",
  "email",
  "company",
  "phone",
  "projectType",
  "timeline",
  "challenge",
] as const;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const data = {
    name: clean(body.name, 120),
    email: clean(body.email, 254),
    company: clean(body.company, 160),
    phone: clean(body.phone, 60),
    projectType: clean(body.projectType, 160),
    timeline: clean(body.timeline, 120),
    challenge: clean(body.challenge, 4000),
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    !data.name ||
    !emailPattern.test(data.email) ||
    !data.projectType ||
    !data.timeline ||
    data.challenge.length < 10
  ) {
    return NextResponse.json(
      { error: "Please complete all required fields." },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Contact delivery is not configured." },
      { status: 503 },
    );
  }

  const lines = fields.map((field) => {
    const labels: Record<(typeof fields)[number], string> = {
      name: "Name",
      email: "Work email",
      company: "Company",
      phone: "Phone",
      projectType: "Project type",
      timeline: "Preferred start",
      challenge: "Challenge or launch",
    };
    return `${labels[field]}: ${data[field] || "Not provided"}`;
  });

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM_EMAIL ||
          "Algrid Website <website@algridinternational.com>",
        to: [process.env.CONTACT_TO_EMAIL || "social@algridinternational.com"],
        reply_to: data.email,
        subject: `Project brief — ${data.company || data.name}`,
        text: lines.join("\n\n"),
      }),
    });
  } catch {
    console.error("Contact email provider could not be reached");
    return NextResponse.json(
      { error: "Contact delivery failed." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    console.error("Contact email provider rejected the request", response.status);
    return NextResponse.json(
      { error: "Contact delivery failed." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
