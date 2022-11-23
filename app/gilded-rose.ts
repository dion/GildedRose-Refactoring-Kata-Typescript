export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class StandardItem extends Item {
  update() {
    this.sellIn -= 1;
    this.quality = Math.max((this.sellIn > 0 ? this.quality - 1 : this.quality - 2), 0);
  }
}

export class AgedBrie extends Item {
  constructor(sellIn, quality) {
    super('Aged Brie', sellIn, quality);
  }

  update() {
    this.sellIn -= 1;
    this.quality = Math.min(50, (this.sellIn > 0 ? this.quality + 1 : this.quality + 2));
  }
}

export class BackstagePass extends Item {
  constructor(sellIn, quality) {
    super('Backstage passes to a TAFKAL80ETC concert', sellIn, quality);
  }

  imminenceQuality() {
    if (this.sellIn < 0) return 0;
    if (this.sellIn <= 5) return this.quality + 3;
    if (this.sellIn <= 10) return this.quality + 2;
    return this.quality + 1;
  }

  update() {
    this.sellIn -= 1;
    this.quality = Math.min(50, this.imminenceQuality());
  }
}

class Sulfuras extends Item {
  constructor(name = 'Sulfuras, Hand of Ragnaros') {
    super(name, 0, 80);
  }

  update() {}
}

class ConjuredItem extends Item {
  update() {
    this.sellIn -= 1;
    this.quality = Math.max(0, this.sellIn > 0 ? this.quality - 2 : this.quality - 4);
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateAgedBrie(item) {
    const x = new AgedBrie(item.sellIn, item.quality);
    x.update();

    item.quality = x.quality;
    item.sellIn = x.sellIn;
  }

  updateBackstagePass(item) {
    const x = new BackstagePass(item.sellIn, item.quality);

    x.update();

    item.quality = x.quality;
    item.sellIn = x.sellIn;
  }

  updateSulfuras(item) {
    const x = new Sulfuras();

    item.quality = x.quality;
    item.sellIn = x.sellIn;
  }

  updateConjuredItem(item) {
    const x = new ConjuredItem(item.name, item.sellIn, item.quality);
    
    x.update();
    
    item.quality = x.quality;
    item.sellIn = x.sellIn;
  }

  updateStandardItem(item) {
    const x = new StandardItem(item.name, item.sellIn, item.quality);

    x.update();

    item.quality = x.quality;
    item.sellIn = x.sellIn;
  }

  updateQuality() {
    this.items.map(item => {
      switch (item.name) {
        case 'Aged Brie': return this.updateAgedBrie(item);
        case 'Backstage passes to a TAFKAL80ETC concert': return this.updateBackstagePass(item);
        case 'Sulfuras, Hand of Ragnaros': return this.updateSulfuras(item);
        case 'Conjured Mana Cake': return this.updateConjuredItem(item);
        default: return this.updateStandardItem(item);
      }  
    });

    return this.items;
  }
}
