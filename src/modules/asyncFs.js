import fs from 'fs'

export const statAsync = async ( filePath: string ) => {
    return new Promise( ( resolve, reject ) => {
        fs.stat( filePath, ( err, stats ) => {
            if( err ) {
                reject( err )
            } else {
                resolve( stats )
            }
        })
    })
}

export const fileExistsAsync = async ( filePath: string ) => {
    return new Promise( ( resolve, reject ) => {
        fs.stat( filePath, ( err, stats ) => {
            if (err) {
                if ( err.code === 'ENOENT' ) {
                    resolve( false )
                } else {
                    reject( err )
                }
                return
            }
            resolve( stats.isFile() )
        })
    })
}

export const readFileAsync = async ( filePath: string ) => {
    return new Promise( ( resolve, reject ) => {
        fs.readFile( filePath, ( err, data ) => {
            if( err ) {
                reject( err )
            } else {
                resolve( data )
            }
        })
    })
}
