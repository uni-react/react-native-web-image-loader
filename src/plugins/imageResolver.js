import { parse, join } from 'path'
import { fileExistsAsync } from '../modules/asyncFs'

export default class ImageResolver {
  constructor (props) {
    this.platformSuffixes = ['', '.ios', '.android']
  }
  apply (resolver) {
    resolver.plugin('before-new-resolve', async (request, callback) => {
      
      // Only process image with no suffixes
      if (!(/\/[^\/\.@]+\.(png|gif|jpe?g)$/i.test(request.request))) {
        return callback()
      }

      const filePath = join(request.path, request.request)
      
      try {
        // Find if this original-size image exists
        const exists = await fileExistsAsync(filePath)
        if(exists) {
          return callback()
        }
        
        // Find if scaled image exists
        const file = parse(filePath)
        for (let scale = 2; scale <= 3; scale++) {
          for (let i = 0; i < this.platformSuffixes.length; i++) {
            const scaledFileName = `${file.name}@${scale}x${this.platformSuffixes[i]}${file.ext}`
            const exists = await fileExistsAsync(join(file.dir, scaledFileName))
            
            if(exists) {
              let result = Object.assign({}, request, {
                request: request.request.replace(file.base, scaledFileName)
              })
              let parsed = resolver.parse(result.request)
              let parsedResult = Object.assign({}, result, parsed)
              resolver.doResolve('parsed-resolve', parsedResult, `found file: customized file`, callback)
              return
            }
          }
        }
        
      } catch (err) {
        console.error(err)
      }
      // Could not resolve this image
      callback()
    })
  }
}
