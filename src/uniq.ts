// generates a unique id for each field, the id is only added when the field is created - not when rendered. 
// Hence, maintains the stability and uniqueness of course

export function* uniq() {
  let i = 0;

  while (true) {
    yield i++;
  }
}
