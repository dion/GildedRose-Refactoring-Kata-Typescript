import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('fixme', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('fixme');
  });

  it('should degrade quality twice as fast, once the sell by date has passed', () => {
    const Rose = new GildedRose([new Item('test', 0, 5)]);
    const items = Rose.updateQuality();
    const item = items.shift();
    expect(item?.quality).toEqual(3);
    expect(item?.sellIn).toEqual(-1);
  })

  it('should not drop quality below zero', () => {
    const Rose = new GildedRose([new Item('test', 0, 0)]);
    const items = Rose.updateQuality();
    const item = items.shift();
    expect(item?.name).toEqual('test');
    expect(item?.sellIn).toEqual(-1);
    expect(item?.quality).toEqual(0);
  })

  it('should raise aged brie quality as sellIn date passes', () => {
    const Rose = new GildedRose([new Item('Aged Brie', 3, 1)]);
    const items = Rose.updateQuality();
    const item = items.shift();
    expect(item?.sellIn).toEqual(2);
    expect(item?.quality).toEqual(2);
  })

  test('should not degrade quality of Sulfuras', () => {
    const Rose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 0)]);
    const items = Rose.updateQuality();
    const item = items.shift();
    expect(item?.quality).toEqual(80);
  });

  test('should decrement conjured quality at double the rate', () => {
    const Rose = new GildedRose([new Item('Conjured Mana Cake', 5, 10)]);
    const items = Rose.updateQuality();
    const item = items.shift();
    expect(item?.quality).toEqual(8);
    expect(item?.sellIn).toEqual(4);
  });

  test('should increase Backstage Pass quality by default', () => {
    const Rose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 20, 10)]);
    const items = Rose.updateQuality();
    const item = items.shift();
    expect(item?.sellIn).toEqual(19);
    expect(item?.quality).toEqual(11);
  });
});
