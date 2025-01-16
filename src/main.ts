import { Actor } from 'apify';
import { PuppeteerCrawler, utils } from 'crawlee';
import path from 'path';

await Actor.init();

const proxyConfiguration = await Actor.createProxyConfiguration();

const EXTENSION_PATH = path.resolve(import.meta.dirname, './chrome-extensions', 'all-fingerprint-defender');

const crawler = new PuppeteerCrawler({
    proxyConfiguration,
    requestHandler: async () => {
        await utils.sleep(10_000);
    },
    headless: false,
    sessionPoolOptions: {
        blockedStatusCodes: [404],
    },
    maxRequestRetries: 20,
    browserPoolOptions: {
        useFingerprints: false,
    },
    launchContext: {
        useChrome: true,
        launchOptions: {
            args: [
                `--disable-extensions-except=${EXTENSION_PATH}`,
                `--load-extension=${EXTENSION_PATH}`,
                '--disable-gpu', // Mitigates the "crashing GPU process" issue in Docker containers
            ],
        },
    },
});

await crawler.run([{
    url: 'https://fingerprintjs.github.io/fingerprintjs/',
}]);

await Actor.exit();
