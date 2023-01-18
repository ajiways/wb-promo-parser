import { IParser } from '../modules/search/interfaces/parser.interface';
import {
  ATTR_CLASS,
  BRAND_NAME_SELECTOR,
  PRODUCTS_CARD_LIST_SELECTOR,
  PRODUCT_NAME_SELECTOR,
  PRODUCT_SELECTOR,
  PROMO_CARD_CLASS,
  SITE_URL,
} from './constants/parser.constants';
import { load } from 'cheerio';
import puppeteer, { Page } from 'puppeteer';
import { ProductInfoDto } from '../modules/search/dto/product-info.dto';
import { plainToInstance } from 'class-transformer';
import { IRawProductInfo } from './interfaces/raw-product-info.interface';

export class WildberriesParser implements IParser {
  async getItems(
    searchString: string,
    scroll: boolean,
  ): Promise<ProductInfoDto[] | null> {
    try {
      const page = await this.configureBrowser(searchString, scroll);
      const promoProducts = await this.getPromoProducts(page);

      return promoProducts.map((product) =>
        plainToInstance(ProductInfoDto, product, {
          excludeExtraneousValues: true,
        }),
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  private async configureBrowser(
    searchString: string,
    scroll: boolean,
  ): Promise<Page> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(SITE_URL + searchString);
    await page.waitForSelector(PRODUCTS_CARD_LIST_SELECTOR);

    if (scroll) {
      await this.autoScroll(page);
    }

    return page;
  }

  private async getPromoProducts(page: Page) {
    const html = await page.evaluate(
      () => document.body.querySelector('.product-card-list').innerHTML,
    );

    const $ = load(html);

    const productsElements = $(PRODUCT_SELECTOR);

    const productsData: IRawProductInfo[] = [];

    productsElements.each((idx, el) => {
      const brand = $(BRAND_NAME_SELECTOR, el).text();
      const name = $(PRODUCT_NAME_SELECTOR, el).text().replace(' / ', '');
      const isPromo = el.attributes.some(
        (attr) =>
          attr.name === ATTR_CLASS && attr.value.includes(PROMO_CARD_CLASS),
      );

      if (isPromo) {
        productsData.push({ brand, name, place: idx + 1 });
      }
    });

    return productsData;
  }

  private async autoScroll(page: Page) {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight - window.innerHeight) {
            clearInterval(timer);
            resolve(null);
          }
        }, 100);
      });
    });
  }
}
