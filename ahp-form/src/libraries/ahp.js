import { round } from "./common";

/**
 * Inconsistency index (Random Index, RI) mapping.
 * The index is equivalent to matrix cols (n) -1
 *
 * JS_Index | cols |Random index  (calculated by Saaty)
 * ---------|------|----------------------------------
 *    0     |   1  | there's only one question. Therefore, you can't apply AHP
 *    1     |   2  | there's only two questions. Therefore, you can't apply AHP, since that you just have two possible choices.
 *    2^    |  3^  | there's at least three questions. Therefore, you use the value
 */
const RI = [
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

/**
 * Verifies if AHP is valid.
 * @note This method not change the current value of object. So we can use it later if not pass through test.
 * @param {[Float64Array]} obj The matrix(NxN) that holds the ahp values
 * @param {[Float64Array]} matrix OPTIONAL. If pass some value, we'll gonna change the object passed. Usually is the same object as the first param
 * @see A reference to AHP: {@link https://www.youtube.com/watch?v=J4T70o8gjlk&ab_channel=ManojMathew}
 * @returns {[Boolean, Number]} It returns a tuple/vector, where the first element is if the obj satisfies the ahp, and the second one, is the proper index.
 */
function checkAhp(obj, matrix = null) {
  /*
   * The AHP work as follows:
   *
   * 1) Developing a hierarchical structure with a goal at the top level, the attributes/criteria at
   *    the second level and the alternatives at the third level
   * 2) Determine the relative importance of different attributes or Criteria with respect to the goal
   *    Pairwise comparation matrix. Bellow follows the example of relative scaling:
   *            1           - Equal importance
   *            3           - Moderate importance
   *            5           - Strong importance
   *            7           - Very strong importance
   *            9           - Extreme importance
   *         2,4,5,8        - Intermediate values
   *    1/3, 1/5, 1/7, 1/9  - Are values for inverse comparison
   * 3) Calculate the consistency
   *
   *
   * Therefore, to this form:
   * 1) The Main objective is get the discrepance bettween answers, the alternatives are the questions
   */

  // the length of my matrix
  const len = obj.length;

  // If exist only 2 questions, ahp is not needed
  if (len <= 2) return true;

  // If we don't pass matrix object, we'll ...
  // ... copy the matrix, doing so, we don't change the current value of matrix stored in "obj"
  if (!matrix) {
    matrix = obj.map(rowArray => rowArray.slice());
    // console.log(
    //   "🚀 -> checkAhp -> Didn't pass a matrix, creating a copy of object",
    //   matrix
    // );
  }
  // // console.log("🚀 -> checkAhp -> matrix", matrix);

  /**
   * This is the Pair-wise comparasion matrix
   *
   * @description Object that will be modified in ahp.
   *      At this point it will be the copy of `obj`, which is something like this:
   * @example
   * ________| Price | Storage | Camera | Looks
   * Price   |   1   |    5    |   4    | 7
   * Storage |  1/5  |    1    |   1/2  | 3
   * Camera  |  1/4  |    2    |   1    | 3
   * Looks   |  1/7  |   1/3   |  1/3   | 1
   */
  let pair_wise_comp_matrix = obj.map(rowArray => rowArray.slice());
  // console.log("🚀 -> checkAhp -> pair_wise_comp_matrix", pair_wise_comp_matrix);

  // Normalize the pair-wise matrix
  for (let col = 0; col < len; col++) {
    let sum = 0;

    /*
     * Sum each column
     *
     * ________| Price | Storage | Camera | Looks
     * Price   |   1   |    5    |   4    | 7
     * Storage |  1/5  |    1    |   1/2  | 3
     * Camera  |  1/4  |    2    |   1    | 3
     * Looks   |  1/7  |   1/3   |  1/3   | 1
     * --------|-------|---------|--------|--------
     * Sum     |  1.59 |   8.33  |5.83    | 14
     */
    for (let row = 0; row < len; row++) sum += matrix[row][col];

    /*
     * Normalize the copied table
     *
     * ________|     Price    |   Storage   |    Camera    | Looks
     * Price   |   (1)/1.59   |  (5)/8.33   |   (4)/5.83   | (7)/14
     * Storage |  (1/5)/1.59  |  (1)/8.33   |  (1/2)/5.83  | (3)/14
     * Camera  |  (1/4)/1.59  |  (2)/8.33   |   (1)/5.83   | (3)/14
     * Looks   |  (1/7)/1.59  | (1/3)/8.33  |  (1/3)/5.83  | (1)/14
     * --------|--------------|-------------|--------------|--------
     * Sum     |     1.59     |    8.33     |     5.83     |   14
     */
    for (let row = 0; row < len; row++) pair_wise_comp_matrix[row][col] /= sum;
  }

  /*
   * Priority vector (sum of row / row length). Also named as criteria weights
   *
   * ________|     Price    |   Storage   |    Camera    | Looks  | SUM(row)/cols -> criteria weights
   * Price   |    0.6289    |   0.6002    |    0.6891    |  0.500 | (0.6289+0.6002+0.6891+0.500)/4
   * Storage |  (1/5)/1.59  |  (1)/8.33   |  (1/2)/5.83  | (3)/14 |
   * Camera  |  (1/4)/1.59  |  (2)/8.33   |   (1)/5.83   | (3)/14 |
   * Looks   |  (1/7)/1.59  | (1/3)/8.33  |  (1/3)/5.83  | (1)/14 |
   * --------|--------------|-------------|--------------|--------|
   * Sum     |     1.59     |    8.33     |     5.83     |   14
   */
  let priorityVec = new Array(len);
  for (let row = 0; row < len; row++)
    priorityVec[row] =
      pair_wise_comp_matrix[row].reduce((prev, curr) => prev + curr) / len;

  /*
   * Apply the (priorityVec) into column values
   *
   * Criteria|
   *  weights|    0.6038    |      0.1365     |    0.1957      | 0.0646
   * --------|--------------|-----------------|----------------|-----------
   *         |     Price    |     Storage     |     Camera     | Looks
   * Price   |   1 * 0.6038 |    5 * 0.1365   |   4 * 0.1957   | 7 * 0.0646
   * Storage |  1/5 * 0.6038|    1 * 0.1365   |   1/2 * 0.1957 | 3 * 0.0646
   * Camera  |  1/4 * 0.6038|    2 * 0.1365   |   1 * 0.1957   | 3 * 0.0646
   * Looks   |  1/7 * 0.6038|   1/3 * 0.1365  |  1/3 * 0.1957  | 1 * 0.0646
   */
  for (let col = 0; col < len; col++)
    for (let row = 0; row < len; row++)
      matrix[row][col] = round(priorityVec[col] * matrix[row][col]);

  /*
   * Weight vector
   *
   * Criteria|              |                 |                |           | Weigth
   *  weights|    0.6038    |      0.1365     |    0.1957      | 0.0646    | vector
   * --------|--------------|-----------------|----------------|-----------|--------
   *         |     Price    |     Storage     |     Camera     | Looks     | SUM(row)
   * Price   |   1 * 0.6038 |    5 * 0.1365   |   4 * 0.1957   | 7 * 0.0646| 0.6038 + 0.6825 + 0.7832 + 0.4522 = 2.517
   * Storage |  1/5 * 0.6038|    1 * 0.1365   |   1/2 * 0.1957 | 3 * 0.0646|
   * Camera  |  1/4 * 0.6038|    2 * 0.1365   |   1 * 0.1957   | 3 * 0.0646|
   * Looks   |  1/7 * 0.6038|   1/3 * 0.1365  |  1/3 * 0.1957  | 1 * 0.0646|
   */
  let weightVec = new Array(len);
  for (let row = 0; row < len; row++)
    weightVec[row] = matrix[row].reduce((prev, curr) => prev + curr); // Don't divide by len;

  /*
   * Check consistency
   *
   *
   * Criteria|              |                |            |           | Weigth  | Result
   *  weights|    0.6038    |      0.1365    |   0.1957   |  0.0646   | vector  |
   * --------|--------------|----------------|------------|-----------|---------|-------------
   *         |     Price    |    Storage     |   Camera   |   Looks   | SUM(row)| weightVec/priorityVec
   * Price   |    0.6038    |     0.6825     |   0.7832   |   0.4522  |  2.517  | 2.517/0.6038
   * Storage |    0.1208    |    0.1365      |   0.0979   |   0.1938  |  0.5490 | 0.5490/0.1365
   * Camera  |    0.1510    |    0.2730      |   0.1958   |   0.1938  |  0.8136 | 0.8136/0.1957
   * Looks   |    0.0863    |    0.0455      |   0.0653   |   0.0646  |  0.2616 | 0.2616/0.0646
   * --------|--------------|----------------|------------|-----------|---------|-------------
   * ->  lambda_max =>  [ (2.517/0.6038) + (0.5490/0.1365) + (0.8136/0.1957) + (0.2616/0.0646) ] / 4
   * ->  CI => [lambda_max - n]/n - 1, where n is the number of cols
   */
  const lambda_max =
    weightVec
      // Calc results => (weightVec./priorityVec)
      .map((curr, i) => curr / priorityVec[i])
      // calculate lambda_max
      .reduce((prev, curr) => prev + curr) / len;
  const CI = (lambda_max - len) / (len - 1);

  /*
   * Calculate the consistency ratio CR, which is given by the formula:
   * CR = CI/RI, where RI is the random index calculated by Saaty
   */
  const CR = CI / RI[len - 1];
  // console.log("🚀 -> checkAhp -> CI", CI);

  // Where 0.1 it's given by Saaty also
  // console.log("🚀 -> checkAhp -> CR", CR);
  return [CR < 0.1, CR];
}

export { checkAhp };
