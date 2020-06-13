module.exports = (arr, val) => {
  let first = 0;
  let last = arr.length - 1;

  while (first < last) {
    let mid = Math.floor((first + last) / 2);
    if (arr[mid].id === val) return arr[mid];
    else if (val > arr[mid].id) first = mid + 1;
    else last = mid - 1;
  }
  return false;
}