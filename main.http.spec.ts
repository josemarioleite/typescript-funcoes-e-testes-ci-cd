import { tratarRespostaHTTP, StatusHTTP } from './main-utils'

describe('tratarRespostaHTTP', () => {
  test('deve retornar objeto de sucesso para status OK', () => {
    const status = StatusHTTP.OK
    const dados = { mensagem: 'Dados recebidos' }
    const resposta = tratarRespostaHTTP(status, dados)

    expect(resposta).toEqual({ sucesso: true, dados })
  })

  test('deve retornar objeto de erro para status Não Autorizado', () => {
    const status = StatusHTTP.NaoAutorizado
    const resposta = tratarRespostaHTTP(status, null)

    expect(resposta).toEqual({ sucesso: false, erro: 'Não autorizado' })
  })

  test('deve retornar objeto de erro para status Proibido', () => {
    const status = StatusHTTP.Proibido
    const resposta = tratarRespostaHTTP(status, null)

    expect(resposta).toEqual({ sucesso: false, erro: 'Acesso proibido' })
  })

  test('deve retornar objeto de erro para status Não Encontrado', () => {
    const status = StatusHTTP.NaoEncontrado
    const resposta = tratarRespostaHTTP(status, null)

    expect(resposta).toEqual({ sucesso: false, erro: 'Recurso não encontrado' })
  })
})
