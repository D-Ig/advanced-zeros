module.exports = function getZerosCount(number, base) {
  const primeFactors = getPrimeFactors(base);
  const getQuantityofSameFactors = factor => primeFactors.reduce((acc, value) => (value === factor ? acc + 1 : acc), 0);
  const powers = primeFactors.map((factor) => {
    const iter = (divider, acc) => {
      if (divider > number) {
        return acc;
      };
      const updatedAcc = acc + Math.floor(number / divider);
      return iter(divider * factor, updatedAcc);
    };
    const power = iter(factor, 0);
    return Math.floor(power / getQuantityofSameFactors(factor));
  });
  return Math.min(...powers);
};

const isPrime = (num) => {
  const iter = (divider) => {
    if (divider === num) {
      return true;
    } if (num % divider === 0) {
      return false;
    } return iter(divider + 1);
  };
  return num === 1 ? false : iter(2);
};

const getNextPrimeDivider = num => (isPrime(num) ? num : getNextPrimeDivider(num + 1));

const getPrimeFactors = (num, divider = 2, primes = []) => {
  if (num === divider) {
    return [...primes, divider];
  };
  if (num % divider === 0) {
    return getPrimeFactors(num / divider, divider, [ ...primes, divider]);
  };
  const nextPrimeDivider = getNextPrimeDivider(divider + 1);
  return getPrimeFactors(num, nextPrimeDivider, primes);
};
