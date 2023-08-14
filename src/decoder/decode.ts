export type DecodeResponseType = [boolean, boolean, boolean, boolean, boolean, boolean];

const query = (number: number, index: number): boolean => (number & (1 << (index - 1))) > 0;

export const decode = (number: number): DecodeResponseType => {
  const decoded: DecodeResponseType = new Array(6) as DecodeResponseType;

  for (let i = 0; i < 6; i++) {
    // The bit mask is applied in reverse order, so we must check it from the back
    decoded[i] = query(number, 6 - i);
  }

  return decoded;
};
