import { connectDB } from "@/lib/mongodb";
import Link from "@/models/Link";
import { NextResponse } from "next/server";

export async function GET() {
  try{
    await connectDB();

    const data = await Link.find({});
    return NextResponse.json(data, { status: 200 });
  } catch(error) {
    console.error(error);
    return NextResponse.json({
      'message': 'Error when loading links'
    }, {
      status: 500
    })
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { tag, url, description } = body;

  const foundLink = await Link.findOne({
    tag: tag
  });

  if(foundLink) {
    return NextResponse.json({
      message: 'Tag already exists'
    }, { status: 400 });
  }

  const newLink = new Link({
    tag,
    url,
    description,
  });

  await newLink.save();

  return NextResponse.json({
    ...newLink
  }, { status: 201 })
}
