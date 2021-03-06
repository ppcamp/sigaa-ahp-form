/**
 * @file It have all the types needed in project
 */

/**
 * @class
 * @public
 * @version 0.1
 * @since 05/03/21
 * @author ppcamp
 */
export class FormSectionData {
  /**
   * A list of questions to be render and shown
   * @public
   * @example
   * ["Question A", "Question B", "Question C"]
   */
  questions = [String];

  /**
   * A matrix that will hold the ahp values (before evaluation of ahp)
   * @public
   * @example
   * 1    | 4   | 6
   * 4⁻¹  | 1   | 3
   * 6⁻¹  | 3⁻¹ | 1
   */
  matrix = [Float64Array];

  /**
   * Explanations that will be shown into tooltip
   * @public
   * @example
   * [
   *  "Note for question A",
   *  "Note for question B",
   *  "Note for question C"
   * ]
   */
  notes = [String];

  /**
   * An conditional value to shown an error message if the ahp is valid or not.
   * @public
   */
  valid = Boolean;

  /**
   * Form values: used to get slider value based on its position.
   * This should be a matrix with the same size of this.matrix object.
   * It should be a matrix, because it's the only way of properly match with matrix object.
   * This should be initialized with its primarly position.
   * It's used by `FormQuestion`. The index is between 0..9, in this case
   * @todo Convert it to a single vector row, instead of using matrix.
   * @see "src/components/form/Questions.vue"
   * @public
   * @example
   * 4 | 4 | 4
   * 4 | 4 | 4
   * 4 | 4 | 4
   */
  formMatrix = [Float64Array];

  /**
   * Inconsistency index calculated by AHP
   * @see "src/libraries/ahp.js"
   * @public
   */
  ci = Number;

  /**
   * Create a square matrix [size][size] filled with value
   * @param {Number} size The number of rows/cols
   * @param {Number} value The value used to fill the matrix. Usually, it can be 4(Middle of sliders) or 1(start value in ahp)
   * @static
   * @returns {[Float64Array]} The matrix[size][size] filled with value.
   */
  static newMatrix(size, value) {
    return Array(size)
      .fill()
      .map(() => Array(size).fill(value));
  }

  /**
   * Fill this object with values passed through
   * @public
   * @returns The FormSectionData object created
   * @param {Object} data Object to fill this class
   * @param {String[]} data.questions A vector of questions
   * @param {Float64Array[]} data.matrix A square matrix that will hold the ahp
   * @param {Float64Array[]} data.formMatrix A square matrix that will hold the slider position
   * @param {String[]} data.notes A vector of notes (tooltips)
   */
  constructor(data) {
    this.valid = true;
    this.ci = 0;

    // Bind these values
    if (!data.questions) {
      throw "You must pass: questions property to this object";
    }
    if (!data.formMatrix) {
      throw "You must pass: formMatrix property to this object";
    }
    if (!data.notes) {
      throw "You must pass: notes property to this object";
    }
    if (!data.matrix) {
      throw "You must pass: matrix property to this object";
    }

    if (data.questions) {
      this.questions = data.questions;
    }
    if (data.matrix) {
      this.matrix = data.matrix;
    }
    if (data.notes) {
      this.notes = data.notes;
    }
    if (data.formMatrix) {
      this.formMatrix = data.formMatrix;
    }
  }
}

/**
 * @class
 * @public
 * @version 0.1
 * @since 05/03/21
 * @author ppcamp
 */
export class AhpData {
  /**
   * Values that will be inserted into matrix
   * @public
   * @example
   * [0.11, 0.14, 0.2, 0.33, 1, 3, 5, 7, 9],
   */
  values = [0.11, 0.14, 0.2, 0.33, 1, 3, 5, 7, 9];

  /**
   * Questions labels
   * @public
   * @example
   * ["9", "7", "5", "3", "Igual", "3", "5", "7", "9"]
   */
  ticks = ["9", "7", "5", "3", "Igual", "3", "5", "7", "9"];

  /**
   * Minimum range value
   * @description iterate over values and ticks
   * @public
   */
  min = 0;

  /**
   * Maximum range value
   * @description iterate over values and ticks
   * @public
   */
  max = 8;
}
