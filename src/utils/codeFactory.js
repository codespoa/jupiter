const shuffled = require('./shuffle');

const randomCharacter = (possibilities) => {
  return possibilities.charAt(Math.floor(Math.random() * possibilities.length));
};

const alphanumeric = (lengthLetters = 0, lengthNumbers = 0) => {
  const numbers = '0123456789';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let code = '';

  for (let i = 0; i < lengthLetters; i += 1) {
    code += randomCharacter(letters, 26);
  }

  for (let i = 0; i < lengthNumbers; i += 1) {
    code += randomCharacter(numbers, 10);
  }

  return code;
};

const numeric = (start = -1, end = 0) => {
  const codes = [];

  for (let i = start; i < end; i += 1) {
    codes.push(i);
  }

  return codes;
};

const generateUniqueCode = (allCodesUsed) => {
  return new Promise((resolve) => {
    const bool = true;

    let newCode = '';

    do {
      const code = alphanumeric(2, 1);

      if (!allCodesUsed.includes(code)) {
        newCode = code;
        break;
      }
    } while (bool);

    resolve(newCode);
  });
};

// Completa com zeros a esquerda com um máximo de 10000 números começando por 0
const completeWithZeros = (numbers = []) => {
  const codes = numbers.map((number) => {
    switch (true) {
      case number < 10:
        return `000${number}`;

      case number < 100:
        return `00${number}`;

      case number < 1000:
        return `0${number}`;

      default:
        return number.toString();
    }
  });

  return codes;
};

const betCodes = (max) => {
  // Gerando os códigos de apostas e embaralhando
  const numbers = numeric(0, max);
  const codes = completeWithZeros(numbers);

  const codesShuffled = shuffled(codes);

  return codesShuffled;
};

module.exports = {
  alphanumeric,
  numeric,
  generateUniqueCode,
  betCodes,
};
