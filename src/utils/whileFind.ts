interface IParams<T> {
  delay?: number;
  timeout?: number;
  find: () => T;
  sleepFn: (ms: number) => Promise<void>;
}

export function whileFind<T>(value: IParams<T>) {
  return new Promise<Exclude<T, undefined | null | false>>(async (rs, rj) => {
    const { sleepFn, delay = 100, timeout = 10000, find } = value;

    let allowRun = true;

    const sto = setTimeout(() => {
      allowRun = false;
      rj(undefined);
    }, timeout);

    while (allowRun) {
      const someThing = find();
      if (someThing === undefined || someThing === null || someThing === false) {
        await sleepFn(delay);
        continue;
      }

      clearTimeout(sto);
      return rs(someThing as Exclude<T, undefined | null | false>);
    }

    rj(undefined);
  });
}
