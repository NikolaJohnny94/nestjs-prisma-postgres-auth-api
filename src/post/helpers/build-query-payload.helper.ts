import { GetQueryPostParamsDto } from '../dto/params/get-query-post-params.dto';

export function buildQueryPayload(
  params: GetQueryPostParamsDto,
  includeWhereClause: boolean = true,
  whereClause?: any,
) {
  const { skip, take, cursor, orderBy, where } = params;
  const queryPayload = {
    skip: skip ? Number(skip) : undefined,
    take: take ? Number(take) : undefined,
    cursor: cursor ? { id: Number(cursor) } : undefined,
    orderBy: orderBy ? JSON.parse(orderBy) : undefined,
    ...(includeWhereClause && {
      where: {
        ...JSON.parse(where || '{}'),
        ...whereClause,
      },
    }),
  };
  return queryPayload;
}
