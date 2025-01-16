## Using Chrome extensions with Crawlee

# How to use own extension

1. Download [CRX Extractor/Downloader](https://chromewebstore.google.com/detail/crx-extractordownloader/ajkhmmldknmfjnmeedkbkkojgobmljda)
2. Find your favourite Chrome extension on [Google Web Store](https://chromewebstore.google.com/)
3. Use CRX Extractor/Downloader to download your selected extension as a Zip
4. Export the Archive to your project
5. Setup the path to your extension:
```javascript
const EXTENSION_PATH = path.resolve(import.meta.dirname, './chrome-extensions', 'ublock');

const crawler = new PuppeteerCrawler({
    // ...
    launchContext: {
        launchOptions: {
            args: [
                // ...
                `--disable-extensions-except=${EXTENSION_PATH}`,
                `--load-extension=${EXTENSION_PATH}`,
            ],
        },
    },
});
```
6. Enjoy!
