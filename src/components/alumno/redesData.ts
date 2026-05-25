export type PracticaRedItem = {
  readonly key: string
  /** Clave i18n: practica | practica6y7 */
  readonly titleKey: 'practica' | 'practica6y7'
  readonly titleNum?: number
  readonly previews: readonly string[]
}

const preview = (fileId: string) =>
  `https://drive.google.com/file/d/${fileId}/preview`

export const REDES_1_PRACTICAS: readonly PracticaRedItem[] = [
  {
    key: 'r1-p1',
    titleKey: 'practica',
    titleNum: 1,
    previews: [
      preview('1T3oUF7pGVdJTny5YWjbmbkiWyS7doZm8'),
      preview('1jDMULVdkKYPj515XWs4PnQMCnKntripx'),
    ],
  },
  {
    key: 'r1-p2',
    titleKey: 'practica',
    titleNum: 2,
    previews: [
      preview('1CC8xRzVwZ1kL_X3lTRUXzt8RuD2HYSg0'),
      preview('1P8zp95-P-JdXxUHBeYjj3A4y7xEdQ9yd'),
    ],
  },
  {
    key: 'r1-p3',
    titleKey: 'practica',
    titleNum: 3,
    previews: [
      preview('1ZAICYz_vMdrLD00GNIUz0wrcjhJG-ixx'),
      preview('1ygoA9PFBwk99g6RvXiaOzie4meyi7b4i'),
    ],
  },
  {
    key: 'r1-p4',
    titleKey: 'practica',
    titleNum: 4,
    previews: [
      preview('1wXET7QqxIPklv4A5U7ZcvE8gWurNswFa'),
      preview('1q-jKAOQiwUZ-fweVbSvW0qx8zJ7oEVWN'),
    ],
  },
  {
    key: 'r1-p5',
    titleKey: 'practica',
    titleNum: 5,
    previews: [
      preview('10oCGuWABNrCQSVQw4ob_6N9fhGAj1TNr'),
      preview('1jp6cKCZ3boUv_J3Kbfh6JAy7c1f1MKDi'),
    ],
  },
  {
    key: 'r1-p6y7',
    titleKey: 'practica6y7',
    previews: [
      preview('1_I6pQK-9KsYGvB5uW1TBckkEbnLel18B'),
      preview('1cy772-M3YM0PSffh7UVpfJnQUpY2Mlmj'),
    ],
  },
  {
    key: 'r1-p8',
    titleKey: 'practica',
    titleNum: 8,
    previews: [preview('1m47luVsugOh70AOmhaJqic0SqkogOBqi')],
  },
]

export const REDES_2_PRACTICAS: readonly PracticaRedItem[] = [
  {
    key: 'r2-p1',
    titleKey: 'practica',
    titleNum: 1,
    previews: [
      preview('1N2vmXT72TROCjpZGo3rSy6QpwqluEFnj'),
      preview('19crEJ3pE7sPoTcBNOF_cDFesQJ0amRVf'),
    ],
  },
  {
    key: 'r2-p2',
    titleKey: 'practica',
    titleNum: 2,
    previews: [
      preview('1m-4UKI5009KOUgmx3CTNiSdNjKBJSZLI'),
      preview('1w_VmJLHLmzCUWWkRClaLuXHX9aFwPlB3'),
    ],
  },
  {
    key: 'r2-p3',
    titleKey: 'practica',
    titleNum: 3,
    previews: [
      preview('1pEBwnM3EHntpIXZpZaQu53YGVQ5XdEDi'),
      preview('1uhONzaH8COwxmWTTjIhHjbNoSjkgepYW'),
      preview('1j4ZPtO8E2G4ahTay_oZWUF3mXE6A04jS'),
    ],
  },
  {
    key: 'r2-p4',
    titleKey: 'practica',
    titleNum: 4,
    previews: [
      preview('1Qg-GitofzAxbubvLHqtf3zOUL2PQTFU6'),
      preview('1fTzn2uaO4UsawnxpLO6gJs0Md1odtZI2'),
    ],
  },
]

export const PRACTICAS_POR_RED = {
  redes1: REDES_1_PRACTICAS,
  redes2: REDES_2_PRACTICAS,
} as const
