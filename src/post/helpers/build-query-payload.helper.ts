//Prisma
import { Prisma } from '@prisma/client';
//Types
import { PostParams } from '../types';

export function buildQueryPayload(
  params: PostParams,
  additionalWhereClause?: Prisma.PostWhereInput,
) {
  const { skip, take, cursor, orderBy, where } = params;
  const queryPayload = {
    skip: skip ? Number(skip) : undefined,
    take: take ? Number(take) : undefined,
    cursor: cursor ? { id: Number(cursor) } : undefined,
    orderBy: orderBy ? JSON.parse(orderBy) : undefined,
    where: {
      ...JSON.parse(where || '{}'),
      ...additionalWhereClause,
    },
  };
  return queryPayload;
}
