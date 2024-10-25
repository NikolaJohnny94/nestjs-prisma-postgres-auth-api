import { Prisma } from '@prisma/client';

type ErrorMeta = {
  modelName?: string;
  target?: string[];
};

export function handlePrismaError(
  error: Prisma.PrismaClientKnownRequestError,
): { status: number; message: string } {
  let status = 500;
  let message = 'An unexpected error occurred. Please try again later.';
  let modelName: string;
  let target: string;

  let errorMeta: ErrorMeta = { ...error.meta };

  if (errorMeta) {
    if (errorMeta.modelName) modelName = errorMeta.modelName;
    if (errorMeta.target && errorMeta.target.length > 0) {
      target = errorMeta.target[0];
    }
  }

  switch (error.code) {
    case 'P1000':
      status = 401;
      message = 'Authentication failed against the database server.';
      break;
    case 'P1001':
      status = 503;
      message = 'Cannot reach the database server.';
      break;
    case 'P1002':
      status = 504;
      message = 'The database server was reached but timed out.';
      break;
    case 'P1003':
      status = 500;
      message = 'The database server returned an error.';
      break;
    case 'P1008':
      status = 504;
      message = 'Operations timed out.';
      break;
    case 'P1017':
      status = 500;
      message = 'Server has closed the connection.';
      break;
    case 'P2000':
      status = 400;
      message = 'The provided value for the column is too long.';
      break;
    case 'P2001':
      status = 404;
      message =
        'The record searched for in the where condition does not exist.';
      break;
    case 'P2002':
      status = 409;
      message = `A ${modelName.toLowerCase()} with the same ${target} already exists. Please try again with a different ${target}!.`;
      break;
    case 'P2003':
      status = 409;
      message = 'Foreign key constraint failed.';
      break;
    case 'P2004':
      status = 409;
      message = 'A constraint failed on the database.';
      break;
    case 'P2005':
      status = 400;
      message = 'The value stored in the database for the field is invalid.';
      break;
    case 'P2006':
      status = 400;
      message = 'The provided value for the field is invalid.';
      break;
    case 'P2007':
      status = 400;
      message = 'Data validation error.';
      break;
    case 'P2008':
      status = 400;
      message = 'Failed to parse the query.';
      break;
    case 'P2009':
      status = 400;
      message = 'Failed to validate the query.';
      break;
    case 'P2010':
      status = 500;
      message = 'Raw query failed.';
      break;
    case 'P2011':
      status = 400;
      message = 'Null constraint violation.';
      break;
    case 'P2012':
      status = 400;
      message = 'Missing a required value.';
      break;
    case 'P2013':
      status = 400;
      message = 'Missing the required argument.';
      break;
    case 'P2014':
      status = 409;
      message =
        'The change you are trying to make would violate the required relation between the models.';
      break;
    case 'P2015':
      status = 404;
      message = 'A related record could not be found.';
      break;
    case 'P2016':
      status = 400;
      message = 'Query interpretation error.';
      break;
    case 'P2017':
      status = 409;
      message = 'The records for the relation are not connected.';
      break;
    case 'P2018':
      status = 404;
      message = 'The required connected records were not found.';
      break;
    case 'P2019':
      status = 400;
      message = 'Input error.';
      break;
    case 'P2020':
      status = 400;
      message = 'Value out of range for the type.';
      break;
    case 'P2021':
      status = 404;
      message = 'The table does not exist in the current database.';
      break;
    case 'P2022':
      status = 404;
      message = 'The column does not exist in the current database.';
      break;
    case 'P2023':
      status = 400;
      message = 'Inconsistent column data.';
      break;
    case 'P2024':
      status = 500;
      message =
        'Timed out fetching a new connection from the connection pool. (More info: http://pris.ly/d/connection-pool (Current connection pool timeout: {timeout}, connection limit: {connection_limit}))';
      break;
    case 'P2025':
      status = 404;
      message = `${modelName} not found`;
      break;
    case 'P2026':
      status = 400;
      message =
        "The current database provider doesn't support a feature that the query used: {feature}";
      break;
    case 'P2027':
      status = 500;
      message =
        'Multiple errors occurred on the database during query execution: {errors}';
      break;
    case 'P2028':
      status = 500;
      message = 'Transaction API error: {error}';
      break;
    case 'P2029':
      status = 400;
      message = 'Query parameter limit exceeded error: {message}';
      break;
    case 'P2030':
      status = 400;
      message =
        'Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema';
      break;
    case 'P2031':
      status = 500;
      message =
        'Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set. See details: https://pris.ly/d/mongodb-replica-set';
      break;
    case 'P2033':
      status = 400;
      message =
        "A number used in the query does not fit into a 64 bit signed integer. Consider using BigInt as field type if you're trying to store large integers";
      break;
    case 'P2034':
      status = 500;
      message =
        'Transaction failed due to a write conflict or a deadlock. Please retry your transaction';
      break;
    case 'P2035':
      status = 500;
      message = 'Assertion violation on the database: {database_error}';
      break;
    case 'P2036':
      status = 500;
      message = 'Error in external connector (id {id})';
      break;
    case 'P2037':
      status = 500;
      message = 'Too many database connections opened: {message}';
      break;
    default:
      status = 500;
      message = 'An unexpected error occurred. Please try again later.';
      break;
  }

  return { status, message };
}
