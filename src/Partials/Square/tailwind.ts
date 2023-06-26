interface TailwindParams {
  active: boolean
}

export class Tailwind {
  private static base: string = 'w-12 h-12 flex justify-center items-center'
  private static decor: string = 'text-xl border border-stone-400'

  static className(params: TailwindParams): string {
    return `${this.base} ${this.decor} ${params.active ? 'bg-stone-300' : ''}`
  }
}
