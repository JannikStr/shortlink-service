import { connectDB } from "@/lib/mongodb";
import Link from "@/models/Link";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import { NextApiRequest } from "next";

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

export async function PUT(request: NextRequest, { params }: { params: { tag: string }}) {
  const tag = params.tag[0];

  try {
    await connectDB();

    const session = await getServerSession(options);

    if(!session) {
      return NextResponse.json({
        'message': 'Not authenticated',
      }, {
        status: 403
      });
    }

    const foundLink = await Link.findOne({
      tag,
      creator_id: session.user._id,
    });

    if(!foundLink) {
      return NextResponse.json({
        'message': `Link with the specified tag (${tag}) does not exist.`
      });
    }

    const body = await request.json();

    await Link.findOneAndUpdate({
      tag,
      creator_id: session.user._id,
    }, {
      ...body
    });

    console.log('Finished successfully')
    return NextResponse.json({
      'message': `Successfully updated shortlink with tag "${tag}"`
    }, {
      status: 200,
    });

  } catch (error) {
    return NextResponse.json({
      message: 'Failed to update short link',
    }, {
      status: 500
    });

  }
}

export async function DELETE(request: NextRequest, { params }: { params: { tag: string }}) {
  const tag = params.tag;

  try {
    await connectDB();

    const session = await getServerSession(options);

    if(!session) {
      return NextResponse.json({
        'message': 'Not authenticated',
      }, {
        status: 403,
      });
    }

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
      creator_id: session.user._id,
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
