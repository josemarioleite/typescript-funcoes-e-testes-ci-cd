import { isValid } from 'date-fns'

export function verificarSeEhObjeto (valor: any): boolean {
  return valor !== null && (typeof valor === 'object' || typeof valor === 'function')
}

export function verificaString (param: any): boolean {
  if (typeof param === 'string') {
    return true
  }
  
  if (typeof param === 'object' && Object.prototype.toString.call(param) === '[object String]') {
    return true
  }

  return false
}

export function verificaSeADataEhCorreta (parametro: any): boolean {
  return isValid(new Date(parametro))
}

export function validarCPF (cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '')

  if (cpf === '') {
    return false
  }

  let adicionar = 0

  for (let i = 0; i < 9; i++) {
    adicionar += parseInt(cpf.charAt(i)) * (10 - i)
  }

  let restoDivisao = 11 - (adicionar % 11)

  if (restoDivisao === 10 || restoDivisao === 11) {
    restoDivisao = 0
  }

  adicionar = 0

  for (let i = 0; i < 10; i++) {
    adicionar += parseInt(cpf.charAt(i), 10) * (11 - i)
  }

  restoDivisao = 11 - (adicionar % 11)

  if (restoDivisao !== parseInt(cpf.charAt(10), 10)) {
    return false
  }

  return true
}

export function converterTempoParaFloat (tempo: string): number {
  if (tempo.includes('h')) {
    const horas: number = parseInt(tempo.slice(0, -3))
    const minutos: number = parseInt(tempo.slice(-3, -1))

    return horas + (minutos / 100)
  } else {
    const horas: number = parseInt(tempo.slice(0, 2))
    const minutos: number = parseInt(tempo.slice(3, 5))

    return horas + (minutos / 60)
  }
}

export function faixaEntre(inicio: number, fim: number): number[] {
  if (!Number.isInteger(inicio) || !Number.isInteger(fim)) {
    throw new Error('A função faixa recebeu parâmetros inválidos')
  }

  const tamanho = fim - inicio + 1
  return Array.from({ length: tamanho }, (_, index) => inicio + index)
}

export enum StatusHTTP {
  OK = 200,
  NaoAutorizado = 401,
  Proibido = 403,
  NaoEncontrado = 404,
}

export function tratarRespostaHTTP(status: StatusHTTP, dados: any): any {
  switch (status) {
    case StatusHTTP.OK:
      return { sucesso: true, dados }
    case StatusHTTP.NaoAutorizado:
      return { sucesso: false, erro: 'Não autorizado' }
    case StatusHTTP.Proibido:
      return { sucesso: false, erro: 'Acesso proibido' }
    case StatusHTTP.NaoEncontrado:
      return { sucesso: false, erro: 'Recurso não encontrado' }
    default:
      throw new Error('Status HTTP desconhecido')
  }
}