/**
 * 
 * @param array 
 * @param size 
 * @returns 
 */
export function chunk(array: any[], size: number): any[][] {
    const chunks: any[][] = []
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size))
    }
    return chunks;
}