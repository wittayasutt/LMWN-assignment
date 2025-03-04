# Frontend Assignment 2025

# รวมลายแทง ร้านลับ

## Requirement

### WEB

### API-GW

## Data Server

### API-SPEC

**Guide**

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
