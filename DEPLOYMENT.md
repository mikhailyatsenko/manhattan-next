# Деплой на Vercel

## Подготовка

Проект настроен для работы с Google Sheets API для получения цен.

## Шаги для деплоя на Vercel

### 1. Подключение репозитория

1. Зайдите на [vercel.com](https://vercel.com)
2. Нажмите "Add New Project"
3. Импортируйте ваш Git репозиторий

### 2. Настройка переменных окружения

**Важно!** Добавьте переменную окружения `GOOGLE_SHEETS_CREDENTIALS` в настройках проекта на Vercel:

1. В настройках проекта перейдите в **Settings** → **Environment Variables**
2. Добавьте новую переменную:
   - **Name**: `GOOGLE_SHEETS_CREDENTIALS`
   - **Value**: Скопируйте **полное содержимое** файла `manhattan-487210-5ef58e0a375e.json`
   - **Environment**: Production, Preview, Development

**Как получить значение:**
```bash
# Выполните эту команду в терминале (в корне проекта):
cat manhattan-487210-5ef58e0a375e.json | tr -d '\n'
```

Скопируйте весь вывод и вставьте в Value на Vercel.

**Пример значения (весь JSON в одну строку):**
```json
{"type":"service_account","project_id":"manhattan-487210","private_key":"-----BEGIN PRIVATE KEY-----\nMIIE...","client_email":"sheets-price@manhattan-487210.iam.gserviceaccount.com",...}
```

### 3. Деплой

После добавления переменной окружения:

1. Нажмите **Deploy**
2. Vercel автоматически соберет и задеплоит проект

### 4. Проверка

После деплоя проверьте:
- Главную страницу
- API endpoint: `https://your-domain.vercel.app/api/prices`

## Как это работает

1. **Google Sheets** - данные хранятся в таблице: 
   - https://docs.google.com/spreadsheets/d/14StsbfQBd_b1Hk75bbRpzpfJ6lvvWdVkUz3_tO3xuYE/edit

2. **API Route** (`/api/prices`) - получает данные из Google Sheets каждые 5 минут (кеширование)

3. **Компонент Prices** - отображает данные, полученные через API

4. **Fallback** - если Google Sheets недоступен, используются локальные данные из `prices_json/prices.json`

## Обновление цен

Чтобы обновить цены:
1. Откройте Google Таблицу
2. Отредактируйте данные (можно добавлять информацию в колонку `additionalInfo`)
3. Цены обновятся автоматически в течение 5 минут

## Локальная разработка

Просто запустите dev сервер:
```bash
npm install
npm run dev
```

Credentials для локальной разработки находятся в файле `manhattan-487210-5ef58e0a375e.json` (он в `.gitignore`).

**Важно:** Если у вас нет этого файла, попросите его у владельца проекта или создайте свой Service Account в Google Cloud Console.

## Безопасность

⚠️ **Важно**: 
- Файл `manhattan-487210-5ef58e0a375e.json` добавлен в `.gitignore` и **не должен** попадать в Git!
- Для Vercel используйте переменную окружения `GOOGLE_SHEETS_CREDENTIALS` (см. выше)
