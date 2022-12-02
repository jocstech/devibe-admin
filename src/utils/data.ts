export const deepClone = (item) => {
  if (!item)
    return item
  // null, undefined values check

  const types = [Number, String, Boolean]
  let result

  // normalizing primitives if someone did new String('aaa'), or new Number('444');
  types.forEach((type) => {
    if (item instanceof type)
      result = type(item)
  })

  if (typeof result == 'undefined') {
    if (Object.prototype.toString.call(item) === '[object Array]') {
      result = []
      item.forEach((child, index, _array) => {
        result[index] = deepClone(child)
      })
    }
    else if (typeof item == 'object') {
      // testing that this is DOM
      if (item.nodeType && typeof item.cloneNode == 'function') {
        result = item.cloneNode(true)
      }
      else if (!item.prototype) {
        // check that this is a literal
        if (item instanceof Date) {
          result = new Date(item)
        }
        else {
          // it is an object literal
          result = {}
          for (const i in item)
            result[i] = deepClone(item[i])
        }
      }
      else {
        // depending what you would like here,
        // just keep the reference, or create new object
        // eslint-disable-next-line no-constant-condition
        if (false && item.constructor) {
          // do nothing
        }
        else {
          result = item
        }
      }
    }
    else {
      result = item
    }
  }

  return result
}
