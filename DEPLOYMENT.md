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
   - **Value**: Скопируйте **полное содержимое** JSON с credentials из вашего `.env` файла
   - **Environment**: Production, Preview, Development

**Как получить значение:**
```bash
# Выполните эту команду в терминале (в корне проекта):
grep GOOGLE_SHEETS_CREDENTIALS .env | cut -d '=' -f 2-
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

1. Создайте файл `.env` в корне проекта (он в `.gitignore`):
```bash
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"manhattan-487210",...}
```

2. Запустите dev сервер:
```bash
npm install
npm run dev
```

**Важно:** Если у вас нет credentials, попросите их у владельца проекта или создайте свой Service Account в Google Cloud Console.

## Безопасность

⚠️ **Важно**: 
- Файл `.env` добавлен в `.gitignore` и **не должен** попадать в Git!
- Для Vercel используйте переменную окружения `GOOGLE_SHEETS_CREDENTIALS` (см. выше)
- Все старые JSON файлы с credentials можно удалить - теперь используется только `.env`
