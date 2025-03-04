# Frontend Assignment 2025 - รวมลายแทง ร้านลับ (Wongnai Guide)

## Requirement

### WEB

![image](./ui-example.jpg)

**Guide Detail**

- [ ] name
- [ ] description
- [ ] tags
- [ ] cover photo

**Guide Restaurant**

- [ ] photo
- [ ] name
- [ ] guide description
- [ ] address
- [ ] contact
- [ ] rating
- [ ] category

### API-GW

## Data Server

### API-SPEC

**Guide Detail**

```ts
  id: string
  title: string
  socialTitle: string
  shortDescription: string
  description: string
  coverPhoto: {
    id: string,
    smallUrl: string
    largeUrl: string
  }
  tags: string[]
  writeDate: string
  createdAt: string
  updatedAt: string
  items: {
    id: string
    description: string
    restaurantId: string
    photos: {
      id: string,
      smallUrl: string
      largeUrl: string
    }[]
  }[]
```

**Restaurant**

```ts
  id: string
  name: string
  branch?: string
  rating: number
  numberOfReviews: number
  url: string
  address: string
  lat: number
  lng: number
  phoneNo: string
  categories: string[]
  line: string
  instagram: string
  facebook: string
  workingHours: {
    day: number
    open: string
    close: string
  }[]
  official: boolean
  delivery: boolean
  pickup: boolean
```

### Example Data

**Guide Detail**

```json

```

**Restaurant**

```json

```
