import { round } from "./common";

/**
 * Verifies if AHP is valid.
 * @note This method not change the current value of object. So we can use it
 *       later if not pass through test.
 * @param obj The matrix that holds the ahp values
 * @param matrix If pass some value, we'll gonna change the object passed
 * @return true/false If pass/or not through ahp validation
 */
function checkAhp(obj, matrix = null) {
  const len = obj.length;

  if (len <= 2) return true;

  // If we don't pass matrix object, we'll
  //  copy the matrix to not change the current value of matrix in "obj"
  if (!matrix) matrix = obj.map(rowArray => rowArray.slice());
  let _m = obj.map(rowArray => rowArray.slice());

  // console.log("checkAhp -> matrix", matrix);
  // console.log("checkAhp -> _m", _m);

  // Inconsistency index
  const RI = [
    // Matrix dimensions starting with one
    0,
    0,
    0.58,
    0.9,
    1.12,
    1.24,
    1.32,
    1.41,
    1.45,
    1.49,
    1.51,
    1.48,
    1.56,
    1.57,
    1.59
  ];

  for (let col = 0; col < len; col++) {
    let sum = 0;
    // Sum each column
    for (let row = 0; row < len; row++) sum += matrix[row][col];
    // Normalize the copied table
    for (let row = 0; row < len; row++) _m[row][col] /= sum;
  }

  // Priority vector (sum of row / row length)
  let priorityVec = new Array(len);
  for (let row = 0; row < len; row++)
    priorityVec[row] = _m[row].reduce((prev, curr) => prev + curr) / len;

  // Apply the (priorityVec)' into column values
  for (let col = 0; col < len; col++)
    for (let row = 0; row < len; row++)
      matrix[row][col] = round(priorityVec[col] * matrix[row][col]);

  // Weight vector
  let weightVec = new Array(len);
  for (let row = 0; row < len; row++)
    weightVec[row] = matrix[row].reduce((prev, curr) => prev + curr) / len;

  // Check consistency
  const CI =
    (weightVec
      // Calc result (weightVec./priorityVec)
      .map((curr, i) => curr / priorityVec[i])
      .reduce((prev, curr) => prev + curr) -
      len) /
    (len - 1);

  const CR = CI / RI[len - 1];
  // console.log("checkAhp -> CI", CI);
  // Where 0.1 it's given by Saaty also
  // console.log("checkAhp -> CR", CR);
  return CR < 0.1;
}

export { checkAhp };
