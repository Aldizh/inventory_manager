import { faker } from '@faker-js/faker'

export const inventoryData = [
  {
    name: faker.commerce.product(),
    quantity: 120,
    buyPrice: faker.commerce.price({ min: 0, max: 1000 }),
  },
  {
    name: faker.commerce.product(),
    quantity: 140,
    buyPrice: faker.commerce.price({ min: 0, max: 1000 }),
  },
  {
    name: faker.commerce.product(),
    quantity: 100,
    buyPrice: faker.commerce.price({ min: 0, max: 1000 }),
  },
]

export const salesData = inventoryData.map(item => ({
  ...item,
  sellPrice: item.buyPrice + item.buyPrice * 0.15, // add 15% to the original price
  category: "large",
}))
