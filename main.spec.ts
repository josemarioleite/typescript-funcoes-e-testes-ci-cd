import { gerarHTML } from './main-views'
import {
  verificarSeEhObjeto,
  verificaString,
  verificaSeADataEhCorreta,
  validarCPF,
  converterTempoParaFloat,
  faixaEntre
} from './main-utils'

describe('verificarSeEhObjeto', () => {
  it('deve retornar true para um objeto', () => {
    const objeto = { chave: 'valor' }
    expect(verificarSeEhObjeto(objeto)).toBe(true)
  })

  it('deve retornar true para uma função', () => {
    const funcao = () => {}
    expect(verificarSeEhObjeto(funcao)).toBe(true)
  })

  it('deve retornar false para null', () => {
    expect(verificarSeEhObjeto(null)).toBe(false)
  })

  it('deve retornar false para um número', () => {
    expect(verificarSeEhObjeto(42)).toBe(false)
  })

  it('deve retornar false para uma string', () => {
    expect(verificarSeEhObjeto('teste')).toBe(false)
  })

  it('deve retornar false para undefined', () => {
    expect(verificarSeEhObjeto(undefined)).toBe(false)
  })
})

describe('verificaString', () => {
  it('deve retornar true para strings válidas', () => {
    expect(verificaString('Olá, mundo!')).toBe(true)
    expect(verificaString(new String('Olá, mundo!'))).toBe(true)
  })

  it('deve retornar false para valores inválidos', () => {
    expect(verificaString(123)).toBe(false)
    expect(verificaString(null)).toBe(false)
    expect(verificaString(undefined)).toBe(false)
    expect(verificaString({})).toBe(false)
    expect(verificaString([])).toBe(false)
    expect(verificaString(true)).toBe(false)
    expect(verificaString(false)).toBe(false)
  })

  it('deve retornar true para a terceira condição', () => {
    const strObject = new String('Hello, world!')
    expect(verificaString(strObject)).toBe(true)
  })
})

describe('verificaSeADataEhCorreta', () => {
  it('deve retornar true para datas válidas', () => {
    expect(verificaSeADataEhCorreta('2024-03-20')).toBe(true)
    expect(verificaSeADataEhCorreta(new Date())).toBe(true)
  })

  it('deve retornar false para datas inválidas', () => {
    expect(verificaSeADataEhCorreta('2024-13-01')).toBe(false)
    expect(verificaSeADataEhCorreta('Não é uma data válida')).toBe(false)
  })
})

describe('Teste da função validarCPF', () => {
  it('Deve retornar true para CPF válido', () => {
    expect(validarCPF('529.982.247-25')).toBe(true)
  })

  it('Deve retornar false para CPF inválido', () => {
    expect(validarCPF('123.456.789-00')).toBe(false)
  })

  it('Deve retornar false para CPF com formato inválido', () => {
    expect(validarCPF('12345678900')).toBe(false)
  })

  it('Deve retornar false para CPF vazio', () => {
    expect(validarCPF('')).toBe(false)
  })

  it('Deve retornar false para CPF contendo caracteres não numéricos', () => {
    expect(validarCPF('123.456.789-0a')).toBe(false)
  })

  it('Deve retornar false para digito verificador inválido (posição 9)', () => {
    expect(validarCPF('529.982.247-26')).toBe(false)
  })
})

describe('generateHTML function', () => {
  it('deve gerar HTML com a tag e conteúdo correto', () => {
    const expectedHTML = '<div>Hello World</div>'

    expect(gerarHTML()).toBe(expectedHTML)
  })
})

describe('converterTempoParaFloat', () => {
  it('deve converter corretamente o tempo no formato "hh:mmh" para um valor de ponto flutuante', () => {
    expect(converterTempoParaFloat('1:30h')).toBe(1.3)
    expect(converterTempoParaFloat('2:45h')).toBe(2.45)
  })

  it('deve converter corretamente o tempo no formato "hh:mm" para um valor de ponto flutuante', () => {
    expect(converterTempoParaFloat('01:30')).toBe(1.5)
    expect(converterTempoParaFloat('12:15')).toBe(12.25)
  })
})

describe('função faixa', () => {
  it('deve gerar uma faixa de números de 1 a 5', () => {
    expect(faixaEntre(1, 5)).toEqual([1, 2, 3, 4, 5])
  })

  it('deve gerar uma faixa de números de -3 a 3', () => {
    expect(faixaEntre(-3, 3)).toEqual([-3, -2, -1, 0, 1, 2, 3])
  })

  it('deve lançar um erro se um dos parâmetros não for um número inteiro', () => {
    expect(() => { faixaEntre(1.5, 5) }).toThrow('A função faixa recebeu parâmetros inválidos')
  })
})