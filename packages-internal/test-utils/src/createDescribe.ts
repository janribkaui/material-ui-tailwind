/* eslint-env mocha */

type JrDescribe<P extends any[]> = {
  (...args: P): void;

  skip: (...args: P) => void;
  only: (...args: P) => void;
};
export default <P extends any[]>(
  message: string,
  callback: (...args: P) => void,
): JrDescribe<P> => {
  const jrDescribe = (...args: P) => {
    describe(message, () => {
      callback(...args);
    });
  };

  jrDescribe.skip = (...args: P) => {
    describe.skip(message, () => {
      callback(...args);
    });
  };
  jrDescribe.only = (...args: P) => {
    describe.only(message, () => {
      callback(...args);
    });
  };

  return jrDescribe;
};
