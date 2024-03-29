import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Ejercicio from "@/models/Ejercicio";

// export const dynamic = 'force-dynamic'
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    const title = data.title;
    if (!title) return NextResponse.json({ error: "title is required" });
    const ejercicio = await Ejercicio.findOne({ title });
      return NextResponse.json({
        success: true,
        data: ejercicio,
        status: 200,
      });
  } catch (error) {
    console.error("Error api ejercicio", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}