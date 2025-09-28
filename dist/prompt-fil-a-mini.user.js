// ==UserScript==
// @name         Prompt Fil A
// @namespace    https://github.com/scaryrawr/userscripts
// @version      0.0.1
// @description  Polyfill for Prompt API using external AI service
// @author       Mike Wallio
// @match        https://*/*
// @grant        none
// ==/UserScript==
var _9 = Object.defineProperty;
var v4 = ($, U) => {
  for (var v in U) _9($, v, { get: U[v], enumerable: !0, configurable: !0, set: (X) => (U[v] = () => X) });
};
var dQ = "vercel.ai.error",
  M9 = Symbol.for(dQ),
  pQ,
  P9 = class $ extends Error {
    constructor({ name: U, message: v, cause: X }) {
      super(v);
      ((this[pQ] = !0), (this.name = U), (this.cause = X));
    }
    static isInstance(U) {
      return $.hasMarker(U, dQ);
    }
    static hasMarker(U, v) {
      let X = Symbol.for(v);
      return U != null && typeof U === "object" && X in U && typeof U[X] === "boolean" && U[X] === !0;
    }
  };
pQ = M9;
var C = P9,
  rQ = "AI_APICallError",
  oQ = `vercel.ai.error.${rQ}`,
  S9 = Symbol.for(oQ),
  tQ,
  O$ = class extends C {
    constructor({
      message: $,
      url: U,
      requestBodyValues: v,
      statusCode: X,
      responseHeaders: z,
      responseBody: J,
      cause: j,
      isRetryable: Q = X != null && (X === 408 || X === 409 || X === 429 || X >= 500),
      data: W,
    }) {
      super({ name: rQ, message: $, cause: j });
      ((this[tQ] = !0),
        (this.url = U),
        (this.requestBodyValues = v),
        (this.statusCode = X),
        (this.responseHeaders = z),
        (this.responseBody = J),
        (this.isRetryable = Q),
        (this.data = W));
    }
    static isInstance($) {
      return C.hasMarker($, oQ);
    }
  };
tQ = S9;
var aQ = "AI_EmptyResponseBodyError",
  sQ = `vercel.ai.error.${aQ}`,
  R9 = Symbol.for(sQ),
  eQ,
  $Y = class extends C {
    constructor({ message: $ = "Empty response body" } = {}) {
      super({ name: aQ, message: $ });
      this[eQ] = !0;
    }
    static isInstance($) {
      return C.hasMarker($, sQ);
    }
  };
eQ = R9;
function B6($) {
  if ($ == null) return "unknown error";
  if (typeof $ === "string") return $;
  if ($ instanceof Error) return $.message;
  return JSON.stringify($);
}
var UY = "AI_InvalidArgumentError",
  zY = `vercel.ai.error.${UY}`,
  k9 = Symbol.for(zY),
  vY,
  FU = class extends C {
    constructor({ message: $, cause: U, argument: v }) {
      super({ name: UY, message: $, cause: U });
      ((this[vY] = !0), (this.argument = v));
    }
    static isInstance($) {
      return C.hasMarker($, zY);
    }
  };
vY = k9;
var XY = "AI_InvalidPromptError",
  JY = `vercel.ai.error.${XY}`,
  Z9 = Symbol.for(JY),
  jY,
  _6 = class extends C {
    constructor({ prompt: $, message: U, cause: v }) {
      super({ name: XY, message: `Invalid prompt: ${U}`, cause: v });
      ((this[jY] = !0), (this.prompt = $));
    }
    static isInstance($) {
      return C.hasMarker($, JY);
    }
  };
jY = Z9;
var QY = "AI_InvalidResponseDataError",
  YY = `vercel.ai.error.${QY}`,
  T9 = Symbol.for(YY),
  WY,
  Yv = class extends C {
    constructor({ data: $, message: U = `Invalid response data: ${JSON.stringify($)}.` }) {
      super({ name: QY, message: U });
      ((this[WY] = !0), (this.data = $));
    }
    static isInstance($) {
      return C.hasMarker($, YY);
    }
  };
WY = T9;
var wY = "AI_JSONParseError",
  GY = `vercel.ai.error.${wY}`,
  C9 = Symbol.for(GY),
  NY,
  X4 = class extends C {
    constructor({ text: $, cause: U }) {
      super({
        name: wY,
        message: `JSON parsing failed: Text: ${$}.
Error message: ${B6(U)}`,
        cause: U,
      });
      ((this[NY] = !0), (this.text = $));
    }
    static isInstance($) {
      return C.hasMarker($, GY);
    }
  };
NY = C9;
var x9 = "AI_LoadAPIKeyError",
  g9 = `vercel.ai.error.${x9}`,
  f9 = Symbol.for(g9),
  h9;
h9 = f9;
var y9 = "AI_LoadSettingError",
  m9 = `vercel.ai.error.${y9}`,
  u9 = Symbol.for(m9),
  c9;
c9 = u9;
var i9 = "AI_NoContentGeneratedError",
  n9 = `vercel.ai.error.${i9}`,
  l9 = Symbol.for(n9),
  d9;
d9 = l9;
var qY = "AI_NoSuchModelError",
  OY = `vercel.ai.error.${qY}`,
  p9 = Symbol.for(OY),
  HY,
  BY = class extends C {
    constructor({ errorName: $ = qY, modelId: U, modelType: v, message: X = `No such ${v}: ${U}` }) {
      super({ name: $, message: X });
      ((this[HY] = !0), (this.modelId = U), (this.modelType = v));
    }
    static isInstance($) {
      return C.hasMarker($, OY);
    }
  };
HY = p9;
var DY = "AI_TooManyEmbeddingValuesForCallError",
  KY = `vercel.ai.error.${DY}`,
  r9 = Symbol.for(KY),
  bY,
  LY = class extends C {
    constructor($) {
      super({
        name: DY,
        message: `Too many values for a single embedding call. The ${$.provider} model "${$.modelId}" can only embed up to ${$.maxEmbeddingsPerCall} values per call, but ${$.values.length} values were provided.`,
      });
      ((this[bY] = !0),
        (this.provider = $.provider),
        (this.modelId = $.modelId),
        (this.maxEmbeddingsPerCall = $.maxEmbeddingsPerCall),
        (this.values = $.values));
    }
    static isInstance($) {
      return C.hasMarker($, KY);
    }
  };
bY = r9;
var IY = "AI_TypeValidationError",
  VY = `vercel.ai.error.${IY}`,
  o9 = Symbol.for(VY),
  AY,
  t9 = class $ extends C {
    constructor({ value: U, cause: v }) {
      super({
        name: IY,
        message: `Type validation failed: Value: ${JSON.stringify(U)}.
Error message: ${B6(v)}`,
        cause: v,
      });
      ((this[AY] = !0), (this.value = U));
    }
    static isInstance(U) {
      return C.hasMarker(U, VY);
    }
    static wrap({ value: U, cause: v }) {
      return $.isInstance(v) && v.value === U ? v : new $({ value: U, cause: v });
    }
  };
AY = o9;
var _$ = t9,
  FY = "AI_UnsupportedFunctionalityError",
  EY = `vercel.ai.error.${FY}`,
  a9 = Symbol.for(EY),
  _Y,
  j6 = class extends C {
    constructor({ functionality: $, message: U = `'${$}' functionality not supported.` }) {
      super({ name: FY, message: U });
      ((this[_Y] = !0), (this.functionality = $));
    }
    static isInstance($) {
      return C.hasMarker($, EY);
    }
  };
_Y = a9;
function AU($) {
  if ($ === null || typeof $ === "string" || typeof $ === "number" || typeof $ === "boolean") return !0;
  if (Array.isArray($)) return $.every(AU);
  if (typeof $ === "object") return Object.entries($).every(([U, v]) => typeof U === "string" && AU(v));
  return !1;
}
function Wv($) {
  return Array.isArray($) && $.every(AU);
}
function U1($) {
  return $ != null && typeof $ === "object" && Object.entries($).every(([U, v]) => typeof U === "string" && AU(v));
}
class Gv extends Error {
  constructor($, U) {
    (super($),
      (this.name = "ParseError"),
      (this.type = U.type),
      (this.field = U.field),
      (this.value = U.value),
      (this.line = U.line));
  }
}
function wv($) {}
function MY($) {
  if (typeof $ == "function")
    throw TypeError("`callbacks` must be an object, got a function instead. Did you mean `{onEvent: fn}`?");
  let { onEvent: U = wv, onError: v = wv, onRetry: X = wv, onComment: z } = $,
    J = "",
    j = !0,
    Q,
    W = "",
    w = "";
  function N(B) {
    let I = j ? B.replace(/^\xEF\xBB\xBF/, "") : B,
      [L, S] = s9(`${J}${I}`);
    for (let T of L) D(T);
    ((J = S), (j = !1));
  }
  function D(B) {
    if (B === "") {
      G();
      return;
    }
    if (B.startsWith(":")) {
      z && z(B.slice(B.startsWith(": ") ? 2 : 1));
      return;
    }
    let I = B.indexOf(":");
    if (I !== -1) {
      let L = B.slice(0, I),
        S = B[I + 1] === " " ? 2 : 1,
        T = B.slice(I + S);
      H(L, T, B);
      return;
    }
    H(B, "", B);
  }
  function H(B, I, L) {
    switch (B) {
      case "event":
        w = I;
        break;
      case "data":
        W = `${W}${I}
`;
        break;
      case "id":
        Q = I.includes("\x00") ? void 0 : I;
        break;
      case "retry":
        /^\d+$/.test(I)
          ? X(parseInt(I, 10))
          : v(new Gv(`Invalid \`retry\` value: "${I}"`, { type: "invalid-retry", value: I, line: L }));
        break;
      default:
        v(
          new Gv(`Unknown field "${B.length > 20 ? `${B.slice(0, 20)}…` : B}"`, {
            type: "unknown-field",
            field: B,
            value: I,
            line: L,
          }),
        );
        break;
    }
  }
  function G() {
    (W.length > 0 &&
      U({
        id: Q,
        event: w || void 0,
        data: W.endsWith(`
`)
          ? W.slice(0, -1)
          : W,
      }),
      (Q = void 0),
      (W = ""),
      (w = ""));
  }
  function q(B = {}) {
    (J && B.consume && D(J), (j = !0), (Q = void 0), (W = ""), (w = ""), (J = ""));
  }
  return { feed: N, reset: q };
}
function s9($) {
  let U = [],
    v = "",
    X = 0;
  for (; X < $.length; ) {
    let z = $.indexOf("\r", X),
      J = $.indexOf(
        `
`,
        X,
      ),
      j = -1;
    if (
      (z !== -1 && J !== -1
        ? (j = Math.min(z, J))
        : z !== -1
          ? z === $.length - 1
            ? (j = -1)
            : (j = z)
          : J !== -1 && (j = J),
      j === -1)
    ) {
      v = $.slice(X);
      break;
    } else {
      let Q = $.slice(X, j);
      (U.push(Q),
        (X = j + 1),
        $[X - 1] === "\r" &&
          $[X] ===
            `
` &&
          X++);
    }
  }
  return [U, v];
}
class Nv extends TransformStream {
  constructor({ onError: $, onRetry: U, onComment: v } = {}) {
    let X;
    super({
      start(z) {
        X = MY({
          onEvent: (J) => {
            z.enqueue(J);
          },
          onError(J) {
            $ === "terminate" ? z.error(J) : typeof $ == "function" && $(J);
          },
          onRetry: U,
          onComment: v,
        });
      },
      transform(z) {
        X.feed(z);
      },
    });
  }
}
var Y = {};
v4(Y, {
  xid: () => y5,
  void: () => Wq,
  uuidv7: () => k5,
  uuidv6: () => R5,
  uuidv4: () => S5,
  uuid: () => P5,
  util: () => _,
  url: () => Z5,
  uppercase: () => P1,
  unknown: () => Z4,
  union: () => nj,
  undefined: () => Qq,
  ulid: () => h5,
  uint64: () => Jq,
  uint32: () => zq,
  tuple: () => AW,
  trim: () => C1,
  treeifyError: () => Av,
  transform: () => pj,
  toUpperCase: () => g1,
  toLowerCase: () => x1,
  toJSONSchema: () => f1,
  templateLiteral: () => _q,
  symbol: () => jq,
  superRefine: () => rW,
  success: () => Aq,
  stringbool: () => Zq,
  stringFormat: () => o5,
  string: () => Vj,
  strictObject: () => qq,
  startsWith: () => R1,
  size: () => E1,
  setErrorMap: () => gq,
  set: () => Kq,
  safeParseAsync: () => h1,
  safeParse: () => qj,
  safeEncodeAsync: () => Lj,
  safeEncode: () => Kj,
  safeDecodeAsync: () => Ij,
  safeDecode: () => bj,
  registry: () => tU,
  regexes: () => $6,
  regex: () => _1,
  refine: () => pW,
  record: () => FW,
  readonly: () => uW,
  property: () => $j,
  promise: () => Mq,
  prettifyError: () => Fv,
  preprocess: () => Cq,
  prefault: () => CW,
  positive: () => tJ,
  pipe: () => _z,
  partialRecord: () => Bq,
  parseAsync: () => Nj,
  parse: () => Gj,
  overwrite: () => S6,
  optional: () => Fz,
  object: () => Nq,
  number: () => YW,
  nullish: () => Vq,
  nullable: () => Ez,
  null: () => qW,
  normalize: () => T1,
  nonpositive: () => sJ,
  nonoptional: () => xW,
  nonnegative: () => eJ,
  never: () => cj,
  negative: () => aJ,
  nativeEnum: () => bq,
  nanoid: () => x5,
  nan: () => Fq,
  multipleOf: () => W4,
  minSize: () => w4,
  minLength: () => r6,
  mime: () => Z1,
  maxSize: () => P4,
  maxLength: () => S4,
  map: () => Dq,
  lte: () => U6,
  lt: () => M6,
  lowercase: () => M1,
  looseObject: () => Oq,
  locales: () => I1,
  literal: () => Lq,
  length: () => R4,
  lazy: () => nW,
  ksuid: () => m5,
  keyof: () => Gq,
  jwt: () => r5,
  json: () => Tq,
  iso: () => Vz,
  ipv6: () => c5,
  ipv4: () => u5,
  intersection: () => IW,
  int64: () => Xq,
  int32: () => Uq,
  int: () => Aj,
  instanceof: () => kq,
  includes: () => S1,
  httpUrl: () => T5,
  hostname: () => t5,
  hex: () => a5,
  hash: () => s5,
  guid: () => M5,
  gte: () => i$,
  gt: () => P6,
  globalRegistry: () => b6,
  getErrorMap: () => fq,
  function: () => Pq,
  formatError: () => G1,
  float64: () => $q,
  float32: () => e5,
  flattenError: () => w1,
  file: () => Iq,
  enum: () => dj,
  endsWith: () => k1,
  encodeAsync: () => Bj,
  encode: () => Oj,
  emoji: () => C5,
  email: () => _5,
  e164: () => p5,
  discriminatedUnion: () => Hq,
  decodeAsync: () => Dj,
  decode: () => Hj,
  date: () => wq,
  custom: () => Rq,
  cuid2: () => f5,
  cuid: () => g5,
  core: () => R6,
  config: () => D$,
  coerce: () => ej,
  codec: () => Eq,
  clone: () => k$,
  cidrv6: () => n5,
  cidrv4: () => i5,
  check: () => Sq,
  catch: () => hW,
  boolean: () => WW,
  bigint: () => vq,
  base64url: () => d5,
  base64: () => l5,
  array: () => Sz,
  any: () => Yq,
  _function: () => Pq,
  _default: () => ZW,
  _ZodString: () => Fj,
  ZodXID: () => kj,
  ZodVoid: () => DW,
  ZodUnknown: () => HW,
  ZodUnion: () => ij,
  ZodUndefined: () => GW,
  ZodUUID: () => k6,
  ZodURL: () => Mz,
  ZodULID: () => Rj,
  ZodType: () => i,
  ZodTuple: () => VW,
  ZodTransform: () => SW,
  ZodTemplateLiteral: () => cW,
  ZodSymbol: () => wW,
  ZodSuccess: () => gW,
  ZodStringFormat: () => Q$,
  ZodString: () => m1,
  ZodSet: () => _W,
  ZodRecord: () => lj,
  ZodRealError: () => n$,
  ZodReadonly: () => mW,
  ZodPromise: () => lW,
  ZodPrefault: () => TW,
  ZodPipe: () => tj,
  ZodOptional: () => rj,
  ZodObject: () => Rz,
  ZodNumberFormat: () => T4,
  ZodNumber: () => c1,
  ZodNullable: () => RW,
  ZodNull: () => NW,
  ZodNonOptional: () => oj,
  ZodNever: () => BW,
  ZodNanoID: () => Mj,
  ZodNaN: () => yW,
  ZodMap: () => EW,
  ZodLiteral: () => MW,
  ZodLazy: () => iW,
  ZodKSUID: () => Zj,
  ZodJWT: () => mj,
  ZodIssueCode: () => xq,
  ZodIntersection: () => LW,
  ZodISOTime: () => Lz,
  ZodISODuration: () => Iz,
  ZodISODateTime: () => Kz,
  ZodISODate: () => bz,
  ZodIPv6: () => Cj,
  ZodIPv4: () => Tj,
  ZodGUID: () => Az,
  ZodFunction: () => dW,
  ZodFirstPartyTypeKind: () => sj,
  ZodFile: () => PW,
  ZodError: () => F5,
  ZodEnum: () => y1,
  ZodEmoji: () => _j,
  ZodEmail: () => Ej,
  ZodE164: () => yj,
  ZodDiscriminatedUnion: () => bW,
  ZodDefault: () => kW,
  ZodDate: () => Pz,
  ZodCustomStringFormat: () => u1,
  ZodCustom: () => kz,
  ZodCodec: () => aj,
  ZodCatch: () => fW,
  ZodCUID2: () => Sj,
  ZodCUID: () => Pj,
  ZodCIDRv6: () => gj,
  ZodCIDRv4: () => xj,
  ZodBoolean: () => i1,
  ZodBigIntFormat: () => uj,
  ZodBigInt: () => n1,
  ZodBase64URL: () => hj,
  ZodBase64: () => fj,
  ZodArray: () => KW,
  ZodAny: () => OW,
  TimePrecision: () => VJ,
  NEVER: () => qv,
  $output: () => KJ,
  $input: () => bJ,
  $brand: () => Ov,
});
var R6 = {};
v4(R6, {
  version: () => L0,
  util: () => _,
  treeifyError: () => Av,
  toJSONSchema: () => f1,
  toDotPath: () => TY,
  safeParseAsync: () => _v,
  safeParse: () => Ev,
  safeEncodeAsync: () => k7,
  safeEncode: () => S7,
  safeDecodeAsync: () => Z7,
  safeDecode: () => R7,
  registry: () => tU,
  regexes: () => $6,
  prettifyError: () => Fv,
  parseAsync: () => PU,
  parse: () => MU,
  locales: () => I1,
  isValidJWT: () => aY,
  isValidBase64URL: () => tY,
  isValidBase64: () => u0,
  globalRegistry: () => b6,
  globalConfig: () => z1,
  formatError: () => G1,
  flattenError: () => w1,
  encodeAsync: () => M7,
  encode: () => E7,
  decodeAsync: () => P7,
  decode: () => _7,
  config: () => D$,
  clone: () => k$,
  _xid: () => Qz,
  _void: () => dJ,
  _uuidv7: () => Uz,
  _uuidv6: () => $z,
  _uuidv4: () => eU,
  _uuid: () => sU,
  _url: () => F1,
  _uppercase: () => P1,
  _unknown: () => nJ,
  _union: () => U5,
  _undefined: () => uJ,
  _ulid: () => jz,
  _uint64: () => yJ,
  _uint32: () => TJ,
  _tuple: () => X5,
  _trim: () => C1,
  _transform: () => G5,
  _toUpperCase: () => g1,
  _toLowerCase: () => x1,
  _templateLiteral: () => L5,
  _symbol: () => mJ,
  _superRefine: () => Jj,
  _success: () => B5,
  _stringbool: () => jj,
  _stringFormat: () => k4,
  _string: () => LJ,
  _startsWith: () => R1,
  _size: () => E1,
  _set: () => Q5,
  _safeParseAsync: () => _4,
  _safeParse: () => E4,
  _safeEncodeAsync: () => xU,
  _safeEncode: () => TU,
  _safeDecodeAsync: () => gU,
  _safeDecode: () => CU,
  _regex: () => _1,
  _refine: () => Xj,
  _record: () => J5,
  _readonly: () => b5,
  _property: () => $j,
  _promise: () => V5,
  _positive: () => tJ,
  _pipe: () => K5,
  _parseAsync: () => F4,
  _parse: () => A4,
  _overwrite: () => S6,
  _optional: () => N5,
  _number: () => MJ,
  _nullable: () => q5,
  _null: () => cJ,
  _normalize: () => T1,
  _nonpositive: () => sJ,
  _nonoptional: () => H5,
  _nonnegative: () => eJ,
  _never: () => lJ,
  _negative: () => aJ,
  _nativeEnum: () => W5,
  _nanoid: () => vz,
  _nan: () => oJ,
  _multipleOf: () => W4,
  _minSize: () => w4,
  _minLength: () => r6,
  _min: () => i$,
  _mime: () => Z1,
  _maxSize: () => P4,
  _maxLength: () => S4,
  _max: () => U6,
  _map: () => j5,
  _lte: () => U6,
  _lt: () => M6,
  _lowercase: () => M1,
  _literal: () => w5,
  _length: () => R4,
  _lazy: () => I5,
  _ksuid: () => Yz,
  _jwt: () => Bz,
  _isoTime: () => EJ,
  _isoDuration: () => _J,
  _isoDateTime: () => AJ,
  _isoDate: () => FJ,
  _ipv6: () => wz,
  _ipv4: () => Wz,
  _intersection: () => v5,
  _int64: () => hJ,
  _int32: () => ZJ,
  _int: () => SJ,
  _includes: () => S1,
  _guid: () => A1,
  _gte: () => i$,
  _gt: () => P6,
  _float64: () => kJ,
  _float32: () => RJ,
  _file: () => zj,
  _enum: () => Y5,
  _endsWith: () => k1,
  _encodeAsync: () => kU,
  _encode: () => SU,
  _emoji: () => zz,
  _email: () => aU,
  _e164: () => Hz,
  _discriminatedUnion: () => z5,
  _default: () => O5,
  _decodeAsync: () => ZU,
  _decode: () => RU,
  _date: () => pJ,
  _custom: () => vj,
  _cuid2: () => Jz,
  _cuid: () => Xz,
  _coercedString: () => IJ,
  _coercedNumber: () => PJ,
  _coercedDate: () => rJ,
  _coercedBoolean: () => xJ,
  _coercedBigint: () => fJ,
  _cidrv6: () => Nz,
  _cidrv4: () => Gz,
  _check: () => XW,
  _catch: () => D5,
  _boolean: () => CJ,
  _bigint: () => gJ,
  _base64url: () => Oz,
  _base64: () => qz,
  _array: () => Uj,
  _any: () => iJ,
  TimePrecision: () => VJ,
  NEVER: () => qv,
  JSONSchemaGenerator: () => Dz,
  JSONSchema: () => JW,
  Doc: () => mU,
  $output: () => KJ,
  $input: () => bJ,
  $constructor: () => O,
  $brand: () => Ov,
  $ZodXID: () => k0,
  $ZodVoid: () => UX,
  $ZodUnknown: () => e0,
  $ZodUnion: () => rU,
  $ZodUndefined: () => t0,
  $ZodUUID: () => A0,
  $ZodURL: () => E0,
  $ZodULID: () => R0,
  $ZodType: () => m,
  $ZodTuple: () => oU,
  $ZodTransform: () => qX,
  $ZodTemplateLiteral: () => FX,
  $ZodSymbol: () => o0,
  $ZodSuccess: () => bX,
  $ZodStringFormat: () => U$,
  $ZodString: () => Y4,
  $ZodSet: () => WX,
  $ZodRegistry: () => V1,
  $ZodRecord: () => QX,
  $ZodRealError: () => c$,
  $ZodReadonly: () => AX,
  $ZodPromise: () => _X,
  $ZodPrefault: () => DX,
  $ZodPipe: () => VX,
  $ZodOptional: () => OX,
  $ZodObjectJIT: () => XX,
  $ZodObject: () => $W,
  $ZodNumberFormat: () => p0,
  $ZodNumber: () => dU,
  $ZodNullable: () => HX,
  $ZodNull: () => a0,
  $ZodNonOptional: () => KX,
  $ZodNever: () => $X,
  $ZodNanoID: () => M0,
  $ZodNaN: () => IX,
  $ZodMap: () => YX,
  $ZodLiteral: () => GX,
  $ZodLazy: () => MX,
  $ZodKSUID: () => Z0,
  $ZodJWT: () => l0,
  $ZodIntersection: () => jX,
  $ZodISOTime: () => x0,
  $ZodISODuration: () => g0,
  $ZodISODateTime: () => T0,
  $ZodISODate: () => C0,
  $ZodIPv6: () => h0,
  $ZodIPv4: () => f0,
  $ZodGUID: () => V0,
  $ZodFunction: () => EX,
  $ZodFile: () => NX,
  $ZodError: () => W1,
  $ZodEnum: () => wX,
  $ZodEncodeError: () => J4,
  $ZodEmoji: () => _0,
  $ZodEmail: () => F0,
  $ZodE164: () => n0,
  $ZodDiscriminatedUnion: () => JX,
  $ZodDefault: () => BX,
  $ZodDate: () => zX,
  $ZodCustomStringFormat: () => d0,
  $ZodCustom: () => PX,
  $ZodCodec: () => H1,
  $ZodCheckUpperCase: () => q0,
  $ZodCheckStringFormat: () => M4,
  $ZodCheckStartsWith: () => H0,
  $ZodCheckSizeEquals: () => Q0,
  $ZodCheckRegex: () => G0,
  $ZodCheckProperty: () => D0,
  $ZodCheckOverwrite: () => b0,
  $ZodCheckNumberFormat: () => v0,
  $ZodCheckMultipleOf: () => z0,
  $ZodCheckMinSize: () => j0,
  $ZodCheckMinLength: () => W0,
  $ZodCheckMimeType: () => K0,
  $ZodCheckMaxSize: () => J0,
  $ZodCheckMaxLength: () => Y0,
  $ZodCheckLowerCase: () => N0,
  $ZodCheckLessThan: () => hU,
  $ZodCheckLengthEquals: () => w0,
  $ZodCheckIncludes: () => O0,
  $ZodCheckGreaterThan: () => yU,
  $ZodCheckEndsWith: () => B0,
  $ZodCheckBigIntFormat: () => X0,
  $ZodCheck: () => Y$,
  $ZodCatch: () => LX,
  $ZodCUID2: () => S0,
  $ZodCUID: () => P0,
  $ZodCIDRv6: () => m0,
  $ZodCIDRv4: () => y0,
  $ZodBoolean: () => O1,
  $ZodBigIntFormat: () => r0,
  $ZodBigInt: () => pU,
  $ZodBase64URL: () => i0,
  $ZodBase64: () => c0,
  $ZodAsyncError: () => D6,
  $ZodArray: () => vX,
  $ZodAny: () => s0,
});
var qv = Object.freeze({ status: "aborted" });
function O($, U, v) {
  function X(Q, W) {
    var w;
    (Object.defineProperty(Q, "_zod", { value: Q._zod ?? {}, enumerable: !1 }),
      (w = Q._zod).traits ?? (w.traits = new Set()),
      Q._zod.traits.add($),
      U(Q, W));
    for (let N in j.prototype) if (!(N in Q)) Object.defineProperty(Q, N, { value: j.prototype[N].bind(Q) });
    ((Q._zod.constr = j), (Q._zod.def = W));
  }
  let z = v?.Parent ?? Object;
  class J extends z {}
  Object.defineProperty(J, "name", { value: $ });
  function j(Q) {
    var W;
    let w = v?.Parent ? new J() : this;
    (X(w, Q), (W = w._zod).deferred ?? (W.deferred = []));
    for (let N of w._zod.deferred) N();
    return w;
  }
  return (
    Object.defineProperty(j, "init", { value: X }),
    Object.defineProperty(j, Symbol.hasInstance, {
      value: (Q) => {
        if (v?.Parent && Q instanceof v.Parent) return !0;
        return Q?._zod?.traits?.has($);
      },
    }),
    Object.defineProperty(j, "name", { value: $ }),
    j
  );
}
var Ov = Symbol("zod_brand");
class D6 extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class J4 extends Error {
  constructor($) {
    super(`Encountered unidirectional transform during encode: ${$}`);
    this.name = "ZodEncodeError";
  }
}
var z1 = {};
function D$($) {
  if ($) Object.assign(z1, $);
  return z1;
}
var _ = {};
v4(_, {
  unwrapMessage: () => v1,
  uint8ArrayToHex: () => A7,
  uint8ArrayToBase64url: () => I7,
  uint8ArrayToBase64: () => RY,
  stringifyPrimitive: () => F,
  shallowClone: () => Kv,
  safeExtend: () => H7,
  required: () => K7,
  randomString: () => Y7,
  propertyKeyTypes: () => j1,
  promiseAllObject: () => Q7,
  primitiveTypes: () => bv,
  prefixIssues: () => p$,
  pick: () => N7,
  partial: () => D7,
  optionalKeys: () => Lv,
  omit: () => q7,
  objectClone: () => X7,
  numKeys: () => W7,
  nullish: () => i6,
  normalizeParams: () => E,
  mergeDefs: () => l6,
  merge: () => B7,
  jsonStringifyReplacer: () => L4,
  joinValues: () => b,
  issue: () => V4,
  isPlainObject: () => d6,
  isObject: () => j4,
  hexToUint8Array: () => V7,
  getSizableOrigin: () => Q1,
  getParsedType: () => w7,
  getLengthableOrigin: () => Y1,
  getEnumValues: () => X1,
  getElementAtPath: () => j7,
  floatSafeRemainder: () => Bv,
  finalizeIssue: () => r$,
  extend: () => O7,
  escapeRegex: () => K6,
  esc: () => EU,
  defineLazy: () => d,
  createTransparentProxy: () => G7,
  cloneDef: () => J7,
  clone: () => k$,
  cleanRegex: () => J1,
  cleanEnum: () => b7,
  captureStackTrace: () => _U,
  cached: () => I4,
  base64urlToUint8Array: () => L7,
  base64ToUint8Array: () => SY,
  assignProp: () => n6,
  assertNotEqual: () => $7,
  assertNever: () => z7,
  assertIs: () => U7,
  assertEqual: () => e9,
  assert: () => v7,
  allowsEval: () => Dv,
  aborted: () => p6,
  NUMBER_FORMAT_RANGES: () => Iv,
  Class: () => kY,
  BIGINT_FORMAT_RANGES: () => Vv,
});
function e9($) {
  return $;
}
function $7($) {
  return $;
}
function U7($) {}
function z7($) {
  throw Error();
}
function v7($) {}
function X1($) {
  let U = Object.values($).filter((X) => typeof X === "number");
  return Object.entries($)
    .filter(([X, z]) => U.indexOf(+X) === -1)
    .map(([X, z]) => z);
}
function b($, U = "|") {
  return $.map((v) => F(v)).join(U);
}
function L4($, U) {
  if (typeof U === "bigint") return U.toString();
  return U;
}
function I4($) {
  return {
    get value() {
      {
        let v = $();
        return (Object.defineProperty(this, "value", { value: v }), v);
      }
      throw Error("cached value already set");
    },
  };
}
function i6($) {
  return $ === null || $ === void 0;
}
function J1($) {
  let U = $.startsWith("^") ? 1 : 0,
    v = $.endsWith("$") ? $.length - 1 : $.length;
  return $.slice(U, v);
}
function Bv($, U) {
  let v = ($.toString().split(".")[1] || "").length,
    X = U.toString(),
    z = (X.split(".")[1] || "").length;
  if (z === 0 && /\d?e-\d?/.test(X)) {
    let W = X.match(/\d?e-(\d?)/);
    if (W?.[1]) z = Number.parseInt(W[1]);
  }
  let J = v > z ? v : z,
    j = Number.parseInt($.toFixed(J).replace(".", "")),
    Q = Number.parseInt(U.toFixed(J).replace(".", ""));
  return (j % Q) / 10 ** J;
}
var PY = Symbol("evaluating");
function d($, U, v) {
  let X = void 0;
  Object.defineProperty($, U, {
    get() {
      if (X === PY) return;
      if (X === void 0) ((X = PY), (X = v()));
      return X;
    },
    set(z) {
      Object.defineProperty($, U, { value: z });
    },
    configurable: !0,
  });
}
function X7($) {
  return Object.create(Object.getPrototypeOf($), Object.getOwnPropertyDescriptors($));
}
function n6($, U, v) {
  Object.defineProperty($, U, { value: v, writable: !0, enumerable: !0, configurable: !0 });
}
function l6(...$) {
  let U = {};
  for (let v of $) {
    let X = Object.getOwnPropertyDescriptors(v);
    Object.assign(U, X);
  }
  return Object.defineProperties({}, U);
}
function J7($) {
  return l6($._zod.def);
}
function j7($, U) {
  if (!U) return $;
  return U.reduce((v, X) => v?.[X], $);
}
function Q7($) {
  let U = Object.keys($),
    v = U.map((X) => $[X]);
  return Promise.all(v).then((X) => {
    let z = {};
    for (let J = 0; J < U.length; J++) z[U[J]] = X[J];
    return z;
  });
}
function Y7($ = 10) {
  let v = "";
  for (let X = 0; X < $; X++) v += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
  return v;
}
function EU($) {
  return JSON.stringify($);
}
var _U = "captureStackTrace" in Error ? Error.captureStackTrace : (...$) => {};
function j4($) {
  return typeof $ === "object" && $ !== null && !Array.isArray($);
}
var Dv = I4(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
  try {
    return (new Function(""), !0);
  } catch ($) {
    return !1;
  }
});
function d6($) {
  if (j4($) === !1) return !1;
  let U = $.constructor;
  if (U === void 0) return !0;
  let v = U.prototype;
  if (j4(v) === !1) return !1;
  if (Object.prototype.hasOwnProperty.call(v, "isPrototypeOf") === !1) return !1;
  return !0;
}
function Kv($) {
  if (d6($)) return { ...$ };
  if (Array.isArray($)) return [...$];
  return $;
}
function W7($) {
  let U = 0;
  for (let v in $) if (Object.prototype.hasOwnProperty.call($, v)) U++;
  return U;
}
var w7 = ($) => {
    let U = typeof $;
    switch (U) {
      case "undefined":
        return "undefined";
      case "string":
        return "string";
      case "number":
        return Number.isNaN($) ? "nan" : "number";
      case "boolean":
        return "boolean";
      case "function":
        return "function";
      case "bigint":
        return "bigint";
      case "symbol":
        return "symbol";
      case "object":
        if (Array.isArray($)) return "array";
        if ($ === null) return "null";
        if ($.then && typeof $.then === "function" && $.catch && typeof $.catch === "function") return "promise";
        if (typeof Map < "u" && $ instanceof Map) return "map";
        if (typeof Set < "u" && $ instanceof Set) return "set";
        if (typeof Date < "u" && $ instanceof Date) return "date";
        if (typeof File < "u" && $ instanceof File) return "file";
        return "object";
      default:
        throw Error(`Unknown data type: ${U}`);
    }
  },
  j1 = new Set(["string", "number", "symbol"]),
  bv = new Set(["string", "number", "bigint", "boolean", "symbol", "undefined"]);
function K6($) {
  return $.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function k$($, U, v) {
  let X = new $._zod.constr(U ?? $._zod.def);
  if (!U || v?.parent) X._zod.parent = $;
  return X;
}
function E($) {
  let U = $;
  if (!U) return {};
  if (typeof U === "string") return { error: () => U };
  if (U?.message !== void 0) {
    if (U?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
    U.error = U.message;
  }
  if ((delete U.message, typeof U.error === "string")) return { ...U, error: () => U.error };
  return U;
}
function G7($) {
  let U;
  return new Proxy(
    {},
    {
      get(v, X, z) {
        return (U ?? (U = $()), Reflect.get(U, X, z));
      },
      set(v, X, z, J) {
        return (U ?? (U = $()), Reflect.set(U, X, z, J));
      },
      has(v, X) {
        return (U ?? (U = $()), Reflect.has(U, X));
      },
      deleteProperty(v, X) {
        return (U ?? (U = $()), Reflect.deleteProperty(U, X));
      },
      ownKeys(v) {
        return (U ?? (U = $()), Reflect.ownKeys(U));
      },
      getOwnPropertyDescriptor(v, X) {
        return (U ?? (U = $()), Reflect.getOwnPropertyDescriptor(U, X));
      },
      defineProperty(v, X, z) {
        return (U ?? (U = $()), Reflect.defineProperty(U, X, z));
      },
    },
  );
}
function F($) {
  if (typeof $ === "bigint") return $.toString() + "n";
  if (typeof $ === "string") return `"${$}"`;
  return `${$}`;
}
function Lv($) {
  return Object.keys($).filter((U) => {
    return $[U]._zod.optin === "optional" && $[U]._zod.optout === "optional";
  });
}
var Iv = {
    safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
    int32: [-2147483648, 2147483647],
    uint32: [0, 4294967295],
    float32: [-340282346638528860000000000000000000000, 340282346638528860000000000000000000000],
    float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
  },
  Vv = {
    int64: [BigInt("-9223372036854775808"), BigInt("9223372036854775807")],
    uint64: [BigInt(0), BigInt("18446744073709551615")],
  };
function N7($, U) {
  let v = $._zod.def,
    X = l6($._zod.def, {
      get shape() {
        let z = {};
        for (let J in U) {
          if (!(J in v.shape)) throw Error(`Unrecognized key: "${J}"`);
          if (!U[J]) continue;
          z[J] = v.shape[J];
        }
        return (n6(this, "shape", z), z);
      },
      checks: [],
    });
  return k$($, X);
}
function q7($, U) {
  let v = $._zod.def,
    X = l6($._zod.def, {
      get shape() {
        let z = { ...$._zod.def.shape };
        for (let J in U) {
          if (!(J in v.shape)) throw Error(`Unrecognized key: "${J}"`);
          if (!U[J]) continue;
          delete z[J];
        }
        return (n6(this, "shape", z), z);
      },
      checks: [],
    });
  return k$($, X);
}
function O7($, U) {
  if (!d6(U)) throw Error("Invalid input to extend: expected a plain object");
  let v = $._zod.def.checks;
  if (v && v.length > 0)
    throw Error("Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.");
  let z = l6($._zod.def, {
    get shape() {
      let J = { ...$._zod.def.shape, ...U };
      return (n6(this, "shape", J), J);
    },
    checks: [],
  });
  return k$($, z);
}
function H7($, U) {
  if (!d6(U)) throw Error("Invalid input to safeExtend: expected a plain object");
  let v = {
    ...$._zod.def,
    get shape() {
      let X = { ...$._zod.def.shape, ...U };
      return (n6(this, "shape", X), X);
    },
    checks: $._zod.def.checks,
  };
  return k$($, v);
}
function B7($, U) {
  let v = l6($._zod.def, {
    get shape() {
      let X = { ...$._zod.def.shape, ...U._zod.def.shape };
      return (n6(this, "shape", X), X);
    },
    get catchall() {
      return U._zod.def.catchall;
    },
    checks: [],
  });
  return k$($, v);
}
function D7($, U, v) {
  let X = l6(U._zod.def, {
    get shape() {
      let z = U._zod.def.shape,
        J = { ...z };
      if (v)
        for (let j in v) {
          if (!(j in z)) throw Error(`Unrecognized key: "${j}"`);
          if (!v[j]) continue;
          J[j] = $ ? new $({ type: "optional", innerType: z[j] }) : z[j];
        }
      else for (let j in z) J[j] = $ ? new $({ type: "optional", innerType: z[j] }) : z[j];
      return (n6(this, "shape", J), J);
    },
    checks: [],
  });
  return k$(U, X);
}
function K7($, U, v) {
  let X = l6(U._zod.def, {
    get shape() {
      let z = U._zod.def.shape,
        J = { ...z };
      if (v)
        for (let j in v) {
          if (!(j in J)) throw Error(`Unrecognized key: "${j}"`);
          if (!v[j]) continue;
          J[j] = new $({ type: "nonoptional", innerType: z[j] });
        }
      else for (let j in z) J[j] = new $({ type: "nonoptional", innerType: z[j] });
      return (n6(this, "shape", J), J);
    },
    checks: [],
  });
  return k$(U, X);
}
function p6($, U = 0) {
  if ($.aborted === !0) return !0;
  for (let v = U; v < $.issues.length; v++) if ($.issues[v]?.continue !== !0) return !0;
  return !1;
}
function p$($, U) {
  return U.map((v) => {
    var X;
    return ((X = v).path ?? (X.path = []), v.path.unshift($), v);
  });
}
function v1($) {
  return typeof $ === "string" ? $ : $?.message;
}
function r$($, U, v) {
  let X = { ...$, path: $.path ?? [] };
  if (!$.message) {
    let z =
      v1($.inst?._zod.def?.error?.($)) ??
      v1(U?.error?.($)) ??
      v1(v.customError?.($)) ??
      v1(v.localeError?.($)) ??
      "Invalid input";
    X.message = z;
  }
  if ((delete X.inst, delete X.continue, !U?.reportInput)) delete X.input;
  return X;
}
function Q1($) {
  if ($ instanceof Set) return "set";
  if ($ instanceof Map) return "map";
  if ($ instanceof File) return "file";
  return "unknown";
}
function Y1($) {
  if (Array.isArray($)) return "array";
  if (typeof $ === "string") return "string";
  return "unknown";
}
function V4(...$) {
  let [U, v, X] = $;
  if (typeof U === "string") return { message: U, code: "custom", input: v, inst: X };
  return { ...U };
}
function b7($) {
  return Object.entries($)
    .filter(([U, v]) => {
      return Number.isNaN(Number.parseInt(U, 10));
    })
    .map((U) => U[1]);
}
function SY($) {
  let U = atob($),
    v = new Uint8Array(U.length);
  for (let X = 0; X < U.length; X++) v[X] = U.charCodeAt(X);
  return v;
}
function RY($) {
  let U = "";
  for (let v = 0; v < $.length; v++) U += String.fromCharCode($[v]);
  return btoa(U);
}
function L7($) {
  let U = $.replace(/-/g, "+").replace(/_/g, "/"),
    v = "=".repeat((4 - (U.length % 4)) % 4);
  return SY(U + v);
}
function I7($) {
  return RY($).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function V7($) {
  let U = $.replace(/^0x/, "");
  if (U.length % 2 !== 0) throw Error("Invalid hex string length");
  let v = new Uint8Array(U.length / 2);
  for (let X = 0; X < U.length; X += 2) v[X / 2] = Number.parseInt(U.slice(X, X + 2), 16);
  return v;
}
function A7($) {
  return Array.from($)
    .map((U) => U.toString(16).padStart(2, "0"))
    .join("");
}
class kY {
  constructor(...$) {}
}
var ZY = ($, U) => {
    (($.name = "$ZodError"),
      Object.defineProperty($, "_zod", { value: $._zod, enumerable: !1 }),
      Object.defineProperty($, "issues", { value: U, enumerable: !1 }),
      ($.message = JSON.stringify(U, L4, 2)),
      Object.defineProperty($, "toString", { value: () => $.message, enumerable: !1 }));
  },
  W1 = O("$ZodError", ZY),
  c$ = O("$ZodError", ZY, { Parent: Error });
function w1($, U = (v) => v.message) {
  let v = {},
    X = [];
  for (let z of $.issues)
    if (z.path.length > 0) ((v[z.path[0]] = v[z.path[0]] || []), v[z.path[0]].push(U(z)));
    else X.push(U(z));
  return { formErrors: X, fieldErrors: v };
}
function G1($, U) {
  let v =
      U ||
      function (J) {
        return J.message;
      },
    X = { _errors: [] },
    z = (J) => {
      for (let j of J.issues)
        if (j.code === "invalid_union" && j.errors.length) j.errors.map((Q) => z({ issues: Q }));
        else if (j.code === "invalid_key") z({ issues: j.issues });
        else if (j.code === "invalid_element") z({ issues: j.issues });
        else if (j.path.length === 0) X._errors.push(v(j));
        else {
          let Q = X,
            W = 0;
          while (W < j.path.length) {
            let w = j.path[W];
            if (W !== j.path.length - 1) Q[w] = Q[w] || { _errors: [] };
            else ((Q[w] = Q[w] || { _errors: [] }), Q[w]._errors.push(v(j)));
            ((Q = Q[w]), W++);
          }
        }
    };
  return (z($), X);
}
function Av($, U) {
  let v =
      U ||
      function (J) {
        return J.message;
      },
    X = { errors: [] },
    z = (J, j = []) => {
      var Q, W;
      for (let w of J.issues)
        if (w.code === "invalid_union" && w.errors.length) w.errors.map((N) => z({ issues: N }, w.path));
        else if (w.code === "invalid_key") z({ issues: w.issues }, w.path);
        else if (w.code === "invalid_element") z({ issues: w.issues }, w.path);
        else {
          let N = [...j, ...w.path];
          if (N.length === 0) {
            X.errors.push(v(w));
            continue;
          }
          let D = X,
            H = 0;
          while (H < N.length) {
            let G = N[H],
              q = H === N.length - 1;
            if (typeof G === "string")
              (D.properties ?? (D.properties = {}),
                (Q = D.properties)[G] ?? (Q[G] = { errors: [] }),
                (D = D.properties[G]));
            else (D.items ?? (D.items = []), (W = D.items)[G] ?? (W[G] = { errors: [] }), (D = D.items[G]));
            if (q) D.errors.push(v(w));
            H++;
          }
        }
    };
  return (z($), X);
}
function TY($) {
  let U = [],
    v = $.map((X) => (typeof X === "object" ? X.key : X));
  for (let X of v)
    if (typeof X === "number") U.push(`[${X}]`);
    else if (typeof X === "symbol") U.push(`[${JSON.stringify(String(X))}]`);
    else if (/[^\w$]/.test(X)) U.push(`[${JSON.stringify(X)}]`);
    else {
      if (U.length) U.push(".");
      U.push(X);
    }
  return U.join("");
}
function Fv($) {
  let U = [],
    v = [...$.issues].sort((X, z) => (X.path ?? []).length - (z.path ?? []).length);
  for (let X of v) if ((U.push(`✖ ${X.message}`), X.path?.length)) U.push(`  → at ${TY(X.path)}`);
  return U.join(`
`);
}
var A4 = ($) => (U, v, X, z) => {
    let J = X ? Object.assign(X, { async: !1 }) : { async: !1 },
      j = U._zod.run({ value: v, issues: [] }, J);
    if (j instanceof Promise) throw new D6();
    if (j.issues.length) {
      let Q = new (z?.Err ?? $)(j.issues.map((W) => r$(W, J, D$())));
      throw (_U(Q, z?.callee), Q);
    }
    return j.value;
  },
  MU = A4(c$),
  F4 = ($) => async (U, v, X, z) => {
    let J = X ? Object.assign(X, { async: !0 }) : { async: !0 },
      j = U._zod.run({ value: v, issues: [] }, J);
    if (j instanceof Promise) j = await j;
    if (j.issues.length) {
      let Q = new (z?.Err ?? $)(j.issues.map((W) => r$(W, J, D$())));
      throw (_U(Q, z?.callee), Q);
    }
    return j.value;
  },
  PU = F4(c$),
  E4 = ($) => (U, v, X) => {
    let z = X ? { ...X, async: !1 } : { async: !1 },
      J = U._zod.run({ value: v, issues: [] }, z);
    if (J instanceof Promise) throw new D6();
    return J.issues.length
      ? { success: !1, error: new ($ ?? W1)(J.issues.map((j) => r$(j, z, D$()))) }
      : { success: !0, data: J.value };
  },
  Ev = E4(c$),
  _4 = ($) => async (U, v, X) => {
    let z = X ? Object.assign(X, { async: !0 }) : { async: !0 },
      J = U._zod.run({ value: v, issues: [] }, z);
    if (J instanceof Promise) J = await J;
    return J.issues.length
      ? { success: !1, error: new $(J.issues.map((j) => r$(j, z, D$()))) }
      : { success: !0, data: J.value };
  },
  _v = _4(c$),
  SU = ($) => (U, v, X) => {
    let z = X ? Object.assign(X, { direction: "backward" }) : { direction: "backward" };
    return A4($)(U, v, z);
  },
  E7 = SU(c$),
  RU = ($) => (U, v, X) => {
    return A4($)(U, v, X);
  },
  _7 = RU(c$),
  kU = ($) => async (U, v, X) => {
    let z = X ? Object.assign(X, { direction: "backward" }) : { direction: "backward" };
    return F4($)(U, v, z);
  },
  M7 = kU(c$),
  ZU = ($) => async (U, v, X) => {
    return F4($)(U, v, X);
  },
  P7 = ZU(c$),
  TU = ($) => (U, v, X) => {
    let z = X ? Object.assign(X, { direction: "backward" }) : { direction: "backward" };
    return E4($)(U, v, z);
  },
  S7 = TU(c$),
  CU = ($) => (U, v, X) => {
    return E4($)(U, v, X);
  },
  R7 = CU(c$),
  xU = ($) => async (U, v, X) => {
    let z = X ? Object.assign(X, { direction: "backward" }) : { direction: "backward" };
    return _4($)(U, v, z);
  },
  k7 = xU(c$),
  gU = ($) => async (U, v, X) => {
    return _4($)(U, v, X);
  },
  Z7 = gU(c$);
var $6 = {};
v4($6, {
  xid: () => Rv,
  uuid7: () => g7,
  uuid6: () => x7,
  uuid4: () => C7,
  uuid: () => Q4,
  uppercase: () => U0,
  unicodeEmail: () => CY,
  undefined: () => ev,
  ulid: () => Sv,
  time: () => lv,
  string: () => pv,
  sha512_hex: () => UN,
  sha512_base64url: () => vN,
  sha512_base64: () => zN,
  sha384_hex: () => s7,
  sha384_base64url: () => $N,
  sha384_base64: () => e7,
  sha256_hex: () => o7,
  sha256_base64url: () => a7,
  sha256_base64: () => t7,
  sha1_hex: () => d7,
  sha1_base64url: () => r7,
  sha1_base64: () => p7,
  rfc5322Email: () => h7,
  number: () => tv,
  null: () => sv,
  nanoid: () => Zv,
  md5_hex: () => i7,
  md5_base64url: () => l7,
  md5_base64: () => n7,
  lowercase: () => $0,
  ksuid: () => kv,
  ipv6: () => hv,
  ipv4: () => fv,
  integer: () => ov,
  idnEmail: () => y7,
  html5Email: () => f7,
  hostname: () => cv,
  hex: () => c7,
  guid: () => Cv,
  extendedDuration: () => T7,
  emoji: () => gv,
  email: () => xv,
  e164: () => iv,
  duration: () => Tv,
  domain: () => u7,
  datetime: () => dv,
  date: () => nv,
  cuid2: () => Pv,
  cuid: () => Mv,
  cidrv6: () => mv,
  cidrv4: () => yv,
  browserEmail: () => m7,
  boolean: () => av,
  bigint: () => rv,
  base64url: () => fU,
  base64: () => uv,
});
var Mv = /^[cC][^\s-]{8,}$/,
  Pv = /^[0-9a-z]+$/,
  Sv = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
  Rv = /^[0-9a-vA-V]{20}$/,
  kv = /^[A-Za-z0-9]{27}$/,
  Zv = /^[a-zA-Z0-9_-]{21}$/,
  Tv = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
  T7 =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  Cv = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
  Q4 = ($) => {
    if (!$)
      return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
    return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${$}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
  },
  C7 = Q4(4),
  x7 = Q4(6),
  g7 = Q4(7),
  xv = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
  f7 =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  h7 =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  CY = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u,
  y7 = CY,
  m7 =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
function gv() {
  return new RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
}
var fv =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  hv =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
  yv =
    /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
  mv =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  uv = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
  fU = /^[A-Za-z0-9_-]*$/,
  cv =
    /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/,
  u7 = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
  iv = /^\+(?:[0-9]){6,14}[0-9]$/,
  xY =
    "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
  nv = new RegExp(`^${xY}$`);
function gY($) {
  return typeof $.precision === "number"
    ? $.precision === -1
      ? "(?:[01]\\d|2[0-3]):[0-5]\\d"
      : $.precision === 0
        ? "(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d"
        : `(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d\\.\\d{${$.precision}}`
    : "(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(?:\\.\\d+)?)?";
}
function lv($) {
  return new RegExp(`^${gY($)}$`);
}
function dv($) {
  let U = gY({ precision: $.precision }),
    v = ["Z"];
  if ($.local) v.push("");
  if ($.offset) v.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  let X = `${U}(?:${v.join("|")})`;
  return new RegExp(`^${xY}T(?:${X})$`);
}
var pv = ($) => {
    let U = $ ? `[\\s\\S]{${$?.minimum ?? 0},${$?.maximum ?? ""}}` : "[\\s\\S]*";
    return new RegExp(`^${U}$`);
  },
  rv = /^-?\d+n?$/,
  ov = /^-?\d+$/,
  tv = /^-?\d+(?:\.\d+)?/,
  av = /^(?:true|false)$/i,
  sv = /^null$/i;
var ev = /^undefined$/i;
var $0 = /^[^A-Z]*$/,
  U0 = /^[^a-z]*$/,
  c7 = /^[0-9a-fA-F]*$/;
function N1($, U) {
  return new RegExp(`^[A-Za-z0-9+/]{${$}}${U}$`);
}
function q1($) {
  return new RegExp(`^[A-Za-z0-9_-]{${$}}$`);
}
var i7 = /^[0-9a-fA-F]{32}$/,
  n7 = N1(22, "=="),
  l7 = q1(22),
  d7 = /^[0-9a-fA-F]{40}$/,
  p7 = N1(27, "="),
  r7 = q1(27),
  o7 = /^[0-9a-fA-F]{64}$/,
  t7 = N1(43, "="),
  a7 = q1(43),
  s7 = /^[0-9a-fA-F]{96}$/,
  e7 = N1(64, ""),
  $N = q1(64),
  UN = /^[0-9a-fA-F]{128}$/,
  zN = N1(86, "=="),
  vN = q1(86);
var Y$ = O("$ZodCheck", ($, U) => {
    var v;
    ($._zod ?? ($._zod = {}), ($._zod.def = U), (v = $._zod).onattach ?? (v.onattach = []));
  }),
  hY = { number: "number", bigint: "bigint", object: "date" },
  hU = O("$ZodCheckLessThan", ($, U) => {
    Y$.init($, U);
    let v = hY[typeof U.value];
    ($._zod.onattach.push((X) => {
      let z = X._zod.bag,
        J = (U.inclusive ? z.maximum : z.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
      if (U.value < J)
        if (U.inclusive) z.maximum = U.value;
        else z.exclusiveMaximum = U.value;
    }),
      ($._zod.check = (X) => {
        if (U.inclusive ? X.value <= U.value : X.value < U.value) return;
        X.issues.push({
          origin: v,
          code: "too_big",
          maximum: U.value,
          input: X.value,
          inclusive: U.inclusive,
          inst: $,
          continue: !U.abort,
        });
      }));
  }),
  yU = O("$ZodCheckGreaterThan", ($, U) => {
    Y$.init($, U);
    let v = hY[typeof U.value];
    ($._zod.onattach.push((X) => {
      let z = X._zod.bag,
        J = (U.inclusive ? z.minimum : z.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
      if (U.value > J)
        if (U.inclusive) z.minimum = U.value;
        else z.exclusiveMinimum = U.value;
    }),
      ($._zod.check = (X) => {
        if (U.inclusive ? X.value >= U.value : X.value > U.value) return;
        X.issues.push({
          origin: v,
          code: "too_small",
          minimum: U.value,
          input: X.value,
          inclusive: U.inclusive,
          inst: $,
          continue: !U.abort,
        });
      }));
  }),
  z0 = O("$ZodCheckMultipleOf", ($, U) => {
    (Y$.init($, U),
      $._zod.onattach.push((v) => {
        var X;
        (X = v._zod.bag).multipleOf ?? (X.multipleOf = U.value);
      }),
      ($._zod.check = (v) => {
        if (typeof v.value !== typeof U.value) throw Error("Cannot mix number and bigint in multiple_of check.");
        if (typeof v.value === "bigint" ? v.value % U.value === BigInt(0) : Bv(v.value, U.value) === 0) return;
        v.issues.push({
          origin: typeof v.value,
          code: "not_multiple_of",
          divisor: U.value,
          input: v.value,
          inst: $,
          continue: !U.abort,
        });
      }));
  }),
  v0 = O("$ZodCheckNumberFormat", ($, U) => {
    (Y$.init($, U), (U.format = U.format || "float64"));
    let v = U.format?.includes("int"),
      X = v ? "int" : "number",
      [z, J] = Iv[U.format];
    ($._zod.onattach.push((j) => {
      let Q = j._zod.bag;
      if (((Q.format = U.format), (Q.minimum = z), (Q.maximum = J), v)) Q.pattern = ov;
    }),
      ($._zod.check = (j) => {
        let Q = j.value;
        if (v) {
          if (!Number.isInteger(Q)) {
            j.issues.push({ expected: X, format: U.format, code: "invalid_type", continue: !1, input: Q, inst: $ });
            return;
          }
          if (!Number.isSafeInteger(Q)) {
            if (Q > 0)
              j.issues.push({
                input: Q,
                code: "too_big",
                maximum: Number.MAX_SAFE_INTEGER,
                note: "Integers must be within the safe integer range.",
                inst: $,
                origin: X,
                continue: !U.abort,
              });
            else
              j.issues.push({
                input: Q,
                code: "too_small",
                minimum: Number.MIN_SAFE_INTEGER,
                note: "Integers must be within the safe integer range.",
                inst: $,
                origin: X,
                continue: !U.abort,
              });
            return;
          }
        }
        if (Q < z)
          j.issues.push({
            origin: "number",
            input: Q,
            code: "too_small",
            minimum: z,
            inclusive: !0,
            inst: $,
            continue: !U.abort,
          });
        if (Q > J) j.issues.push({ origin: "number", input: Q, code: "too_big", maximum: J, inst: $ });
      }));
  }),
  X0 = O("$ZodCheckBigIntFormat", ($, U) => {
    Y$.init($, U);
    let [v, X] = Vv[U.format];
    ($._zod.onattach.push((z) => {
      let J = z._zod.bag;
      ((J.format = U.format), (J.minimum = v), (J.maximum = X));
    }),
      ($._zod.check = (z) => {
        let J = z.value;
        if (J < v)
          z.issues.push({
            origin: "bigint",
            input: J,
            code: "too_small",
            minimum: v,
            inclusive: !0,
            inst: $,
            continue: !U.abort,
          });
        if (J > X) z.issues.push({ origin: "bigint", input: J, code: "too_big", maximum: X, inst: $ });
      }));
  }),
  J0 = O("$ZodCheckMaxSize", ($, U) => {
    var v;
    (Y$.init($, U),
      (v = $._zod.def).when ??
        (v.when = (X) => {
          let z = X.value;
          return !i6(z) && z.size !== void 0;
        }),
      $._zod.onattach.push((X) => {
        let z = X._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
        if (U.maximum < z) X._zod.bag.maximum = U.maximum;
      }),
      ($._zod.check = (X) => {
        let z = X.value;
        if (z.size <= U.maximum) return;
        X.issues.push({
          origin: Q1(z),
          code: "too_big",
          maximum: U.maximum,
          inclusive: !0,
          input: z,
          inst: $,
          continue: !U.abort,
        });
      }));
  }),
  j0 = O("$ZodCheckMinSize", ($, U) => {
    var v;
    (Y$.init($, U),
      (v = $._zod.def).when ??
        (v.when = (X) => {
          let z = X.value;
          return !i6(z) && z.size !== void 0;
        }),
      $._zod.onattach.push((X) => {
        let z = X._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
        if (U.minimum > z) X._zod.bag.minimum = U.minimum;
      }),
      ($._zod.check = (X) => {
        let z = X.value;
        if (z.size >= U.minimum) return;
        X.issues.push({
          origin: Q1(z),
          code: "too_small",
          minimum: U.minimum,
          inclusive: !0,
          input: z,
          inst: $,
          continue: !U.abort,
        });
      }));
  }),
  Q0 = O("$ZodCheckSizeEquals", ($, U) => {
    var v;
    (Y$.init($, U),
      (v = $._zod.def).when ??
        (v.when = (X) => {
          let z = X.value;
          return !i6(z) && z.size !== void 0;
        }),
      $._zod.onattach.push((X) => {
        let z = X._zod.bag;
        ((z.minimum = U.size), (z.maximum = U.size), (z.size = U.size));
      }),
      ($._zod.check = (X) => {
        let z = X.value,
          J = z.size;
        if (J === U.size) return;
        let j = J > U.size;
        X.issues.push({
          origin: Q1(z),
          ...(j ? { code: "too_big", maximum: U.size } : { code: "too_small", minimum: U.size }),
          inclusive: !0,
          exact: !0,
          input: X.value,
          inst: $,
          continue: !U.abort,
        });
      }));
  }),
  Y0 = O("$ZodCheckMaxLength", ($, U) => {
    var v;
    (Y$.init($, U),
      (v = $._zod.def).when ??
        (v.when = (X) => {
          let z = X.value;
          return !i6(z) && z.length !== void 0;
        }),
      $._zod.onattach.push((X) => {
        let z = X._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
        if (U.maximum < z) X._zod.bag.maximum = U.maximum;
      }),
      ($._zod.check = (X) => {
        let z = X.value;
        if (z.length <= U.maximum) return;
        let j = Y1(z);
        X.issues.push({
          origin: j,
          code: "too_big",
          maximum: U.maximum,
          inclusive: !0,
          input: z,
          inst: $,
          continue: !U.abort,
        });
      }));
  }),
  W0 = O("$ZodCheckMinLength", ($, U) => {
    var v;
    (Y$.init($, U),
      (v = $._zod.def).when ??
        (v.when = (X) => {
          let z = X.value;
          return !i6(z) && z.length !== void 0;
        }),
      $._zod.onattach.push((X) => {
        let z = X._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
        if (U.minimum > z) X._zod.bag.minimum = U.minimum;
      }),
      ($._zod.check = (X) => {
        let z = X.value;
        if (z.length >= U.minimum) return;
        let j = Y1(z);
        X.issues.push({
          origin: j,
          code: "too_small",
          minimum: U.minimum,
          inclusive: !0,
          input: z,
          inst: $,
          continue: !U.abort,
        });
      }));
  }),
  w0 = O("$ZodCheckLengthEquals", ($, U) => {
    var v;
    (Y$.init($, U),
      (v = $._zod.def).when ??
        (v.when = (X) => {
          let z = X.value;
          return !i6(z) && z.length !== void 0;
        }),
      $._zod.onattach.push((X) => {
        let z = X._zod.bag;
        ((z.minimum = U.length), (z.maximum = U.length), (z.length = U.length));
      }),
      ($._zod.check = (X) => {
        let z = X.value,
          J = z.length;
        if (J === U.length) return;
        let j = Y1(z),
          Q = J > U.length;
        X.issues.push({
          origin: j,
          ...(Q ? { code: "too_big", maximum: U.length } : { code: "too_small", minimum: U.length }),
          inclusive: !0,
          exact: !0,
          input: X.value,
          inst: $,
          continue: !U.abort,
        });
      }));
  }),
  M4 = O("$ZodCheckStringFormat", ($, U) => {
    var v, X;
    if (
      (Y$.init($, U),
      $._zod.onattach.push((z) => {
        let J = z._zod.bag;
        if (((J.format = U.format), U.pattern)) (J.patterns ?? (J.patterns = new Set()), J.patterns.add(U.pattern));
      }),
      U.pattern)
    )
      (v = $._zod).check ??
        (v.check = (z) => {
          if (((U.pattern.lastIndex = 0), U.pattern.test(z.value))) return;
          z.issues.push({
            origin: "string",
            code: "invalid_format",
            format: U.format,
            input: z.value,
            ...(U.pattern ? { pattern: U.pattern.toString() } : {}),
            inst: $,
            continue: !U.abort,
          });
        });
    else (X = $._zod).check ?? (X.check = () => {});
  }),
  G0 = O("$ZodCheckRegex", ($, U) => {
    (M4.init($, U),
      ($._zod.check = (v) => {
        if (((U.pattern.lastIndex = 0), U.pattern.test(v.value))) return;
        v.issues.push({
          origin: "string",
          code: "invalid_format",
          format: "regex",
          input: v.value,
          pattern: U.pattern.toString(),
          inst: $,
          continue: !U.abort,
        });
      }));
  }),
  N0 = O("$ZodCheckLowerCase", ($, U) => {
    (U.pattern ?? (U.pattern = $0), M4.init($, U));
  }),
  q0 = O("$ZodCheckUpperCase", ($, U) => {
    (U.pattern ?? (U.pattern = U0), M4.init($, U));
  }),
  O0 = O("$ZodCheckIncludes", ($, U) => {
    Y$.init($, U);
    let v = K6(U.includes),
      X = new RegExp(typeof U.position === "number" ? `^.{${U.position}}${v}` : v);
    ((U.pattern = X),
      $._zod.onattach.push((z) => {
        let J = z._zod.bag;
        (J.patterns ?? (J.patterns = new Set()), J.patterns.add(X));
      }),
      ($._zod.check = (z) => {
        if (z.value.includes(U.includes, U.position)) return;
        z.issues.push({
          origin: "string",
          code: "invalid_format",
          format: "includes",
          includes: U.includes,
          input: z.value,
          inst: $,
          continue: !U.abort,
        });
      }));
  }),
  H0 = O("$ZodCheckStartsWith", ($, U) => {
    Y$.init($, U);
    let v = new RegExp(`^${K6(U.prefix)}.*`);
    (U.pattern ?? (U.pattern = v),
      $._zod.onattach.push((X) => {
        let z = X._zod.bag;
        (z.patterns ?? (z.patterns = new Set()), z.patterns.add(v));
      }),
      ($._zod.check = (X) => {
        if (X.value.startsWith(U.prefix)) return;
        X.issues.push({
          origin: "string",
          code: "invalid_format",
          format: "starts_with",
          prefix: U.prefix,
          input: X.value,
          inst: $,
          continue: !U.abort,
        });
      }));
  }),
  B0 = O("$ZodCheckEndsWith", ($, U) => {
    Y$.init($, U);
    let v = new RegExp(`.*${K6(U.suffix)}$`);
    (U.pattern ?? (U.pattern = v),
      $._zod.onattach.push((X) => {
        let z = X._zod.bag;
        (z.patterns ?? (z.patterns = new Set()), z.patterns.add(v));
      }),
      ($._zod.check = (X) => {
        if (X.value.endsWith(U.suffix)) return;
        X.issues.push({
          origin: "string",
          code: "invalid_format",
          format: "ends_with",
          suffix: U.suffix,
          input: X.value,
          inst: $,
          continue: !U.abort,
        });
      }));
  });
function fY($, U, v) {
  if ($.issues.length) U.issues.push(...p$(v, $.issues));
}
var D0 = O("$ZodCheckProperty", ($, U) => {
    (Y$.init($, U),
      ($._zod.check = (v) => {
        let X = U.schema._zod.run({ value: v.value[U.property], issues: [] }, {});
        if (X instanceof Promise) return X.then((z) => fY(z, v, U.property));
        fY(X, v, U.property);
        return;
      }));
  }),
  K0 = O("$ZodCheckMimeType", ($, U) => {
    Y$.init($, U);
    let v = new Set(U.mime);
    ($._zod.onattach.push((X) => {
      X._zod.bag.mime = U.mime;
    }),
      ($._zod.check = (X) => {
        if (v.has(X.value.type)) return;
        X.issues.push({ code: "invalid_value", values: U.mime, input: X.value.type, inst: $, continue: !U.abort });
      }));
  }),
  b0 = O("$ZodCheckOverwrite", ($, U) => {
    (Y$.init($, U),
      ($._zod.check = (v) => {
        v.value = U.tx(v.value);
      }));
  });
class mU {
  constructor($ = []) {
    if (((this.content = []), (this.indent = 0), this)) this.args = $;
  }
  indented($) {
    ((this.indent += 1), $(this), (this.indent -= 1));
  }
  write($) {
    if (typeof $ === "function") {
      ($(this, { execution: "sync" }), $(this, { execution: "async" }));
      return;
    }
    let v = $.split(
        `
`,
      ).filter((J) => J),
      X = Math.min(...v.map((J) => J.length - J.trimStart().length)),
      z = v.map((J) => J.slice(X)).map((J) => " ".repeat(this.indent * 2) + J);
    for (let J of z) this.content.push(J);
  }
  compile() {
    let $ = Function,
      U = this?.args,
      X = [...(this?.content ?? [""]).map((z) => `  ${z}`)];
    return new $(
      ...U,
      X.join(`
`),
    );
  }
}
var L0 = { major: 4, minor: 1, patch: 11 };
var m = O("$ZodType", ($, U) => {
    var v;
    ($ ?? ($ = {}), ($._zod.def = U), ($._zod.bag = $._zod.bag || {}), ($._zod.version = L0));
    let X = [...($._zod.def.checks ?? [])];
    if ($._zod.traits.has("$ZodCheck")) X.unshift($);
    for (let z of X) for (let J of z._zod.onattach) J($);
    if (X.length === 0)
      ((v = $._zod).deferred ?? (v.deferred = []),
        $._zod.deferred?.push(() => {
          $._zod.run = $._zod.parse;
        }));
    else {
      let z = (j, Q, W) => {
          let w = p6(j),
            N;
          for (let D of Q) {
            if (D._zod.def.when) {
              if (!D._zod.def.when(j)) continue;
            } else if (w) continue;
            let H = j.issues.length,
              G = D._zod.check(j);
            if (G instanceof Promise && W?.async === !1) throw new D6();
            if (N || G instanceof Promise)
              N = (N ?? Promise.resolve()).then(async () => {
                if ((await G, j.issues.length === H)) return;
                if (!w) w = p6(j, H);
              });
            else {
              if (j.issues.length === H) continue;
              if (!w) w = p6(j, H);
            }
          }
          if (N)
            return N.then(() => {
              return j;
            });
          return j;
        },
        J = (j, Q, W) => {
          if (p6(j)) return ((j.aborted = !0), j);
          let w = z(Q, X, W);
          if (w instanceof Promise) {
            if (W.async === !1) throw new D6();
            return w.then((N) => $._zod.parse(N, W));
          }
          return $._zod.parse(w, W);
        };
      $._zod.run = (j, Q) => {
        if (Q.skipChecks) return $._zod.parse(j, Q);
        if (Q.direction === "backward") {
          let w = $._zod.parse({ value: j.value, issues: [] }, { ...Q, skipChecks: !0 });
          if (w instanceof Promise)
            return w.then((N) => {
              return J(N, j, Q);
            });
          return J(w, j, Q);
        }
        let W = $._zod.parse(j, Q);
        if (W instanceof Promise) {
          if (Q.async === !1) throw new D6();
          return W.then((w) => z(w, X, Q));
        }
        return z(W, X, Q);
      };
    }
    $["~standard"] = {
      validate: (z) => {
        try {
          let J = Ev($, z);
          return J.success ? { value: J.data } : { issues: J.error?.issues };
        } catch (J) {
          return _v($, z).then((j) => (j.success ? { value: j.data } : { issues: j.error?.issues }));
        }
      },
      vendor: "zod",
      version: 1,
    };
  }),
  Y4 = O("$ZodString", ($, U) => {
    (m.init($, U),
      ($._zod.pattern = [...($?._zod.bag?.patterns ?? [])].pop() ?? pv($._zod.bag)),
      ($._zod.parse = (v, X) => {
        if (U.coerce)
          try {
            v.value = String(v.value);
          } catch (z) {}
        if (typeof v.value === "string") return v;
        return (v.issues.push({ expected: "string", code: "invalid_type", input: v.value, inst: $ }), v);
      }));
  }),
  U$ = O("$ZodStringFormat", ($, U) => {
    (M4.init($, U), Y4.init($, U));
  }),
  V0 = O("$ZodGUID", ($, U) => {
    (U.pattern ?? (U.pattern = Cv), U$.init($, U));
  }),
  A0 = O("$ZodUUID", ($, U) => {
    if (U.version) {
      let X = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[U.version];
      if (X === void 0) throw Error(`Invalid UUID version: "${U.version}"`);
      U.pattern ?? (U.pattern = Q4(X));
    } else U.pattern ?? (U.pattern = Q4());
    U$.init($, U);
  }),
  F0 = O("$ZodEmail", ($, U) => {
    (U.pattern ?? (U.pattern = xv), U$.init($, U));
  }),
  E0 = O("$ZodURL", ($, U) => {
    (U$.init($, U),
      ($._zod.check = (v) => {
        try {
          let X = v.value.trim(),
            z = new URL(X);
          if (U.hostname) {
            if (((U.hostname.lastIndex = 0), !U.hostname.test(z.hostname)))
              v.issues.push({
                code: "invalid_format",
                format: "url",
                note: "Invalid hostname",
                pattern: cv.source,
                input: v.value,
                inst: $,
                continue: !U.abort,
              });
          }
          if (U.protocol) {
            if (
              ((U.protocol.lastIndex = 0),
              !U.protocol.test(z.protocol.endsWith(":") ? z.protocol.slice(0, -1) : z.protocol))
            )
              v.issues.push({
                code: "invalid_format",
                format: "url",
                note: "Invalid protocol",
                pattern: U.protocol.source,
                input: v.value,
                inst: $,
                continue: !U.abort,
              });
          }
          if (U.normalize) v.value = z.href;
          else v.value = X;
          return;
        } catch (X) {
          v.issues.push({ code: "invalid_format", format: "url", input: v.value, inst: $, continue: !U.abort });
        }
      }));
  }),
  _0 = O("$ZodEmoji", ($, U) => {
    (U.pattern ?? (U.pattern = gv()), U$.init($, U));
  }),
  M0 = O("$ZodNanoID", ($, U) => {
    (U.pattern ?? (U.pattern = Zv), U$.init($, U));
  }),
  P0 = O("$ZodCUID", ($, U) => {
    (U.pattern ?? (U.pattern = Mv), U$.init($, U));
  }),
  S0 = O("$ZodCUID2", ($, U) => {
    (U.pattern ?? (U.pattern = Pv), U$.init($, U));
  }),
  R0 = O("$ZodULID", ($, U) => {
    (U.pattern ?? (U.pattern = Sv), U$.init($, U));
  }),
  k0 = O("$ZodXID", ($, U) => {
    (U.pattern ?? (U.pattern = Rv), U$.init($, U));
  }),
  Z0 = O("$ZodKSUID", ($, U) => {
    (U.pattern ?? (U.pattern = kv), U$.init($, U));
  }),
  T0 = O("$ZodISODateTime", ($, U) => {
    (U.pattern ?? (U.pattern = dv(U)), U$.init($, U));
  }),
  C0 = O("$ZodISODate", ($, U) => {
    (U.pattern ?? (U.pattern = nv), U$.init($, U));
  }),
  x0 = O("$ZodISOTime", ($, U) => {
    (U.pattern ?? (U.pattern = lv(U)), U$.init($, U));
  }),
  g0 = O("$ZodISODuration", ($, U) => {
    (U.pattern ?? (U.pattern = Tv), U$.init($, U));
  }),
  f0 = O("$ZodIPv4", ($, U) => {
    (U.pattern ?? (U.pattern = fv),
      U$.init($, U),
      $._zod.onattach.push((v) => {
        let X = v._zod.bag;
        X.format = "ipv4";
      }));
  }),
  h0 = O("$ZodIPv6", ($, U) => {
    (U.pattern ?? (U.pattern = hv),
      U$.init($, U),
      $._zod.onattach.push((v) => {
        let X = v._zod.bag;
        X.format = "ipv6";
      }),
      ($._zod.check = (v) => {
        try {
          new URL(`http://[${v.value}]`);
        } catch {
          v.issues.push({ code: "invalid_format", format: "ipv6", input: v.value, inst: $, continue: !U.abort });
        }
      }));
  }),
  y0 = O("$ZodCIDRv4", ($, U) => {
    (U.pattern ?? (U.pattern = yv), U$.init($, U));
  }),
  m0 = O("$ZodCIDRv6", ($, U) => {
    (U.pattern ?? (U.pattern = mv),
      U$.init($, U),
      ($._zod.check = (v) => {
        let X = v.value.split("/");
        try {
          if (X.length !== 2) throw Error();
          let [z, J] = X;
          if (!J) throw Error();
          let j = Number(J);
          if (`${j}` !== J) throw Error();
          if (j < 0 || j > 128) throw Error();
          new URL(`http://[${z}]`);
        } catch {
          v.issues.push({ code: "invalid_format", format: "cidrv6", input: v.value, inst: $, continue: !U.abort });
        }
      }));
  });
function u0($) {
  if ($ === "") return !0;
  if ($.length % 4 !== 0) return !1;
  try {
    return (atob($), !0);
  } catch {
    return !1;
  }
}
var c0 = O("$ZodBase64", ($, U) => {
  (U.pattern ?? (U.pattern = uv),
    U$.init($, U),
    $._zod.onattach.push((v) => {
      v._zod.bag.contentEncoding = "base64";
    }),
    ($._zod.check = (v) => {
      if (u0(v.value)) return;
      v.issues.push({ code: "invalid_format", format: "base64", input: v.value, inst: $, continue: !U.abort });
    }));
});
function tY($) {
  if (!fU.test($)) return !1;
  let U = $.replace(/[-_]/g, (X) => (X === "-" ? "+" : "/")),
    v = U.padEnd(Math.ceil(U.length / 4) * 4, "=");
  return u0(v);
}
var i0 = O("$ZodBase64URL", ($, U) => {
    (U.pattern ?? (U.pattern = fU),
      U$.init($, U),
      $._zod.onattach.push((v) => {
        v._zod.bag.contentEncoding = "base64url";
      }),
      ($._zod.check = (v) => {
        if (tY(v.value)) return;
        v.issues.push({ code: "invalid_format", format: "base64url", input: v.value, inst: $, continue: !U.abort });
      }));
  }),
  n0 = O("$ZodE164", ($, U) => {
    (U.pattern ?? (U.pattern = iv), U$.init($, U));
  });
function aY($, U = null) {
  try {
    let v = $.split(".");
    if (v.length !== 3) return !1;
    let [X] = v;
    if (!X) return !1;
    let z = JSON.parse(atob(X));
    if ("typ" in z && z?.typ !== "JWT") return !1;
    if (!z.alg) return !1;
    if (U && (!("alg" in z) || z.alg !== U)) return !1;
    return !0;
  } catch {
    return !1;
  }
}
var l0 = O("$ZodJWT", ($, U) => {
    (U$.init($, U),
      ($._zod.check = (v) => {
        if (aY(v.value, U.alg)) return;
        v.issues.push({ code: "invalid_format", format: "jwt", input: v.value, inst: $, continue: !U.abort });
      }));
  }),
  d0 = O("$ZodCustomStringFormat", ($, U) => {
    (U$.init($, U),
      ($._zod.check = (v) => {
        if (U.fn(v.value)) return;
        v.issues.push({ code: "invalid_format", format: U.format, input: v.value, inst: $, continue: !U.abort });
      }));
  }),
  dU = O("$ZodNumber", ($, U) => {
    (m.init($, U),
      ($._zod.pattern = $._zod.bag.pattern ?? tv),
      ($._zod.parse = (v, X) => {
        if (U.coerce)
          try {
            v.value = Number(v.value);
          } catch (j) {}
        let z = v.value;
        if (typeof z === "number" && !Number.isNaN(z) && Number.isFinite(z)) return v;
        let J = typeof z === "number" ? (Number.isNaN(z) ? "NaN" : !Number.isFinite(z) ? "Infinity" : void 0) : void 0;
        return (
          v.issues.push({ expected: "number", code: "invalid_type", input: z, inst: $, ...(J ? { received: J } : {}) }),
          v
        );
      }));
  }),
  p0 = O("$ZodNumber", ($, U) => {
    (v0.init($, U), dU.init($, U));
  }),
  O1 = O("$ZodBoolean", ($, U) => {
    (m.init($, U),
      ($._zod.pattern = av),
      ($._zod.parse = (v, X) => {
        if (U.coerce)
          try {
            v.value = Boolean(v.value);
          } catch (J) {}
        let z = v.value;
        if (typeof z === "boolean") return v;
        return (v.issues.push({ expected: "boolean", code: "invalid_type", input: z, inst: $ }), v);
      }));
  }),
  pU = O("$ZodBigInt", ($, U) => {
    (m.init($, U),
      ($._zod.pattern = rv),
      ($._zod.parse = (v, X) => {
        if (U.coerce)
          try {
            v.value = BigInt(v.value);
          } catch (z) {}
        if (typeof v.value === "bigint") return v;
        return (v.issues.push({ expected: "bigint", code: "invalid_type", input: v.value, inst: $ }), v);
      }));
  }),
  r0 = O("$ZodBigInt", ($, U) => {
    (X0.init($, U), pU.init($, U));
  }),
  o0 = O("$ZodSymbol", ($, U) => {
    (m.init($, U),
      ($._zod.parse = (v, X) => {
        let z = v.value;
        if (typeof z === "symbol") return v;
        return (v.issues.push({ expected: "symbol", code: "invalid_type", input: z, inst: $ }), v);
      }));
  }),
  t0 = O("$ZodUndefined", ($, U) => {
    (m.init($, U),
      ($._zod.pattern = ev),
      ($._zod.values = new Set([void 0])),
      ($._zod.optin = "optional"),
      ($._zod.optout = "optional"),
      ($._zod.parse = (v, X) => {
        let z = v.value;
        if (typeof z > "u") return v;
        return (v.issues.push({ expected: "undefined", code: "invalid_type", input: z, inst: $ }), v);
      }));
  }),
  a0 = O("$ZodNull", ($, U) => {
    (m.init($, U),
      ($._zod.pattern = sv),
      ($._zod.values = new Set([null])),
      ($._zod.parse = (v, X) => {
        let z = v.value;
        if (z === null) return v;
        return (v.issues.push({ expected: "null", code: "invalid_type", input: z, inst: $ }), v);
      }));
  }),
  s0 = O("$ZodAny", ($, U) => {
    (m.init($, U), ($._zod.parse = (v) => v));
  }),
  e0 = O("$ZodUnknown", ($, U) => {
    (m.init($, U), ($._zod.parse = (v) => v));
  }),
  $X = O("$ZodNever", ($, U) => {
    (m.init($, U),
      ($._zod.parse = (v, X) => {
        return (v.issues.push({ expected: "never", code: "invalid_type", input: v.value, inst: $ }), v);
      }));
  }),
  UX = O("$ZodVoid", ($, U) => {
    (m.init($, U),
      ($._zod.parse = (v, X) => {
        let z = v.value;
        if (typeof z > "u") return v;
        return (v.issues.push({ expected: "void", code: "invalid_type", input: z, inst: $ }), v);
      }));
  }),
  zX = O("$ZodDate", ($, U) => {
    (m.init($, U),
      ($._zod.parse = (v, X) => {
        if (U.coerce)
          try {
            v.value = new Date(v.value);
          } catch (Q) {}
        let z = v.value,
          J = z instanceof Date;
        if (J && !Number.isNaN(z.getTime())) return v;
        return (
          v.issues.push({
            expected: "date",
            code: "invalid_type",
            input: z,
            ...(J ? { received: "Invalid Date" } : {}),
            inst: $,
          }),
          v
        );
      }));
  });
function mY($, U, v) {
  if ($.issues.length) U.issues.push(...p$(v, $.issues));
  U.value[v] = $.value;
}
var vX = O("$ZodArray", ($, U) => {
  (m.init($, U),
    ($._zod.parse = (v, X) => {
      let z = v.value;
      if (!Array.isArray(z)) return (v.issues.push({ expected: "array", code: "invalid_type", input: z, inst: $ }), v);
      v.value = Array(z.length);
      let J = [];
      for (let j = 0; j < z.length; j++) {
        let Q = z[j],
          W = U.element._zod.run({ value: Q, issues: [] }, X);
        if (W instanceof Promise) J.push(W.then((w) => mY(w, v, j)));
        else mY(W, v, j);
      }
      if (J.length) return Promise.all(J).then(() => v);
      return v;
    }));
});
function lU($, U, v, X) {
  if ($.issues.length) U.issues.push(...p$(v, $.issues));
  if ($.value === void 0) {
    if (v in X) U.value[v] = void 0;
  } else U.value[v] = $.value;
}
function sY($) {
  let U = Object.keys($.shape);
  for (let X of U)
    if (!$.shape?.[X]?._zod?.traits?.has("$ZodType"))
      throw Error(`Invalid element at key "${X}": expected a Zod schema`);
  let v = Lv($.shape);
  return { ...$, keys: U, keySet: new Set(U), numKeys: U.length, optionalKeys: new Set(v) };
}
function eY($, U, v, X, z, J) {
  let j = [],
    Q = z.keySet,
    W = z.catchall._zod,
    w = W.def.type;
  for (let N of Object.keys(U)) {
    if (Q.has(N)) continue;
    if (w === "never") {
      j.push(N);
      continue;
    }
    let D = W.run({ value: U[N], issues: [] }, X);
    if (D instanceof Promise) $.push(D.then((H) => lU(H, v, N, U)));
    else lU(D, v, N, U);
  }
  if (j.length) v.issues.push({ code: "unrecognized_keys", keys: j, input: U, inst: J });
  if (!$.length) return v;
  return Promise.all($).then(() => {
    return v;
  });
}
var $W = O("$ZodObject", ($, U) => {
    if ((m.init($, U), !Object.getOwnPropertyDescriptor(U, "shape")?.get)) {
      let Q = U.shape;
      Object.defineProperty(U, "shape", {
        get: () => {
          let W = { ...Q };
          return (Object.defineProperty(U, "shape", { value: W }), W);
        },
      });
    }
    let X = I4(() => sY(U));
    d($._zod, "propValues", () => {
      let Q = U.shape,
        W = {};
      for (let w in Q) {
        let N = Q[w]._zod;
        if (N.values) {
          W[w] ?? (W[w] = new Set());
          for (let D of N.values) W[w].add(D);
        }
      }
      return W;
    });
    let z = j4,
      J = U.catchall,
      j;
    $._zod.parse = (Q, W) => {
      j ?? (j = X.value);
      let w = Q.value;
      if (!z(w)) return (Q.issues.push({ expected: "object", code: "invalid_type", input: w, inst: $ }), Q);
      Q.value = {};
      let N = [],
        D = j.shape;
      for (let H of j.keys) {
        let q = D[H]._zod.run({ value: w[H], issues: [] }, W);
        if (q instanceof Promise) N.push(q.then((B) => lU(B, Q, H, w)));
        else lU(q, Q, H, w);
      }
      if (!J) return N.length ? Promise.all(N).then(() => Q) : Q;
      return eY(N, w, Q, W, X.value, $);
    };
  }),
  XX = O("$ZodObjectJIT", ($, U) => {
    $W.init($, U);
    let v = $._zod.parse,
      X = I4(() => sY(U)),
      z = (H) => {
        let G = new mU(["shape", "payload", "ctx"]),
          q = X.value,
          B = (T) => {
            let K = EU(T);
            return `shape[${K}]._zod.run({ value: input[${K}], issues: [] }, ctx)`;
          };
        G.write("const input = payload.value;");
        let I = Object.create(null),
          L = 0;
        for (let T of q.keys) I[T] = `key_${L++}`;
        G.write("const newResult = {};");
        for (let T of q.keys) {
          let K = I[T],
            y = EU(T);
          (G.write(`const ${K} = ${B(T)};`),
            G.write(`
        if (${K}.issues.length) {
          payload.issues = payload.issues.concat(${K}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${y}, ...iss.path] : [${y}]
          })));
        }
        
        
        if (${K}.value === undefined) {
          if (${y} in input) {
            newResult[${y}] = undefined;
          }
        } else {
          newResult[${y}] = ${K}.value;
        }
        
      `));
        }
        (G.write("payload.value = newResult;"), G.write("return payload;"));
        let S = G.compile();
        return (T, K) => S(H, T, K);
      },
      J,
      j = j4,
      Q = !z1.jitless,
      w = Q && Dv.value,
      N = U.catchall,
      D;
    $._zod.parse = (H, G) => {
      D ?? (D = X.value);
      let q = H.value;
      if (!j(q)) return (H.issues.push({ expected: "object", code: "invalid_type", input: q, inst: $ }), H);
      if (Q && w && G?.async === !1 && G.jitless !== !0) {
        if (!J) J = z(U.shape);
        if (((H = J(H, G)), !N)) return H;
        return eY([], q, H, G, D, $);
      }
      return v(H, G);
    };
  });
function uY($, U, v, X) {
  for (let J of $) if (J.issues.length === 0) return ((U.value = J.value), U);
  let z = $.filter((J) => !p6(J));
  if (z.length === 1) return ((U.value = z[0].value), z[0]);
  return (
    U.issues.push({
      code: "invalid_union",
      input: U.value,
      inst: v,
      errors: $.map((J) => J.issues.map((j) => r$(j, X, D$()))),
    }),
    U
  );
}
var rU = O("$ZodUnion", ($, U) => {
    (m.init($, U),
      d($._zod, "optin", () => (U.options.some((z) => z._zod.optin === "optional") ? "optional" : void 0)),
      d($._zod, "optout", () => (U.options.some((z) => z._zod.optout === "optional") ? "optional" : void 0)),
      d($._zod, "values", () => {
        if (U.options.every((z) => z._zod.values)) return new Set(U.options.flatMap((z) => Array.from(z._zod.values)));
        return;
      }),
      d($._zod, "pattern", () => {
        if (U.options.every((z) => z._zod.pattern)) {
          let z = U.options.map((J) => J._zod.pattern);
          return new RegExp(`^(${z.map((J) => J1(J.source)).join("|")})$`);
        }
        return;
      }));
    let v = U.options.length === 1,
      X = U.options[0]._zod.run;
    $._zod.parse = (z, J) => {
      if (v) return X(z, J);
      let j = !1,
        Q = [];
      for (let W of U.options) {
        let w = W._zod.run({ value: z.value, issues: [] }, J);
        if (w instanceof Promise) (Q.push(w), (j = !0));
        else {
          if (w.issues.length === 0) return w;
          Q.push(w);
        }
      }
      if (!j) return uY(Q, z, $, J);
      return Promise.all(Q).then((W) => {
        return uY(W, z, $, J);
      });
    };
  }),
  JX = O("$ZodDiscriminatedUnion", ($, U) => {
    rU.init($, U);
    let v = $._zod.parse;
    d($._zod, "propValues", () => {
      let z = {};
      for (let J of U.options) {
        let j = J._zod.propValues;
        if (!j || Object.keys(j).length === 0)
          throw Error(`Invalid discriminated union option at index "${U.options.indexOf(J)}"`);
        for (let [Q, W] of Object.entries(j)) {
          if (!z[Q]) z[Q] = new Set();
          for (let w of W) z[Q].add(w);
        }
      }
      return z;
    });
    let X = I4(() => {
      let z = U.options,
        J = new Map();
      for (let j of z) {
        let Q = j._zod.propValues?.[U.discriminator];
        if (!Q || Q.size === 0) throw Error(`Invalid discriminated union option at index "${U.options.indexOf(j)}"`);
        for (let W of Q) {
          if (J.has(W)) throw Error(`Duplicate discriminator value "${String(W)}"`);
          J.set(W, j);
        }
      }
      return J;
    });
    $._zod.parse = (z, J) => {
      let j = z.value;
      if (!j4(j)) return (z.issues.push({ code: "invalid_type", expected: "object", input: j, inst: $ }), z);
      let Q = X.value.get(j?.[U.discriminator]);
      if (Q) return Q._zod.run(z, J);
      if (U.unionFallback) return v(z, J);
      return (
        z.issues.push({
          code: "invalid_union",
          errors: [],
          note: "No matching discriminator",
          discriminator: U.discriminator,
          input: j,
          path: [U.discriminator],
          inst: $,
        }),
        z
      );
    };
  }),
  jX = O("$ZodIntersection", ($, U) => {
    (m.init($, U),
      ($._zod.parse = (v, X) => {
        let z = v.value,
          J = U.left._zod.run({ value: z, issues: [] }, X),
          j = U.right._zod.run({ value: z, issues: [] }, X);
        if (J instanceof Promise || j instanceof Promise)
          return Promise.all([J, j]).then(([W, w]) => {
            return cY(v, W, w);
          });
        return cY(v, J, j);
      }));
  });
function I0($, U) {
  if ($ === U) return { valid: !0, data: $ };
  if ($ instanceof Date && U instanceof Date && +$ === +U) return { valid: !0, data: $ };
  if (d6($) && d6(U)) {
    let v = Object.keys(U),
      X = Object.keys($).filter((J) => v.indexOf(J) !== -1),
      z = { ...$, ...U };
    for (let J of X) {
      let j = I0($[J], U[J]);
      if (!j.valid) return { valid: !1, mergeErrorPath: [J, ...j.mergeErrorPath] };
      z[J] = j.data;
    }
    return { valid: !0, data: z };
  }
  if (Array.isArray($) && Array.isArray(U)) {
    if ($.length !== U.length) return { valid: !1, mergeErrorPath: [] };
    let v = [];
    for (let X = 0; X < $.length; X++) {
      let z = $[X],
        J = U[X],
        j = I0(z, J);
      if (!j.valid) return { valid: !1, mergeErrorPath: [X, ...j.mergeErrorPath] };
      v.push(j.data);
    }
    return { valid: !0, data: v };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function cY($, U, v) {
  if (U.issues.length) $.issues.push(...U.issues);
  if (v.issues.length) $.issues.push(...v.issues);
  if (p6($)) return $;
  let X = I0(U.value, v.value);
  if (!X.valid) throw Error(`Unmergable intersection. Error path: ${JSON.stringify(X.mergeErrorPath)}`);
  return (($.value = X.data), $);
}
var oU = O("$ZodTuple", ($, U) => {
  m.init($, U);
  let v = U.items,
    X = v.length - [...v].reverse().findIndex((z) => z._zod.optin !== "optional");
  $._zod.parse = (z, J) => {
    let j = z.value;
    if (!Array.isArray(j)) return (z.issues.push({ input: j, inst: $, expected: "tuple", code: "invalid_type" }), z);
    z.value = [];
    let Q = [];
    if (!U.rest) {
      let w = j.length > v.length,
        N = j.length < X - 1;
      if (w || N)
        return (
          z.issues.push({
            ...(w ? { code: "too_big", maximum: v.length } : { code: "too_small", minimum: v.length }),
            input: j,
            inst: $,
            origin: "array",
          }),
          z
        );
    }
    let W = -1;
    for (let w of v) {
      if ((W++, W >= j.length)) {
        if (W >= X) continue;
      }
      let N = w._zod.run({ value: j[W], issues: [] }, J);
      if (N instanceof Promise) Q.push(N.then((D) => uU(D, z, W)));
      else uU(N, z, W);
    }
    if (U.rest) {
      let w = j.slice(v.length);
      for (let N of w) {
        W++;
        let D = U.rest._zod.run({ value: N, issues: [] }, J);
        if (D instanceof Promise) Q.push(D.then((H) => uU(H, z, W)));
        else uU(D, z, W);
      }
    }
    if (Q.length) return Promise.all(Q).then(() => z);
    return z;
  };
});
function uU($, U, v) {
  if ($.issues.length) U.issues.push(...p$(v, $.issues));
  U.value[v] = $.value;
}
var QX = O("$ZodRecord", ($, U) => {
    (m.init($, U),
      ($._zod.parse = (v, X) => {
        let z = v.value;
        if (!d6(z)) return (v.issues.push({ expected: "record", code: "invalid_type", input: z, inst: $ }), v);
        let J = [];
        if (U.keyType._zod.values) {
          let j = U.keyType._zod.values;
          v.value = {};
          for (let W of j)
            if (typeof W === "string" || typeof W === "number" || typeof W === "symbol") {
              let w = U.valueType._zod.run({ value: z[W], issues: [] }, X);
              if (w instanceof Promise)
                J.push(
                  w.then((N) => {
                    if (N.issues.length) v.issues.push(...p$(W, N.issues));
                    v.value[W] = N.value;
                  }),
                );
              else {
                if (w.issues.length) v.issues.push(...p$(W, w.issues));
                v.value[W] = w.value;
              }
            }
          let Q;
          for (let W in z) if (!j.has(W)) ((Q = Q ?? []), Q.push(W));
          if (Q && Q.length > 0) v.issues.push({ code: "unrecognized_keys", input: z, inst: $, keys: Q });
        } else {
          v.value = {};
          for (let j of Reflect.ownKeys(z)) {
            if (j === "__proto__") continue;
            let Q = U.keyType._zod.run({ value: j, issues: [] }, X);
            if (Q instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if (Q.issues.length) {
              (v.issues.push({
                code: "invalid_key",
                origin: "record",
                issues: Q.issues.map((w) => r$(w, X, D$())),
                input: j,
                path: [j],
                inst: $,
              }),
                (v.value[Q.value] = Q.value));
              continue;
            }
            let W = U.valueType._zod.run({ value: z[j], issues: [] }, X);
            if (W instanceof Promise)
              J.push(
                W.then((w) => {
                  if (w.issues.length) v.issues.push(...p$(j, w.issues));
                  v.value[Q.value] = w.value;
                }),
              );
            else {
              if (W.issues.length) v.issues.push(...p$(j, W.issues));
              v.value[Q.value] = W.value;
            }
          }
        }
        if (J.length) return Promise.all(J).then(() => v);
        return v;
      }));
  }),
  YX = O("$ZodMap", ($, U) => {
    (m.init($, U),
      ($._zod.parse = (v, X) => {
        let z = v.value;
        if (!(z instanceof Map))
          return (v.issues.push({ expected: "map", code: "invalid_type", input: z, inst: $ }), v);
        let J = [];
        v.value = new Map();
        for (let [j, Q] of z) {
          let W = U.keyType._zod.run({ value: j, issues: [] }, X),
            w = U.valueType._zod.run({ value: Q, issues: [] }, X);
          if (W instanceof Promise || w instanceof Promise)
            J.push(
              Promise.all([W, w]).then(([N, D]) => {
                iY(N, D, v, j, z, $, X);
              }),
            );
          else iY(W, w, v, j, z, $, X);
        }
        if (J.length) return Promise.all(J).then(() => v);
        return v;
      }));
  });
function iY($, U, v, X, z, J, j) {
  if ($.issues.length)
    if (j1.has(typeof X)) v.issues.push(...p$(X, $.issues));
    else
      v.issues.push({
        code: "invalid_key",
        origin: "map",
        input: z,
        inst: J,
        issues: $.issues.map((Q) => r$(Q, j, D$())),
      });
  if (U.issues.length)
    if (j1.has(typeof X)) v.issues.push(...p$(X, U.issues));
    else
      v.issues.push({
        origin: "map",
        code: "invalid_element",
        input: z,
        inst: J,
        key: X,
        issues: U.issues.map((Q) => r$(Q, j, D$())),
      });
  v.value.set($.value, U.value);
}
var WX = O("$ZodSet", ($, U) => {
  (m.init($, U),
    ($._zod.parse = (v, X) => {
      let z = v.value;
      if (!(z instanceof Set)) return (v.issues.push({ input: z, inst: $, expected: "set", code: "invalid_type" }), v);
      let J = [];
      v.value = new Set();
      for (let j of z) {
        let Q = U.valueType._zod.run({ value: j, issues: [] }, X);
        if (Q instanceof Promise) J.push(Q.then((W) => nY(W, v)));
        else nY(Q, v);
      }
      if (J.length) return Promise.all(J).then(() => v);
      return v;
    }));
});
function nY($, U) {
  if ($.issues.length) U.issues.push(...$.issues);
  U.value.add($.value);
}
var wX = O("$ZodEnum", ($, U) => {
    m.init($, U);
    let v = X1(U.entries),
      X = new Set(v);
    (($._zod.values = X),
      ($._zod.pattern = new RegExp(
        `^(${v
          .filter((z) => j1.has(typeof z))
          .map((z) => (typeof z === "string" ? K6(z) : z.toString()))
          .join("|")})$`,
      )),
      ($._zod.parse = (z, J) => {
        let j = z.value;
        if (X.has(j)) return z;
        return (z.issues.push({ code: "invalid_value", values: v, input: j, inst: $ }), z);
      }));
  }),
  GX = O("$ZodLiteral", ($, U) => {
    if ((m.init($, U), U.values.length === 0)) throw Error("Cannot create literal schema with no valid values");
    (($._zod.values = new Set(U.values)),
      ($._zod.pattern = new RegExp(
        `^(${U.values.map((v) => (typeof v === "string" ? K6(v) : v ? K6(v.toString()) : String(v))).join("|")})$`,
      )),
      ($._zod.parse = (v, X) => {
        let z = v.value;
        if ($._zod.values.has(z)) return v;
        return (v.issues.push({ code: "invalid_value", values: U.values, input: z, inst: $ }), v);
      }));
  }),
  NX = O("$ZodFile", ($, U) => {
    (m.init($, U),
      ($._zod.parse = (v, X) => {
        let z = v.value;
        if (z instanceof File) return v;
        return (v.issues.push({ expected: "file", code: "invalid_type", input: z, inst: $ }), v);
      }));
  }),
  qX = O("$ZodTransform", ($, U) => {
    (m.init($, U),
      ($._zod.parse = (v, X) => {
        if (X.direction === "backward") throw new J4($.constructor.name);
        let z = U.transform(v.value, v);
        if (X.async)
          return (z instanceof Promise ? z : Promise.resolve(z)).then((j) => {
            return ((v.value = j), v);
          });
        if (z instanceof Promise) throw new D6();
        return ((v.value = z), v);
      }));
  });
function lY($, U) {
  if ($.issues.length && U === void 0) return { issues: [], value: void 0 };
  return $;
}
var OX = O("$ZodOptional", ($, U) => {
    (m.init($, U),
      ($._zod.optin = "optional"),
      ($._zod.optout = "optional"),
      d($._zod, "values", () => {
        return U.innerType._zod.values ? new Set([...U.innerType._zod.values, void 0]) : void 0;
      }),
      d($._zod, "pattern", () => {
        let v = U.innerType._zod.pattern;
        return v ? new RegExp(`^(${J1(v.source)})?$`) : void 0;
      }),
      ($._zod.parse = (v, X) => {
        if (U.innerType._zod.optin === "optional") {
          let z = U.innerType._zod.run(v, X);
          if (z instanceof Promise) return z.then((J) => lY(J, v.value));
          return lY(z, v.value);
        }
        if (v.value === void 0) return v;
        return U.innerType._zod.run(v, X);
      }));
  }),
  HX = O("$ZodNullable", ($, U) => {
    (m.init($, U),
      d($._zod, "optin", () => U.innerType._zod.optin),
      d($._zod, "optout", () => U.innerType._zod.optout),
      d($._zod, "pattern", () => {
        let v = U.innerType._zod.pattern;
        return v ? new RegExp(`^(${J1(v.source)}|null)$`) : void 0;
      }),
      d($._zod, "values", () => {
        return U.innerType._zod.values ? new Set([...U.innerType._zod.values, null]) : void 0;
      }),
      ($._zod.parse = (v, X) => {
        if (v.value === null) return v;
        return U.innerType._zod.run(v, X);
      }));
  }),
  BX = O("$ZodDefault", ($, U) => {
    (m.init($, U),
      ($._zod.optin = "optional"),
      d($._zod, "values", () => U.innerType._zod.values),
      ($._zod.parse = (v, X) => {
        if (X.direction === "backward") return U.innerType._zod.run(v, X);
        if (v.value === void 0) return ((v.value = U.defaultValue), v);
        let z = U.innerType._zod.run(v, X);
        if (z instanceof Promise) return z.then((J) => dY(J, U));
        return dY(z, U);
      }));
  });
function dY($, U) {
  if ($.value === void 0) $.value = U.defaultValue;
  return $;
}
var DX = O("$ZodPrefault", ($, U) => {
    (m.init($, U),
      ($._zod.optin = "optional"),
      d($._zod, "values", () => U.innerType._zod.values),
      ($._zod.parse = (v, X) => {
        if (X.direction === "backward") return U.innerType._zod.run(v, X);
        if (v.value === void 0) v.value = U.defaultValue;
        return U.innerType._zod.run(v, X);
      }));
  }),
  KX = O("$ZodNonOptional", ($, U) => {
    (m.init($, U),
      d($._zod, "values", () => {
        let v = U.innerType._zod.values;
        return v ? new Set([...v].filter((X) => X !== void 0)) : void 0;
      }),
      ($._zod.parse = (v, X) => {
        let z = U.innerType._zod.run(v, X);
        if (z instanceof Promise) return z.then((J) => pY(J, $));
        return pY(z, $);
      }));
  });
function pY($, U) {
  if (!$.issues.length && $.value === void 0)
    $.issues.push({ code: "invalid_type", expected: "nonoptional", input: $.value, inst: U });
  return $;
}
var bX = O("$ZodSuccess", ($, U) => {
    (m.init($, U),
      ($._zod.parse = (v, X) => {
        if (X.direction === "backward") throw new J4("ZodSuccess");
        let z = U.innerType._zod.run(v, X);
        if (z instanceof Promise)
          return z.then((J) => {
            return ((v.value = J.issues.length === 0), v);
          });
        return ((v.value = z.issues.length === 0), v);
      }));
  }),
  LX = O("$ZodCatch", ($, U) => {
    (m.init($, U),
      d($._zod, "optin", () => U.innerType._zod.optin),
      d($._zod, "optout", () => U.innerType._zod.optout),
      d($._zod, "values", () => U.innerType._zod.values),
      ($._zod.parse = (v, X) => {
        if (X.direction === "backward") return U.innerType._zod.run(v, X);
        let z = U.innerType._zod.run(v, X);
        if (z instanceof Promise)
          return z.then((J) => {
            if (((v.value = J.value), J.issues.length))
              ((v.value = U.catchValue({
                ...v,
                error: { issues: J.issues.map((j) => r$(j, X, D$())) },
                input: v.value,
              })),
                (v.issues = []));
            return v;
          });
        if (((v.value = z.value), z.issues.length))
          ((v.value = U.catchValue({ ...v, error: { issues: z.issues.map((J) => r$(J, X, D$())) }, input: v.value })),
            (v.issues = []));
        return v;
      }));
  }),
  IX = O("$ZodNaN", ($, U) => {
    (m.init($, U),
      ($._zod.parse = (v, X) => {
        if (typeof v.value !== "number" || !Number.isNaN(v.value))
          return (v.issues.push({ input: v.value, inst: $, expected: "nan", code: "invalid_type" }), v);
        return v;
      }));
  }),
  VX = O("$ZodPipe", ($, U) => {
    (m.init($, U),
      d($._zod, "values", () => U.in._zod.values),
      d($._zod, "optin", () => U.in._zod.optin),
      d($._zod, "optout", () => U.out._zod.optout),
      d($._zod, "propValues", () => U.in._zod.propValues),
      ($._zod.parse = (v, X) => {
        if (X.direction === "backward") {
          let J = U.out._zod.run(v, X);
          if (J instanceof Promise) return J.then((j) => cU(j, U.in, X));
          return cU(J, U.in, X);
        }
        let z = U.in._zod.run(v, X);
        if (z instanceof Promise) return z.then((J) => cU(J, U.out, X));
        return cU(z, U.out, X);
      }));
  });
function cU($, U, v) {
  if ($.issues.length) return (($.aborted = !0), $);
  return U._zod.run({ value: $.value, issues: $.issues }, v);
}
var H1 = O("$ZodCodec", ($, U) => {
  (m.init($, U),
    d($._zod, "values", () => U.in._zod.values),
    d($._zod, "optin", () => U.in._zod.optin),
    d($._zod, "optout", () => U.out._zod.optout),
    d($._zod, "propValues", () => U.in._zod.propValues),
    ($._zod.parse = (v, X) => {
      if ((X.direction || "forward") === "forward") {
        let J = U.in._zod.run(v, X);
        if (J instanceof Promise) return J.then((j) => iU(j, U, X));
        return iU(J, U, X);
      } else {
        let J = U.out._zod.run(v, X);
        if (J instanceof Promise) return J.then((j) => iU(j, U, X));
        return iU(J, U, X);
      }
    }));
});
function iU($, U, v) {
  if ($.issues.length) return (($.aborted = !0), $);
  if ((v.direction || "forward") === "forward") {
    let z = U.transform($.value, $);
    if (z instanceof Promise) return z.then((J) => nU($, J, U.out, v));
    return nU($, z, U.out, v);
  } else {
    let z = U.reverseTransform($.value, $);
    if (z instanceof Promise) return z.then((J) => nU($, J, U.in, v));
    return nU($, z, U.in, v);
  }
}
function nU($, U, v, X) {
  if ($.issues.length) return (($.aborted = !0), $);
  return v._zod.run({ value: U, issues: $.issues }, X);
}
var AX = O("$ZodReadonly", ($, U) => {
  (m.init($, U),
    d($._zod, "propValues", () => U.innerType._zod.propValues),
    d($._zod, "values", () => U.innerType._zod.values),
    d($._zod, "optin", () => U.innerType._zod.optin),
    d($._zod, "optout", () => U.innerType._zod.optout),
    ($._zod.parse = (v, X) => {
      if (X.direction === "backward") return U.innerType._zod.run(v, X);
      let z = U.innerType._zod.run(v, X);
      if (z instanceof Promise) return z.then(rY);
      return rY(z);
    }));
});
function rY($) {
  return (($.value = Object.freeze($.value)), $);
}
var FX = O("$ZodTemplateLiteral", ($, U) => {
    m.init($, U);
    let v = [];
    for (let X of U.parts)
      if (typeof X === "object" && X !== null) {
        if (!X._zod.pattern)
          throw Error(`Invalid template literal part, no pattern found: ${[...X._zod.traits].shift()}`);
        let z = X._zod.pattern instanceof RegExp ? X._zod.pattern.source : X._zod.pattern;
        if (!z) throw Error(`Invalid template literal part: ${X._zod.traits}`);
        let J = z.startsWith("^") ? 1 : 0,
          j = z.endsWith("$") ? z.length - 1 : z.length;
        v.push(z.slice(J, j));
      } else if (X === null || bv.has(typeof X)) v.push(K6(`${X}`));
      else throw Error(`Invalid template literal part: ${X}`);
    (($._zod.pattern = new RegExp(`^${v.join("")}$`)),
      ($._zod.parse = (X, z) => {
        if (typeof X.value !== "string")
          return (X.issues.push({ input: X.value, inst: $, expected: "template_literal", code: "invalid_type" }), X);
        if ((($._zod.pattern.lastIndex = 0), !$._zod.pattern.test(X.value)))
          return (
            X.issues.push({
              input: X.value,
              inst: $,
              code: "invalid_format",
              format: U.format ?? "template_literal",
              pattern: $._zod.pattern.source,
            }),
            X
          );
        return X;
      }));
  }),
  EX = O("$ZodFunction", ($, U) => {
    return (
      m.init($, U),
      ($._def = U),
      ($._zod.def = U),
      ($.implement = (v) => {
        if (typeof v !== "function") throw Error("implement() must be called with a function");
        return function (...X) {
          let z = $._def.input ? MU($._def.input, X) : X,
            J = Reflect.apply(v, this, z);
          if ($._def.output) return MU($._def.output, J);
          return J;
        };
      }),
      ($.implementAsync = (v) => {
        if (typeof v !== "function") throw Error("implementAsync() must be called with a function");
        return async function (...X) {
          let z = $._def.input ? await PU($._def.input, X) : X,
            J = await Reflect.apply(v, this, z);
          if ($._def.output) return await PU($._def.output, J);
          return J;
        };
      }),
      ($._zod.parse = (v, X) => {
        if (typeof v.value !== "function")
          return (v.issues.push({ code: "invalid_type", expected: "function", input: v.value, inst: $ }), v);
        if ($._def.output && $._def.output._zod.def.type === "promise") v.value = $.implementAsync(v.value);
        else v.value = $.implement(v.value);
        return v;
      }),
      ($.input = (...v) => {
        let X = $.constructor;
        if (Array.isArray(v[0]))
          return new X({
            type: "function",
            input: new oU({ type: "tuple", items: v[0], rest: v[1] }),
            output: $._def.output,
          });
        return new X({ type: "function", input: v[0], output: $._def.output });
      }),
      ($.output = (v) => {
        return new $.constructor({ type: "function", input: $._def.input, output: v });
      }),
      $
    );
  }),
  _X = O("$ZodPromise", ($, U) => {
    (m.init($, U),
      ($._zod.parse = (v, X) => {
        return Promise.resolve(v.value).then((z) => U.innerType._zod.run({ value: z, issues: [] }, X));
      }));
  }),
  MX = O("$ZodLazy", ($, U) => {
    (m.init($, U),
      d($._zod, "innerType", () => U.getter()),
      d($._zod, "pattern", () => $._zod.innerType._zod.pattern),
      d($._zod, "propValues", () => $._zod.innerType._zod.propValues),
      d($._zod, "optin", () => $._zod.innerType._zod.optin ?? void 0),
      d($._zod, "optout", () => $._zod.innerType._zod.optout ?? void 0),
      ($._zod.parse = (v, X) => {
        return $._zod.innerType._zod.run(v, X);
      }));
  }),
  PX = O("$ZodCustom", ($, U) => {
    (Y$.init($, U),
      m.init($, U),
      ($._zod.parse = (v, X) => {
        return v;
      }),
      ($._zod.check = (v) => {
        let X = v.value,
          z = U.fn(X);
        if (z instanceof Promise) return z.then((J) => oY(J, v, X, $));
        oY(z, v, X, $);
        return;
      }));
  });
function oY($, U, v, X) {
  if (!$) {
    let z = { code: "custom", input: v, inst: X, path: [...(X._zod.def.path ?? [])], continue: !X._zod.def.abort };
    if (X._zod.def.params) z.params = X._zod.def.params;
    U.issues.push(V4(z));
  }
}
var I1 = {};
v4(I1, {
  zhTW: () => BJ,
  zhCN: () => HJ,
  yo: () => DJ,
  vi: () => OJ,
  ur: () => qJ,
  uk: () => L1,
  ua: () => NJ,
  tr: () => GJ,
  th: () => wJ,
  ta: () => WJ,
  sv: () => YJ,
  sl: () => QJ,
  ru: () => jJ,
  pt: () => JJ,
  ps: () => vJ,
  pl: () => XJ,
  ota: () => zJ,
  no: () => UJ,
  nl: () => $J,
  ms: () => eX,
  mk: () => sX,
  lt: () => aX,
  ko: () => tX,
  km: () => D1,
  kh: () => oX,
  ka: () => rX,
  ja: () => pX,
  it: () => dX,
  is: () => lX,
  id: () => nX,
  hu: () => iX,
  he: () => cX,
  frCA: () => uX,
  fr: () => mX,
  fi: () => yX,
  fa: () => hX,
  es: () => fX,
  eo: () => gX,
  en: () => B1,
  de: () => xX,
  da: () => CX,
  cs: () => TX,
  ca: () => ZX,
  be: () => kX,
  az: () => RX,
  ar: () => SX,
});
var JN = () => {
  let $ = {
    string: { unit: "حرف", verb: "أن يحوي" },
    file: { unit: "بايت", verb: "أن يحوي" },
    array: { unit: "عنصر", verb: "أن يحوي" },
    set: { unit: "عنصر", verb: "أن يحوي" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(z)) return "array";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "مدخل",
      email: "بريد إلكتروني",
      url: "رابط",
      emoji: "إيموجي",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "تاريخ ووقت بمعيار ISO",
      date: "تاريخ بمعيار ISO",
      time: "وقت بمعيار ISO",
      duration: "مدة بمعيار ISO",
      ipv4: "عنوان IPv4",
      ipv6: "عنوان IPv6",
      cidrv4: "مدى عناوين بصيغة IPv4",
      cidrv6: "مدى عناوين بصيغة IPv6",
      base64: "نَص بترميز base64-encoded",
      base64url: "نَص بترميز base64url-encoded",
      json_string: "نَص على هيئة JSON",
      e164: "رقم هاتف بمعيار E.164",
      jwt: "JWT",
      template_literal: "مدخل",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `مدخلات غير مقبولة: يفترض إدخال ${z.expected}، ولكن تم إدخال ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `مدخلات غير مقبولة: يفترض إدخال ${F(z.values[0])}`;
        return `اختيار غير مقبول: يتوقع انتقاء أحد هذه الخيارات: ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j)
          return ` أكبر من اللازم: يفترض أن تكون ${z.origin ?? "القيمة"} ${J} ${z.maximum.toString()} ${j.unit ?? "عنصر"}`;
        return `أكبر من اللازم: يفترض أن تكون ${z.origin ?? "القيمة"} ${J} ${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `أصغر من اللازم: يفترض لـ ${z.origin} أن يكون ${J} ${z.minimum.toString()} ${j.unit}`;
        return `أصغر من اللازم: يفترض لـ ${z.origin} أن يكون ${J} ${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `نَص غير مقبول: يجب أن يبدأ بـ "${z.prefix}"`;
        if (J.format === "ends_with") return `نَص غير مقبول: يجب أن ينتهي بـ "${J.suffix}"`;
        if (J.format === "includes") return `نَص غير مقبول: يجب أن يتضمَّن "${J.includes}"`;
        if (J.format === "regex") return `نَص غير مقبول: يجب أن يطابق النمط ${J.pattern}`;
        return `${X[J.format] ?? z.format} غير مقبول`;
      }
      case "not_multiple_of":
        return `رقم غير مقبول: يجب أن يكون من مضاعفات ${z.divisor}`;
      case "unrecognized_keys":
        return `معرف${z.keys.length > 1 ? "ات" : ""} غريب${z.keys.length > 1 ? "ة" : ""}: ${b(z.keys, "، ")}`;
      case "invalid_key":
        return `معرف غير مقبول في ${z.origin}`;
      case "invalid_union":
        return "مدخل غير مقبول";
      case "invalid_element":
        return `مدخل غير مقبول في ${z.origin}`;
      default:
        return "مدخل غير مقبول";
    }
  };
};
function SX() {
  return { localeError: JN() };
}
var jN = () => {
  let $ = {
    string: { unit: "simvol", verb: "olmalıdır" },
    file: { unit: "bayt", verb: "olmalıdır" },
    array: { unit: "element", verb: "olmalıdır" },
    set: { unit: "element", verb: "olmalıdır" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(z)) return "array";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "input",
      email: "email address",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO datetime",
      date: "ISO date",
      time: "ISO time",
      duration: "ISO duration",
      ipv4: "IPv4 address",
      ipv6: "IPv6 address",
      cidrv4: "IPv4 range",
      cidrv6: "IPv6 range",
      base64: "base64-encoded string",
      base64url: "base64url-encoded string",
      json_string: "JSON string",
      e164: "E.164 number",
      jwt: "JWT",
      template_literal: "input",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Yanlış dəyər: gözlənilən ${z.expected}, daxil olan ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Yanlış dəyər: gözlənilən ${F(z.values[0])}`;
        return `Yanlış seçim: aşağıdakılardan biri olmalıdır: ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j) return `Çox böyük: gözlənilən ${z.origin ?? "dəyər"} ${J}${z.maximum.toString()} ${j.unit ?? "element"}`;
        return `Çox böyük: gözlənilən ${z.origin ?? "dəyər"} ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `Çox kiçik: gözlənilən ${z.origin} ${J}${z.minimum.toString()} ${j.unit}`;
        return `Çox kiçik: gözlənilən ${z.origin} ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Yanlış mətn: "${J.prefix}" ilə başlamalıdır`;
        if (J.format === "ends_with") return `Yanlış mətn: "${J.suffix}" ilə bitməlidir`;
        if (J.format === "includes") return `Yanlış mətn: "${J.includes}" daxil olmalıdır`;
        if (J.format === "regex") return `Yanlış mətn: ${J.pattern} şablonuna uyğun olmalıdır`;
        return `Yanlış ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `Yanlış ədəd: ${z.divisor} ilə bölünə bilən olmalıdır`;
      case "unrecognized_keys":
        return `Tanınmayan açar${z.keys.length > 1 ? "lar" : ""}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `${z.origin} daxilində yanlış açar`;
      case "invalid_union":
        return "Yanlış dəyər";
      case "invalid_element":
        return `${z.origin} daxilində yanlış dəyər`;
      default:
        return "Yanlış dəyər";
    }
  };
};
function RX() {
  return { localeError: jN() };
}
function UW($, U, v, X) {
  let z = Math.abs($),
    J = z % 10,
    j = z % 100;
  if (j >= 11 && j <= 19) return X;
  if (J === 1) return U;
  if (J >= 2 && J <= 4) return v;
  return X;
}
var QN = () => {
  let $ = {
    string: { unit: { one: "сімвал", few: "сімвалы", many: "сімвалаў" }, verb: "мець" },
    array: { unit: { one: "элемент", few: "элементы", many: "элементаў" }, verb: "мець" },
    set: { unit: { one: "элемент", few: "элементы", many: "элементаў" }, verb: "мець" },
    file: { unit: { one: "байт", few: "байты", many: "байтаў" }, verb: "мець" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "лік";
        case "object": {
          if (Array.isArray(z)) return "масіў";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "увод",
      email: "email адрас",
      url: "URL",
      emoji: "эмодзі",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO дата і час",
      date: "ISO дата",
      time: "ISO час",
      duration: "ISO працягласць",
      ipv4: "IPv4 адрас",
      ipv6: "IPv6 адрас",
      cidrv4: "IPv4 дыяпазон",
      cidrv6: "IPv6 дыяпазон",
      base64: "радок у фармаце base64",
      base64url: "радок у фармаце base64url",
      json_string: "JSON радок",
      e164: "нумар E.164",
      jwt: "JWT",
      template_literal: "увод",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Няправільны ўвод: чакаўся ${z.expected}, атрымана ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Няправільны ўвод: чакалася ${F(z.values[0])}`;
        return `Няправільны варыянт: чакаўся адзін з ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j) {
          let Q = Number(z.maximum),
            W = UW(Q, j.unit.one, j.unit.few, j.unit.many);
          return `Занадта вялікі: чакалася, што ${z.origin ?? "значэнне"} павінна ${j.verb} ${J}${z.maximum.toString()} ${W}`;
        }
        return `Занадта вялікі: чакалася, што ${z.origin ?? "значэнне"} павінна быць ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) {
          let Q = Number(z.minimum),
            W = UW(Q, j.unit.one, j.unit.few, j.unit.many);
          return `Занадта малы: чакалася, што ${z.origin} павінна ${j.verb} ${J}${z.minimum.toString()} ${W}`;
        }
        return `Занадта малы: чакалася, што ${z.origin} павінна быць ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Няправільны радок: павінен пачынацца з "${J.prefix}"`;
        if (J.format === "ends_with") return `Няправільны радок: павінен заканчвацца на "${J.suffix}"`;
        if (J.format === "includes") return `Няправільны радок: павінен змяшчаць "${J.includes}"`;
        if (J.format === "regex") return `Няправільны радок: павінен адпавядаць шаблону ${J.pattern}`;
        return `Няправільны ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `Няправільны лік: павінен быць кратным ${z.divisor}`;
      case "unrecognized_keys":
        return `Нераспазнаны ${z.keys.length > 1 ? "ключы" : "ключ"}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Няправільны ключ у ${z.origin}`;
      case "invalid_union":
        return "Няправільны ўвод";
      case "invalid_element":
        return `Няправільнае значэнне ў ${z.origin}`;
      default:
        return "Няправільны ўвод";
    }
  };
};
function kX() {
  return { localeError: QN() };
}
var YN = () => {
  let $ = {
    string: { unit: "caràcters", verb: "contenir" },
    file: { unit: "bytes", verb: "contenir" },
    array: { unit: "elements", verb: "contenir" },
    set: { unit: "elements", verb: "contenir" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(z)) return "array";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "entrada",
      email: "adreça electrònica",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "data i hora ISO",
      date: "data ISO",
      time: "hora ISO",
      duration: "durada ISO",
      ipv4: "adreça IPv4",
      ipv6: "adreça IPv6",
      cidrv4: "rang IPv4",
      cidrv6: "rang IPv6",
      base64: "cadena codificada en base64",
      base64url: "cadena codificada en base64url",
      json_string: "cadena JSON",
      e164: "número E.164",
      jwt: "JWT",
      template_literal: "entrada",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Tipus invàlid: s'esperava ${z.expected}, s'ha rebut ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Valor invàlid: s'esperava ${F(z.values[0])}`;
        return `Opció invàlida: s'esperava una de ${b(z.values, " o ")}`;
      case "too_big": {
        let J = z.inclusive ? "com a màxim" : "menys de",
          j = U(z.origin);
        if (j)
          return `Massa gran: s'esperava que ${z.origin ?? "el valor"} contingués ${J} ${z.maximum.toString()} ${j.unit ?? "elements"}`;
        return `Massa gran: s'esperava que ${z.origin ?? "el valor"} fos ${J} ${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? "com a mínim" : "més de",
          j = U(z.origin);
        if (j) return `Massa petit: s'esperava que ${z.origin} contingués ${J} ${z.minimum.toString()} ${j.unit}`;
        return `Massa petit: s'esperava que ${z.origin} fos ${J} ${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Format invàlid: ha de començar amb "${J.prefix}"`;
        if (J.format === "ends_with") return `Format invàlid: ha d'acabar amb "${J.suffix}"`;
        if (J.format === "includes") return `Format invàlid: ha d'incloure "${J.includes}"`;
        if (J.format === "regex") return `Format invàlid: ha de coincidir amb el patró ${J.pattern}`;
        return `Format invàlid per a ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `Número invàlid: ha de ser múltiple de ${z.divisor}`;
      case "unrecognized_keys":
        return `Clau${z.keys.length > 1 ? "s" : ""} no reconeguda${z.keys.length > 1 ? "s" : ""}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Clau invàlida a ${z.origin}`;
      case "invalid_union":
        return "Entrada invàlida";
      case "invalid_element":
        return `Element invàlid a ${z.origin}`;
      default:
        return "Entrada invàlida";
    }
  };
};
function ZX() {
  return { localeError: YN() };
}
var WN = () => {
  let $ = {
    string: { unit: "znaků", verb: "mít" },
    file: { unit: "bajtů", verb: "mít" },
    array: { unit: "prvků", verb: "mít" },
    set: { unit: "prvků", verb: "mít" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "číslo";
        case "string":
          return "řetězec";
        case "boolean":
          return "boolean";
        case "bigint":
          return "bigint";
        case "function":
          return "funkce";
        case "symbol":
          return "symbol";
        case "undefined":
          return "undefined";
        case "object": {
          if (Array.isArray(z)) return "pole";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "regulární výraz",
      email: "e-mailová adresa",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "datum a čas ve formátu ISO",
      date: "datum ve formátu ISO",
      time: "čas ve formátu ISO",
      duration: "doba trvání ISO",
      ipv4: "IPv4 adresa",
      ipv6: "IPv6 adresa",
      cidrv4: "rozsah IPv4",
      cidrv6: "rozsah IPv6",
      base64: "řetězec zakódovaný ve formátu base64",
      base64url: "řetězec zakódovaný ve formátu base64url",
      json_string: "řetězec ve formátu JSON",
      e164: "číslo E.164",
      jwt: "JWT",
      template_literal: "vstup",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Neplatný vstup: očekáváno ${z.expected}, obdrženo ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Neplatný vstup: očekáváno ${F(z.values[0])}`;
        return `Neplatná možnost: očekávána jedna z hodnot ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j)
          return `Hodnota je příliš velká: ${z.origin ?? "hodnota"} musí mít ${J}${z.maximum.toString()} ${j.unit ?? "prvků"}`;
        return `Hodnota je příliš velká: ${z.origin ?? "hodnota"} musí být ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j)
          return `Hodnota je příliš malá: ${z.origin ?? "hodnota"} musí mít ${J}${z.minimum.toString()} ${j.unit ?? "prvků"}`;
        return `Hodnota je příliš malá: ${z.origin ?? "hodnota"} musí být ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Neplatný řetězec: musí začínat na "${J.prefix}"`;
        if (J.format === "ends_with") return `Neplatný řetězec: musí končit na "${J.suffix}"`;
        if (J.format === "includes") return `Neplatný řetězec: musí obsahovat "${J.includes}"`;
        if (J.format === "regex") return `Neplatný řetězec: musí odpovídat vzoru ${J.pattern}`;
        return `Neplatný formát ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `Neplatné číslo: musí být násobkem ${z.divisor}`;
      case "unrecognized_keys":
        return `Neznámé klíče: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Neplatný klíč v ${z.origin}`;
      case "invalid_union":
        return "Neplatný vstup";
      case "invalid_element":
        return `Neplatná hodnota v ${z.origin}`;
      default:
        return "Neplatný vstup";
    }
  };
};
function TX() {
  return { localeError: WN() };
}
var wN = () => {
  let $ = {
      string: { unit: "tegn", verb: "havde" },
      file: { unit: "bytes", verb: "havde" },
      array: { unit: "elementer", verb: "indeholdt" },
      set: { unit: "elementer", verb: "indeholdt" },
    },
    U = {
      string: "streng",
      number: "tal",
      boolean: "boolean",
      array: "liste",
      object: "objekt",
      set: "sæt",
      file: "fil",
    };
  function v(j) {
    return $[j] ?? null;
  }
  function X(j) {
    return U[j] ?? j;
  }
  let z = (j) => {
      let Q = typeof j;
      switch (Q) {
        case "number":
          return Number.isNaN(j) ? "NaN" : "tal";
        case "object": {
          if (Array.isArray(j)) return "liste";
          if (j === null) return "null";
          if (Object.getPrototypeOf(j) !== Object.prototype && j.constructor) return j.constructor.name;
          return "objekt";
        }
      }
      return Q;
    },
    J = {
      regex: "input",
      email: "e-mailadresse",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO dato- og klokkeslæt",
      date: "ISO-dato",
      time: "ISO-klokkeslæt",
      duration: "ISO-varighed",
      ipv4: "IPv4-område",
      ipv6: "IPv6-område",
      cidrv4: "IPv4-spektrum",
      cidrv6: "IPv6-spektrum",
      base64: "base64-kodet streng",
      base64url: "base64url-kodet streng",
      json_string: "JSON-streng",
      e164: "E.164-nummer",
      jwt: "JWT",
      template_literal: "input",
    };
  return (j) => {
    switch (j.code) {
      case "invalid_type":
        return `Ugyldigt input: forventede ${X(j.expected)}, fik ${X(z(j.input))}`;
      case "invalid_value":
        if (j.values.length === 1) return `Ugyldig værdi: forventede ${F(j.values[0])}`;
        return `Ugyldigt valg: forventede en af følgende ${b(j.values, "|")}`;
      case "too_big": {
        let Q = j.inclusive ? "<=" : "<",
          W = v(j.origin),
          w = X(j.origin);
        if (W)
          return `For stor: forventede ${w ?? "value"} ${W.verb} ${Q} ${j.maximum.toString()} ${W.unit ?? "elementer"}`;
        return `For stor: forventede ${w ?? "value"} havde ${Q} ${j.maximum.toString()}`;
      }
      case "too_small": {
        let Q = j.inclusive ? ">=" : ">",
          W = v(j.origin),
          w = X(j.origin);
        if (W) return `For lille: forventede ${w} ${W.verb} ${Q} ${j.minimum.toString()} ${W.unit}`;
        return `For lille: forventede ${w} havde ${Q} ${j.minimum.toString()}`;
      }
      case "invalid_format": {
        let Q = j;
        if (Q.format === "starts_with") return `Ugyldig streng: skal starte med "${Q.prefix}"`;
        if (Q.format === "ends_with") return `Ugyldig streng: skal ende med "${Q.suffix}"`;
        if (Q.format === "includes") return `Ugyldig streng: skal indeholde "${Q.includes}"`;
        if (Q.format === "regex") return `Ugyldig streng: skal matche mønsteret ${Q.pattern}`;
        return `Ugyldig ${J[Q.format] ?? j.format}`;
      }
      case "not_multiple_of":
        return `Ugyldigt tal: skal være deleligt med ${j.divisor}`;
      case "unrecognized_keys":
        return `${j.keys.length > 1 ? "Ukendte nøgler" : "Ukendt nøgle"}: ${b(j.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig nøgle i ${j.origin}`;
      case "invalid_union":
        return "Ugyldigt input: matcher ingen af de tilladte typer";
      case "invalid_element":
        return `Ugyldig værdi i ${j.origin}`;
      default:
        return "Ugyldigt input";
    }
  };
};
function CX() {
  return { localeError: wN() };
}
var GN = () => {
  let $ = {
    string: { unit: "Zeichen", verb: "zu haben" },
    file: { unit: "Bytes", verb: "zu haben" },
    array: { unit: "Elemente", verb: "zu haben" },
    set: { unit: "Elemente", verb: "zu haben" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "Zahl";
        case "object": {
          if (Array.isArray(z)) return "Array";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "Eingabe",
      email: "E-Mail-Adresse",
      url: "URL",
      emoji: "Emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO-Datum und -Uhrzeit",
      date: "ISO-Datum",
      time: "ISO-Uhrzeit",
      duration: "ISO-Dauer",
      ipv4: "IPv4-Adresse",
      ipv6: "IPv6-Adresse",
      cidrv4: "IPv4-Bereich",
      cidrv6: "IPv6-Bereich",
      base64: "Base64-codierter String",
      base64url: "Base64-URL-codierter String",
      json_string: "JSON-String",
      e164: "E.164-Nummer",
      jwt: "JWT",
      template_literal: "Eingabe",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Ungültige Eingabe: erwartet ${z.expected}, erhalten ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Ungültige Eingabe: erwartet ${F(z.values[0])}`;
        return `Ungültige Option: erwartet eine von ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j)
          return `Zu groß: erwartet, dass ${z.origin ?? "Wert"} ${J}${z.maximum.toString()} ${j.unit ?? "Elemente"} hat`;
        return `Zu groß: erwartet, dass ${z.origin ?? "Wert"} ${J}${z.maximum.toString()} ist`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `Zu klein: erwartet, dass ${z.origin} ${J}${z.minimum.toString()} ${j.unit} hat`;
        return `Zu klein: erwartet, dass ${z.origin} ${J}${z.minimum.toString()} ist`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Ungültiger String: muss mit "${J.prefix}" beginnen`;
        if (J.format === "ends_with") return `Ungültiger String: muss mit "${J.suffix}" enden`;
        if (J.format === "includes") return `Ungültiger String: muss "${J.includes}" enthalten`;
        if (J.format === "regex") return `Ungültiger String: muss dem Muster ${J.pattern} entsprechen`;
        return `Ungültig: ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `Ungültige Zahl: muss ein Vielfaches von ${z.divisor} sein`;
      case "unrecognized_keys":
        return `${z.keys.length > 1 ? "Unbekannte Schlüssel" : "Unbekannter Schlüssel"}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Ungültiger Schlüssel in ${z.origin}`;
      case "invalid_union":
        return "Ungültige Eingabe";
      case "invalid_element":
        return `Ungültiger Wert in ${z.origin}`;
      default:
        return "Ungültige Eingabe";
    }
  };
};
function xX() {
  return { localeError: GN() };
}
var NN = ($) => {
    let U = typeof $;
    switch (U) {
      case "number":
        return Number.isNaN($) ? "NaN" : "number";
      case "object": {
        if (Array.isArray($)) return "array";
        if ($ === null) return "null";
        if (Object.getPrototypeOf($) !== Object.prototype && $.constructor) return $.constructor.name;
      }
    }
    return U;
  },
  qN = () => {
    let $ = {
      string: { unit: "characters", verb: "to have" },
      file: { unit: "bytes", verb: "to have" },
      array: { unit: "items", verb: "to have" },
      set: { unit: "items", verb: "to have" },
    };
    function U(X) {
      return $[X] ?? null;
    }
    let v = {
      regex: "input",
      email: "email address",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO datetime",
      date: "ISO date",
      time: "ISO time",
      duration: "ISO duration",
      ipv4: "IPv4 address",
      ipv6: "IPv6 address",
      cidrv4: "IPv4 range",
      cidrv6: "IPv6 range",
      base64: "base64-encoded string",
      base64url: "base64url-encoded string",
      json_string: "JSON string",
      e164: "E.164 number",
      jwt: "JWT",
      template_literal: "input",
    };
    return (X) => {
      switch (X.code) {
        case "invalid_type":
          return `Invalid input: expected ${X.expected}, received ${NN(X.input)}`;
        case "invalid_value":
          if (X.values.length === 1) return `Invalid input: expected ${F(X.values[0])}`;
          return `Invalid option: expected one of ${b(X.values, "|")}`;
        case "too_big": {
          let z = X.inclusive ? "<=" : "<",
            J = U(X.origin);
          if (J)
            return `Too big: expected ${X.origin ?? "value"} to have ${z}${X.maximum.toString()} ${J.unit ?? "elements"}`;
          return `Too big: expected ${X.origin ?? "value"} to be ${z}${X.maximum.toString()}`;
        }
        case "too_small": {
          let z = X.inclusive ? ">=" : ">",
            J = U(X.origin);
          if (J) return `Too small: expected ${X.origin} to have ${z}${X.minimum.toString()} ${J.unit}`;
          return `Too small: expected ${X.origin} to be ${z}${X.minimum.toString()}`;
        }
        case "invalid_format": {
          let z = X;
          if (z.format === "starts_with") return `Invalid string: must start with "${z.prefix}"`;
          if (z.format === "ends_with") return `Invalid string: must end with "${z.suffix}"`;
          if (z.format === "includes") return `Invalid string: must include "${z.includes}"`;
          if (z.format === "regex") return `Invalid string: must match pattern ${z.pattern}`;
          return `Invalid ${v[z.format] ?? X.format}`;
        }
        case "not_multiple_of":
          return `Invalid number: must be a multiple of ${X.divisor}`;
        case "unrecognized_keys":
          return `Unrecognized key${X.keys.length > 1 ? "s" : ""}: ${b(X.keys, ", ")}`;
        case "invalid_key":
          return `Invalid key in ${X.origin}`;
        case "invalid_union":
          return "Invalid input";
        case "invalid_element":
          return `Invalid value in ${X.origin}`;
        default:
          return "Invalid input";
      }
    };
  };
function B1() {
  return { localeError: qN() };
}
var ON = ($) => {
    let U = typeof $;
    switch (U) {
      case "number":
        return Number.isNaN($) ? "NaN" : "nombro";
      case "object": {
        if (Array.isArray($)) return "tabelo";
        if ($ === null) return "senvalora";
        if (Object.getPrototypeOf($) !== Object.prototype && $.constructor) return $.constructor.name;
      }
    }
    return U;
  },
  HN = () => {
    let $ = {
      string: { unit: "karaktrojn", verb: "havi" },
      file: { unit: "bajtojn", verb: "havi" },
      array: { unit: "elementojn", verb: "havi" },
      set: { unit: "elementojn", verb: "havi" },
    };
    function U(X) {
      return $[X] ?? null;
    }
    let v = {
      regex: "enigo",
      email: "retadreso",
      url: "URL",
      emoji: "emoĝio",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO-datotempo",
      date: "ISO-dato",
      time: "ISO-tempo",
      duration: "ISO-daŭro",
      ipv4: "IPv4-adreso",
      ipv6: "IPv6-adreso",
      cidrv4: "IPv4-rango",
      cidrv6: "IPv6-rango",
      base64: "64-ume kodita karaktraro",
      base64url: "URL-64-ume kodita karaktraro",
      json_string: "JSON-karaktraro",
      e164: "E.164-nombro",
      jwt: "JWT",
      template_literal: "enigo",
    };
    return (X) => {
      switch (X.code) {
        case "invalid_type":
          return `Nevalida enigo: atendiĝis ${X.expected}, riceviĝis ${ON(X.input)}`;
        case "invalid_value":
          if (X.values.length === 1) return `Nevalida enigo: atendiĝis ${F(X.values[0])}`;
          return `Nevalida opcio: atendiĝis unu el ${b(X.values, "|")}`;
        case "too_big": {
          let z = X.inclusive ? "<=" : "<",
            J = U(X.origin);
          if (J)
            return `Tro granda: atendiĝis ke ${X.origin ?? "valoro"} havu ${z}${X.maximum.toString()} ${J.unit ?? "elementojn"}`;
          return `Tro granda: atendiĝis ke ${X.origin ?? "valoro"} havu ${z}${X.maximum.toString()}`;
        }
        case "too_small": {
          let z = X.inclusive ? ">=" : ">",
            J = U(X.origin);
          if (J) return `Tro malgranda: atendiĝis ke ${X.origin} havu ${z}${X.minimum.toString()} ${J.unit}`;
          return `Tro malgranda: atendiĝis ke ${X.origin} estu ${z}${X.minimum.toString()}`;
        }
        case "invalid_format": {
          let z = X;
          if (z.format === "starts_with") return `Nevalida karaktraro: devas komenciĝi per "${z.prefix}"`;
          if (z.format === "ends_with") return `Nevalida karaktraro: devas finiĝi per "${z.suffix}"`;
          if (z.format === "includes") return `Nevalida karaktraro: devas inkluzivi "${z.includes}"`;
          if (z.format === "regex") return `Nevalida karaktraro: devas kongrui kun la modelo ${z.pattern}`;
          return `Nevalida ${v[z.format] ?? X.format}`;
        }
        case "not_multiple_of":
          return `Nevalida nombro: devas esti oblo de ${X.divisor}`;
        case "unrecognized_keys":
          return `Nekonata${X.keys.length > 1 ? "j" : ""} ŝlosilo${X.keys.length > 1 ? "j" : ""}: ${b(X.keys, ", ")}`;
        case "invalid_key":
          return `Nevalida ŝlosilo en ${X.origin}`;
        case "invalid_union":
          return "Nevalida enigo";
        case "invalid_element":
          return `Nevalida valoro en ${X.origin}`;
        default:
          return "Nevalida enigo";
      }
    };
  };
function gX() {
  return { localeError: HN() };
}
var BN = () => {
  let $ = {
      string: { unit: "caracteres", verb: "tener" },
      file: { unit: "bytes", verb: "tener" },
      array: { unit: "elementos", verb: "tener" },
      set: { unit: "elementos", verb: "tener" },
    },
    U = {
      string: "texto",
      number: "número",
      boolean: "booleano",
      array: "arreglo",
      object: "objeto",
      set: "conjunto",
      file: "archivo",
      date: "fecha",
      bigint: "número grande",
      symbol: "símbolo",
      undefined: "indefinido",
      null: "nulo",
      function: "función",
      map: "mapa",
      record: "registro",
      tuple: "tupla",
      enum: "enumeración",
      union: "unión",
      literal: "literal",
      promise: "promesa",
      void: "vacío",
      never: "nunca",
      unknown: "desconocido",
      any: "cualquiera",
    };
  function v(j) {
    return $[j] ?? null;
  }
  function X(j) {
    return U[j] ?? j;
  }
  let z = (j) => {
      let Q = typeof j;
      switch (Q) {
        case "number":
          return Number.isNaN(j) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(j)) return "array";
          if (j === null) return "null";
          if (Object.getPrototypeOf(j) !== Object.prototype) return j.constructor.name;
          return "object";
        }
      }
      return Q;
    },
    J = {
      regex: "entrada",
      email: "dirección de correo electrónico",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "fecha y hora ISO",
      date: "fecha ISO",
      time: "hora ISO",
      duration: "duración ISO",
      ipv4: "dirección IPv4",
      ipv6: "dirección IPv6",
      cidrv4: "rango IPv4",
      cidrv6: "rango IPv6",
      base64: "cadena codificada en base64",
      base64url: "URL codificada en base64",
      json_string: "cadena JSON",
      e164: "número E.164",
      jwt: "JWT",
      template_literal: "entrada",
    };
  return (j) => {
    switch (j.code) {
      case "invalid_type":
        return `Entrada inválida: se esperaba ${X(j.expected)}, recibido ${X(z(j.input))}`;
      case "invalid_value":
        if (j.values.length === 1) return `Entrada inválida: se esperaba ${F(j.values[0])}`;
        return `Opción inválida: se esperaba una de ${b(j.values, "|")}`;
      case "too_big": {
        let Q = j.inclusive ? "<=" : "<",
          W = v(j.origin),
          w = X(j.origin);
        if (W)
          return `Demasiado grande: se esperaba que ${w ?? "valor"} tuviera ${Q}${j.maximum.toString()} ${W.unit ?? "elementos"}`;
        return `Demasiado grande: se esperaba que ${w ?? "valor"} fuera ${Q}${j.maximum.toString()}`;
      }
      case "too_small": {
        let Q = j.inclusive ? ">=" : ">",
          W = v(j.origin),
          w = X(j.origin);
        if (W) return `Demasiado pequeño: se esperaba que ${w} tuviera ${Q}${j.minimum.toString()} ${W.unit}`;
        return `Demasiado pequeño: se esperaba que ${w} fuera ${Q}${j.minimum.toString()}`;
      }
      case "invalid_format": {
        let Q = j;
        if (Q.format === "starts_with") return `Cadena inválida: debe comenzar con "${Q.prefix}"`;
        if (Q.format === "ends_with") return `Cadena inválida: debe terminar en "${Q.suffix}"`;
        if (Q.format === "includes") return `Cadena inválida: debe incluir "${Q.includes}"`;
        if (Q.format === "regex") return `Cadena inválida: debe coincidir con el patrón ${Q.pattern}`;
        return `Inválido ${J[Q.format] ?? j.format}`;
      }
      case "not_multiple_of":
        return `Número inválido: debe ser múltiplo de ${j.divisor}`;
      case "unrecognized_keys":
        return `Llave${j.keys.length > 1 ? "s" : ""} desconocida${j.keys.length > 1 ? "s" : ""}: ${b(j.keys, ", ")}`;
      case "invalid_key":
        return `Llave inválida en ${X(j.origin)}`;
      case "invalid_union":
        return "Entrada inválida";
      case "invalid_element":
        return `Valor inválido en ${X(j.origin)}`;
      default:
        return "Entrada inválida";
    }
  };
};
function fX() {
  return { localeError: BN() };
}
var DN = () => {
  let $ = {
    string: { unit: "کاراکتر", verb: "داشته باشد" },
    file: { unit: "بایت", verb: "داشته باشد" },
    array: { unit: "آیتم", verb: "داشته باشد" },
    set: { unit: "آیتم", verb: "داشته باشد" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "عدد";
        case "object": {
          if (Array.isArray(z)) return "آرایه";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "ورودی",
      email: "آدرس ایمیل",
      url: "URL",
      emoji: "ایموجی",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "تاریخ و زمان ایزو",
      date: "تاریخ ایزو",
      time: "زمان ایزو",
      duration: "مدت زمان ایزو",
      ipv4: "IPv4 آدرس",
      ipv6: "IPv6 آدرس",
      cidrv4: "IPv4 دامنه",
      cidrv6: "IPv6 دامنه",
      base64: "base64-encoded رشته",
      base64url: "base64url-encoded رشته",
      json_string: "JSON رشته",
      e164: "E.164 عدد",
      jwt: "JWT",
      template_literal: "ورودی",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `ورودی نامعتبر: می‌بایست ${z.expected} می‌بود، ${v(z.input)} دریافت شد`;
      case "invalid_value":
        if (z.values.length === 1) return `ورودی نامعتبر: می‌بایست ${F(z.values[0])} می‌بود`;
        return `گزینه نامعتبر: می‌بایست یکی از ${b(z.values, "|")} می‌بود`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j) return `خیلی بزرگ: ${z.origin ?? "مقدار"} باید ${J}${z.maximum.toString()} ${j.unit ?? "عنصر"} باشد`;
        return `خیلی بزرگ: ${z.origin ?? "مقدار"} باید ${J}${z.maximum.toString()} باشد`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `خیلی کوچک: ${z.origin} باید ${J}${z.minimum.toString()} ${j.unit} باشد`;
        return `خیلی کوچک: ${z.origin} باید ${J}${z.minimum.toString()} باشد`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `رشته نامعتبر: باید با "${J.prefix}" شروع شود`;
        if (J.format === "ends_with") return `رشته نامعتبر: باید با "${J.suffix}" تمام شود`;
        if (J.format === "includes") return `رشته نامعتبر: باید شامل "${J.includes}" باشد`;
        if (J.format === "regex") return `رشته نامعتبر: باید با الگوی ${J.pattern} مطابقت داشته باشد`;
        return `${X[J.format] ?? z.format} نامعتبر`;
      }
      case "not_multiple_of":
        return `عدد نامعتبر: باید مضرب ${z.divisor} باشد`;
      case "unrecognized_keys":
        return `کلید${z.keys.length > 1 ? "های" : ""} ناشناس: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `کلید ناشناس در ${z.origin}`;
      case "invalid_union":
        return "ورودی نامعتبر";
      case "invalid_element":
        return `مقدار نامعتبر در ${z.origin}`;
      default:
        return "ورودی نامعتبر";
    }
  };
};
function hX() {
  return { localeError: DN() };
}
var KN = () => {
  let $ = {
    string: { unit: "merkkiä", subject: "merkkijonon" },
    file: { unit: "tavua", subject: "tiedoston" },
    array: { unit: "alkiota", subject: "listan" },
    set: { unit: "alkiota", subject: "joukon" },
    number: { unit: "", subject: "luvun" },
    bigint: { unit: "", subject: "suuren kokonaisluvun" },
    int: { unit: "", subject: "kokonaisluvun" },
    date: { unit: "", subject: "päivämäärän" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(z)) return "array";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "säännöllinen lauseke",
      email: "sähköpostiosoite",
      url: "URL-osoite",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO-aikaleima",
      date: "ISO-päivämäärä",
      time: "ISO-aika",
      duration: "ISO-kesto",
      ipv4: "IPv4-osoite",
      ipv6: "IPv6-osoite",
      cidrv4: "IPv4-alue",
      cidrv6: "IPv6-alue",
      base64: "base64-koodattu merkkijono",
      base64url: "base64url-koodattu merkkijono",
      json_string: "JSON-merkkijono",
      e164: "E.164-luku",
      jwt: "JWT",
      template_literal: "templaattimerkkijono",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Virheellinen tyyppi: odotettiin ${z.expected}, oli ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Virheellinen syöte: täytyy olla ${F(z.values[0])}`;
        return `Virheellinen valinta: täytyy olla yksi seuraavista: ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j) return `Liian suuri: ${j.subject} täytyy olla ${J}${z.maximum.toString()} ${j.unit}`.trim();
        return `Liian suuri: arvon täytyy olla ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `Liian pieni: ${j.subject} täytyy olla ${J}${z.minimum.toString()} ${j.unit}`.trim();
        return `Liian pieni: arvon täytyy olla ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Virheellinen syöte: täytyy alkaa "${J.prefix}"`;
        if (J.format === "ends_with") return `Virheellinen syöte: täytyy loppua "${J.suffix}"`;
        if (J.format === "includes") return `Virheellinen syöte: täytyy sisältää "${J.includes}"`;
        if (J.format === "regex") return `Virheellinen syöte: täytyy vastata säännöllistä lauseketta ${J.pattern}`;
        return `Virheellinen ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `Virheellinen luku: täytyy olla luvun ${z.divisor} monikerta`;
      case "unrecognized_keys":
        return `${z.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return "Virheellinen avain tietueessa";
      case "invalid_union":
        return "Virheellinen unioni";
      case "invalid_element":
        return "Virheellinen arvo joukossa";
      default:
        return "Virheellinen syöte";
    }
  };
};
function yX() {
  return { localeError: KN() };
}
var bN = () => {
  let $ = {
    string: { unit: "caractères", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "éléments", verb: "avoir" },
    set: { unit: "éléments", verb: "avoir" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "nombre";
        case "object": {
          if (Array.isArray(z)) return "tableau";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "entrée",
      email: "adresse e-mail",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "date et heure ISO",
      date: "date ISO",
      time: "heure ISO",
      duration: "durée ISO",
      ipv4: "adresse IPv4",
      ipv6: "adresse IPv6",
      cidrv4: "plage IPv4",
      cidrv6: "plage IPv6",
      base64: "chaîne encodée en base64",
      base64url: "chaîne encodée en base64url",
      json_string: "chaîne JSON",
      e164: "numéro E.164",
      jwt: "JWT",
      template_literal: "entrée",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Entrée invalide : ${z.expected} attendu, ${v(z.input)} reçu`;
      case "invalid_value":
        if (z.values.length === 1) return `Entrée invalide : ${F(z.values[0])} attendu`;
        return `Option invalide : une valeur parmi ${b(z.values, "|")} attendue`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j)
          return `Trop grand : ${z.origin ?? "valeur"} doit ${j.verb} ${J}${z.maximum.toString()} ${j.unit ?? "élément(s)"}`;
        return `Trop grand : ${z.origin ?? "valeur"} doit être ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `Trop petit : ${z.origin} doit ${j.verb} ${J}${z.minimum.toString()} ${j.unit}`;
        return `Trop petit : ${z.origin} doit être ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Chaîne invalide : doit commencer par "${J.prefix}"`;
        if (J.format === "ends_with") return `Chaîne invalide : doit se terminer par "${J.suffix}"`;
        if (J.format === "includes") return `Chaîne invalide : doit inclure "${J.includes}"`;
        if (J.format === "regex") return `Chaîne invalide : doit correspondre au modèle ${J.pattern}`;
        return `${X[J.format] ?? z.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit être un multiple de ${z.divisor}`;
      case "unrecognized_keys":
        return `Clé${z.keys.length > 1 ? "s" : ""} non reconnue${z.keys.length > 1 ? "s" : ""} : ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Clé invalide dans ${z.origin}`;
      case "invalid_union":
        return "Entrée invalide";
      case "invalid_element":
        return `Valeur invalide dans ${z.origin}`;
      default:
        return "Entrée invalide";
    }
  };
};
function mX() {
  return { localeError: bN() };
}
var LN = () => {
  let $ = {
    string: { unit: "caractères", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "éléments", verb: "avoir" },
    set: { unit: "éléments", verb: "avoir" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(z)) return "array";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "entrée",
      email: "adresse courriel",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "date-heure ISO",
      date: "date ISO",
      time: "heure ISO",
      duration: "durée ISO",
      ipv4: "adresse IPv4",
      ipv6: "adresse IPv6",
      cidrv4: "plage IPv4",
      cidrv6: "plage IPv6",
      base64: "chaîne encodée en base64",
      base64url: "chaîne encodée en base64url",
      json_string: "chaîne JSON",
      e164: "numéro E.164",
      jwt: "JWT",
      template_literal: "entrée",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Entrée invalide : attendu ${z.expected}, reçu ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Entrée invalide : attendu ${F(z.values[0])}`;
        return `Option invalide : attendu l'une des valeurs suivantes ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "≤" : "<",
          j = U(z.origin);
        if (j) return `Trop grand : attendu que ${z.origin ?? "la valeur"} ait ${J}${z.maximum.toString()} ${j.unit}`;
        return `Trop grand : attendu que ${z.origin ?? "la valeur"} soit ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? "≥" : ">",
          j = U(z.origin);
        if (j) return `Trop petit : attendu que ${z.origin} ait ${J}${z.minimum.toString()} ${j.unit}`;
        return `Trop petit : attendu que ${z.origin} soit ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Chaîne invalide : doit commencer par "${J.prefix}"`;
        if (J.format === "ends_with") return `Chaîne invalide : doit se terminer par "${J.suffix}"`;
        if (J.format === "includes") return `Chaîne invalide : doit inclure "${J.includes}"`;
        if (J.format === "regex") return `Chaîne invalide : doit correspondre au motif ${J.pattern}`;
        return `${X[J.format] ?? z.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit être un multiple de ${z.divisor}`;
      case "unrecognized_keys":
        return `Clé${z.keys.length > 1 ? "s" : ""} non reconnue${z.keys.length > 1 ? "s" : ""} : ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Clé invalide dans ${z.origin}`;
      case "invalid_union":
        return "Entrée invalide";
      case "invalid_element":
        return `Valeur invalide dans ${z.origin}`;
      default:
        return "Entrée invalide";
    }
  };
};
function uX() {
  return { localeError: LN() };
}
var IN = () => {
  let $ = {
    string: { unit: "אותיות", verb: "לכלול" },
    file: { unit: "בייטים", verb: "לכלול" },
    array: { unit: "פריטים", verb: "לכלול" },
    set: { unit: "פריטים", verb: "לכלול" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(z)) return "array";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "קלט",
      email: "כתובת אימייל",
      url: "כתובת רשת",
      emoji: "אימוג'י",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "תאריך וזמן ISO",
      date: "תאריך ISO",
      time: "זמן ISO",
      duration: "משך זמן ISO",
      ipv4: "כתובת IPv4",
      ipv6: "כתובת IPv6",
      cidrv4: "טווח IPv4",
      cidrv6: "טווח IPv6",
      base64: "מחרוזת בבסיס 64",
      base64url: "מחרוזת בבסיס 64 לכתובות רשת",
      json_string: "מחרוזת JSON",
      e164: "מספר E.164",
      jwt: "JWT",
      template_literal: "קלט",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `קלט לא תקין: צריך ${z.expected}, התקבל ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `קלט לא תקין: צריך ${F(z.values[0])}`;
        return `קלט לא תקין: צריך אחת מהאפשרויות  ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j) return `גדול מדי: ${z.origin ?? "value"} צריך להיות ${J}${z.maximum.toString()} ${j.unit ?? "elements"}`;
        return `גדול מדי: ${z.origin ?? "value"} צריך להיות ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `קטן מדי: ${z.origin} צריך להיות ${J}${z.minimum.toString()} ${j.unit}`;
        return `קטן מדי: ${z.origin} צריך להיות ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `מחרוזת לא תקינה: חייבת להתחיל ב"${J.prefix}"`;
        if (J.format === "ends_with") return `מחרוזת לא תקינה: חייבת להסתיים ב "${J.suffix}"`;
        if (J.format === "includes") return `מחרוזת לא תקינה: חייבת לכלול "${J.includes}"`;
        if (J.format === "regex") return `מחרוזת לא תקינה: חייבת להתאים לתבנית ${J.pattern}`;
        return `${X[J.format] ?? z.format} לא תקין`;
      }
      case "not_multiple_of":
        return `מספר לא תקין: חייב להיות מכפלה של ${z.divisor}`;
      case "unrecognized_keys":
        return `מפתח${z.keys.length > 1 ? "ות" : ""} לא מזוה${z.keys.length > 1 ? "ים" : "ה"}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `מפתח לא תקין ב${z.origin}`;
      case "invalid_union":
        return "קלט לא תקין";
      case "invalid_element":
        return `ערך לא תקין ב${z.origin}`;
      default:
        return "קלט לא תקין";
    }
  };
};
function cX() {
  return { localeError: IN() };
}
var VN = () => {
  let $ = {
    string: { unit: "karakter", verb: "legyen" },
    file: { unit: "byte", verb: "legyen" },
    array: { unit: "elem", verb: "legyen" },
    set: { unit: "elem", verb: "legyen" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "szám";
        case "object": {
          if (Array.isArray(z)) return "tömb";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "bemenet",
      email: "email cím",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO időbélyeg",
      date: "ISO dátum",
      time: "ISO idő",
      duration: "ISO időintervallum",
      ipv4: "IPv4 cím",
      ipv6: "IPv6 cím",
      cidrv4: "IPv4 tartomány",
      cidrv6: "IPv6 tartomány",
      base64: "base64-kódolt string",
      base64url: "base64url-kódolt string",
      json_string: "JSON string",
      e164: "E.164 szám",
      jwt: "JWT",
      template_literal: "bemenet",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Érvénytelen bemenet: a várt érték ${z.expected}, a kapott érték ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Érvénytelen bemenet: a várt érték ${F(z.values[0])}`;
        return `Érvénytelen opció: valamelyik érték várt ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j)
          return `Túl nagy: ${z.origin ?? "érték"} mérete túl nagy ${J}${z.maximum.toString()} ${j.unit ?? "elem"}`;
        return `Túl nagy: a bemeneti érték ${z.origin ?? "érték"} túl nagy: ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `Túl kicsi: a bemeneti érték ${z.origin} mérete túl kicsi ${J}${z.minimum.toString()} ${j.unit}`;
        return `Túl kicsi: a bemeneti érték ${z.origin} túl kicsi ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Érvénytelen string: "${J.prefix}" értékkel kell kezdődnie`;
        if (J.format === "ends_with") return `Érvénytelen string: "${J.suffix}" értékkel kell végződnie`;
        if (J.format === "includes") return `Érvénytelen string: "${J.includes}" értéket kell tartalmaznia`;
        if (J.format === "regex") return `Érvénytelen string: ${J.pattern} mintának kell megfelelnie`;
        return `Érvénytelen ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `Érvénytelen szám: ${z.divisor} többszörösének kell lennie`;
      case "unrecognized_keys":
        return `Ismeretlen kulcs${z.keys.length > 1 ? "s" : ""}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Érvénytelen kulcs ${z.origin}`;
      case "invalid_union":
        return "Érvénytelen bemenet";
      case "invalid_element":
        return `Érvénytelen érték: ${z.origin}`;
      default:
        return "Érvénytelen bemenet";
    }
  };
};
function iX() {
  return { localeError: VN() };
}
var AN = () => {
  let $ = {
    string: { unit: "karakter", verb: "memiliki" },
    file: { unit: "byte", verb: "memiliki" },
    array: { unit: "item", verb: "memiliki" },
    set: { unit: "item", verb: "memiliki" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(z)) return "array";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "input",
      email: "alamat email",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "tanggal dan waktu format ISO",
      date: "tanggal format ISO",
      time: "jam format ISO",
      duration: "durasi format ISO",
      ipv4: "alamat IPv4",
      ipv6: "alamat IPv6",
      cidrv4: "rentang alamat IPv4",
      cidrv6: "rentang alamat IPv6",
      base64: "string dengan enkode base64",
      base64url: "string dengan enkode base64url",
      json_string: "string JSON",
      e164: "angka E.164",
      jwt: "JWT",
      template_literal: "input",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Input tidak valid: diharapkan ${z.expected}, diterima ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Input tidak valid: diharapkan ${F(z.values[0])}`;
        return `Pilihan tidak valid: diharapkan salah satu dari ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j)
          return `Terlalu besar: diharapkan ${z.origin ?? "value"} memiliki ${J}${z.maximum.toString()} ${j.unit ?? "elemen"}`;
        return `Terlalu besar: diharapkan ${z.origin ?? "value"} menjadi ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `Terlalu kecil: diharapkan ${z.origin} memiliki ${J}${z.minimum.toString()} ${j.unit}`;
        return `Terlalu kecil: diharapkan ${z.origin} menjadi ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `String tidak valid: harus dimulai dengan "${J.prefix}"`;
        if (J.format === "ends_with") return `String tidak valid: harus berakhir dengan "${J.suffix}"`;
        if (J.format === "includes") return `String tidak valid: harus menyertakan "${J.includes}"`;
        if (J.format === "regex") return `String tidak valid: harus sesuai pola ${J.pattern}`;
        return `${X[J.format] ?? z.format} tidak valid`;
      }
      case "not_multiple_of":
        return `Angka tidak valid: harus kelipatan dari ${z.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali ${z.keys.length > 1 ? "s" : ""}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak valid di ${z.origin}`;
      case "invalid_union":
        return "Input tidak valid";
      case "invalid_element":
        return `Nilai tidak valid di ${z.origin}`;
      default:
        return "Input tidak valid";
    }
  };
};
function nX() {
  return { localeError: AN() };
}
var FN = ($) => {
    let U = typeof $;
    switch (U) {
      case "number":
        return Number.isNaN($) ? "NaN" : "númer";
      case "object": {
        if (Array.isArray($)) return "fylki";
        if ($ === null) return "null";
        if (Object.getPrototypeOf($) !== Object.prototype && $.constructor) return $.constructor.name;
      }
    }
    return U;
  },
  EN = () => {
    let $ = {
      string: { unit: "stafi", verb: "að hafa" },
      file: { unit: "bæti", verb: "að hafa" },
      array: { unit: "hluti", verb: "að hafa" },
      set: { unit: "hluti", verb: "að hafa" },
    };
    function U(X) {
      return $[X] ?? null;
    }
    let v = {
      regex: "gildi",
      email: "netfang",
      url: "vefslóð",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO dagsetning og tími",
      date: "ISO dagsetning",
      time: "ISO tími",
      duration: "ISO tímalengd",
      ipv4: "IPv4 address",
      ipv6: "IPv6 address",
      cidrv4: "IPv4 range",
      cidrv6: "IPv6 range",
      base64: "base64-encoded strengur",
      base64url: "base64url-encoded strengur",
      json_string: "JSON strengur",
      e164: "E.164 tölugildi",
      jwt: "JWT",
      template_literal: "gildi",
    };
    return (X) => {
      switch (X.code) {
        case "invalid_type":
          return `Rangt gildi: Þú slóst inn ${FN(X.input)} þar sem á að vera ${X.expected}`;
        case "invalid_value":
          if (X.values.length === 1) return `Rangt gildi: gert ráð fyrir ${F(X.values[0])}`;
          return `Ógilt val: má vera eitt af eftirfarandi ${b(X.values, "|")}`;
        case "too_big": {
          let z = X.inclusive ? "<=" : "<",
            J = U(X.origin);
          if (J)
            return `Of stórt: gert er ráð fyrir að ${X.origin ?? "gildi"} hafi ${z}${X.maximum.toString()} ${J.unit ?? "hluti"}`;
          return `Of stórt: gert er ráð fyrir að ${X.origin ?? "gildi"} sé ${z}${X.maximum.toString()}`;
        }
        case "too_small": {
          let z = X.inclusive ? ">=" : ">",
            J = U(X.origin);
          if (J) return `Of lítið: gert er ráð fyrir að ${X.origin} hafi ${z}${X.minimum.toString()} ${J.unit}`;
          return `Of lítið: gert er ráð fyrir að ${X.origin} sé ${z}${X.minimum.toString()}`;
        }
        case "invalid_format": {
          let z = X;
          if (z.format === "starts_with") return `Ógildur strengur: verður að byrja á "${z.prefix}"`;
          if (z.format === "ends_with") return `Ógildur strengur: verður að enda á "${z.suffix}"`;
          if (z.format === "includes") return `Ógildur strengur: verður að innihalda "${z.includes}"`;
          if (z.format === "regex") return `Ógildur strengur: verður að fylgja mynstri ${z.pattern}`;
          return `Rangt ${v[z.format] ?? X.format}`;
        }
        case "not_multiple_of":
          return `Röng tala: verður að vera margfeldi af ${X.divisor}`;
        case "unrecognized_keys":
          return `Óþekkt ${X.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${b(X.keys, ", ")}`;
        case "invalid_key":
          return `Rangur lykill í ${X.origin}`;
        case "invalid_union":
          return "Rangt gildi";
        case "invalid_element":
          return `Rangt gildi í ${X.origin}`;
        default:
          return "Rangt gildi";
      }
    };
  };
function lX() {
  return { localeError: EN() };
}
var _N = () => {
  let $ = {
    string: { unit: "caratteri", verb: "avere" },
    file: { unit: "byte", verb: "avere" },
    array: { unit: "elementi", verb: "avere" },
    set: { unit: "elementi", verb: "avere" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "numero";
        case "object": {
          if (Array.isArray(z)) return "vettore";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "input",
      email: "indirizzo email",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "data e ora ISO",
      date: "data ISO",
      time: "ora ISO",
      duration: "durata ISO",
      ipv4: "indirizzo IPv4",
      ipv6: "indirizzo IPv6",
      cidrv4: "intervallo IPv4",
      cidrv6: "intervallo IPv6",
      base64: "stringa codificata in base64",
      base64url: "URL codificata in base64",
      json_string: "stringa JSON",
      e164: "numero E.164",
      jwt: "JWT",
      template_literal: "input",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Input non valido: atteso ${z.expected}, ricevuto ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Input non valido: atteso ${F(z.values[0])}`;
        return `Opzione non valida: atteso uno tra ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j)
          return `Troppo grande: ${z.origin ?? "valore"} deve avere ${J}${z.maximum.toString()} ${j.unit ?? "elementi"}`;
        return `Troppo grande: ${z.origin ?? "valore"} deve essere ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `Troppo piccolo: ${z.origin} deve avere ${J}${z.minimum.toString()} ${j.unit}`;
        return `Troppo piccolo: ${z.origin} deve essere ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Stringa non valida: deve iniziare con "${J.prefix}"`;
        if (J.format === "ends_with") return `Stringa non valida: deve terminare con "${J.suffix}"`;
        if (J.format === "includes") return `Stringa non valida: deve includere "${J.includes}"`;
        if (J.format === "regex") return `Stringa non valida: deve corrispondere al pattern ${J.pattern}`;
        return `Invalid ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `Numero non valido: deve essere un multiplo di ${z.divisor}`;
      case "unrecognized_keys":
        return `Chiav${z.keys.length > 1 ? "i" : "e"} non riconosciut${z.keys.length > 1 ? "e" : "a"}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Chiave non valida in ${z.origin}`;
      case "invalid_union":
        return "Input non valido";
      case "invalid_element":
        return `Valore non valido in ${z.origin}`;
      default:
        return "Input non valido";
    }
  };
};
function dX() {
  return { localeError: _N() };
}
var MN = () => {
  let $ = {
    string: { unit: "文字", verb: "である" },
    file: { unit: "バイト", verb: "である" },
    array: { unit: "要素", verb: "である" },
    set: { unit: "要素", verb: "である" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "数値";
        case "object": {
          if (Array.isArray(z)) return "配列";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "入力値",
      email: "メールアドレス",
      url: "URL",
      emoji: "絵文字",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO日時",
      date: "ISO日付",
      time: "ISO時刻",
      duration: "ISO期間",
      ipv4: "IPv4アドレス",
      ipv6: "IPv6アドレス",
      cidrv4: "IPv4範囲",
      cidrv6: "IPv6範囲",
      base64: "base64エンコード文字列",
      base64url: "base64urlエンコード文字列",
      json_string: "JSON文字列",
      e164: "E.164番号",
      jwt: "JWT",
      template_literal: "入力値",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `無効な入力: ${z.expected}が期待されましたが、${v(z.input)}が入力されました`;
      case "invalid_value":
        if (z.values.length === 1) return `無効な入力: ${F(z.values[0])}が期待されました`;
        return `無効な選択: ${b(z.values, "、")}のいずれかである必要があります`;
      case "too_big": {
        let J = z.inclusive ? "以下である" : "より小さい",
          j = U(z.origin);
        if (j) return `大きすぎる値: ${z.origin ?? "値"}は${z.maximum.toString()}${j.unit ?? "要素"}${J}必要があります`;
        return `大きすぎる値: ${z.origin ?? "値"}は${z.maximum.toString()}${J}必要があります`;
      }
      case "too_small": {
        let J = z.inclusive ? "以上である" : "より大きい",
          j = U(z.origin);
        if (j) return `小さすぎる値: ${z.origin}は${z.minimum.toString()}${j.unit}${J}必要があります`;
        return `小さすぎる値: ${z.origin}は${z.minimum.toString()}${J}必要があります`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `無効な文字列: "${J.prefix}"で始まる必要があります`;
        if (J.format === "ends_with") return `無効な文字列: "${J.suffix}"で終わる必要があります`;
        if (J.format === "includes") return `無効な文字列: "${J.includes}"を含む必要があります`;
        if (J.format === "regex") return `無効な文字列: パターン${J.pattern}に一致する必要があります`;
        return `無効な${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `無効な数値: ${z.divisor}の倍数である必要があります`;
      case "unrecognized_keys":
        return `認識されていないキー${z.keys.length > 1 ? "群" : ""}: ${b(z.keys, "、")}`;
      case "invalid_key":
        return `${z.origin}内の無効なキー`;
      case "invalid_union":
        return "無効な入力";
      case "invalid_element":
        return `${z.origin}内の無効な値`;
      default:
        return "無効な入力";
    }
  };
};
function pX() {
  return { localeError: MN() };
}
var PN = ($) => {
    let U = typeof $;
    switch (U) {
      case "number":
        return Number.isNaN($) ? "NaN" : "რიცხვი";
      case "object": {
        if (Array.isArray($)) return "მასივი";
        if ($ === null) return "null";
        if (Object.getPrototypeOf($) !== Object.prototype && $.constructor) return $.constructor.name;
      }
    }
    return (
      {
        string: "სტრინგი",
        boolean: "ბულეანი",
        undefined: "undefined",
        bigint: "bigint",
        symbol: "symbol",
        function: "ფუნქცია",
      }[U] ?? U
    );
  },
  SN = () => {
    let $ = {
      string: { unit: "სიმბოლო", verb: "უნდა შეიცავდეს" },
      file: { unit: "ბაიტი", verb: "უნდა შეიცავდეს" },
      array: { unit: "ელემენტი", verb: "უნდა შეიცავდეს" },
      set: { unit: "ელემენტი", verb: "უნდა შეიცავდეს" },
    };
    function U(X) {
      return $[X] ?? null;
    }
    let v = {
      regex: "შეყვანა",
      email: "ელ-ფოსტის მისამართი",
      url: "URL",
      emoji: "ემოჯი",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "თარიღი-დრო",
      date: "თარიღი",
      time: "დრო",
      duration: "ხანგრძლივობა",
      ipv4: "IPv4 მისამართი",
      ipv6: "IPv6 მისამართი",
      cidrv4: "IPv4 დიაპაზონი",
      cidrv6: "IPv6 დიაპაზონი",
      base64: "base64-კოდირებული სტრინგი",
      base64url: "base64url-კოდირებული სტრინგი",
      json_string: "JSON სტრინგი",
      e164: "E.164 ნომერი",
      jwt: "JWT",
      template_literal: "შეყვანა",
    };
    return (X) => {
      switch (X.code) {
        case "invalid_type":
          return `არასწორი შეყვანა: მოსალოდნელი ${X.expected}, მიღებული ${PN(X.input)}`;
        case "invalid_value":
          if (X.values.length === 1) return `არასწორი შეყვანა: მოსალოდნელი ${F(X.values[0])}`;
          return `არასწორი ვარიანტი: მოსალოდნელია ერთ-ერთი ${b(X.values, "|")}-დან`;
        case "too_big": {
          let z = X.inclusive ? "<=" : "<",
            J = U(X.origin);
          if (J)
            return `ზედმეტად დიდი: მოსალოდნელი ${X.origin ?? "მნიშვნელობა"} ${J.verb} ${z}${X.maximum.toString()} ${J.unit}`;
          return `ზედმეტად დიდი: მოსალოდნელი ${X.origin ?? "მნიშვნელობა"} იყოს ${z}${X.maximum.toString()}`;
        }
        case "too_small": {
          let z = X.inclusive ? ">=" : ">",
            J = U(X.origin);
          if (J) return `ზედმეტად პატარა: მოსალოდნელი ${X.origin} ${J.verb} ${z}${X.minimum.toString()} ${J.unit}`;
          return `ზედმეტად პატარა: მოსალოდნელი ${X.origin} იყოს ${z}${X.minimum.toString()}`;
        }
        case "invalid_format": {
          let z = X;
          if (z.format === "starts_with") return `არასწორი სტრინგი: უნდა იწყებოდეს "${z.prefix}"-ით`;
          if (z.format === "ends_with") return `არასწორი სტრინგი: უნდა მთავრდებოდეს "${z.suffix}"-ით`;
          if (z.format === "includes") return `არასწორი სტრინგი: უნდა შეიცავდეს "${z.includes}"-ს`;
          if (z.format === "regex") return `არასწორი სტრინგი: უნდა შეესაბამებოდეს შაბლონს ${z.pattern}`;
          return `არასწორი ${v[z.format] ?? X.format}`;
        }
        case "not_multiple_of":
          return `არასწორი რიცხვი: უნდა იყოს ${X.divisor}-ის ჯერადი`;
        case "unrecognized_keys":
          return `უცნობი გასაღებ${X.keys.length > 1 ? "ები" : "ი"}: ${b(X.keys, ", ")}`;
        case "invalid_key":
          return `არასწორი გასაღები ${X.origin}-ში`;
        case "invalid_union":
          return "არასწორი შეყვანა";
        case "invalid_element":
          return `არასწორი მნიშვნელობა ${X.origin}-ში`;
        default:
          return "არასწორი შეყვანა";
      }
    };
  };
function rX() {
  return { localeError: SN() };
}
var RN = () => {
  let $ = {
    string: { unit: "តួអក្សរ", verb: "គួរមាន" },
    file: { unit: "បៃ", verb: "គួរមាន" },
    array: { unit: "ធាតុ", verb: "គួរមាន" },
    set: { unit: "ធាតុ", verb: "គួរមាន" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "មិនមែនជាលេខ (NaN)" : "លេខ";
        case "object": {
          if (Array.isArray(z)) return "អារេ (Array)";
          if (z === null) return "គ្មានតម្លៃ (null)";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "ទិន្នន័យបញ្ចូល",
      email: "អាសយដ្ឋានអ៊ីមែល",
      url: "URL",
      emoji: "សញ្ញាអារម្មណ៍",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "កាលបរិច្ឆេទ និងម៉ោង ISO",
      date: "កាលបរិច្ឆេទ ISO",
      time: "ម៉ោង ISO",
      duration: "រយៈពេល ISO",
      ipv4: "អាសយដ្ឋាន IPv4",
      ipv6: "អាសយដ្ឋាន IPv6",
      cidrv4: "ដែនអាសយដ្ឋាន IPv4",
      cidrv6: "ដែនអាសយដ្ឋាន IPv6",
      base64: "ខ្សែអក្សរអ៊ិកូដ base64",
      base64url: "ខ្សែអក្សរអ៊ិកូដ base64url",
      json_string: "ខ្សែអក្សរ JSON",
      e164: "លេខ E.164",
      jwt: "JWT",
      template_literal: "ទិន្នន័យបញ្ចូល",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${z.expected} ប៉ុន្តែទទួលបាន ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${F(z.values[0])}`;
        return `ជម្រើសមិនត្រឹមត្រូវ៖ ត្រូវជាមួយក្នុងចំណោម ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j) return `ធំពេក៖ ត្រូវការ ${z.origin ?? "តម្លៃ"} ${J} ${z.maximum.toString()} ${j.unit ?? "ធាតុ"}`;
        return `ធំពេក៖ ត្រូវការ ${z.origin ?? "តម្លៃ"} ${J} ${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `តូចពេក៖ ត្រូវការ ${z.origin} ${J} ${z.minimum.toString()} ${j.unit}`;
        return `តូចពេក៖ ត្រូវការ ${z.origin} ${J} ${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវចាប់ផ្តើមដោយ "${J.prefix}"`;
        if (J.format === "ends_with") return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវបញ្ចប់ដោយ "${J.suffix}"`;
        if (J.format === "includes") return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវមាន "${J.includes}"`;
        if (J.format === "regex") return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវតែផ្គូផ្គងនឹងទម្រង់ដែលបានកំណត់ ${J.pattern}`;
        return `មិនត្រឹមត្រូវ៖ ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `លេខមិនត្រឹមត្រូវ៖ ត្រូវតែជាពហុគុណនៃ ${z.divisor}`;
      case "unrecognized_keys":
        return `រកឃើញសោមិនស្គាល់៖ ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `សោមិនត្រឹមត្រូវនៅក្នុង ${z.origin}`;
      case "invalid_union":
        return "ទិន្នន័យមិនត្រឹមត្រូវ";
      case "invalid_element":
        return `ទិន្នន័យមិនត្រឹមត្រូវនៅក្នុង ${z.origin}`;
      default:
        return "ទិន្នន័យមិនត្រឹមត្រូវ";
    }
  };
};
function D1() {
  return { localeError: RN() };
}
function oX() {
  return D1();
}
var kN = () => {
  let $ = {
    string: { unit: "문자", verb: "to have" },
    file: { unit: "바이트", verb: "to have" },
    array: { unit: "개", verb: "to have" },
    set: { unit: "개", verb: "to have" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(z)) return "array";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "입력",
      email: "이메일 주소",
      url: "URL",
      emoji: "이모지",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO 날짜시간",
      date: "ISO 날짜",
      time: "ISO 시간",
      duration: "ISO 기간",
      ipv4: "IPv4 주소",
      ipv6: "IPv6 주소",
      cidrv4: "IPv4 범위",
      cidrv6: "IPv6 범위",
      base64: "base64 인코딩 문자열",
      base64url: "base64url 인코딩 문자열",
      json_string: "JSON 문자열",
      e164: "E.164 번호",
      jwt: "JWT",
      template_literal: "입력",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `잘못된 입력: 예상 타입은 ${z.expected}, 받은 타입은 ${v(z.input)}입니다`;
      case "invalid_value":
        if (z.values.length === 1) return `잘못된 입력: 값은 ${F(z.values[0])} 이어야 합니다`;
        return `잘못된 옵션: ${b(z.values, "또는 ")} 중 하나여야 합니다`;
      case "too_big": {
        let J = z.inclusive ? "이하" : "미만",
          j = J === "미만" ? "이어야 합니다" : "여야 합니다",
          Q = U(z.origin),
          W = Q?.unit ?? "요소";
        if (Q) return `${z.origin ?? "값"}이 너무 큽니다: ${z.maximum.toString()}${W} ${J}${j}`;
        return `${z.origin ?? "값"}이 너무 큽니다: ${z.maximum.toString()} ${J}${j}`;
      }
      case "too_small": {
        let J = z.inclusive ? "이상" : "초과",
          j = J === "이상" ? "이어야 합니다" : "여야 합니다",
          Q = U(z.origin),
          W = Q?.unit ?? "요소";
        if (Q) return `${z.origin ?? "값"}이 너무 작습니다: ${z.minimum.toString()}${W} ${J}${j}`;
        return `${z.origin ?? "값"}이 너무 작습니다: ${z.minimum.toString()} ${J}${j}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `잘못된 문자열: "${J.prefix}"(으)로 시작해야 합니다`;
        if (J.format === "ends_with") return `잘못된 문자열: "${J.suffix}"(으)로 끝나야 합니다`;
        if (J.format === "includes") return `잘못된 문자열: "${J.includes}"을(를) 포함해야 합니다`;
        if (J.format === "regex") return `잘못된 문자열: 정규식 ${J.pattern} 패턴과 일치해야 합니다`;
        return `잘못된 ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `잘못된 숫자: ${z.divisor}의 배수여야 합니다`;
      case "unrecognized_keys":
        return `인식할 수 없는 키: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `잘못된 키: ${z.origin}`;
      case "invalid_union":
        return "잘못된 입력";
      case "invalid_element":
        return `잘못된 값: ${z.origin}`;
      default:
        return "잘못된 입력";
    }
  };
};
function tX() {
  return { localeError: kN() };
}
var ZN = ($) => {
    return b1(typeof $, $);
  },
  b1 = ($, U = void 0) => {
    switch ($) {
      case "number":
        return Number.isNaN(U) ? "NaN" : "skaičius";
      case "bigint":
        return "sveikasis skaičius";
      case "string":
        return "eilutė";
      case "boolean":
        return "loginė reikšmė";
      case "undefined":
      case "void":
        return "neapibrėžta reikšmė";
      case "function":
        return "funkcija";
      case "symbol":
        return "simbolis";
      case "object": {
        if (U === void 0) return "nežinomas objektas";
        if (U === null) return "nulinė reikšmė";
        if (Array.isArray(U)) return "masyvas";
        if (Object.getPrototypeOf(U) !== Object.prototype && U.constructor) return U.constructor.name;
        return "objektas";
      }
      case "null":
        return "nulinė reikšmė";
    }
    return $;
  },
  K1 = ($) => {
    return $.charAt(0).toUpperCase() + $.slice(1);
  };
function zW($) {
  let U = Math.abs($),
    v = U % 10,
    X = U % 100;
  if ((X >= 11 && X <= 19) || v === 0) return "many";
  if (v === 1) return "one";
  return "few";
}
var TN = () => {
  let $ = {
    string: {
      unit: { one: "simbolis", few: "simboliai", many: "simbolių" },
      verb: {
        smaller: { inclusive: "turi būti ne ilgesnė kaip", notInclusive: "turi būti trumpesnė kaip" },
        bigger: { inclusive: "turi būti ne trumpesnė kaip", notInclusive: "turi būti ilgesnė kaip" },
      },
    },
    file: {
      unit: { one: "baitas", few: "baitai", many: "baitų" },
      verb: {
        smaller: { inclusive: "turi būti ne didesnis kaip", notInclusive: "turi būti mažesnis kaip" },
        bigger: { inclusive: "turi būti ne mažesnis kaip", notInclusive: "turi būti didesnis kaip" },
      },
    },
    array: {
      unit: { one: "elementą", few: "elementus", many: "elementų" },
      verb: {
        smaller: { inclusive: "turi turėti ne daugiau kaip", notInclusive: "turi turėti mažiau kaip" },
        bigger: { inclusive: "turi turėti ne mažiau kaip", notInclusive: "turi turėti daugiau kaip" },
      },
    },
    set: {
      unit: { one: "elementą", few: "elementus", many: "elementų" },
      verb: {
        smaller: { inclusive: "turi turėti ne daugiau kaip", notInclusive: "turi turėti mažiau kaip" },
        bigger: { inclusive: "turi turėti ne mažiau kaip", notInclusive: "turi turėti daugiau kaip" },
      },
    },
  };
  function U(X, z, J, j) {
    let Q = $[X] ?? null;
    if (Q === null) return Q;
    return { unit: Q.unit[z], verb: Q.verb[j][J ? "inclusive" : "notInclusive"] };
  }
  let v = {
    regex: "įvestis",
    email: "el. pašto adresas",
    url: "URL",
    emoji: "jaustukas",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO data ir laikas",
    date: "ISO data",
    time: "ISO laikas",
    duration: "ISO trukmė",
    ipv4: "IPv4 adresas",
    ipv6: "IPv6 adresas",
    cidrv4: "IPv4 tinklo prefiksas (CIDR)",
    cidrv6: "IPv6 tinklo prefiksas (CIDR)",
    base64: "base64 užkoduota eilutė",
    base64url: "base64url užkoduota eilutė",
    json_string: "JSON eilutė",
    e164: "E.164 numeris",
    jwt: "JWT",
    template_literal: "įvestis",
  };
  return (X) => {
    switch (X.code) {
      case "invalid_type":
        return `Gautas tipas ${ZN(X.input)}, o tikėtasi - ${b1(X.expected)}`;
      case "invalid_value":
        if (X.values.length === 1) return `Privalo būti ${F(X.values[0])}`;
        return `Privalo būti vienas iš ${b(X.values, "|")} pasirinkimų`;
      case "too_big": {
        let z = b1(X.origin),
          J = U(X.origin, zW(Number(X.maximum)), X.inclusive ?? !1, "smaller");
        if (J?.verb)
          return `${K1(z ?? X.origin ?? "reikšmė")} ${J.verb} ${X.maximum.toString()} ${J.unit ?? "elementų"}`;
        let j = X.inclusive ? "ne didesnis kaip" : "mažesnis kaip";
        return `${K1(z ?? X.origin ?? "reikšmė")} turi būti ${j} ${X.maximum.toString()} ${J?.unit}`;
      }
      case "too_small": {
        let z = b1(X.origin),
          J = U(X.origin, zW(Number(X.minimum)), X.inclusive ?? !1, "bigger");
        if (J?.verb)
          return `${K1(z ?? X.origin ?? "reikšmė")} ${J.verb} ${X.minimum.toString()} ${J.unit ?? "elementų"}`;
        let j = X.inclusive ? "ne mažesnis kaip" : "didesnis kaip";
        return `${K1(z ?? X.origin ?? "reikšmė")} turi būti ${j} ${X.minimum.toString()} ${J?.unit}`;
      }
      case "invalid_format": {
        let z = X;
        if (z.format === "starts_with") return `Eilutė privalo prasidėti "${z.prefix}"`;
        if (z.format === "ends_with") return `Eilutė privalo pasibaigti "${z.suffix}"`;
        if (z.format === "includes") return `Eilutė privalo įtraukti "${z.includes}"`;
        if (z.format === "regex") return `Eilutė privalo atitikti ${z.pattern}`;
        return `Neteisingas ${v[z.format] ?? X.format}`;
      }
      case "not_multiple_of":
        return `Skaičius privalo būti ${X.divisor} kartotinis.`;
      case "unrecognized_keys":
        return `Neatpažint${X.keys.length > 1 ? "i" : "as"} rakt${X.keys.length > 1 ? "ai" : "as"}: ${b(X.keys, ", ")}`;
      case "invalid_key":
        return "Rastas klaidingas raktas";
      case "invalid_union":
        return "Klaidinga įvestis";
      case "invalid_element": {
        let z = b1(X.origin);
        return `${K1(z ?? X.origin ?? "reikšmė")} turi klaidingą įvestį`;
      }
      default:
        return "Klaidinga įvestis";
    }
  };
};
function aX() {
  return { localeError: TN() };
}
var CN = () => {
  let $ = {
    string: { unit: "знаци", verb: "да имаат" },
    file: { unit: "бајти", verb: "да имаат" },
    array: { unit: "ставки", verb: "да имаат" },
    set: { unit: "ставки", verb: "да имаат" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "број";
        case "object": {
          if (Array.isArray(z)) return "низа";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "внес",
      email: "адреса на е-пошта",
      url: "URL",
      emoji: "емоџи",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO датум и време",
      date: "ISO датум",
      time: "ISO време",
      duration: "ISO времетраење",
      ipv4: "IPv4 адреса",
      ipv6: "IPv6 адреса",
      cidrv4: "IPv4 опсег",
      cidrv6: "IPv6 опсег",
      base64: "base64-енкодирана низа",
      base64url: "base64url-енкодирана низа",
      json_string: "JSON низа",
      e164: "E.164 број",
      jwt: "JWT",
      template_literal: "внес",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Грешен внес: се очекува ${z.expected}, примено ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Invalid input: expected ${F(z.values[0])}`;
        return `Грешана опција: се очекува една ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j)
          return `Премногу голем: се очекува ${z.origin ?? "вредноста"} да има ${J}${z.maximum.toString()} ${j.unit ?? "елементи"}`;
        return `Премногу голем: се очекува ${z.origin ?? "вредноста"} да биде ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `Премногу мал: се очекува ${z.origin} да има ${J}${z.minimum.toString()} ${j.unit}`;
        return `Премногу мал: се очекува ${z.origin} да биде ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Неважечка низа: мора да започнува со "${J.prefix}"`;
        if (J.format === "ends_with") return `Неважечка низа: мора да завршува со "${J.suffix}"`;
        if (J.format === "includes") return `Неважечка низа: мора да вклучува "${J.includes}"`;
        if (J.format === "regex") return `Неважечка низа: мора да одгоара на патернот ${J.pattern}`;
        return `Invalid ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `Грешен број: мора да биде делив со ${z.divisor}`;
      case "unrecognized_keys":
        return `${z.keys.length > 1 ? "Непрепознаени клучеви" : "Непрепознаен клуч"}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Грешен клуч во ${z.origin}`;
      case "invalid_union":
        return "Грешен внес";
      case "invalid_element":
        return `Грешна вредност во ${z.origin}`;
      default:
        return "Грешен внес";
    }
  };
};
function sX() {
  return { localeError: CN() };
}
var xN = () => {
  let $ = {
    string: { unit: "aksara", verb: "mempunyai" },
    file: { unit: "bait", verb: "mempunyai" },
    array: { unit: "elemen", verb: "mempunyai" },
    set: { unit: "elemen", verb: "mempunyai" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "nombor";
        case "object": {
          if (Array.isArray(z)) return "array";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "input",
      email: "alamat e-mel",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "tarikh masa ISO",
      date: "tarikh ISO",
      time: "masa ISO",
      duration: "tempoh ISO",
      ipv4: "alamat IPv4",
      ipv6: "alamat IPv6",
      cidrv4: "julat IPv4",
      cidrv6: "julat IPv6",
      base64: "string dikodkan base64",
      base64url: "string dikodkan base64url",
      json_string: "string JSON",
      e164: "nombor E.164",
      jwt: "JWT",
      template_literal: "input",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Input tidak sah: dijangka ${z.expected}, diterima ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Input tidak sah: dijangka ${F(z.values[0])}`;
        return `Pilihan tidak sah: dijangka salah satu daripada ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j)
          return `Terlalu besar: dijangka ${z.origin ?? "nilai"} ${j.verb} ${J}${z.maximum.toString()} ${j.unit ?? "elemen"}`;
        return `Terlalu besar: dijangka ${z.origin ?? "nilai"} adalah ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `Terlalu kecil: dijangka ${z.origin} ${j.verb} ${J}${z.minimum.toString()} ${j.unit}`;
        return `Terlalu kecil: dijangka ${z.origin} adalah ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `String tidak sah: mesti bermula dengan "${J.prefix}"`;
        if (J.format === "ends_with") return `String tidak sah: mesti berakhir dengan "${J.suffix}"`;
        if (J.format === "includes") return `String tidak sah: mesti mengandungi "${J.includes}"`;
        if (J.format === "regex") return `String tidak sah: mesti sepadan dengan corak ${J.pattern}`;
        return `${X[J.format] ?? z.format} tidak sah`;
      }
      case "not_multiple_of":
        return `Nombor tidak sah: perlu gandaan ${z.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak sah dalam ${z.origin}`;
      case "invalid_union":
        return "Input tidak sah";
      case "invalid_element":
        return `Nilai tidak sah dalam ${z.origin}`;
      default:
        return "Input tidak sah";
    }
  };
};
function eX() {
  return { localeError: xN() };
}
var gN = () => {
  let $ = {
    string: { unit: "tekens" },
    file: { unit: "bytes" },
    array: { unit: "elementen" },
    set: { unit: "elementen" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "getal";
        case "object": {
          if (Array.isArray(z)) return "array";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "invoer",
      email: "emailadres",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO datum en tijd",
      date: "ISO datum",
      time: "ISO tijd",
      duration: "ISO duur",
      ipv4: "IPv4-adres",
      ipv6: "IPv6-adres",
      cidrv4: "IPv4-bereik",
      cidrv6: "IPv6-bereik",
      base64: "base64-gecodeerde tekst",
      base64url: "base64 URL-gecodeerde tekst",
      json_string: "JSON string",
      e164: "E.164-nummer",
      jwt: "JWT",
      template_literal: "invoer",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Ongeldige invoer: verwacht ${z.expected}, ontving ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Ongeldige invoer: verwacht ${F(z.values[0])}`;
        return `Ongeldige optie: verwacht één van ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j)
          return `Te lang: verwacht dat ${z.origin ?? "waarde"} ${J}${z.maximum.toString()} ${j.unit ?? "elementen"} bevat`;
        return `Te lang: verwacht dat ${z.origin ?? "waarde"} ${J}${z.maximum.toString()} is`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `Te kort: verwacht dat ${z.origin} ${J}${z.minimum.toString()} ${j.unit} bevat`;
        return `Te kort: verwacht dat ${z.origin} ${J}${z.minimum.toString()} is`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Ongeldige tekst: moet met "${J.prefix}" beginnen`;
        if (J.format === "ends_with") return `Ongeldige tekst: moet op "${J.suffix}" eindigen`;
        if (J.format === "includes") return `Ongeldige tekst: moet "${J.includes}" bevatten`;
        if (J.format === "regex") return `Ongeldige tekst: moet overeenkomen met patroon ${J.pattern}`;
        return `Ongeldig: ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `Ongeldig getal: moet een veelvoud van ${z.divisor} zijn`;
      case "unrecognized_keys":
        return `Onbekende key${z.keys.length > 1 ? "s" : ""}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Ongeldige key in ${z.origin}`;
      case "invalid_union":
        return "Ongeldige invoer";
      case "invalid_element":
        return `Ongeldige waarde in ${z.origin}`;
      default:
        return "Ongeldige invoer";
    }
  };
};
function $J() {
  return { localeError: gN() };
}
var fN = () => {
  let $ = {
    string: { unit: "tegn", verb: "å ha" },
    file: { unit: "bytes", verb: "å ha" },
    array: { unit: "elementer", verb: "å inneholde" },
    set: { unit: "elementer", verb: "å inneholde" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "tall";
        case "object": {
          if (Array.isArray(z)) return "liste";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "input",
      email: "e-postadresse",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO dato- og klokkeslett",
      date: "ISO-dato",
      time: "ISO-klokkeslett",
      duration: "ISO-varighet",
      ipv4: "IPv4-område",
      ipv6: "IPv6-område",
      cidrv4: "IPv4-spekter",
      cidrv6: "IPv6-spekter",
      base64: "base64-enkodet streng",
      base64url: "base64url-enkodet streng",
      json_string: "JSON-streng",
      e164: "E.164-nummer",
      jwt: "JWT",
      template_literal: "input",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Ugyldig input: forventet ${z.expected}, fikk ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Ugyldig verdi: forventet ${F(z.values[0])}`;
        return `Ugyldig valg: forventet en av ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j)
          return `For stor(t): forventet ${z.origin ?? "value"} til å ha ${J}${z.maximum.toString()} ${j.unit ?? "elementer"}`;
        return `For stor(t): forventet ${z.origin ?? "value"} til å ha ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `For lite(n): forventet ${z.origin} til å ha ${J}${z.minimum.toString()} ${j.unit}`;
        return `For lite(n): forventet ${z.origin} til å ha ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Ugyldig streng: må starte med "${J.prefix}"`;
        if (J.format === "ends_with") return `Ugyldig streng: må ende med "${J.suffix}"`;
        if (J.format === "includes") return `Ugyldig streng: må inneholde "${J.includes}"`;
        if (J.format === "regex") return `Ugyldig streng: må matche mønsteret ${J.pattern}`;
        return `Ugyldig ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `Ugyldig tall: må være et multiplum av ${z.divisor}`;
      case "unrecognized_keys":
        return `${z.keys.length > 1 ? "Ukjente nøkler" : "Ukjent nøkkel"}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig nøkkel i ${z.origin}`;
      case "invalid_union":
        return "Ugyldig input";
      case "invalid_element":
        return `Ugyldig verdi i ${z.origin}`;
      default:
        return "Ugyldig input";
    }
  };
};
function UJ() {
  return { localeError: fN() };
}
var hN = () => {
  let $ = {
    string: { unit: "harf", verb: "olmalıdır" },
    file: { unit: "bayt", verb: "olmalıdır" },
    array: { unit: "unsur", verb: "olmalıdır" },
    set: { unit: "unsur", verb: "olmalıdır" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "numara";
        case "object": {
          if (Array.isArray(z)) return "saf";
          if (z === null) return "gayb";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "giren",
      email: "epostagâh",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO hengâmı",
      date: "ISO tarihi",
      time: "ISO zamanı",
      duration: "ISO müddeti",
      ipv4: "IPv4 nişânı",
      ipv6: "IPv6 nişânı",
      cidrv4: "IPv4 menzili",
      cidrv6: "IPv6 menzili",
      base64: "base64-şifreli metin",
      base64url: "base64url-şifreli metin",
      json_string: "JSON metin",
      e164: "E.164 sayısı",
      jwt: "JWT",
      template_literal: "giren",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Fâsit giren: umulan ${z.expected}, alınan ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Fâsit giren: umulan ${F(z.values[0])}`;
        return `Fâsit tercih: mûteberler ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j)
          return `Fazla büyük: ${z.origin ?? "value"}, ${J}${z.maximum.toString()} ${j.unit ?? "elements"} sahip olmalıydı.`;
        return `Fazla büyük: ${z.origin ?? "value"}, ${J}${z.maximum.toString()} olmalıydı.`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `Fazla küçük: ${z.origin}, ${J}${z.minimum.toString()} ${j.unit} sahip olmalıydı.`;
        return `Fazla küçük: ${z.origin}, ${J}${z.minimum.toString()} olmalıydı.`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Fâsit metin: "${J.prefix}" ile başlamalı.`;
        if (J.format === "ends_with") return `Fâsit metin: "${J.suffix}" ile bitmeli.`;
        if (J.format === "includes") return `Fâsit metin: "${J.includes}" ihtivâ etmeli.`;
        if (J.format === "regex") return `Fâsit metin: ${J.pattern} nakşına uymalı.`;
        return `Fâsit ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `Fâsit sayı: ${z.divisor} katı olmalıydı.`;
      case "unrecognized_keys":
        return `Tanınmayan anahtar ${z.keys.length > 1 ? "s" : ""}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `${z.origin} için tanınmayan anahtar var.`;
      case "invalid_union":
        return "Giren tanınamadı.";
      case "invalid_element":
        return `${z.origin} için tanınmayan kıymet var.`;
      default:
        return "Kıymet tanınamadı.";
    }
  };
};
function zJ() {
  return { localeError: hN() };
}
var yN = () => {
  let $ = {
    string: { unit: "توکي", verb: "ولري" },
    file: { unit: "بایټس", verb: "ولري" },
    array: { unit: "توکي", verb: "ولري" },
    set: { unit: "توکي", verb: "ولري" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "عدد";
        case "object": {
          if (Array.isArray(z)) return "ارې";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "ورودي",
      email: "بریښنالیک",
      url: "یو آر ال",
      emoji: "ایموجي",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "نیټه او وخت",
      date: "نېټه",
      time: "وخت",
      duration: "موده",
      ipv4: "د IPv4 پته",
      ipv6: "د IPv6 پته",
      cidrv4: "د IPv4 ساحه",
      cidrv6: "د IPv6 ساحه",
      base64: "base64-encoded متن",
      base64url: "base64url-encoded متن",
      json_string: "JSON متن",
      e164: "د E.164 شمېره",
      jwt: "JWT",
      template_literal: "ورودي",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `ناسم ورودي: باید ${z.expected} وای, مګر ${v(z.input)} ترلاسه شو`;
      case "invalid_value":
        if (z.values.length === 1) return `ناسم ورودي: باید ${F(z.values[0])} وای`;
        return `ناسم انتخاب: باید یو له ${b(z.values, "|")} څخه وای`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j) return `ډیر لوی: ${z.origin ?? "ارزښت"} باید ${J}${z.maximum.toString()} ${j.unit ?? "عنصرونه"} ولري`;
        return `ډیر لوی: ${z.origin ?? "ارزښت"} باید ${J}${z.maximum.toString()} وي`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `ډیر کوچنی: ${z.origin} باید ${J}${z.minimum.toString()} ${j.unit} ولري`;
        return `ډیر کوچنی: ${z.origin} باید ${J}${z.minimum.toString()} وي`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `ناسم متن: باید د "${J.prefix}" سره پیل شي`;
        if (J.format === "ends_with") return `ناسم متن: باید د "${J.suffix}" سره پای ته ورسيږي`;
        if (J.format === "includes") return `ناسم متن: باید "${J.includes}" ولري`;
        if (J.format === "regex") return `ناسم متن: باید د ${J.pattern} سره مطابقت ولري`;
        return `${X[J.format] ?? z.format} ناسم دی`;
      }
      case "not_multiple_of":
        return `ناسم عدد: باید د ${z.divisor} مضرب وي`;
      case "unrecognized_keys":
        return `ناسم ${z.keys.length > 1 ? "کلیډونه" : "کلیډ"}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `ناسم کلیډ په ${z.origin} کې`;
      case "invalid_union":
        return "ناسمه ورودي";
      case "invalid_element":
        return `ناسم عنصر په ${z.origin} کې`;
      default:
        return "ناسمه ورودي";
    }
  };
};
function vJ() {
  return { localeError: yN() };
}
var mN = () => {
  let $ = {
    string: { unit: "znaków", verb: "mieć" },
    file: { unit: "bajtów", verb: "mieć" },
    array: { unit: "elementów", verb: "mieć" },
    set: { unit: "elementów", verb: "mieć" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "liczba";
        case "object": {
          if (Array.isArray(z)) return "tablica";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "wyrażenie",
      email: "adres email",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "data i godzina w formacie ISO",
      date: "data w formacie ISO",
      time: "godzina w formacie ISO",
      duration: "czas trwania ISO",
      ipv4: "adres IPv4",
      ipv6: "adres IPv6",
      cidrv4: "zakres IPv4",
      cidrv6: "zakres IPv6",
      base64: "ciąg znaków zakodowany w formacie base64",
      base64url: "ciąg znaków zakodowany w formacie base64url",
      json_string: "ciąg znaków w formacie JSON",
      e164: "liczba E.164",
      jwt: "JWT",
      template_literal: "wejście",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Nieprawidłowe dane wejściowe: oczekiwano ${z.expected}, otrzymano ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Nieprawidłowe dane wejściowe: oczekiwano ${F(z.values[0])}`;
        return `Nieprawidłowa opcja: oczekiwano jednej z wartości ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j)
          return `Za duża wartość: oczekiwano, że ${z.origin ?? "wartość"} będzie mieć ${J}${z.maximum.toString()} ${j.unit ?? "elementów"}`;
        return `Zbyt duż(y/a/e): oczekiwano, że ${z.origin ?? "wartość"} będzie wynosić ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j)
          return `Za mała wartość: oczekiwano, że ${z.origin ?? "wartość"} będzie mieć ${J}${z.minimum.toString()} ${j.unit ?? "elementów"}`;
        return `Zbyt mał(y/a/e): oczekiwano, że ${z.origin ?? "wartość"} będzie wynosić ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Nieprawidłowy ciąg znaków: musi zaczynać się od "${J.prefix}"`;
        if (J.format === "ends_with") return `Nieprawidłowy ciąg znaków: musi kończyć się na "${J.suffix}"`;
        if (J.format === "includes") return `Nieprawidłowy ciąg znaków: musi zawierać "${J.includes}"`;
        if (J.format === "regex") return `Nieprawidłowy ciąg znaków: musi odpowiadać wzorcowi ${J.pattern}`;
        return `Nieprawidłow(y/a/e) ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `Nieprawidłowa liczba: musi być wielokrotnością ${z.divisor}`;
      case "unrecognized_keys":
        return `Nierozpoznane klucze${z.keys.length > 1 ? "s" : ""}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Nieprawidłowy klucz w ${z.origin}`;
      case "invalid_union":
        return "Nieprawidłowe dane wejściowe";
      case "invalid_element":
        return `Nieprawidłowa wartość w ${z.origin}`;
      default:
        return "Nieprawidłowe dane wejściowe";
    }
  };
};
function XJ() {
  return { localeError: mN() };
}
var uN = () => {
  let $ = {
    string: { unit: "caracteres", verb: "ter" },
    file: { unit: "bytes", verb: "ter" },
    array: { unit: "itens", verb: "ter" },
    set: { unit: "itens", verb: "ter" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "número";
        case "object": {
          if (Array.isArray(z)) return "array";
          if (z === null) return "nulo";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "padrão",
      email: "endereço de e-mail",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "data e hora ISO",
      date: "data ISO",
      time: "hora ISO",
      duration: "duração ISO",
      ipv4: "endereço IPv4",
      ipv6: "endereço IPv6",
      cidrv4: "faixa de IPv4",
      cidrv6: "faixa de IPv6",
      base64: "texto codificado em base64",
      base64url: "URL codificada em base64",
      json_string: "texto JSON",
      e164: "número E.164",
      jwt: "JWT",
      template_literal: "entrada",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Tipo inválido: esperado ${z.expected}, recebido ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Entrada inválida: esperado ${F(z.values[0])}`;
        return `Opção inválida: esperada uma das ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j)
          return `Muito grande: esperado que ${z.origin ?? "valor"} tivesse ${J}${z.maximum.toString()} ${j.unit ?? "elementos"}`;
        return `Muito grande: esperado que ${z.origin ?? "valor"} fosse ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `Muito pequeno: esperado que ${z.origin} tivesse ${J}${z.minimum.toString()} ${j.unit}`;
        return `Muito pequeno: esperado que ${z.origin} fosse ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Texto inválido: deve começar com "${J.prefix}"`;
        if (J.format === "ends_with") return `Texto inválido: deve terminar com "${J.suffix}"`;
        if (J.format === "includes") return `Texto inválido: deve incluir "${J.includes}"`;
        if (J.format === "regex") return `Texto inválido: deve corresponder ao padrão ${J.pattern}`;
        return `${X[J.format] ?? z.format} inválido`;
      }
      case "not_multiple_of":
        return `Número inválido: deve ser múltiplo de ${z.divisor}`;
      case "unrecognized_keys":
        return `Chave${z.keys.length > 1 ? "s" : ""} desconhecida${z.keys.length > 1 ? "s" : ""}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Chave inválida em ${z.origin}`;
      case "invalid_union":
        return "Entrada inválida";
      case "invalid_element":
        return `Valor inválido em ${z.origin}`;
      default:
        return "Campo inválido";
    }
  };
};
function JJ() {
  return { localeError: uN() };
}
function vW($, U, v, X) {
  let z = Math.abs($),
    J = z % 10,
    j = z % 100;
  if (j >= 11 && j <= 19) return X;
  if (J === 1) return U;
  if (J >= 2 && J <= 4) return v;
  return X;
}
var cN = () => {
  let $ = {
    string: { unit: { one: "символ", few: "символа", many: "символов" }, verb: "иметь" },
    file: { unit: { one: "байт", few: "байта", many: "байт" }, verb: "иметь" },
    array: { unit: { one: "элемент", few: "элемента", many: "элементов" }, verb: "иметь" },
    set: { unit: { one: "элемент", few: "элемента", many: "элементов" }, verb: "иметь" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "число";
        case "object": {
          if (Array.isArray(z)) return "массив";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "ввод",
      email: "email адрес",
      url: "URL",
      emoji: "эмодзи",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO дата и время",
      date: "ISO дата",
      time: "ISO время",
      duration: "ISO длительность",
      ipv4: "IPv4 адрес",
      ipv6: "IPv6 адрес",
      cidrv4: "IPv4 диапазон",
      cidrv6: "IPv6 диапазон",
      base64: "строка в формате base64",
      base64url: "строка в формате base64url",
      json_string: "JSON строка",
      e164: "номер E.164",
      jwt: "JWT",
      template_literal: "ввод",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Неверный ввод: ожидалось ${z.expected}, получено ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Неверный ввод: ожидалось ${F(z.values[0])}`;
        return `Неверный вариант: ожидалось одно из ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j) {
          let Q = Number(z.maximum),
            W = vW(Q, j.unit.one, j.unit.few, j.unit.many);
          return `Слишком большое значение: ожидалось, что ${z.origin ?? "значение"} будет иметь ${J}${z.maximum.toString()} ${W}`;
        }
        return `Слишком большое значение: ожидалось, что ${z.origin ?? "значение"} будет ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) {
          let Q = Number(z.minimum),
            W = vW(Q, j.unit.one, j.unit.few, j.unit.many);
          return `Слишком маленькое значение: ожидалось, что ${z.origin} будет иметь ${J}${z.minimum.toString()} ${W}`;
        }
        return `Слишком маленькое значение: ожидалось, что ${z.origin} будет ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Неверная строка: должна начинаться с "${J.prefix}"`;
        if (J.format === "ends_with") return `Неверная строка: должна заканчиваться на "${J.suffix}"`;
        if (J.format === "includes") return `Неверная строка: должна содержать "${J.includes}"`;
        if (J.format === "regex") return `Неверная строка: должна соответствовать шаблону ${J.pattern}`;
        return `Неверный ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `Неверное число: должно быть кратным ${z.divisor}`;
      case "unrecognized_keys":
        return `Нераспознанн${z.keys.length > 1 ? "ые" : "ый"} ключ${z.keys.length > 1 ? "и" : ""}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Неверный ключ в ${z.origin}`;
      case "invalid_union":
        return "Неверные входные данные";
      case "invalid_element":
        return `Неверное значение в ${z.origin}`;
      default:
        return "Неверные входные данные";
    }
  };
};
function jJ() {
  return { localeError: cN() };
}
var iN = () => {
  let $ = {
    string: { unit: "znakov", verb: "imeti" },
    file: { unit: "bajtov", verb: "imeti" },
    array: { unit: "elementov", verb: "imeti" },
    set: { unit: "elementov", verb: "imeti" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "število";
        case "object": {
          if (Array.isArray(z)) return "tabela";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "vnos",
      email: "e-poštni naslov",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO datum in čas",
      date: "ISO datum",
      time: "ISO čas",
      duration: "ISO trajanje",
      ipv4: "IPv4 naslov",
      ipv6: "IPv6 naslov",
      cidrv4: "obseg IPv4",
      cidrv6: "obseg IPv6",
      base64: "base64 kodiran niz",
      base64url: "base64url kodiran niz",
      json_string: "JSON niz",
      e164: "E.164 številka",
      jwt: "JWT",
      template_literal: "vnos",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Neveljaven vnos: pričakovano ${z.expected}, prejeto ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Neveljaven vnos: pričakovano ${F(z.values[0])}`;
        return `Neveljavna možnost: pričakovano eno izmed ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j)
          return `Preveliko: pričakovano, da bo ${z.origin ?? "vrednost"} imelo ${J}${z.maximum.toString()} ${j.unit ?? "elementov"}`;
        return `Preveliko: pričakovano, da bo ${z.origin ?? "vrednost"} ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `Premajhno: pričakovano, da bo ${z.origin} imelo ${J}${z.minimum.toString()} ${j.unit}`;
        return `Premajhno: pričakovano, da bo ${z.origin} ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Neveljaven niz: mora se začeti z "${J.prefix}"`;
        if (J.format === "ends_with") return `Neveljaven niz: mora se končati z "${J.suffix}"`;
        if (J.format === "includes") return `Neveljaven niz: mora vsebovati "${J.includes}"`;
        if (J.format === "regex") return `Neveljaven niz: mora ustrezati vzorcu ${J.pattern}`;
        return `Neveljaven ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `Neveljavno število: mora biti večkratnik ${z.divisor}`;
      case "unrecognized_keys":
        return `Neprepoznan${z.keys.length > 1 ? "i ključi" : " ključ"}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Neveljaven ključ v ${z.origin}`;
      case "invalid_union":
        return "Neveljaven vnos";
      case "invalid_element":
        return `Neveljavna vrednost v ${z.origin}`;
      default:
        return "Neveljaven vnos";
    }
  };
};
function QJ() {
  return { localeError: iN() };
}
var nN = () => {
  let $ = {
    string: { unit: "tecken", verb: "att ha" },
    file: { unit: "bytes", verb: "att ha" },
    array: { unit: "objekt", verb: "att innehålla" },
    set: { unit: "objekt", verb: "att innehålla" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "antal";
        case "object": {
          if (Array.isArray(z)) return "lista";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "reguljärt uttryck",
      email: "e-postadress",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO-datum och tid",
      date: "ISO-datum",
      time: "ISO-tid",
      duration: "ISO-varaktighet",
      ipv4: "IPv4-intervall",
      ipv6: "IPv6-intervall",
      cidrv4: "IPv4-spektrum",
      cidrv6: "IPv6-spektrum",
      base64: "base64-kodad sträng",
      base64url: "base64url-kodad sträng",
      json_string: "JSON-sträng",
      e164: "E.164-nummer",
      jwt: "JWT",
      template_literal: "mall-literal",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Ogiltig inmatning: förväntat ${z.expected}, fick ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Ogiltig inmatning: förväntat ${F(z.values[0])}`;
        return `Ogiltigt val: förväntade en av ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j)
          return `För stor(t): förväntade ${z.origin ?? "värdet"} att ha ${J}${z.maximum.toString()} ${j.unit ?? "element"}`;
        return `För stor(t): förväntat ${z.origin ?? "värdet"} att ha ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `För lite(t): förväntade ${z.origin ?? "värdet"} att ha ${J}${z.minimum.toString()} ${j.unit}`;
        return `För lite(t): förväntade ${z.origin ?? "värdet"} att ha ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Ogiltig sträng: måste börja med "${J.prefix}"`;
        if (J.format === "ends_with") return `Ogiltig sträng: måste sluta med "${J.suffix}"`;
        if (J.format === "includes") return `Ogiltig sträng: måste innehålla "${J.includes}"`;
        if (J.format === "regex") return `Ogiltig sträng: måste matcha mönstret "${J.pattern}"`;
        return `Ogiltig(t) ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `Ogiltigt tal: måste vara en multipel av ${z.divisor}`;
      case "unrecognized_keys":
        return `${z.keys.length > 1 ? "Okända nycklar" : "Okänd nyckel"}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Ogiltig nyckel i ${z.origin ?? "värdet"}`;
      case "invalid_union":
        return "Ogiltig input";
      case "invalid_element":
        return `Ogiltigt värde i ${z.origin ?? "värdet"}`;
      default:
        return "Ogiltig input";
    }
  };
};
function YJ() {
  return { localeError: nN() };
}
var lN = () => {
  let $ = {
    string: { unit: "எழுத்துக்கள்", verb: "கொண்டிருக்க வேண்டும்" },
    file: { unit: "பைட்டுகள்", verb: "கொண்டிருக்க வேண்டும்" },
    array: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" },
    set: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "எண் அல்லாதது" : "எண்";
        case "object": {
          if (Array.isArray(z)) return "அணி";
          if (z === null) return "வெறுமை";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "உள்ளீடு",
      email: "மின்னஞ்சல் முகவரி",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO தேதி நேரம்",
      date: "ISO தேதி",
      time: "ISO நேரம்",
      duration: "ISO கால அளவு",
      ipv4: "IPv4 முகவரி",
      ipv6: "IPv6 முகவரி",
      cidrv4: "IPv4 வரம்பு",
      cidrv6: "IPv6 வரம்பு",
      base64: "base64-encoded சரம்",
      base64url: "base64url-encoded சரம்",
      json_string: "JSON சரம்",
      e164: "E.164 எண்",
      jwt: "JWT",
      template_literal: "input",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${z.expected}, பெறப்பட்டது ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${F(z.values[0])}`;
        return `தவறான விருப்பம்: எதிர்பார்க்கப்பட்டது ${b(z.values, "|")} இல் ஒன்று`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j)
          return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${z.origin ?? "மதிப்பு"} ${J}${z.maximum.toString()} ${j.unit ?? "உறுப்புகள்"} ஆக இருக்க வேண்டும்`;
        return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${z.origin ?? "மதிப்பு"} ${J}${z.maximum.toString()} ஆக இருக்க வேண்டும்`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j)
          return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${z.origin} ${J}${z.minimum.toString()} ${j.unit} ஆக இருக்க வேண்டும்`;
        return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${z.origin} ${J}${z.minimum.toString()} ஆக இருக்க வேண்டும்`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `தவறான சரம்: "${J.prefix}" இல் தொடங்க வேண்டும்`;
        if (J.format === "ends_with") return `தவறான சரம்: "${J.suffix}" இல் முடிவடைய வேண்டும்`;
        if (J.format === "includes") return `தவறான சரம்: "${J.includes}" ஐ உள்ளடக்க வேண்டும்`;
        if (J.format === "regex") return `தவறான சரம்: ${J.pattern} முறைபாட்டுடன் பொருந்த வேண்டும்`;
        return `தவறான ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `தவறான எண்: ${z.divisor} இன் பலமாக இருக்க வேண்டும்`;
      case "unrecognized_keys":
        return `அடையாளம் தெரியாத விசை${z.keys.length > 1 ? "கள்" : ""}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `${z.origin} இல் தவறான விசை`;
      case "invalid_union":
        return "தவறான உள்ளீடு";
      case "invalid_element":
        return `${z.origin} இல் தவறான மதிப்பு`;
      default:
        return "தவறான உள்ளீடு";
    }
  };
};
function WJ() {
  return { localeError: lN() };
}
var dN = () => {
  let $ = {
    string: { unit: "ตัวอักษร", verb: "ควรมี" },
    file: { unit: "ไบต์", verb: "ควรมี" },
    array: { unit: "รายการ", verb: "ควรมี" },
    set: { unit: "รายการ", verb: "ควรมี" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "ไม่ใช่ตัวเลข (NaN)" : "ตัวเลข";
        case "object": {
          if (Array.isArray(z)) return "อาร์เรย์ (Array)";
          if (z === null) return "ไม่มีค่า (null)";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "ข้อมูลที่ป้อน",
      email: "ที่อยู่อีเมล",
      url: "URL",
      emoji: "อิโมจิ",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "วันที่เวลาแบบ ISO",
      date: "วันที่แบบ ISO",
      time: "เวลาแบบ ISO",
      duration: "ช่วงเวลาแบบ ISO",
      ipv4: "ที่อยู่ IPv4",
      ipv6: "ที่อยู่ IPv6",
      cidrv4: "ช่วง IP แบบ IPv4",
      cidrv6: "ช่วง IP แบบ IPv6",
      base64: "ข้อความแบบ Base64",
      base64url: "ข้อความแบบ Base64 สำหรับ URL",
      json_string: "ข้อความแบบ JSON",
      e164: "เบอร์โทรศัพท์ระหว่างประเทศ (E.164)",
      jwt: "โทเคน JWT",
      template_literal: "ข้อมูลที่ป้อน",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น ${z.expected} แต่ได้รับ ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `ค่าไม่ถูกต้อง: ควรเป็น ${F(z.values[0])}`;
        return `ตัวเลือกไม่ถูกต้อง: ควรเป็นหนึ่งใน ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "ไม่เกิน" : "น้อยกว่า",
          j = U(z.origin);
        if (j) return `เกินกำหนด: ${z.origin ?? "ค่า"} ควรมี${J} ${z.maximum.toString()} ${j.unit ?? "รายการ"}`;
        return `เกินกำหนด: ${z.origin ?? "ค่า"} ควรมี${J} ${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? "อย่างน้อย" : "มากกว่า",
          j = U(z.origin);
        if (j) return `น้อยกว่ากำหนด: ${z.origin} ควรมี${J} ${z.minimum.toString()} ${j.unit}`;
        return `น้อยกว่ากำหนด: ${z.origin} ควรมี${J} ${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `รูปแบบไม่ถูกต้อง: ข้อความต้องขึ้นต้นด้วย "${J.prefix}"`;
        if (J.format === "ends_with") return `รูปแบบไม่ถูกต้อง: ข้อความต้องลงท้ายด้วย "${J.suffix}"`;
        if (J.format === "includes") return `รูปแบบไม่ถูกต้อง: ข้อความต้องมี "${J.includes}" อยู่ในข้อความ`;
        if (J.format === "regex") return `รูปแบบไม่ถูกต้อง: ต้องตรงกับรูปแบบที่กำหนด ${J.pattern}`;
        return `รูปแบบไม่ถูกต้อง: ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `ตัวเลขไม่ถูกต้อง: ต้องเป็นจำนวนที่หารด้วย ${z.divisor} ได้ลงตัว`;
      case "unrecognized_keys":
        return `พบคีย์ที่ไม่รู้จัก: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `คีย์ไม่ถูกต้องใน ${z.origin}`;
      case "invalid_union":
        return "ข้อมูลไม่ถูกต้อง: ไม่ตรงกับรูปแบบยูเนียนที่กำหนดไว้";
      case "invalid_element":
        return `ข้อมูลไม่ถูกต้องใน ${z.origin}`;
      default:
        return "ข้อมูลไม่ถูกต้อง";
    }
  };
};
function wJ() {
  return { localeError: dN() };
}
var pN = ($) => {
    let U = typeof $;
    switch (U) {
      case "number":
        return Number.isNaN($) ? "NaN" : "number";
      case "object": {
        if (Array.isArray($)) return "array";
        if ($ === null) return "null";
        if (Object.getPrototypeOf($) !== Object.prototype && $.constructor) return $.constructor.name;
      }
    }
    return U;
  },
  rN = () => {
    let $ = {
      string: { unit: "karakter", verb: "olmalı" },
      file: { unit: "bayt", verb: "olmalı" },
      array: { unit: "öğe", verb: "olmalı" },
      set: { unit: "öğe", verb: "olmalı" },
    };
    function U(X) {
      return $[X] ?? null;
    }
    let v = {
      regex: "girdi",
      email: "e-posta adresi",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO tarih ve saat",
      date: "ISO tarih",
      time: "ISO saat",
      duration: "ISO süre",
      ipv4: "IPv4 adresi",
      ipv6: "IPv6 adresi",
      cidrv4: "IPv4 aralığı",
      cidrv6: "IPv6 aralığı",
      base64: "base64 ile şifrelenmiş metin",
      base64url: "base64url ile şifrelenmiş metin",
      json_string: "JSON dizesi",
      e164: "E.164 sayısı",
      jwt: "JWT",
      template_literal: "Şablon dizesi",
    };
    return (X) => {
      switch (X.code) {
        case "invalid_type":
          return `Geçersiz değer: beklenen ${X.expected}, alınan ${pN(X.input)}`;
        case "invalid_value":
          if (X.values.length === 1) return `Geçersiz değer: beklenen ${F(X.values[0])}`;
          return `Geçersiz seçenek: aşağıdakilerden biri olmalı: ${b(X.values, "|")}`;
        case "too_big": {
          let z = X.inclusive ? "<=" : "<",
            J = U(X.origin);
          if (J) return `Çok büyük: beklenen ${X.origin ?? "değer"} ${z}${X.maximum.toString()} ${J.unit ?? "öğe"}`;
          return `Çok büyük: beklenen ${X.origin ?? "değer"} ${z}${X.maximum.toString()}`;
        }
        case "too_small": {
          let z = X.inclusive ? ">=" : ">",
            J = U(X.origin);
          if (J) return `Çok küçük: beklenen ${X.origin} ${z}${X.minimum.toString()} ${J.unit}`;
          return `Çok küçük: beklenen ${X.origin} ${z}${X.minimum.toString()}`;
        }
        case "invalid_format": {
          let z = X;
          if (z.format === "starts_with") return `Geçersiz metin: "${z.prefix}" ile başlamalı`;
          if (z.format === "ends_with") return `Geçersiz metin: "${z.suffix}" ile bitmeli`;
          if (z.format === "includes") return `Geçersiz metin: "${z.includes}" içermeli`;
          if (z.format === "regex") return `Geçersiz metin: ${z.pattern} desenine uymalı`;
          return `Geçersiz ${v[z.format] ?? X.format}`;
        }
        case "not_multiple_of":
          return `Geçersiz sayı: ${X.divisor} ile tam bölünebilmeli`;
        case "unrecognized_keys":
          return `Tanınmayan anahtar${X.keys.length > 1 ? "lar" : ""}: ${b(X.keys, ", ")}`;
        case "invalid_key":
          return `${X.origin} içinde geçersiz anahtar`;
        case "invalid_union":
          return "Geçersiz değer";
        case "invalid_element":
          return `${X.origin} içinde geçersiz değer`;
        default:
          return "Geçersiz değer";
      }
    };
  };
function GJ() {
  return { localeError: rN() };
}
var oN = () => {
  let $ = {
    string: { unit: "символів", verb: "матиме" },
    file: { unit: "байтів", verb: "матиме" },
    array: { unit: "елементів", verb: "матиме" },
    set: { unit: "елементів", verb: "матиме" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "число";
        case "object": {
          if (Array.isArray(z)) return "масив";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "вхідні дані",
      email: "адреса електронної пошти",
      url: "URL",
      emoji: "емодзі",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "дата та час ISO",
      date: "дата ISO",
      time: "час ISO",
      duration: "тривалість ISO",
      ipv4: "адреса IPv4",
      ipv6: "адреса IPv6",
      cidrv4: "діапазон IPv4",
      cidrv6: "діапазон IPv6",
      base64: "рядок у кодуванні base64",
      base64url: "рядок у кодуванні base64url",
      json_string: "рядок JSON",
      e164: "номер E.164",
      jwt: "JWT",
      template_literal: "вхідні дані",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Неправильні вхідні дані: очікується ${z.expected}, отримано ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Неправильні вхідні дані: очікується ${F(z.values[0])}`;
        return `Неправильна опція: очікується одне з ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j)
          return `Занадто велике: очікується, що ${z.origin ?? "значення"} ${j.verb} ${J}${z.maximum.toString()} ${j.unit ?? "елементів"}`;
        return `Занадто велике: очікується, що ${z.origin ?? "значення"} буде ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `Занадто мале: очікується, що ${z.origin} ${j.verb} ${J}${z.minimum.toString()} ${j.unit}`;
        return `Занадто мале: очікується, що ${z.origin} буде ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Неправильний рядок: повинен починатися з "${J.prefix}"`;
        if (J.format === "ends_with") return `Неправильний рядок: повинен закінчуватися на "${J.suffix}"`;
        if (J.format === "includes") return `Неправильний рядок: повинен містити "${J.includes}"`;
        if (J.format === "regex") return `Неправильний рядок: повинен відповідати шаблону ${J.pattern}`;
        return `Неправильний ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `Неправильне число: повинно бути кратним ${z.divisor}`;
      case "unrecognized_keys":
        return `Нерозпізнаний ключ${z.keys.length > 1 ? "і" : ""}: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Неправильний ключ у ${z.origin}`;
      case "invalid_union":
        return "Неправильні вхідні дані";
      case "invalid_element":
        return `Неправильне значення у ${z.origin}`;
      default:
        return "Неправильні вхідні дані";
    }
  };
};
function L1() {
  return { localeError: oN() };
}
function NJ() {
  return L1();
}
var tN = () => {
  let $ = {
    string: { unit: "حروف", verb: "ہونا" },
    file: { unit: "بائٹس", verb: "ہونا" },
    array: { unit: "آئٹمز", verb: "ہونا" },
    set: { unit: "آئٹمز", verb: "ہونا" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "نمبر";
        case "object": {
          if (Array.isArray(z)) return "آرے";
          if (z === null) return "نل";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "ان پٹ",
      email: "ای میل ایڈریس",
      url: "یو آر ایل",
      emoji: "ایموجی",
      uuid: "یو یو آئی ڈی",
      uuidv4: "یو یو آئی ڈی وی 4",
      uuidv6: "یو یو آئی ڈی وی 6",
      nanoid: "نینو آئی ڈی",
      guid: "جی یو آئی ڈی",
      cuid: "سی یو آئی ڈی",
      cuid2: "سی یو آئی ڈی 2",
      ulid: "یو ایل آئی ڈی",
      xid: "ایکس آئی ڈی",
      ksuid: "کے ایس یو آئی ڈی",
      datetime: "آئی ایس او ڈیٹ ٹائم",
      date: "آئی ایس او تاریخ",
      time: "آئی ایس او وقت",
      duration: "آئی ایس او مدت",
      ipv4: "آئی پی وی 4 ایڈریس",
      ipv6: "آئی پی وی 6 ایڈریس",
      cidrv4: "آئی پی وی 4 رینج",
      cidrv6: "آئی پی وی 6 رینج",
      base64: "بیس 64 ان کوڈڈ سٹرنگ",
      base64url: "بیس 64 یو آر ایل ان کوڈڈ سٹرنگ",
      json_string: "جے ایس او این سٹرنگ",
      e164: "ای 164 نمبر",
      jwt: "جے ڈبلیو ٹی",
      template_literal: "ان پٹ",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `غلط ان پٹ: ${z.expected} متوقع تھا، ${v(z.input)} موصول ہوا`;
      case "invalid_value":
        if (z.values.length === 1) return `غلط ان پٹ: ${F(z.values[0])} متوقع تھا`;
        return `غلط آپشن: ${b(z.values, "|")} میں سے ایک متوقع تھا`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j)
          return `بہت بڑا: ${z.origin ?? "ویلیو"} کے ${J}${z.maximum.toString()} ${j.unit ?? "عناصر"} ہونے متوقع تھے`;
        return `بہت بڑا: ${z.origin ?? "ویلیو"} کا ${J}${z.maximum.toString()} ہونا متوقع تھا`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `بہت چھوٹا: ${z.origin} کے ${J}${z.minimum.toString()} ${j.unit} ہونے متوقع تھے`;
        return `بہت چھوٹا: ${z.origin} کا ${J}${z.minimum.toString()} ہونا متوقع تھا`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `غلط سٹرنگ: "${J.prefix}" سے شروع ہونا چاہیے`;
        if (J.format === "ends_with") return `غلط سٹرنگ: "${J.suffix}" پر ختم ہونا چاہیے`;
        if (J.format === "includes") return `غلط سٹرنگ: "${J.includes}" شامل ہونا چاہیے`;
        if (J.format === "regex") return `غلط سٹرنگ: پیٹرن ${J.pattern} سے میچ ہونا چاہیے`;
        return `غلط ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `غلط نمبر: ${z.divisor} کا مضاعف ہونا چاہیے`;
      case "unrecognized_keys":
        return `غیر تسلیم شدہ کی${z.keys.length > 1 ? "ز" : ""}: ${b(z.keys, "، ")}`;
      case "invalid_key":
        return `${z.origin} میں غلط کی`;
      case "invalid_union":
        return "غلط ان پٹ";
      case "invalid_element":
        return `${z.origin} میں غلط ویلیو`;
      default:
        return "غلط ان پٹ";
    }
  };
};
function qJ() {
  return { localeError: tN() };
}
var aN = () => {
  let $ = {
    string: { unit: "ký tự", verb: "có" },
    file: { unit: "byte", verb: "có" },
    array: { unit: "phần tử", verb: "có" },
    set: { unit: "phần tử", verb: "có" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "số";
        case "object": {
          if (Array.isArray(z)) return "mảng";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "đầu vào",
      email: "địa chỉ email",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ngày giờ ISO",
      date: "ngày ISO",
      time: "giờ ISO",
      duration: "khoảng thời gian ISO",
      ipv4: "địa chỉ IPv4",
      ipv6: "địa chỉ IPv6",
      cidrv4: "dải IPv4",
      cidrv6: "dải IPv6",
      base64: "chuỗi mã hóa base64",
      base64url: "chuỗi mã hóa base64url",
      json_string: "chuỗi JSON",
      e164: "số E.164",
      jwt: "JWT",
      template_literal: "đầu vào",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Đầu vào không hợp lệ: mong đợi ${z.expected}, nhận được ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Đầu vào không hợp lệ: mong đợi ${F(z.values[0])}`;
        return `Tùy chọn không hợp lệ: mong đợi một trong các giá trị ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j)
          return `Quá lớn: mong đợi ${z.origin ?? "giá trị"} ${j.verb} ${J}${z.maximum.toString()} ${j.unit ?? "phần tử"}`;
        return `Quá lớn: mong đợi ${z.origin ?? "giá trị"} ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `Quá nhỏ: mong đợi ${z.origin} ${j.verb} ${J}${z.minimum.toString()} ${j.unit}`;
        return `Quá nhỏ: mong đợi ${z.origin} ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Chuỗi không hợp lệ: phải bắt đầu bằng "${J.prefix}"`;
        if (J.format === "ends_with") return `Chuỗi không hợp lệ: phải kết thúc bằng "${J.suffix}"`;
        if (J.format === "includes") return `Chuỗi không hợp lệ: phải bao gồm "${J.includes}"`;
        if (J.format === "regex") return `Chuỗi không hợp lệ: phải khớp với mẫu ${J.pattern}`;
        return `${X[J.format] ?? z.format} không hợp lệ`;
      }
      case "not_multiple_of":
        return `Số không hợp lệ: phải là bội số của ${z.divisor}`;
      case "unrecognized_keys":
        return `Khóa không được nhận dạng: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Khóa không hợp lệ trong ${z.origin}`;
      case "invalid_union":
        return "Đầu vào không hợp lệ";
      case "invalid_element":
        return `Giá trị không hợp lệ trong ${z.origin}`;
      default:
        return "Đầu vào không hợp lệ";
    }
  };
};
function OJ() {
  return { localeError: aN() };
}
var sN = () => {
  let $ = {
    string: { unit: "字符", verb: "包含" },
    file: { unit: "字节", verb: "包含" },
    array: { unit: "项", verb: "包含" },
    set: { unit: "项", verb: "包含" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "非数字(NaN)" : "数字";
        case "object": {
          if (Array.isArray(z)) return "数组";
          if (z === null) return "空值(null)";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "输入",
      email: "电子邮件",
      url: "URL",
      emoji: "表情符号",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO日期时间",
      date: "ISO日期",
      time: "ISO时间",
      duration: "ISO时长",
      ipv4: "IPv4地址",
      ipv6: "IPv6地址",
      cidrv4: "IPv4网段",
      cidrv6: "IPv6网段",
      base64: "base64编码字符串",
      base64url: "base64url编码字符串",
      json_string: "JSON字符串",
      e164: "E.164号码",
      jwt: "JWT",
      template_literal: "输入",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `无效输入：期望 ${z.expected}，实际接收 ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `无效输入：期望 ${F(z.values[0])}`;
        return `无效选项：期望以下之一 ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j) return `数值过大：期望 ${z.origin ?? "值"} ${J}${z.maximum.toString()} ${j.unit ?? "个元素"}`;
        return `数值过大：期望 ${z.origin ?? "值"} ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `数值过小：期望 ${z.origin} ${J}${z.minimum.toString()} ${j.unit}`;
        return `数值过小：期望 ${z.origin} ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `无效字符串：必须以 "${J.prefix}" 开头`;
        if (J.format === "ends_with") return `无效字符串：必须以 "${J.suffix}" 结尾`;
        if (J.format === "includes") return `无效字符串：必须包含 "${J.includes}"`;
        if (J.format === "regex") return `无效字符串：必须满足正则表达式 ${J.pattern}`;
        return `无效${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `无效数字：必须是 ${z.divisor} 的倍数`;
      case "unrecognized_keys":
        return `出现未知的键(key): ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `${z.origin} 中的键(key)无效`;
      case "invalid_union":
        return "无效输入";
      case "invalid_element":
        return `${z.origin} 中包含无效值(value)`;
      default:
        return "无效输入";
    }
  };
};
function HJ() {
  return { localeError: sN() };
}
var eN = () => {
  let $ = {
    string: { unit: "字元", verb: "擁有" },
    file: { unit: "位元組", verb: "擁有" },
    array: { unit: "項目", verb: "擁有" },
    set: { unit: "項目", verb: "擁有" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(z)) return "array";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "輸入",
      email: "郵件地址",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO 日期時間",
      date: "ISO 日期",
      time: "ISO 時間",
      duration: "ISO 期間",
      ipv4: "IPv4 位址",
      ipv6: "IPv6 位址",
      cidrv4: "IPv4 範圍",
      cidrv6: "IPv6 範圍",
      base64: "base64 編碼字串",
      base64url: "base64url 編碼字串",
      json_string: "JSON 字串",
      e164: "E.164 數值",
      jwt: "JWT",
      template_literal: "輸入",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `無效的輸入值：預期為 ${z.expected}，但收到 ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `無效的輸入值：預期為 ${F(z.values[0])}`;
        return `無效的選項：預期為以下其中之一 ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j) return `數值過大：預期 ${z.origin ?? "值"} 應為 ${J}${z.maximum.toString()} ${j.unit ?? "個元素"}`;
        return `數值過大：預期 ${z.origin ?? "值"} 應為 ${J}${z.maximum.toString()}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `數值過小：預期 ${z.origin} 應為 ${J}${z.minimum.toString()} ${j.unit}`;
        return `數值過小：預期 ${z.origin} 應為 ${J}${z.minimum.toString()}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `無效的字串：必須以 "${J.prefix}" 開頭`;
        if (J.format === "ends_with") return `無效的字串：必須以 "${J.suffix}" 結尾`;
        if (J.format === "includes") return `無效的字串：必須包含 "${J.includes}"`;
        if (J.format === "regex") return `無效的字串：必須符合格式 ${J.pattern}`;
        return `無效的 ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `無效的數字：必須為 ${z.divisor} 的倍數`;
      case "unrecognized_keys":
        return `無法識別的鍵值${z.keys.length > 1 ? "們" : ""}：${b(z.keys, "、")}`;
      case "invalid_key":
        return `${z.origin} 中有無效的鍵值`;
      case "invalid_union":
        return "無效的輸入值";
      case "invalid_element":
        return `${z.origin} 中有無效的值`;
      default:
        return "無效的輸入值";
    }
  };
};
function BJ() {
  return { localeError: eN() };
}
var $5 = () => {
  let $ = {
    string: { unit: "àmi", verb: "ní" },
    file: { unit: "bytes", verb: "ní" },
    array: { unit: "nkan", verb: "ní" },
    set: { unit: "nkan", verb: "ní" },
  };
  function U(z) {
    return $[z] ?? null;
  }
  let v = (z) => {
      let J = typeof z;
      switch (J) {
        case "number":
          return Number.isNaN(z) ? "NaN" : "nọ́mbà";
        case "object": {
          if (Array.isArray(z)) return "akopọ";
          if (z === null) return "null";
          if (Object.getPrototypeOf(z) !== Object.prototype && z.constructor) return z.constructor.name;
        }
      }
      return J;
    },
    X = {
      regex: "ẹ̀rọ ìbáwọlé",
      email: "àdírẹ́sì ìmẹ́lì",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "àkókò ISO",
      date: "ọjọ́ ISO",
      time: "àkókò ISO",
      duration: "àkókò tó pé ISO",
      ipv4: "àdírẹ́sì IPv4",
      ipv6: "àdírẹ́sì IPv6",
      cidrv4: "àgbègbè IPv4",
      cidrv6: "àgbègbè IPv6",
      base64: "ọ̀rọ̀ tí a kọ́ ní base64",
      base64url: "ọ̀rọ̀ base64url",
      json_string: "ọ̀rọ̀ JSON",
      e164: "nọ́mbà E.164",
      jwt: "JWT",
      template_literal: "ẹ̀rọ ìbáwọlé",
    };
  return (z) => {
    switch (z.code) {
      case "invalid_type":
        return `Ìbáwọlé aṣìṣe: a ní láti fi ${z.expected}, àmọ̀ a rí ${v(z.input)}`;
      case "invalid_value":
        if (z.values.length === 1) return `Ìbáwọlé aṣìṣe: a ní láti fi ${F(z.values[0])}`;
        return `Àṣàyàn aṣìṣe: yan ọ̀kan lára ${b(z.values, "|")}`;
      case "too_big": {
        let J = z.inclusive ? "<=" : "<",
          j = U(z.origin);
        if (j) return `Tó pọ̀ jù: a ní láti jẹ́ pé ${z.origin ?? "iye"} ${j.verb} ${J}${z.maximum} ${j.unit}`;
        return `Tó pọ̀ jù: a ní láti jẹ́ ${J}${z.maximum}`;
      }
      case "too_small": {
        let J = z.inclusive ? ">=" : ">",
          j = U(z.origin);
        if (j) return `Kéré ju: a ní láti jẹ́ pé ${z.origin} ${j.verb} ${J}${z.minimum} ${j.unit}`;
        return `Kéré ju: a ní láti jẹ́ ${J}${z.minimum}`;
      }
      case "invalid_format": {
        let J = z;
        if (J.format === "starts_with") return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bẹ̀rẹ̀ pẹ̀lú "${J.prefix}"`;
        if (J.format === "ends_with") return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ parí pẹ̀lú "${J.suffix}"`;
        if (J.format === "includes") return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ ní "${J.includes}"`;
        if (J.format === "regex") return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bá àpẹẹrẹ mu ${J.pattern}`;
        return `Aṣìṣe: ${X[J.format] ?? z.format}`;
      }
      case "not_multiple_of":
        return `Nọ́mbà aṣìṣe: gbọ́dọ̀ jẹ́ èyà pípín ti ${z.divisor}`;
      case "unrecognized_keys":
        return `Bọtìnì àìmọ̀: ${b(z.keys, ", ")}`;
      case "invalid_key":
        return `Bọtìnì aṣìṣe nínú ${z.origin}`;
      case "invalid_union":
        return "Ìbáwọlé aṣìṣe";
      case "invalid_element":
        return `Iye aṣìṣe nínú ${z.origin}`;
      default:
        return "Ìbáwọlé aṣìṣe";
    }
  };
};
function DJ() {
  return { localeError: $5() };
}
var KJ = Symbol("ZodOutput"),
  bJ = Symbol("ZodInput");
class V1 {
  constructor() {
    ((this._map = new WeakMap()), (this._idmap = new Map()));
  }
  add($, ...U) {
    let v = U[0];
    if ((this._map.set($, v), v && typeof v === "object" && "id" in v)) {
      if (this._idmap.has(v.id)) throw Error(`ID ${v.id} already exists in the registry`);
      this._idmap.set(v.id, $);
    }
    return this;
  }
  clear() {
    return ((this._map = new WeakMap()), (this._idmap = new Map()), this);
  }
  remove($) {
    let U = this._map.get($);
    if (U && typeof U === "object" && "id" in U) this._idmap.delete(U.id);
    return (this._map.delete($), this);
  }
  get($) {
    let U = $._zod.parent;
    if (U) {
      let v = { ...(this.get(U) ?? {}) };
      delete v.id;
      let X = { ...v, ...this._map.get($) };
      return Object.keys(X).length ? X : void 0;
    }
    return this._map.get($);
  }
  has($) {
    return this._map.has($);
  }
}
function tU() {
  return new V1();
}
var b6 = tU();
function LJ($, U) {
  return new $({ type: "string", ...E(U) });
}
function IJ($, U) {
  return new $({ type: "string", coerce: !0, ...E(U) });
}
function aU($, U) {
  return new $({ type: "string", format: "email", check: "string_format", abort: !1, ...E(U) });
}
function A1($, U) {
  return new $({ type: "string", format: "guid", check: "string_format", abort: !1, ...E(U) });
}
function sU($, U) {
  return new $({ type: "string", format: "uuid", check: "string_format", abort: !1, ...E(U) });
}
function eU($, U) {
  return new $({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v4", ...E(U) });
}
function $z($, U) {
  return new $({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v6", ...E(U) });
}
function Uz($, U) {
  return new $({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v7", ...E(U) });
}
function F1($, U) {
  return new $({ type: "string", format: "url", check: "string_format", abort: !1, ...E(U) });
}
function zz($, U) {
  return new $({ type: "string", format: "emoji", check: "string_format", abort: !1, ...E(U) });
}
function vz($, U) {
  return new $({ type: "string", format: "nanoid", check: "string_format", abort: !1, ...E(U) });
}
function Xz($, U) {
  return new $({ type: "string", format: "cuid", check: "string_format", abort: !1, ...E(U) });
}
function Jz($, U) {
  return new $({ type: "string", format: "cuid2", check: "string_format", abort: !1, ...E(U) });
}
function jz($, U) {
  return new $({ type: "string", format: "ulid", check: "string_format", abort: !1, ...E(U) });
}
function Qz($, U) {
  return new $({ type: "string", format: "xid", check: "string_format", abort: !1, ...E(U) });
}
function Yz($, U) {
  return new $({ type: "string", format: "ksuid", check: "string_format", abort: !1, ...E(U) });
}
function Wz($, U) {
  return new $({ type: "string", format: "ipv4", check: "string_format", abort: !1, ...E(U) });
}
function wz($, U) {
  return new $({ type: "string", format: "ipv6", check: "string_format", abort: !1, ...E(U) });
}
function Gz($, U) {
  return new $({ type: "string", format: "cidrv4", check: "string_format", abort: !1, ...E(U) });
}
function Nz($, U) {
  return new $({ type: "string", format: "cidrv6", check: "string_format", abort: !1, ...E(U) });
}
function qz($, U) {
  return new $({ type: "string", format: "base64", check: "string_format", abort: !1, ...E(U) });
}
function Oz($, U) {
  return new $({ type: "string", format: "base64url", check: "string_format", abort: !1, ...E(U) });
}
function Hz($, U) {
  return new $({ type: "string", format: "e164", check: "string_format", abort: !1, ...E(U) });
}
function Bz($, U) {
  return new $({ type: "string", format: "jwt", check: "string_format", abort: !1, ...E(U) });
}
var VJ = { Any: null, Minute: -1, Second: 0, Millisecond: 3, Microsecond: 6 };
function AJ($, U) {
  return new $({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...E(U),
  });
}
function FJ($, U) {
  return new $({ type: "string", format: "date", check: "string_format", ...E(U) });
}
function EJ($, U) {
  return new $({ type: "string", format: "time", check: "string_format", precision: null, ...E(U) });
}
function _J($, U) {
  return new $({ type: "string", format: "duration", check: "string_format", ...E(U) });
}
function MJ($, U) {
  return new $({ type: "number", checks: [], ...E(U) });
}
function PJ($, U) {
  return new $({ type: "number", coerce: !0, checks: [], ...E(U) });
}
function SJ($, U) {
  return new $({ type: "number", check: "number_format", abort: !1, format: "safeint", ...E(U) });
}
function RJ($, U) {
  return new $({ type: "number", check: "number_format", abort: !1, format: "float32", ...E(U) });
}
function kJ($, U) {
  return new $({ type: "number", check: "number_format", abort: !1, format: "float64", ...E(U) });
}
function ZJ($, U) {
  return new $({ type: "number", check: "number_format", abort: !1, format: "int32", ...E(U) });
}
function TJ($, U) {
  return new $({ type: "number", check: "number_format", abort: !1, format: "uint32", ...E(U) });
}
function CJ($, U) {
  return new $({ type: "boolean", ...E(U) });
}
function xJ($, U) {
  return new $({ type: "boolean", coerce: !0, ...E(U) });
}
function gJ($, U) {
  return new $({ type: "bigint", ...E(U) });
}
function fJ($, U) {
  return new $({ type: "bigint", coerce: !0, ...E(U) });
}
function hJ($, U) {
  return new $({ type: "bigint", check: "bigint_format", abort: !1, format: "int64", ...E(U) });
}
function yJ($, U) {
  return new $({ type: "bigint", check: "bigint_format", abort: !1, format: "uint64", ...E(U) });
}
function mJ($, U) {
  return new $({ type: "symbol", ...E(U) });
}
function uJ($, U) {
  return new $({ type: "undefined", ...E(U) });
}
function cJ($, U) {
  return new $({ type: "null", ...E(U) });
}
function iJ($) {
  return new $({ type: "any" });
}
function nJ($) {
  return new $({ type: "unknown" });
}
function lJ($, U) {
  return new $({ type: "never", ...E(U) });
}
function dJ($, U) {
  return new $({ type: "void", ...E(U) });
}
function pJ($, U) {
  return new $({ type: "date", ...E(U) });
}
function rJ($, U) {
  return new $({ type: "date", coerce: !0, ...E(U) });
}
function oJ($, U) {
  return new $({ type: "nan", ...E(U) });
}
function M6($, U) {
  return new hU({ check: "less_than", ...E(U), value: $, inclusive: !1 });
}
function U6($, U) {
  return new hU({ check: "less_than", ...E(U), value: $, inclusive: !0 });
}
function P6($, U) {
  return new yU({ check: "greater_than", ...E(U), value: $, inclusive: !1 });
}
function i$($, U) {
  return new yU({ check: "greater_than", ...E(U), value: $, inclusive: !0 });
}
function tJ($) {
  return P6(0, $);
}
function aJ($) {
  return M6(0, $);
}
function sJ($) {
  return U6(0, $);
}
function eJ($) {
  return i$(0, $);
}
function W4($, U) {
  return new z0({ check: "multiple_of", ...E(U), value: $ });
}
function P4($, U) {
  return new J0({ check: "max_size", ...E(U), maximum: $ });
}
function w4($, U) {
  return new j0({ check: "min_size", ...E(U), minimum: $ });
}
function E1($, U) {
  return new Q0({ check: "size_equals", ...E(U), size: $ });
}
function S4($, U) {
  return new Y0({ check: "max_length", ...E(U), maximum: $ });
}
function r6($, U) {
  return new W0({ check: "min_length", ...E(U), minimum: $ });
}
function R4($, U) {
  return new w0({ check: "length_equals", ...E(U), length: $ });
}
function _1($, U) {
  return new G0({ check: "string_format", format: "regex", ...E(U), pattern: $ });
}
function M1($) {
  return new N0({ check: "string_format", format: "lowercase", ...E($) });
}
function P1($) {
  return new q0({ check: "string_format", format: "uppercase", ...E($) });
}
function S1($, U) {
  return new O0({ check: "string_format", format: "includes", ...E(U), includes: $ });
}
function R1($, U) {
  return new H0({ check: "string_format", format: "starts_with", ...E(U), prefix: $ });
}
function k1($, U) {
  return new B0({ check: "string_format", format: "ends_with", ...E(U), suffix: $ });
}
function $j($, U, v) {
  return new D0({ check: "property", property: $, schema: U, ...E(v) });
}
function Z1($, U) {
  return new K0({ check: "mime_type", mime: $, ...E(U) });
}
function S6($) {
  return new b0({ check: "overwrite", tx: $ });
}
function T1($) {
  return S6((U) => U.normalize($));
}
function C1() {
  return S6(($) => $.trim());
}
function x1() {
  return S6(($) => $.toLowerCase());
}
function g1() {
  return S6(($) => $.toUpperCase());
}
function Uj($, U, v) {
  return new $({ type: "array", element: U, ...E(v) });
}
function U5($, U, v) {
  return new $({ type: "union", options: U, ...E(v) });
}
function z5($, U, v, X) {
  return new $({ type: "union", options: v, discriminator: U, ...E(X) });
}
function v5($, U, v) {
  return new $({ type: "intersection", left: U, right: v });
}
function X5($, U, v, X) {
  let z = v instanceof m;
  return new $({ type: "tuple", items: U, rest: z ? v : null, ...E(z ? X : v) });
}
function J5($, U, v, X) {
  return new $({ type: "record", keyType: U, valueType: v, ...E(X) });
}
function j5($, U, v, X) {
  return new $({ type: "map", keyType: U, valueType: v, ...E(X) });
}
function Q5($, U, v) {
  return new $({ type: "set", valueType: U, ...E(v) });
}
function Y5($, U, v) {
  let X = Array.isArray(U) ? Object.fromEntries(U.map((z) => [z, z])) : U;
  return new $({ type: "enum", entries: X, ...E(v) });
}
function W5($, U, v) {
  return new $({ type: "enum", entries: U, ...E(v) });
}
function w5($, U, v) {
  return new $({ type: "literal", values: Array.isArray(U) ? U : [U], ...E(v) });
}
function zj($, U) {
  return new $({ type: "file", ...E(U) });
}
function G5($, U) {
  return new $({ type: "transform", transform: U });
}
function N5($, U) {
  return new $({ type: "optional", innerType: U });
}
function q5($, U) {
  return new $({ type: "nullable", innerType: U });
}
function O5($, U, v) {
  return new $({
    type: "default",
    innerType: U,
    get defaultValue() {
      return typeof v === "function" ? v() : Kv(v);
    },
  });
}
function H5($, U, v) {
  return new $({ type: "nonoptional", innerType: U, ...E(v) });
}
function B5($, U) {
  return new $({ type: "success", innerType: U });
}
function D5($, U, v) {
  return new $({ type: "catch", innerType: U, catchValue: typeof v === "function" ? v : () => v });
}
function K5($, U, v) {
  return new $({ type: "pipe", in: U, out: v });
}
function b5($, U) {
  return new $({ type: "readonly", innerType: U });
}
function L5($, U, v) {
  return new $({ type: "template_literal", parts: U, ...E(v) });
}
function I5($, U) {
  return new $({ type: "lazy", getter: U });
}
function V5($, U) {
  return new $({ type: "promise", innerType: U });
}
function vj($, U, v) {
  let X = E(v);
  return (X.abort ?? (X.abort = !0), new $({ type: "custom", check: "custom", fn: U, ...X }));
}
function Xj($, U, v) {
  return new $({ type: "custom", check: "custom", fn: U, ...E(v) });
}
function Jj($) {
  let U = XW((v) => {
    return (
      (v.addIssue = (X) => {
        if (typeof X === "string") v.issues.push(V4(X, v.value, U._zod.def));
        else {
          let z = X;
          if (z.fatal) z.continue = !1;
          (z.code ?? (z.code = "custom"),
            z.input ?? (z.input = v.value),
            z.inst ?? (z.inst = U),
            z.continue ?? (z.continue = !U._zod.def.abort),
            v.issues.push(V4(z)));
        }
      }),
      $(v.value, v)
    );
  });
  return U;
}
function XW($, U) {
  let v = new Y$({ check: "custom", ...E(U) });
  return ((v._zod.check = $), v);
}
function jj($, U) {
  let v = E(U),
    X = v.truthy ?? ["true", "1", "yes", "on", "y", "enabled"],
    z = v.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
  if (v.case !== "sensitive")
    ((X = X.map((G) => (typeof G === "string" ? G.toLowerCase() : G))),
      (z = z.map((G) => (typeof G === "string" ? G.toLowerCase() : G))));
  let J = new Set(X),
    j = new Set(z),
    Q = $.Codec ?? H1,
    W = $.Boolean ?? O1,
    N = new ($.String ?? Y4)({ type: "string", error: v.error }),
    D = new W({ type: "boolean", error: v.error }),
    H = new Q({
      type: "pipe",
      in: N,
      out: D,
      transform: (G, q) => {
        let B = G;
        if (v.case !== "sensitive") B = B.toLowerCase();
        if (J.has(B)) return !0;
        else if (j.has(B)) return !1;
        else
          return (
            q.issues.push({
              code: "invalid_value",
              expected: "stringbool",
              values: [...J, ...j],
              input: q.value,
              inst: H,
              continue: !1,
            }),
            {}
          );
      },
      reverseTransform: (G, q) => {
        if (G === !0) return X[0] || "true";
        else return z[0] || "false";
      },
      error: v.error,
    });
  return H;
}
function k4($, U, v, X = {}) {
  let z = E(X),
    J = {
      ...E(X),
      check: "string_format",
      type: "string",
      format: U,
      fn: typeof v === "function" ? v : (Q) => v.test(Q),
      ...z,
    };
  if (v instanceof RegExp) J.pattern = v;
  return new $(J);
}
class Dz {
  constructor($) {
    ((this.counter = 0),
      (this.metadataRegistry = $?.metadata ?? b6),
      (this.target = $?.target ?? "draft-2020-12"),
      (this.unrepresentable = $?.unrepresentable ?? "throw"),
      (this.override = $?.override ?? (() => {})),
      (this.io = $?.io ?? "output"),
      (this.seen = new Map()));
  }
  process($, U = { path: [], schemaPath: [] }) {
    var v;
    let X = $._zod.def,
      z = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" },
      J = this.seen.get($);
    if (J) {
      if ((J.count++, U.schemaPath.includes($))) J.cycle = U.path;
      return J.schema;
    }
    let j = { schema: {}, count: 1, cycle: void 0, path: U.path };
    this.seen.set($, j);
    let Q = $._zod.toJSONSchema?.();
    if (Q) j.schema = Q;
    else {
      let N = { ...U, schemaPath: [...U.schemaPath, $], path: U.path },
        D = $._zod.parent;
      if (D) ((j.ref = D), this.process(D, N), (this.seen.get(D).isParent = !0));
      else {
        let H = j.schema;
        switch (X.type) {
          case "string": {
            let G = H;
            G.type = "string";
            let { minimum: q, maximum: B, format: I, patterns: L, contentEncoding: S } = $._zod.bag;
            if (typeof q === "number") G.minLength = q;
            if (typeof B === "number") G.maxLength = B;
            if (I) {
              if (((G.format = z[I] ?? I), G.format === "")) delete G.format;
            }
            if (S) G.contentEncoding = S;
            if (L && L.size > 0) {
              let T = [...L];
              if (T.length === 1) G.pattern = T[0].source;
              else if (T.length > 1)
                j.schema.allOf = [
                  ...T.map((K) => ({
                    ...(this.target === "draft-7" || this.target === "draft-4" || this.target === "openapi-3.0"
                      ? { type: "string" }
                      : {}),
                    pattern: K.source,
                  })),
                ];
            }
            break;
          }
          case "number": {
            let G = H,
              {
                minimum: q,
                maximum: B,
                format: I,
                multipleOf: L,
                exclusiveMaximum: S,
                exclusiveMinimum: T,
              } = $._zod.bag;
            if (typeof I === "string" && I.includes("int")) G.type = "integer";
            else G.type = "number";
            if (typeof T === "number")
              if (this.target === "draft-4" || this.target === "openapi-3.0")
                ((G.minimum = T), (G.exclusiveMinimum = !0));
              else G.exclusiveMinimum = T;
            if (typeof q === "number") {
              if (((G.minimum = q), typeof T === "number" && this.target !== "draft-4"))
                if (T >= q) delete G.minimum;
                else delete G.exclusiveMinimum;
            }
            if (typeof S === "number")
              if (this.target === "draft-4" || this.target === "openapi-3.0")
                ((G.maximum = S), (G.exclusiveMaximum = !0));
              else G.exclusiveMaximum = S;
            if (typeof B === "number") {
              if (((G.maximum = B), typeof S === "number" && this.target !== "draft-4"))
                if (S <= B) delete G.maximum;
                else delete G.exclusiveMaximum;
            }
            if (typeof L === "number") G.multipleOf = L;
            break;
          }
          case "boolean": {
            let G = H;
            G.type = "boolean";
            break;
          }
          case "bigint": {
            if (this.unrepresentable === "throw") throw Error("BigInt cannot be represented in JSON Schema");
            break;
          }
          case "symbol": {
            if (this.unrepresentable === "throw") throw Error("Symbols cannot be represented in JSON Schema");
            break;
          }
          case "null": {
            if (this.target === "openapi-3.0") ((H.type = "string"), (H.nullable = !0), (H.enum = [null]));
            else H.type = "null";
            break;
          }
          case "any":
            break;
          case "unknown":
            break;
          case "undefined": {
            if (this.unrepresentable === "throw") throw Error("Undefined cannot be represented in JSON Schema");
            break;
          }
          case "void": {
            if (this.unrepresentable === "throw") throw Error("Void cannot be represented in JSON Schema");
            break;
          }
          case "never": {
            H.not = {};
            break;
          }
          case "date": {
            if (this.unrepresentable === "throw") throw Error("Date cannot be represented in JSON Schema");
            break;
          }
          case "array": {
            let G = H,
              { minimum: q, maximum: B } = $._zod.bag;
            if (typeof q === "number") G.minItems = q;
            if (typeof B === "number") G.maxItems = B;
            ((G.type = "array"), (G.items = this.process(X.element, { ...N, path: [...N.path, "items"] })));
            break;
          }
          case "object": {
            let G = H;
            ((G.type = "object"), (G.properties = {}));
            let q = X.shape;
            for (let L in q) G.properties[L] = this.process(q[L], { ...N, path: [...N.path, "properties", L] });
            let B = new Set(Object.keys(q)),
              I = new Set(
                [...B].filter((L) => {
                  let S = X.shape[L]._zod;
                  if (this.io === "input") return S.optin === void 0;
                  else return S.optout === void 0;
                }),
              );
            if (I.size > 0) G.required = Array.from(I);
            if (X.catchall?._zod.def.type === "never") G.additionalProperties = !1;
            else if (!X.catchall) {
              if (this.io === "output") G.additionalProperties = !1;
            } else if (X.catchall)
              G.additionalProperties = this.process(X.catchall, { ...N, path: [...N.path, "additionalProperties"] });
            break;
          }
          case "union": {
            let G = H,
              q = X.options.map((B, I) => this.process(B, { ...N, path: [...N.path, "anyOf", I] }));
            G.anyOf = q;
            break;
          }
          case "intersection": {
            let G = H,
              q = this.process(X.left, { ...N, path: [...N.path, "allOf", 0] }),
              B = this.process(X.right, { ...N, path: [...N.path, "allOf", 1] }),
              I = (S) => "allOf" in S && Object.keys(S).length === 1,
              L = [...(I(q) ? q.allOf : [q]), ...(I(B) ? B.allOf : [B])];
            G.allOf = L;
            break;
          }
          case "tuple": {
            let G = H;
            G.type = "array";
            let q = this.target === "draft-2020-12" ? "prefixItems" : "items",
              B =
                this.target === "draft-2020-12" ? "items" : this.target === "openapi-3.0" ? "items" : "additionalItems",
              I = X.items.map((K, y) => this.process(K, { ...N, path: [...N.path, q, y] })),
              L = X.rest
                ? this.process(X.rest, {
                    ...N,
                    path: [...N.path, B, ...(this.target === "openapi-3.0" ? [X.items.length] : [])],
                  })
                : null;
            if (this.target === "draft-2020-12") {
              if (((G.prefixItems = I), L)) G.items = L;
            } else if (this.target === "openapi-3.0") {
              if (((G.items = { anyOf: I }), L)) G.items.anyOf.push(L);
              if (((G.minItems = I.length), !L)) G.maxItems = I.length;
            } else if (((G.items = I), L)) G.additionalItems = L;
            let { minimum: S, maximum: T } = $._zod.bag;
            if (typeof S === "number") G.minItems = S;
            if (typeof T === "number") G.maxItems = T;
            break;
          }
          case "record": {
            let G = H;
            if (((G.type = "object"), this.target === "draft-7" || this.target === "draft-2020-12"))
              G.propertyNames = this.process(X.keyType, { ...N, path: [...N.path, "propertyNames"] });
            G.additionalProperties = this.process(X.valueType, { ...N, path: [...N.path, "additionalProperties"] });
            break;
          }
          case "map": {
            if (this.unrepresentable === "throw") throw Error("Map cannot be represented in JSON Schema");
            break;
          }
          case "set": {
            if (this.unrepresentable === "throw") throw Error("Set cannot be represented in JSON Schema");
            break;
          }
          case "enum": {
            let G = H,
              q = X1(X.entries);
            if (q.every((B) => typeof B === "number")) G.type = "number";
            if (q.every((B) => typeof B === "string")) G.type = "string";
            G.enum = q;
            break;
          }
          case "literal": {
            let G = H,
              q = [];
            for (let B of X.values)
              if (B === void 0) {
                if (this.unrepresentable === "throw")
                  throw Error("Literal `undefined` cannot be represented in JSON Schema");
              } else if (typeof B === "bigint")
                if (this.unrepresentable === "throw")
                  throw Error("BigInt literals cannot be represented in JSON Schema");
                else q.push(Number(B));
              else q.push(B);
            if (q.length === 0);
            else if (q.length === 1) {
              let B = q[0];
              if (
                ((G.type = B === null ? "null" : typeof B), this.target === "draft-4" || this.target === "openapi-3.0")
              )
                G.enum = [B];
              else G.const = B;
            } else {
              if (q.every((B) => typeof B === "number")) G.type = "number";
              if (q.every((B) => typeof B === "string")) G.type = "string";
              if (q.every((B) => typeof B === "boolean")) G.type = "string";
              if (q.every((B) => B === null)) G.type = "null";
              G.enum = q;
            }
            break;
          }
          case "file": {
            let G = H,
              q = { type: "string", format: "binary", contentEncoding: "binary" },
              { minimum: B, maximum: I, mime: L } = $._zod.bag;
            if (B !== void 0) q.minLength = B;
            if (I !== void 0) q.maxLength = I;
            if (L)
              if (L.length === 1) ((q.contentMediaType = L[0]), Object.assign(G, q));
              else
                G.anyOf = L.map((S) => {
                  return { ...q, contentMediaType: S };
                });
            else Object.assign(G, q);
            break;
          }
          case "transform": {
            if (this.unrepresentable === "throw") throw Error("Transforms cannot be represented in JSON Schema");
            break;
          }
          case "nullable": {
            let G = this.process(X.innerType, N);
            if (this.target === "openapi-3.0") ((j.ref = X.innerType), (H.nullable = !0));
            else H.anyOf = [G, { type: "null" }];
            break;
          }
          case "nonoptional": {
            (this.process(X.innerType, N), (j.ref = X.innerType));
            break;
          }
          case "success": {
            let G = H;
            G.type = "boolean";
            break;
          }
          case "default": {
            (this.process(X.innerType, N),
              (j.ref = X.innerType),
              (H.default = JSON.parse(JSON.stringify(X.defaultValue))));
            break;
          }
          case "prefault": {
            if ((this.process(X.innerType, N), (j.ref = X.innerType), this.io === "input"))
              H._prefault = JSON.parse(JSON.stringify(X.defaultValue));
            break;
          }
          case "catch": {
            (this.process(X.innerType, N), (j.ref = X.innerType));
            let G;
            try {
              G = X.catchValue(void 0);
            } catch {
              throw Error("Dynamic catch values are not supported in JSON Schema");
            }
            H.default = G;
            break;
          }
          case "nan": {
            if (this.unrepresentable === "throw") throw Error("NaN cannot be represented in JSON Schema");
            break;
          }
          case "template_literal": {
            let G = H,
              q = $._zod.pattern;
            if (!q) throw Error("Pattern not found in template literal");
            ((G.type = "string"), (G.pattern = q.source));
            break;
          }
          case "pipe": {
            let G = this.io === "input" ? (X.in._zod.def.type === "transform" ? X.out : X.in) : X.out;
            (this.process(G, N), (j.ref = G));
            break;
          }
          case "readonly": {
            (this.process(X.innerType, N), (j.ref = X.innerType), (H.readOnly = !0));
            break;
          }
          case "promise": {
            (this.process(X.innerType, N), (j.ref = X.innerType));
            break;
          }
          case "optional": {
            (this.process(X.innerType, N), (j.ref = X.innerType));
            break;
          }
          case "lazy": {
            let G = $._zod.innerType;
            (this.process(G, N), (j.ref = G));
            break;
          }
          case "custom": {
            if (this.unrepresentable === "throw") throw Error("Custom types cannot be represented in JSON Schema");
            break;
          }
          case "function": {
            if (this.unrepresentable === "throw") throw Error("Function types cannot be represented in JSON Schema");
            break;
          }
          default:
        }
      }
    }
    let W = this.metadataRegistry.get($);
    if (W) Object.assign(j.schema, W);
    if (this.io === "input" && K$($)) (delete j.schema.examples, delete j.schema.default);
    if (this.io === "input" && j.schema._prefault) (v = j.schema).default ?? (v.default = j.schema._prefault);
    return (delete j.schema._prefault, this.seen.get($).schema);
  }
  emit($, U) {
    let v = { cycles: U?.cycles ?? "ref", reused: U?.reused ?? "inline", external: U?.external ?? void 0 },
      X = this.seen.get($);
    if (!X) throw Error("Unprocessed schema. This is a bug in Zod.");
    let z = (w) => {
        let N = this.target === "draft-2020-12" ? "$defs" : "definitions";
        if (v.external) {
          let q = v.external.registry.get(w[0])?.id,
            B = v.external.uri ?? ((L) => L);
          if (q) return { ref: B(q) };
          let I = w[1].defId ?? w[1].schema.id ?? `schema${this.counter++}`;
          return ((w[1].defId = I), { defId: I, ref: `${B("__shared")}#/${N}/${I}` });
        }
        if (w[1] === X) return { ref: "#" };
        let H = `${"#"}/${N}/`,
          G = w[1].schema.id ?? `__schema${this.counter++}`;
        return { defId: G, ref: H + G };
      },
      J = (w) => {
        if (w[1].schema.$ref) return;
        let N = w[1],
          { ref: D, defId: H } = z(w);
        if (((N.def = { ...N.schema }), H)) N.defId = H;
        let G = N.schema;
        for (let q in G) delete G[q];
        G.$ref = D;
      };
    if (v.cycles === "throw")
      for (let w of this.seen.entries()) {
        let N = w[1];
        if (N.cycle)
          throw Error(`Cycle detected: #/${N.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
      }
    for (let w of this.seen.entries()) {
      let N = w[1];
      if ($ === w[0]) {
        J(w);
        continue;
      }
      if (v.external) {
        let H = v.external.registry.get(w[0])?.id;
        if ($ !== w[0] && H) {
          J(w);
          continue;
        }
      }
      if (this.metadataRegistry.get(w[0])?.id) {
        J(w);
        continue;
      }
      if (N.cycle) {
        J(w);
        continue;
      }
      if (N.count > 1) {
        if (v.reused === "ref") {
          J(w);
          continue;
        }
      }
    }
    let j = (w, N) => {
      let D = this.seen.get(w),
        H = D.def ?? D.schema,
        G = { ...H };
      if (D.ref === null) return;
      let q = D.ref;
      if (((D.ref = null), q)) {
        j(q, N);
        let B = this.seen.get(q).schema;
        if (B.$ref && (N.target === "draft-7" || N.target === "draft-4" || N.target === "openapi-3.0"))
          ((H.allOf = H.allOf ?? []), H.allOf.push(B));
        else (Object.assign(H, B), Object.assign(H, G));
      }
      if (!D.isParent) this.override({ zodSchema: w, jsonSchema: H, path: D.path ?? [] });
    };
    for (let w of [...this.seen.entries()].reverse()) j(w[0], { target: this.target });
    let Q = {};
    if (this.target === "draft-2020-12") Q.$schema = "https://json-schema.org/draft/2020-12/schema";
    else if (this.target === "draft-7") Q.$schema = "http://json-schema.org/draft-07/schema#";
    else if (this.target === "draft-4") Q.$schema = "http://json-schema.org/draft-04/schema#";
    else if (this.target === "openapi-3.0");
    else console.warn(`Invalid target: ${this.target}`);
    if (v.external?.uri) {
      let w = v.external.registry.get($)?.id;
      if (!w) throw Error("Schema is missing an `id` property");
      Q.$id = v.external.uri(w);
    }
    Object.assign(Q, X.def);
    let W = v.external?.defs ?? {};
    for (let w of this.seen.entries()) {
      let N = w[1];
      if (N.def && N.defId) W[N.defId] = N.def;
    }
    if (v.external);
    else if (Object.keys(W).length > 0)
      if (this.target === "draft-2020-12") Q.$defs = W;
      else Q.definitions = W;
    try {
      return JSON.parse(JSON.stringify(Q));
    } catch (w) {
      throw Error("Error converting schema to JSON.");
    }
  }
}
function f1($, U) {
  if ($ instanceof V1) {
    let X = new Dz(U),
      z = {};
    for (let Q of $._idmap.entries()) {
      let [W, w] = Q;
      X.process(w);
    }
    let J = {},
      j = { registry: $, uri: U?.uri, defs: z };
    for (let Q of $._idmap.entries()) {
      let [W, w] = Q;
      J[W] = X.emit(w, { ...U, external: j });
    }
    if (Object.keys(z).length > 0) {
      let Q = X.target === "draft-2020-12" ? "$defs" : "definitions";
      J.__shared = { [Q]: z };
    }
    return { schemas: J };
  }
  let v = new Dz(U);
  return (v.process($), v.emit($, U));
}
function K$($, U) {
  let v = U ?? { seen: new Set() };
  if (v.seen.has($)) return !1;
  v.seen.add($);
  let z = $._zod.def;
  switch (z.type) {
    case "string":
    case "number":
    case "bigint":
    case "boolean":
    case "date":
    case "symbol":
    case "undefined":
    case "null":
    case "any":
    case "unknown":
    case "never":
    case "void":
    case "literal":
    case "enum":
    case "nan":
    case "file":
    case "template_literal":
      return !1;
    case "array":
      return K$(z.element, v);
    case "object": {
      for (let J in z.shape) if (K$(z.shape[J], v)) return !0;
      return !1;
    }
    case "union": {
      for (let J of z.options) if (K$(J, v)) return !0;
      return !1;
    }
    case "intersection":
      return K$(z.left, v) || K$(z.right, v);
    case "tuple": {
      for (let J of z.items) if (K$(J, v)) return !0;
      if (z.rest && K$(z.rest, v)) return !0;
      return !1;
    }
    case "record":
      return K$(z.keyType, v) || K$(z.valueType, v);
    case "map":
      return K$(z.keyType, v) || K$(z.valueType, v);
    case "set":
      return K$(z.valueType, v);
    case "promise":
    case "optional":
    case "nonoptional":
    case "nullable":
    case "readonly":
      return K$(z.innerType, v);
    case "lazy":
      return K$(z.getter(), v);
    case "default":
      return K$(z.innerType, v);
    case "prefault":
      return K$(z.innerType, v);
    case "custom":
      return !1;
    case "transform":
      return !0;
    case "pipe":
      return K$(z.in, v) || K$(z.out, v);
    case "success":
      return !1;
    case "catch":
      return !1;
    case "function":
      return !1;
    default:
  }
  throw Error(`Unknown schema type: ${z.type}`);
}
var JW = {};
var Vz = {};
v4(Vz, {
  time: () => Wj,
  duration: () => wj,
  datetime: () => Qj,
  date: () => Yj,
  ZodISOTime: () => Lz,
  ZodISODuration: () => Iz,
  ZodISODateTime: () => Kz,
  ZodISODate: () => bz,
});
var Kz = O("ZodISODateTime", ($, U) => {
  (T0.init($, U), Q$.init($, U));
});
function Qj($) {
  return AJ(Kz, $);
}
var bz = O("ZodISODate", ($, U) => {
  (C0.init($, U), Q$.init($, U));
});
function Yj($) {
  return FJ(bz, $);
}
var Lz = O("ZodISOTime", ($, U) => {
  (x0.init($, U), Q$.init($, U));
});
function Wj($) {
  return EJ(Lz, $);
}
var Iz = O("ZodISODuration", ($, U) => {
  (g0.init($, U), Q$.init($, U));
});
function wj($) {
  return _J(Iz, $);
}
var QW = ($, U) => {
    (W1.init($, U),
      ($.name = "ZodError"),
      Object.defineProperties($, {
        format: { value: (v) => G1($, v) },
        flatten: { value: (v) => w1($, v) },
        addIssue: {
          value: (v) => {
            ($.issues.push(v), ($.message = JSON.stringify($.issues, L4, 2)));
          },
        },
        addIssues: {
          value: (v) => {
            ($.issues.push(...v), ($.message = JSON.stringify($.issues, L4, 2)));
          },
        },
        isEmpty: {
          get() {
            return $.issues.length === 0;
          },
        },
      }));
  },
  F5 = O("ZodError", QW),
  n$ = O("ZodError", QW, { Parent: Error });
var Gj = A4(n$),
  Nj = F4(n$),
  qj = E4(n$),
  h1 = _4(n$),
  Oj = SU(n$),
  Hj = RU(n$),
  Bj = kU(n$),
  Dj = ZU(n$),
  Kj = TU(n$),
  bj = CU(n$),
  Lj = xU(n$),
  Ij = gU(n$);
var i = O("ZodType", ($, U) => {
    return (
      m.init($, U),
      ($.def = U),
      ($.type = U.type),
      Object.defineProperty($, "_def", { value: U }),
      ($.check = (...v) => {
        return $.clone(
          _.mergeDefs(U, {
            checks: [
              ...(U.checks ?? []),
              ...v.map((X) =>
                typeof X === "function" ? { _zod: { check: X, def: { check: "custom" }, onattach: [] } } : X,
              ),
            ],
          }),
        );
      }),
      ($.clone = (v, X) => k$($, v, X)),
      ($.brand = () => $),
      ($.register = (v, X) => {
        return (v.add($, X), $);
      }),
      ($.parse = (v, X) => Gj($, v, X, { callee: $.parse })),
      ($.safeParse = (v, X) => qj($, v, X)),
      ($.parseAsync = async (v, X) => Nj($, v, X, { callee: $.parseAsync })),
      ($.safeParseAsync = async (v, X) => h1($, v, X)),
      ($.spa = $.safeParseAsync),
      ($.encode = (v, X) => Oj($, v, X)),
      ($.decode = (v, X) => Hj($, v, X)),
      ($.encodeAsync = async (v, X) => Bj($, v, X)),
      ($.decodeAsync = async (v, X) => Dj($, v, X)),
      ($.safeEncode = (v, X) => Kj($, v, X)),
      ($.safeDecode = (v, X) => bj($, v, X)),
      ($.safeEncodeAsync = async (v, X) => Lj($, v, X)),
      ($.safeDecodeAsync = async (v, X) => Ij($, v, X)),
      ($.refine = (v, X) => $.check(pW(v, X))),
      ($.superRefine = (v) => $.check(rW(v))),
      ($.overwrite = (v) => $.check(S6(v))),
      ($.optional = () => Fz($)),
      ($.nullable = () => Ez($)),
      ($.nullish = () => Fz(Ez($))),
      ($.nonoptional = (v) => xW($, v)),
      ($.array = () => Sz($)),
      ($.or = (v) => nj([$, v])),
      ($.and = (v) => IW($, v)),
      ($.transform = (v) => _z($, pj(v))),
      ($.default = (v) => ZW($, v)),
      ($.prefault = (v) => CW($, v)),
      ($.catch = (v) => hW($, v)),
      ($.pipe = (v) => _z($, v)),
      ($.readonly = () => uW($)),
      ($.describe = (v) => {
        let X = $.clone();
        return (b6.add(X, { description: v }), X);
      }),
      Object.defineProperty($, "description", {
        get() {
          return b6.get($)?.description;
        },
        configurable: !0,
      }),
      ($.meta = (...v) => {
        if (v.length === 0) return b6.get($);
        let X = $.clone();
        return (b6.add(X, v[0]), X);
      }),
      ($.isOptional = () => $.safeParse(void 0).success),
      ($.isNullable = () => $.safeParse(null).success),
      $
    );
  }),
  Fj = O("_ZodString", ($, U) => {
    (Y4.init($, U), i.init($, U));
    let v = $._zod.bag;
    (($.format = v.format ?? null),
      ($.minLength = v.minimum ?? null),
      ($.maxLength = v.maximum ?? null),
      ($.regex = (...X) => $.check(_1(...X))),
      ($.includes = (...X) => $.check(S1(...X))),
      ($.startsWith = (...X) => $.check(R1(...X))),
      ($.endsWith = (...X) => $.check(k1(...X))),
      ($.min = (...X) => $.check(r6(...X))),
      ($.max = (...X) => $.check(S4(...X))),
      ($.length = (...X) => $.check(R4(...X))),
      ($.nonempty = (...X) => $.check(r6(1, ...X))),
      ($.lowercase = (X) => $.check(M1(X))),
      ($.uppercase = (X) => $.check(P1(X))),
      ($.trim = () => $.check(C1())),
      ($.normalize = (...X) => $.check(T1(...X))),
      ($.toLowerCase = () => $.check(x1())),
      ($.toUpperCase = () => $.check(g1())));
  }),
  m1 = O("ZodString", ($, U) => {
    (Y4.init($, U),
      Fj.init($, U),
      ($.email = (v) => $.check(aU(Ej, v))),
      ($.url = (v) => $.check(F1(Mz, v))),
      ($.jwt = (v) => $.check(Bz(mj, v))),
      ($.emoji = (v) => $.check(zz(_j, v))),
      ($.guid = (v) => $.check(A1(Az, v))),
      ($.uuid = (v) => $.check(sU(k6, v))),
      ($.uuidv4 = (v) => $.check(eU(k6, v))),
      ($.uuidv6 = (v) => $.check($z(k6, v))),
      ($.uuidv7 = (v) => $.check(Uz(k6, v))),
      ($.nanoid = (v) => $.check(vz(Mj, v))),
      ($.guid = (v) => $.check(A1(Az, v))),
      ($.cuid = (v) => $.check(Xz(Pj, v))),
      ($.cuid2 = (v) => $.check(Jz(Sj, v))),
      ($.ulid = (v) => $.check(jz(Rj, v))),
      ($.base64 = (v) => $.check(qz(fj, v))),
      ($.base64url = (v) => $.check(Oz(hj, v))),
      ($.xid = (v) => $.check(Qz(kj, v))),
      ($.ksuid = (v) => $.check(Yz(Zj, v))),
      ($.ipv4 = (v) => $.check(Wz(Tj, v))),
      ($.ipv6 = (v) => $.check(wz(Cj, v))),
      ($.cidrv4 = (v) => $.check(Gz(xj, v))),
      ($.cidrv6 = (v) => $.check(Nz(gj, v))),
      ($.e164 = (v) => $.check(Hz(yj, v))),
      ($.datetime = (v) => $.check(Qj(v))),
      ($.date = (v) => $.check(Yj(v))),
      ($.time = (v) => $.check(Wj(v))),
      ($.duration = (v) => $.check(wj(v))));
  });
function Vj($) {
  return LJ(m1, $);
}
var Q$ = O("ZodStringFormat", ($, U) => {
    (U$.init($, U), Fj.init($, U));
  }),
  Ej = O("ZodEmail", ($, U) => {
    (F0.init($, U), Q$.init($, U));
  });
function _5($) {
  return aU(Ej, $);
}
var Az = O("ZodGUID", ($, U) => {
  (V0.init($, U), Q$.init($, U));
});
function M5($) {
  return A1(Az, $);
}
var k6 = O("ZodUUID", ($, U) => {
  (A0.init($, U), Q$.init($, U));
});
function P5($) {
  return sU(k6, $);
}
function S5($) {
  return eU(k6, $);
}
function R5($) {
  return $z(k6, $);
}
function k5($) {
  return Uz(k6, $);
}
var Mz = O("ZodURL", ($, U) => {
  (E0.init($, U), Q$.init($, U));
});
function Z5($) {
  return F1(Mz, $);
}
function T5($) {
  return F1(Mz, { protocol: /^https?$/, hostname: $6.domain, ..._.normalizeParams($) });
}
var _j = O("ZodEmoji", ($, U) => {
  (_0.init($, U), Q$.init($, U));
});
function C5($) {
  return zz(_j, $);
}
var Mj = O("ZodNanoID", ($, U) => {
  (M0.init($, U), Q$.init($, U));
});
function x5($) {
  return vz(Mj, $);
}
var Pj = O("ZodCUID", ($, U) => {
  (P0.init($, U), Q$.init($, U));
});
function g5($) {
  return Xz(Pj, $);
}
var Sj = O("ZodCUID2", ($, U) => {
  (S0.init($, U), Q$.init($, U));
});
function f5($) {
  return Jz(Sj, $);
}
var Rj = O("ZodULID", ($, U) => {
  (R0.init($, U), Q$.init($, U));
});
function h5($) {
  return jz(Rj, $);
}
var kj = O("ZodXID", ($, U) => {
  (k0.init($, U), Q$.init($, U));
});
function y5($) {
  return Qz(kj, $);
}
var Zj = O("ZodKSUID", ($, U) => {
  (Z0.init($, U), Q$.init($, U));
});
function m5($) {
  return Yz(Zj, $);
}
var Tj = O("ZodIPv4", ($, U) => {
  (f0.init($, U), Q$.init($, U));
});
function u5($) {
  return Wz(Tj, $);
}
var Cj = O("ZodIPv6", ($, U) => {
  (h0.init($, U), Q$.init($, U));
});
function c5($) {
  return wz(Cj, $);
}
var xj = O("ZodCIDRv4", ($, U) => {
  (y0.init($, U), Q$.init($, U));
});
function i5($) {
  return Gz(xj, $);
}
var gj = O("ZodCIDRv6", ($, U) => {
  (m0.init($, U), Q$.init($, U));
});
function n5($) {
  return Nz(gj, $);
}
var fj = O("ZodBase64", ($, U) => {
  (c0.init($, U), Q$.init($, U));
});
function l5($) {
  return qz(fj, $);
}
var hj = O("ZodBase64URL", ($, U) => {
  (i0.init($, U), Q$.init($, U));
});
function d5($) {
  return Oz(hj, $);
}
var yj = O("ZodE164", ($, U) => {
  (n0.init($, U), Q$.init($, U));
});
function p5($) {
  return Hz(yj, $);
}
var mj = O("ZodJWT", ($, U) => {
  (l0.init($, U), Q$.init($, U));
});
function r5($) {
  return Bz(mj, $);
}
var u1 = O("ZodCustomStringFormat", ($, U) => {
  (d0.init($, U), Q$.init($, U));
});
function o5($, U, v = {}) {
  return k4(u1, $, U, v);
}
function t5($) {
  return k4(u1, "hostname", $6.hostname, $);
}
function a5($) {
  return k4(u1, "hex", $6.hex, $);
}
function s5($, U) {
  let v = U?.enc ?? "hex",
    X = `${$}_${v}`,
    z = $6[X];
  if (!z) throw Error(`Unrecognized hash format: ${X}`);
  return k4(u1, X, z, U);
}
var c1 = O("ZodNumber", ($, U) => {
  (dU.init($, U),
    i.init($, U),
    ($.gt = (X, z) => $.check(P6(X, z))),
    ($.gte = (X, z) => $.check(i$(X, z))),
    ($.min = (X, z) => $.check(i$(X, z))),
    ($.lt = (X, z) => $.check(M6(X, z))),
    ($.lte = (X, z) => $.check(U6(X, z))),
    ($.max = (X, z) => $.check(U6(X, z))),
    ($.int = (X) => $.check(Aj(X))),
    ($.safe = (X) => $.check(Aj(X))),
    ($.positive = (X) => $.check(P6(0, X))),
    ($.nonnegative = (X) => $.check(i$(0, X))),
    ($.negative = (X) => $.check(M6(0, X))),
    ($.nonpositive = (X) => $.check(U6(0, X))),
    ($.multipleOf = (X, z) => $.check(W4(X, z))),
    ($.step = (X, z) => $.check(W4(X, z))),
    ($.finite = () => $));
  let v = $._zod.bag;
  (($.minValue =
    Math.max(v.minimum ?? Number.NEGATIVE_INFINITY, v.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null),
    ($.maxValue =
      Math.min(v.maximum ?? Number.POSITIVE_INFINITY, v.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null),
    ($.isInt = (v.format ?? "").includes("int") || Number.isSafeInteger(v.multipleOf ?? 0.5)),
    ($.isFinite = !0),
    ($.format = v.format ?? null));
});
function YW($) {
  return MJ(c1, $);
}
var T4 = O("ZodNumberFormat", ($, U) => {
  (p0.init($, U), c1.init($, U));
});
function Aj($) {
  return SJ(T4, $);
}
function e5($) {
  return RJ(T4, $);
}
function $q($) {
  return kJ(T4, $);
}
function Uq($) {
  return ZJ(T4, $);
}
function zq($) {
  return TJ(T4, $);
}
var i1 = O("ZodBoolean", ($, U) => {
  (O1.init($, U), i.init($, U));
});
function WW($) {
  return CJ(i1, $);
}
var n1 = O("ZodBigInt", ($, U) => {
  (pU.init($, U),
    i.init($, U),
    ($.gte = (X, z) => $.check(i$(X, z))),
    ($.min = (X, z) => $.check(i$(X, z))),
    ($.gt = (X, z) => $.check(P6(X, z))),
    ($.gte = (X, z) => $.check(i$(X, z))),
    ($.min = (X, z) => $.check(i$(X, z))),
    ($.lt = (X, z) => $.check(M6(X, z))),
    ($.lte = (X, z) => $.check(U6(X, z))),
    ($.max = (X, z) => $.check(U6(X, z))),
    ($.positive = (X) => $.check(P6(BigInt(0), X))),
    ($.negative = (X) => $.check(M6(BigInt(0), X))),
    ($.nonpositive = (X) => $.check(U6(BigInt(0), X))),
    ($.nonnegative = (X) => $.check(i$(BigInt(0), X))),
    ($.multipleOf = (X, z) => $.check(W4(X, z))));
  let v = $._zod.bag;
  (($.minValue = v.minimum ?? null), ($.maxValue = v.maximum ?? null), ($.format = v.format ?? null));
});
function vq($) {
  return gJ(n1, $);
}
var uj = O("ZodBigIntFormat", ($, U) => {
  (r0.init($, U), n1.init($, U));
});
function Xq($) {
  return hJ(uj, $);
}
function Jq($) {
  return yJ(uj, $);
}
var wW = O("ZodSymbol", ($, U) => {
  (o0.init($, U), i.init($, U));
});
function jq($) {
  return mJ(wW, $);
}
var GW = O("ZodUndefined", ($, U) => {
  (t0.init($, U), i.init($, U));
});
function Qq($) {
  return uJ(GW, $);
}
var NW = O("ZodNull", ($, U) => {
  (a0.init($, U), i.init($, U));
});
function qW($) {
  return cJ(NW, $);
}
var OW = O("ZodAny", ($, U) => {
  (s0.init($, U), i.init($, U));
});
function Yq() {
  return iJ(OW);
}
var HW = O("ZodUnknown", ($, U) => {
  (e0.init($, U), i.init($, U));
});
function Z4() {
  return nJ(HW);
}
var BW = O("ZodNever", ($, U) => {
  ($X.init($, U), i.init($, U));
});
function cj($) {
  return lJ(BW, $);
}
var DW = O("ZodVoid", ($, U) => {
  (UX.init($, U), i.init($, U));
});
function Wq($) {
  return dJ(DW, $);
}
var Pz = O("ZodDate", ($, U) => {
  (zX.init($, U), i.init($, U), ($.min = (X, z) => $.check(i$(X, z))), ($.max = (X, z) => $.check(U6(X, z))));
  let v = $._zod.bag;
  (($.minDate = v.minimum ? new Date(v.minimum) : null), ($.maxDate = v.maximum ? new Date(v.maximum) : null));
});
function wq($) {
  return pJ(Pz, $);
}
var KW = O("ZodArray", ($, U) => {
  (vX.init($, U),
    i.init($, U),
    ($.element = U.element),
    ($.min = (v, X) => $.check(r6(v, X))),
    ($.nonempty = (v) => $.check(r6(1, v))),
    ($.max = (v, X) => $.check(S4(v, X))),
    ($.length = (v, X) => $.check(R4(v, X))),
    ($.unwrap = () => $.element));
});
function Sz($, U) {
  return Uj(KW, $, U);
}
function Gq($) {
  let U = $._zod.def.shape;
  return dj(Object.keys(U));
}
var Rz = O("ZodObject", ($, U) => {
  (XX.init($, U),
    i.init($, U),
    _.defineLazy($, "shape", () => {
      return U.shape;
    }),
    ($.keyof = () => dj(Object.keys($._zod.def.shape))),
    ($.catchall = (v) => $.clone({ ...$._zod.def, catchall: v })),
    ($.passthrough = () => $.clone({ ...$._zod.def, catchall: Z4() })),
    ($.loose = () => $.clone({ ...$._zod.def, catchall: Z4() })),
    ($.strict = () => $.clone({ ...$._zod.def, catchall: cj() })),
    ($.strip = () => $.clone({ ...$._zod.def, catchall: void 0 })),
    ($.extend = (v) => {
      return _.extend($, v);
    }),
    ($.safeExtend = (v) => {
      return _.safeExtend($, v);
    }),
    ($.merge = (v) => _.merge($, v)),
    ($.pick = (v) => _.pick($, v)),
    ($.omit = (v) => _.omit($, v)),
    ($.partial = (...v) => _.partial(rj, $, v[0])),
    ($.required = (...v) => _.required(oj, $, v[0])));
});
function Nq($, U) {
  let v = { type: "object", shape: $ ?? {}, ..._.normalizeParams(U) };
  return new Rz(v);
}
function qq($, U) {
  return new Rz({ type: "object", shape: $, catchall: cj(), ..._.normalizeParams(U) });
}
function Oq($, U) {
  return new Rz({ type: "object", shape: $, catchall: Z4(), ..._.normalizeParams(U) });
}
var ij = O("ZodUnion", ($, U) => {
  (rU.init($, U), i.init($, U), ($.options = U.options));
});
function nj($, U) {
  return new ij({ type: "union", options: $, ..._.normalizeParams(U) });
}
var bW = O("ZodDiscriminatedUnion", ($, U) => {
  (ij.init($, U), JX.init($, U));
});
function Hq($, U, v) {
  return new bW({ type: "union", options: U, discriminator: $, ..._.normalizeParams(v) });
}
var LW = O("ZodIntersection", ($, U) => {
  (jX.init($, U), i.init($, U));
});
function IW($, U) {
  return new LW({ type: "intersection", left: $, right: U });
}
var VW = O("ZodTuple", ($, U) => {
  (oU.init($, U), i.init($, U), ($.rest = (v) => $.clone({ ...$._zod.def, rest: v })));
});
function AW($, U, v) {
  let X = U instanceof m,
    z = X ? v : U;
  return new VW({ type: "tuple", items: $, rest: X ? U : null, ..._.normalizeParams(z) });
}
var lj = O("ZodRecord", ($, U) => {
  (QX.init($, U), i.init($, U), ($.keyType = U.keyType), ($.valueType = U.valueType));
});
function FW($, U, v) {
  return new lj({ type: "record", keyType: $, valueType: U, ..._.normalizeParams(v) });
}
function Bq($, U, v) {
  let X = k$($);
  return ((X._zod.values = void 0), new lj({ type: "record", keyType: X, valueType: U, ..._.normalizeParams(v) }));
}
var EW = O("ZodMap", ($, U) => {
  (YX.init($, U), i.init($, U), ($.keyType = U.keyType), ($.valueType = U.valueType));
});
function Dq($, U, v) {
  return new EW({ type: "map", keyType: $, valueType: U, ..._.normalizeParams(v) });
}
var _W = O("ZodSet", ($, U) => {
  (WX.init($, U),
    i.init($, U),
    ($.min = (...v) => $.check(w4(...v))),
    ($.nonempty = (v) => $.check(w4(1, v))),
    ($.max = (...v) => $.check(P4(...v))),
    ($.size = (...v) => $.check(E1(...v))));
});
function Kq($, U) {
  return new _W({ type: "set", valueType: $, ..._.normalizeParams(U) });
}
var y1 = O("ZodEnum", ($, U) => {
  (wX.init($, U), i.init($, U), ($.enum = U.entries), ($.options = Object.values(U.entries)));
  let v = new Set(Object.keys(U.entries));
  (($.extract = (X, z) => {
    let J = {};
    for (let j of X)
      if (v.has(j)) J[j] = U.entries[j];
      else throw Error(`Key ${j} not found in enum`);
    return new y1({ ...U, checks: [], ..._.normalizeParams(z), entries: J });
  }),
    ($.exclude = (X, z) => {
      let J = { ...U.entries };
      for (let j of X)
        if (v.has(j)) delete J[j];
        else throw Error(`Key ${j} not found in enum`);
      return new y1({ ...U, checks: [], ..._.normalizeParams(z), entries: J });
    }));
});
function dj($, U) {
  let v = Array.isArray($) ? Object.fromEntries($.map((X) => [X, X])) : $;
  return new y1({ type: "enum", entries: v, ..._.normalizeParams(U) });
}
function bq($, U) {
  return new y1({ type: "enum", entries: $, ..._.normalizeParams(U) });
}
var MW = O("ZodLiteral", ($, U) => {
  (GX.init($, U),
    i.init($, U),
    ($.values = new Set(U.values)),
    Object.defineProperty($, "value", {
      get() {
        if (U.values.length > 1)
          throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
        return U.values[0];
      },
    }));
});
function Lq($, U) {
  return new MW({ type: "literal", values: Array.isArray($) ? $ : [$], ..._.normalizeParams(U) });
}
var PW = O("ZodFile", ($, U) => {
  (NX.init($, U),
    i.init($, U),
    ($.min = (v, X) => $.check(w4(v, X))),
    ($.max = (v, X) => $.check(P4(v, X))),
    ($.mime = (v, X) => $.check(Z1(Array.isArray(v) ? v : [v], X))));
});
function Iq($) {
  return zj(PW, $);
}
var SW = O("ZodTransform", ($, U) => {
  (qX.init($, U),
    i.init($, U),
    ($._zod.parse = (v, X) => {
      if (X.direction === "backward") throw new J4($.constructor.name);
      v.addIssue = (J) => {
        if (typeof J === "string") v.issues.push(_.issue(J, v.value, U));
        else {
          let j = J;
          if (j.fatal) j.continue = !1;
          (j.code ?? (j.code = "custom"),
            j.input ?? (j.input = v.value),
            j.inst ?? (j.inst = $),
            v.issues.push(_.issue(j)));
        }
      };
      let z = U.transform(v.value, v);
      if (z instanceof Promise)
        return z.then((J) => {
          return ((v.value = J), v);
        });
      return ((v.value = z), v);
    }));
});
function pj($) {
  return new SW({ type: "transform", transform: $ });
}
var rj = O("ZodOptional", ($, U) => {
  (OX.init($, U), i.init($, U), ($.unwrap = () => $._zod.def.innerType));
});
function Fz($) {
  return new rj({ type: "optional", innerType: $ });
}
var RW = O("ZodNullable", ($, U) => {
  (HX.init($, U), i.init($, U), ($.unwrap = () => $._zod.def.innerType));
});
function Ez($) {
  return new RW({ type: "nullable", innerType: $ });
}
function Vq($) {
  return Fz(Ez($));
}
var kW = O("ZodDefault", ($, U) => {
  (BX.init($, U), i.init($, U), ($.unwrap = () => $._zod.def.innerType), ($.removeDefault = $.unwrap));
});
function ZW($, U) {
  return new kW({
    type: "default",
    innerType: $,
    get defaultValue() {
      return typeof U === "function" ? U() : _.shallowClone(U);
    },
  });
}
var TW = O("ZodPrefault", ($, U) => {
  (DX.init($, U), i.init($, U), ($.unwrap = () => $._zod.def.innerType));
});
function CW($, U) {
  return new TW({
    type: "prefault",
    innerType: $,
    get defaultValue() {
      return typeof U === "function" ? U() : _.shallowClone(U);
    },
  });
}
var oj = O("ZodNonOptional", ($, U) => {
  (KX.init($, U), i.init($, U), ($.unwrap = () => $._zod.def.innerType));
});
function xW($, U) {
  return new oj({ type: "nonoptional", innerType: $, ..._.normalizeParams(U) });
}
var gW = O("ZodSuccess", ($, U) => {
  (bX.init($, U), i.init($, U), ($.unwrap = () => $._zod.def.innerType));
});
function Aq($) {
  return new gW({ type: "success", innerType: $ });
}
var fW = O("ZodCatch", ($, U) => {
  (LX.init($, U), i.init($, U), ($.unwrap = () => $._zod.def.innerType), ($.removeCatch = $.unwrap));
});
function hW($, U) {
  return new fW({ type: "catch", innerType: $, catchValue: typeof U === "function" ? U : () => U });
}
var yW = O("ZodNaN", ($, U) => {
  (IX.init($, U), i.init($, U));
});
function Fq($) {
  return oJ(yW, $);
}
var tj = O("ZodPipe", ($, U) => {
  (VX.init($, U), i.init($, U), ($.in = U.in), ($.out = U.out));
});
function _z($, U) {
  return new tj({ type: "pipe", in: $, out: U });
}
var aj = O("ZodCodec", ($, U) => {
  (tj.init($, U), H1.init($, U));
});
function Eq($, U, v) {
  return new aj({ type: "pipe", in: $, out: U, transform: v.decode, reverseTransform: v.encode });
}
var mW = O("ZodReadonly", ($, U) => {
  (AX.init($, U), i.init($, U), ($.unwrap = () => $._zod.def.innerType));
});
function uW($) {
  return new mW({ type: "readonly", innerType: $ });
}
var cW = O("ZodTemplateLiteral", ($, U) => {
  (FX.init($, U), i.init($, U));
});
function _q($, U) {
  return new cW({ type: "template_literal", parts: $, ..._.normalizeParams(U) });
}
var iW = O("ZodLazy", ($, U) => {
  (MX.init($, U), i.init($, U), ($.unwrap = () => $._zod.def.getter()));
});
function nW($) {
  return new iW({ type: "lazy", getter: $ });
}
var lW = O("ZodPromise", ($, U) => {
  (_X.init($, U), i.init($, U), ($.unwrap = () => $._zod.def.innerType));
});
function Mq($) {
  return new lW({ type: "promise", innerType: $ });
}
var dW = O("ZodFunction", ($, U) => {
  (EX.init($, U), i.init($, U));
});
function Pq($) {
  return new dW({
    type: "function",
    input: Array.isArray($?.input) ? AW($?.input) : ($?.input ?? Sz(Z4())),
    output: $?.output ?? Z4(),
  });
}
var kz = O("ZodCustom", ($, U) => {
  (PX.init($, U), i.init($, U));
});
function Sq($) {
  let U = new Y$({ check: "custom" });
  return ((U._zod.check = $), U);
}
function Rq($, U) {
  return vj(kz, $ ?? (() => !0), U);
}
function pW($, U = {}) {
  return Xj(kz, $, U);
}
function rW($) {
  return Jj($);
}
function kq($, U = { error: `Input not instance of ${$.name}` }) {
  let v = new kz({ type: "custom", check: "custom", fn: (X) => X instanceof $, abort: !0, ..._.normalizeParams(U) });
  return ((v._zod.bag.Class = $), v);
}
var Zq = (...$) => jj({ Codec: aj, Boolean: i1, String: m1 }, ...$);
function Tq($) {
  let U = nW(() => {
    return nj([Vj($), YW(), WW(), qW(), Sz(U), FW(Vj(), U)]);
  });
  return U;
}
function Cq($, U) {
  return _z(pj($), U);
}
var xq = {
  invalid_type: "invalid_type",
  too_big: "too_big",
  too_small: "too_small",
  invalid_format: "invalid_format",
  not_multiple_of: "not_multiple_of",
  unrecognized_keys: "unrecognized_keys",
  invalid_union: "invalid_union",
  invalid_key: "invalid_key",
  invalid_element: "invalid_element",
  invalid_value: "invalid_value",
  custom: "custom",
};
function gq($) {
  D$({ customError: $ });
}
function fq() {
  return D$().customError;
}
var sj;
(function ($) {})(sj || (sj = {}));
var ej = {};
v4(ej, { string: () => hq, number: () => yq, date: () => cq, boolean: () => mq, bigint: () => uq });
function hq($) {
  return IJ(m1, $);
}
function yq($) {
  return PJ(c1, $);
}
function mq($) {
  return xJ(i1, $);
}
function uq($) {
  return fJ(n1, $);
}
function cq($) {
  return rJ(Pz, $);
}
D$(B1());
var p;
(function ($) {
  $.assertEqual = (z) => {};
  function U(z) {}
  $.assertIs = U;
  function v(z) {
    throw Error();
  }
  (($.assertNever = v),
    ($.arrayToEnum = (z) => {
      let J = {};
      for (let j of z) J[j] = j;
      return J;
    }),
    ($.getValidEnumValues = (z) => {
      let J = $.objectKeys(z).filter((Q) => typeof z[z[Q]] !== "number"),
        j = {};
      for (let Q of J) j[Q] = z[Q];
      return $.objectValues(j);
    }),
    ($.objectValues = (z) => {
      return $.objectKeys(z).map(function (J) {
        return z[J];
      });
    }),
    ($.objectKeys =
      typeof Object.keys === "function"
        ? (z) => Object.keys(z)
        : (z) => {
            let J = [];
            for (let j in z) if (Object.prototype.hasOwnProperty.call(z, j)) J.push(j);
            return J;
          }),
    ($.find = (z, J) => {
      for (let j of z) if (J(j)) return j;
      return;
    }),
    ($.isInteger =
      typeof Number.isInteger === "function"
        ? (z) => Number.isInteger(z)
        : (z) => typeof z === "number" && Number.isFinite(z) && Math.floor(z) === z));
  function X(z, J = " | ") {
    return z.map((j) => (typeof j === "string" ? `'${j}'` : j)).join(J);
  }
  (($.joinValues = X),
    ($.jsonStringifyReplacer = (z, J) => {
      if (typeof J === "bigint") return J.toString();
      return J;
    }));
})(p || (p = {}));
var oW;
(function ($) {
  $.mergeShapes = (U, v) => {
    return { ...U, ...v };
  };
})(oW || (oW = {}));
var M = p.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
  ]),
  Z6 = ($) => {
    switch (typeof $) {
      case "undefined":
        return M.undefined;
      case "string":
        return M.string;
      case "number":
        return Number.isNaN($) ? M.nan : M.number;
      case "boolean":
        return M.boolean;
      case "function":
        return M.function;
      case "bigint":
        return M.bigint;
      case "symbol":
        return M.symbol;
      case "object":
        if (Array.isArray($)) return M.array;
        if ($ === null) return M.null;
        if ($.then && typeof $.then === "function" && $.catch && typeof $.catch === "function") return M.promise;
        if (typeof Map < "u" && $ instanceof Map) return M.map;
        if (typeof Set < "u" && $ instanceof Set) return M.set;
        if (typeof Date < "u" && $ instanceof Date) return M.date;
        return M.object;
      default:
        return M.unknown;
    }
  };
var V = p.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite",
]);
class o$ extends Error {
  get errors() {
    return this.issues;
  }
  constructor($) {
    super();
    ((this.issues = []),
      (this.addIssue = (v) => {
        this.issues = [...this.issues, v];
      }),
      (this.addIssues = (v = []) => {
        this.issues = [...this.issues, ...v];
      }));
    let U = new.target.prototype;
    if (Object.setPrototypeOf) Object.setPrototypeOf(this, U);
    else this.__proto__ = U;
    ((this.name = "ZodError"), (this.issues = $));
  }
  format($) {
    let U =
        $ ||
        function (z) {
          return z.message;
        },
      v = { _errors: [] },
      X = (z) => {
        for (let J of z.issues)
          if (J.code === "invalid_union") J.unionErrors.map(X);
          else if (J.code === "invalid_return_type") X(J.returnTypeError);
          else if (J.code === "invalid_arguments") X(J.argumentsError);
          else if (J.path.length === 0) v._errors.push(U(J));
          else {
            let j = v,
              Q = 0;
            while (Q < J.path.length) {
              let W = J.path[Q];
              if (Q !== J.path.length - 1) j[W] = j[W] || { _errors: [] };
              else ((j[W] = j[W] || { _errors: [] }), j[W]._errors.push(U(J)));
              ((j = j[W]), Q++);
            }
          }
      };
    return (X(this), v);
  }
  static assert($) {
    if (!($ instanceof o$)) throw Error(`Not a ZodError: ${$}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, p.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten($ = (U) => U.message) {
    let U = {},
      v = [];
    for (let X of this.issues)
      if (X.path.length > 0) {
        let z = X.path[0];
        ((U[z] = U[z] || []), U[z].push($(X)));
      } else v.push($(X));
    return { formErrors: v, fieldErrors: U };
  }
  get formErrors() {
    return this.flatten();
  }
}
o$.create = ($) => {
  return new o$($);
};
var iq = ($, U) => {
    let v;
    switch ($.code) {
      case V.invalid_type:
        if ($.received === M.undefined) v = "Required";
        else v = `Expected ${$.expected}, received ${$.received}`;
        break;
      case V.invalid_literal:
        v = `Invalid literal value, expected ${JSON.stringify($.expected, p.jsonStringifyReplacer)}`;
        break;
      case V.unrecognized_keys:
        v = `Unrecognized key(s) in object: ${p.joinValues($.keys, ", ")}`;
        break;
      case V.invalid_union:
        v = "Invalid input";
        break;
      case V.invalid_union_discriminator:
        v = `Invalid discriminator value. Expected ${p.joinValues($.options)}`;
        break;
      case V.invalid_enum_value:
        v = `Invalid enum value. Expected ${p.joinValues($.options)}, received '${$.received}'`;
        break;
      case V.invalid_arguments:
        v = "Invalid function arguments";
        break;
      case V.invalid_return_type:
        v = "Invalid function return type";
        break;
      case V.invalid_date:
        v = "Invalid date";
        break;
      case V.invalid_string:
        if (typeof $.validation === "object")
          if ("includes" in $.validation) {
            if (
              ((v = `Invalid input: must include "${$.validation.includes}"`),
              typeof $.validation.position === "number")
            )
              v = `${v} at one or more positions greater than or equal to ${$.validation.position}`;
          } else if ("startsWith" in $.validation) v = `Invalid input: must start with "${$.validation.startsWith}"`;
          else if ("endsWith" in $.validation) v = `Invalid input: must end with "${$.validation.endsWith}"`;
          else p.assertNever($.validation);
        else if ($.validation !== "regex") v = `Invalid ${$.validation}`;
        else v = "Invalid";
        break;
      case V.too_small:
        if ($.type === "array")
          v = `Array must contain ${$.exact ? "exactly" : $.inclusive ? "at least" : "more than"} ${$.minimum} element(s)`;
        else if ($.type === "string")
          v = `String must contain ${$.exact ? "exactly" : $.inclusive ? "at least" : "over"} ${$.minimum} character(s)`;
        else if ($.type === "number")
          v = `Number must be ${$.exact ? "exactly equal to " : $.inclusive ? "greater than or equal to " : "greater than "}${$.minimum}`;
        else if ($.type === "bigint")
          v = `Number must be ${$.exact ? "exactly equal to " : $.inclusive ? "greater than or equal to " : "greater than "}${$.minimum}`;
        else if ($.type === "date")
          v = `Date must be ${$.exact ? "exactly equal to " : $.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number($.minimum))}`;
        else v = "Invalid input";
        break;
      case V.too_big:
        if ($.type === "array")
          v = `Array must contain ${$.exact ? "exactly" : $.inclusive ? "at most" : "less than"} ${$.maximum} element(s)`;
        else if ($.type === "string")
          v = `String must contain ${$.exact ? "exactly" : $.inclusive ? "at most" : "under"} ${$.maximum} character(s)`;
        else if ($.type === "number")
          v = `Number must be ${$.exact ? "exactly" : $.inclusive ? "less than or equal to" : "less than"} ${$.maximum}`;
        else if ($.type === "bigint")
          v = `BigInt must be ${$.exact ? "exactly" : $.inclusive ? "less than or equal to" : "less than"} ${$.maximum}`;
        else if ($.type === "date")
          v = `Date must be ${$.exact ? "exactly" : $.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number($.maximum))}`;
        else v = "Invalid input";
        break;
      case V.custom:
        v = "Invalid input";
        break;
      case V.invalid_intersection_types:
        v = "Intersection results could not be merged";
        break;
      case V.not_multiple_of:
        v = `Number must be a multiple of ${$.multipleOf}`;
        break;
      case V.not_finite:
        v = "Number must be finite";
        break;
      default:
        ((v = U.defaultError), p.assertNever($));
    }
    return { message: v };
  },
  o6 = iq;
var nq = o6;
function l1() {
  return nq;
}
var Zz = ($) => {
  let { data: U, path: v, errorMaps: X, issueData: z } = $,
    J = [...v, ...(z.path || [])],
    j = { ...z, path: J };
  if (z.message !== void 0) return { ...z, path: J, message: z.message };
  let Q = "",
    W = X.filter((w) => !!w)
      .slice()
      .reverse();
  for (let w of W) Q = w(j, { data: U, defaultError: Q }).message;
  return { ...z, path: J, message: Q };
};
function P($, U) {
  let v = l1(),
    X = Zz({
      issueData: U,
      data: $.data,
      path: $.path,
      errorMaps: [$.common.contextualErrorMap, $.schemaErrorMap, v, v === o6 ? void 0 : o6].filter((z) => !!z),
    });
  $.common.issues.push(X);
}
class P$ {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid") this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted") this.value = "aborted";
  }
  static mergeArray($, U) {
    let v = [];
    for (let X of U) {
      if (X.status === "aborted") return h;
      if (X.status === "dirty") $.dirty();
      v.push(X.value);
    }
    return { status: $.value, value: v };
  }
  static async mergeObjectAsync($, U) {
    let v = [];
    for (let X of U) {
      let z = await X.key,
        J = await X.value;
      v.push({ key: z, value: J });
    }
    return P$.mergeObjectSync($, v);
  }
  static mergeObjectSync($, U) {
    let v = {};
    for (let X of U) {
      let { key: z, value: J } = X;
      if (z.status === "aborted") return h;
      if (J.status === "aborted") return h;
      if (z.status === "dirty") $.dirty();
      if (J.status === "dirty") $.dirty();
      if (z.value !== "__proto__" && (typeof J.value < "u" || X.alwaysSet)) v[z.value] = J.value;
    }
    return { status: $.value, value: v };
  }
}
var h = Object.freeze({ status: "aborted" }),
  C4 = ($) => ({ status: "dirty", value: $ }),
  Z$ = ($) => ({ status: "valid", value: $ }),
  $Q = ($) => $.status === "aborted",
  UQ = ($) => $.status === "dirty",
  G4 = ($) => $.status === "valid",
  d1 = ($) => typeof Promise < "u" && $ instanceof Promise;
var Z;
(function ($) {
  (($.errToObj = (U) => (typeof U === "string" ? { message: U } : U || {})),
    ($.toString = (U) => (typeof U === "string" ? U : U?.message)));
})(Z || (Z = {}));
class Q6 {
  constructor($, U, v, X) {
    ((this._cachedPath = []), (this.parent = $), (this.data = U), (this._path = v), (this._key = X));
  }
  get path() {
    if (!this._cachedPath.length)
      if (Array.isArray(this._key)) this._cachedPath.push(...this._path, ...this._key);
      else this._cachedPath.push(...this._path, this._key);
    return this._cachedPath;
  }
}
var tW = ($, U) => {
  if (G4(U)) return { success: !0, data: U.value };
  else {
    if (!$.common.issues.length) throw Error("Validation failed but no issues detected.");
    return {
      success: !1,
      get error() {
        if (this._error) return this._error;
        let v = new o$($.common.issues);
        return ((this._error = v), this._error);
      },
    };
  }
};
function c($) {
  if (!$) return {};
  let { errorMap: U, invalid_type_error: v, required_error: X, description: z } = $;
  if (U && (v || X))
    throw Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  if (U) return { errorMap: U, description: z };
  return {
    errorMap: (j, Q) => {
      let { message: W } = $;
      if (j.code === "invalid_enum_value") return { message: W ?? Q.defaultError };
      if (typeof Q.data > "u") return { message: W ?? X ?? Q.defaultError };
      if (j.code !== "invalid_type") return { message: Q.defaultError };
      return { message: W ?? v ?? Q.defaultError };
    },
    description: z,
  };
}
class l {
  get description() {
    return this._def.description;
  }
  _getType($) {
    return Z6($.data);
  }
  _getOrReturnCtx($, U) {
    return (
      U || {
        common: $.parent.common,
        data: $.data,
        parsedType: Z6($.data),
        schemaErrorMap: this._def.errorMap,
        path: $.path,
        parent: $.parent,
      }
    );
  }
  _processInputParams($) {
    return {
      status: new P$(),
      ctx: {
        common: $.parent.common,
        data: $.data,
        parsedType: Z6($.data),
        schemaErrorMap: this._def.errorMap,
        path: $.path,
        parent: $.parent,
      },
    };
  }
  _parseSync($) {
    let U = this._parse($);
    if (d1(U)) throw Error("Synchronous parse encountered promise.");
    return U;
  }
  _parseAsync($) {
    let U = this._parse($);
    return Promise.resolve(U);
  }
  parse($, U) {
    let v = this.safeParse($, U);
    if (v.success) return v.data;
    throw v.error;
  }
  safeParse($, U) {
    let v = {
        common: { issues: [], async: U?.async ?? !1, contextualErrorMap: U?.errorMap },
        path: U?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: $,
        parsedType: Z6($),
      },
      X = this._parseSync({ data: $, path: v.path, parent: v });
    return tW(v, X);
  }
  "~validate"($) {
    let U = {
      common: { issues: [], async: !!this["~standard"].async },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: $,
      parsedType: Z6($),
    };
    if (!this["~standard"].async)
      try {
        let v = this._parseSync({ data: $, path: [], parent: U });
        return G4(v) ? { value: v.value } : { issues: U.common.issues };
      } catch (v) {
        if (v?.message?.toLowerCase()?.includes("encountered")) this["~standard"].async = !0;
        U.common = { issues: [], async: !0 };
      }
    return this._parseAsync({ data: $, path: [], parent: U }).then((v) =>
      G4(v) ? { value: v.value } : { issues: U.common.issues },
    );
  }
  async parseAsync($, U) {
    let v = await this.safeParseAsync($, U);
    if (v.success) return v.data;
    throw v.error;
  }
  async safeParseAsync($, U) {
    let v = {
        common: { issues: [], contextualErrorMap: U?.errorMap, async: !0 },
        path: U?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: $,
        parsedType: Z6($),
      },
      X = this._parse({ data: $, path: v.path, parent: v }),
      z = await (d1(X) ? X : Promise.resolve(X));
    return tW(v, z);
  }
  refine($, U) {
    let v = (X) => {
      if (typeof U === "string" || typeof U > "u") return { message: U };
      else if (typeof U === "function") return U(X);
      else return U;
    };
    return this._refinement((X, z) => {
      let J = $(X),
        j = () => z.addIssue({ code: V.custom, ...v(X) });
      if (typeof Promise < "u" && J instanceof Promise)
        return J.then((Q) => {
          if (!Q) return (j(), !1);
          else return !0;
        });
      if (!J) return (j(), !1);
      else return !0;
    });
  }
  refinement($, U) {
    return this._refinement((v, X) => {
      if (!$(v)) return (X.addIssue(typeof U === "function" ? U(v, X) : U), !1);
      else return !0;
    });
  }
  _refinement($) {
    return new V6({ schema: this, typeName: A.ZodEffects, effect: { type: "refinement", refinement: $ } });
  }
  superRefine($) {
    return this._refinement($);
  }
  constructor($) {
    ((this.spa = this.safeParseAsync),
      (this._def = $),
      (this.parse = this.parse.bind(this)),
      (this.safeParse = this.safeParse.bind(this)),
      (this.parseAsync = this.parseAsync.bind(this)),
      (this.safeParseAsync = this.safeParseAsync.bind(this)),
      (this.spa = this.spa.bind(this)),
      (this.refine = this.refine.bind(this)),
      (this.refinement = this.refinement.bind(this)),
      (this.superRefine = this.superRefine.bind(this)),
      (this.optional = this.optional.bind(this)),
      (this.nullable = this.nullable.bind(this)),
      (this.nullish = this.nullish.bind(this)),
      (this.array = this.array.bind(this)),
      (this.promise = this.promise.bind(this)),
      (this.or = this.or.bind(this)),
      (this.and = this.and.bind(this)),
      (this.transform = this.transform.bind(this)),
      (this.brand = this.brand.bind(this)),
      (this.default = this.default.bind(this)),
      (this.catch = this.catch.bind(this)),
      (this.describe = this.describe.bind(this)),
      (this.pipe = this.pipe.bind(this)),
      (this.readonly = this.readonly.bind(this)),
      (this.isNullable = this.isNullable.bind(this)),
      (this.isOptional = this.isOptional.bind(this)),
      (this["~standard"] = { version: 1, vendor: "zod", validate: (U) => this["~validate"](U) }));
  }
  optional() {
    return I6.create(this, this._def);
  }
  nullable() {
    return t6.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return L6.create(this);
  }
  promise() {
    return y4.create(this, this._def);
  }
  or($) {
    return a1.create([this, $], this._def);
  }
  and($) {
    return s1.create(this, $, this._def);
  }
  transform($) {
    return new V6({
      ...c(this._def),
      schema: this,
      typeName: A.ZodEffects,
      effect: { type: "transform", transform: $ },
    });
  }
  default($) {
    let U = typeof $ === "function" ? $ : () => $;
    return new zU({ ...c(this._def), innerType: this, defaultValue: U, typeName: A.ZodDefault });
  }
  brand() {
    return new JQ({ typeName: A.ZodBranded, type: this, ...c(this._def) });
  }
  catch($) {
    let U = typeof $ === "function" ? $ : () => $;
    return new vU({ ...c(this._def), innerType: this, catchValue: U, typeName: A.ZodCatch });
  }
  describe($) {
    return new this.constructor({ ...this._def, description: $ });
  }
  pipe($) {
    return mz.create(this, $);
  }
  readonly() {
    return XU.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
var lq = /^c[^\s-]{8,}$/i,
  dq = /^[0-9a-z]+$/,
  pq = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
  rq = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  oq = /^[a-z0-9_-]{21}$/i,
  tq = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
  aq =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  sq = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  eq = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
  zQ,
  $O =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  UO =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  zO =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  vO =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  XO = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  JO = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  aW =
    "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
  jO = new RegExp(`^${aW}$`);
function sW($) {
  let U = "[0-5]\\d";
  if ($.precision) U = `${U}\\.\\d{${$.precision}}`;
  else if ($.precision == null) U = `${U}(\\.\\d+)?`;
  let v = $.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${U})${v}`;
}
function QO($) {
  return new RegExp(`^${sW($)}$`);
}
function YO($) {
  let U = `${aW}T${sW($)}`,
    v = [];
  if ((v.push($.local ? "Z?" : "Z"), $.offset)) v.push("([+-]\\d{2}:?\\d{2})");
  return ((U = `${U}(${v.join("|")})`), new RegExp(`^${U}$`));
}
function WO($, U) {
  if ((U === "v4" || !U) && $O.test($)) return !0;
  if ((U === "v6" || !U) && zO.test($)) return !0;
  return !1;
}
function wO($, U) {
  if (!tq.test($)) return !1;
  try {
    let [v] = $.split(".");
    if (!v) return !1;
    let X = v
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .padEnd(v.length + ((4 - (v.length % 4)) % 4), "="),
      z = JSON.parse(atob(X));
    if (typeof z !== "object" || z === null) return !1;
    if ("typ" in z && z?.typ !== "JWT") return !1;
    if (!z.alg) return !1;
    if (U && z.alg !== U) return !1;
    return !0;
  } catch {
    return !1;
  }
}
function GO($, U) {
  if ((U === "v4" || !U) && UO.test($)) return !0;
  if ((U === "v6" || !U) && vO.test($)) return !0;
  return !1;
}
class C6 extends l {
  _parse($) {
    if (this._def.coerce) $.data = String($.data);
    if (this._getType($) !== M.string) {
      let z = this._getOrReturnCtx($);
      return (P(z, { code: V.invalid_type, expected: M.string, received: z.parsedType }), h);
    }
    let v = new P$(),
      X = void 0;
    for (let z of this._def.checks)
      if (z.kind === "min") {
        if ($.data.length < z.value)
          ((X = this._getOrReturnCtx($, X)),
            P(X, { code: V.too_small, minimum: z.value, type: "string", inclusive: !0, exact: !1, message: z.message }),
            v.dirty());
      } else if (z.kind === "max") {
        if ($.data.length > z.value)
          ((X = this._getOrReturnCtx($, X)),
            P(X, { code: V.too_big, maximum: z.value, type: "string", inclusive: !0, exact: !1, message: z.message }),
            v.dirty());
      } else if (z.kind === "length") {
        let J = $.data.length > z.value,
          j = $.data.length < z.value;
        if (J || j) {
          if (((X = this._getOrReturnCtx($, X)), J))
            P(X, { code: V.too_big, maximum: z.value, type: "string", inclusive: !0, exact: !0, message: z.message });
          else if (j)
            P(X, { code: V.too_small, minimum: z.value, type: "string", inclusive: !0, exact: !0, message: z.message });
          v.dirty();
        }
      } else if (z.kind === "email") {
        if (!sq.test($.data))
          ((X = this._getOrReturnCtx($, X)),
            P(X, { validation: "email", code: V.invalid_string, message: z.message }),
            v.dirty());
      } else if (z.kind === "emoji") {
        if (!zQ) zQ = new RegExp(eq, "u");
        if (!zQ.test($.data))
          ((X = this._getOrReturnCtx($, X)),
            P(X, { validation: "emoji", code: V.invalid_string, message: z.message }),
            v.dirty());
      } else if (z.kind === "uuid") {
        if (!rq.test($.data))
          ((X = this._getOrReturnCtx($, X)),
            P(X, { validation: "uuid", code: V.invalid_string, message: z.message }),
            v.dirty());
      } else if (z.kind === "nanoid") {
        if (!oq.test($.data))
          ((X = this._getOrReturnCtx($, X)),
            P(X, { validation: "nanoid", code: V.invalid_string, message: z.message }),
            v.dirty());
      } else if (z.kind === "cuid") {
        if (!lq.test($.data))
          ((X = this._getOrReturnCtx($, X)),
            P(X, { validation: "cuid", code: V.invalid_string, message: z.message }),
            v.dirty());
      } else if (z.kind === "cuid2") {
        if (!dq.test($.data))
          ((X = this._getOrReturnCtx($, X)),
            P(X, { validation: "cuid2", code: V.invalid_string, message: z.message }),
            v.dirty());
      } else if (z.kind === "ulid") {
        if (!pq.test($.data))
          ((X = this._getOrReturnCtx($, X)),
            P(X, { validation: "ulid", code: V.invalid_string, message: z.message }),
            v.dirty());
      } else if (z.kind === "url")
        try {
          new URL($.data);
        } catch {
          ((X = this._getOrReturnCtx($, X)),
            P(X, { validation: "url", code: V.invalid_string, message: z.message }),
            v.dirty());
        }
      else if (z.kind === "regex") {
        if (((z.regex.lastIndex = 0), !z.regex.test($.data)))
          ((X = this._getOrReturnCtx($, X)),
            P(X, { validation: "regex", code: V.invalid_string, message: z.message }),
            v.dirty());
      } else if (z.kind === "trim") $.data = $.data.trim();
      else if (z.kind === "includes") {
        if (!$.data.includes(z.value, z.position))
          ((X = this._getOrReturnCtx($, X)),
            P(X, {
              code: V.invalid_string,
              validation: { includes: z.value, position: z.position },
              message: z.message,
            }),
            v.dirty());
      } else if (z.kind === "toLowerCase") $.data = $.data.toLowerCase();
      else if (z.kind === "toUpperCase") $.data = $.data.toUpperCase();
      else if (z.kind === "startsWith") {
        if (!$.data.startsWith(z.value))
          ((X = this._getOrReturnCtx($, X)),
            P(X, { code: V.invalid_string, validation: { startsWith: z.value }, message: z.message }),
            v.dirty());
      } else if (z.kind === "endsWith") {
        if (!$.data.endsWith(z.value))
          ((X = this._getOrReturnCtx($, X)),
            P(X, { code: V.invalid_string, validation: { endsWith: z.value }, message: z.message }),
            v.dirty());
      } else if (z.kind === "datetime") {
        if (!YO(z).test($.data))
          ((X = this._getOrReturnCtx($, X)),
            P(X, { code: V.invalid_string, validation: "datetime", message: z.message }),
            v.dirty());
      } else if (z.kind === "date") {
        if (!jO.test($.data))
          ((X = this._getOrReturnCtx($, X)),
            P(X, { code: V.invalid_string, validation: "date", message: z.message }),
            v.dirty());
      } else if (z.kind === "time") {
        if (!QO(z).test($.data))
          ((X = this._getOrReturnCtx($, X)),
            P(X, { code: V.invalid_string, validation: "time", message: z.message }),
            v.dirty());
      } else if (z.kind === "duration") {
        if (!aq.test($.data))
          ((X = this._getOrReturnCtx($, X)),
            P(X, { validation: "duration", code: V.invalid_string, message: z.message }),
            v.dirty());
      } else if (z.kind === "ip") {
        if (!WO($.data, z.version))
          ((X = this._getOrReturnCtx($, X)),
            P(X, { validation: "ip", code: V.invalid_string, message: z.message }),
            v.dirty());
      } else if (z.kind === "jwt") {
        if (!wO($.data, z.alg))
          ((X = this._getOrReturnCtx($, X)),
            P(X, { validation: "jwt", code: V.invalid_string, message: z.message }),
            v.dirty());
      } else if (z.kind === "cidr") {
        if (!GO($.data, z.version))
          ((X = this._getOrReturnCtx($, X)),
            P(X, { validation: "cidr", code: V.invalid_string, message: z.message }),
            v.dirty());
      } else if (z.kind === "base64") {
        if (!XO.test($.data))
          ((X = this._getOrReturnCtx($, X)),
            P(X, { validation: "base64", code: V.invalid_string, message: z.message }),
            v.dirty());
      } else if (z.kind === "base64url") {
        if (!JO.test($.data))
          ((X = this._getOrReturnCtx($, X)),
            P(X, { validation: "base64url", code: V.invalid_string, message: z.message }),
            v.dirty());
      } else p.assertNever(z);
    return { status: v.value, value: $.data };
  }
  _regex($, U, v) {
    return this.refinement((X) => $.test(X), { validation: U, code: V.invalid_string, ...Z.errToObj(v) });
  }
  _addCheck($) {
    return new C6({ ...this._def, checks: [...this._def.checks, $] });
  }
  email($) {
    return this._addCheck({ kind: "email", ...Z.errToObj($) });
  }
  url($) {
    return this._addCheck({ kind: "url", ...Z.errToObj($) });
  }
  emoji($) {
    return this._addCheck({ kind: "emoji", ...Z.errToObj($) });
  }
  uuid($) {
    return this._addCheck({ kind: "uuid", ...Z.errToObj($) });
  }
  nanoid($) {
    return this._addCheck({ kind: "nanoid", ...Z.errToObj($) });
  }
  cuid($) {
    return this._addCheck({ kind: "cuid", ...Z.errToObj($) });
  }
  cuid2($) {
    return this._addCheck({ kind: "cuid2", ...Z.errToObj($) });
  }
  ulid($) {
    return this._addCheck({ kind: "ulid", ...Z.errToObj($) });
  }
  base64($) {
    return this._addCheck({ kind: "base64", ...Z.errToObj($) });
  }
  base64url($) {
    return this._addCheck({ kind: "base64url", ...Z.errToObj($) });
  }
  jwt($) {
    return this._addCheck({ kind: "jwt", ...Z.errToObj($) });
  }
  ip($) {
    return this._addCheck({ kind: "ip", ...Z.errToObj($) });
  }
  cidr($) {
    return this._addCheck({ kind: "cidr", ...Z.errToObj($) });
  }
  datetime($) {
    if (typeof $ === "string")
      return this._addCheck({ kind: "datetime", precision: null, offset: !1, local: !1, message: $ });
    return this._addCheck({
      kind: "datetime",
      precision: typeof $?.precision > "u" ? null : $?.precision,
      offset: $?.offset ?? !1,
      local: $?.local ?? !1,
      ...Z.errToObj($?.message),
    });
  }
  date($) {
    return this._addCheck({ kind: "date", message: $ });
  }
  time($) {
    if (typeof $ === "string") return this._addCheck({ kind: "time", precision: null, message: $ });
    return this._addCheck({
      kind: "time",
      precision: typeof $?.precision > "u" ? null : $?.precision,
      ...Z.errToObj($?.message),
    });
  }
  duration($) {
    return this._addCheck({ kind: "duration", ...Z.errToObj($) });
  }
  regex($, U) {
    return this._addCheck({ kind: "regex", regex: $, ...Z.errToObj(U) });
  }
  includes($, U) {
    return this._addCheck({ kind: "includes", value: $, position: U?.position, ...Z.errToObj(U?.message) });
  }
  startsWith($, U) {
    return this._addCheck({ kind: "startsWith", value: $, ...Z.errToObj(U) });
  }
  endsWith($, U) {
    return this._addCheck({ kind: "endsWith", value: $, ...Z.errToObj(U) });
  }
  min($, U) {
    return this._addCheck({ kind: "min", value: $, ...Z.errToObj(U) });
  }
  max($, U) {
    return this._addCheck({ kind: "max", value: $, ...Z.errToObj(U) });
  }
  length($, U) {
    return this._addCheck({ kind: "length", value: $, ...Z.errToObj(U) });
  }
  nonempty($) {
    return this.min(1, Z.errToObj($));
  }
  trim() {
    return new C6({ ...this._def, checks: [...this._def.checks, { kind: "trim" }] });
  }
  toLowerCase() {
    return new C6({ ...this._def, checks: [...this._def.checks, { kind: "toLowerCase" }] });
  }
  toUpperCase() {
    return new C6({ ...this._def, checks: [...this._def.checks, { kind: "toUpperCase" }] });
  }
  get isDatetime() {
    return !!this._def.checks.find(($) => $.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find(($) => $.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find(($) => $.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find(($) => $.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find(($) => $.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find(($) => $.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find(($) => $.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find(($) => $.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find(($) => $.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find(($) => $.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find(($) => $.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find(($) => $.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find(($) => $.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find(($) => $.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find(($) => $.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find(($) => $.kind === "base64url");
  }
  get minLength() {
    let $ = null;
    for (let U of this._def.checks)
      if (U.kind === "min") {
        if ($ === null || U.value > $) $ = U.value;
      }
    return $;
  }
  get maxLength() {
    let $ = null;
    for (let U of this._def.checks)
      if (U.kind === "max") {
        if ($ === null || U.value < $) $ = U.value;
      }
    return $;
  }
}
C6.create = ($) => {
  return new C6({ checks: [], typeName: A.ZodString, coerce: $?.coerce ?? !1, ...c($) });
};
function NO($, U) {
  let v = ($.toString().split(".")[1] || "").length,
    X = (U.toString().split(".")[1] || "").length,
    z = v > X ? v : X,
    J = Number.parseInt($.toFixed(z).replace(".", "")),
    j = Number.parseInt(U.toFixed(z).replace(".", ""));
  return (J % j) / 10 ** z;
}
class g4 extends l {
  constructor() {
    super(...arguments);
    ((this.min = this.gte), (this.max = this.lte), (this.step = this.multipleOf));
  }
  _parse($) {
    if (this._def.coerce) $.data = Number($.data);
    if (this._getType($) !== M.number) {
      let z = this._getOrReturnCtx($);
      return (P(z, { code: V.invalid_type, expected: M.number, received: z.parsedType }), h);
    }
    let v = void 0,
      X = new P$();
    for (let z of this._def.checks)
      if (z.kind === "int") {
        if (!p.isInteger($.data))
          ((v = this._getOrReturnCtx($, v)),
            P(v, { code: V.invalid_type, expected: "integer", received: "float", message: z.message }),
            X.dirty());
      } else if (z.kind === "min") {
        if (z.inclusive ? $.data < z.value : $.data <= z.value)
          ((v = this._getOrReturnCtx($, v)),
            P(v, {
              code: V.too_small,
              minimum: z.value,
              type: "number",
              inclusive: z.inclusive,
              exact: !1,
              message: z.message,
            }),
            X.dirty());
      } else if (z.kind === "max") {
        if (z.inclusive ? $.data > z.value : $.data >= z.value)
          ((v = this._getOrReturnCtx($, v)),
            P(v, {
              code: V.too_big,
              maximum: z.value,
              type: "number",
              inclusive: z.inclusive,
              exact: !1,
              message: z.message,
            }),
            X.dirty());
      } else if (z.kind === "multipleOf") {
        if (NO($.data, z.value) !== 0)
          ((v = this._getOrReturnCtx($, v)),
            P(v, { code: V.not_multiple_of, multipleOf: z.value, message: z.message }),
            X.dirty());
      } else if (z.kind === "finite") {
        if (!Number.isFinite($.data))
          ((v = this._getOrReturnCtx($, v)), P(v, { code: V.not_finite, message: z.message }), X.dirty());
      } else p.assertNever(z);
    return { status: X.value, value: $.data };
  }
  gte($, U) {
    return this.setLimit("min", $, !0, Z.toString(U));
  }
  gt($, U) {
    return this.setLimit("min", $, !1, Z.toString(U));
  }
  lte($, U) {
    return this.setLimit("max", $, !0, Z.toString(U));
  }
  lt($, U) {
    return this.setLimit("max", $, !1, Z.toString(U));
  }
  setLimit($, U, v, X) {
    return new g4({
      ...this._def,
      checks: [...this._def.checks, { kind: $, value: U, inclusive: v, message: Z.toString(X) }],
    });
  }
  _addCheck($) {
    return new g4({ ...this._def, checks: [...this._def.checks, $] });
  }
  int($) {
    return this._addCheck({ kind: "int", message: Z.toString($) });
  }
  positive($) {
    return this._addCheck({ kind: "min", value: 0, inclusive: !1, message: Z.toString($) });
  }
  negative($) {
    return this._addCheck({ kind: "max", value: 0, inclusive: !1, message: Z.toString($) });
  }
  nonpositive($) {
    return this._addCheck({ kind: "max", value: 0, inclusive: !0, message: Z.toString($) });
  }
  nonnegative($) {
    return this._addCheck({ kind: "min", value: 0, inclusive: !0, message: Z.toString($) });
  }
  multipleOf($, U) {
    return this._addCheck({ kind: "multipleOf", value: $, message: Z.toString(U) });
  }
  finite($) {
    return this._addCheck({ kind: "finite", message: Z.toString($) });
  }
  safe($) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: Z.toString($),
    })._addCheck({ kind: "max", inclusive: !0, value: Number.MAX_SAFE_INTEGER, message: Z.toString($) });
  }
  get minValue() {
    let $ = null;
    for (let U of this._def.checks)
      if (U.kind === "min") {
        if ($ === null || U.value > $) $ = U.value;
      }
    return $;
  }
  get maxValue() {
    let $ = null;
    for (let U of this._def.checks)
      if (U.kind === "max") {
        if ($ === null || U.value < $) $ = U.value;
      }
    return $;
  }
  get isInt() {
    return !!this._def.checks.find(($) => $.kind === "int" || ($.kind === "multipleOf" && p.isInteger($.value)));
  }
  get isFinite() {
    let $ = null,
      U = null;
    for (let v of this._def.checks)
      if (v.kind === "finite" || v.kind === "int" || v.kind === "multipleOf") return !0;
      else if (v.kind === "min") {
        if (U === null || v.value > U) U = v.value;
      } else if (v.kind === "max") {
        if ($ === null || v.value < $) $ = v.value;
      }
    return Number.isFinite(U) && Number.isFinite($);
  }
}
g4.create = ($) => {
  return new g4({ checks: [], typeName: A.ZodNumber, coerce: $?.coerce || !1, ...c($) });
};
class f4 extends l {
  constructor() {
    super(...arguments);
    ((this.min = this.gte), (this.max = this.lte));
  }
  _parse($) {
    if (this._def.coerce)
      try {
        $.data = BigInt($.data);
      } catch {
        return this._getInvalidInput($);
      }
    if (this._getType($) !== M.bigint) return this._getInvalidInput($);
    let v = void 0,
      X = new P$();
    for (let z of this._def.checks)
      if (z.kind === "min") {
        if (z.inclusive ? $.data < z.value : $.data <= z.value)
          ((v = this._getOrReturnCtx($, v)),
            P(v, { code: V.too_small, type: "bigint", minimum: z.value, inclusive: z.inclusive, message: z.message }),
            X.dirty());
      } else if (z.kind === "max") {
        if (z.inclusive ? $.data > z.value : $.data >= z.value)
          ((v = this._getOrReturnCtx($, v)),
            P(v, { code: V.too_big, type: "bigint", maximum: z.value, inclusive: z.inclusive, message: z.message }),
            X.dirty());
      } else if (z.kind === "multipleOf") {
        if ($.data % z.value !== BigInt(0))
          ((v = this._getOrReturnCtx($, v)),
            P(v, { code: V.not_multiple_of, multipleOf: z.value, message: z.message }),
            X.dirty());
      } else p.assertNever(z);
    return { status: X.value, value: $.data };
  }
  _getInvalidInput($) {
    let U = this._getOrReturnCtx($);
    return (P(U, { code: V.invalid_type, expected: M.bigint, received: U.parsedType }), h);
  }
  gte($, U) {
    return this.setLimit("min", $, !0, Z.toString(U));
  }
  gt($, U) {
    return this.setLimit("min", $, !1, Z.toString(U));
  }
  lte($, U) {
    return this.setLimit("max", $, !0, Z.toString(U));
  }
  lt($, U) {
    return this.setLimit("max", $, !1, Z.toString(U));
  }
  setLimit($, U, v, X) {
    return new f4({
      ...this._def,
      checks: [...this._def.checks, { kind: $, value: U, inclusive: v, message: Z.toString(X) }],
    });
  }
  _addCheck($) {
    return new f4({ ...this._def, checks: [...this._def.checks, $] });
  }
  positive($) {
    return this._addCheck({ kind: "min", value: BigInt(0), inclusive: !1, message: Z.toString($) });
  }
  negative($) {
    return this._addCheck({ kind: "max", value: BigInt(0), inclusive: !1, message: Z.toString($) });
  }
  nonpositive($) {
    return this._addCheck({ kind: "max", value: BigInt(0), inclusive: !0, message: Z.toString($) });
  }
  nonnegative($) {
    return this._addCheck({ kind: "min", value: BigInt(0), inclusive: !0, message: Z.toString($) });
  }
  multipleOf($, U) {
    return this._addCheck({ kind: "multipleOf", value: $, message: Z.toString(U) });
  }
  get minValue() {
    let $ = null;
    for (let U of this._def.checks)
      if (U.kind === "min") {
        if ($ === null || U.value > $) $ = U.value;
      }
    return $;
  }
  get maxValue() {
    let $ = null;
    for (let U of this._def.checks)
      if (U.kind === "max") {
        if ($ === null || U.value < $) $ = U.value;
      }
    return $;
  }
}
f4.create = ($) => {
  return new f4({ checks: [], typeName: A.ZodBigInt, coerce: $?.coerce ?? !1, ...c($) });
};
class Tz extends l {
  _parse($) {
    if (this._def.coerce) $.data = Boolean($.data);
    if (this._getType($) !== M.boolean) {
      let v = this._getOrReturnCtx($);
      return (P(v, { code: V.invalid_type, expected: M.boolean, received: v.parsedType }), h);
    }
    return Z$($.data);
  }
}
Tz.create = ($) => {
  return new Tz({ typeName: A.ZodBoolean, coerce: $?.coerce || !1, ...c($) });
};
class r1 extends l {
  _parse($) {
    if (this._def.coerce) $.data = new Date($.data);
    if (this._getType($) !== M.date) {
      let z = this._getOrReturnCtx($);
      return (P(z, { code: V.invalid_type, expected: M.date, received: z.parsedType }), h);
    }
    if (Number.isNaN($.data.getTime())) {
      let z = this._getOrReturnCtx($);
      return (P(z, { code: V.invalid_date }), h);
    }
    let v = new P$(),
      X = void 0;
    for (let z of this._def.checks)
      if (z.kind === "min") {
        if ($.data.getTime() < z.value)
          ((X = this._getOrReturnCtx($, X)),
            P(X, { code: V.too_small, message: z.message, inclusive: !0, exact: !1, minimum: z.value, type: "date" }),
            v.dirty());
      } else if (z.kind === "max") {
        if ($.data.getTime() > z.value)
          ((X = this._getOrReturnCtx($, X)),
            P(X, { code: V.too_big, message: z.message, inclusive: !0, exact: !1, maximum: z.value, type: "date" }),
            v.dirty());
      } else p.assertNever(z);
    return { status: v.value, value: new Date($.data.getTime()) };
  }
  _addCheck($) {
    return new r1({ ...this._def, checks: [...this._def.checks, $] });
  }
  min($, U) {
    return this._addCheck({ kind: "min", value: $.getTime(), message: Z.toString(U) });
  }
  max($, U) {
    return this._addCheck({ kind: "max", value: $.getTime(), message: Z.toString(U) });
  }
  get minDate() {
    let $ = null;
    for (let U of this._def.checks)
      if (U.kind === "min") {
        if ($ === null || U.value > $) $ = U.value;
      }
    return $ != null ? new Date($) : null;
  }
  get maxDate() {
    let $ = null;
    for (let U of this._def.checks)
      if (U.kind === "max") {
        if ($ === null || U.value < $) $ = U.value;
      }
    return $ != null ? new Date($) : null;
  }
}
r1.create = ($) => {
  return new r1({ checks: [], coerce: $?.coerce || !1, typeName: A.ZodDate, ...c($) });
};
class Cz extends l {
  _parse($) {
    if (this._getType($) !== M.symbol) {
      let v = this._getOrReturnCtx($);
      return (P(v, { code: V.invalid_type, expected: M.symbol, received: v.parsedType }), h);
    }
    return Z$($.data);
  }
}
Cz.create = ($) => {
  return new Cz({ typeName: A.ZodSymbol, ...c($) });
};
class o1 extends l {
  _parse($) {
    if (this._getType($) !== M.undefined) {
      let v = this._getOrReturnCtx($);
      return (P(v, { code: V.invalid_type, expected: M.undefined, received: v.parsedType }), h);
    }
    return Z$($.data);
  }
}
o1.create = ($) => {
  return new o1({ typeName: A.ZodUndefined, ...c($) });
};
class t1 extends l {
  _parse($) {
    if (this._getType($) !== M.null) {
      let v = this._getOrReturnCtx($);
      return (P(v, { code: V.invalid_type, expected: M.null, received: v.parsedType }), h);
    }
    return Z$($.data);
  }
}
t1.create = ($) => {
  return new t1({ typeName: A.ZodNull, ...c($) });
};
class xz extends l {
  constructor() {
    super(...arguments);
    this._any = !0;
  }
  _parse($) {
    return Z$($.data);
  }
}
xz.create = ($) => {
  return new xz({ typeName: A.ZodAny, ...c($) });
};
class N4 extends l {
  constructor() {
    super(...arguments);
    this._unknown = !0;
  }
  _parse($) {
    return Z$($.data);
  }
}
N4.create = ($) => {
  return new N4({ typeName: A.ZodUnknown, ...c($) });
};
class x6 extends l {
  _parse($) {
    let U = this._getOrReturnCtx($);
    return (P(U, { code: V.invalid_type, expected: M.never, received: U.parsedType }), h);
  }
}
x6.create = ($) => {
  return new x6({ typeName: A.ZodNever, ...c($) });
};
class gz extends l {
  _parse($) {
    if (this._getType($) !== M.undefined) {
      let v = this._getOrReturnCtx($);
      return (P(v, { code: V.invalid_type, expected: M.void, received: v.parsedType }), h);
    }
    return Z$($.data);
  }
}
gz.create = ($) => {
  return new gz({ typeName: A.ZodVoid, ...c($) });
};
class L6 extends l {
  _parse($) {
    let { ctx: U, status: v } = this._processInputParams($),
      X = this._def;
    if (U.parsedType !== M.array) return (P(U, { code: V.invalid_type, expected: M.array, received: U.parsedType }), h);
    if (X.exactLength !== null) {
      let J = U.data.length > X.exactLength.value,
        j = U.data.length < X.exactLength.value;
      if (J || j)
        (P(U, {
          code: J ? V.too_big : V.too_small,
          minimum: j ? X.exactLength.value : void 0,
          maximum: J ? X.exactLength.value : void 0,
          type: "array",
          inclusive: !0,
          exact: !0,
          message: X.exactLength.message,
        }),
          v.dirty());
    }
    if (X.minLength !== null) {
      if (U.data.length < X.minLength.value)
        (P(U, {
          code: V.too_small,
          minimum: X.minLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: X.minLength.message,
        }),
          v.dirty());
    }
    if (X.maxLength !== null) {
      if (U.data.length > X.maxLength.value)
        (P(U, {
          code: V.too_big,
          maximum: X.maxLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: X.maxLength.message,
        }),
          v.dirty());
    }
    if (U.common.async)
      return Promise.all(
        [...U.data].map((J, j) => {
          return X.type._parseAsync(new Q6(U, J, U.path, j));
        }),
      ).then((J) => {
        return P$.mergeArray(v, J);
      });
    let z = [...U.data].map((J, j) => {
      return X.type._parseSync(new Q6(U, J, U.path, j));
    });
    return P$.mergeArray(v, z);
  }
  get element() {
    return this._def.type;
  }
  min($, U) {
    return new L6({ ...this._def, minLength: { value: $, message: Z.toString(U) } });
  }
  max($, U) {
    return new L6({ ...this._def, maxLength: { value: $, message: Z.toString(U) } });
  }
  length($, U) {
    return new L6({ ...this._def, exactLength: { value: $, message: Z.toString(U) } });
  }
  nonempty($) {
    return this.min(1, $);
  }
}
L6.create = ($, U) => {
  return new L6({ type: $, minLength: null, maxLength: null, exactLength: null, typeName: A.ZodArray, ...c(U) });
};
function x4($) {
  if ($ instanceof N$) {
    let U = {};
    for (let v in $.shape) {
      let X = $.shape[v];
      U[v] = I6.create(x4(X));
    }
    return new N$({ ...$._def, shape: () => U });
  } else if ($ instanceof L6) return new L6({ ...$._def, type: x4($.element) });
  else if ($ instanceof I6) return I6.create(x4($.unwrap()));
  else if ($ instanceof t6) return t6.create(x4($.unwrap()));
  else if ($ instanceof g6) return g6.create($.items.map((U) => x4(U)));
  else return $;
}
class N$ extends l {
  constructor() {
    super(...arguments);
    ((this._cached = null), (this.nonstrict = this.passthrough), (this.augment = this.extend));
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    let $ = this._def.shape(),
      U = p.objectKeys($);
    return ((this._cached = { shape: $, keys: U }), this._cached);
  }
  _parse($) {
    if (this._getType($) !== M.object) {
      let W = this._getOrReturnCtx($);
      return (P(W, { code: V.invalid_type, expected: M.object, received: W.parsedType }), h);
    }
    let { status: v, ctx: X } = this._processInputParams($),
      { shape: z, keys: J } = this._getCached(),
      j = [];
    if (!(this._def.catchall instanceof x6 && this._def.unknownKeys === "strip")) {
      for (let W in X.data) if (!J.includes(W)) j.push(W);
    }
    let Q = [];
    for (let W of J) {
      let w = z[W],
        N = X.data[W];
      Q.push({ key: { status: "valid", value: W }, value: w._parse(new Q6(X, N, X.path, W)), alwaysSet: W in X.data });
    }
    if (this._def.catchall instanceof x6) {
      let W = this._def.unknownKeys;
      if (W === "passthrough")
        for (let w of j) Q.push({ key: { status: "valid", value: w }, value: { status: "valid", value: X.data[w] } });
      else if (W === "strict") {
        if (j.length > 0) (P(X, { code: V.unrecognized_keys, keys: j }), v.dirty());
      } else if (W === "strip");
      else throw Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      let W = this._def.catchall;
      for (let w of j) {
        let N = X.data[w];
        Q.push({
          key: { status: "valid", value: w },
          value: W._parse(new Q6(X, N, X.path, w)),
          alwaysSet: w in X.data,
        });
      }
    }
    if (X.common.async)
      return Promise.resolve()
        .then(async () => {
          let W = [];
          for (let w of Q) {
            let N = await w.key,
              D = await w.value;
            W.push({ key: N, value: D, alwaysSet: w.alwaysSet });
          }
          return W;
        })
        .then((W) => {
          return P$.mergeObjectSync(v, W);
        });
    else return P$.mergeObjectSync(v, Q);
  }
  get shape() {
    return this._def.shape();
  }
  strict($) {
    return (
      Z.errToObj,
      new N$({
        ...this._def,
        unknownKeys: "strict",
        ...($ !== void 0
          ? {
              errorMap: (U, v) => {
                let X = this._def.errorMap?.(U, v).message ?? v.defaultError;
                if (U.code === "unrecognized_keys") return { message: Z.errToObj($).message ?? X };
                return { message: X };
              },
            }
          : {}),
      })
    );
  }
  strip() {
    return new N$({ ...this._def, unknownKeys: "strip" });
  }
  passthrough() {
    return new N$({ ...this._def, unknownKeys: "passthrough" });
  }
  extend($) {
    return new N$({ ...this._def, shape: () => ({ ...this._def.shape(), ...$ }) });
  }
  merge($) {
    return new N$({
      unknownKeys: $._def.unknownKeys,
      catchall: $._def.catchall,
      shape: () => ({ ...this._def.shape(), ...$._def.shape() }),
      typeName: A.ZodObject,
    });
  }
  setKey($, U) {
    return this.augment({ [$]: U });
  }
  catchall($) {
    return new N$({ ...this._def, catchall: $ });
  }
  pick($) {
    let U = {};
    for (let v of p.objectKeys($)) if ($[v] && this.shape[v]) U[v] = this.shape[v];
    return new N$({ ...this._def, shape: () => U });
  }
  omit($) {
    let U = {};
    for (let v of p.objectKeys(this.shape)) if (!$[v]) U[v] = this.shape[v];
    return new N$({ ...this._def, shape: () => U });
  }
  deepPartial() {
    return x4(this);
  }
  partial($) {
    let U = {};
    for (let v of p.objectKeys(this.shape)) {
      let X = this.shape[v];
      if ($ && !$[v]) U[v] = X;
      else U[v] = X.optional();
    }
    return new N$({ ...this._def, shape: () => U });
  }
  required($) {
    let U = {};
    for (let v of p.objectKeys(this.shape))
      if ($ && !$[v]) U[v] = this.shape[v];
      else {
        let z = this.shape[v];
        while (z instanceof I6) z = z._def.innerType;
        U[v] = z;
      }
    return new N$({ ...this._def, shape: () => U });
  }
  keyof() {
    return eW(p.objectKeys(this.shape));
  }
}
N$.create = ($, U) => {
  return new N$({ shape: () => $, unknownKeys: "strip", catchall: x6.create(), typeName: A.ZodObject, ...c(U) });
};
N$.strictCreate = ($, U) => {
  return new N$({ shape: () => $, unknownKeys: "strict", catchall: x6.create(), typeName: A.ZodObject, ...c(U) });
};
N$.lazycreate = ($, U) => {
  return new N$({ shape: $, unknownKeys: "strip", catchall: x6.create(), typeName: A.ZodObject, ...c(U) });
};
class a1 extends l {
  _parse($) {
    let { ctx: U } = this._processInputParams($),
      v = this._def.options;
    function X(z) {
      for (let j of z) if (j.result.status === "valid") return j.result;
      for (let j of z) if (j.result.status === "dirty") return (U.common.issues.push(...j.ctx.common.issues), j.result);
      let J = z.map((j) => new o$(j.ctx.common.issues));
      return (P(U, { code: V.invalid_union, unionErrors: J }), h);
    }
    if (U.common.async)
      return Promise.all(
        v.map(async (z) => {
          let J = { ...U, common: { ...U.common, issues: [] }, parent: null };
          return { result: await z._parseAsync({ data: U.data, path: U.path, parent: J }), ctx: J };
        }),
      ).then(X);
    else {
      let z = void 0,
        J = [];
      for (let Q of v) {
        let W = { ...U, common: { ...U.common, issues: [] }, parent: null },
          w = Q._parseSync({ data: U.data, path: U.path, parent: W });
        if (w.status === "valid") return w;
        else if (w.status === "dirty" && !z) z = { result: w, ctx: W };
        if (W.common.issues.length) J.push(W.common.issues);
      }
      if (z) return (U.common.issues.push(...z.ctx.common.issues), z.result);
      let j = J.map((Q) => new o$(Q));
      return (P(U, { code: V.invalid_union, unionErrors: j }), h);
    }
  }
  get options() {
    return this._def.options;
  }
}
a1.create = ($, U) => {
  return new a1({ options: $, typeName: A.ZodUnion, ...c(U) });
};
var T6 = ($) => {
  if ($ instanceof e1) return T6($.schema);
  else if ($ instanceof V6) return T6($.innerType());
  else if ($ instanceof $U) return [$.value];
  else if ($ instanceof q4) return $.options;
  else if ($ instanceof UU) return p.objectValues($.enum);
  else if ($ instanceof zU) return T6($._def.innerType);
  else if ($ instanceof o1) return [void 0];
  else if ($ instanceof t1) return [null];
  else if ($ instanceof I6) return [void 0, ...T6($.unwrap())];
  else if ($ instanceof t6) return [null, ...T6($.unwrap())];
  else if ($ instanceof JQ) return T6($.unwrap());
  else if ($ instanceof XU) return T6($.unwrap());
  else if ($ instanceof vU) return T6($._def.innerType);
  else return [];
};
class XQ extends l {
  _parse($) {
    let { ctx: U } = this._processInputParams($);
    if (U.parsedType !== M.object)
      return (P(U, { code: V.invalid_type, expected: M.object, received: U.parsedType }), h);
    let v = this.discriminator,
      X = U.data[v],
      z = this.optionsMap.get(X);
    if (!z)
      return (P(U, { code: V.invalid_union_discriminator, options: Array.from(this.optionsMap.keys()), path: [v] }), h);
    if (U.common.async) return z._parseAsync({ data: U.data, path: U.path, parent: U });
    else return z._parseSync({ data: U.data, path: U.path, parent: U });
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create($, U, v) {
    let X = new Map();
    for (let z of U) {
      let J = T6(z.shape[$]);
      if (!J.length)
        throw Error(`A discriminator value for key \`${$}\` could not be extracted from all schema options`);
      for (let j of J) {
        if (X.has(j)) throw Error(`Discriminator property ${String($)} has duplicate value ${String(j)}`);
        X.set(j, z);
      }
    }
    return new XQ({ typeName: A.ZodDiscriminatedUnion, discriminator: $, options: U, optionsMap: X, ...c(v) });
  }
}
function vQ($, U) {
  let v = Z6($),
    X = Z6(U);
  if ($ === U) return { valid: !0, data: $ };
  else if (v === M.object && X === M.object) {
    let z = p.objectKeys(U),
      J = p.objectKeys($).filter((Q) => z.indexOf(Q) !== -1),
      j = { ...$, ...U };
    for (let Q of J) {
      let W = vQ($[Q], U[Q]);
      if (!W.valid) return { valid: !1 };
      j[Q] = W.data;
    }
    return { valid: !0, data: j };
  } else if (v === M.array && X === M.array) {
    if ($.length !== U.length) return { valid: !1 };
    let z = [];
    for (let J = 0; J < $.length; J++) {
      let j = $[J],
        Q = U[J],
        W = vQ(j, Q);
      if (!W.valid) return { valid: !1 };
      z.push(W.data);
    }
    return { valid: !0, data: z };
  } else if (v === M.date && X === M.date && +$ === +U) return { valid: !0, data: $ };
  else return { valid: !1 };
}
class s1 extends l {
  _parse($) {
    let { status: U, ctx: v } = this._processInputParams($),
      X = (z, J) => {
        if ($Q(z) || $Q(J)) return h;
        let j = vQ(z.value, J.value);
        if (!j.valid) return (P(v, { code: V.invalid_intersection_types }), h);
        if (UQ(z) || UQ(J)) U.dirty();
        return { status: U.value, value: j.data };
      };
    if (v.common.async)
      return Promise.all([
        this._def.left._parseAsync({ data: v.data, path: v.path, parent: v }),
        this._def.right._parseAsync({ data: v.data, path: v.path, parent: v }),
      ]).then(([z, J]) => X(z, J));
    else
      return X(
        this._def.left._parseSync({ data: v.data, path: v.path, parent: v }),
        this._def.right._parseSync({ data: v.data, path: v.path, parent: v }),
      );
  }
}
s1.create = ($, U, v) => {
  return new s1({ left: $, right: U, typeName: A.ZodIntersection, ...c(v) });
};
class g6 extends l {
  _parse($) {
    let { status: U, ctx: v } = this._processInputParams($);
    if (v.parsedType !== M.array) return (P(v, { code: V.invalid_type, expected: M.array, received: v.parsedType }), h);
    if (v.data.length < this._def.items.length)
      return (P(v, { code: V.too_small, minimum: this._def.items.length, inclusive: !0, exact: !1, type: "array" }), h);
    if (!this._def.rest && v.data.length > this._def.items.length)
      (P(v, { code: V.too_big, maximum: this._def.items.length, inclusive: !0, exact: !1, type: "array" }), U.dirty());
    let z = [...v.data]
      .map((J, j) => {
        let Q = this._def.items[j] || this._def.rest;
        if (!Q) return null;
        return Q._parse(new Q6(v, J, v.path, j));
      })
      .filter((J) => !!J);
    if (v.common.async)
      return Promise.all(z).then((J) => {
        return P$.mergeArray(U, J);
      });
    else return P$.mergeArray(U, z);
  }
  get items() {
    return this._def.items;
  }
  rest($) {
    return new g6({ ...this._def, rest: $ });
  }
}
g6.create = ($, U) => {
  if (!Array.isArray($)) throw Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new g6({ items: $, typeName: A.ZodTuple, rest: null, ...c(U) });
};
class fz extends l {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse($) {
    let { status: U, ctx: v } = this._processInputParams($);
    if (v.parsedType !== M.object)
      return (P(v, { code: V.invalid_type, expected: M.object, received: v.parsedType }), h);
    let X = [],
      z = this._def.keyType,
      J = this._def.valueType;
    for (let j in v.data)
      X.push({
        key: z._parse(new Q6(v, j, v.path, j)),
        value: J._parse(new Q6(v, v.data[j], v.path, j)),
        alwaysSet: j in v.data,
      });
    if (v.common.async) return P$.mergeObjectAsync(U, X);
    else return P$.mergeObjectSync(U, X);
  }
  get element() {
    return this._def.valueType;
  }
  static create($, U, v) {
    if (U instanceof l) return new fz({ keyType: $, valueType: U, typeName: A.ZodRecord, ...c(v) });
    return new fz({ keyType: C6.create(), valueType: $, typeName: A.ZodRecord, ...c(U) });
  }
}
class hz extends l {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse($) {
    let { status: U, ctx: v } = this._processInputParams($);
    if (v.parsedType !== M.map) return (P(v, { code: V.invalid_type, expected: M.map, received: v.parsedType }), h);
    let X = this._def.keyType,
      z = this._def.valueType,
      J = [...v.data.entries()].map(([j, Q], W) => {
        return { key: X._parse(new Q6(v, j, v.path, [W, "key"])), value: z._parse(new Q6(v, Q, v.path, [W, "value"])) };
      });
    if (v.common.async) {
      let j = new Map();
      return Promise.resolve().then(async () => {
        for (let Q of J) {
          let W = await Q.key,
            w = await Q.value;
          if (W.status === "aborted" || w.status === "aborted") return h;
          if (W.status === "dirty" || w.status === "dirty") U.dirty();
          j.set(W.value, w.value);
        }
        return { status: U.value, value: j };
      });
    } else {
      let j = new Map();
      for (let Q of J) {
        let { key: W, value: w } = Q;
        if (W.status === "aborted" || w.status === "aborted") return h;
        if (W.status === "dirty" || w.status === "dirty") U.dirty();
        j.set(W.value, w.value);
      }
      return { status: U.value, value: j };
    }
  }
}
hz.create = ($, U, v) => {
  return new hz({ valueType: U, keyType: $, typeName: A.ZodMap, ...c(v) });
};
class h4 extends l {
  _parse($) {
    let { status: U, ctx: v } = this._processInputParams($);
    if (v.parsedType !== M.set) return (P(v, { code: V.invalid_type, expected: M.set, received: v.parsedType }), h);
    let X = this._def;
    if (X.minSize !== null) {
      if (v.data.size < X.minSize.value)
        (P(v, {
          code: V.too_small,
          minimum: X.minSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: X.minSize.message,
        }),
          U.dirty());
    }
    if (X.maxSize !== null) {
      if (v.data.size > X.maxSize.value)
        (P(v, {
          code: V.too_big,
          maximum: X.maxSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: X.maxSize.message,
        }),
          U.dirty());
    }
    let z = this._def.valueType;
    function J(Q) {
      let W = new Set();
      for (let w of Q) {
        if (w.status === "aborted") return h;
        if (w.status === "dirty") U.dirty();
        W.add(w.value);
      }
      return { status: U.value, value: W };
    }
    let j = [...v.data.values()].map((Q, W) => z._parse(new Q6(v, Q, v.path, W)));
    if (v.common.async) return Promise.all(j).then((Q) => J(Q));
    else return J(j);
  }
  min($, U) {
    return new h4({ ...this._def, minSize: { value: $, message: Z.toString(U) } });
  }
  max($, U) {
    return new h4({ ...this._def, maxSize: { value: $, message: Z.toString(U) } });
  }
  size($, U) {
    return this.min($, U).max($, U);
  }
  nonempty($) {
    return this.min(1, $);
  }
}
h4.create = ($, U) => {
  return new h4({ valueType: $, minSize: null, maxSize: null, typeName: A.ZodSet, ...c(U) });
};
class p1 extends l {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse($) {
    let { ctx: U } = this._processInputParams($);
    if (U.parsedType !== M.function)
      return (P(U, { code: V.invalid_type, expected: M.function, received: U.parsedType }), h);
    function v(j, Q) {
      return Zz({
        data: j,
        path: U.path,
        errorMaps: [U.common.contextualErrorMap, U.schemaErrorMap, l1(), o6].filter((W) => !!W),
        issueData: { code: V.invalid_arguments, argumentsError: Q },
      });
    }
    function X(j, Q) {
      return Zz({
        data: j,
        path: U.path,
        errorMaps: [U.common.contextualErrorMap, U.schemaErrorMap, l1(), o6].filter((W) => !!W),
        issueData: { code: V.invalid_return_type, returnTypeError: Q },
      });
    }
    let z = { errorMap: U.common.contextualErrorMap },
      J = U.data;
    if (this._def.returns instanceof y4) {
      let j = this;
      return Z$(async function (...Q) {
        let W = new o$([]),
          w = await j._def.args.parseAsync(Q, z).catch((H) => {
            throw (W.addIssue(v(Q, H)), W);
          }),
          N = await Reflect.apply(J, this, w);
        return await j._def.returns._def.type.parseAsync(N, z).catch((H) => {
          throw (W.addIssue(X(N, H)), W);
        });
      });
    } else {
      let j = this;
      return Z$(function (...Q) {
        let W = j._def.args.safeParse(Q, z);
        if (!W.success) throw new o$([v(Q, W.error)]);
        let w = Reflect.apply(J, this, W.data),
          N = j._def.returns.safeParse(w, z);
        if (!N.success) throw new o$([X(w, N.error)]);
        return N.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...$) {
    return new p1({ ...this._def, args: g6.create($).rest(N4.create()) });
  }
  returns($) {
    return new p1({ ...this._def, returns: $ });
  }
  implement($) {
    return this.parse($);
  }
  strictImplement($) {
    return this.parse($);
  }
  static create($, U, v) {
    return new p1({
      args: $ ? $ : g6.create([]).rest(N4.create()),
      returns: U || N4.create(),
      typeName: A.ZodFunction,
      ...c(v),
    });
  }
}
class e1 extends l {
  get schema() {
    return this._def.getter();
  }
  _parse($) {
    let { ctx: U } = this._processInputParams($);
    return this._def.getter()._parse({ data: U.data, path: U.path, parent: U });
  }
}
e1.create = ($, U) => {
  return new e1({ getter: $, typeName: A.ZodLazy, ...c(U) });
};
class $U extends l {
  _parse($) {
    if ($.data !== this._def.value) {
      let U = this._getOrReturnCtx($);
      return (P(U, { received: U.data, code: V.invalid_literal, expected: this._def.value }), h);
    }
    return { status: "valid", value: $.data };
  }
  get value() {
    return this._def.value;
  }
}
$U.create = ($, U) => {
  return new $U({ value: $, typeName: A.ZodLiteral, ...c(U) });
};
function eW($, U) {
  return new q4({ values: $, typeName: A.ZodEnum, ...c(U) });
}
class q4 extends l {
  _parse($) {
    if (typeof $.data !== "string") {
      let U = this._getOrReturnCtx($),
        v = this._def.values;
      return (P(U, { expected: p.joinValues(v), received: U.parsedType, code: V.invalid_type }), h);
    }
    if (!this._cache) this._cache = new Set(this._def.values);
    if (!this._cache.has($.data)) {
      let U = this._getOrReturnCtx($),
        v = this._def.values;
      return (P(U, { received: U.data, code: V.invalid_enum_value, options: v }), h);
    }
    return Z$($.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    let $ = {};
    for (let U of this._def.values) $[U] = U;
    return $;
  }
  get Values() {
    let $ = {};
    for (let U of this._def.values) $[U] = U;
    return $;
  }
  get Enum() {
    let $ = {};
    for (let U of this._def.values) $[U] = U;
    return $;
  }
  extract($, U = this._def) {
    return q4.create($, { ...this._def, ...U });
  }
  exclude($, U = this._def) {
    return q4.create(
      this.options.filter((v) => !$.includes(v)),
      { ...this._def, ...U },
    );
  }
}
q4.create = eW;
class UU extends l {
  _parse($) {
    let U = p.getValidEnumValues(this._def.values),
      v = this._getOrReturnCtx($);
    if (v.parsedType !== M.string && v.parsedType !== M.number) {
      let X = p.objectValues(U);
      return (P(v, { expected: p.joinValues(X), received: v.parsedType, code: V.invalid_type }), h);
    }
    if (!this._cache) this._cache = new Set(p.getValidEnumValues(this._def.values));
    if (!this._cache.has($.data)) {
      let X = p.objectValues(U);
      return (P(v, { received: v.data, code: V.invalid_enum_value, options: X }), h);
    }
    return Z$($.data);
  }
  get enum() {
    return this._def.values;
  }
}
UU.create = ($, U) => {
  return new UU({ values: $, typeName: A.ZodNativeEnum, ...c(U) });
};
class y4 extends l {
  unwrap() {
    return this._def.type;
  }
  _parse($) {
    let { ctx: U } = this._processInputParams($);
    if (U.parsedType !== M.promise && U.common.async === !1)
      return (P(U, { code: V.invalid_type, expected: M.promise, received: U.parsedType }), h);
    let v = U.parsedType === M.promise ? U.data : Promise.resolve(U.data);
    return Z$(
      v.then((X) => {
        return this._def.type.parseAsync(X, { path: U.path, errorMap: U.common.contextualErrorMap });
      }),
    );
  }
}
y4.create = ($, U) => {
  return new y4({ type: $, typeName: A.ZodPromise, ...c(U) });
};
class V6 extends l {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === A.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse($) {
    let { status: U, ctx: v } = this._processInputParams($),
      X = this._def.effect || null,
      z = {
        addIssue: (J) => {
          if ((P(v, J), J.fatal)) U.abort();
          else U.dirty();
        },
        get path() {
          return v.path;
        },
      };
    if (((z.addIssue = z.addIssue.bind(z)), X.type === "preprocess")) {
      let J = X.transform(v.data, z);
      if (v.common.async)
        return Promise.resolve(J).then(async (j) => {
          if (U.value === "aborted") return h;
          let Q = await this._def.schema._parseAsync({ data: j, path: v.path, parent: v });
          if (Q.status === "aborted") return h;
          if (Q.status === "dirty") return C4(Q.value);
          if (U.value === "dirty") return C4(Q.value);
          return Q;
        });
      else {
        if (U.value === "aborted") return h;
        let j = this._def.schema._parseSync({ data: J, path: v.path, parent: v });
        if (j.status === "aborted") return h;
        if (j.status === "dirty") return C4(j.value);
        if (U.value === "dirty") return C4(j.value);
        return j;
      }
    }
    if (X.type === "refinement") {
      let J = (j) => {
        let Q = X.refinement(j, z);
        if (v.common.async) return Promise.resolve(Q);
        if (Q instanceof Promise)
          throw Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return j;
      };
      if (v.common.async === !1) {
        let j = this._def.schema._parseSync({ data: v.data, path: v.path, parent: v });
        if (j.status === "aborted") return h;
        if (j.status === "dirty") U.dirty();
        return (J(j.value), { status: U.value, value: j.value });
      } else
        return this._def.schema._parseAsync({ data: v.data, path: v.path, parent: v }).then((j) => {
          if (j.status === "aborted") return h;
          if (j.status === "dirty") U.dirty();
          return J(j.value).then(() => {
            return { status: U.value, value: j.value };
          });
        });
    }
    if (X.type === "transform")
      if (v.common.async === !1) {
        let J = this._def.schema._parseSync({ data: v.data, path: v.path, parent: v });
        if (!G4(J)) return h;
        let j = X.transform(J.value, z);
        if (j instanceof Promise)
          throw Error(
            "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.",
          );
        return { status: U.value, value: j };
      } else
        return this._def.schema._parseAsync({ data: v.data, path: v.path, parent: v }).then((J) => {
          if (!G4(J)) return h;
          return Promise.resolve(X.transform(J.value, z)).then((j) => ({ status: U.value, value: j }));
        });
    p.assertNever(X);
  }
}
V6.create = ($, U, v) => {
  return new V6({ schema: $, typeName: A.ZodEffects, effect: U, ...c(v) });
};
V6.createWithPreprocess = ($, U, v) => {
  return new V6({ schema: U, effect: { type: "preprocess", transform: $ }, typeName: A.ZodEffects, ...c(v) });
};
class I6 extends l {
  _parse($) {
    if (this._getType($) === M.undefined) return Z$(void 0);
    return this._def.innerType._parse($);
  }
  unwrap() {
    return this._def.innerType;
  }
}
I6.create = ($, U) => {
  return new I6({ innerType: $, typeName: A.ZodOptional, ...c(U) });
};
class t6 extends l {
  _parse($) {
    if (this._getType($) === M.null) return Z$(null);
    return this._def.innerType._parse($);
  }
  unwrap() {
    return this._def.innerType;
  }
}
t6.create = ($, U) => {
  return new t6({ innerType: $, typeName: A.ZodNullable, ...c(U) });
};
class zU extends l {
  _parse($) {
    let { ctx: U } = this._processInputParams($),
      v = U.data;
    if (U.parsedType === M.undefined) v = this._def.defaultValue();
    return this._def.innerType._parse({ data: v, path: U.path, parent: U });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
zU.create = ($, U) => {
  return new zU({
    innerType: $,
    typeName: A.ZodDefault,
    defaultValue: typeof U.default === "function" ? U.default : () => U.default,
    ...c(U),
  });
};
class vU extends l {
  _parse($) {
    let { ctx: U } = this._processInputParams($),
      v = { ...U, common: { ...U.common, issues: [] } },
      X = this._def.innerType._parse({ data: v.data, path: v.path, parent: { ...v } });
    if (d1(X))
      return X.then((z) => {
        return {
          status: "valid",
          value:
            z.status === "valid"
              ? z.value
              : this._def.catchValue({
                  get error() {
                    return new o$(v.common.issues);
                  },
                  input: v.data,
                }),
        };
      });
    else
      return {
        status: "valid",
        value:
          X.status === "valid"
            ? X.value
            : this._def.catchValue({
                get error() {
                  return new o$(v.common.issues);
                },
                input: v.data,
              }),
      };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
vU.create = ($, U) => {
  return new vU({
    innerType: $,
    typeName: A.ZodCatch,
    catchValue: typeof U.catch === "function" ? U.catch : () => U.catch,
    ...c(U),
  });
};
class yz extends l {
  _parse($) {
    if (this._getType($) !== M.nan) {
      let v = this._getOrReturnCtx($);
      return (P(v, { code: V.invalid_type, expected: M.nan, received: v.parsedType }), h);
    }
    return { status: "valid", value: $.data };
  }
}
yz.create = ($) => {
  return new yz({ typeName: A.ZodNaN, ...c($) });
};
var UL = Symbol("zod_brand");
class JQ extends l {
  _parse($) {
    let { ctx: U } = this._processInputParams($),
      v = U.data;
    return this._def.type._parse({ data: v, path: U.path, parent: U });
  }
  unwrap() {
    return this._def.type;
  }
}
class mz extends l {
  _parse($) {
    let { status: U, ctx: v } = this._processInputParams($);
    if (v.common.async)
      return (async () => {
        let z = await this._def.in._parseAsync({ data: v.data, path: v.path, parent: v });
        if (z.status === "aborted") return h;
        if (z.status === "dirty") return (U.dirty(), C4(z.value));
        else return this._def.out._parseAsync({ data: z.value, path: v.path, parent: v });
      })();
    else {
      let X = this._def.in._parseSync({ data: v.data, path: v.path, parent: v });
      if (X.status === "aborted") return h;
      if (X.status === "dirty") return (U.dirty(), { status: "dirty", value: X.value });
      else return this._def.out._parseSync({ data: X.value, path: v.path, parent: v });
    }
  }
  static create($, U) {
    return new mz({ in: $, out: U, typeName: A.ZodPipeline });
  }
}
class XU extends l {
  _parse($) {
    let U = this._def.innerType._parse($),
      v = (X) => {
        if (G4(X)) X.value = Object.freeze(X.value);
        return X;
      };
    return d1(U) ? U.then((X) => v(X)) : v(U);
  }
  unwrap() {
    return this._def.innerType;
  }
}
XU.create = ($, U) => {
  return new XU({ innerType: $, typeName: A.ZodReadonly, ...c(U) });
};
var zL = { object: N$.lazycreate },
  A;
(function ($) {
  (($.ZodString = "ZodString"),
    ($.ZodNumber = "ZodNumber"),
    ($.ZodNaN = "ZodNaN"),
    ($.ZodBigInt = "ZodBigInt"),
    ($.ZodBoolean = "ZodBoolean"),
    ($.ZodDate = "ZodDate"),
    ($.ZodSymbol = "ZodSymbol"),
    ($.ZodUndefined = "ZodUndefined"),
    ($.ZodNull = "ZodNull"),
    ($.ZodAny = "ZodAny"),
    ($.ZodUnknown = "ZodUnknown"),
    ($.ZodNever = "ZodNever"),
    ($.ZodVoid = "ZodVoid"),
    ($.ZodArray = "ZodArray"),
    ($.ZodObject = "ZodObject"),
    ($.ZodUnion = "ZodUnion"),
    ($.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
    ($.ZodIntersection = "ZodIntersection"),
    ($.ZodTuple = "ZodTuple"),
    ($.ZodRecord = "ZodRecord"),
    ($.ZodMap = "ZodMap"),
    ($.ZodSet = "ZodSet"),
    ($.ZodFunction = "ZodFunction"),
    ($.ZodLazy = "ZodLazy"),
    ($.ZodLiteral = "ZodLiteral"),
    ($.ZodEnum = "ZodEnum"),
    ($.ZodEffects = "ZodEffects"),
    ($.ZodNativeEnum = "ZodNativeEnum"),
    ($.ZodOptional = "ZodOptional"),
    ($.ZodNullable = "ZodNullable"),
    ($.ZodDefault = "ZodDefault"),
    ($.ZodCatch = "ZodCatch"),
    ($.ZodPromise = "ZodPromise"),
    ($.ZodBranded = "ZodBranded"),
    ($.ZodPipeline = "ZodPipeline"),
    ($.ZodReadonly = "ZodReadonly"));
})(A || (A = {}));
var vL = C6.create,
  XL = g4.create,
  JL = yz.create,
  jL = f4.create,
  QL = Tz.create,
  YL = r1.create,
  WL = Cz.create,
  wL = o1.create,
  GL = t1.create,
  NL = xz.create,
  qL = N4.create,
  OL = x6.create,
  HL = gz.create,
  BL = L6.create,
  DL = N$.create,
  KL = N$.strictCreate,
  bL = a1.create,
  LL = XQ.create,
  IL = s1.create,
  VL = g6.create,
  AL = fz.create,
  FL = hz.create,
  EL = h4.create,
  _L = p1.create,
  ML = e1.create,
  PL = $U.create,
  SL = q4.create,
  RL = UU.create,
  kL = y4.create,
  ZL = V6.create,
  TL = I6.create,
  CL = t6.create,
  xL = V6.createWithPreprocess,
  gL = mz.create;
function C$(...$) {
  return $.reduce((U, v) => ({ ...U, ...(v != null ? v : {}) }), {});
}
async function vw($, U) {
  if ($ == null) return Promise.resolve();
  let v = U == null ? void 0 : U.abortSignal;
  return new Promise((X, z) => {
    if (v == null ? void 0 : v.aborted) {
      z($w());
      return;
    }
    let J = setTimeout(() => {
        (j(), X());
      }, $),
      j = () => {
        (clearTimeout(J), v == null || v.removeEventListener("abort", Q));
      },
      Q = () => {
        (j(), z($w()));
      };
    v == null || v.addEventListener("abort", Q);
  });
}
function $w() {
  return new DOMException("Delay was aborted", "AbortError");
}
function JU($) {
  return Object.fromEntries([...$.headers]);
}
function cz($ = globalThis) {
  var U, v, X;
  if ($.window) return "runtime/browser";
  if ((U = $.navigator) == null ? void 0 : U.userAgent) return `runtime/${$.navigator.userAgent.toLowerCase()}`;
  if ((X = (v = $.process) == null ? void 0 : v.versions) == null ? void 0 : X.node)
    return `runtime/node.js/${$.process.version.substring(0)}`;
  if ($.EdgeRuntime) return "runtime/vercel-edge";
  return "runtime/unknown";
}
function qO($) {
  return Object.fromEntries(Object.entries($).filter(([U, v]) => v != null));
}
function z6($, ...U) {
  let v = qO($ != null ? $ : {}),
    X = new Headers(v),
    z = X.get("user-agent") || "";
  return (X.set("user-agent", [z, ...U].filter(Boolean).join(" ")), Object.fromEntries(X));
}
var A6 = ({
    prefix: $,
    size: U = 16,
    alphabet: v = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    separator: X = "-",
  } = {}) => {
    let z = () => {
      let J = v.length,
        j = Array(U);
      for (let Q = 0; Q < U; Q++) j[Q] = v[(Math.random() * J) | 0];
      return j.join("");
    };
    if ($ == null) return z;
    if (v.includes(X))
      throw new FU({ argument: "separator", message: `The separator "${X}" must not be part of the alphabet "${v}".` });
    return () => `${$}${X}${z()}`;
  },
  a6 = A6();
function m4($) {
  if ($ == null) return "unknown error";
  if (typeof $ === "string") return $;
  if ($ instanceof Error) return $.message;
  return JSON.stringify($);
}
function f6($) {
  return (
    ($ instanceof Error || $ instanceof DOMException) &&
    ($.name === "AbortError" || $.name === "ResponseAborted" || $.name === "TimeoutError")
  );
}
var OO = ["fetch failed", "failed to fetch"];
function Xw({ error: $, url: U, requestBodyValues: v }) {
  if (f6($)) return $;
  if ($ instanceof TypeError && OO.includes($.message.toLowerCase())) {
    let X = $.cause;
    if (X != null)
      return new O$({
        message: `Cannot connect to API: ${X.message}`,
        cause: X,
        url: U,
        requestBodyValues: v,
        isRetryable: !0,
      });
  }
  return $;
}
var Jw = "3.0.10",
  HO = () => globalThis.fetch,
  wQ = async ({
    url: $,
    headers: U = {},
    successfulResponseHandler: v,
    failedResponseHandler: X,
    abortSignal: z,
    fetch: J = HO(),
  }) => {
    try {
      let j = await J($, { method: "GET", headers: z6(U, `ai-sdk/provider-utils/${Jw}`, cz()), signal: z }),
        Q = JU(j);
      if (!j.ok) {
        let W;
        try {
          W = await X({ response: j, url: $, requestBodyValues: {} });
        } catch (w) {
          if (f6(w) || O$.isInstance(w)) throw w;
          throw new O$({
            message: "Failed to process error response",
            cause: w,
            statusCode: j.status,
            url: $,
            responseHeaders: Q,
            requestBodyValues: {},
          });
        }
        throw W.value;
      }
      try {
        return await v({ response: j, url: $, requestBodyValues: {} });
      } catch (W) {
        if (W instanceof Error) {
          if (f6(W) || O$.isInstance(W)) throw W;
        }
        throw new O$({
          message: "Failed to process successful response",
          cause: W,
          statusCode: j.status,
          url: $,
          responseHeaders: Q,
          requestBodyValues: {},
        });
      }
    } catch (j) {
      throw Xw({ error: j, url: $, requestBodyValues: {} });
    }
  };
function jw({ mediaType: $, url: U, supportedUrls: v }) {
  return (
    (U = U.toLowerCase()),
    ($ = $.toLowerCase()),
    Object.entries(v)
      .map(([X, z]) => {
        let J = X.toLowerCase();
        return J === "*" || J === "*/*"
          ? { mediaTypePrefix: "", regexes: z }
          : { mediaTypePrefix: J.replace(/\*/, ""), regexes: z };
      })
      .filter(({ mediaTypePrefix: X }) => $.startsWith(X))
      .flatMap(({ regexes: X }) => X)
      .some((X) => X.test(U))
  );
}
function jU({ settingValue: $, environmentVariableName: U }) {
  if (typeof $ === "string") return $;
  if ($ != null || typeof process > "u") return;
  if ((($ = process.env[U]), $ == null || typeof $ !== "string")) return;
  return $;
}
var BO = /"__proto__"\s*:/,
  DO = /"constructor"\s*:/;
function KO($) {
  let U = JSON.parse($);
  if (U === null || typeof U !== "object") return U;
  if (BO.test($) === !1 && DO.test($) === !1) return U;
  return bO(U);
}
function bO($) {
  let U = [$];
  while (U.length) {
    let v = U;
    U = [];
    for (let X of v) {
      if (Object.prototype.hasOwnProperty.call(X, "__proto__"))
        throw SyntaxError("Object contains forbidden prototype property");
      if (
        Object.prototype.hasOwnProperty.call(X, "constructor") &&
        Object.prototype.hasOwnProperty.call(X.constructor, "prototype")
      )
        throw SyntaxError("Object contains forbidden prototype property");
      for (let z in X) {
        let J = X[z];
        if (J && typeof J === "object") U.push(J);
      }
    }
  }
  return $;
}
function GQ($) {
  let { stackTraceLimit: U } = Error;
  Error.stackTraceLimit = 0;
  try {
    return KO($);
  } finally {
    Error.stackTraceLimit = U;
  }
}
var uz = Symbol.for("vercel.ai.validator");
function LO($) {
  return { [uz]: !0, validate: $ };
}
function IO($) {
  return typeof $ === "object" && $ !== null && uz in $ && $[uz] === !0 && "validate" in $;
}
function VO($) {
  return IO($) ? $ : AO($);
}
function AO($) {
  return LO(async (U) => {
    let v = await $["~standard"].validate(U);
    return v.issues == null
      ? { success: !0, value: v.value }
      : { success: !1, error: new _$({ value: U, cause: v.issues }) };
  });
}
async function iz({ value: $, schema: U }) {
  let v = await a$({ value: $, schema: U });
  if (!v.success) throw _$.wrap({ value: $, cause: v.error });
  return v.value;
}
async function a$({ value: $, schema: U }) {
  let v = VO(U);
  try {
    if (v.validate == null) return { success: !0, value: $, rawValue: $ };
    let X = await v.validate($);
    if (X.success) return { success: !0, value: X.value, rawValue: $ };
    return { success: !1, error: _$.wrap({ value: $, cause: X.error }), rawValue: $ };
  } catch (X) {
    return { success: !1, error: _$.wrap({ value: $, cause: X }), rawValue: $ };
  }
}
async function FO({ text: $, schema: U }) {
  try {
    let v = GQ($);
    if (U == null) return v;
    return iz({ value: v, schema: U });
  } catch (v) {
    if (X4.isInstance(v) || _$.isInstance(v)) throw v;
    throw new X4({ text: $, cause: v });
  }
}
async function v6({ text: $, schema: U }) {
  try {
    let v = GQ($);
    if (U == null) return { success: !0, value: v, rawValue: v };
    return await a$({ value: v, schema: U });
  } catch (v) {
    return { success: !1, error: X4.isInstance(v) ? v : new X4({ text: $, cause: v }), rawValue: void 0 };
  }
}
function NQ($) {
  try {
    return (GQ($), !0);
  } catch (U) {
    return !1;
  }
}
function Qw({ stream: $, schema: U }) {
  return $.pipeThrough(new TextDecoderStream())
    .pipeThrough(new Nv())
    .pipeThrough(
      new TransformStream({
        async transform({ data: v }, X) {
          if (v === "[DONE]") return;
          X.enqueue(await v6({ text: v, schema: U }));
        },
      }),
    );
}
async function s6({ provider: $, providerOptions: U, schema: v }) {
  if ((U == null ? void 0 : U[$]) == null) return;
  let X = await a$({ value: U[$], schema: v });
  if (!X.success)
    throw new FU({ argument: "providerOptions", message: `invalid ${$} provider options`, cause: X.error });
  return X.value;
}
var EO = () => globalThis.fetch,
  x$ = async ({
    url: $,
    headers: U,
    body: v,
    failedResponseHandler: X,
    successfulResponseHandler: z,
    abortSignal: J,
    fetch: j,
  }) =>
    _O({
      url: $,
      headers: { "Content-Type": "application/json", ...U },
      body: { content: JSON.stringify(v), values: v },
      failedResponseHandler: X,
      successfulResponseHandler: z,
      abortSignal: J,
      fetch: j,
    });
var _O = async ({
  url: $,
  headers: U = {},
  body: v,
  successfulResponseHandler: X,
  failedResponseHandler: z,
  abortSignal: J,
  fetch: j = EO(),
}) => {
  try {
    let Q = await j($, {
        method: "POST",
        headers: z6(U, `ai-sdk/provider-utils/${Jw}`, cz()),
        body: v.content,
        signal: J,
      }),
      W = JU(Q);
    if (!Q.ok) {
      let w;
      try {
        w = await z({ response: Q, url: $, requestBodyValues: v.values });
      } catch (N) {
        if (f6(N) || O$.isInstance(N)) throw N;
        throw new O$({
          message: "Failed to process error response",
          cause: N,
          statusCode: Q.status,
          url: $,
          responseHeaders: W,
          requestBodyValues: v.values,
        });
      }
      throw w.value;
    }
    try {
      return await X({ response: Q, url: $, requestBodyValues: v.values });
    } catch (w) {
      if (w instanceof Error) {
        if (f6(w) || O$.isInstance(w)) throw w;
      }
      throw new O$({
        message: "Failed to process successful response",
        cause: w,
        statusCode: Q.status,
        url: $,
        responseHeaders: W,
        requestBodyValues: v.values,
      });
    }
  } catch (Q) {
    throw Xw({ error: Q, url: $, requestBodyValues: v.values });
  }
};
async function w6($) {
  if (typeof $ === "function") $ = $();
  return Promise.resolve($);
}
var S$ =
    ({ errorSchema: $, errorToMessage: U, isRetryable: v }) =>
    async ({ response: X, url: z, requestBodyValues: J }) => {
      let j = await X.text(),
        Q = JU(X);
      if (j.trim() === "")
        return {
          responseHeaders: Q,
          value: new O$({
            message: X.statusText,
            url: z,
            requestBodyValues: J,
            statusCode: X.status,
            responseHeaders: Q,
            responseBody: j,
            isRetryable: v == null ? void 0 : v(X),
          }),
        };
      try {
        let W = await FO({ text: j, schema: $ });
        return {
          responseHeaders: Q,
          value: new O$({
            message: U(W),
            url: z,
            requestBodyValues: J,
            statusCode: X.status,
            responseHeaders: Q,
            responseBody: j,
            data: W,
            isRetryable: v == null ? void 0 : v(X, W),
          }),
        };
      } catch (W) {
        return {
          responseHeaders: Q,
          value: new O$({
            message: X.statusText,
            url: z,
            requestBodyValues: J,
            statusCode: X.status,
            responseHeaders: Q,
            responseBody: j,
            isRetryable: v == null ? void 0 : v(X),
          }),
        };
      }
    },
  u4 =
    ($) =>
    async ({ response: U }) => {
      let v = JU(U);
      if (U.body == null) throw new $Y({});
      return { responseHeaders: v, value: Qw({ stream: U.body, schema: $ }) };
    };
var g$ =
  ($) =>
  async ({ response: U, url: v, requestBodyValues: X }) => {
    let z = await U.text(),
      J = await v6({ text: z, schema: $ }),
      j = JU(U);
    if (!J.success)
      throw new O$({
        message: "Invalid JSON response",
        cause: J.error,
        statusCode: U.status,
        responseHeaders: j,
        responseBody: z,
        url: v,
        requestBodyValues: X,
      });
    return { responseHeaders: j, value: J.value, rawValue: J.rawValue };
  };
var MO = ($, U) => {
    let v = 0;
    for (; v < $.length && v < U.length; v++) if ($[v] !== U[v]) break;
    return [($.length - v).toString(), ...U.slice(v)].join("/");
  },
  PO = Symbol("Let zodToJsonSchema decide on which parser to use"),
  Uw = {
    name: void 0,
    $refStrategy: "root",
    basePath: ["#"],
    effectStrategy: "input",
    pipeStrategy: "all",
    dateStrategy: "format:date-time",
    mapStrategy: "entries",
    removeAdditionalStrategy: "passthrough",
    allowedAdditionalProperties: !0,
    rejectedAdditionalProperties: !1,
    definitionPath: "definitions",
    strictUnions: !1,
    definitions: {},
    errorMessages: !1,
    patternStrategy: "escape",
    applyRegexFlags: !1,
    emailStrategy: "format:email",
    base64Strategy: "contentEncoding:base64",
    nameStrategy: "ref",
  },
  SO = ($) => (typeof $ === "string" ? { ...Uw, name: $ } : { ...Uw, ...$ });
function t$() {
  return {};
}
function RO($, U) {
  var v, X, z;
  let J = { type: "array" };
  if (
    ((v = $.type) == null ? void 0 : v._def) &&
    ((z = (X = $.type) == null ? void 0 : X._def) == null ? void 0 : z.typeName) !== A.ZodAny
  )
    J.items = $$($.type._def, { ...U, currentPath: [...U.currentPath, "items"] });
  if ($.minLength) J.minItems = $.minLength.value;
  if ($.maxLength) J.maxItems = $.maxLength.value;
  if ($.exactLength) ((J.minItems = $.exactLength.value), (J.maxItems = $.exactLength.value));
  return J;
}
function kO($) {
  let U = { type: "integer", format: "int64" };
  if (!$.checks) return U;
  for (let v of $.checks)
    switch (v.kind) {
      case "min":
        if (v.inclusive) U.minimum = v.value;
        else U.exclusiveMinimum = v.value;
        break;
      case "max":
        if (v.inclusive) U.maximum = v.value;
        else U.exclusiveMaximum = v.value;
        break;
      case "multipleOf":
        U.multipleOf = v.value;
        break;
    }
  return U;
}
function ZO() {
  return { type: "boolean" };
}
function Yw($, U) {
  return $$($.type._def, U);
}
var TO = ($, U) => {
  return $$($.innerType._def, U);
};
function Ww($, U, v) {
  let X = v != null ? v : U.dateStrategy;
  if (Array.isArray(X)) return { anyOf: X.map((z, J) => Ww($, U, z)) };
  switch (X) {
    case "string":
    case "format:date-time":
      return { type: "string", format: "date-time" };
    case "format:date":
      return { type: "string", format: "date" };
    case "integer":
      return CO($);
  }
}
var CO = ($) => {
  let U = { type: "integer", format: "unix-time" };
  for (let v of $.checks)
    switch (v.kind) {
      case "min":
        U.minimum = v.value;
        break;
      case "max":
        U.maximum = v.value;
        break;
    }
  return U;
};
function xO($, U) {
  return { ...$$($.innerType._def, U), default: $.defaultValue() };
}
function gO($, U) {
  return U.effectStrategy === "input" ? $$($.schema._def, U) : t$();
}
function fO($) {
  return { type: "string", enum: Array.from($.values) };
}
var hO = ($) => {
  if ("type" in $ && $.type === "string") return !1;
  return "allOf" in $;
};
function yO($, U) {
  let v = [
      $$($.left._def, { ...U, currentPath: [...U.currentPath, "allOf", "0"] }),
      $$($.right._def, { ...U, currentPath: [...U.currentPath, "allOf", "1"] }),
    ].filter((z) => !!z),
    X = [];
  return (
    v.forEach((z) => {
      if (hO(z)) X.push(...z.allOf);
      else {
        let J = z;
        if ("additionalProperties" in z && z.additionalProperties === !1) {
          let { additionalProperties: j, ...Q } = z;
          J = Q;
        }
        X.push(J);
      }
    }),
    X.length ? { allOf: X } : void 0
  );
}
function mO($) {
  let U = typeof $.value;
  if (U !== "bigint" && U !== "number" && U !== "boolean" && U !== "string")
    return { type: Array.isArray($.value) ? "array" : "object" };
  return { type: U === "bigint" ? "integer" : U, const: $.value };
}
var jQ = void 0,
  Y6 = {
    cuid: /^[cC][^\s-]{8,}$/,
    cuid2: /^[0-9a-z]+$/,
    ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
    email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
    emoji: () => {
      if (jQ === void 0) jQ = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
      return jQ;
    },
    uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
    ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
    ipv4Cidr:
      /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
    ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
    ipv6Cidr:
      /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
    base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
    base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
    nanoid: /^[a-zA-Z0-9_-]{21}$/,
    jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
  };
function ww($, U) {
  let v = { type: "string" };
  if ($.checks)
    for (let X of $.checks)
      switch (X.kind) {
        case "min":
          v.minLength = typeof v.minLength === "number" ? Math.max(v.minLength, X.value) : X.value;
          break;
        case "max":
          v.maxLength = typeof v.maxLength === "number" ? Math.min(v.maxLength, X.value) : X.value;
          break;
        case "email":
          switch (U.emailStrategy) {
            case "format:email":
              W6(v, "email", X.message, U);
              break;
            case "format:idn-email":
              W6(v, "idn-email", X.message, U);
              break;
            case "pattern:zod":
              T$(v, Y6.email, X.message, U);
              break;
          }
          break;
        case "url":
          W6(v, "uri", X.message, U);
          break;
        case "uuid":
          W6(v, "uuid", X.message, U);
          break;
        case "regex":
          T$(v, X.regex, X.message, U);
          break;
        case "cuid":
          T$(v, Y6.cuid, X.message, U);
          break;
        case "cuid2":
          T$(v, Y6.cuid2, X.message, U);
          break;
        case "startsWith":
          T$(v, RegExp(`^${QQ(X.value, U)}`), X.message, U);
          break;
        case "endsWith":
          T$(v, RegExp(`${QQ(X.value, U)}$`), X.message, U);
          break;
        case "datetime":
          W6(v, "date-time", X.message, U);
          break;
        case "date":
          W6(v, "date", X.message, U);
          break;
        case "time":
          W6(v, "time", X.message, U);
          break;
        case "duration":
          W6(v, "duration", X.message, U);
          break;
        case "length":
          ((v.minLength = typeof v.minLength === "number" ? Math.max(v.minLength, X.value) : X.value),
            (v.maxLength = typeof v.maxLength === "number" ? Math.min(v.maxLength, X.value) : X.value));
          break;
        case "includes": {
          T$(v, RegExp(QQ(X.value, U)), X.message, U);
          break;
        }
        case "ip": {
          if (X.version !== "v6") W6(v, "ipv4", X.message, U);
          if (X.version !== "v4") W6(v, "ipv6", X.message, U);
          break;
        }
        case "base64url":
          T$(v, Y6.base64url, X.message, U);
          break;
        case "jwt":
          T$(v, Y6.jwt, X.message, U);
          break;
        case "cidr": {
          if (X.version !== "v6") T$(v, Y6.ipv4Cidr, X.message, U);
          if (X.version !== "v4") T$(v, Y6.ipv6Cidr, X.message, U);
          break;
        }
        case "emoji":
          T$(v, Y6.emoji(), X.message, U);
          break;
        case "ulid": {
          T$(v, Y6.ulid, X.message, U);
          break;
        }
        case "base64": {
          switch (U.base64Strategy) {
            case "format:binary": {
              W6(v, "binary", X.message, U);
              break;
            }
            case "contentEncoding:base64": {
              v.contentEncoding = "base64";
              break;
            }
            case "pattern:zod": {
              T$(v, Y6.base64, X.message, U);
              break;
            }
          }
          break;
        }
        case "nanoid":
          T$(v, Y6.nanoid, X.message, U);
        case "toLowerCase":
        case "toUpperCase":
        case "trim":
          break;
        default:
      }
  return v;
}
function QQ($, U) {
  return U.patternStrategy === "escape" ? cO($) : $;
}
var uO = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function cO($) {
  let U = "";
  for (let v = 0; v < $.length; v++) {
    if (!uO.has($[v])) U += "\\";
    U += $[v];
  }
  return U;
}
function W6($, U, v, X) {
  var z;
  if ($.format || ((z = $.anyOf) == null ? void 0 : z.some((J) => J.format))) {
    if (!$.anyOf) $.anyOf = [];
    if ($.format) ($.anyOf.push({ format: $.format }), delete $.format);
    $.anyOf.push({ format: U, ...(v && X.errorMessages && { errorMessage: { format: v } }) });
  } else $.format = U;
}
function T$($, U, v, X) {
  var z;
  if ($.pattern || ((z = $.allOf) == null ? void 0 : z.some((J) => J.pattern))) {
    if (!$.allOf) $.allOf = [];
    if ($.pattern) ($.allOf.push({ pattern: $.pattern }), delete $.pattern);
    $.allOf.push({ pattern: zw(U, X), ...(v && X.errorMessages && { errorMessage: { pattern: v } }) });
  } else $.pattern = zw(U, X);
}
function zw($, U) {
  var v;
  if (!U.applyRegexFlags || !$.flags) return $.source;
  let X = { i: $.flags.includes("i"), m: $.flags.includes("m"), s: $.flags.includes("s") },
    z = X.i ? $.source.toLowerCase() : $.source,
    J = "",
    j = !1,
    Q = !1,
    W = !1;
  for (let w = 0; w < z.length; w++) {
    if (j) {
      ((J += z[w]), (j = !1));
      continue;
    }
    if (X.i) {
      if (Q) {
        if (z[w].match(/[a-z]/)) {
          if (W) ((J += z[w]), (J += `${z[w - 2]}-${z[w]}`.toUpperCase()), (W = !1));
          else if (z[w + 1] === "-" && ((v = z[w + 2]) == null ? void 0 : v.match(/[a-z]/))) ((J += z[w]), (W = !0));
          else J += `${z[w]}${z[w].toUpperCase()}`;
          continue;
        }
      } else if (z[w].match(/[a-z]/)) {
        J += `[${z[w]}${z[w].toUpperCase()}]`;
        continue;
      }
    }
    if (X.m) {
      if (z[w] === "^") {
        J += `(^|(?<=[\r
]))`;
        continue;
      } else if (z[w] === "$") {
        J += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (X.s && z[w] === ".") {
      J += Q
        ? `${z[w]}\r
`
        : `[${z[w]}\r
]`;
      continue;
    }
    if (((J += z[w]), z[w] === "\\")) j = !0;
    else if (Q && z[w] === "]") Q = !1;
    else if (!Q && z[w] === "[") Q = !0;
  }
  try {
    new RegExp(J);
  } catch (w) {
    return (
      console.warn(
        `Could not convert regex pattern at ${U.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`,
      ),
      $.source
    );
  }
  return J;
}
function Gw($, U) {
  var v, X, z, J, j, Q;
  let W = {
    type: "object",
    additionalProperties:
      (v = $$($.valueType._def, { ...U, currentPath: [...U.currentPath, "additionalProperties"] })) != null
        ? v
        : U.allowedAdditionalProperties,
  };
  if (
    ((X = $.keyType) == null ? void 0 : X._def.typeName) === A.ZodString &&
    ((z = $.keyType._def.checks) == null ? void 0 : z.length)
  ) {
    let { type: w, ...N } = ww($.keyType._def, U);
    return { ...W, propertyNames: N };
  } else if (((J = $.keyType) == null ? void 0 : J._def.typeName) === A.ZodEnum)
    return { ...W, propertyNames: { enum: $.keyType._def.values } };
  else if (
    ((j = $.keyType) == null ? void 0 : j._def.typeName) === A.ZodBranded &&
    $.keyType._def.type._def.typeName === A.ZodString &&
    ((Q = $.keyType._def.type._def.checks) == null ? void 0 : Q.length)
  ) {
    let { type: w, ...N } = Yw($.keyType._def, U);
    return { ...W, propertyNames: N };
  }
  return W;
}
function iO($, U) {
  if (U.mapStrategy === "record") return Gw($, U);
  let v = $$($.keyType._def, { ...U, currentPath: [...U.currentPath, "items", "items", "0"] }) || t$(),
    X = $$($.valueType._def, { ...U, currentPath: [...U.currentPath, "items", "items", "1"] }) || t$();
  return { type: "array", maxItems: 125, items: { type: "array", items: [v, X], minItems: 2, maxItems: 2 } };
}
function nO($) {
  let U = $.values,
    X = Object.keys($.values)
      .filter((J) => {
        return typeof U[U[J]] !== "number";
      })
      .map((J) => U[J]),
    z = Array.from(new Set(X.map((J) => typeof J)));
  return { type: z.length === 1 ? (z[0] === "string" ? "string" : "number") : ["string", "number"], enum: X };
}
function lO() {
  return { not: t$() };
}
function dO() {
  return { type: "null" };
}
var YQ = { ZodString: "string", ZodNumber: "number", ZodBigInt: "integer", ZodBoolean: "boolean", ZodNull: "null" };
function pO($, U) {
  let v = $.options instanceof Map ? Array.from($.options.values()) : $.options;
  if (v.every((X) => X._def.typeName in YQ && (!X._def.checks || !X._def.checks.length))) {
    let X = v.reduce((z, J) => {
      let j = YQ[J._def.typeName];
      return j && !z.includes(j) ? [...z, j] : z;
    }, []);
    return { type: X.length > 1 ? X : X[0] };
  } else if (v.every((X) => X._def.typeName === "ZodLiteral" && !X.description)) {
    let X = v.reduce((z, J) => {
      let j = typeof J._def.value;
      switch (j) {
        case "string":
        case "number":
        case "boolean":
          return [...z, j];
        case "bigint":
          return [...z, "integer"];
        case "object":
          if (J._def.value === null) return [...z, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return z;
      }
    }, []);
    if (X.length === v.length) {
      let z = X.filter((J, j, Q) => Q.indexOf(J) === j);
      return {
        type: z.length > 1 ? z : z[0],
        enum: v.reduce((J, j) => {
          return J.includes(j._def.value) ? J : [...J, j._def.value];
        }, []),
      };
    }
  } else if (v.every((X) => X._def.typeName === "ZodEnum"))
    return { type: "string", enum: v.reduce((X, z) => [...X, ...z._def.values.filter((J) => !X.includes(J))], []) };
  return rO($, U);
}
var rO = ($, U) => {
  let v = ($.options instanceof Map ? Array.from($.options.values()) : $.options)
    .map((X, z) => $$(X._def, { ...U, currentPath: [...U.currentPath, "anyOf", `${z}`] }))
    .filter((X) => !!X && (!U.strictUnions || (typeof X === "object" && Object.keys(X).length > 0)));
  return v.length ? { anyOf: v } : void 0;
};
function oO($, U) {
  if (
    ["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes($.innerType._def.typeName) &&
    (!$.innerType._def.checks || !$.innerType._def.checks.length)
  )
    return { type: [YQ[$.innerType._def.typeName], "null"] };
  let v = $$($.innerType._def, { ...U, currentPath: [...U.currentPath, "anyOf", "0"] });
  return v && { anyOf: [v, { type: "null" }] };
}
function tO($) {
  let U = { type: "number" };
  if (!$.checks) return U;
  for (let v of $.checks)
    switch (v.kind) {
      case "int":
        U.type = "integer";
        break;
      case "min":
        if (v.inclusive) U.minimum = v.value;
        else U.exclusiveMinimum = v.value;
        break;
      case "max":
        if (v.inclusive) U.maximum = v.value;
        else U.exclusiveMaximum = v.value;
        break;
      case "multipleOf":
        U.multipleOf = v.value;
        break;
    }
  return U;
}
function aO($, U) {
  let v = { type: "object", properties: {} },
    X = [],
    z = $.shape();
  for (let j in z) {
    let Q = z[j];
    if (Q === void 0 || Q._def === void 0) continue;
    let W = eO(Q),
      w = $$(Q._def, {
        ...U,
        currentPath: [...U.currentPath, "properties", j],
        propertyPath: [...U.currentPath, "properties", j],
      });
    if (w === void 0) continue;
    if (((v.properties[j] = w), !W)) X.push(j);
  }
  if (X.length) v.required = X;
  let J = sO($, U);
  if (J !== void 0) v.additionalProperties = J;
  return v;
}
function sO($, U) {
  if ($.catchall._def.typeName !== "ZodNever")
    return $$($.catchall._def, { ...U, currentPath: [...U.currentPath, "additionalProperties"] });
  switch ($.unknownKeys) {
    case "passthrough":
      return U.allowedAdditionalProperties;
    case "strict":
      return U.rejectedAdditionalProperties;
    case "strip":
      return U.removeAdditionalStrategy === "strict" ? U.allowedAdditionalProperties : U.rejectedAdditionalProperties;
  }
}
function eO($) {
  try {
    return $.isOptional();
  } catch (U) {
    return !0;
  }
}
var $H = ($, U) => {
    var v;
    if (U.currentPath.toString() === ((v = U.propertyPath) == null ? void 0 : v.toString()))
      return $$($.innerType._def, U);
    let X = $$($.innerType._def, { ...U, currentPath: [...U.currentPath, "anyOf", "1"] });
    return X ? { anyOf: [{ not: t$() }, X] } : t$();
  },
  UH = ($, U) => {
    if (U.pipeStrategy === "input") return $$($.in._def, U);
    else if (U.pipeStrategy === "output") return $$($.out._def, U);
    let v = $$($.in._def, { ...U, currentPath: [...U.currentPath, "allOf", "0"] }),
      X = $$($.out._def, { ...U, currentPath: [...U.currentPath, "allOf", v ? "1" : "0"] });
    return { allOf: [v, X].filter((z) => z !== void 0) };
  };
function zH($, U) {
  return $$($.type._def, U);
}
function vH($, U) {
  let X = {
    type: "array",
    uniqueItems: !0,
    items: $$($.valueType._def, { ...U, currentPath: [...U.currentPath, "items"] }),
  };
  if ($.minSize) X.minItems = $.minSize.value;
  if ($.maxSize) X.maxItems = $.maxSize.value;
  return X;
}
function XH($, U) {
  if ($.rest)
    return {
      type: "array",
      minItems: $.items.length,
      items: $.items
        .map((v, X) => $$(v._def, { ...U, currentPath: [...U.currentPath, "items", `${X}`] }))
        .reduce((v, X) => (X === void 0 ? v : [...v, X]), []),
      additionalItems: $$($.rest._def, { ...U, currentPath: [...U.currentPath, "additionalItems"] }),
    };
  else
    return {
      type: "array",
      minItems: $.items.length,
      maxItems: $.items.length,
      items: $.items
        .map((v, X) => $$(v._def, { ...U, currentPath: [...U.currentPath, "items", `${X}`] }))
        .reduce((v, X) => (X === void 0 ? v : [...v, X]), []),
    };
}
function JH() {
  return { not: t$() };
}
function jH() {
  return t$();
}
var QH = ($, U) => {
    return $$($.innerType._def, U);
  },
  YH = ($, U, v) => {
    switch (U) {
      case A.ZodString:
        return ww($, v);
      case A.ZodNumber:
        return tO($);
      case A.ZodObject:
        return aO($, v);
      case A.ZodBigInt:
        return kO($);
      case A.ZodBoolean:
        return ZO();
      case A.ZodDate:
        return Ww($, v);
      case A.ZodUndefined:
        return JH();
      case A.ZodNull:
        return dO();
      case A.ZodArray:
        return RO($, v);
      case A.ZodUnion:
      case A.ZodDiscriminatedUnion:
        return pO($, v);
      case A.ZodIntersection:
        return yO($, v);
      case A.ZodTuple:
        return XH($, v);
      case A.ZodRecord:
        return Gw($, v);
      case A.ZodLiteral:
        return mO($);
      case A.ZodEnum:
        return fO($);
      case A.ZodNativeEnum:
        return nO($);
      case A.ZodNullable:
        return oO($, v);
      case A.ZodOptional:
        return $H($, v);
      case A.ZodMap:
        return iO($, v);
      case A.ZodSet:
        return vH($, v);
      case A.ZodLazy:
        return () => $.getter()._def;
      case A.ZodPromise:
        return zH($, v);
      case A.ZodNaN:
      case A.ZodNever:
        return lO();
      case A.ZodEffects:
        return gO($, v);
      case A.ZodAny:
        return t$();
      case A.ZodUnknown:
        return jH();
      case A.ZodDefault:
        return xO($, v);
      case A.ZodBranded:
        return Yw($, v);
      case A.ZodReadonly:
        return QH($, v);
      case A.ZodCatch:
        return TO($, v);
      case A.ZodPipeline:
        return UH($, v);
      case A.ZodFunction:
      case A.ZodVoid:
      case A.ZodSymbol:
        return;
      default:
        return ((X) => {
          return;
        })(U);
    }
  };
function $$($, U, v = !1) {
  var X;
  let z = U.seen.get($);
  if (U.override) {
    let W = (X = U.override) == null ? void 0 : X.call(U, $, U, z, v);
    if (W !== PO) return W;
  }
  if (z && !v) {
    let W = WH(z, U);
    if (W !== void 0) return W;
  }
  let J = { def: $, path: U.currentPath, jsonSchema: void 0 };
  U.seen.set($, J);
  let j = YH($, $.typeName, U),
    Q = typeof j === "function" ? $$(j(), U) : j;
  if (Q) wH($, U, Q);
  if (U.postProcess) {
    let W = U.postProcess(Q, $, U);
    return ((J.jsonSchema = Q), W);
  }
  return ((J.jsonSchema = Q), Q);
}
var WH = ($, U) => {
    switch (U.$refStrategy) {
      case "root":
        return { $ref: $.path.join("/") };
      case "relative":
        return { $ref: MO(U.currentPath, $.path) };
      case "none":
      case "seen": {
        if ($.path.length < U.currentPath.length && $.path.every((v, X) => U.currentPath[X] === v))
          return (console.warn(`Recursive reference detected at ${U.currentPath.join("/")}! Defaulting to any`), t$());
        return U.$refStrategy === "seen" ? t$() : void 0;
      }
    }
  },
  wH = ($, U, v) => {
    if ($.description) v.description = $.description;
    return v;
  },
  GH = ($) => {
    let U = SO($),
      v = U.name !== void 0 ? [...U.basePath, U.definitionPath, U.name] : U.basePath;
    return {
      ...U,
      currentPath: v,
      propertyPath: void 0,
      seen: new Map(
        Object.entries(U.definitions).map(([X, z]) => [
          z._def,
          { def: z._def, path: [...U.basePath, U.definitionPath, X], jsonSchema: void 0 },
        ]),
      ),
    };
  },
  NH = ($, U) => {
    var v;
    let X = GH(U),
      z =
        typeof U === "object" && U.definitions
          ? Object.entries(U.definitions).reduce((w, [N, D]) => {
              var H;
              return {
                ...w,
                [N]:
                  (H = $$(D._def, { ...X, currentPath: [...X.basePath, X.definitionPath, N] }, !0)) != null ? H : t$(),
              };
            }, {})
          : void 0,
      J =
        typeof U === "string"
          ? U
          : (U == null ? void 0 : U.nameStrategy) === "title"
            ? void 0
            : U == null
              ? void 0
              : U.name,
      j =
        (v = $$($._def, J === void 0 ? X : { ...X, currentPath: [...X.basePath, X.definitionPath, J] }, !1)) != null
          ? v
          : t$(),
      Q = typeof U === "object" && U.name !== void 0 && U.nameStrategy === "title" ? U.name : void 0;
    if (Q !== void 0) j.title = Q;
    let W =
      J === void 0
        ? z
          ? { ...j, [X.definitionPath]: z }
          : j
        : {
            $ref: [...(X.$refStrategy === "relative" ? [] : X.basePath), X.definitionPath, J].join("/"),
            [X.definitionPath]: { ...z, [J]: j },
          };
    return ((W.$schema = "http://json-schema.org/draft-07/schema#"), W);
  },
  qH = NH;
function OH($, U) {
  var v;
  let X = (v = U == null ? void 0 : U.useReferences) != null ? v : !1;
  return c4(qH($, { $refStrategy: X ? "root" : "none" }), {
    validate: async (z) => {
      let J = await $.safeParseAsync(z);
      return J.success ? { success: !0, value: J.data } : { success: !1, error: J.error };
    },
  });
}
function HH($, U) {
  var v;
  let X = (v = U == null ? void 0 : U.useReferences) != null ? v : !1,
    z = f1($, { target: "draft-7", io: "output", reused: X ? "ref" : "inline" });
  return c4(z, {
    validate: async (J) => {
      let j = await h1($, J);
      return j.success ? { success: !0, value: j.data } : { success: !1, error: j.error };
    },
  });
}
function BH($) {
  return "_zod" in $;
}
function Nw($, U) {
  if (BH($)) return HH($, U);
  else return OH($, U);
}
var WQ = Symbol.for("vercel.ai.schema");
function c4($, { validate: U } = {}) {
  return { [WQ]: !0, _type: void 0, [uz]: !0, jsonSchema: $, validate: U };
}
function DH($) {
  return typeof $ === "object" && $ !== null && WQ in $ && $[WQ] === !0 && "jsonSchema" in $ && "validate" in $;
}
function G6($) {
  return $ == null ? c4({ properties: {}, additionalProperties: !1 }) : DH($) ? $ : Nw($);
}
var { btoa: KH, atob: bH } = globalThis;
function i4($) {
  let U = $.replace(/-/g, "+").replace(/_/g, "/"),
    v = bH(U);
  return Uint8Array.from(v, (X) => X.codePointAt(0));
}
function n4($) {
  let U = "";
  for (let v = 0; v < $.length; v++) U += String.fromCodePoint($[v]);
  return KH(U);
}
function qw($) {
  return $ instanceof Uint8Array ? n4($) : $;
}
function nz($) {
  return $ == null ? void 0 : $.replace(/\/$/, "");
}
function LH($) {
  return $ != null && typeof $[Symbol.asyncIterator] === "function";
}
async function* lz({ execute: $, input: U, options: v }) {
  let X = $(U, v);
  if (LH(X)) {
    let z;
    for await (let J of X) ((z = J), yield { type: "preliminary", output: J });
    yield { type: "final", output: z };
  } else yield { type: "final", output: await X };
}
function QU($) {
  var U, v;
  return (v = (U = $ == null ? void 0 : $.providerOptions) == null ? void 0 : U.openaiCompatible) != null ? v : {};
}
function IH($) {
  let U = [];
  for (let { role: v, content: X, ...z } of $) {
    let J = QU({ ...z });
    switch (v) {
      case "system": {
        U.push({ role: "system", content: X, ...J });
        break;
      }
      case "user": {
        if (X.length === 1 && X[0].type === "text") {
          U.push({ role: "user", content: X[0].text, ...QU(X[0]) });
          break;
        }
        U.push({
          role: "user",
          content: X.map((j) => {
            let Q = QU(j);
            switch (j.type) {
              case "text":
                return { type: "text", text: j.text, ...Q };
              case "file":
                if (j.mediaType.startsWith("image/")) {
                  let W = j.mediaType === "image/*" ? "image/jpeg" : j.mediaType;
                  return {
                    type: "image_url",
                    image_url: { url: j.data instanceof URL ? j.data.toString() : `data:${W};base64,${qw(j.data)}` },
                    ...Q,
                  };
                } else throw new j6({ functionality: `file part media type ${j.mediaType}` });
            }
          }),
          ...J,
        });
        break;
      }
      case "assistant": {
        let j = "",
          Q = [];
        for (let W of X) {
          let w = QU(W);
          switch (W.type) {
            case "text": {
              j += W.text;
              break;
            }
            case "tool-call": {
              Q.push({
                id: W.toolCallId,
                type: "function",
                function: { name: W.toolName, arguments: JSON.stringify(W.input) },
                ...w,
              });
              break;
            }
          }
        }
        U.push({ role: "assistant", content: j, tool_calls: Q.length > 0 ? Q : void 0, ...J });
        break;
      }
      case "tool": {
        for (let j of X) {
          let Q = j.output,
            W;
          switch (Q.type) {
            case "text":
            case "error-text":
              W = Q.value;
              break;
            case "content":
            case "json":
            case "error-json":
              W = JSON.stringify(Q.value);
              break;
          }
          let w = QU(j);
          U.push({ role: "tool", tool_call_id: j.toolCallId, content: W, ...w });
        }
        break;
      }
      default:
        throw Error(`Unsupported role: ${v}`);
    }
  }
  return U;
}
function Ow({ id: $, model: U, created: v }) {
  return {
    id: $ != null ? $ : void 0,
    modelId: U != null ? U : void 0,
    timestamp: v != null ? new Date(v * 1000) : void 0,
  };
}
function Hw($) {
  switch ($) {
    case "stop":
      return "stop";
    case "length":
      return "length";
    case "content_filter":
      return "content-filter";
    case "function_call":
    case "tool_calls":
      return "tool-calls";
    default:
      return "unknown";
  }
}
var qQ = Y.object({ user: Y.string().optional(), reasoningEffort: Y.string().optional() }),
  VH = Y.object({
    error: Y.object({
      message: Y.string(),
      type: Y.string().nullish(),
      param: Y.any().nullish(),
      code: Y.union([Y.string(), Y.number()]).nullish(),
    }),
  }),
  dz = { errorSchema: VH, errorToMessage: ($) => $.error.message };
function AH({ tools: $, toolChoice: U }) {
  $ = ($ == null ? void 0 : $.length) ? $ : void 0;
  let v = [];
  if ($ == null) return { tools: void 0, toolChoice: void 0, toolWarnings: v };
  let X = [];
  for (let J of $)
    if (J.type === "provider-defined") v.push({ type: "unsupported-tool", tool: J });
    else
      X.push({ type: "function", function: { name: J.name, description: J.description, parameters: J.inputSchema } });
  if (U == null) return { tools: X, toolChoice: void 0, toolWarnings: v };
  let z = U.type;
  switch (z) {
    case "auto":
    case "none":
    case "required":
      return { tools: X, toolChoice: z, toolWarnings: v };
    case "tool":
      return { tools: X, toolChoice: { type: "function", function: { name: U.toolName } }, toolWarnings: v };
    default:
      throw new j6({ functionality: `tool choice type: ${z}` });
  }
}
var FH = class {
    constructor($, U) {
      this.specificationVersion = "v2";
      var v, X;
      ((this.modelId = $), (this.config = U));
      let z = (v = U.errorStructure) != null ? v : dz;
      ((this.chunkSchema = _H(z.errorSchema)),
        (this.failedResponseHandler = S$(z)),
        (this.supportsStructuredOutputs = (X = U.supportsStructuredOutputs) != null ? X : !1));
    }
    get provider() {
      return this.config.provider;
    }
    get providerOptionsName() {
      return this.config.provider.split(".")[0].trim();
    }
    get supportedUrls() {
      var $, U, v;
      return (v = (U = ($ = this.config).supportedUrls) == null ? void 0 : U.call($)) != null ? v : {};
    }
    async getArgs({
      prompt: $,
      maxOutputTokens: U,
      temperature: v,
      topP: X,
      topK: z,
      frequencyPenalty: J,
      presencePenalty: j,
      providerOptions: Q,
      stopSequences: W,
      responseFormat: w,
      seed: N,
      toolChoice: D,
      tools: H,
    }) {
      var G, q, B, I;
      let L = [],
        S = Object.assign(
          (G = await s6({ provider: "openai-compatible", providerOptions: Q, schema: qQ })) != null ? G : {},
          (q = await s6({ provider: this.providerOptionsName, providerOptions: Q, schema: qQ })) != null ? q : {},
        );
      if (z != null) L.push({ type: "unsupported-setting", setting: "topK" });
      if ((w == null ? void 0 : w.type) === "json" && w.schema != null && !this.supportsStructuredOutputs)
        L.push({
          type: "unsupported-setting",
          setting: "responseFormat",
          details: "JSON response format schema is only supported with structuredOutputs",
        });
      let { tools: T, toolChoice: K, toolWarnings: y } = AH({ tools: H, toolChoice: D });
      return {
        args: {
          model: this.modelId,
          user: S.user,
          max_tokens: U,
          temperature: v,
          top_p: X,
          frequency_penalty: J,
          presence_penalty: j,
          response_format:
            (w == null ? void 0 : w.type) === "json"
              ? this.supportsStructuredOutputs === !0 && w.schema != null
                ? {
                    type: "json_schema",
                    json_schema: {
                      schema: w.schema,
                      name: (B = w.name) != null ? B : "response",
                      description: w.description,
                    },
                  }
                : { type: "json_object" }
              : void 0,
          stop: W,
          seed: N,
          ...Object.fromEntries(
            Object.entries((I = Q == null ? void 0 : Q[this.providerOptionsName]) != null ? I : {}).filter(
              ([x]) => !Object.keys(qQ.shape).includes(x),
            ),
          ),
          reasoning_effort: S.reasoningEffort,
          messages: IH($),
          tools: T,
          tool_choice: K,
        },
        warnings: [...L, ...y],
      };
    }
    async doGenerate($) {
      var U, v, X, z, J, j, Q, W, w, N, D, H, G, q, B, I, L;
      let { args: S, warnings: T } = await this.getArgs({ ...$ }),
        K = JSON.stringify(S),
        {
          responseHeaders: y,
          value: x,
          rawValue: R,
        } = await x$({
          url: this.config.url({ path: "/chat/completions", modelId: this.modelId }),
          headers: C$(this.config.headers(), $.headers),
          body: S,
          failedResponseHandler: this.failedResponseHandler,
          successfulResponseHandler: g$(EH),
          abortSignal: $.abortSignal,
          fetch: this.config.fetch,
        }),
        g = x.choices[0],
        t = [],
        q$ = g.message.content;
      if (q$ != null && q$.length > 0) t.push({ type: "text", text: q$ });
      let L$ = (U = g.message.reasoning_content) != null ? U : g.message.reasoning;
      if (L$ != null && L$.length > 0) t.push({ type: "reasoning", text: L$ });
      if (g.message.tool_calls != null)
        for (let a of g.message.tool_calls)
          t.push({
            type: "tool-call",
            toolCallId: (v = a.id) != null ? v : a6(),
            toolName: a.function.name,
            input: a.function.arguments,
          });
      let M$ = {
          [this.providerOptionsName]: {},
          ...(await ((z = (X = this.config.metadataExtractor) == null ? void 0 : X.extractMetadata) == null
            ? void 0
            : z.call(X, { parsedBody: R }))),
        },
        G$ = (J = x.usage) == null ? void 0 : J.completion_tokens_details;
      if ((G$ == null ? void 0 : G$.accepted_prediction_tokens) != null)
        M$[this.providerOptionsName].acceptedPredictionTokens = G$ == null ? void 0 : G$.accepted_prediction_tokens;
      if ((G$ == null ? void 0 : G$.rejected_prediction_tokens) != null)
        M$[this.providerOptionsName].rejectedPredictionTokens = G$ == null ? void 0 : G$.rejected_prediction_tokens;
      return {
        content: t,
        finishReason: Hw(g.finish_reason),
        usage: {
          inputTokens: (Q = (j = x.usage) == null ? void 0 : j.prompt_tokens) != null ? Q : void 0,
          outputTokens: (w = (W = x.usage) == null ? void 0 : W.completion_tokens) != null ? w : void 0,
          totalTokens: (D = (N = x.usage) == null ? void 0 : N.total_tokens) != null ? D : void 0,
          reasoningTokens:
            (q =
              (G = (H = x.usage) == null ? void 0 : H.completion_tokens_details) == null
                ? void 0
                : G.reasoning_tokens) != null
              ? q
              : void 0,
          cachedInputTokens:
            (L = (I = (B = x.usage) == null ? void 0 : B.prompt_tokens_details) == null ? void 0 : I.cached_tokens) !=
            null
              ? L
              : void 0,
        },
        providerMetadata: M$,
        request: { body: K },
        response: { ...Ow(x), headers: y, body: R },
        warnings: T,
      };
    }
    async doStream($) {
      var U;
      let { args: v, warnings: X } = await this.getArgs({ ...$ }),
        z = { ...v, stream: !0, stream_options: this.config.includeUsage ? { include_usage: !0 } : void 0 },
        J = (U = this.config.metadataExtractor) == null ? void 0 : U.createStreamExtractor(),
        { responseHeaders: j, value: Q } = await x$({
          url: this.config.url({ path: "/chat/completions", modelId: this.modelId }),
          headers: C$(this.config.headers(), $.headers),
          body: z,
          failedResponseHandler: this.failedResponseHandler,
          successfulResponseHandler: u4(this.chunkSchema),
          abortSignal: $.abortSignal,
          fetch: this.config.fetch,
        }),
        W = [],
        w = "unknown",
        N = {
          completionTokens: void 0,
          completionTokensDetails: {
            reasoningTokens: void 0,
            acceptedPredictionTokens: void 0,
            rejectedPredictionTokens: void 0,
          },
          promptTokens: void 0,
          promptTokensDetails: { cachedTokens: void 0 },
          totalTokens: void 0,
        },
        D = !0,
        H = this.providerOptionsName,
        G = !1,
        q = !1;
      return {
        stream: Q.pipeThrough(
          new TransformStream({
            start(B) {
              B.enqueue({ type: "stream-start", warnings: X });
            },
            transform(B, I) {
              var L, S, T, K, y, x, R, g, t, q$, L$, M$, G$;
              if ($.includeRawChunks) I.enqueue({ type: "raw", rawValue: B.rawValue });
              if (!B.success) {
                ((w = "error"), I.enqueue({ type: "error", error: B.error }));
                return;
              }
              let a = B.value;
              if ((J == null || J.processChunk(B.rawValue), "error" in a)) {
                ((w = "error"), I.enqueue({ type: "error", error: a.error.message }));
                return;
              }
              if (D) ((D = !1), I.enqueue({ type: "response-metadata", ...Ow(a) }));
              if (a.usage != null) {
                let {
                  prompt_tokens: z$,
                  completion_tokens: V$,
                  total_tokens: r,
                  prompt_tokens_details: v$,
                  completion_tokens_details: W$,
                } = a.usage;
                if (
                  ((N.promptTokens = z$ != null ? z$ : void 0),
                  (N.completionTokens = V$ != null ? V$ : void 0),
                  (N.totalTokens = r != null ? r : void 0),
                  (W$ == null ? void 0 : W$.reasoning_tokens) != null)
                )
                  N.completionTokensDetails.reasoningTokens = W$ == null ? void 0 : W$.reasoning_tokens;
                if ((W$ == null ? void 0 : W$.accepted_prediction_tokens) != null)
                  N.completionTokensDetails.acceptedPredictionTokens =
                    W$ == null ? void 0 : W$.accepted_prediction_tokens;
                if ((W$ == null ? void 0 : W$.rejected_prediction_tokens) != null)
                  N.completionTokensDetails.rejectedPredictionTokens =
                    W$ == null ? void 0 : W$.rejected_prediction_tokens;
                if ((v$ == null ? void 0 : v$.cached_tokens) != null)
                  N.promptTokensDetails.cachedTokens = v$ == null ? void 0 : v$.cached_tokens;
              }
              let I$ = a.choices[0];
              if ((I$ == null ? void 0 : I$.finish_reason) != null) w = Hw(I$.finish_reason);
              if ((I$ == null ? void 0 : I$.delta) == null) return;
              let H$ = I$.delta,
                h$ = (L = H$.reasoning_content) != null ? L : H$.reasoning;
              if (h$) {
                if (!G) (I.enqueue({ type: "reasoning-start", id: "reasoning-0" }), (G = !0));
                I.enqueue({ type: "reasoning-delta", id: "reasoning-0", delta: h$ });
              }
              if (H$.content) {
                if (!q) (I.enqueue({ type: "text-start", id: "txt-0" }), (q = !0));
                I.enqueue({ type: "text-delta", id: "txt-0", delta: H$.content });
              }
              if (H$.tool_calls != null)
                for (let z$ of H$.tool_calls) {
                  let V$ = z$.index;
                  if (W[V$] == null) {
                    if (z$.id == null) throw new Yv({ data: z$, message: "Expected 'id' to be a string." });
                    if (((S = z$.function) == null ? void 0 : S.name) == null)
                      throw new Yv({ data: z$, message: "Expected 'function.name' to be a string." });
                    (I.enqueue({ type: "tool-input-start", id: z$.id, toolName: z$.function.name }),
                      (W[V$] = {
                        id: z$.id,
                        type: "function",
                        function: { name: z$.function.name, arguments: (T = z$.function.arguments) != null ? T : "" },
                        hasFinished: !1,
                      }));
                    let v$ = W[V$];
                    if (
                      ((K = v$.function) == null ? void 0 : K.name) != null &&
                      ((y = v$.function) == null ? void 0 : y.arguments) != null
                    ) {
                      if (v$.function.arguments.length > 0)
                        I.enqueue({ type: "tool-input-delta", id: v$.id, delta: v$.function.arguments });
                      if (NQ(v$.function.arguments))
                        (I.enqueue({ type: "tool-input-end", id: v$.id }),
                          I.enqueue({
                            type: "tool-call",
                            toolCallId: (x = v$.id) != null ? x : a6(),
                            toolName: v$.function.name,
                            input: v$.function.arguments,
                          }),
                          (v$.hasFinished = !0));
                    }
                    continue;
                  }
                  let r = W[V$];
                  if (r.hasFinished) continue;
                  if (((R = z$.function) == null ? void 0 : R.arguments) != null)
                    r.function.arguments += (t = (g = z$.function) == null ? void 0 : g.arguments) != null ? t : "";
                  if (
                    (I.enqueue({
                      type: "tool-input-delta",
                      id: r.id,
                      delta: (q$ = z$.function.arguments) != null ? q$ : "",
                    }),
                    ((L$ = r.function) == null ? void 0 : L$.name) != null &&
                      ((M$ = r.function) == null ? void 0 : M$.arguments) != null &&
                      NQ(r.function.arguments))
                  )
                    (I.enqueue({ type: "tool-input-end", id: r.id }),
                      I.enqueue({
                        type: "tool-call",
                        toolCallId: (G$ = r.id) != null ? G$ : a6(),
                        toolName: r.function.name,
                        input: r.function.arguments,
                      }),
                      (r.hasFinished = !0));
                }
            },
            flush(B) {
              var I, L, S, T, K, y;
              if (G) B.enqueue({ type: "reasoning-end", id: "reasoning-0" });
              if (q) B.enqueue({ type: "text-end", id: "txt-0" });
              for (let R of W.filter((g) => !g.hasFinished))
                (B.enqueue({ type: "tool-input-end", id: R.id }),
                  B.enqueue({
                    type: "tool-call",
                    toolCallId: (I = R.id) != null ? I : a6(),
                    toolName: R.function.name,
                    input: R.function.arguments,
                  }));
              let x = { [H]: {}, ...(J == null ? void 0 : J.buildMetadata()) };
              if (N.completionTokensDetails.acceptedPredictionTokens != null)
                x[H].acceptedPredictionTokens = N.completionTokensDetails.acceptedPredictionTokens;
              if (N.completionTokensDetails.rejectedPredictionTokens != null)
                x[H].rejectedPredictionTokens = N.completionTokensDetails.rejectedPredictionTokens;
              B.enqueue({
                type: "finish",
                finishReason: w,
                usage: {
                  inputTokens: (L = N.promptTokens) != null ? L : void 0,
                  outputTokens: (S = N.completionTokens) != null ? S : void 0,
                  totalTokens: (T = N.totalTokens) != null ? T : void 0,
                  reasoningTokens: (K = N.completionTokensDetails.reasoningTokens) != null ? K : void 0,
                  cachedInputTokens: (y = N.promptTokensDetails.cachedTokens) != null ? y : void 0,
                },
                providerMetadata: x,
              });
            },
          }),
        ),
        request: { body: z },
        response: { headers: j },
      };
    }
  },
  bw = Y.object({
    prompt_tokens: Y.number().nullish(),
    completion_tokens: Y.number().nullish(),
    total_tokens: Y.number().nullish(),
    prompt_tokens_details: Y.object({ cached_tokens: Y.number().nullish() }).nullish(),
    completion_tokens_details: Y.object({
      reasoning_tokens: Y.number().nullish(),
      accepted_prediction_tokens: Y.number().nullish(),
      rejected_prediction_tokens: Y.number().nullish(),
    }).nullish(),
  }).nullish(),
  EH = Y.object({
    id: Y.string().nullish(),
    created: Y.number().nullish(),
    model: Y.string().nullish(),
    choices: Y.array(
      Y.object({
        message: Y.object({
          role: Y.literal("assistant").nullish(),
          content: Y.string().nullish(),
          reasoning_content: Y.string().nullish(),
          reasoning: Y.string().nullish(),
          tool_calls: Y.array(
            Y.object({ id: Y.string().nullish(), function: Y.object({ name: Y.string(), arguments: Y.string() }) }),
          ).nullish(),
        }),
        finish_reason: Y.string().nullish(),
      }),
    ),
    usage: bw,
  }),
  _H = ($) =>
    Y.union([
      Y.object({
        id: Y.string().nullish(),
        created: Y.number().nullish(),
        model: Y.string().nullish(),
        choices: Y.array(
          Y.object({
            delta: Y.object({
              role: Y.enum(["assistant"]).nullish(),
              content: Y.string().nullish(),
              reasoning_content: Y.string().nullish(),
              reasoning: Y.string().nullish(),
              tool_calls: Y.array(
                Y.object({
                  index: Y.number(),
                  id: Y.string().nullish(),
                  function: Y.object({ name: Y.string().nullish(), arguments: Y.string().nullish() }),
                }),
              ).nullish(),
            }).nullish(),
            finish_reason: Y.string().nullish(),
          }),
        ),
        usage: bw,
      }),
      $,
    ]);
function MH({ prompt: $, user: U = "user", assistant: v = "assistant" }) {
  let X = "";
  if ($[0].role === "system")
    ((X += `${$[0].content}

`),
      ($ = $.slice(1)));
  for (let { role: z, content: J } of $)
    switch (z) {
      case "system":
        throw new _6({ message: "Unexpected system message in prompt: ${content}", prompt: $ });
      case "user": {
        let j = J.map((Q) => {
          switch (Q.type) {
            case "text":
              return Q.text;
          }
        })
          .filter(Boolean)
          .join("");
        X += `${U}:
${j}

`;
        break;
      }
      case "assistant": {
        let j = J.map((Q) => {
          switch (Q.type) {
            case "text":
              return Q.text;
            case "tool-call":
              throw new j6({ functionality: "tool-call messages" });
          }
        }).join("");
        X += `${v}:
${j}

`;
        break;
      }
      case "tool":
        throw new j6({ functionality: "tool messages" });
      default:
        throw Error(`Unsupported role: ${z}`);
    }
  return (
    (X += `${v}:
`),
    {
      prompt: X,
      stopSequences: [
        `
${U}:`,
      ],
    }
  );
}
function Bw({ id: $, model: U, created: v }) {
  return {
    id: $ != null ? $ : void 0,
    modelId: U != null ? U : void 0,
    timestamp: v != null ? new Date(v * 1000) : void 0,
  };
}
function Dw($) {
  switch ($) {
    case "stop":
      return "stop";
    case "length":
      return "length";
    case "content_filter":
      return "content-filter";
    case "function_call":
    case "tool_calls":
      return "tool-calls";
    default:
      return "unknown";
  }
}
var PH = Y.object({
    echo: Y.boolean().optional(),
    logitBias: Y.record(Y.string(), Y.number()).optional(),
    suffix: Y.string().optional(),
    user: Y.string().optional(),
  }),
  SH = class {
    constructor($, U) {
      this.specificationVersion = "v2";
      var v;
      ((this.modelId = $), (this.config = U));
      let X = (v = U.errorStructure) != null ? v : dz;
      ((this.chunkSchema = kH(X.errorSchema)), (this.failedResponseHandler = S$(X)));
    }
    get provider() {
      return this.config.provider;
    }
    get providerOptionsName() {
      return this.config.provider.split(".")[0].trim();
    }
    get supportedUrls() {
      var $, U, v;
      return (v = (U = ($ = this.config).supportedUrls) == null ? void 0 : U.call($)) != null ? v : {};
    }
    async getArgs({
      prompt: $,
      maxOutputTokens: U,
      temperature: v,
      topP: X,
      topK: z,
      frequencyPenalty: J,
      presencePenalty: j,
      stopSequences: Q,
      responseFormat: W,
      seed: w,
      providerOptions: N,
      tools: D,
      toolChoice: H,
    }) {
      var G;
      let q = [],
        B = (G = await s6({ provider: this.providerOptionsName, providerOptions: N, schema: PH })) != null ? G : {};
      if (z != null) q.push({ type: "unsupported-setting", setting: "topK" });
      if (D == null ? void 0 : D.length) q.push({ type: "unsupported-setting", setting: "tools" });
      if (H != null) q.push({ type: "unsupported-setting", setting: "toolChoice" });
      if (W != null && W.type !== "text")
        q.push({
          type: "unsupported-setting",
          setting: "responseFormat",
          details: "JSON response format is not supported.",
        });
      let { prompt: I, stopSequences: L } = MH({ prompt: $ }),
        S = [...(L != null ? L : []), ...(Q != null ? Q : [])];
      return {
        args: {
          model: this.modelId,
          echo: B.echo,
          logit_bias: B.logitBias,
          suffix: B.suffix,
          user: B.user,
          max_tokens: U,
          temperature: v,
          top_p: X,
          frequency_penalty: J,
          presence_penalty: j,
          seed: w,
          ...(N == null ? void 0 : N[this.providerOptionsName]),
          prompt: I,
          stop: S.length > 0 ? S : void 0,
        },
        warnings: q,
      };
    }
    async doGenerate($) {
      var U, v, X, z, J, j;
      let { args: Q, warnings: W } = await this.getArgs($),
        {
          responseHeaders: w,
          value: N,
          rawValue: D,
        } = await x$({
          url: this.config.url({ path: "/completions", modelId: this.modelId }),
          headers: C$(this.config.headers(), $.headers),
          body: Q,
          failedResponseHandler: this.failedResponseHandler,
          successfulResponseHandler: g$(RH),
          abortSignal: $.abortSignal,
          fetch: this.config.fetch,
        }),
        H = N.choices[0],
        G = [];
      if (H.text != null && H.text.length > 0) G.push({ type: "text", text: H.text });
      return {
        content: G,
        usage: {
          inputTokens: (v = (U = N.usage) == null ? void 0 : U.prompt_tokens) != null ? v : void 0,
          outputTokens: (z = (X = N.usage) == null ? void 0 : X.completion_tokens) != null ? z : void 0,
          totalTokens: (j = (J = N.usage) == null ? void 0 : J.total_tokens) != null ? j : void 0,
        },
        finishReason: Dw(H.finish_reason),
        request: { body: Q },
        response: { ...Bw(N), headers: w, body: D },
        warnings: W,
      };
    }
    async doStream($) {
      let { args: U, warnings: v } = await this.getArgs($),
        X = { ...U, stream: !0, stream_options: this.config.includeUsage ? { include_usage: !0 } : void 0 },
        { responseHeaders: z, value: J } = await x$({
          url: this.config.url({ path: "/completions", modelId: this.modelId }),
          headers: C$(this.config.headers(), $.headers),
          body: X,
          failedResponseHandler: this.failedResponseHandler,
          successfulResponseHandler: u4(this.chunkSchema),
          abortSignal: $.abortSignal,
          fetch: this.config.fetch,
        }),
        j = "unknown",
        Q = { inputTokens: void 0, outputTokens: void 0, totalTokens: void 0 },
        W = !0;
      return {
        stream: J.pipeThrough(
          new TransformStream({
            start(w) {
              w.enqueue({ type: "stream-start", warnings: v });
            },
            transform(w, N) {
              var D, H, G;
              if ($.includeRawChunks) N.enqueue({ type: "raw", rawValue: w.rawValue });
              if (!w.success) {
                ((j = "error"), N.enqueue({ type: "error", error: w.error }));
                return;
              }
              let q = w.value;
              if ("error" in q) {
                ((j = "error"), N.enqueue({ type: "error", error: q.error }));
                return;
              }
              if (W)
                ((W = !1),
                  N.enqueue({ type: "response-metadata", ...Bw(q) }),
                  N.enqueue({ type: "text-start", id: "0" }));
              if (q.usage != null)
                ((Q.inputTokens = (D = q.usage.prompt_tokens) != null ? D : void 0),
                  (Q.outputTokens = (H = q.usage.completion_tokens) != null ? H : void 0),
                  (Q.totalTokens = (G = q.usage.total_tokens) != null ? G : void 0));
              let B = q.choices[0];
              if ((B == null ? void 0 : B.finish_reason) != null) j = Dw(B.finish_reason);
              if ((B == null ? void 0 : B.text) != null) N.enqueue({ type: "text-delta", id: "0", delta: B.text });
            },
            flush(w) {
              if (!W) w.enqueue({ type: "text-end", id: "0" });
              w.enqueue({ type: "finish", finishReason: j, usage: Q });
            },
          }),
        ),
        request: { body: X },
        response: { headers: z },
      };
    }
  },
  Lw = Y.object({ prompt_tokens: Y.number(), completion_tokens: Y.number(), total_tokens: Y.number() }),
  RH = Y.object({
    id: Y.string().nullish(),
    created: Y.number().nullish(),
    model: Y.string().nullish(),
    choices: Y.array(Y.object({ text: Y.string(), finish_reason: Y.string() })),
    usage: Lw.nullish(),
  }),
  kH = ($) =>
    Y.union([
      Y.object({
        id: Y.string().nullish(),
        created: Y.number().nullish(),
        model: Y.string().nullish(),
        choices: Y.array(Y.object({ text: Y.string(), finish_reason: Y.string().nullish(), index: Y.number() })),
        usage: Lw.nullish(),
      }),
      $,
    ]),
  Kw = Y.object({ dimensions: Y.number().optional(), user: Y.string().optional() }),
  ZH = class {
    constructor($, U) {
      ((this.specificationVersion = "v2"), (this.modelId = $), (this.config = U));
    }
    get provider() {
      return this.config.provider;
    }
    get maxEmbeddingsPerCall() {
      var $;
      return ($ = this.config.maxEmbeddingsPerCall) != null ? $ : 2048;
    }
    get supportsParallelCalls() {
      var $;
      return ($ = this.config.supportsParallelCalls) != null ? $ : !0;
    }
    get providerOptionsName() {
      return this.config.provider.split(".")[0].trim();
    }
    async doEmbed({ values: $, headers: U, abortSignal: v, providerOptions: X }) {
      var z, J, j;
      let Q = Object.assign(
        (z = await s6({ provider: "openai-compatible", providerOptions: X, schema: Kw })) != null ? z : {},
        (J = await s6({ provider: this.providerOptionsName, providerOptions: X, schema: Kw })) != null ? J : {},
      );
      if ($.length > this.maxEmbeddingsPerCall)
        throw new LY({
          provider: this.provider,
          modelId: this.modelId,
          maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
          values: $,
        });
      let {
        responseHeaders: W,
        value: w,
        rawValue: N,
      } = await x$({
        url: this.config.url({ path: "/embeddings", modelId: this.modelId }),
        headers: C$(this.config.headers(), U),
        body: { model: this.modelId, input: $, encoding_format: "float", dimensions: Q.dimensions, user: Q.user },
        failedResponseHandler: S$((j = this.config.errorStructure) != null ? j : dz),
        successfulResponseHandler: g$(TH),
        abortSignal: v,
        fetch: this.config.fetch,
      });
      return {
        embeddings: w.data.map((D) => D.embedding),
        usage: w.usage ? { tokens: w.usage.prompt_tokens } : void 0,
        providerMetadata: w.providerMetadata,
        response: { headers: W, body: N },
      };
    }
  },
  TH = Y.object({
    data: Y.array(Y.object({ embedding: Y.array(Y.number()) })),
    usage: Y.object({ prompt_tokens: Y.number() }).nullish(),
    providerMetadata: Y.record(Y.string(), Y.record(Y.string(), Y.any())).optional(),
  }),
  CH = class {
    constructor($, U) {
      ((this.modelId = $), (this.config = U), (this.specificationVersion = "v2"), (this.maxImagesPerCall = 10));
    }
    get provider() {
      return this.config.provider;
    }
    async doGenerate({
      prompt: $,
      n: U,
      size: v,
      aspectRatio: X,
      seed: z,
      providerOptions: J,
      headers: j,
      abortSignal: Q,
    }) {
      var W, w, N, D, H;
      let G = [];
      if (X != null)
        G.push({
          type: "unsupported-setting",
          setting: "aspectRatio",
          details: "This model does not support aspect ratio. Use `size` instead.",
        });
      if (z != null) G.push({ type: "unsupported-setting", setting: "seed" });
      let q =
          (N = (w = (W = this.config._internal) == null ? void 0 : W.currentDate) == null ? void 0 : w.call(W)) != null
            ? N
            : new Date(),
        { value: B, responseHeaders: I } = await x$({
          url: this.config.url({ path: "/images/generations", modelId: this.modelId }),
          headers: C$(this.config.headers(), j),
          body: {
            model: this.modelId,
            prompt: $,
            n: U,
            size: v,
            ...((D = J.openai) != null ? D : {}),
            response_format: "b64_json",
          },
          failedResponseHandler: S$((H = this.config.errorStructure) != null ? H : dz),
          successfulResponseHandler: g$(xH),
          abortSignal: Q,
          fetch: this.config.fetch,
        });
      return {
        images: B.data.map((L) => L.b64_json),
        warnings: G,
        response: { timestamp: q, modelId: this.modelId, headers: I },
      };
    }
  },
  xH = Y.object({ data: Y.array(Y.object({ b64_json: Y.string() })) }),
  gH = "1.0.19";
function Iw($) {
  let U = nz($.baseURL),
    v = $.name,
    X = { ...($.apiKey && { Authorization: `Bearer ${$.apiKey}` }), ...$.headers },
    z = () => z6(X, `ai-sdk/openai-compatible/${gH}`),
    J = (H) => ({
      provider: `${v}.${H}`,
      url: ({ path: G }) => {
        let q = new URL(`${U}${G}`);
        if ($.queryParams) q.search = new URLSearchParams($.queryParams).toString();
        return q.toString();
      },
      headers: z,
      fetch: $.fetch,
    }),
    j = (H) => Q(H),
    Q = (H) =>
      new FH(H, { ...J("chat"), includeUsage: $.includeUsage, supportsStructuredOutputs: $.supportsStructuredOutputs }),
    W = (H) => new SH(H, { ...J("completion"), includeUsage: $.includeUsage }),
    w = (H) => new ZH(H, { ...J("embedding") }),
    N = (H) => new CH(H, J("image")),
    D = (H) => j(H);
  return (
    (D.languageModel = j),
    (D.chatModel = Q),
    (D.completionModel = W),
    (D.textEmbeddingModel = w),
    (D.imageModel = N),
    D
  );
}
var fH = "vercel.ai.gateway.error",
  OQ = Symbol.for(fH),
  Vw,
  Aw,
  s$ = class $ extends ((Aw = Error), (Vw = OQ), Aw) {
    constructor({ message: U, statusCode: v = 500, cause: X }) {
      super(U);
      ((this[Vw] = !0), (this.statusCode = v), (this.cause = X));
    }
    static isInstance(U) {
      return $.hasMarker(U);
    }
    static hasMarker(U) {
      return typeof U === "object" && U !== null && OQ in U && U[OQ] === !0;
    }
  },
  lw = "GatewayAuthenticationError",
  hH = `vercel.ai.gateway.error.${lw}`,
  Fw = Symbol.for(hH),
  Ew,
  _w,
  WU = class $ extends ((_w = s$), (Ew = Fw), _w) {
    constructor({ message: U = "Authentication failed", statusCode: v = 401, cause: X } = {}) {
      super({ message: U, statusCode: v, cause: X });
      ((this[Ew] = !0), (this.name = lw), (this.type = "authentication_error"));
    }
    static isInstance(U) {
      return s$.hasMarker(U) && Fw in U;
    }
    static createContextualError({
      apiKeyProvided: U,
      oidcTokenProvided: v,
      message: X = "Authentication failed",
      statusCode: z = 401,
      cause: J,
    }) {
      let j;
      if (U)
        j = `AI Gateway authentication failed: Invalid API key provided.

The token is expected to be provided via the 'apiKey' option or 'AI_GATEWAY_API_KEY' environment variable.`;
      else if (v)
        j = `AI Gateway authentication failed: Invalid OIDC token provided.

The token is expected to be provided via the 'VERCEL_OIDC_TOKEN' environment variable. It expires every 12 hours.
- make sure your Vercel project settings have OIDC enabled
- if running locally with 'vercel dev', the token is automatically obtained and refreshed
- if running locally with your own dev server, run 'vercel env pull' to fetch the token
- in production/preview, the token is automatically obtained and refreshed

Alternative: Provide an API key via 'apiKey' option or 'AI_GATEWAY_API_KEY' environment variable.`;
      else
        j = `AI Gateway authentication failed: No authentication provided.

Provide either an API key or OIDC token.

API key instructions:

The token is expected to be provided via the 'apiKey' option or 'AI_GATEWAY_API_KEY' environment variable.

OIDC token instructions:

The token is expected to be provided via the 'VERCEL_OIDC_TOKEN' environment variable. It expires every 12 hours.
- make sure your Vercel project settings have OIDC enabled
- if running locally with 'vercel dev', the token is automatically obtained and refreshed
- if running locally with your own dev server, run 'vercel env pull' to fetch the token
- in production/preview, the token is automatically obtained and refreshed`;
      return new $({ message: j, statusCode: z, cause: J });
    }
  },
  dw = "GatewayInvalidRequestError",
  yH = `vercel.ai.gateway.error.${dw}`,
  Mw = Symbol.for(yH),
  Pw,
  Sw,
  mH = class extends ((Sw = s$), (Pw = Mw), Sw) {
    constructor({ message: $ = "Invalid request", statusCode: U = 400, cause: v } = {}) {
      super({ message: $, statusCode: U, cause: v });
      ((this[Pw] = !0), (this.name = dw), (this.type = "invalid_request_error"));
    }
    static isInstance($) {
      return s$.hasMarker($) && Mw in $;
    }
  },
  pw = "GatewayRateLimitError",
  uH = `vercel.ai.gateway.error.${pw}`,
  Rw = Symbol.for(uH),
  kw,
  Zw,
  cH = class extends ((Zw = s$), (kw = Rw), Zw) {
    constructor({ message: $ = "Rate limit exceeded", statusCode: U = 429, cause: v } = {}) {
      super({ message: $, statusCode: U, cause: v });
      ((this[kw] = !0), (this.name = pw), (this.type = "rate_limit_exceeded"));
    }
    static isInstance($) {
      return s$.hasMarker($) && Rw in $;
    }
  },
  rw = "GatewayModelNotFoundError",
  iH = `vercel.ai.gateway.error.${rw}`,
  Tw = Symbol.for(iH),
  nH = Y.object({ modelId: Y.string() }),
  Cw,
  xw,
  HQ = class extends ((xw = s$), (Cw = Tw), xw) {
    constructor({ message: $ = "Model not found", statusCode: U = 404, modelId: v, cause: X } = {}) {
      super({ message: $, statusCode: U, cause: X });
      ((this[Cw] = !0), (this.name = rw), (this.type = "model_not_found"), (this.modelId = v));
    }
    static isInstance($) {
      return s$.hasMarker($) && Tw in $;
    }
  },
  ow = "GatewayInternalServerError",
  lH = `vercel.ai.gateway.error.${ow}`,
  gw = Symbol.for(lH),
  fw,
  hw,
  yw = class extends ((hw = s$), (fw = gw), hw) {
    constructor({ message: $ = "Internal server error", statusCode: U = 500, cause: v } = {}) {
      super({ message: $, statusCode: U, cause: v });
      ((this[fw] = !0), (this.name = ow), (this.type = "internal_server_error"));
    }
    static isInstance($) {
      return s$.hasMarker($) && gw in $;
    }
  },
  tw = "GatewayResponseError",
  dH = `vercel.ai.gateway.error.${tw}`,
  mw = Symbol.for(dH),
  uw,
  cw,
  pH = class extends ((cw = s$), (uw = mw), cw) {
    constructor({
      message: $ = "Invalid response from Gateway",
      statusCode: U = 502,
      response: v,
      validationError: X,
      cause: z,
    } = {}) {
      super({ message: $, statusCode: U, cause: z });
      ((this[uw] = !0),
        (this.name = tw),
        (this.type = "response_error"),
        (this.response = v),
        (this.validationError = X));
    }
    static isInstance($) {
      return s$.hasMarker($) && mw in $;
    }
  };
function iw({ response: $, statusCode: U, defaultMessage: v = "Gateway request failed", cause: X, authMethod: z }) {
  let J = rH.safeParse($);
  if (!J.success)
    return new pH({
      message: `Invalid error response format: ${v}`,
      statusCode: U,
      response: $,
      validationError: J.error,
      cause: X,
    });
  let j = J.data,
    Q = j.error.type,
    W = j.error.message;
  switch (Q) {
    case "authentication_error":
      return WU.createContextualError({
        apiKeyProvided: z === "api-key",
        oidcTokenProvided: z === "oidc",
        statusCode: U,
        cause: X,
      });
    case "invalid_request_error":
      return new mH({ message: W, statusCode: U, cause: X });
    case "rate_limit_exceeded":
      return new cH({ message: W, statusCode: U, cause: X });
    case "model_not_found": {
      let w = nH.safeParse(j.error.param);
      return new HQ({ message: W, statusCode: U, modelId: w.success ? w.data.modelId : void 0, cause: X });
    }
    case "internal_server_error":
      return new yw({ message: W, statusCode: U, cause: X });
    default:
      return new yw({ message: W, statusCode: U, cause: X });
  }
}
var rH = Y.object({
  error: Y.object({
    message: Y.string(),
    type: Y.string().nullish(),
    param: Y.unknown().nullish(),
    code: Y.union([Y.string(), Y.number()]).nullish(),
  }),
});
function O4($, U) {
  var v;
  if (s$.isInstance($)) return $;
  if (O$.isInstance($))
    return iw({
      response: oH($),
      statusCode: (v = $.statusCode) != null ? v : 500,
      defaultMessage: "Gateway request failed",
      cause: $,
      authMethod: U,
    });
  return iw({
    response: {},
    statusCode: 500,
    defaultMessage: $ instanceof Error ? `Gateway request failed: ${$.message}` : "Unknown Gateway error",
    cause: $,
    authMethod: U,
  });
}
function oH($) {
  if ($.data !== void 0) return $.data;
  if ($.responseBody != null)
    try {
      return JSON.parse($.responseBody);
    } catch (U) {
      return $.responseBody;
    }
  return {};
}
var aw = "ai-gateway-auth-method";
function YU($) {
  let U = tH.safeParse($[aw]);
  return U.success ? U.data : void 0;
}
var tH = Y.union([Y.literal("api-key"), Y.literal("oidc")]),
  nw = class {
    constructor($) {
      this.config = $;
    }
    async getAvailableModels() {
      try {
        let { value: $ } = await wQ({
          url: `${this.config.baseURL}/config`,
          headers: await w6(this.config.headers()),
          successfulResponseHandler: g$($B),
          failedResponseHandler: S$({ errorSchema: Y.any(), errorToMessage: (U) => U }),
          fetch: this.config.fetch,
        });
        return $;
      } catch ($) {
        throw O4($);
      }
    }
    async getCredits() {
      try {
        let $ = new URL(this.config.baseURL),
          { value: U } = await wQ({
            url: `${$.origin}/v1/credits`,
            headers: await w6(this.config.headers()),
            successfulResponseHandler: g$(UB),
            failedResponseHandler: S$({ errorSchema: Y.any(), errorToMessage: (v) => v }),
            fetch: this.config.fetch,
          });
        return U;
      } catch ($) {
        throw O4($);
      }
    }
  },
  aH = Y.object({ specificationVersion: Y.literal("v2"), provider: Y.string(), modelId: Y.string() }),
  sH = Y.object({
    input: Y.string(),
    output: Y.string(),
    input_cache_read: Y.string().nullish(),
    input_cache_write: Y.string().nullish(),
  }).transform(({ input: $, output: U, input_cache_read: v, input_cache_write: X }) => ({
    input: $,
    output: U,
    ...(v ? { cachedInputTokens: v } : {}),
    ...(X ? { cacheCreationInputTokens: X } : {}),
  })),
  eH = Y.object({
    id: Y.string(),
    name: Y.string(),
    description: Y.string().nullish(),
    pricing: sH.nullish(),
    specification: aH,
    modelType: Y.enum(["language", "embedding", "image"]).nullish(),
  }),
  $B = Y.object({ models: Y.array(eH) }),
  UB = Y.object({ balance: Y.string(), total_used: Y.string() }).transform(({ balance: $, total_used: U }) => ({
    balance: $,
    totalUsed: U,
  })),
  zB = class {
    constructor($, U) {
      ((this.modelId = $),
        (this.config = U),
        (this.specificationVersion = "v2"),
        (this.supportedUrls = { "*/*": [/.*/] }));
    }
    get provider() {
      return this.config.provider;
    }
    async getArgs($) {
      let { abortSignal: U, ...v } = $;
      return { args: this.maybeEncodeFileParts(v), warnings: [] };
    }
    async doGenerate($) {
      let { args: U, warnings: v } = await this.getArgs($),
        { abortSignal: X } = $,
        z = await w6(this.config.headers());
      try {
        let {
          responseHeaders: J,
          value: j,
          rawValue: Q,
        } = await x$({
          url: this.getUrl(),
          headers: C$(z, $.headers, this.getModelConfigHeaders(this.modelId, !1), await w6(this.config.o11yHeaders)),
          body: U,
          successfulResponseHandler: g$(Y.any()),
          failedResponseHandler: S$({ errorSchema: Y.any(), errorToMessage: (W) => W }),
          ...(X && { abortSignal: X }),
          fetch: this.config.fetch,
        });
        return { ...j, request: { body: U }, response: { headers: J, body: Q }, warnings: v };
      } catch (J) {
        throw O4(J, YU(z));
      }
    }
    async doStream($) {
      let { args: U, warnings: v } = await this.getArgs($),
        { abortSignal: X } = $,
        z = await w6(this.config.headers());
      try {
        let { value: J, responseHeaders: j } = await x$({
          url: this.getUrl(),
          headers: C$(z, $.headers, this.getModelConfigHeaders(this.modelId, !0), await w6(this.config.o11yHeaders)),
          body: U,
          successfulResponseHandler: u4(Y.any()),
          failedResponseHandler: S$({ errorSchema: Y.any(), errorToMessage: (Q) => Q }),
          ...(X && { abortSignal: X }),
          fetch: this.config.fetch,
        });
        return {
          stream: J.pipeThrough(
            new TransformStream({
              start(Q) {
                if (v.length > 0) Q.enqueue({ type: "stream-start", warnings: v });
              },
              transform(Q, W) {
                if (Q.success) {
                  let w = Q.value;
                  if (w.type === "raw" && !$.includeRawChunks) return;
                  if (w.type === "response-metadata" && w.timestamp && typeof w.timestamp === "string")
                    w.timestamp = new Date(w.timestamp);
                  W.enqueue(w);
                } else W.error(Q.error);
              },
            }),
          ),
          request: { body: U },
          response: { headers: j },
        };
      } catch (J) {
        throw O4(J, YU(z));
      }
    }
    isFilePart($) {
      return $ && typeof $ === "object" && "type" in $ && $.type === "file";
    }
    maybeEncodeFileParts($) {
      for (let U of $.prompt)
        for (let v of U.content)
          if (this.isFilePart(v)) {
            let X = v;
            if (X.data instanceof Uint8Array) {
              let z = Uint8Array.from(X.data),
                J = Buffer.from(z).toString("base64");
              X.data = new URL(`data:${X.mediaType || "application/octet-stream"};base64,${J}`);
            }
          }
      return $;
    }
    getUrl() {
      return `${this.config.baseURL}/language-model`;
    }
    getModelConfigHeaders($, U) {
      return {
        "ai-language-model-specification-version": "2",
        "ai-language-model-id": $,
        "ai-language-model-streaming": String(U),
      };
    }
  },
  vB = class {
    constructor($, U) {
      ((this.modelId = $),
        (this.config = U),
        (this.specificationVersion = "v2"),
        (this.maxEmbeddingsPerCall = 2048),
        (this.supportsParallelCalls = !0));
    }
    get provider() {
      return this.config.provider;
    }
    async doEmbed({ values: $, headers: U, abortSignal: v, providerOptions: X }) {
      var z;
      let J = await w6(this.config.headers());
      try {
        let {
          responseHeaders: j,
          value: Q,
          rawValue: W,
        } = await x$({
          url: this.getUrl(),
          headers: C$(J, U != null ? U : {}, this.getModelConfigHeaders(), await w6(this.config.o11yHeaders)),
          body: { input: $.length === 1 ? $[0] : $, ...(X ? { providerOptions: X } : {}) },
          successfulResponseHandler: g$(XB),
          failedResponseHandler: S$({ errorSchema: Y.any(), errorToMessage: (w) => w }),
          ...(v && { abortSignal: v }),
          fetch: this.config.fetch,
        });
        return {
          embeddings: Q.embeddings,
          usage: (z = Q.usage) != null ? z : void 0,
          providerMetadata: Q.providerMetadata,
          response: { headers: j, body: W },
        };
      } catch (j) {
        throw O4(j, YU(J));
      }
    }
    getUrl() {
      return `${this.config.baseURL}/embedding-model`;
    }
    getModelConfigHeaders() {
      return { "ai-embedding-model-specification-version": "2", "ai-model-id": this.modelId };
    }
  },
  XB = Y.object({
    embeddings: Y.array(Y.array(Y.number())),
    usage: Y.object({ tokens: Y.number() }).nullish(),
    providerMetadata: Y.record(Y.string(), Y.record(Y.string(), Y.unknown())).optional(),
  });
async function JB() {
  var $, U;
  let v =
    (U = ($ = sw().headers) == null ? void 0 : $["x-vercel-oidc-token"]) != null ? U : process.env.VERCEL_OIDC_TOKEN;
  if (!v) throw new WU({ message: "OIDC token not available", statusCode: 401 });
  return v;
}
async function jB() {
  var $;
  return ($ = sw().headers) == null ? void 0 : $["x-vercel-id"];
}
var QB = Symbol.for("@vercel/request-context");
function sw() {
  var $, U, v;
  return (v = (U = ($ = globalThis[QB]) == null ? void 0 : $.get) == null ? void 0 : U.call($)) != null ? v : {};
}
var YB = "1.0.30",
  WB = "0.0.1";
function wB($ = {}) {
  var U, v;
  let X = null,
    z = null,
    J = (U = $.metadataCacheRefreshMillis) != null ? U : 300000,
    j = 0,
    Q = (v = nz($.baseURL)) != null ? v : "https://ai-gateway.vercel.sh/v1/ai",
    W = async () => {
      let q = await GB($);
      if (q)
        return z6(
          { Authorization: `Bearer ${q.token}`, "ai-gateway-protocol-version": WB, [aw]: q.authMethod, ...$.headers },
          `ai-sdk/gateway/${YB}`,
        );
      throw WU.createContextualError({ apiKeyProvided: !1, oidcTokenProvided: !1, statusCode: 401 });
    },
    w = () => {
      let q = jU({ settingValue: void 0, environmentVariableName: "VERCEL_DEPLOYMENT_ID" }),
        B = jU({ settingValue: void 0, environmentVariableName: "VERCEL_ENV" }),
        I = jU({ settingValue: void 0, environmentVariableName: "VERCEL_REGION" });
      return async () => {
        let L = await jB();
        return {
          ...(q && { "ai-o11y-deployment-id": q }),
          ...(B && { "ai-o11y-environment": B }),
          ...(I && { "ai-o11y-region": I }),
          ...(L && { "ai-o11y-request-id": L }),
        };
      };
    },
    N = (q) => {
      return new zB(q, { provider: "gateway", baseURL: Q, headers: W, fetch: $.fetch, o11yHeaders: w() });
    },
    D = async () => {
      var q, B, I;
      let L =
        (I = (B = (q = $._internal) == null ? void 0 : q.currentDate) == null ? void 0 : B.call(q).getTime()) != null
          ? I
          : Date.now();
      if (!X || L - j > J)
        ((j = L),
          (X = new nw({ baseURL: Q, headers: W, fetch: $.fetch })
            .getAvailableModels()
            .then((S) => {
              return ((z = S), S);
            })
            .catch(async (S) => {
              throw O4(S, YU(await W()));
            })));
      return z ? Promise.resolve(z) : X;
    },
    H = async () => {
      return new nw({ baseURL: Q, headers: W, fetch: $.fetch }).getCredits().catch(async (q) => {
        throw O4(q, YU(await W()));
      });
    },
    G = function (q) {
      if (new.target) throw Error("The Gateway Provider model function cannot be called with the new keyword.");
      return N(q);
    };
  return (
    (G.getAvailableModels = D),
    (G.getCredits = H),
    (G.imageModel = (q) => {
      throw new BY({ modelId: q, modelType: "imageModel" });
    }),
    (G.languageModel = N),
    (G.textEmbeddingModel = (q) => {
      return new vB(q, { provider: "gateway", baseURL: Q, headers: W, fetch: $.fetch, o11yHeaders: w() });
    }),
    G
  );
}
var ew = wB();
async function GB($) {
  let U = jU({ settingValue: $.apiKey, environmentVariableName: "AI_GATEWAY_API_KEY" });
  if (U) return { token: U, authMethod: "api-key" };
  try {
    return { token: await JB(), authMethod: "oidc" };
  } catch (v) {
    return null;
  }
}
var $G =
  typeof globalThis === "object"
    ? globalThis
    : typeof self === "object"
      ? self
      : typeof window === "object"
        ? window
        : typeof global === "object"
          ? global
          : {};
var h6 = "1.9.0";
var UG = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
function NB($) {
  var U = new Set([$]),
    v = new Set(),
    X = $.match(UG);
  if (!X)
    return function () {
      return !1;
    };
  var z = { major: +X[1], minor: +X[2], patch: +X[3], prerelease: X[4] };
  if (z.prerelease != null)
    return function (W) {
      return W === $;
    };
  function J(Q) {
    return (v.add(Q), !1);
  }
  function j(Q) {
    return (U.add(Q), !0);
  }
  return function (W) {
    if (U.has(W)) return !0;
    if (v.has(W)) return !1;
    var w = W.match(UG);
    if (!w) return J(W);
    var N = { major: +w[1], minor: +w[2], patch: +w[3], prerelease: w[4] };
    if (N.prerelease != null) return J(W);
    if (z.major !== N.major) return J(W);
    if (z.major === 0) {
      if (z.minor === N.minor && z.patch <= N.patch) return j(W);
      return J(W);
    }
    if (z.minor <= N.minor) return j(W);
    return J(W);
  };
}
var zG = NB(h6);
var qB = h6.split(".")[0],
  wU = Symbol.for("opentelemetry.js.api." + qB),
  GU = $G;
function l4($, U, v, X) {
  var z;
  if (X === void 0) X = !1;
  var J = (GU[wU] = (z = GU[wU]) !== null && z !== void 0 ? z : { version: h6 });
  if (!X && J[$]) {
    var j = Error("@opentelemetry/api: Attempted duplicate registration of API: " + $);
    return (v.error(j.stack || j.message), !1);
  }
  if (J.version !== h6) {
    var j = Error(
      "@opentelemetry/api: Registration of version v" +
        J.version +
        " for " +
        $ +
        " does not match previously registered API v" +
        h6,
    );
    return (v.error(j.stack || j.message), !1);
  }
  return ((J[$] = U), v.debug("@opentelemetry/api: Registered a global for " + $ + " v" + h6 + "."), !0);
}
function y6($) {
  var U,
    v,
    X = (U = GU[wU]) === null || U === void 0 ? void 0 : U.version;
  if (!X || !zG(X)) return;
  return (v = GU[wU]) === null || v === void 0 ? void 0 : v[$];
}
function d4($, U) {
  U.debug("@opentelemetry/api: Unregistering a global for " + $ + " v" + h6 + ".");
  var v = GU[wU];
  if (v) delete v[$];
}
var OB = function ($, U) {
    var v = typeof Symbol === "function" && $[Symbol.iterator];
    if (!v) return $;
    var X = v.call($),
      z,
      J = [],
      j;
    try {
      while ((U === void 0 || U-- > 0) && !(z = X.next()).done) J.push(z.value);
    } catch (Q) {
      j = { error: Q };
    } finally {
      try {
        if (z && !z.done && (v = X.return)) v.call(X);
      } finally {
        if (j) throw j.error;
      }
    }
    return J;
  },
  HB = function ($, U, v) {
    if (v || arguments.length === 2) {
      for (var X = 0, z = U.length, J; X < z; X++)
        if (J || !(X in U)) {
          if (!J) J = Array.prototype.slice.call(U, 0, X);
          J[X] = U[X];
        }
    }
    return $.concat(J || Array.prototype.slice.call(U));
  },
  vG = (function () {
    function $(U) {
      this._namespace = U.namespace || "DiagComponentLogger";
    }
    return (
      ($.prototype.debug = function () {
        var U = [];
        for (var v = 0; v < arguments.length; v++) U[v] = arguments[v];
        return NU("debug", this._namespace, U);
      }),
      ($.prototype.error = function () {
        var U = [];
        for (var v = 0; v < arguments.length; v++) U[v] = arguments[v];
        return NU("error", this._namespace, U);
      }),
      ($.prototype.info = function () {
        var U = [];
        for (var v = 0; v < arguments.length; v++) U[v] = arguments[v];
        return NU("info", this._namespace, U);
      }),
      ($.prototype.warn = function () {
        var U = [];
        for (var v = 0; v < arguments.length; v++) U[v] = arguments[v];
        return NU("warn", this._namespace, U);
      }),
      ($.prototype.verbose = function () {
        var U = [];
        for (var v = 0; v < arguments.length; v++) U[v] = arguments[v];
        return NU("verbose", this._namespace, U);
      }),
      $
    );
  })();
function NU($, U, v) {
  var X = y6("diag");
  if (!X) return;
  return (v.unshift(U), X[$].apply(X, HB([], OB(v), !1)));
}
var f$;
(function ($) {
  (($[($.NONE = 0)] = "NONE"),
    ($[($.ERROR = 30)] = "ERROR"),
    ($[($.WARN = 50)] = "WARN"),
    ($[($.INFO = 60)] = "INFO"),
    ($[($.DEBUG = 70)] = "DEBUG"),
    ($[($.VERBOSE = 80)] = "VERBOSE"),
    ($[($.ALL = 9999)] = "ALL"));
})(f$ || (f$ = {}));
function XG($, U) {
  if ($ < f$.NONE) $ = f$.NONE;
  else if ($ > f$.ALL) $ = f$.ALL;
  U = U || {};
  function v(X, z) {
    var J = U[X];
    if (typeof J === "function" && $ >= z) return J.bind(U);
    return function () {};
  }
  return {
    error: v("error", f$.ERROR),
    warn: v("warn", f$.WARN),
    info: v("info", f$.INFO),
    debug: v("debug", f$.DEBUG),
    verbose: v("verbose", f$.VERBOSE),
  };
}
var BB = function ($, U) {
    var v = typeof Symbol === "function" && $[Symbol.iterator];
    if (!v) return $;
    var X = v.call($),
      z,
      J = [],
      j;
    try {
      while ((U === void 0 || U-- > 0) && !(z = X.next()).done) J.push(z.value);
    } catch (Q) {
      j = { error: Q };
    } finally {
      try {
        if (z && !z.done && (v = X.return)) v.call(X);
      } finally {
        if (j) throw j.error;
      }
    }
    return J;
  },
  DB = function ($, U, v) {
    if (v || arguments.length === 2) {
      for (var X = 0, z = U.length, J; X < z; X++)
        if (J || !(X in U)) {
          if (!J) J = Array.prototype.slice.call(U, 0, X);
          J[X] = U[X];
        }
    }
    return $.concat(J || Array.prototype.slice.call(U));
  },
  KB = "diag",
  p4 = (function () {
    function $() {
      function U(z) {
        return function () {
          var J = [];
          for (var j = 0; j < arguments.length; j++) J[j] = arguments[j];
          var Q = y6("diag");
          if (!Q) return;
          return Q[z].apply(Q, DB([], BB(J), !1));
        };
      }
      var v = this,
        X = function (z, J) {
          var j, Q, W;
          if (J === void 0) J = { logLevel: f$.INFO };
          if (z === v) {
            var w = Error(
              "Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation",
            );
            return (v.error((j = w.stack) !== null && j !== void 0 ? j : w.message), !1);
          }
          if (typeof J === "number") J = { logLevel: J };
          var N = y6("diag"),
            D = XG((Q = J.logLevel) !== null && Q !== void 0 ? Q : f$.INFO, z);
          if (N && !J.suppressOverrideMessage) {
            var H = (W = Error().stack) !== null && W !== void 0 ? W : "<failed to generate stacktrace>";
            (N.warn("Current logger will be overwritten from " + H),
              D.warn("Current logger will overwrite one already registered from " + H));
          }
          return l4("diag", D, v, !0);
        };
      ((v.setLogger = X),
        (v.disable = function () {
          d4(KB, v);
        }),
        (v.createComponentLogger = function (z) {
          return new vG(z);
        }),
        (v.verbose = U("verbose")),
        (v.debug = U("debug")),
        (v.info = U("info")),
        (v.warn = U("warn")),
        (v.error = U("error")));
    }
    return (
      ($.instance = function () {
        if (!this._instance) this._instance = new $();
        return this._instance;
      }),
      $
    );
  })();
function JG($) {
  return Symbol.for($);
}
var bB = (function () {
    function $(U) {
      var v = this;
      ((v._currentContext = U ? new Map(U) : new Map()),
        (v.getValue = function (X) {
          return v._currentContext.get(X);
        }),
        (v.setValue = function (X, z) {
          var J = new $(v._currentContext);
          return (J._currentContext.set(X, z), J);
        }),
        (v.deleteValue = function (X) {
          var z = new $(v._currentContext);
          return (z._currentContext.delete(X), z);
        }));
    }
    return $;
  })(),
  jG = new bB();
var LB = function ($, U) {
    var v = typeof Symbol === "function" && $[Symbol.iterator];
    if (!v) return $;
    var X = v.call($),
      z,
      J = [],
      j;
    try {
      while ((U === void 0 || U-- > 0) && !(z = X.next()).done) J.push(z.value);
    } catch (Q) {
      j = { error: Q };
    } finally {
      try {
        if (z && !z.done && (v = X.return)) v.call(X);
      } finally {
        if (j) throw j.error;
      }
    }
    return J;
  },
  IB = function ($, U, v) {
    if (v || arguments.length === 2) {
      for (var X = 0, z = U.length, J; X < z; X++)
        if (J || !(X in U)) {
          if (!J) J = Array.prototype.slice.call(U, 0, X);
          J[X] = U[X];
        }
    }
    return $.concat(J || Array.prototype.slice.call(U));
  },
  QG = (function () {
    function $() {}
    return (
      ($.prototype.active = function () {
        return jG;
      }),
      ($.prototype.with = function (U, v, X) {
        var z = [];
        for (var J = 3; J < arguments.length; J++) z[J - 3] = arguments[J];
        return v.call.apply(v, IB([X], LB(z), !1));
      }),
      ($.prototype.bind = function (U, v) {
        return v;
      }),
      ($.prototype.enable = function () {
        return this;
      }),
      ($.prototype.disable = function () {
        return this;
      }),
      $
    );
  })();
var VB = function ($, U) {
    var v = typeof Symbol === "function" && $[Symbol.iterator];
    if (!v) return $;
    var X = v.call($),
      z,
      J = [],
      j;
    try {
      while ((U === void 0 || U-- > 0) && !(z = X.next()).done) J.push(z.value);
    } catch (Q) {
      j = { error: Q };
    } finally {
      try {
        if (z && !z.done && (v = X.return)) v.call(X);
      } finally {
        if (j) throw j.error;
      }
    }
    return J;
  },
  AB = function ($, U, v) {
    if (v || arguments.length === 2) {
      for (var X = 0, z = U.length, J; X < z; X++)
        if (J || !(X in U)) {
          if (!J) J = Array.prototype.slice.call(U, 0, X);
          J[X] = U[X];
        }
    }
    return $.concat(J || Array.prototype.slice.call(U));
  },
  BQ = "context",
  FB = new QG(),
  pz = (function () {
    function $() {}
    return (
      ($.getInstance = function () {
        if (!this._instance) this._instance = new $();
        return this._instance;
      }),
      ($.prototype.setGlobalContextManager = function (U) {
        return l4(BQ, U, p4.instance());
      }),
      ($.prototype.active = function () {
        return this._getContextManager().active();
      }),
      ($.prototype.with = function (U, v, X) {
        var z,
          J = [];
        for (var j = 3; j < arguments.length; j++) J[j - 3] = arguments[j];
        return (z = this._getContextManager()).with.apply(z, AB([U, v, X], VB(J), !1));
      }),
      ($.prototype.bind = function (U, v) {
        return this._getContextManager().bind(U, v);
      }),
      ($.prototype._getContextManager = function () {
        return y6(BQ) || FB;
      }),
      ($.prototype.disable = function () {
        (this._getContextManager().disable(), d4(BQ, p4.instance()));
      }),
      $
    );
  })();
var rz;
(function ($) {
  (($[($.NONE = 0)] = "NONE"), ($[($.SAMPLED = 1)] = "SAMPLED"));
})(rz || (rz = {}));
var DQ = "0000000000000000",
  KQ = "00000000000000000000000000000000",
  YG = { traceId: KQ, spanId: DQ, traceFlags: rz.NONE };
var e6 = (function () {
  function $(U) {
    if (U === void 0) U = YG;
    this._spanContext = U;
  }
  return (
    ($.prototype.spanContext = function () {
      return this._spanContext;
    }),
    ($.prototype.setAttribute = function (U, v) {
      return this;
    }),
    ($.prototype.setAttributes = function (U) {
      return this;
    }),
    ($.prototype.addEvent = function (U, v) {
      return this;
    }),
    ($.prototype.addLink = function (U) {
      return this;
    }),
    ($.prototype.addLinks = function (U) {
      return this;
    }),
    ($.prototype.setStatus = function (U) {
      return this;
    }),
    ($.prototype.updateName = function (U) {
      return this;
    }),
    ($.prototype.end = function (U) {}),
    ($.prototype.isRecording = function () {
      return !1;
    }),
    ($.prototype.recordException = function (U, v) {}),
    $
  );
})();
var bQ = JG("OpenTelemetry Context Key SPAN");
function oz($) {
  return $.getValue(bQ) || void 0;
}
function WG() {
  return oz(pz.getInstance().active());
}
function qU($, U) {
  return $.setValue(bQ, U);
}
function wG($) {
  return $.deleteValue(bQ);
}
function GG($, U) {
  return qU($, new e6(U));
}
function tz($) {
  var U;
  return (U = oz($)) === null || U === void 0 ? void 0 : U.spanContext();
}
var EB = /^([0-9a-f]{32})$/i,
  _B = /^[0-9a-f]{16}$/i;
function MB($) {
  return EB.test($) && $ !== KQ;
}
function PB($) {
  return _B.test($) && $ !== DQ;
}
function az($) {
  return MB($.traceId) && PB($.spanId);
}
function NG($) {
  return new e6($);
}
var LQ = pz.getInstance(),
  sz = (function () {
    function $() {}
    return (
      ($.prototype.startSpan = function (U, v, X) {
        if (X === void 0) X = LQ.active();
        var z = Boolean(v === null || v === void 0 ? void 0 : v.root);
        if (z) return new e6();
        var J = X && tz(X);
        if (SB(J) && az(J)) return new e6(J);
        else return new e6();
      }),
      ($.prototype.startActiveSpan = function (U, v, X, z) {
        var J, j, Q;
        if (arguments.length < 2) return;
        else if (arguments.length === 2) Q = v;
        else if (arguments.length === 3) ((J = v), (Q = X));
        else ((J = v), (j = X), (Q = z));
        var W = j !== null && j !== void 0 ? j : LQ.active(),
          w = this.startSpan(U, J, W),
          N = qU(W, w);
        return LQ.with(N, Q, void 0, w);
      }),
      $
    );
  })();
function SB($) {
  return (
    typeof $ === "object" &&
    typeof $.spanId === "string" &&
    typeof $.traceId === "string" &&
    typeof $.traceFlags === "number"
  );
}
var RB = new sz(),
  qG = (function () {
    function $(U, v, X, z) {
      ((this._provider = U), (this.name = v), (this.version = X), (this.options = z));
    }
    return (
      ($.prototype.startSpan = function (U, v, X) {
        return this._getTracer().startSpan(U, v, X);
      }),
      ($.prototype.startActiveSpan = function (U, v, X, z) {
        var J = this._getTracer();
        return Reflect.apply(J.startActiveSpan, J, arguments);
      }),
      ($.prototype._getTracer = function () {
        if (this._delegate) return this._delegate;
        var U = this._provider.getDelegateTracer(this.name, this.version, this.options);
        if (!U) return RB;
        return ((this._delegate = U), this._delegate);
      }),
      $
    );
  })();
var OG = (function () {
  function $() {}
  return (
    ($.prototype.getTracer = function (U, v, X) {
      return new sz();
    }),
    $
  );
})();
var kB = new OG(),
  IQ = (function () {
    function $() {}
    return (
      ($.prototype.getTracer = function (U, v, X) {
        var z;
        return (z = this.getDelegateTracer(U, v, X)) !== null && z !== void 0 ? z : new qG(this, U, v, X);
      }),
      ($.prototype.getDelegate = function () {
        var U;
        return (U = this._delegate) !== null && U !== void 0 ? U : kB;
      }),
      ($.prototype.setDelegate = function (U) {
        this._delegate = U;
      }),
      ($.prototype.getDelegateTracer = function (U, v, X) {
        var z;
        return (z = this._delegate) === null || z === void 0 ? void 0 : z.getTracer(U, v, X);
      }),
      $
    );
  })();
var r4;
(function ($) {
  (($[($.UNSET = 0)] = "UNSET"), ($[($.OK = 1)] = "OK"), ($[($.ERROR = 2)] = "ERROR"));
})(r4 || (r4 = {}));
var VQ = "trace",
  HG = (function () {
    function $() {
      ((this._proxyTracerProvider = new IQ()),
        (this.wrapSpanContext = NG),
        (this.isSpanContextValid = az),
        (this.deleteSpan = wG),
        (this.getSpan = oz),
        (this.getActiveSpan = WG),
        (this.getSpanContext = tz),
        (this.setSpan = qU),
        (this.setSpanContext = GG));
    }
    return (
      ($.getInstance = function () {
        if (!this._instance) this._instance = new $();
        return this._instance;
      }),
      ($.prototype.setGlobalTracerProvider = function (U) {
        var v = l4(VQ, this._proxyTracerProvider, p4.instance());
        if (v) this._proxyTracerProvider.setDelegate(U);
        return v;
      }),
      ($.prototype.getTracerProvider = function () {
        return y6(VQ) || this._proxyTracerProvider;
      }),
      ($.prototype.getTracer = function (U, v) {
        return this.getTracerProvider().getTracer(U, v);
      }),
      ($.prototype.disable = function () {
        (d4(VQ, p4.instance()), (this._proxyTracerProvider = new IQ()));
      }),
      $
    );
  })();
var AQ = HG.getInstance();
var ZB = Object.defineProperty,
  TB = ($, U) => {
    for (var v in U) ZB($, v, { get: U[v], enumerable: !0 });
  },
  FG = "AI_NoOutputSpecifiedError",
  EG = `vercel.ai.error.${FG}`,
  CB = Symbol.for(EG),
  _G,
  MG = class extends C {
    constructor({ message: $ = "No output specified." } = {}) {
      super({ name: FG, message: $ });
      this[_G] = !0;
    }
    static isInstance($) {
      return C.hasMarker($, EG);
    }
  };
_G = CB;
function xB($) {
  switch ($.type) {
    case "unsupported-setting": {
      let v = `AI SDK Warning: The "${$.setting}" setting is not supported by this model`;
      if ($.details) v += ` - ${$.details}`;
      return v;
    }
    case "unsupported-tool": {
      let X = `AI SDK Warning: The tool "${"name" in $.tool ? $.tool.name : "unknown tool"}" is not supported by this model`;
      if ($.details) X += ` - ${$.details}`;
      return X;
    }
    case "other":
      return `AI SDK Warning: ${$.message}`;
    default:
      return `AI SDK Warning: ${JSON.stringify($, null, 2)}`;
  }
}
var gB = "AI SDK Warning System: To turn off warning logging, set the AI_SDK_LOG_WARNINGS global to false.",
  BG = !1,
  kQ = ($) => {
    if ($.length === 0) return;
    let U = globalThis.AI_SDK_LOG_WARNINGS;
    if (U === !1) return;
    if (typeof U === "function") {
      U($);
      return;
    }
    if (!BG) ((BG = !0), console.info(gB));
    for (let v of $) console.warn(xB(v));
  },
  PG = "AI_InvalidArgumentError",
  SG = `vercel.ai.error.${PG}`,
  fB = Symbol.for(SG),
  RG,
  w$ = class extends C {
    constructor({ parameter: $, value: U, message: v }) {
      super({ name: PG, message: `Invalid argument for parameter ${$}: ${v}` });
      ((this[RG] = !0), (this.parameter = $), (this.value = U));
    }
    static isInstance($) {
      return C.hasMarker($, SG);
    }
  };
RG = fB;
var hB = "AI_InvalidStreamPartError",
  yB = `vercel.ai.error.${hB}`,
  mB = Symbol.for(yB),
  uB;
uB = mB;
var kG = "AI_InvalidToolInputError",
  ZG = `vercel.ai.error.${kG}`,
  cB = Symbol.for(ZG),
  TG,
  CG = class extends C {
    constructor({ toolInput: $, toolName: U, cause: v, message: X = `Invalid input for tool ${U}: ${B6(v)}` }) {
      super({ name: kG, message: X, cause: v });
      ((this[TG] = !0), (this.toolInput = $), (this.toolName = U));
    }
    static isInstance($) {
      return C.hasMarker($, ZG);
    }
  };
TG = cB;
var iB = "AI_MCPClientError",
  nB = `vercel.ai.error.${iB}`,
  lB = Symbol.for(nB),
  dB;
dB = lB;
var pB = "AI_NoImageGeneratedError",
  rB = `vercel.ai.error.${pB}`,
  oB = Symbol.for(rB),
  tB;
tB = oB;
var xG = "AI_NoObjectGeneratedError",
  gG = `vercel.ai.error.${xG}`,
  aB = Symbol.for(gG),
  fG,
  H4 = class extends C {
    constructor({ message: $ = "No object generated.", cause: U, text: v, response: X, usage: z, finishReason: J }) {
      super({ name: xG, message: $, cause: U });
      ((this[fG] = !0), (this.text = v), (this.response = X), (this.usage = z), (this.finishReason = J));
    }
    static isInstance($) {
      return C.hasMarker($, gG);
    }
  };
fG = aB;
var hG = "AI_NoOutputGeneratedError",
  yG = `vercel.ai.error.${hG}`,
  sB = Symbol.for(yG),
  mG,
  eB = class extends C {
    constructor({ message: $ = "No output generated.", cause: U } = {}) {
      super({ name: hG, message: $, cause: U });
      this[mG] = !0;
    }
    static isInstance($) {
      return C.hasMarker($, yG);
    }
  };
mG = sB;
var uG = "AI_NoSuchToolError",
  cG = `vercel.ai.error.${uG}`,
  $8 = Symbol.for(cG),
  iG,
  MQ = class extends C {
    constructor({
      toolName: $,
      availableTools: U = void 0,
      message:
        v = `Model tried to call unavailable tool '${$}'. ${U === void 0 ? "No tools are available." : `Available tools: ${U.join(", ")}.`}`,
    }) {
      super({ name: uG, message: v });
      ((this[iG] = !0), (this.toolName = $), (this.availableTools = U));
    }
    static isInstance($) {
      return C.hasMarker($, cG);
    }
  };
iG = $8;
var nG = "AI_ToolCallRepairError",
  lG = `vercel.ai.error.${nG}`,
  U8 = Symbol.for(lG),
  dG,
  z8 = class extends C {
    constructor({ cause: $, originalError: U, message: v = `Error repairing tool call: ${B6($)}` }) {
      super({ name: nG, message: v, cause: $ });
      ((this[dG] = !0), (this.originalError = U));
    }
    static isInstance($) {
      return C.hasMarker($, lG);
    }
  };
dG = U8;
var v8 = class extends C {
    constructor($) {
      super({
        name: "AI_UnsupportedModelVersionError",
        message: `Unsupported model version ${$.version} for provider "${$.provider}" and model "${$.modelId}". AI SDK 5 only supports models that implement specification version "v2".`,
      });
      ((this.version = $.version), (this.provider = $.provider), (this.modelId = $.modelId));
    }
  },
  X8 = "AI_InvalidDataContentError",
  J8 = `vercel.ai.error.${X8}`,
  j8 = Symbol.for(J8),
  Q8;
Q8 = j8;
var pG = "AI_InvalidMessageRoleError",
  rG = `vercel.ai.error.${pG}`,
  Y8 = Symbol.for(rG),
  oG,
  W8 = class extends C {
    constructor({
      role: $,
      message: U = `Invalid message role: '${$}'. Must be one of: "system", "user", "assistant", "tool".`,
    }) {
      super({ name: pG, message: U });
      ((this[oG] = !0), (this.role = $));
    }
    static isInstance($) {
      return C.hasMarker($, rG);
    }
  };
oG = Y8;
var w8 = "AI_MessageConversionError",
  G8 = `vercel.ai.error.${w8}`,
  N8 = Symbol.for(G8),
  q8;
q8 = N8;
var tG = "AI_DownloadError",
  aG = `vercel.ai.error.${tG}`,
  O8 = Symbol.for(aG),
  sG,
  FQ = class extends C {
    constructor({
      url: $,
      statusCode: U,
      statusText: v,
      cause: X,
      message: z = X == null ? `Failed to download ${$}: ${U} ${v}` : `Failed to download ${$}: ${X}`,
    }) {
      super({ name: tG, message: z, cause: X });
      ((this[sG] = !0), (this.url = $), (this.statusCode = U), (this.statusText = v));
    }
    static isInstance($) {
      return C.hasMarker($, aG);
    }
  };
sG = O8;
var eG = "AI_RetryError",
  $9 = `vercel.ai.error.${eG}`,
  H8 = Symbol.for($9),
  U9,
  DG = class extends C {
    constructor({ message: $, reason: U, errors: v }) {
      super({ name: eG, message: $ });
      ((this[U9] = !0), (this.reason = U), (this.errors = v), (this.lastError = v[v.length - 1]));
    }
    static isInstance($) {
      return C.hasMarker($, $9);
    }
  };
U9 = H8;
function BU($) {
  if (typeof $ !== "string") {
    if ($.specificationVersion !== "v2")
      throw new v8({ version: $.specificationVersion, provider: $.provider, modelId: $.modelId });
    return $;
  }
  return B8().languageModel($);
}
function B8() {
  var $;
  return ($ = globalThis.AI_SDK_DEFAULT_PROVIDER) != null ? $ : ew;
}
var D8 = [
  { mediaType: "image/gif", bytesPrefix: [71, 73, 70] },
  { mediaType: "image/png", bytesPrefix: [137, 80, 78, 71] },
  { mediaType: "image/jpeg", bytesPrefix: [255, 216] },
  { mediaType: "image/webp", bytesPrefix: [82, 73, 70, 70, null, null, null, null, 87, 69, 66, 80] },
  { mediaType: "image/bmp", bytesPrefix: [66, 77] },
  { mediaType: "image/tiff", bytesPrefix: [73, 73, 42, 0] },
  { mediaType: "image/tiff", bytesPrefix: [77, 77, 0, 42] },
  { mediaType: "image/avif", bytesPrefix: [0, 0, 0, 32, 102, 116, 121, 112, 97, 118, 105, 102] },
  { mediaType: "image/heic", bytesPrefix: [0, 0, 0, 32, 102, 116, 121, 112, 104, 101, 105, 99] },
];
var K8 = ($) => {
  let U = typeof $ === "string" ? i4($) : $,
    v = ((U[6] & 127) << 21) | ((U[7] & 127) << 14) | ((U[8] & 127) << 7) | (U[9] & 127);
  return U.slice(v + 10);
};
function b8($) {
  return (typeof $ === "string" && $.startsWith("SUQz")) ||
    (typeof $ !== "string" && $.length > 10 && $[0] === 73 && $[1] === 68 && $[2] === 51)
    ? K8($)
    : $;
}
function L8({ data: $, signatures: U }) {
  let v = b8($),
    X = typeof v === "string" ? i4(v.substring(0, Math.min(v.length, 24))) : v;
  for (let z of U)
    if (X.length >= z.bytesPrefix.length && z.bytesPrefix.every((J, j) => J === null || X[j] === J)) return z.mediaType;
  return;
}
var ZQ = "5.0.56",
  I8 = async ({ url: $ }) => {
    var U;
    let v = $.toString();
    try {
      let X = await fetch(v, { headers: z6({}, `ai-sdk/${ZQ}`, cz()) });
      if (!X.ok) throw new FQ({ url: v, statusCode: X.status, statusText: X.statusText });
      return {
        data: new Uint8Array(await X.arrayBuffer()),
        mediaType: (U = X.headers.get("content-type")) != null ? U : void 0,
      };
    } catch (X) {
      if (FQ.isInstance(X)) throw X;
      throw new FQ({ url: v, cause: X });
    }
  },
  V8 =
    ($ = I8) =>
    (U) =>
      Promise.all(U.map(async (v) => (v.isUrlSupportedByModel ? null : $(v))));
function A8($) {
  try {
    let [U, v] = $.split(",");
    return { mediaType: U.split(";")[0].split(":")[1], base64Content: v };
  } catch (U) {
    return { mediaType: void 0, base64Content: void 0 };
  }
}
var z9 = Y.union([
  Y.string(),
  Y.instanceof(Uint8Array),
  Y.instanceof(ArrayBuffer),
  Y.custom(
    ($) => {
      var U, v;
      return (v = (U = globalThis.Buffer) == null ? void 0 : U.isBuffer($)) != null ? v : !1;
    },
    { message: "Must be a Buffer" },
  ),
]);
function v9($) {
  if ($ instanceof Uint8Array) return { data: $, mediaType: void 0 };
  if ($ instanceof ArrayBuffer) return { data: new Uint8Array($), mediaType: void 0 };
  if (typeof $ === "string")
    try {
      $ = new URL($);
    } catch (U) {}
  if ($ instanceof URL && $.protocol === "data:") {
    let { mediaType: U, base64Content: v } = A8($.toString());
    if (U == null || v == null)
      throw new C({ name: "InvalidDataContentError", message: `Invalid data URL format in content ${$.toString()}` });
    return { data: v, mediaType: U };
  }
  return { data: $, mediaType: void 0 };
}
function F8($) {
  if (typeof $ === "string") return $;
  if ($ instanceof ArrayBuffer) return n4(new Uint8Array($));
  return n4($);
}
async function TQ({ prompt: $, supportedUrls: U, download: v = V8() }) {
  let X = await _8($.messages, v, U);
  return [
    ...($.system != null ? [{ role: "system", content: $.system }] : []),
    ...$.messages.map((z) => E8({ message: z, downloadedAssets: X })),
  ];
}
function E8({ message: $, downloadedAssets: U }) {
  let v = $.role;
  switch (v) {
    case "system":
      return { role: "system", content: $.content, providerOptions: $.providerOptions };
    case "user": {
      if (typeof $.content === "string")
        return { role: "user", content: [{ type: "text", text: $.content }], providerOptions: $.providerOptions };
      return {
        role: "user",
        content: $.content.map((X) => M8(X, U)).filter((X) => X.type !== "text" || X.text !== ""),
        providerOptions: $.providerOptions,
      };
    }
    case "assistant": {
      if (typeof $.content === "string")
        return { role: "assistant", content: [{ type: "text", text: $.content }], providerOptions: $.providerOptions };
      return {
        role: "assistant",
        content: $.content
          .filter((X) => X.type !== "text" || X.text !== "" || X.providerOptions != null)
          .map((X) => {
            let z = X.providerOptions;
            switch (X.type) {
              case "file": {
                let { data: J, mediaType: j } = v9(X.data);
                return {
                  type: "file",
                  data: J,
                  filename: X.filename,
                  mediaType: j != null ? j : X.mediaType,
                  providerOptions: z,
                };
              }
              case "reasoning":
                return { type: "reasoning", text: X.text, providerOptions: z };
              case "text":
                return { type: "text", text: X.text, providerOptions: z };
              case "tool-call":
                return {
                  type: "tool-call",
                  toolCallId: X.toolCallId,
                  toolName: X.toolName,
                  input: X.input,
                  providerExecuted: X.providerExecuted,
                  providerOptions: z,
                };
              case "tool-result":
                return {
                  type: "tool-result",
                  toolCallId: X.toolCallId,
                  toolName: X.toolName,
                  output: X.output,
                  providerOptions: z,
                };
            }
          }),
        providerOptions: $.providerOptions,
      };
    }
    case "tool":
      return {
        role: "tool",
        content: $.content.map((X) => ({
          type: "tool-result",
          toolCallId: X.toolCallId,
          toolName: X.toolName,
          output: X.output,
          providerOptions: X.providerOptions,
        })),
        providerOptions: $.providerOptions,
      };
    default:
      throw new W8({ role: v });
  }
}
async function _8($, U, v) {
  let X = $.filter((J) => J.role === "user")
      .map((J) => J.content)
      .filter((J) => Array.isArray(J))
      .flat()
      .filter((J) => J.type === "image" || J.type === "file")
      .map((J) => {
        var j;
        let Q = (j = J.mediaType) != null ? j : J.type === "image" ? "image/*" : void 0,
          W = J.type === "image" ? J.image : J.data;
        if (typeof W === "string")
          try {
            W = new URL(W);
          } catch (w) {}
        return { mediaType: Q, data: W };
      })
      .filter((J) => J.data instanceof URL)
      .map((J) => ({
        url: J.data,
        isUrlSupportedByModel:
          J.mediaType != null && jw({ url: J.data.toString(), mediaType: J.mediaType, supportedUrls: v }),
      })),
    z = await U(X);
  return Object.fromEntries(
    z
      .map((J, j) => (J == null ? null : [X[j].url.toString(), { data: J.data, mediaType: J.mediaType }]))
      .filter((J) => J != null),
  );
}
function M8($, U) {
  var v;
  if ($.type === "text") return { type: "text", text: $.text, providerOptions: $.providerOptions };
  let X,
    z = $.type;
  switch (z) {
    case "image":
      X = $.image;
      break;
    case "file":
      X = $.data;
      break;
    default:
      throw Error(`Unsupported part type: ${z}`);
  }
  let { data: J, mediaType: j } = v9(X),
    Q = j != null ? j : $.mediaType,
    W = J;
  if (W instanceof URL) {
    let w = U[W.toString()];
    if (w) ((W = w.data), Q != null || (Q = w.mediaType));
  }
  switch (z) {
    case "image": {
      if (W instanceof Uint8Array || typeof W === "string") Q = (v = L8({ data: W, signatures: D8 })) != null ? v : Q;
      return {
        type: "file",
        mediaType: Q != null ? Q : "image/*",
        filename: void 0,
        data: W,
        providerOptions: $.providerOptions,
      };
    }
    case "file": {
      if (Q == null) throw Error("Media type is missing for file part");
      return { type: "file", mediaType: Q, filename: $.filename, data: W, providerOptions: $.providerOptions };
    }
  }
}
function DU({
  maxOutputTokens: $,
  temperature: U,
  topP: v,
  topK: X,
  presencePenalty: z,
  frequencyPenalty: J,
  seed: j,
  stopSequences: Q,
}) {
  if ($ != null) {
    if (!Number.isInteger($))
      throw new w$({ parameter: "maxOutputTokens", value: $, message: "maxOutputTokens must be an integer" });
    if ($ < 1) throw new w$({ parameter: "maxOutputTokens", value: $, message: "maxOutputTokens must be >= 1" });
  }
  if (U != null) {
    if (typeof U !== "number")
      throw new w$({ parameter: "temperature", value: U, message: "temperature must be a number" });
  }
  if (v != null) {
    if (typeof v !== "number") throw new w$({ parameter: "topP", value: v, message: "topP must be a number" });
  }
  if (X != null) {
    if (typeof X !== "number") throw new w$({ parameter: "topK", value: X, message: "topK must be a number" });
  }
  if (z != null) {
    if (typeof z !== "number")
      throw new w$({ parameter: "presencePenalty", value: z, message: "presencePenalty must be a number" });
  }
  if (J != null) {
    if (typeof J !== "number")
      throw new w$({ parameter: "frequencyPenalty", value: J, message: "frequencyPenalty must be a number" });
  }
  if (j != null) {
    if (!Number.isInteger(j)) throw new w$({ parameter: "seed", value: j, message: "seed must be an integer" });
  }
  return {
    maxOutputTokens: $,
    temperature: U,
    topP: v,
    topK: X,
    presencePenalty: z,
    frequencyPenalty: J,
    stopSequences: Q,
    seed: j,
  };
}
function P8($) {
  return $ != null && Object.keys($).length > 0;
}
function X9({ tools: $, toolChoice: U, activeTools: v }) {
  if (!P8($)) return { tools: void 0, toolChoice: void 0 };
  return {
    tools: (v != null ? Object.entries($).filter(([z]) => v.includes(z)) : Object.entries($)).map(([z, J]) => {
      let j = J.type;
      switch (j) {
        case void 0:
        case "dynamic":
        case "function":
          return {
            type: "function",
            name: z,
            description: J.description,
            inputSchema: G6(J.inputSchema).jsonSchema,
            providerOptions: J.providerOptions,
          };
        case "provider-defined":
          return { type: "provider-defined", name: z, id: J.id, args: J.args };
        default:
          throw Error(`Unsupported tool type: ${j}`);
      }
    }),
    toolChoice:
      U == null ? { type: "auto" } : typeof U === "string" ? { type: U } : { type: "tool", toolName: U.toolName },
  };
}
var KU = Y.lazy(() => Y.union([Y.null(), Y.string(), Y.number(), Y.boolean(), Y.record(Y.string(), KU), Y.array(KU)])),
  o = Y.record(Y.string(), Y.record(Y.string(), KU)),
  J9 = Y.object({ type: Y.literal("text"), text: Y.string(), providerOptions: o.optional() }),
  S8 = Y.object({
    type: Y.literal("image"),
    image: Y.union([z9, Y.instanceof(URL)]),
    mediaType: Y.string().optional(),
    providerOptions: o.optional(),
  }),
  j9 = Y.object({
    type: Y.literal("file"),
    data: Y.union([z9, Y.instanceof(URL)]),
    filename: Y.string().optional(),
    mediaType: Y.string(),
    providerOptions: o.optional(),
  }),
  R8 = Y.object({ type: Y.literal("reasoning"), text: Y.string(), providerOptions: o.optional() }),
  k8 = Y.object({
    type: Y.literal("tool-call"),
    toolCallId: Y.string(),
    toolName: Y.string(),
    input: Y.unknown(),
    providerOptions: o.optional(),
    providerExecuted: Y.boolean().optional(),
  }),
  Z8 = Y.discriminatedUnion("type", [
    Y.object({ type: Y.literal("text"), value: Y.string() }),
    Y.object({ type: Y.literal("json"), value: KU }),
    Y.object({ type: Y.literal("error-text"), value: Y.string() }),
    Y.object({ type: Y.literal("error-json"), value: KU }),
    Y.object({
      type: Y.literal("content"),
      value: Y.array(
        Y.union([
          Y.object({ type: Y.literal("text"), text: Y.string() }),
          Y.object({ type: Y.literal("media"), data: Y.string(), mediaType: Y.string() }),
        ]),
      ),
    }),
  ]),
  Q9 = Y.object({
    type: Y.literal("tool-result"),
    toolCallId: Y.string(),
    toolName: Y.string(),
    output: Z8,
    providerOptions: o.optional(),
  }),
  T8 = Y.object({ role: Y.literal("system"), content: Y.string(), providerOptions: o.optional() });
var C8 = Y.object({
  role: Y.literal("user"),
  content: Y.union([Y.string(), Y.array(Y.union([J9, S8, j9]))]),
  providerOptions: o.optional(),
});
var x8 = Y.object({
  role: Y.literal("assistant"),
  content: Y.union([Y.string(), Y.array(Y.union([J9, j9, R8, k8, Q9]))]),
  providerOptions: o.optional(),
});
var g8 = Y.object({ role: Y.literal("tool"), content: Y.array(Q9), providerOptions: o.optional() });
var f8 = Y.union([T8, C8, x8, g8]);
async function CQ($) {
  if ($.prompt == null && $.messages == null)
    throw new _6({ prompt: $, message: "prompt or messages must be defined" });
  if ($.prompt != null && $.messages != null)
    throw new _6({ prompt: $, message: "prompt and messages cannot be defined at the same time" });
  if ($.system != null && typeof $.system !== "string") throw new _6({ prompt: $, message: "system must be a string" });
  let U;
  if ($.prompt != null && typeof $.prompt === "string") U = [{ role: "user", content: $.prompt }];
  else if ($.prompt != null && Array.isArray($.prompt)) U = $.prompt;
  else if ($.messages != null) U = $.messages;
  else throw new _6({ prompt: $, message: "prompt or messages must be defined" });
  if (U.length === 0) throw new _6({ prompt: $, message: "messages must not be empty" });
  let v = await a$({ value: U, schema: Y.array(f8) });
  if (!v.success)
    throw new _6({
      prompt: $,
      message:
        "The messages must be a ModelMessage[]. If you have passed a UIMessage[], you can use convertToModelMessages to convert them.",
      cause: v.error,
    });
  return { messages: U, system: $.system };
}
function xQ($) {
  if (WU.isInstance($) || HQ.isInstance($))
    return new C({
      name: "GatewayError",
      message:
        "Vercel AI Gateway access failed. If you want to use AI SDK providers directly, use the providers, e.g. @ai-sdk/openai, or register a different global default provider.",
      cause: $,
    });
  return $;
}
function $4({ operationId: $, telemetry: U }) {
  return {
    "operation.name": `${$}${(U == null ? void 0 : U.functionId) != null ? ` ${U.functionId}` : ""}`,
    "resource.name": U == null ? void 0 : U.functionId,
    "ai.operationId": $,
    "ai.telemetry.functionId": U == null ? void 0 : U.functionId,
  };
}
function gQ({ model: $, settings: U, telemetry: v, headers: X }) {
  var z;
  return {
    "ai.model.provider": $.provider,
    "ai.model.id": $.modelId,
    ...Object.entries(U).reduce((J, [j, Q]) => {
      return ((J[`ai.settings.${j}`] = Q), J);
    }, {}),
    ...Object.entries((z = v == null ? void 0 : v.metadata) != null ? z : {}).reduce((J, [j, Q]) => {
      return ((J[`ai.telemetry.metadata.${j}`] = Q), J);
    }, {}),
    ...Object.entries(X != null ? X : {}).reduce((J, [j, Q]) => {
      if (Q !== void 0) J[`ai.request.headers.${j}`] = Q;
      return J;
    }, {}),
  };
}
var h8 = {
    startSpan() {
      return ez;
    },
    startActiveSpan($, U, v, X) {
      if (typeof U === "function") return U(ez);
      if (typeof v === "function") return v(ez);
      if (typeof X === "function") return X(ez);
    },
  },
  ez = {
    spanContext() {
      return y8;
    },
    setAttribute() {
      return this;
    },
    setAttributes() {
      return this;
    },
    addEvent() {
      return this;
    },
    addLink() {
      return this;
    },
    addLinks() {
      return this;
    },
    setStatus() {
      return this;
    },
    updateName() {
      return this;
    },
    end() {
      return this;
    },
    isRecording() {
      return !1;
    },
    recordException() {
      return this;
    },
  },
  y8 = { traceId: "", spanId: "", traceFlags: 0 };
function fQ({ isEnabled: $ = !1, tracer: U } = {}) {
  if (!$) return h8;
  if (U) return U;
  return AQ.getTracer("ai");
}
function U4({ name: $, tracer: U, attributes: v, fn: X, endWhenDone: z = !0 }) {
  return U.startActiveSpan($, { attributes: v }, async (J) => {
    try {
      let j = await X(J);
      if (z) J.end();
      return j;
    } catch (j) {
      try {
        hQ(J, j);
      } finally {
        J.end();
      }
      throw j;
    }
  });
}
function hQ($, U) {
  if (U instanceof Error)
    ($.recordException({ name: U.name, message: U.message, stack: U.stack }),
      $.setStatus({ code: r4.ERROR, message: U.message }));
  else $.setStatus({ code: r4.ERROR });
}
function R$({ telemetry: $, attributes: U }) {
  if (($ == null ? void 0 : $.isEnabled) !== !0) return {};
  return Object.entries(U).reduce((v, [X, z]) => {
    if (z == null) return v;
    if (typeof z === "object" && "input" in z && typeof z.input === "function") {
      if (($ == null ? void 0 : $.recordInputs) === !1) return v;
      let J = z.input();
      return J == null ? v : { ...v, [X]: J };
    }
    if (typeof z === "object" && "output" in z && typeof z.output === "function") {
      if (($ == null ? void 0 : $.recordOutputs) === !1) return v;
      let J = z.output();
      return J == null ? v : { ...v, [X]: J };
    }
    return { ...v, [X]: z };
  }, {});
}
function yQ($) {
  return JSON.stringify(
    $.map((U) => ({
      ...U,
      content:
        typeof U.content === "string"
          ? U.content
          : U.content.map((v) =>
              v.type === "file" ? { ...v, data: v.data instanceof Uint8Array ? F8(v.data) : v.data } : v,
            ),
    })),
  );
}
function Y9($, U) {
  return {
    inputTokens: OU($.inputTokens, U.inputTokens),
    outputTokens: OU($.outputTokens, U.outputTokens),
    totalTokens: OU($.totalTokens, U.totalTokens),
    reasoningTokens: OU($.reasoningTokens, U.reasoningTokens),
    cachedInputTokens: OU($.cachedInputTokens, U.cachedInputTokens),
  };
}
function OU($, U) {
  return $ == null && U == null ? void 0 : ($ != null ? $ : 0) + (U != null ? U : 0);
}
function PQ($) {
  return $ === void 0 ? [] : Array.isArray($) ? $ : [$];
}
function m8({ error: $, exponentialBackoffDelay: U }) {
  let v = $.responseHeaders;
  if (!v) return U;
  let X,
    z = v["retry-after-ms"];
  if (z) {
    let j = parseFloat(z);
    if (!Number.isNaN(j)) X = j;
  }
  let J = v["retry-after"];
  if (J && X === void 0) {
    let j = parseFloat(J);
    if (!Number.isNaN(j)) X = j * 1000;
    else X = Date.parse(J) - Date.now();
  }
  if (X != null && !Number.isNaN(X) && 0 <= X && (X < 60000 || X < U)) return X;
  return U;
}
var u8 =
  ({ maxRetries: $ = 2, initialDelayInMs: U = 2000, backoffFactor: v = 2, abortSignal: X } = {}) =>
  async (z) =>
    W9(z, { maxRetries: $, delayInMs: U, backoffFactor: v, abortSignal: X });
async function W9($, { maxRetries: U, delayInMs: v, backoffFactor: X, abortSignal: z }, J = []) {
  try {
    return await $();
  } catch (j) {
    if (f6(j)) throw j;
    if (U === 0) throw j;
    let Q = m4(j),
      W = [...J, j],
      w = W.length;
    if (w > U)
      throw new DG({
        message: `Failed after ${w} attempts. Last error: ${Q}`,
        reason: "maxRetriesExceeded",
        errors: W,
      });
    if (j instanceof Error && O$.isInstance(j) && j.isRetryable === !0 && w <= U)
      return (
        await vw(m8({ error: j, exponentialBackoffDelay: v }), { abortSignal: z }),
        W9($, { maxRetries: U, delayInMs: X * v, backoffFactor: X, abortSignal: z }, W)
      );
    if (w === 1) throw j;
    throw new DG({
      message: `Failed after ${w} attempts with non-retryable error: '${Q}'`,
      reason: "errorNotRetryable",
      errors: W,
    });
  }
}
function mQ({ maxRetries: $, abortSignal: U }) {
  if ($ != null) {
    if (!Number.isInteger($))
      throw new w$({ parameter: "maxRetries", value: $, message: "maxRetries must be an integer" });
    if ($ < 0) throw new w$({ parameter: "maxRetries", value: $, message: "maxRetries must be >= 0" });
  }
  let v = $ != null ? $ : 2;
  return { maxRetries: v, retry: u8({ maxRetries: v, abortSignal: U }) };
}
function SQ($) {
  let U = $.filter((v) => v.type === "text");
  if (U.length === 0) return;
  return U.map((v) => v.text).join("");
}
var w9 = class {
    constructor({ data: $, mediaType: U }) {
      let v = $ instanceof Uint8Array;
      ((this.base64Data = v ? void 0 : $), (this.uint8ArrayData = v ? $ : void 0), (this.mediaType = U));
    }
    get base64() {
      if (this.base64Data == null) this.base64Data = n4(this.uint8ArrayData);
      return this.base64Data;
    }
    get uint8Array() {
      if (this.uint8ArrayData == null) this.uint8ArrayData = i4(this.base64Data);
      return this.uint8ArrayData;
    }
  },
  c8 = class extends w9 {
    constructor($) {
      super($);
      this.type = "file";
    }
  };
async function G9({ toolCall: $, tools: U, repairToolCall: v, system: X, messages: z }) {
  try {
    if (U == null) throw new MQ({ toolName: $.toolName });
    try {
      return await KG({ toolCall: $, tools: U });
    } catch (J) {
      if (v == null || !(MQ.isInstance(J) || CG.isInstance(J))) throw J;
      let j = null;
      try {
        j = await v({
          toolCall: $,
          tools: U,
          inputSchema: ({ toolName: Q }) => {
            let { inputSchema: W } = U[Q];
            return G6(W).jsonSchema;
          },
          system: X,
          messages: z,
          error: J,
        });
      } catch (Q) {
        throw new z8({ cause: Q, originalError: J });
      }
      if (j == null) throw J;
      return await KG({ toolCall: j, tools: U });
    }
  } catch (J) {
    let j = await v6({ text: $.input }),
      Q = j.success ? j.value : $.input;
    return {
      type: "tool-call",
      toolCallId: $.toolCallId,
      toolName: $.toolName,
      input: Q,
      dynamic: !0,
      invalid: !0,
      error: J,
    };
  }
}
async function KG({ toolCall: $, tools: U }) {
  let v = $.toolName,
    X = U[v];
  if (X == null) throw new MQ({ toolName: $.toolName, availableTools: Object.keys(U) });
  let z = G6(X.inputSchema),
    J = $.input.trim() === "" ? await a$({ value: {}, schema: z }) : await v6({ text: $.input, schema: z });
  if (J.success === !1) throw new CG({ toolName: v, toolInput: $.input, cause: J.error });
  return X.type === "dynamic"
    ? {
        type: "tool-call",
        toolCallId: $.toolCallId,
        toolName: $.toolName,
        input: J.value,
        providerExecuted: $.providerExecuted,
        providerMetadata: $.providerMetadata,
        dynamic: !0,
      }
    : {
        type: "tool-call",
        toolCallId: $.toolCallId,
        toolName: v,
        input: J.value,
        providerExecuted: $.providerExecuted,
        providerMetadata: $.providerMetadata,
      };
}
var N9 = class {
  constructor({ content: $, finishReason: U, usage: v, warnings: X, request: z, response: J, providerMetadata: j }) {
    ((this.content = $),
      (this.finishReason = U),
      (this.usage = v),
      (this.warnings = X),
      (this.request = z),
      (this.response = J),
      (this.providerMetadata = j));
  }
  get text() {
    return this.content
      .filter(($) => $.type === "text")
      .map(($) => $.text)
      .join("");
  }
  get reasoning() {
    return this.content.filter(($) => $.type === "reasoning");
  }
  get reasoningText() {
    return this.reasoning.length === 0 ? void 0 : this.reasoning.map(($) => $.text).join("");
  }
  get files() {
    return this.content.filter(($) => $.type === "file").map(($) => $.file);
  }
  get sources() {
    return this.content.filter(($) => $.type === "source");
  }
  get toolCalls() {
    return this.content.filter(($) => $.type === "tool-call");
  }
  get staticToolCalls() {
    return this.toolCalls.filter(($) => $.dynamic !== !0);
  }
  get dynamicToolCalls() {
    return this.toolCalls.filter(($) => $.dynamic === !0);
  }
  get toolResults() {
    return this.content.filter(($) => $.type === "tool-result");
  }
  get staticToolResults() {
    return this.toolResults.filter(($) => $.dynamic !== !0);
  }
  get dynamicToolResults() {
    return this.toolResults.filter(($) => $.dynamic === !0);
  }
};
function q9($) {
  return ({ steps: U }) => U.length === $;
}
async function O9({ stopConditions: $, steps: U }) {
  return (await Promise.all($.map((v) => v({ steps: U })))).some((v) => v);
}
function EQ({ output: $, tool: U, errorMode: v }) {
  if (v === "text") return { type: "error-text", value: B6($) };
  else if (v === "json") return { type: "error-json", value: bG($) };
  if (U == null ? void 0 : U.toModelOutput) return U.toModelOutput($);
  return typeof $ === "string" ? { type: "text", value: $ } : { type: "json", value: bG($) };
}
function bG($) {
  return $ === void 0 ? null : $;
}
function RQ({ content: $, tools: U }) {
  let v = [],
    X = $.filter((J) => J.type !== "source")
      .filter(
        (J) => (J.type !== "tool-result" || J.providerExecuted) && (J.type !== "tool-error" || J.providerExecuted),
      )
      .filter((J) => J.type !== "text" || J.text.length > 0)
      .map((J) => {
        switch (J.type) {
          case "text":
            return { type: "text", text: J.text, providerOptions: J.providerMetadata };
          case "reasoning":
            return { type: "reasoning", text: J.text, providerOptions: J.providerMetadata };
          case "file":
            return {
              type: "file",
              data: J.file.base64,
              mediaType: J.file.mediaType,
              providerOptions: J.providerMetadata,
            };
          case "tool-call":
            return {
              type: "tool-call",
              toolCallId: J.toolCallId,
              toolName: J.toolName,
              input: J.input,
              providerExecuted: J.providerExecuted,
              providerOptions: J.providerMetadata,
            };
          case "tool-result":
            return {
              type: "tool-result",
              toolCallId: J.toolCallId,
              toolName: J.toolName,
              output: EQ({ tool: U == null ? void 0 : U[J.toolName], output: J.output, errorMode: "none" }),
              providerExecuted: !0,
              providerOptions: J.providerMetadata,
            };
          case "tool-error":
            return {
              type: "tool-result",
              toolCallId: J.toolCallId,
              toolName: J.toolName,
              output: EQ({ tool: U == null ? void 0 : U[J.toolName], output: J.error, errorMode: "json" }),
              providerOptions: J.providerMetadata,
            };
        }
      });
  if (X.length > 0) v.push({ role: "assistant", content: X });
  let z = $.filter((J) => J.type === "tool-result" || J.type === "tool-error")
    .filter((J) => !J.providerExecuted)
    .map((J) => ({
      type: "tool-result",
      toolCallId: J.toolCallId,
      toolName: J.toolName,
      output: EQ({
        tool: U == null ? void 0 : U[J.toolName],
        output: J.type === "tool-result" ? J.output : J.error,
        errorMode: J.type === "tool-error" ? "text" : "none",
      }),
    }));
  if (z.length > 0) v.push({ role: "tool", content: z });
  return v;
}
var i8 = A6({ prefix: "aitxt", size: 24 });
async function H9({
  model: $,
  tools: U,
  toolChoice: v,
  system: X,
  prompt: z,
  messages: J,
  maxRetries: j,
  abortSignal: Q,
  headers: W,
  stopWhen: w = q9(1),
  experimental_output: N,
  experimental_telemetry: D,
  providerOptions: H,
  experimental_activeTools: G,
  activeTools: q = G,
  experimental_prepareStep: B,
  prepareStep: I = B,
  experimental_repairToolCall: L,
  experimental_download: S,
  experimental_context: T,
  _internal: { generateId: K = i8, currentDate: y = () => new Date() } = {},
  onStepFinish: x,
  ...R
}) {
  let g = BU($),
    t = PQ(w),
    { maxRetries: q$, retry: L$ } = mQ({ maxRetries: j, abortSignal: Q }),
    M$ = DU(R),
    G$ = z6(W != null ? W : {}, `ai/${ZQ}`),
    a = gQ({ model: g, telemetry: D, headers: G$, settings: { ...M$, maxRetries: q$ } }),
    I$ = await CQ({ system: X, prompt: z, messages: J }),
    H$ = fQ(D);
  try {
    return await U4({
      name: "ai.generateText",
      attributes: R$({
        telemetry: D,
        attributes: {
          ...$4({ operationId: "ai.generateText", telemetry: D }),
          ...a,
          "ai.model.provider": g.provider,
          "ai.model.id": g.modelId,
          "ai.prompt": { input: () => JSON.stringify({ system: X, prompt: z, messages: J }) },
        },
      }),
      tracer: H$,
      fn: async (h$) => {
        var z$, V$, r, v$, W$, e$, l$;
        let N6 = DU(R),
          B$,
          X6 = [],
          q6 = [],
          m6 = [],
          y$ = [];
        do {
          let m$ = [...I$.messages, ...m6],
            X$ = await (I == null ? void 0 : I({ model: g, steps: y$, stepNumber: y$.length, messages: m$ })),
            J$ = await TQ({
              prompt: {
                system: (z$ = X$ == null ? void 0 : X$.system) != null ? z$ : I$.system,
                messages: (V$ = X$ == null ? void 0 : X$.messages) != null ? V$ : m$,
              },
              supportedUrls: await g.supportedUrls,
              download: S,
            }),
            u = BU((r = X$ == null ? void 0 : X$.model) != null ? r : g),
            { toolChoice: s, tools: n } = X9({
              tools: U,
              toolChoice: (v$ = X$ == null ? void 0 : X$.toolChoice) != null ? v$ : v,
              activeTools: (W$ = X$ == null ? void 0 : X$.activeTools) != null ? W$ : q,
            });
          B$ = await L$(() => {
            var e;
            return U4({
              name: "ai.generateText.doGenerate",
              attributes: R$({
                telemetry: D,
                attributes: {
                  ...$4({ operationId: "ai.generateText.doGenerate", telemetry: D }),
                  ...a,
                  "ai.model.provider": u.provider,
                  "ai.model.id": u.modelId,
                  "ai.prompt.messages": { input: () => yQ(J$) },
                  "ai.prompt.tools": { input: () => (n == null ? void 0 : n.map((O6) => JSON.stringify(O6))) },
                  "ai.prompt.toolChoice": { input: () => (s != null ? JSON.stringify(s) : void 0) },
                  "gen_ai.system": u.provider,
                  "gen_ai.request.model": u.modelId,
                  "gen_ai.request.frequency_penalty": R.frequencyPenalty,
                  "gen_ai.request.max_tokens": R.maxOutputTokens,
                  "gen_ai.request.presence_penalty": R.presencePenalty,
                  "gen_ai.request.stop_sequences": R.stopSequences,
                  "gen_ai.request.temperature": (e = R.temperature) != null ? e : void 0,
                  "gen_ai.request.top_k": R.topK,
                  "gen_ai.request.top_p": R.topP,
                },
              }),
              tracer: H$,
              fn: async (O6) => {
                var o4, t4, u6, d$, a4, c6, B4, D4;
                let F$ = await u.doGenerate({
                    ...N6,
                    tools: n,
                    toolChoice: s,
                    responseFormat: N == null ? void 0 : N.responseFormat,
                    prompt: J$,
                    providerOptions: H,
                    abortSignal: Q,
                    headers: G$,
                  }),
                  F6 = {
                    id: (t4 = (o4 = F$.response) == null ? void 0 : o4.id) != null ? t4 : K(),
                    timestamp: (d$ = (u6 = F$.response) == null ? void 0 : u6.timestamp) != null ? d$ : y(),
                    modelId: (c6 = (a4 = F$.response) == null ? void 0 : a4.modelId) != null ? c6 : u.modelId,
                    headers: (B4 = F$.response) == null ? void 0 : B4.headers,
                    body: (D4 = F$.response) == null ? void 0 : D4.body,
                  };
                return (
                  O6.setAttributes(
                    R$({
                      telemetry: D,
                      attributes: {
                        "ai.response.finishReason": F$.finishReason,
                        "ai.response.text": { output: () => SQ(F$.content) },
                        "ai.response.toolCalls": {
                          output: () => {
                            let s4 = LG(F$.content);
                            return s4 == null ? void 0 : JSON.stringify(s4);
                          },
                        },
                        "ai.response.id": F6.id,
                        "ai.response.model": F6.modelId,
                        "ai.response.timestamp": F6.timestamp.toISOString(),
                        "ai.response.providerMetadata": JSON.stringify(F$.providerMetadata),
                        "ai.usage.promptTokens": F$.usage.inputTokens,
                        "ai.usage.completionTokens": F$.usage.outputTokens,
                        "gen_ai.response.finish_reasons": [F$.finishReason],
                        "gen_ai.response.id": F6.id,
                        "gen_ai.response.model": F6.modelId,
                        "gen_ai.usage.input_tokens": F$.usage.inputTokens,
                        "gen_ai.usage.output_tokens": F$.usage.outputTokens,
                      },
                    }),
                  ),
                  { ...F$, response: F6 }
                );
              },
            });
          });
          let b$ = await Promise.all(
            B$.content
              .filter((e) => e.type === "tool-call")
              .map((e) => G9({ toolCall: e, tools: U, repairToolCall: L, system: X, messages: m$ })),
          );
          for (let e of b$) {
            if (e.invalid) continue;
            let O6 = U[e.toolName];
            if ((O6 == null ? void 0 : O6.onInputAvailable) != null)
              await O6.onInputAvailable({
                input: e.input,
                toolCallId: e.toolCallId,
                messages: m$,
                abortSignal: Q,
                experimental_context: T,
              });
          }
          let z4 = b$.filter((e) => e.invalid && e.dynamic);
          q6 = [];
          for (let e of z4)
            q6.push({
              type: "tool-error",
              toolCallId: e.toolCallId,
              toolName: e.toolName,
              input: e.input,
              error: m4(e.error),
              dynamic: !0,
            });
          if (((X6 = b$.filter((e) => !e.providerExecuted)), U != null))
            q6.push(
              ...(await n8({
                toolCalls: X6.filter((e) => !e.invalid),
                tools: U,
                tracer: H$,
                telemetry: D,
                messages: m$,
                abortSignal: Q,
                experimental_context: T,
              })),
            );
          let k = d8({ content: B$.content, toolCalls: b$, toolOutputs: q6 });
          m6.push(...RQ({ content: k, tools: U }));
          let j$ = new N9({
            content: k,
            finishReason: B$.finishReason,
            usage: B$.usage,
            warnings: B$.warnings,
            providerMetadata: B$.providerMetadata,
            request: (e$ = B$.request) != null ? e$ : {},
            response: { ...B$.response, messages: structuredClone(m6) },
          });
          (kQ((l$ = B$.warnings) != null ? l$ : []), y$.push(j$), await (x == null ? void 0 : x(j$)));
        } while (X6.length > 0 && q6.length === X6.length && !(await O9({ stopConditions: t, steps: y$ })));
        h$.setAttributes(
          R$({
            telemetry: D,
            attributes: {
              "ai.response.finishReason": B$.finishReason,
              "ai.response.text": { output: () => SQ(B$.content) },
              "ai.response.toolCalls": {
                output: () => {
                  let m$ = LG(B$.content);
                  return m$ == null ? void 0 : JSON.stringify(m$);
                },
              },
              "ai.response.providerMetadata": JSON.stringify(B$.providerMetadata),
              "ai.usage.promptTokens": B$.usage.inputTokens,
              "ai.usage.completionTokens": B$.usage.outputTokens,
            },
          }),
        );
        let A$ = y$[y$.length - 1];
        return new l8({
          steps: y$,
          resolvedOutput: await (N == null
            ? void 0
            : N.parseOutput(
                { text: A$.text },
                { response: A$.response, usage: A$.usage, finishReason: A$.finishReason },
              )),
        });
      },
    });
  } catch (h$) {
    throw xQ(h$);
  }
}
async function n8({
  toolCalls: $,
  tools: U,
  tracer: v,
  telemetry: X,
  messages: z,
  abortSignal: J,
  experimental_context: j,
}) {
  return (
    await Promise.all(
      $.map(async ({ toolCallId: W, toolName: w, input: N }) => {
        let D = U[w];
        if ((D == null ? void 0 : D.execute) == null) return;
        return U4({
          name: "ai.toolCall",
          attributes: R$({
            telemetry: X,
            attributes: {
              ...$4({ operationId: "ai.toolCall", telemetry: X }),
              "ai.toolCall.name": w,
              "ai.toolCall.id": W,
              "ai.toolCall.args": { output: () => JSON.stringify(N) },
            },
          }),
          tracer: v,
          fn: async (H) => {
            try {
              let G = lz({
                  execute: D.execute.bind(D),
                  input: N,
                  options: { toolCallId: W, messages: z, abortSignal: J, experimental_context: j },
                }),
                q;
              for await (let B of G) if (B.type === "final") q = B.output;
              try {
                H.setAttributes(
                  R$({ telemetry: X, attributes: { "ai.toolCall.result": { output: () => JSON.stringify(q) } } }),
                );
              } catch (B) {}
              return {
                type: "tool-result",
                toolCallId: W,
                toolName: w,
                input: N,
                output: q,
                dynamic: D.type === "dynamic",
              };
            } catch (G) {
              return (
                hQ(H, G),
                { type: "tool-error", toolCallId: W, toolName: w, input: N, error: G, dynamic: D.type === "dynamic" }
              );
            }
          },
        });
      }),
    )
  ).filter((W) => W != null);
}
var l8 = class {
  constructor($) {
    ((this.steps = $.steps), (this.resolvedOutput = $.resolvedOutput));
  }
  get finalStep() {
    return this.steps[this.steps.length - 1];
  }
  get content() {
    return this.finalStep.content;
  }
  get text() {
    return this.finalStep.text;
  }
  get files() {
    return this.finalStep.files;
  }
  get reasoningText() {
    return this.finalStep.reasoningText;
  }
  get reasoning() {
    return this.finalStep.reasoning;
  }
  get toolCalls() {
    return this.finalStep.toolCalls;
  }
  get staticToolCalls() {
    return this.finalStep.staticToolCalls;
  }
  get dynamicToolCalls() {
    return this.finalStep.dynamicToolCalls;
  }
  get toolResults() {
    return this.finalStep.toolResults;
  }
  get staticToolResults() {
    return this.finalStep.staticToolResults;
  }
  get dynamicToolResults() {
    return this.finalStep.dynamicToolResults;
  }
  get sources() {
    return this.finalStep.sources;
  }
  get finishReason() {
    return this.finalStep.finishReason;
  }
  get warnings() {
    return this.finalStep.warnings;
  }
  get providerMetadata() {
    return this.finalStep.providerMetadata;
  }
  get response() {
    return this.finalStep.response;
  }
  get request() {
    return this.finalStep.request;
  }
  get usage() {
    return this.finalStep.usage;
  }
  get totalUsage() {
    return this.steps.reduce(
      ($, U) => {
        return Y9($, U.usage);
      },
      {
        inputTokens: void 0,
        outputTokens: void 0,
        totalTokens: void 0,
        reasoningTokens: void 0,
        cachedInputTokens: void 0,
      },
    );
  }
  get experimental_output() {
    if (this.resolvedOutput == null) throw new MG();
    return this.resolvedOutput;
  }
};
function LG($) {
  let U = $.filter((v) => v.type === "tool-call");
  if (U.length === 0) return;
  return U.map((v) => ({ toolCallId: v.toolCallId, toolName: v.toolName, input: v.input }));
}
function d8({ content: $, toolCalls: U, toolOutputs: v }) {
  return [
    ...$.map((X) => {
      switch (X.type) {
        case "text":
        case "reasoning":
        case "source":
          return X;
        case "file":
          return { type: "file", file: new w9(X) };
        case "tool-call":
          return U.find((z) => z.toolCallId === X.toolCallId);
        case "tool-result": {
          let z = U.find((J) => J.toolCallId === X.toolCallId);
          if (z == null) throw Error(`Tool call ${X.toolCallId} not found.`);
          if (X.isError)
            return {
              type: "tool-error",
              toolCallId: X.toolCallId,
              toolName: X.toolName,
              input: z.input,
              error: X.result,
              providerExecuted: !0,
              dynamic: z.dynamic,
            };
          return {
            type: "tool-result",
            toolCallId: X.toolCallId,
            toolName: X.toolName,
            input: z.input,
            output: X.result,
            providerExecuted: !0,
            dynamic: z.dynamic,
          };
        }
      }
    }),
    ...v,
  ];
}
function LU($, U) {
  let v = new Headers($ != null ? $ : {});
  for (let [X, z] of Object.entries(U)) if (!v.has(X)) v.set(X, z);
  return v;
}
function p8({ status: $, statusText: U, headers: v, textStream: X }) {
  return new Response(X.pipeThrough(new TextEncoderStream()), {
    status: $ != null ? $ : 200,
    statusText: U,
    headers: LU(v, { "content-type": "text/plain; charset=utf-8" }),
  });
}
function B9({ response: $, status: U, statusText: v, headers: X, stream: z }) {
  $.writeHead(U != null ? U : 200, v, X);
  let J = z.getReader();
  (async () => {
    try {
      while (!0) {
        let { done: Q, value: W } = await J.read();
        if (Q) break;
        $.write(W);
      }
    } catch (Q) {
      throw Q;
    } finally {
      $.end();
    }
  })();
}
function r8({ response: $, status: U, statusText: v, headers: X, textStream: z }) {
  B9({
    response: $,
    status: U,
    statusText: v,
    headers: Object.fromEntries(LU(X, { "content-type": "text/plain; charset=utf-8" }).entries()),
    stream: z.pipeThrough(new TextEncoderStream()),
  });
}
var D9 = class extends TransformStream {
    constructor() {
      super({
        transform($, U) {
          U.enqueue(`data: ${JSON.stringify($)}

`);
        },
        flush($) {
          $.enqueue(`data: [DONE]

`);
        },
      });
    }
  },
  K9 = {
    "content-type": "text/event-stream",
    "cache-control": "no-cache",
    connection: "keep-alive",
    "x-vercel-ai-ui-message-stream": "v1",
    "x-accel-buffering": "no",
  };
function o8({ status: $, statusText: U, headers: v, stream: X, consumeSseStream: z }) {
  let J = X.pipeThrough(new D9());
  if (z) {
    let [j, Q] = J.tee();
    ((J = j), z({ stream: Q }));
  }
  return new Response(J.pipeThrough(new TextEncoderStream()), { status: $, statusText: U, headers: LU(v, K9) });
}
function t8({ originalMessages: $, responseMessageId: U }) {
  if ($ == null) return;
  let v = $[$.length - 1];
  return (v == null ? void 0 : v.role) === "assistant" ? v.id : typeof U === "function" ? U() : U;
}
var cA = Y.union([
  Y.strictObject({ type: Y.literal("text-start"), id: Y.string(), providerMetadata: o.optional() }),
  Y.strictObject({ type: Y.literal("text-delta"), id: Y.string(), delta: Y.string(), providerMetadata: o.optional() }),
  Y.strictObject({ type: Y.literal("text-end"), id: Y.string(), providerMetadata: o.optional() }),
  Y.strictObject({ type: Y.literal("error"), errorText: Y.string() }),
  Y.strictObject({
    type: Y.literal("tool-input-start"),
    toolCallId: Y.string(),
    toolName: Y.string(),
    providerExecuted: Y.boolean().optional(),
    dynamic: Y.boolean().optional(),
  }),
  Y.strictObject({ type: Y.literal("tool-input-delta"), toolCallId: Y.string(), inputTextDelta: Y.string() }),
  Y.strictObject({
    type: Y.literal("tool-input-available"),
    toolCallId: Y.string(),
    toolName: Y.string(),
    input: Y.unknown(),
    providerExecuted: Y.boolean().optional(),
    providerMetadata: o.optional(),
    dynamic: Y.boolean().optional(),
  }),
  Y.strictObject({
    type: Y.literal("tool-input-error"),
    toolCallId: Y.string(),
    toolName: Y.string(),
    input: Y.unknown(),
    providerExecuted: Y.boolean().optional(),
    providerMetadata: o.optional(),
    dynamic: Y.boolean().optional(),
    errorText: Y.string(),
  }),
  Y.strictObject({
    type: Y.literal("tool-output-available"),
    toolCallId: Y.string(),
    output: Y.unknown(),
    providerExecuted: Y.boolean().optional(),
    dynamic: Y.boolean().optional(),
    preliminary: Y.boolean().optional(),
  }),
  Y.strictObject({
    type: Y.literal("tool-output-error"),
    toolCallId: Y.string(),
    errorText: Y.string(),
    providerExecuted: Y.boolean().optional(),
    dynamic: Y.boolean().optional(),
  }),
  Y.strictObject({ type: Y.literal("reasoning-start"), id: Y.string(), providerMetadata: o.optional() }),
  Y.strictObject({
    type: Y.literal("reasoning-delta"),
    id: Y.string(),
    delta: Y.string(),
    providerMetadata: o.optional(),
  }),
  Y.strictObject({ type: Y.literal("reasoning-end"), id: Y.string(), providerMetadata: o.optional() }),
  Y.strictObject({
    type: Y.literal("source-url"),
    sourceId: Y.string(),
    url: Y.string(),
    title: Y.string().optional(),
    providerMetadata: o.optional(),
  }),
  Y.strictObject({
    type: Y.literal("source-document"),
    sourceId: Y.string(),
    mediaType: Y.string(),
    title: Y.string(),
    filename: Y.string().optional(),
    providerMetadata: o.optional(),
  }),
  Y.strictObject({ type: Y.literal("file"), url: Y.string(), mediaType: Y.string(), providerMetadata: o.optional() }),
  Y.strictObject({
    type: Y.custom(($) => typeof $ === "string" && $.startsWith("data-"), { message: 'Type must start with "data-"' }),
    id: Y.string().optional(),
    data: Y.unknown(),
    transient: Y.boolean().optional(),
  }),
  Y.strictObject({ type: Y.literal("start-step") }),
  Y.strictObject({ type: Y.literal("finish-step") }),
  Y.strictObject({
    type: Y.literal("start"),
    messageId: Y.string().optional(),
    messageMetadata: Y.unknown().optional(),
  }),
  Y.strictObject({ type: Y.literal("finish"), messageMetadata: Y.unknown().optional() }),
  Y.strictObject({ type: Y.literal("abort") }),
  Y.strictObject({ type: Y.literal("message-metadata"), messageMetadata: Y.unknown() }),
]);
function a8($) {
  return $.type.startsWith("data-");
}
function b9($, U) {
  if ($ === void 0 && U === void 0) return;
  if ($ === void 0) return U;
  if (U === void 0) return $;
  let v = { ...$ };
  for (let X in U)
    if (Object.prototype.hasOwnProperty.call(U, X)) {
      let z = U[X];
      if (z === void 0) continue;
      let J = X in $ ? $[X] : void 0,
        j = z !== null && typeof z === "object" && !Array.isArray(z) && !(z instanceof Date) && !(z instanceof RegExp),
        Q =
          J !== null &&
          J !== void 0 &&
          typeof J === "object" &&
          !Array.isArray(J) &&
          !(J instanceof Date) &&
          !(J instanceof RegExp);
      if (j && Q) v[X] = b9(J, z);
      else v[X] = z;
    }
  return v;
}
function s8($) {
  let U = ["ROOT"],
    v = -1,
    X = null;
  function z(W, w, N) {
    switch (W) {
      case '"': {
        ((v = w), U.pop(), U.push(N), U.push("INSIDE_STRING"));
        break;
      }
      case "f":
      case "t":
      case "n": {
        ((v = w), (X = w), U.pop(), U.push(N), U.push("INSIDE_LITERAL"));
        break;
      }
      case "-": {
        (U.pop(), U.push(N), U.push("INSIDE_NUMBER"));
        break;
      }
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9": {
        ((v = w), U.pop(), U.push(N), U.push("INSIDE_NUMBER"));
        break;
      }
      case "{": {
        ((v = w), U.pop(), U.push(N), U.push("INSIDE_OBJECT_START"));
        break;
      }
      case "[": {
        ((v = w), U.pop(), U.push(N), U.push("INSIDE_ARRAY_START"));
        break;
      }
    }
  }
  function J(W, w) {
    switch (W) {
      case ",": {
        (U.pop(), U.push("INSIDE_OBJECT_AFTER_COMMA"));
        break;
      }
      case "}": {
        ((v = w), U.pop());
        break;
      }
    }
  }
  function j(W, w) {
    switch (W) {
      case ",": {
        (U.pop(), U.push("INSIDE_ARRAY_AFTER_COMMA"));
        break;
      }
      case "]": {
        ((v = w), U.pop());
        break;
      }
    }
  }
  for (let W = 0; W < $.length; W++) {
    let w = $[W];
    switch (U[U.length - 1]) {
      case "ROOT":
        z(w, W, "FINISH");
        break;
      case "INSIDE_OBJECT_START": {
        switch (w) {
          case '"': {
            (U.pop(), U.push("INSIDE_OBJECT_KEY"));
            break;
          }
          case "}": {
            ((v = W), U.pop());
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_COMMA": {
        switch (w) {
          case '"': {
            (U.pop(), U.push("INSIDE_OBJECT_KEY"));
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_KEY": {
        switch (w) {
          case '"': {
            (U.pop(), U.push("INSIDE_OBJECT_AFTER_KEY"));
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_KEY": {
        switch (w) {
          case ":": {
            (U.pop(), U.push("INSIDE_OBJECT_BEFORE_VALUE"));
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_BEFORE_VALUE": {
        z(w, W, "INSIDE_OBJECT_AFTER_VALUE");
        break;
      }
      case "INSIDE_OBJECT_AFTER_VALUE": {
        J(w, W);
        break;
      }
      case "INSIDE_STRING": {
        switch (w) {
          case '"': {
            (U.pop(), (v = W));
            break;
          }
          case "\\": {
            U.push("INSIDE_STRING_ESCAPE");
            break;
          }
          default:
            v = W;
        }
        break;
      }
      case "INSIDE_ARRAY_START": {
        switch (w) {
          case "]": {
            ((v = W), U.pop());
            break;
          }
          default: {
            ((v = W), z(w, W, "INSIDE_ARRAY_AFTER_VALUE"));
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_VALUE": {
        switch (w) {
          case ",": {
            (U.pop(), U.push("INSIDE_ARRAY_AFTER_COMMA"));
            break;
          }
          case "]": {
            ((v = W), U.pop());
            break;
          }
          default: {
            v = W;
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_COMMA": {
        z(w, W, "INSIDE_ARRAY_AFTER_VALUE");
        break;
      }
      case "INSIDE_STRING_ESCAPE": {
        (U.pop(), (v = W));
        break;
      }
      case "INSIDE_NUMBER": {
        switch (w) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9": {
            v = W;
            break;
          }
          case "e":
          case "E":
          case "-":
          case ".":
            break;
          case ",": {
            if ((U.pop(), U[U.length - 1] === "INSIDE_ARRAY_AFTER_VALUE")) j(w, W);
            if (U[U.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") J(w, W);
            break;
          }
          case "}": {
            if ((U.pop(), U[U.length - 1] === "INSIDE_OBJECT_AFTER_VALUE")) J(w, W);
            break;
          }
          case "]": {
            if ((U.pop(), U[U.length - 1] === "INSIDE_ARRAY_AFTER_VALUE")) j(w, W);
            break;
          }
          default: {
            U.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_LITERAL": {
        let D = $.substring(X, W + 1);
        if (!"false".startsWith(D) && !"true".startsWith(D) && !"null".startsWith(D)) {
          if ((U.pop(), U[U.length - 1] === "INSIDE_OBJECT_AFTER_VALUE")) J(w, W);
          else if (U[U.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") j(w, W);
        } else v = W;
        break;
      }
    }
  }
  let Q = $.slice(0, v + 1);
  for (let W = U.length - 1; W >= 0; W--)
    switch (U[W]) {
      case "INSIDE_STRING": {
        Q += '"';
        break;
      }
      case "INSIDE_OBJECT_KEY":
      case "INSIDE_OBJECT_AFTER_KEY":
      case "INSIDE_OBJECT_AFTER_COMMA":
      case "INSIDE_OBJECT_START":
      case "INSIDE_OBJECT_BEFORE_VALUE":
      case "INSIDE_OBJECT_AFTER_VALUE": {
        Q += "}";
        break;
      }
      case "INSIDE_ARRAY_START":
      case "INSIDE_ARRAY_AFTER_COMMA":
      case "INSIDE_ARRAY_AFTER_VALUE": {
        Q += "]";
        break;
      }
      case "INSIDE_LITERAL": {
        let N = $.substring(X, $.length);
        if ("true".startsWith(N)) Q += "true".slice(N.length);
        else if ("false".startsWith(N)) Q += "false".slice(N.length);
        else if ("null".startsWith(N)) Q += "null".slice(N.length);
      }
    }
  return Q;
}
async function L9($) {
  if ($ === void 0) return { value: void 0, state: "undefined-input" };
  let U = await v6({ text: $ });
  if (U.success) return { value: U.value, state: "successful-parse" };
  if (((U = await v6({ text: s8($) })), U.success)) return { value: U.value, state: "repaired-parse" };
  return { value: void 0, state: "failed-parse" };
}
function _Q($) {
  return $.type.startsWith("tool-");
}
function IG($) {
  return $.type.split("-").slice(1).join("-");
}
function e8({ lastMessage: $, messageId: U }) {
  return {
    message:
      ($ == null ? void 0 : $.role) === "assistant" ? $ : { id: U, metadata: void 0, role: "assistant", parts: [] },
    activeTextParts: {},
    activeReasoningParts: {},
    partialToolCalls: {},
  };
}
function $D({
  stream: $,
  messageMetadataSchema: U,
  dataPartSchemas: v,
  runUpdateMessageJob: X,
  onError: z,
  onToolCall: J,
  onData: j,
}) {
  return $.pipeThrough(
    new TransformStream({
      async transform(Q, W) {
        await X(async ({ state: w, write: N }) => {
          var D, H, G, q;
          function B(K) {
            let x = w.message.parts.filter(_Q).find((R) => R.toolCallId === K);
            if (x == null) throw Error("tool-output-error must be preceded by a tool-input-available");
            return x;
          }
          function I(K) {
            let x = w.message.parts.filter((R) => R.type === "dynamic-tool").find((R) => R.toolCallId === K);
            if (x == null) throw Error("tool-output-error must be preceded by a tool-input-available");
            return x;
          }
          function L(K) {
            var y;
            let x = w.message.parts.find((t) => _Q(t) && t.toolCallId === K.toolCallId),
              R = K,
              g = x;
            if (x != null) {
              if (
                ((x.state = K.state),
                (g.input = R.input),
                (g.output = R.output),
                (g.errorText = R.errorText),
                (g.rawInput = R.rawInput),
                (g.preliminary = R.preliminary),
                (g.providerExecuted = (y = R.providerExecuted) != null ? y : x.providerExecuted),
                R.providerMetadata != null && x.state === "input-available")
              )
                x.callProviderMetadata = R.providerMetadata;
            } else
              w.message.parts.push({
                type: `tool-${K.toolName}`,
                toolCallId: K.toolCallId,
                state: K.state,
                input: R.input,
                output: R.output,
                rawInput: R.rawInput,
                errorText: R.errorText,
                providerExecuted: R.providerExecuted,
                preliminary: R.preliminary,
                ...(R.providerMetadata != null ? { callProviderMetadata: R.providerMetadata } : {}),
              });
          }
          function S(K) {
            var y;
            let x = w.message.parts.find((t) => t.type === "dynamic-tool" && t.toolCallId === K.toolCallId),
              R = K,
              g = x;
            if (x != null) {
              if (
                ((x.state = K.state),
                (g.toolName = K.toolName),
                (g.input = R.input),
                (g.output = R.output),
                (g.errorText = R.errorText),
                (g.rawInput = (y = R.rawInput) != null ? y : g.rawInput),
                (g.preliminary = R.preliminary),
                R.providerMetadata != null && x.state === "input-available")
              )
                x.callProviderMetadata = R.providerMetadata;
            } else
              w.message.parts.push({
                type: "dynamic-tool",
                toolName: K.toolName,
                toolCallId: K.toolCallId,
                state: K.state,
                input: R.input,
                output: R.output,
                errorText: R.errorText,
                preliminary: R.preliminary,
                ...(R.providerMetadata != null ? { callProviderMetadata: R.providerMetadata } : {}),
              });
          }
          async function T(K) {
            if (K != null) {
              let y = w.message.metadata != null ? b9(w.message.metadata, K) : K;
              if (U != null) await iz({ value: y, schema: U });
              w.message.metadata = y;
            }
          }
          switch (Q.type) {
            case "text-start": {
              let K = { type: "text", text: "", providerMetadata: Q.providerMetadata, state: "streaming" };
              ((w.activeTextParts[Q.id] = K), w.message.parts.push(K), N());
              break;
            }
            case "text-delta": {
              let K = w.activeTextParts[Q.id];
              ((K.text += Q.delta),
                (K.providerMetadata = (D = Q.providerMetadata) != null ? D : K.providerMetadata),
                N());
              break;
            }
            case "text-end": {
              let K = w.activeTextParts[Q.id];
              ((K.state = "done"),
                (K.providerMetadata = (H = Q.providerMetadata) != null ? H : K.providerMetadata),
                delete w.activeTextParts[Q.id],
                N());
              break;
            }
            case "reasoning-start": {
              let K = { type: "reasoning", text: "", providerMetadata: Q.providerMetadata, state: "streaming" };
              ((w.activeReasoningParts[Q.id] = K), w.message.parts.push(K), N());
              break;
            }
            case "reasoning-delta": {
              let K = w.activeReasoningParts[Q.id];
              ((K.text += Q.delta),
                (K.providerMetadata = (G = Q.providerMetadata) != null ? G : K.providerMetadata),
                N());
              break;
            }
            case "reasoning-end": {
              let K = w.activeReasoningParts[Q.id];
              ((K.providerMetadata = (q = Q.providerMetadata) != null ? q : K.providerMetadata),
                (K.state = "done"),
                delete w.activeReasoningParts[Q.id],
                N());
              break;
            }
            case "file": {
              (w.message.parts.push({ type: "file", mediaType: Q.mediaType, url: Q.url }), N());
              break;
            }
            case "source-url": {
              (w.message.parts.push({
                type: "source-url",
                sourceId: Q.sourceId,
                url: Q.url,
                title: Q.title,
                providerMetadata: Q.providerMetadata,
              }),
                N());
              break;
            }
            case "source-document": {
              (w.message.parts.push({
                type: "source-document",
                sourceId: Q.sourceId,
                mediaType: Q.mediaType,
                title: Q.title,
                filename: Q.filename,
                providerMetadata: Q.providerMetadata,
              }),
                N());
              break;
            }
            case "tool-input-start": {
              let K = w.message.parts.filter(_Q);
              if (
                ((w.partialToolCalls[Q.toolCallId] = {
                  text: "",
                  toolName: Q.toolName,
                  index: K.length,
                  dynamic: Q.dynamic,
                }),
                Q.dynamic)
              )
                S({ toolCallId: Q.toolCallId, toolName: Q.toolName, state: "input-streaming", input: void 0 });
              else
                L({
                  toolCallId: Q.toolCallId,
                  toolName: Q.toolName,
                  state: "input-streaming",
                  input: void 0,
                  providerExecuted: Q.providerExecuted,
                });
              N();
              break;
            }
            case "tool-input-delta": {
              let K = w.partialToolCalls[Q.toolCallId];
              K.text += Q.inputTextDelta;
              let { value: y } = await L9(K.text);
              if (K.dynamic) S({ toolCallId: Q.toolCallId, toolName: K.toolName, state: "input-streaming", input: y });
              else L({ toolCallId: Q.toolCallId, toolName: K.toolName, state: "input-streaming", input: y });
              N();
              break;
            }
            case "tool-input-available": {
              if (Q.dynamic)
                S({
                  toolCallId: Q.toolCallId,
                  toolName: Q.toolName,
                  state: "input-available",
                  input: Q.input,
                  providerMetadata: Q.providerMetadata,
                });
              else
                L({
                  toolCallId: Q.toolCallId,
                  toolName: Q.toolName,
                  state: "input-available",
                  input: Q.input,
                  providerExecuted: Q.providerExecuted,
                  providerMetadata: Q.providerMetadata,
                });
              if ((N(), J && !Q.providerExecuted)) await J({ toolCall: Q });
              break;
            }
            case "tool-input-error": {
              if (Q.dynamic)
                S({
                  toolCallId: Q.toolCallId,
                  toolName: Q.toolName,
                  state: "output-error",
                  input: Q.input,
                  errorText: Q.errorText,
                  providerMetadata: Q.providerMetadata,
                });
              else
                L({
                  toolCallId: Q.toolCallId,
                  toolName: Q.toolName,
                  state: "output-error",
                  input: void 0,
                  rawInput: Q.input,
                  errorText: Q.errorText,
                  providerExecuted: Q.providerExecuted,
                  providerMetadata: Q.providerMetadata,
                });
              N();
              break;
            }
            case "tool-output-available": {
              if (Q.dynamic) {
                let K = I(Q.toolCallId);
                S({
                  toolCallId: Q.toolCallId,
                  toolName: K.toolName,
                  state: "output-available",
                  input: K.input,
                  output: Q.output,
                  preliminary: Q.preliminary,
                });
              } else {
                let K = B(Q.toolCallId);
                L({
                  toolCallId: Q.toolCallId,
                  toolName: IG(K),
                  state: "output-available",
                  input: K.input,
                  output: Q.output,
                  providerExecuted: Q.providerExecuted,
                  preliminary: Q.preliminary,
                });
              }
              N();
              break;
            }
            case "tool-output-error": {
              if (Q.dynamic) {
                let K = I(Q.toolCallId);
                S({
                  toolCallId: Q.toolCallId,
                  toolName: K.toolName,
                  state: "output-error",
                  input: K.input,
                  errorText: Q.errorText,
                });
              } else {
                let K = B(Q.toolCallId);
                L({
                  toolCallId: Q.toolCallId,
                  toolName: IG(K),
                  state: "output-error",
                  input: K.input,
                  rawInput: K.rawInput,
                  errorText: Q.errorText,
                });
              }
              N();
              break;
            }
            case "start-step": {
              w.message.parts.push({ type: "step-start" });
              break;
            }
            case "finish-step": {
              ((w.activeTextParts = {}), (w.activeReasoningParts = {}));
              break;
            }
            case "start": {
              if (Q.messageId != null) w.message.id = Q.messageId;
              if ((await T(Q.messageMetadata), Q.messageId != null || Q.messageMetadata != null)) N();
              break;
            }
            case "finish": {
              if ((await T(Q.messageMetadata), Q.messageMetadata != null)) N();
              break;
            }
            case "message-metadata": {
              if ((await T(Q.messageMetadata), Q.messageMetadata != null)) N();
              break;
            }
            case "error": {
              z == null || z(Error(Q.errorText));
              break;
            }
            default:
              if (a8(Q)) {
                if ((v == null ? void 0 : v[Q.type]) != null) await iz({ value: Q.data, schema: v[Q.type] });
                let K = Q;
                if (K.transient) {
                  j == null || j(K);
                  break;
                }
                let y = K.id != null ? w.message.parts.find((x) => K.type === x.type && K.id === x.id) : void 0;
                if (y != null) y.data = K.data;
                else w.message.parts.push(K);
                (j == null || j(K), N());
              }
          }
          W.enqueue(Q);
        });
      },
    }),
  );
}
function UD({ messageId: $, originalMessages: U = [], onFinish: v, onError: X, stream: z }) {
  let J = U == null ? void 0 : U[U.length - 1];
  if ((J == null ? void 0 : J.role) !== "assistant") J = void 0;
  else $ = J.id;
  let j = !1,
    Q = z.pipeThrough(
      new TransformStream({
        transform(H, G) {
          if (H.type === "start") {
            let q = H;
            if (q.messageId == null && $ != null) q.messageId = $;
          }
          if (H.type === "abort") j = !0;
          G.enqueue(H);
        },
      }),
    );
  if (v == null) return Q;
  let W = e8({ lastMessage: J ? structuredClone(J) : void 0, messageId: $ != null ? $ : "" }),
    w = async (H) => {
      await H({ state: W, write: () => {} });
    },
    N = !1,
    D = async () => {
      if (N || !v) return;
      N = !0;
      let H = W.message.id === (J == null ? void 0 : J.id);
      await v({
        isAborted: j,
        isContinuation: H,
        responseMessage: W.message,
        messages: [...(H ? U.slice(0, -1) : U), W.message],
      });
    };
  return $D({ stream: Q, runUpdateMessageJob: w, onError: X }).pipeThrough(
    new TransformStream({
      transform(H, G) {
        G.enqueue(H);
      },
      async cancel() {
        await D();
      },
      async flush() {
        await D();
      },
    }),
  );
}
function zD({ response: $, status: U, statusText: v, headers: X, stream: z, consumeSseStream: J }) {
  let j = z.pipeThrough(new D9());
  if (J) {
    let [Q, W] = j.tee();
    ((j = Q), J({ stream: W }));
  }
  B9({
    response: $,
    status: U,
    statusText: v,
    headers: Object.fromEntries(LU(X, K9).entries()),
    stream: j.pipeThrough(new TextEncoderStream()),
  });
}
function HU($) {
  let U = $.pipeThrough(new TransformStream());
  return (
    (U[Symbol.asyncIterator] = function () {
      let v = this.getReader(),
        X = !1;
      async function z(J) {
        var j;
        X = !0;
        try {
          if (J) await ((j = v.cancel) == null ? void 0 : j.call(v));
        } finally {
          try {
            v.releaseLock();
          } catch (Q) {}
        }
      }
      return {
        async next() {
          if (X) return { done: !0, value: void 0 };
          let { done: J, value: j } = await v.read();
          if (J) return (await z(!0), { done: !0, value: void 0 });
          return { done: !1, value: j };
        },
        async return() {
          return (await z(!0), { done: !0, value: void 0 });
        },
        async throw(J) {
          throw (await z(!0), J);
        },
      };
    }),
    U
  );
}
async function vD({ stream: $, onError: U }) {
  let v = $.getReader();
  try {
    while (!0) {
      let { done: X } = await v.read();
      if (X) break;
    }
  } catch (X) {
    U == null || U(X);
  } finally {
    v.releaseLock();
  }
}
function VG() {
  let $, U;
  return {
    promise: new Promise((X, z) => {
      (($ = X), (U = z));
    }),
    resolve: $,
    reject: U,
  };
}
function XD() {
  let $ = [],
    U = null,
    v = !1,
    X = VG(),
    z = () => {
      ((v = !0), X.resolve(), $.forEach((j) => j.cancel()), ($ = []), U == null || U.close());
    },
    J = async () => {
      if (v && $.length === 0) {
        U == null || U.close();
        return;
      }
      if ($.length === 0) return ((X = VG()), await X.promise, J());
      try {
        let { value: j, done: Q } = await $[0].read();
        if (Q) {
          if (($.shift(), $.length > 0)) await J();
          else if (v) U == null || U.close();
        } else U == null || U.enqueue(j);
      } catch (j) {
        (U == null || U.error(j), $.shift(), z());
      }
    };
  return {
    stream: new ReadableStream({
      start(j) {
        U = j;
      },
      pull: J,
      async cancel() {
        for (let j of $) await j.cancel();
        (($ = []), (v = !0));
      },
    }),
    addStream: (j) => {
      if (v) throw Error("Cannot add inner stream: outer stream is closed");
      ($.push(j.getReader()), X.resolve());
    },
    close: () => {
      if (((v = !0), X.resolve(), $.length === 0)) U == null || U.close();
    },
    terminate: z,
  };
}
var $v = class {
  constructor() {
    ((this.status = { type: "pending" }), (this._resolve = void 0), (this._reject = void 0));
  }
  get promise() {
    if (this._promise) return this._promise;
    return (
      (this._promise = new Promise(($, U) => {
        if (this.status.type === "resolved") $(this.status.value);
        else if (this.status.type === "rejected") U(this.status.error);
        ((this._resolve = $), (this._reject = U));
      })),
      this._promise
    );
  }
  resolve($) {
    var U;
    if (((this.status = { type: "resolved", value: $ }), this._promise)) (U = this._resolve) == null || U.call(this, $);
  }
  reject($) {
    var U;
    if (((this.status = { type: "rejected", error: $ }), this._promise)) (U = this._reject) == null || U.call(this, $);
  }
};
function JD() {
  var $, U;
  return (U = ($ = globalThis == null ? void 0 : globalThis.performance) == null ? void 0 : $.now()) != null
    ? U
    : Date.now();
}
function jD({
  tools: $,
  generatorStream: U,
  tracer: v,
  telemetry: X,
  system: z,
  messages: J,
  abortSignal: j,
  repairToolCall: Q,
  experimental_context: W,
}) {
  let w = null,
    N = new ReadableStream({
      start(L) {
        w = L;
      },
    }),
    D = new Set(),
    H = new Map(),
    G = !1,
    q = void 0;
  function B() {
    if (G && D.size === 0) {
      if (q != null) w.enqueue(q);
      w.close();
    }
  }
  let I = new TransformStream({
    async transform(L, S) {
      let T = L.type;
      switch (T) {
        case "stream-start":
        case "text-start":
        case "text-delta":
        case "text-end":
        case "reasoning-start":
        case "reasoning-delta":
        case "reasoning-end":
        case "tool-input-start":
        case "tool-input-delta":
        case "tool-input-end":
        case "source":
        case "response-metadata":
        case "error":
        case "raw": {
          S.enqueue(L);
          break;
        }
        case "file": {
          S.enqueue({ type: "file", file: new c8({ data: L.data, mediaType: L.mediaType }) });
          break;
        }
        case "finish": {
          q = { type: "finish", finishReason: L.finishReason, usage: L.usage, providerMetadata: L.providerMetadata };
          break;
        }
        case "tool-call": {
          try {
            let K = await G9({ toolCall: L, tools: $, repairToolCall: Q, system: z, messages: J });
            if ((S.enqueue(K), K.invalid)) {
              w.enqueue({
                type: "tool-error",
                toolCallId: K.toolCallId,
                toolName: K.toolName,
                input: K.input,
                error: m4(K.error),
                dynamic: !0,
              });
              break;
            }
            let y = $[K.toolName];
            if ((H.set(K.toolCallId, K.input), y.onInputAvailable != null))
              await y.onInputAvailable({
                input: K.input,
                toolCallId: K.toolCallId,
                messages: J,
                abortSignal: j,
                experimental_context: W,
              });
            if (y.execute != null && K.providerExecuted !== !0) {
              let x = a6();
              (D.add(x),
                U4({
                  name: "ai.toolCall",
                  attributes: R$({
                    telemetry: X,
                    attributes: {
                      ...$4({ operationId: "ai.toolCall", telemetry: X }),
                      "ai.toolCall.name": K.toolName,
                      "ai.toolCall.id": K.toolCallId,
                      "ai.toolCall.args": { output: () => JSON.stringify(K.input) },
                    },
                  }),
                  tracer: v,
                  fn: async (R) => {
                    let g;
                    try {
                      let t = lz({
                        execute: y.execute.bind(y),
                        input: K.input,
                        options: { toolCallId: K.toolCallId, messages: J, abortSignal: j, experimental_context: W },
                      });
                      for await (let q$ of t)
                        if (
                          (w.enqueue({
                            ...K,
                            type: "tool-result",
                            output: q$.output,
                            ...(q$.type === "preliminary" && { preliminary: !0 }),
                          }),
                          q$.type === "final")
                        )
                          g = q$.output;
                    } catch (t) {
                      (hQ(R, t), w.enqueue({ ...K, type: "tool-error", error: t }), D.delete(x), B());
                      return;
                    }
                    (D.delete(x), B());
                    try {
                      R.setAttributes(
                        R$({ telemetry: X, attributes: { "ai.toolCall.result": { output: () => JSON.stringify(g) } } }),
                      );
                    } catch (t) {}
                  },
                }));
            }
          } catch (K) {
            w.enqueue({ type: "error", error: K });
          }
          break;
        }
        case "tool-result": {
          let K = L.toolName;
          if (L.isError)
            w.enqueue({
              type: "tool-error",
              toolCallId: L.toolCallId,
              toolName: K,
              input: H.get(L.toolCallId),
              providerExecuted: L.providerExecuted,
              error: L.result,
            });
          else
            S.enqueue({
              type: "tool-result",
              toolCallId: L.toolCallId,
              toolName: K,
              input: H.get(L.toolCallId),
              output: L.result,
              providerExecuted: L.providerExecuted,
            });
          break;
        }
        default:
          throw Error(`Unhandled chunk type: ${T}`);
      }
    },
    flush() {
      ((G = !0), B());
    },
  });
  return new ReadableStream({
    async start(L) {
      return Promise.all([
        U.pipeThrough(I).pipeTo(
          new WritableStream({
            write(S) {
              L.enqueue(S);
            },
            close() {},
          }),
        ),
        N.pipeTo(
          new WritableStream({
            write(S) {
              L.enqueue(S);
            },
            close() {
              L.close();
            },
          }),
        ),
      ]);
    },
  });
}
var QD = A6({ prefix: "aitxt", size: 24 });
function I9({
  model: $,
  tools: U,
  toolChoice: v,
  system: X,
  prompt: z,
  messages: J,
  maxRetries: j,
  abortSignal: Q,
  headers: W,
  stopWhen: w = q9(1),
  experimental_output: N,
  experimental_telemetry: D,
  prepareStep: H,
  providerOptions: G,
  experimental_activeTools: q,
  activeTools: B = q,
  experimental_repairToolCall: I,
  experimental_transform: L,
  experimental_download: S,
  includeRawChunks: T = !1,
  onChunk: K,
  onError: y = ({ error: a }) => {
    console.error(a);
  },
  onFinish: x,
  onAbort: R,
  onStepFinish: g,
  experimental_context: t,
  _internal: { now: q$ = JD, generateId: L$ = QD, currentDate: M$ = () => new Date() } = {},
  ...G$
}) {
  return new WD({
    model: BU($),
    telemetry: D,
    headers: W,
    settings: G$,
    maxRetries: j,
    abortSignal: Q,
    system: X,
    prompt: z,
    messages: J,
    tools: U,
    toolChoice: v,
    transforms: PQ(L),
    activeTools: B,
    repairToolCall: I,
    stopConditions: PQ(w),
    output: N,
    providerOptions: G,
    prepareStep: H,
    includeRawChunks: T,
    onChunk: K,
    onError: y,
    onFinish: x,
    onAbort: R,
    onStepFinish: g,
    now: q$,
    currentDate: M$,
    generateId: L$,
    experimental_context: t,
    download: S,
  });
}
function YD($) {
  if (!$)
    return new TransformStream({
      transform(j, Q) {
        Q.enqueue({ part: j, partialOutput: void 0 });
      },
    });
  let U = void 0,
    v = "",
    X = "",
    z = "";
  function J({ controller: j, partialOutput: Q = void 0 }) {
    (j.enqueue({ part: { type: "text-delta", id: U, text: X }, partialOutput: Q }), (X = ""));
  }
  return new TransformStream({
    async transform(j, Q) {
      if (j.type === "finish-step" && X.length > 0) J({ controller: Q });
      if (j.type !== "text-delta" && j.type !== "text-start" && j.type !== "text-end") {
        Q.enqueue({ part: j, partialOutput: void 0 });
        return;
      }
      if (U == null) U = j.id;
      else if (j.id !== U) {
        Q.enqueue({ part: j, partialOutput: void 0 });
        return;
      }
      if (j.type === "text-start") {
        Q.enqueue({ part: j, partialOutput: void 0 });
        return;
      }
      if (j.type === "text-end") {
        if (X.length > 0) J({ controller: Q });
        Q.enqueue({ part: j, partialOutput: void 0 });
        return;
      }
      ((v += j.text), (X += j.text));
      let W = await $.parsePartial({ text: v });
      if (W != null) {
        let w = JSON.stringify(W.partial);
        if (w !== z) (J({ controller: Q, partialOutput: W.partial }), (z = w));
      }
    },
  });
}
var WD = class {
  constructor({
    model: $,
    telemetry: U,
    headers: v,
    settings: X,
    maxRetries: z,
    abortSignal: J,
    system: j,
    prompt: Q,
    messages: W,
    tools: w,
    toolChoice: N,
    transforms: D,
    activeTools: H,
    repairToolCall: G,
    stopConditions: q,
    output: B,
    providerOptions: I,
    prepareStep: L,
    includeRawChunks: S,
    now: T,
    currentDate: K,
    generateId: y,
    onChunk: x,
    onError: R,
    onFinish: g,
    onAbort: t,
    onStepFinish: q$,
    experimental_context: L$,
    download: M$,
  }) {
    ((this._totalUsage = new $v()),
      (this._finishReason = new $v()),
      (this._steps = new $v()),
      (this.output = B),
      (this.includeRawChunks = S),
      (this.tools = w));
    let G$,
      a = [],
      I$ = [],
      H$ = void 0,
      h$ = void 0,
      z$ = {},
      V$ = [],
      r = [],
      v$,
      W$ = {},
      e$ = {},
      l$ = new TransformStream({
        async transform(J$, u) {
          var s, n, b$, z4;
          u.enqueue(J$);
          let { part: k } = J$;
          if (
            k.type === "text-delta" ||
            k.type === "reasoning-delta" ||
            k.type === "source" ||
            k.type === "tool-call" ||
            k.type === "tool-result" ||
            k.type === "tool-input-start" ||
            k.type === "tool-input-delta" ||
            k.type === "raw"
          )
            await (x == null ? void 0 : x({ chunk: k }));
          if (k.type === "error") await R({ error: xQ(k.error) });
          if (k.type === "text-start")
            ((W$[k.id] = { type: "text", text: "", providerMetadata: k.providerMetadata }), a.push(W$[k.id]));
          if (k.type === "text-delta") {
            let j$ = W$[k.id];
            if (j$ == null) {
              u.enqueue({ part: { type: "error", error: `text part ${k.id} not found` }, partialOutput: void 0 });
              return;
            }
            ((j$.text += k.text), (j$.providerMetadata = (s = k.providerMetadata) != null ? s : j$.providerMetadata));
          }
          if (k.type === "text-end") {
            let j$ = W$[k.id];
            if (j$ == null) {
              u.enqueue({ part: { type: "error", error: `text part ${k.id} not found` }, partialOutput: void 0 });
              return;
            }
            ((j$.providerMetadata = (n = k.providerMetadata) != null ? n : j$.providerMetadata), delete W$[k.id]);
          }
          if (k.type === "reasoning-start")
            ((e$[k.id] = { type: "reasoning", text: "", providerMetadata: k.providerMetadata }), a.push(e$[k.id]));
          if (k.type === "reasoning-delta") {
            let j$ = e$[k.id];
            if (j$ == null) {
              u.enqueue({ part: { type: "error", error: `reasoning part ${k.id} not found` }, partialOutput: void 0 });
              return;
            }
            ((j$.text += k.text), (j$.providerMetadata = (b$ = k.providerMetadata) != null ? b$ : j$.providerMetadata));
          }
          if (k.type === "reasoning-end") {
            let j$ = e$[k.id];
            if (j$ == null) {
              u.enqueue({ part: { type: "error", error: `reasoning part ${k.id} not found` }, partialOutput: void 0 });
              return;
            }
            ((j$.providerMetadata = (z4 = k.providerMetadata) != null ? z4 : j$.providerMetadata), delete e$[k.id]);
          }
          if (k.type === "file") a.push({ type: "file", file: k.file });
          if (k.type === "source") a.push(k);
          if (k.type === "tool-call") a.push(k);
          if (k.type === "tool-result" && !k.preliminary) a.push(k);
          if (k.type === "tool-error") a.push(k);
          if (k.type === "start-step") ((z$ = k.request), (V$ = k.warnings));
          if (k.type === "finish-step") {
            let j$ = RQ({ content: a, tools: w }),
              e = new N9({
                content: a,
                finishReason: k.finishReason,
                usage: k.usage,
                warnings: V$,
                request: z$,
                response: { ...k.response, messages: [...I$, ...j$] },
                providerMetadata: k.providerMetadata,
              });
            (await (q$ == null ? void 0 : q$(e)),
              kQ(V$),
              r.push(e),
              (a = []),
              (e$ = {}),
              (W$ = {}),
              I$.push(...j$),
              G$.resolve());
          }
          if (k.type === "finish") ((h$ = k.totalUsage), (H$ = k.finishReason));
        },
        async flush(J$) {
          try {
            if (r.length === 0) {
              let b$ = new eB({ message: "No output generated. Check the stream for errors." });
              (X$._finishReason.reject(b$), X$._totalUsage.reject(b$), X$._steps.reject(b$));
              return;
            }
            let u = H$ != null ? H$ : "unknown",
              s = h$ != null ? h$ : { inputTokens: void 0, outputTokens: void 0, totalTokens: void 0 };
            (X$._finishReason.resolve(u), X$._totalUsage.resolve(s), X$._steps.resolve(r));
            let n = r[r.length - 1];
            (await (g == null
              ? void 0
              : g({
                  finishReason: u,
                  totalUsage: s,
                  usage: n.usage,
                  content: n.content,
                  text: n.text,
                  reasoningText: n.reasoningText,
                  reasoning: n.reasoning,
                  files: n.files,
                  sources: n.sources,
                  toolCalls: n.toolCalls,
                  staticToolCalls: n.staticToolCalls,
                  dynamicToolCalls: n.dynamicToolCalls,
                  toolResults: n.toolResults,
                  staticToolResults: n.staticToolResults,
                  dynamicToolResults: n.dynamicToolResults,
                  request: n.request,
                  response: n.response,
                  warnings: n.warnings,
                  providerMetadata: n.providerMetadata,
                  steps: r,
                })),
              v$.setAttributes(
                R$({
                  telemetry: U,
                  attributes: {
                    "ai.response.finishReason": u,
                    "ai.response.text": { output: () => n.text },
                    "ai.response.toolCalls": {
                      output: () => {
                        var b$;
                        return ((b$ = n.toolCalls) == null ? void 0 : b$.length) ? JSON.stringify(n.toolCalls) : void 0;
                      },
                    },
                    "ai.response.providerMetadata": JSON.stringify(n.providerMetadata),
                    "ai.usage.inputTokens": s.inputTokens,
                    "ai.usage.outputTokens": s.outputTokens,
                    "ai.usage.totalTokens": s.totalTokens,
                    "ai.usage.reasoningTokens": s.reasoningTokens,
                    "ai.usage.cachedInputTokens": s.cachedInputTokens,
                  },
                }),
              ));
          } catch (u) {
            J$.error(u);
          } finally {
            v$.end();
          }
        },
      }),
      N6 = XD();
    ((this.addStream = N6.addStream), (this.closeStream = N6.close));
    let B$ = N6.stream.getReader(),
      X6 = new ReadableStream({
        async start(J$) {
          J$.enqueue({ type: "start" });
        },
        async pull(J$) {
          function u() {
            (t == null || t({ steps: r }), J$.enqueue({ type: "abort" }), J$.close());
          }
          try {
            let { done: s, value: n } = await B$.read();
            if (s) {
              J$.close();
              return;
            }
            if (J == null ? void 0 : J.aborted) {
              u();
              return;
            }
            J$.enqueue(n);
          } catch (s) {
            if (f6(s) && (J == null ? void 0 : J.aborted)) u();
            else J$.error(s);
          }
        },
        cancel(J$) {
          return N6.stream.cancel(J$);
        },
      });
    for (let J$ of D)
      X6 = X6.pipeThrough(
        J$({
          tools: w,
          stopStream() {
            N6.terminate();
          },
        }),
      );
    this.baseStream = X6.pipeThrough(YD(B)).pipeThrough(l$);
    let { maxRetries: q6, retry: m6 } = mQ({ maxRetries: z, abortSignal: J }),
      y$ = fQ(U),
      A$ = DU(X),
      m$ = gQ({ model: $, telemetry: U, headers: v, settings: { ...A$, maxRetries: q6 } }),
      X$ = this;
    U4({
      name: "ai.streamText",
      attributes: R$({
        telemetry: U,
        attributes: {
          ...$4({ operationId: "ai.streamText", telemetry: U }),
          ...m$,
          "ai.prompt": { input: () => JSON.stringify({ system: j, prompt: Q, messages: W }) },
        },
      }),
      tracer: y$,
      endWhenDone: !1,
      fn: async (J$) => {
        v$ = J$;
        async function u({ currentStep: s, responseMessages: n, usage: b$ }) {
          var z4, k, j$, e, O6;
          let o4 = X$.includeRawChunks;
          G$ = new $v();
          let t4 = await CQ({ system: j, prompt: Q, messages: W }),
            u6 = [...t4.messages, ...n],
            d$ = await (L == null ? void 0 : L({ model: $, steps: r, stepNumber: r.length, messages: u6 })),
            a4 = await TQ({
              prompt: {
                system: (z4 = d$ == null ? void 0 : d$.system) != null ? z4 : t4.system,
                messages: (k = d$ == null ? void 0 : d$.messages) != null ? k : u6,
              },
              supportedUrls: await $.supportedUrls,
              download: M$,
            }),
            c6 = BU((j$ = d$ == null ? void 0 : d$.model) != null ? j$ : $),
            { toolChoice: B4, tools: D4 } = X9({
              tools: w,
              toolChoice: (e = d$ == null ? void 0 : d$.toolChoice) != null ? e : N,
              activeTools: (O6 = d$ == null ? void 0 : d$.activeTools) != null ? O6 : H,
            }),
            {
              result: { stream: F$, response: F6, request: s4 },
              doStreamSpan: K4,
              startTimestampMs: cQ,
            } = await m6(() =>
              U4({
                name: "ai.streamText.doStream",
                attributes: R$({
                  telemetry: U,
                  attributes: {
                    ...$4({ operationId: "ai.streamText.doStream", telemetry: U }),
                    ...m$,
                    "ai.model.provider": c6.provider,
                    "ai.model.id": c6.modelId,
                    "ai.prompt.messages": { input: () => yQ(a4) },
                    "ai.prompt.tools": { input: () => (D4 == null ? void 0 : D4.map((f) => JSON.stringify(f))) },
                    "ai.prompt.toolChoice": { input: () => (B4 != null ? JSON.stringify(B4) : void 0) },
                    "gen_ai.system": c6.provider,
                    "gen_ai.request.model": c6.modelId,
                    "gen_ai.request.frequency_penalty": A$.frequencyPenalty,
                    "gen_ai.request.max_tokens": A$.maxOutputTokens,
                    "gen_ai.request.presence_penalty": A$.presencePenalty,
                    "gen_ai.request.stop_sequences": A$.stopSequences,
                    "gen_ai.request.temperature": A$.temperature,
                    "gen_ai.request.top_k": A$.topK,
                    "gen_ai.request.top_p": A$.topP,
                  },
                }),
                tracer: y$,
                endWhenDone: !1,
                fn: async (f) => {
                  return {
                    startTimestampMs: T(),
                    doStreamSpan: f,
                    result: await c6.doStream({
                      ...A$,
                      tools: D4,
                      toolChoice: B4,
                      responseFormat: B == null ? void 0 : B.responseFormat,
                      prompt: a4,
                      providerOptions: I,
                      abortSignal: J,
                      headers: v,
                      includeRawChunks: o4,
                    }),
                  };
                },
              }),
            ),
            F9 = jD({
              tools: w,
              generatorStream: F$,
              tracer: y$,
              telemetry: U,
              system: j,
              messages: u6,
              repairToolCall: G,
              abortSignal: J,
              experimental_context: L$,
            }),
            E9 = s4 != null ? s4 : {},
            IU = [],
            vv = [],
            Xv,
            Jv = {},
            b4 = "unknown",
            J6 = { inputTokens: void 0, outputTokens: void 0, totalTokens: void 0 },
            jv,
            iQ = !0,
            H6 = { id: y(), timestamp: K(), modelId: $.modelId },
            nQ = "";
          X$.addStream(
            F9.pipeThrough(
              new TransformStream({
                async transform(f, E$) {
                  var e4, $1, VU, E6;
                  if (f.type === "stream-start") {
                    Xv = f.warnings;
                    return;
                  }
                  if (iQ) {
                    let u$ = T() - cQ;
                    ((iQ = !1),
                      K4.addEvent("ai.stream.firstChunk", { "ai.response.msToFirstChunk": u$ }),
                      K4.setAttributes({ "ai.response.msToFirstChunk": u$ }),
                      E$.enqueue({ type: "start-step", request: E9, warnings: Xv != null ? Xv : [] }));
                  }
                  let lQ = f.type;
                  switch (lQ) {
                    case "text-start":
                    case "text-end": {
                      E$.enqueue(f);
                      break;
                    }
                    case "text-delta": {
                      if (f.delta.length > 0)
                        (E$.enqueue({
                          type: "text-delta",
                          id: f.id,
                          text: f.delta,
                          providerMetadata: f.providerMetadata,
                        }),
                          (nQ += f.delta));
                      break;
                    }
                    case "reasoning-start":
                    case "reasoning-end": {
                      E$.enqueue(f);
                      break;
                    }
                    case "reasoning-delta": {
                      E$.enqueue({
                        type: "reasoning-delta",
                        id: f.id,
                        text: f.delta,
                        providerMetadata: f.providerMetadata,
                      });
                      break;
                    }
                    case "tool-call": {
                      (E$.enqueue(f), IU.push(f));
                      break;
                    }
                    case "tool-result": {
                      if ((E$.enqueue(f), !f.preliminary)) vv.push(f);
                      break;
                    }
                    case "tool-error": {
                      (E$.enqueue(f), vv.push(f));
                      break;
                    }
                    case "response-metadata": {
                      H6 = {
                        id: (e4 = f.id) != null ? e4 : H6.id,
                        timestamp: ($1 = f.timestamp) != null ? $1 : H6.timestamp,
                        modelId: (VU = f.modelId) != null ? VU : H6.modelId,
                      };
                      break;
                    }
                    case "finish": {
                      ((J6 = f.usage), (b4 = f.finishReason), (jv = f.providerMetadata));
                      let u$ = T() - cQ;
                      (K4.addEvent("ai.stream.finish"),
                        K4.setAttributes({
                          "ai.response.msToFinish": u$,
                          "ai.response.avgOutputTokensPerSecond":
                            (1000 * ((E6 = J6.outputTokens) != null ? E6 : 0)) / u$,
                        }));
                      break;
                    }
                    case "file": {
                      E$.enqueue(f);
                      break;
                    }
                    case "source": {
                      E$.enqueue(f);
                      break;
                    }
                    case "tool-input-start": {
                      Jv[f.id] = f.toolName;
                      let u$ = w == null ? void 0 : w[f.toolName];
                      if ((u$ == null ? void 0 : u$.onInputStart) != null)
                        await u$.onInputStart({
                          toolCallId: f.id,
                          messages: u6,
                          abortSignal: J,
                          experimental_context: L$,
                        });
                      E$.enqueue({ ...f, dynamic: (u$ == null ? void 0 : u$.type) === "dynamic" });
                      break;
                    }
                    case "tool-input-end": {
                      (delete Jv[f.id], E$.enqueue(f));
                      break;
                    }
                    case "tool-input-delta": {
                      let u$ = Jv[f.id],
                        Qv = w == null ? void 0 : w[u$];
                      if ((Qv == null ? void 0 : Qv.onInputDelta) != null)
                        await Qv.onInputDelta({
                          inputTextDelta: f.delta,
                          toolCallId: f.id,
                          messages: u6,
                          abortSignal: J,
                          experimental_context: L$,
                        });
                      E$.enqueue(f);
                      break;
                    }
                    case "error": {
                      (E$.enqueue(f), (b4 = "error"));
                      break;
                    }
                    case "raw": {
                      if (o4) E$.enqueue(f);
                      break;
                    }
                    default:
                      throw Error(`Unknown chunk type: ${lQ}`);
                  }
                },
                async flush(f) {
                  let E$ = IU.length > 0 ? JSON.stringify(IU) : void 0;
                  try {
                    K4.setAttributes(
                      R$({
                        telemetry: U,
                        attributes: {
                          "ai.response.finishReason": b4,
                          "ai.response.text": { output: () => nQ },
                          "ai.response.toolCalls": { output: () => E$ },
                          "ai.response.id": H6.id,
                          "ai.response.model": H6.modelId,
                          "ai.response.timestamp": H6.timestamp.toISOString(),
                          "ai.response.providerMetadata": JSON.stringify(jv),
                          "ai.usage.inputTokens": J6.inputTokens,
                          "ai.usage.outputTokens": J6.outputTokens,
                          "ai.usage.totalTokens": J6.totalTokens,
                          "ai.usage.reasoningTokens": J6.reasoningTokens,
                          "ai.usage.cachedInputTokens": J6.cachedInputTokens,
                          "gen_ai.response.finish_reasons": [b4],
                          "gen_ai.response.id": H6.id,
                          "gen_ai.response.model": H6.modelId,
                          "gen_ai.usage.input_tokens": J6.inputTokens,
                          "gen_ai.usage.output_tokens": J6.outputTokens,
                        },
                      }),
                    );
                  } catch (E6) {
                  } finally {
                    K4.end();
                  }
                  f.enqueue({
                    type: "finish-step",
                    finishReason: b4,
                    usage: J6,
                    providerMetadata: jv,
                    response: { ...H6, headers: F6 == null ? void 0 : F6.headers },
                  });
                  let e4 = Y9(b$, J6);
                  await G$.promise;
                  let $1 = IU.filter((E6) => E6.providerExecuted !== !0),
                    VU = vv.filter((E6) => E6.providerExecuted !== !0);
                  if ($1.length > 0 && VU.length === $1.length && !(await O9({ stopConditions: q, steps: r }))) {
                    n.push(...RQ({ content: r[r.length - 1].content, tools: w }));
                    try {
                      await u({ currentStep: s + 1, responseMessages: n, usage: e4 });
                    } catch (E6) {
                      (f.enqueue({ type: "error", error: E6 }), X$.closeStream());
                    }
                  } else (f.enqueue({ type: "finish", finishReason: b4, totalUsage: e4 }), X$.closeStream());
                },
              }),
            ),
          );
        }
        await u({
          currentStep: 0,
          responseMessages: [],
          usage: { inputTokens: void 0, outputTokens: void 0, totalTokens: void 0 },
        });
      },
    }).catch((J$) => {
      (X$.addStream(
        new ReadableStream({
          start(u) {
            (u.enqueue({ type: "error", error: J$ }), u.close());
          },
        }),
      ),
        X$.closeStream());
    });
  }
  get steps() {
    return (this.consumeStream(), this._steps.promise);
  }
  get finalStep() {
    return this.steps.then(($) => $[$.length - 1]);
  }
  get content() {
    return this.finalStep.then(($) => $.content);
  }
  get warnings() {
    return this.finalStep.then(($) => $.warnings);
  }
  get providerMetadata() {
    return this.finalStep.then(($) => $.providerMetadata);
  }
  get text() {
    return this.finalStep.then(($) => $.text);
  }
  get reasoningText() {
    return this.finalStep.then(($) => $.reasoningText);
  }
  get reasoning() {
    return this.finalStep.then(($) => $.reasoning);
  }
  get sources() {
    return this.finalStep.then(($) => $.sources);
  }
  get files() {
    return this.finalStep.then(($) => $.files);
  }
  get toolCalls() {
    return this.finalStep.then(($) => $.toolCalls);
  }
  get staticToolCalls() {
    return this.finalStep.then(($) => $.staticToolCalls);
  }
  get dynamicToolCalls() {
    return this.finalStep.then(($) => $.dynamicToolCalls);
  }
  get toolResults() {
    return this.finalStep.then(($) => $.toolResults);
  }
  get staticToolResults() {
    return this.finalStep.then(($) => $.staticToolResults);
  }
  get dynamicToolResults() {
    return this.finalStep.then(($) => $.dynamicToolResults);
  }
  get usage() {
    return this.finalStep.then(($) => $.usage);
  }
  get request() {
    return this.finalStep.then(($) => $.request);
  }
  get response() {
    return this.finalStep.then(($) => $.response);
  }
  get totalUsage() {
    return (this.consumeStream(), this._totalUsage.promise);
  }
  get finishReason() {
    return (this.consumeStream(), this._finishReason.promise);
  }
  teeStream() {
    let [$, U] = this.baseStream.tee();
    return ((this.baseStream = U), $);
  }
  get textStream() {
    return HU(
      this.teeStream().pipeThrough(
        new TransformStream({
          transform({ part: $ }, U) {
            if ($.type === "text-delta") U.enqueue($.text);
          },
        }),
      ),
    );
  }
  get fullStream() {
    return HU(
      this.teeStream().pipeThrough(
        new TransformStream({
          transform({ part: $ }, U) {
            U.enqueue($);
          },
        }),
      ),
    );
  }
  async consumeStream($) {
    var U;
    try {
      await vD({ stream: this.fullStream, onError: $ == null ? void 0 : $.onError });
    } catch (v) {
      (U = $ == null ? void 0 : $.onError) == null || U.call($, v);
    }
  }
  get experimental_partialOutputStream() {
    if (this.output == null) throw new MG();
    return HU(
      this.teeStream().pipeThrough(
        new TransformStream({
          transform({ partialOutput: $ }, U) {
            if ($ != null) U.enqueue($);
          },
        }),
      ),
    );
  }
  toUIMessageStream({
    originalMessages: $,
    generateMessageId: U,
    onFinish: v,
    messageMetadata: X,
    sendReasoning: z = !0,
    sendSources: J = !1,
    sendStart: j = !0,
    sendFinish: Q = !0,
    onError: W = B6,
  } = {}) {
    let w = U != null ? t8({ originalMessages: $, responseMessageId: U }) : void 0,
      N = {},
      D = (G) => {
        var q, B;
        let I = N[G];
        return ((B = (q = this.tools) == null ? void 0 : q[I]) == null ? void 0 : B.type) === "dynamic" ? !0 : void 0;
      },
      H = this.fullStream.pipeThrough(
        new TransformStream({
          transform: async (G, q) => {
            let B = X == null ? void 0 : X({ part: G }),
              I = G.type;
            switch (I) {
              case "text-start": {
                q.enqueue({
                  type: "text-start",
                  id: G.id,
                  ...(G.providerMetadata != null ? { providerMetadata: G.providerMetadata } : {}),
                });
                break;
              }
              case "text-delta": {
                q.enqueue({
                  type: "text-delta",
                  id: G.id,
                  delta: G.text,
                  ...(G.providerMetadata != null ? { providerMetadata: G.providerMetadata } : {}),
                });
                break;
              }
              case "text-end": {
                q.enqueue({
                  type: "text-end",
                  id: G.id,
                  ...(G.providerMetadata != null ? { providerMetadata: G.providerMetadata } : {}),
                });
                break;
              }
              case "reasoning-start": {
                q.enqueue({
                  type: "reasoning-start",
                  id: G.id,
                  ...(G.providerMetadata != null ? { providerMetadata: G.providerMetadata } : {}),
                });
                break;
              }
              case "reasoning-delta": {
                if (z)
                  q.enqueue({
                    type: "reasoning-delta",
                    id: G.id,
                    delta: G.text,
                    ...(G.providerMetadata != null ? { providerMetadata: G.providerMetadata } : {}),
                  });
                break;
              }
              case "reasoning-end": {
                q.enqueue({
                  type: "reasoning-end",
                  id: G.id,
                  ...(G.providerMetadata != null ? { providerMetadata: G.providerMetadata } : {}),
                });
                break;
              }
              case "file": {
                q.enqueue({
                  type: "file",
                  mediaType: G.file.mediaType,
                  url: `data:${G.file.mediaType};base64,${G.file.base64}`,
                });
                break;
              }
              case "source": {
                if (J && G.sourceType === "url")
                  q.enqueue({
                    type: "source-url",
                    sourceId: G.id,
                    url: G.url,
                    title: G.title,
                    ...(G.providerMetadata != null ? { providerMetadata: G.providerMetadata } : {}),
                  });
                if (J && G.sourceType === "document")
                  q.enqueue({
                    type: "source-document",
                    sourceId: G.id,
                    mediaType: G.mediaType,
                    title: G.title,
                    filename: G.filename,
                    ...(G.providerMetadata != null ? { providerMetadata: G.providerMetadata } : {}),
                  });
                break;
              }
              case "tool-input-start": {
                N[G.id] = G.toolName;
                let L = D(G.id);
                q.enqueue({
                  type: "tool-input-start",
                  toolCallId: G.id,
                  toolName: G.toolName,
                  ...(G.providerExecuted != null ? { providerExecuted: G.providerExecuted } : {}),
                  ...(L != null ? { dynamic: L } : {}),
                });
                break;
              }
              case "tool-input-delta": {
                q.enqueue({ type: "tool-input-delta", toolCallId: G.id, inputTextDelta: G.delta });
                break;
              }
              case "tool-call": {
                N[G.toolCallId] = G.toolName;
                let L = D(G.toolCallId);
                if (G.invalid)
                  q.enqueue({
                    type: "tool-input-error",
                    toolCallId: G.toolCallId,
                    toolName: G.toolName,
                    input: G.input,
                    ...(G.providerExecuted != null ? { providerExecuted: G.providerExecuted } : {}),
                    ...(G.providerMetadata != null ? { providerMetadata: G.providerMetadata } : {}),
                    ...(L != null ? { dynamic: L } : {}),
                    errorText: W(G.error),
                  });
                else
                  q.enqueue({
                    type: "tool-input-available",
                    toolCallId: G.toolCallId,
                    toolName: G.toolName,
                    input: G.input,
                    ...(G.providerExecuted != null ? { providerExecuted: G.providerExecuted } : {}),
                    ...(G.providerMetadata != null ? { providerMetadata: G.providerMetadata } : {}),
                    ...(L != null ? { dynamic: L } : {}),
                  });
                break;
              }
              case "tool-result": {
                let L = D(G.toolCallId);
                q.enqueue({
                  type: "tool-output-available",
                  toolCallId: G.toolCallId,
                  output: G.output,
                  ...(G.providerExecuted != null ? { providerExecuted: G.providerExecuted } : {}),
                  ...(G.preliminary != null ? { preliminary: G.preliminary } : {}),
                  ...(L != null ? { dynamic: L } : {}),
                });
                break;
              }
              case "tool-error": {
                let L = D(G.toolCallId);
                q.enqueue({
                  type: "tool-output-error",
                  toolCallId: G.toolCallId,
                  errorText: W(G.error),
                  ...(G.providerExecuted != null ? { providerExecuted: G.providerExecuted } : {}),
                  ...(L != null ? { dynamic: L } : {}),
                });
                break;
              }
              case "error": {
                q.enqueue({ type: "error", errorText: W(G.error) });
                break;
              }
              case "start-step": {
                q.enqueue({ type: "start-step" });
                break;
              }
              case "finish-step": {
                q.enqueue({ type: "finish-step" });
                break;
              }
              case "start": {
                if (j)
                  q.enqueue({
                    type: "start",
                    ...(B != null ? { messageMetadata: B } : {}),
                    ...(w != null ? { messageId: w } : {}),
                  });
                break;
              }
              case "finish": {
                if (Q) q.enqueue({ type: "finish", ...(B != null ? { messageMetadata: B } : {}) });
                break;
              }
              case "abort": {
                q.enqueue(G);
                break;
              }
              case "tool-input-end":
                break;
              case "raw":
                break;
              default:
                throw Error(`Unknown chunk type: ${I}`);
            }
            if (B != null && I !== "start" && I !== "finish")
              q.enqueue({ type: "message-metadata", messageMetadata: B });
          },
        }),
      );
    return HU(
      UD({
        stream: H,
        messageId: w != null ? w : U == null ? void 0 : U(),
        originalMessages: $,
        onFinish: v,
        onError: W,
      }),
    );
  }
  pipeUIMessageStreamToResponse(
    $,
    {
      originalMessages: U,
      generateMessageId: v,
      onFinish: X,
      messageMetadata: z,
      sendReasoning: J,
      sendSources: j,
      sendFinish: Q,
      sendStart: W,
      onError: w,
      ...N
    } = {},
  ) {
    zD({
      response: $,
      stream: this.toUIMessageStream({
        originalMessages: U,
        generateMessageId: v,
        onFinish: X,
        messageMetadata: z,
        sendReasoning: J,
        sendSources: j,
        sendFinish: Q,
        sendStart: W,
        onError: w,
      }),
      ...N,
    });
  }
  pipeTextStreamToResponse($, U) {
    r8({ response: $, textStream: this.textStream, ...U });
  }
  toUIMessageStreamResponse({
    originalMessages: $,
    generateMessageId: U,
    onFinish: v,
    messageMetadata: X,
    sendReasoning: z,
    sendSources: J,
    sendFinish: j,
    sendStart: Q,
    onError: W,
    ...w
  } = {}) {
    return o8({
      stream: this.toUIMessageStream({
        originalMessages: $,
        generateMessageId: U,
        onFinish: v,
        messageMetadata: X,
        sendReasoning: z,
        sendSources: J,
        sendFinish: j,
        sendStart: Q,
        onError: W,
      }),
      ...w,
    });
  }
  toTextStreamResponse($) {
    return p8({ textStream: this.textStream, ...$ });
  }
};
function wD($) {
  let U = $.filter((v) => v.type === "reasoning");
  return U.length === 0
    ? void 0
    : U.map((v) => v.text).join(`
`);
}
var GD = {
    type: "no-schema",
    jsonSchema: void 0,
    async validatePartialResult({ value: $, textDelta: U }) {
      return { success: !0, value: { partial: $, textDelta: U } };
    },
    async validateFinalResult($, U) {
      return $ === void 0
        ? {
            success: !1,
            error: new H4({
              message: "No object generated: response did not match schema.",
              text: U.text,
              response: U.response,
              usage: U.usage,
              finishReason: U.finishReason,
            }),
          }
        : { success: !0, value: $ };
    },
    createElementStream() {
      throw new j6({ functionality: "element streams in no-schema mode" });
    },
  },
  ND = ($) => ({
    type: "object",
    jsonSchema: $.jsonSchema,
    async validatePartialResult({ value: U, textDelta: v }) {
      return { success: !0, value: { partial: U, textDelta: v } };
    },
    async validateFinalResult(U) {
      return a$({ value: U, schema: $ });
    },
    createElementStream() {
      throw new j6({ functionality: "element streams in object mode" });
    },
  }),
  qD = ($) => {
    let { $schema: U, ...v } = $.jsonSchema;
    return {
      type: "enum",
      jsonSchema: {
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
        properties: { elements: { type: "array", items: v } },
        required: ["elements"],
        additionalProperties: !1,
      },
      async validatePartialResult({ value: X, latestObject: z, isFirstDelta: J, isFinalDelta: j }) {
        var Q;
        if (!U1(X) || !Wv(X.elements))
          return {
            success: !1,
            error: new _$({ value: X, cause: "value must be an object that contains an array of elements" }),
          };
        let W = X.elements,
          w = [];
        for (let H = 0; H < W.length; H++) {
          let G = W[H],
            q = await a$({ value: G, schema: $ });
          if (H === W.length - 1 && !j) continue;
          if (!q.success) return q;
          w.push(q.value);
        }
        let N = (Q = z == null ? void 0 : z.length) != null ? Q : 0,
          D = "";
        if (J) D += "[";
        if (N > 0) D += ",";
        if (
          ((D += w
            .slice(N)
            .map((H) => JSON.stringify(H))
            .join(",")),
          j)
        )
          D += "]";
        return { success: !0, value: { partial: w, textDelta: D } };
      },
      async validateFinalResult(X) {
        if (!U1(X) || !Wv(X.elements))
          return {
            success: !1,
            error: new _$({ value: X, cause: "value must be an object that contains an array of elements" }),
          };
        let z = X.elements;
        for (let J of z) {
          let j = await a$({ value: J, schema: $ });
          if (!j.success) return j;
        }
        return { success: !0, value: z };
      },
      createElementStream(X) {
        let z = 0;
        return HU(
          X.pipeThrough(
            new TransformStream({
              transform(J, j) {
                switch (J.type) {
                  case "object": {
                    let Q = J.object;
                    for (; z < Q.length; z++) j.enqueue(Q[z]);
                    break;
                  }
                  case "text-delta":
                  case "finish":
                  case "error":
                    break;
                  default:
                    throw Error(`Unsupported chunk type: ${J}`);
                }
              },
            }),
          ),
        );
      },
    };
  },
  OD = ($) => {
    return {
      type: "enum",
      jsonSchema: {
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
        properties: { result: { type: "string", enum: $ } },
        required: ["result"],
        additionalProperties: !1,
      },
      async validateFinalResult(U) {
        if (!U1(U) || typeof U.result !== "string")
          return {
            success: !1,
            error: new _$({
              value: U,
              cause: 'value must be an object that contains a string in the "result" property.',
            }),
          };
        let v = U.result;
        return $.includes(v)
          ? { success: !0, value: v }
          : { success: !1, error: new _$({ value: U, cause: "value must be a string in the enum" }) };
      },
      async validatePartialResult({ value: U, textDelta: v }) {
        if (!U1(U) || typeof U.result !== "string")
          return {
            success: !1,
            error: new _$({
              value: U,
              cause: 'value must be an object that contains a string in the "result" property.',
            }),
          };
        let X = U.result,
          z = $.filter((J) => J.startsWith(X));
        if (U.result.length === 0 || z.length === 0)
          return { success: !1, error: new _$({ value: U, cause: "value must be a string in the enum" }) };
        return { success: !0, value: { partial: z.length > 1 ? X : z[0], textDelta: v } };
      },
      createElementStream() {
        throw new j6({ functionality: "element streams in enum mode" });
      },
    };
  };
function HD({ output: $, schema: U, enumValues: v }) {
  switch ($) {
    case "object":
      return ND(G6(U));
    case "array":
      return qD(G6(U));
    case "enum":
      return OD(v);
    case "no-schema":
      return GD;
    default:
      throw Error(`Unsupported output: ${$}`);
  }
}
async function AG($, U, v) {
  let X = await v6({ text: $ });
  if (!X.success)
    throw new H4({
      message: "No object generated: could not parse the response.",
      cause: X.error,
      text: $,
      response: v.response,
      usage: v.usage,
      finishReason: v.finishReason,
    });
  let z = await U.validateFinalResult(X.value, { text: $, response: v.response, usage: v.usage });
  if (!z.success)
    throw new H4({
      message: "No object generated: response did not match schema.",
      cause: z.error,
      text: $,
      response: v.response,
      usage: v.usage,
      finishReason: v.finishReason,
    });
  return z.value;
}
async function BD($, U, v, X) {
  try {
    return await AG($, U, X);
  } catch (z) {
    if (v != null && H4.isInstance(z) && (X4.isInstance(z.cause) || _$.isInstance(z.cause))) {
      let J = await v({ text: $, error: z.cause });
      if (J === null) throw z;
      return await AG(J, U, X);
    }
    throw z;
  }
}
function DD({ output: $, schema: U, schemaName: v, schemaDescription: X, enumValues: z }) {
  if ($ != null && $ !== "object" && $ !== "array" && $ !== "enum" && $ !== "no-schema")
    throw new w$({ parameter: "output", value: $, message: "Invalid output type." });
  if ($ === "no-schema") {
    if (U != null)
      throw new w$({ parameter: "schema", value: U, message: "Schema is not supported for no-schema output." });
    if (X != null)
      throw new w$({
        parameter: "schemaDescription",
        value: X,
        message: "Schema description is not supported for no-schema output.",
      });
    if (v != null)
      throw new w$({
        parameter: "schemaName",
        value: v,
        message: "Schema name is not supported for no-schema output.",
      });
    if (z != null)
      throw new w$({
        parameter: "enumValues",
        value: z,
        message: "Enum values are not supported for no-schema output.",
      });
  }
  if ($ === "object") {
    if (U == null) throw new w$({ parameter: "schema", value: U, message: "Schema is required for object output." });
    if (z != null)
      throw new w$({ parameter: "enumValues", value: z, message: "Enum values are not supported for object output." });
  }
  if ($ === "array") {
    if (U == null)
      throw new w$({ parameter: "schema", value: U, message: "Element schema is required for array output." });
    if (z != null)
      throw new w$({ parameter: "enumValues", value: z, message: "Enum values are not supported for array output." });
  }
  if ($ === "enum") {
    if (U != null) throw new w$({ parameter: "schema", value: U, message: "Schema is not supported for enum output." });
    if (X != null)
      throw new w$({
        parameter: "schemaDescription",
        value: X,
        message: "Schema description is not supported for enum output.",
      });
    if (v != null)
      throw new w$({ parameter: "schemaName", value: v, message: "Schema name is not supported for enum output." });
    if (z == null)
      throw new w$({ parameter: "enumValues", value: z, message: "Enum values are required for enum output." });
    for (let J of z)
      if (typeof J !== "string")
        throw new w$({ parameter: "enumValues", value: J, message: "Enum values must be strings." });
  }
}
var KD = A6({ prefix: "aiobj", size: 24 });
async function V9($) {
  let {
      model: U,
      output: v = "object",
      system: X,
      prompt: z,
      messages: J,
      maxRetries: j,
      abortSignal: Q,
      headers: W,
      experimental_repairText: w,
      experimental_telemetry: N,
      experimental_download: D,
      providerOptions: H,
      _internal: { generateId: G = KD, currentDate: q = () => new Date() } = {},
      ...B
    } = $,
    I = BU(U),
    L = "enum" in $ ? $.enum : void 0,
    { schema: S, schemaDescription: T, schemaName: K } = "schema" in $ ? $ : {};
  DD({ output: v, schema: S, schemaName: K, schemaDescription: T, enumValues: L });
  let { maxRetries: y, retry: x } = mQ({ maxRetries: j, abortSignal: Q }),
    R = HD({ output: v, schema: S, enumValues: L }),
    g = DU(B),
    t = z6(W != null ? W : {}, `ai/${ZQ}`),
    q$ = gQ({ model: I, telemetry: N, headers: t, settings: { ...g, maxRetries: y } }),
    L$ = fQ(N);
  try {
    return await U4({
      name: "ai.generateObject",
      attributes: R$({
        telemetry: N,
        attributes: {
          ...$4({ operationId: "ai.generateObject", telemetry: N }),
          ...q$,
          "ai.prompt": { input: () => JSON.stringify({ system: X, prompt: z, messages: J }) },
          "ai.schema": R.jsonSchema != null ? { input: () => JSON.stringify(R.jsonSchema) } : void 0,
          "ai.schema.name": K,
          "ai.schema.description": T,
          "ai.settings.output": R.type,
        },
      }),
      tracer: L$,
      fn: async (M$) => {
        var G$;
        let a,
          I$,
          H$,
          h$,
          z$,
          V$,
          r,
          v$,
          W$ = await CQ({ system: X, prompt: z, messages: J }),
          e$ = await TQ({ prompt: W$, supportedUrls: await I.supportedUrls, download: D }),
          l$ = await x(() =>
            U4({
              name: "ai.generateObject.doGenerate",
              attributes: R$({
                telemetry: N,
                attributes: {
                  ...$4({ operationId: "ai.generateObject.doGenerate", telemetry: N }),
                  ...q$,
                  "ai.prompt.messages": { input: () => yQ(e$) },
                  "gen_ai.system": I.provider,
                  "gen_ai.request.model": I.modelId,
                  "gen_ai.request.frequency_penalty": g.frequencyPenalty,
                  "gen_ai.request.max_tokens": g.maxOutputTokens,
                  "gen_ai.request.presence_penalty": g.presencePenalty,
                  "gen_ai.request.temperature": g.temperature,
                  "gen_ai.request.top_k": g.topK,
                  "gen_ai.request.top_p": g.topP,
                },
              }),
              tracer: L$,
              fn: async (B$) => {
                var X6, q6, m6, y$, A$, m$, X$, J$;
                let u = await I.doGenerate({
                    responseFormat: { type: "json", schema: R.jsonSchema, name: K, description: T },
                    ...DU(B),
                    prompt: e$,
                    providerOptions: H,
                    abortSignal: Q,
                    headers: t,
                  }),
                  s = {
                    id: (q6 = (X6 = u.response) == null ? void 0 : X6.id) != null ? q6 : G(),
                    timestamp: (y$ = (m6 = u.response) == null ? void 0 : m6.timestamp) != null ? y$ : q(),
                    modelId: (m$ = (A$ = u.response) == null ? void 0 : A$.modelId) != null ? m$ : I.modelId,
                    headers: (X$ = u.response) == null ? void 0 : X$.headers,
                    body: (J$ = u.response) == null ? void 0 : J$.body,
                  },
                  n = SQ(u.content),
                  b$ = wD(u.content);
                if (n === void 0)
                  throw new H4({
                    message: "No object generated: the model did not return a response.",
                    response: s,
                    usage: u.usage,
                    finishReason: u.finishReason,
                  });
                return (
                  B$.setAttributes(
                    R$({
                      telemetry: N,
                      attributes: {
                        "ai.response.finishReason": u.finishReason,
                        "ai.response.object": { output: () => n },
                        "ai.response.id": s.id,
                        "ai.response.model": s.modelId,
                        "ai.response.timestamp": s.timestamp.toISOString(),
                        "ai.response.providerMetadata": JSON.stringify(u.providerMetadata),
                        "ai.usage.promptTokens": u.usage.inputTokens,
                        "ai.usage.completionTokens": u.usage.outputTokens,
                        "gen_ai.response.finish_reasons": [u.finishReason],
                        "gen_ai.response.id": s.id,
                        "gen_ai.response.model": s.modelId,
                        "gen_ai.usage.input_tokens": u.usage.inputTokens,
                        "gen_ai.usage.output_tokens": u.usage.outputTokens,
                      },
                    }),
                  ),
                  { ...u, objectText: n, reasoning: b$, responseData: s }
                );
              },
            }),
          );
        ((a = l$.objectText),
          (I$ = l$.finishReason),
          (H$ = l$.usage),
          (h$ = l$.warnings),
          (r = l$.providerMetadata),
          (V$ = (G$ = l$.request) != null ? G$ : {}),
          (z$ = l$.responseData),
          (v$ = l$.reasoning),
          kQ(h$));
        let N6 = await BD(a, R, w, { response: z$, usage: H$, finishReason: I$ });
        return (
          M$.setAttributes(
            R$({
              telemetry: N,
              attributes: {
                "ai.response.finishReason": I$,
                "ai.response.object": { output: () => JSON.stringify(N6) },
                "ai.response.providerMetadata": JSON.stringify(r),
                "ai.usage.promptTokens": H$.inputTokens,
                "ai.usage.completionTokens": H$.outputTokens,
              },
            }),
          ),
          new bD({
            object: N6,
            reasoning: v$,
            finishReason: I$,
            usage: H$,
            warnings: h$,
            request: V$,
            response: z$,
            providerMetadata: r,
          })
        );
      },
    });
  } catch (M$) {
    throw xQ(M$);
  }
}
var bD = class {
  constructor($) {
    ((this.object = $.object),
      (this.finishReason = $.finishReason),
      (this.usage = $.usage),
      (this.warnings = $.warnings),
      (this.providerMetadata = $.providerMetadata),
      (this.response = $.response),
      (this.request = $.request),
      (this.reasoning = $.reasoning));
  }
  toJsonResponse($) {
    var U;
    return new Response(JSON.stringify(this.object), {
      status: (U = $ == null ? void 0 : $.status) != null ? U : 200,
      headers: LU($ == null ? void 0 : $.headers, { "content-type": "application/json; charset=utf-8" }),
    });
  }
};
var aA = A6({ prefix: "aiobj", size: 24 });
var LD = {};
TB(LD, { object: () => VD, text: () => ID });
var ID = () => ({
    type: "text",
    responseFormat: { type: "text" },
    async parsePartial({ text: $ }) {
      return { partial: $ };
    },
    async parseOutput({ text: $ }) {
      return $;
    },
  }),
  VD = ({ schema: $ }) => {
    let U = G6($);
    return {
      type: "object",
      responseFormat: { type: "json", schema: U.jsonSchema },
      async parsePartial({ text: v }) {
        let X = await L9(v);
        switch (X.state) {
          case "failed-parse":
          case "undefined-input":
            return;
          case "repaired-parse":
          case "successful-parse":
            return { partial: X.value };
          default: {
            let z = X.state;
            throw Error(`Unsupported parse state: ${z}`);
          }
        }
      },
      async parseOutput({ text: v }, X) {
        let z = await v6({ text: v });
        if (!z.success)
          throw new H4({
            message: "No object generated: could not parse the response.",
            cause: z.error,
            text: v,
            response: X.response,
            usage: X.usage,
            finishReason: X.finishReason,
          });
        let J = await a$({ value: z.value, schema: U });
        if (!J.success)
          throw new H4({
            message: "No object generated: response did not match schema.",
            cause: J.error,
            text: v,
            response: X.response,
            usage: X.usage,
            finishReason: X.finishReason,
          });
        return J.value;
      },
    };
  };
var AD = "AI_NoSuchProviderError",
  FD = `vercel.ai.error.${AD}`,
  ED = Symbol.for(FD),
  _D;
_D = ED;
var MD = Y.looseObject({ name: Y.string(), version: Y.string() }),
  uQ = Y.looseObject({ _meta: Y.optional(Y.object({}).loose()) }),
  bU = uQ,
  PD = Y.object({ method: Y.string(), params: Y.optional(uQ) }),
  SD = Y.looseObject({
    experimental: Y.optional(Y.object({}).loose()),
    logging: Y.optional(Y.object({}).loose()),
    prompts: Y.optional(Y.looseObject({ listChanged: Y.optional(Y.boolean()) })),
    resources: Y.optional(Y.looseObject({ subscribe: Y.optional(Y.boolean()), listChanged: Y.optional(Y.boolean()) })),
    tools: Y.optional(Y.looseObject({ listChanged: Y.optional(Y.boolean()) })),
  }),
  UF = bU.extend({
    protocolVersion: Y.string(),
    capabilities: SD,
    serverInfo: MD,
    instructions: Y.optional(Y.string()),
  }),
  RD = bU.extend({ nextCursor: Y.optional(Y.string()) }),
  kD = Y.object({
    name: Y.string(),
    description: Y.optional(Y.string()),
    inputSchema: Y.object({ type: Y.literal("object"), properties: Y.optional(Y.object({}).loose()) }).loose(),
  }).loose(),
  zF = RD.extend({ tools: Y.array(kD) }),
  ZD = Y.object({ type: Y.literal("text"), text: Y.string() }).loose(),
  TD = Y.object({ type: Y.literal("image"), data: Y.base64(), mimeType: Y.string() }).loose(),
  A9 = Y.object({ uri: Y.string(), mimeType: Y.optional(Y.string()) }).loose(),
  CD = A9.extend({ text: Y.string() }),
  xD = A9.extend({ blob: Y.base64() }),
  gD = Y.object({ type: Y.literal("resource"), resource: Y.union([CD, xD]) }).loose(),
  vF = bU
    .extend({ content: Y.array(Y.union([ZD, TD, gD])), isError: Y.boolean().default(!1).optional() })
    .or(bU.extend({ toolResult: Y.unknown() })),
  Uv = "2.0",
  fD = Y.object({ jsonrpc: Y.literal(Uv), id: Y.union([Y.string(), Y.number().int()]) })
    .merge(PD)
    .strict(),
  hD = Y.object({ jsonrpc: Y.literal(Uv), id: Y.union([Y.string(), Y.number().int()]), result: bU }).strict(),
  yD = Y.object({
    jsonrpc: Y.literal(Uv),
    id: Y.union([Y.string(), Y.number().int()]),
    error: Y.object({ code: Y.number().int(), message: Y.string(), data: Y.optional(Y.unknown()) }),
  }).strict(),
  mD = Y.object({ jsonrpc: Y.literal(Uv) })
    .merge(Y.object({ method: Y.string(), params: Y.optional(uQ) }))
    .strict(),
  XF = Y.union([fD, mD, hD, yD]);
var uD = Y.object({
    type: Y.literal("text"),
    text: Y.string(),
    state: Y.enum(["streaming", "done"]).optional(),
    providerMetadata: o.optional(),
  }),
  cD = Y.object({
    type: Y.literal("reasoning"),
    text: Y.string(),
    state: Y.enum(["streaming", "done"]).optional(),
    providerMetadata: o.optional(),
  }),
  iD = Y.object({
    type: Y.literal("source-url"),
    sourceId: Y.string(),
    url: Y.string(),
    title: Y.string().optional(),
    providerMetadata: o.optional(),
  }),
  nD = Y.object({
    type: Y.literal("source-document"),
    sourceId: Y.string(),
    mediaType: Y.string(),
    title: Y.string(),
    filename: Y.string().optional(),
    providerMetadata: o.optional(),
  }),
  lD = Y.object({
    type: Y.literal("file"),
    mediaType: Y.string(),
    filename: Y.string().optional(),
    url: Y.string(),
    providerMetadata: o.optional(),
  }),
  dD = Y.object({ type: Y.literal("step-start") }),
  pD = Y.object({ type: Y.string().startsWith("data-"), id: Y.string().optional(), data: Y.unknown() }),
  rD = [
    Y.object({
      type: Y.literal("dynamic-tool"),
      toolName: Y.string(),
      toolCallId: Y.string(),
      state: Y.literal("input-streaming"),
      input: Y.unknown().optional(),
      output: Y.never().optional(),
      errorText: Y.never().optional(),
    }),
    Y.object({
      type: Y.literal("dynamic-tool"),
      toolName: Y.string(),
      toolCallId: Y.string(),
      state: Y.literal("input-available"),
      input: Y.unknown(),
      output: Y.never().optional(),
      errorText: Y.never().optional(),
      callProviderMetadata: o.optional(),
    }),
    Y.object({
      type: Y.literal("dynamic-tool"),
      toolName: Y.string(),
      toolCallId: Y.string(),
      state: Y.literal("output-available"),
      input: Y.unknown(),
      output: Y.unknown(),
      errorText: Y.never().optional(),
      callProviderMetadata: o.optional(),
      preliminary: Y.boolean().optional(),
    }),
    Y.object({
      type: Y.literal("dynamic-tool"),
      toolName: Y.string(),
      toolCallId: Y.string(),
      state: Y.literal("output-error"),
      input: Y.unknown(),
      output: Y.never().optional(),
      errorText: Y.string(),
      callProviderMetadata: o.optional(),
    }),
  ],
  oD = [
    Y.object({
      type: Y.string().startsWith("tool-"),
      toolCallId: Y.string(),
      state: Y.literal("input-streaming"),
      providerExecuted: Y.boolean().optional(),
      input: Y.unknown().optional(),
      output: Y.never().optional(),
      errorText: Y.never().optional(),
    }),
    Y.object({
      type: Y.string().startsWith("tool-"),
      toolCallId: Y.string(),
      state: Y.literal("input-available"),
      providerExecuted: Y.boolean().optional(),
      input: Y.unknown(),
      output: Y.never().optional(),
      errorText: Y.never().optional(),
      callProviderMetadata: o.optional(),
    }),
    Y.object({
      type: Y.string().startsWith("tool-"),
      toolCallId: Y.string(),
      state: Y.literal("output-available"),
      providerExecuted: Y.boolean().optional(),
      input: Y.unknown(),
      output: Y.unknown(),
      errorText: Y.never().optional(),
      callProviderMetadata: o.optional(),
      preliminary: Y.boolean().optional(),
    }),
    Y.object({
      type: Y.string().startsWith("tool-"),
      toolCallId: Y.string(),
      state: Y.literal("output-error"),
      providerExecuted: Y.boolean().optional(),
      input: Y.unknown(),
      output: Y.never().optional(),
      errorText: Y.string(),
      callProviderMetadata: o.optional(),
    }),
  ],
  jF = Y.object({
    id: Y.string(),
    role: Y.enum(["system", "user", "assistant"]),
    metadata: Y.unknown().optional(),
    parts: Y.array(Y.union([uD, cD, iD, nD, lD, dD, pD, ...rD, ...oD])),
  });
var tD = Iw({ baseURL: "http://localhost:1234/v1", name: "lmsutdio" });
class zv extends EventTarget {
  _model;
  _topK;
  _temperature;
  _inputUsage = 0;
  _inputQuota = 1e6;
  _conversationHistory = [];
  constructor($, U) {
    super();
    if (
      ((this._model = $),
      (this._topK = U?.topK ?? 20),
      (this._temperature = U?.temperature ?? 0.7),
      "initialPrompts" in (U || {}))
    ) {
      let v = U;
      if (v?.initialPrompts) this._conversationHistory = this.convertInitialPromptsToMessages(v.initialPrompts);
    }
  }
  static create($) {
    return Promise.resolve(new zv(tD("qwen/qwen3-32b"), $));
  }
  static availability() {
    try {
      return Promise.resolve("downloadable");
    } catch {
      return Promise.resolve("unavailable");
    }
  }
  static params() {
    return Promise.resolve({ defaultTopK: 20, maxTopK: 100, defaultTemperature: 0.7, maxTemperature: 2 });
  }
  async prompt($, U) {
    if (!$) throw Error("Input cannot be empty");
    try {
      this.checkQuota();
      let v = this.convertPromptToMessages($);
      if (v.length === 0) throw Error("No valid messages to process");
      if (U?.responseConstraint) {
        let X = c4(U.responseConstraint),
          z = await V9({
            model: this._model,
            messages: v,
            schema: X,
            temperature: this._temperature,
            topK: this._topK,
            abortSignal: U?.signal,
          }),
          J = JSON.stringify(z.object);
        return (this.updateUsageAndHistory($, J), J);
      } else {
        let X = await H9({
          model: this._model,
          messages: v,
          temperature: this._temperature,
          topK: this._topK,
          abortSignal: U?.signal,
        });
        return (this.updateUsageAndHistory($, X.text), X.text);
      }
    } catch (v) {
      if (v instanceof Error) {
        if (v.name === "AbortError") throw v;
        if (v.message.includes("quota") || v.message.includes("limit")) this.dispatchQuotaOverflowEvent();
      }
      throw Error(`Failed to generate response: ${v instanceof Error ? v.message : v}`);
    }
  }
  promptStreaming($, U) {
    if (!$) throw Error("Input cannot be empty");
    let v = this.convertPromptToMessages($);
    if (v.length === 0) throw Error("No valid messages to process");
    let X = this;
    return new ReadableStream({
      async start(z) {
        try {
          X.checkQuota();
          let J = I9({
              model: X._model,
              messages: v,
              temperature: X._temperature,
              topK: X._topK,
              abortSignal: U?.signal,
            }),
            j = "";
          try {
            for await (let Q of J.textStream) ((j += Q), z.enqueue(Q));
            (X.updateUsageAndHistory($, j), z.close());
          } catch (Q) {
            if (Q instanceof Error && Q.name === "AbortError") {
              z.error(Q);
              return;
            }
            z.error(Error(`Stream error: ${Q instanceof Error ? Q.message : Q}`));
          }
        } catch (J) {
          if (J instanceof Error) {
            if (J.name === "AbortError") {
              z.error(J);
              return;
            }
            if (J.message.includes("quota") || J.message.includes("limit")) X.dispatchQuotaOverflowEvent();
          }
          z.error(Error(`Failed to start stream: ${J instanceof Error ? J.message : J}`));
        }
      },
    });
  }
  async append($) {
    if (!$) throw Error("Input cannot be empty");
    try {
      let v = this.convertPromptToMessages($).slice(this._conversationHistory.length);
      this._conversationHistory.push(...v);
      let X = await this.measureInputUsage($);
      this._inputUsage += X;
      return;
    } catch (U) {
      if (U instanceof Error && U.name === "AbortError") throw U;
      throw Error(`Failed to append input: ${U instanceof Error ? U.message : U}`);
    }
  }
  measureInputUsage($, U) {
    let v = this.convertPromptToMessages($),
      X = 0;
    for (let z of v) {
      let J = Math.ceil(z.content.length / 4),
        j = Math.ceil(z.role.length / 4);
      X += J + j + 2;
    }
    if (U?.responseConstraint) {
      let z = Math.ceil(JSON.stringify(U.responseConstraint).length / 4);
      X += z;
    }
    return Promise.resolve(X);
  }
  get inputUsage() {
    return this._inputUsage;
  }
  get inputQuota() {
    return this._inputQuota;
  }
  onquotaoverflow = null;
  get topK() {
    return this._topK;
  }
  get temperature() {
    return this._temperature;
  }
  clone() {
    let $ = new zv(this._model, { topK: this._topK, temperature: this._temperature });
    return (
      ($._conversationHistory = [...this._conversationHistory]),
      ($._inputUsage = this._inputUsage),
      ($._inputQuota = this._inputQuota),
      Promise.resolve($)
    );
  }
  destroy() {
    ((this._conversationHistory = []), (this._inputUsage = 0), this.removeAllListeners());
    return;
  }
  convertPromptToMessages($) {
    if (typeof $ === "string") return [...this._conversationHistory, { role: "user", content: $ }];
    let U = [...this._conversationHistory];
    for (let v of $) {
      let X = "";
      if (typeof v.content === "string") X = v.content;
      else
        X = v.content
          .map((J) => {
            if (J.type === "text" && typeof J.value === "string") return J.value;
            return `[${J.type}]`;
          })
          .join(" ");
      let z = v.role === "user" ? "user" : v.role === "assistant" ? "assistant" : "system";
      U.push({ role: z, content: X });
    }
    return U;
  }
  updateUsageAndHistory($, U) {
    let v = Math.ceil((typeof $ === "string" ? $.length : JSON.stringify($).length) / 4),
      X = Math.ceil(U.length / 4);
    if (((this._inputUsage += v + X), typeof $ === "string"))
      this._conversationHistory.push({ role: "user", content: $ });
    else
      $.forEach((z) => {
        let J = typeof z.content === "string" ? z.content : JSON.stringify(z.content),
          j = z.role === "user" ? "user" : z.role === "assistant" ? "assistant" : "system";
        this._conversationHistory.push({ role: j, content: J });
      });
    if ((this._conversationHistory.push({ role: "assistant", content: U }), this._inputUsage > this._inputQuota))
      this.dispatchQuotaOverflowEvent();
  }
  checkQuota() {
    if (this._inputUsage >= this._inputQuota) throw Error("Input quota exceeded");
  }
  dispatchQuotaOverflowEvent() {
    let $ = new Event("quotaoverflow");
    if ((this.dispatchEvent($), this.onquotaoverflow)) this.onquotaoverflow.call(this, $);
  }
  convertInitialPromptsToMessages($) {
    let U = [];
    for (let v of $) {
      let X = "";
      if (typeof v.content === "string") X = v.content;
      else
        X = v.content
          .map((J) => {
            if (J.type === "text" && typeof J.value === "string") return J.value;
            return `[${J.type}]`;
          })
          .join(" ");
      let z = v.role === "user" ? "user" : v.role === "assistant" ? "assistant" : "system";
      U.push({ role: z, content: X });
    }
    return U;
  }
  removeAllListeners() {
    this.onquotaoverflow = null;
  }
}
function aD() {
  if (!window.LanguageModel) ((window.LanguageModel = zv), console.log("Prompt API polyfill loaded successfully"));
}
aD();
