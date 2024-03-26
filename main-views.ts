interface HTMLElement {
  tag: string
  content: string
}

function criarElementoHTML(tag: string, content: string): Partial<HTMLElement> {
  return { tag, content }
}

export function gerarHTML(): string {
  const element: Partial<HTMLElement> = criarElementoHTML('div', 'Hello World')

  return `<${element.tag}>${element.content}</${element.tag}>`
}