import { TypeParseError } from "../errors";
import { InferType, Type } from "../types";

export function promiseType<TType extends Type<unknown>>(
  type: TType,
): Type<Promise<InferType<TType>>> {
  return {
    parse(input: unknown): Promise<InferType<TType>> {
      if (input instanceof Promise) {
        return new Promise<InferType<TType>>((resolve, reject) => {
          input
            .then((value) => {
              resolve(type.parse(value) as InferType<TType>);
            })
            .catch(reject);
        });
      }

      return Promise.reject(new TypeParseError("Promise", input));
    },
  };
}
