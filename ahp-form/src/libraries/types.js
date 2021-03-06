// should have all the types needed in project

/**
 * @class
 * An class used to create and define new Errors
 */
export class Exception {
  /**
   * Throw a new Error exception
   * @param {String} reason The reason of throw this error
   */
  constructor(reason) {
    return `Error: ${reason}`;
  }
}

export class FormSectionData {
  // Form values (needed to get values)
  questions = [String];
  // Matrix used by AHP
  matrix = [Float64Array];
  // Notes (explanations that will be into tooltip)
  notes = null;
  // UI: check if ahp is valid or not
  valid = Boolean;
  // Form values (needed to get values) Used only to get slider pos
  formMatrix = [Float64Array];

  /**
   * Fill this object with values passed through
   * @param {{ questions:String[], matrix: Float64Array[], formMatrix: Float64Array[], notes:String[], valid:Boolean }} data Object to fill this class
   */
  constructor(data) {
    if (data.questions) {
      this.questions = data.questions;
    }
    if (data.matrix) {
      this.matrix = data.matrix;
    }
    if (data.valid) {
      this.valid = data.valid;
    }
    if (data.notes) {
      this.notes = data.notes;
    }
    if (data.formMatrix) {
      this.formMatrix = data.formMatrix;
    }
  }
}
