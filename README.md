# BulgarianChat 3.3.3 — статичен сайт

Професионален адаптивен сайт за Android IRC клиента BulgarianChat. **Даренията са спрени** — няма PayPal / Revolut бутони и URL адреси.

## Основни файлове

- `index.html` — начална страница, описание на функциите, **галерия за реални екранни снимки** и изтегляне.
- `privacy.html` — проект на техническа политика за поверителност; подлежи на правна проверка и попълване.
- `styles.css`, `script.js` — оформление и функционалност.
- `site-config.js` — публични връзки за Google Play, подписания release APK, контакт и оригинални снимки.
- `assets/screenshots/` — директория за реалните екранни снимки.

## Истински екранни снимки — не са включени в изходния архив

Полученият архив `BulgarianChat-3.3.3.zip` съдържа Kotlin/XML изходен код, но **не съдържа инсталиран APK и оригинални екранни снимки**. Затова галерията е подготвена с честни празни места, вместо с измислени кадри.

За да я попълните:
1. Отворете BulgarianChat на Android телефон. Заснемете екраните **канал**, **личен чат**, **сървъри**, **настройки** с Power + Volume Down.
2. Скрийте лични съобщения, сървърни пароли, имейли, токени и друга лична информация; за предпочитане използвайте тестов канал и потребители.
3. Запишете снимките в `assets/screenshots/` като `chat.png`, `direct.png`, `servers.png`, `settings.png`.
4. В `site-config.js` попълнете:

```javascript
  screenshots: {
    chat: "assets/screenshots/chat.png",
    direct: "assets/screenshots/direct.png",
    servers: "assets/screenshots/servers.png",
    settings: "assets/screenshots/settings.png"
  }
```

Снимките се появяват автоматично при зареждане. **Не използвайте AI или макети вместо истински скрийншоти**. Началният телефон е изрично обозначена илюстрация, не снимка от приложението.

## Добавяне на инсталационен файл

**За директно изтегляне от сайта:** използвайте *подписан release APK*, например `BulgarianChat-3.3.3.apk`.

**За Google Play:** публикува се *подписан AAB* през Google Play Console; **не е нужно да качвате AAB в сайта**. Потребителите не инсталират AAB директно.

Вариант A: качете APK на собствен хостинг и задайте в `site-config.js` абсолютен HTTPS URL в `apkUrl`.

**Настоящата версия 3.3.3 вече използва публичния линк:** `https://github.com/lifedimitrova/BulgarianChat-Downloads/releases/download/v3.3.3/BulgarianChat-main.apk`.

Вариант B (препоръчително, особено ако APK е голям): GitHub → Repository → Releases → Draft a new release → Attach APK. След като публикувате release, вземете HTTPS URL до **конкретния APK asset** и го въведете в `apkUrl`, напр. `https://github.com/OWNER/REPO/releases/download/v3.3.3/BulgarianChat-3.3.3.apk` (заместете OWNER/REPO с реалното име). Не качвайте release APK към GitHub като изходен код и не споделяйте ключовете за подписване.

Cloudflare Pages има лимит от **25 MiB за отделен файл**, затова при по-голям APK използвайте GitHub Releases или друг файлов хостинг.

### Какво да попълните

В `site-config.js`:

```javascript
  playStoreUrl: "", // URL към Google Play, ако е публикувано
  apkUrl: "https://github.com/lifedimitrova/BulgarianChat-Downloads/releases/download/v3.3.3/BulgarianChat-main.apk",       // Публикуван APK за версия 3.3.3
  contactEmail: ""
```

Ако линкът е празен, съответният бутон за изтегляне не се показва. Преди публично публикуване: използвайте една и съща подписваща идентичност при бъдещи актуализации, тествайте APK и проверете политиката за поверителност и необходимостта от Impressum в Германия.

## Публикуване на сайта

Сайтът е без backend, база данни и npm зависимости. Качете **съдържанието на директорията** в GitHub Pages, Cloudflare Pages или обикновен хостинг. Начална страница: `index.html`.

За локално изпълнение:

```bash
python3 -m http.server 8000
```

В браузъра отворете `http://localhost:8000`.


## Добавени реални екранни снимки
- assets/screenshots/chat.jpg
- assets/screenshots/direct.jpg
- assets/screenshots/servers.jpg
- assets/screenshots/settings.jpg
