/**
 * Tiny TypeScript tokenizer – just enough to colour the hanna.ts snippet.
 */
export type TokenType = 'keyword' | 'property' | 'string' | 'number' | 'punct' | 'comment' | 'ident' | 'space';

export interface Token {
  type: TokenType;
  text: string;
}

const RULES: [TokenType, RegExp][] = [
  ['comment', /\/\/[^\n]*/y],
  ['string', /"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'/y],
  ['number', /\d+(?:\.\d+)?/y],
  ['keyword', /\b(?:const|let|export|default|as|import|from|type|interface|true|false|null)\b/y],
  ['property', /[A-Za-z_$][\w$]*(?=\s*:)/y],
  ['ident', /[A-Za-z_$][\w$]*/y],
  ['space', /\s+/y],
  ['punct', /[{}[\]();,.:=<>]/y],
];

export function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let pos = 0;
  outer: while (pos < source.length) {
    for (const [type, re] of RULES) {
      re.lastIndex = pos;
      const match = re.exec(source);
      if (match && match[0].length > 0) {
        tokens.push({ type, text: match[0] });
        pos += match[0].length;
        continue outer;
      }
    }
    tokens.push({ type: 'punct', text: source[pos] });
    pos += 1;
  }
  return tokens;
}

/** Returns the first `count` characters of a token list, keeping types. */
export function sliceTokens(tokens: Token[], count: number): Token[] {
  const out: Token[] = [];
  let left = count;
  for (const token of tokens) {
    if (left <= 0) break;
    if (token.text.length <= left) {
      out.push(token);
      left -= token.text.length;
    } else {
      out.push({ type: token.type, text: token.text.slice(0, left) });
      left = 0;
    }
  }
  return out;
}
