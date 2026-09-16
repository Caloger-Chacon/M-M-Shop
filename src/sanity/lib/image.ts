import { createImageUrlBuilder } from '@sanity/image-url'
import { projectId, dataset } from '../env'

const imageBuilder = createImageUrlBuilder({
  projectId,
  dataset,
})

export const urlFor = (source: any) => {
  return imageBuilder.image(source)
}