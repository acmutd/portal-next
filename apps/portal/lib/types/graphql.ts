import type { OperationContext, OperationResult } from 'urql';

export type MutationFunctionType<ArgsType, ResultType> = (
  variables?: ArgsType,
  context?: Partial<OperationContext>,
) => Promise<OperationResult<ResultType, ArgsType>>;
