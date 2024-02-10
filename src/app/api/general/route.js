import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Ejercicio from "@/models/Ejercicio";

// export const dynamic = 'force-dynamic' 
export async function GET() {
  try {
    await connectDB();
    const inversas = await Ejercicio.find().lean();
    console.log(inversas);
    return NextResponse.json({
      success: true,
      data: inversas,
      status: 200,
    });
  } catch (error) {
    console.log("Error api inversas",error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    console.log(data);
    const ejercicio = new Ejercicio(data);
    await ejercicio.save();
    return NextResponse.json({
      success: true,
      data: ejercicio,
      status: 200,
    })
  }catch (error) {
    console.log("Error api inversas",error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

