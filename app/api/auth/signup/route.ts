import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { hash } from "bcrypt";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();

    const {name, email, password } = await request.json();

    if(password.length < 6) {
      return NextResponse.json({
        message: 'Password must be at least 6 characters',
      }, {
          status: 400
      });
    }

    const userFound = await User.findOne({
      email: email
    });

    if(userFound) {
      return NextResponse.json({
        message: 'User already exists.'
      }, {
          status: 409
      });
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      name,
    });

    const savedUser = user.save();

    return NextResponse.json({
      name: savedUser.name,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    }, {
        status: 201
    });

  } catch(error) {
    if(error instanceof mongoose.Error.ValidatorError) {
      return NextResponse.json({
        message: error.message
      }, {
          status: 400
        }
      );
    } else {
      console.error(error);
      return NextResponse.error();
    }
  }
}
