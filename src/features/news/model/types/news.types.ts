export type News = {
  id: 0,
  topic: string,
  text: string,
  startDate: string,
  endDate: string,
  image1?: string,
  image2?: string,
  image3?: string
}

export type NewsCreate = {
  topic: string,
  text: string,
  startDate: string,
  endDate: string,
  image1?: File,
  image2?: File,
  image3?: File
}

