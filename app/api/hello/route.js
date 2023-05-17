import {sequelize, Account} from '@/ServerComponents/models/index'
import { NextResponse } from 'next/server';

export async function GET(request) {
  const hello = await Account.findOne({where: {id: 4}})
  NextResponse.json(hello);
}