import { connectDB } from "@/lib/mongodb";
import Link from "@/models/Link";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { tag: string } }) {
  const tag = params.tag;
  try {
    await connectDB();

    const foundLink = await Link.findOne({
      tag: tag,
    });

    if(!foundLink) {
      return NextResponse.redirect('/');
    }

    return NextResponse.json({
      url: foundLink.url
    }, { status: 200 });
  } catch(error) {
    console.error(error);
    return NextResponse.json({
      message: 'Server error',
    }, {
      status: 500
    });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { tag; string }}) {
  const tag = params.tag;
  
  try {
    await connectDB();

    const foundLink = await Link.findOne({
      tag: tag
    });

    if(!foundLink) {
      return NextResponse.json({
        message: 'Could not find short link',
      }, {
        status: 404
      });
    }

    await Link.findOneAndDelete({
      _id: foundLink._id,
    });

    return NextResponse.json({
      message: 'Successfully deleted short link',
    }, {
      status: 200
    });
  } catch(error) {
    return NextResponse.json({
      message: 'Failed to delete short link',
    }, {
      status: 500
    });
  }
}
