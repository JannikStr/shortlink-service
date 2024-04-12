import { connectDB } from "@/lib/mongodb";
import Link from "@/models/Link";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export async function GET() {
  try{
    await connectDB();

    const session = await getServerSession(options);

    if(!session) {
      return NextResponse.json({
        'message': 'Error not authenticated'
      }, {
        status: 403
      });
    }

    const data = await Link.find({
      creator_id: session?.user._id,
    });

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

  const session = await getServerSession(options);

  if(!session) {
    return NextResponse.json({
      'message': 'You must be logged in'
    }, {
      status: 403
    });
  }

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
    creator_id: session.user._id,
  });

  await newLink.save();

  return NextResponse.json({
    ...newLink
  }, { status: 201 })
}
