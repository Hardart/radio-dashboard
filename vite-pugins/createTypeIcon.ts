import { Plugin } from 'vite'
import * as fs from 'fs'
import * as path from 'path'

export default function generateIconsPlugin(): Plugin {
  return {
    name: 'vite-plugin-generate-icons',

    // Хук для получения корневого пути проекта
    configResolved(config) {
      const rootDir = config.root // Корневая директория проекта

      // Путь к директории с иконками
      const iconsDir = path.resolve(rootDir, 'src/assets/icons')

      // Путь к файлу, куда будем записывать типы
      const outputDir = path.resolve(rootDir, 'src/shared/types')
      const outputFile = path.resolve(outputDir, 'Icon.ts')

      console.log('Генерация списка иконок...')

      // Проверяем существование папки с иконками
      if (!fs.existsSync(iconsDir)) {
        console.warn(`Папка с иконками не найдена: ${iconsDir}`)
        return
      }

      // Читаем список файлов в папке
      const icons = fs.readdirSync(iconsDir).filter((file) => {
        // Оставляем только файлы с расширением .svg
        return path.extname(file) === '.svg'
      })

      // Генерируем типы для иконок
      const types = icons.map((icon) => {
        // Удаляем расширение .svg из названия иконки
        return `\n  | '${path.basename(icon, '.svg')}'`
      })

      // Создаем содержимое файла с типами
      const fileContent = `export type Icon = ${types.join('')}`

      fs.mkdirSync(outputDir, { recursive: true })

      // Записываем в файл shared/types/Icon.ts
      fs.writeFileSync(outputFile, fileContent)
      console.log(`Файл с типом Icon создан`)
    },
  }
}
