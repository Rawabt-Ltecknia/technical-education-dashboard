import { Either } from "purify-ts/Either";
import IFailure from "./IFailure";

export interface UseCase<C, T> {
  execute(command: C): Promise<Either<IFailure, T>>;
}
export interface UseCaseWithoutParams<T> {
  execute(): Promise<Either<IFailure, T>>;
}

