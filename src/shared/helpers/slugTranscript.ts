const alphavite: { [key: string]: string } = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'e',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'j',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'kh',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ы: 'y',
  ь: '',
  ъ: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
}

const transcript = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/ь([е])/gm, 'y$1')
    .split('')
    .map((l) => {
      return l in alphavite ? alphavite[l] : l
    })
    .join('')
    .replace(/[^-a-zA-Z0-9 ]/gm, '')
    .replace(/\s+/gm, '-')

export default transcript
