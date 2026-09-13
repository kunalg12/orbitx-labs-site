import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  service: z.enum(["ai-agents", "software", "mobile", "web", "other"]),
  budget: z.string().optional(),
  message: z.string().min(20, "Message must be at least 20 characters").max(2000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { name, email, service, budget, message } = result.data;

    // Phase 1: log to console
    console.log("[Contact Form Submission]", {
      name,
      email,
      service,
      budget,
      message,
      timestamp: new Date().toISOString(),
    });

    // Phase 2: Uncomment when RESEND_API_KEY is configured
    // const { Resend } = await import('resend')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'contact@orbitxlabs.com',
    //   to: 'hello@orbitxlabs.com',
    //   subject: `New project inquiry from ${name}`,
    //   html: `
    //     <h2>New inquiry from ${name}</h2>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Service:</strong> ${service}</p>
    //     <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
    //     <p><strong>Message:</strong><br/>${message}</p>
    //   `,
    // })

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
