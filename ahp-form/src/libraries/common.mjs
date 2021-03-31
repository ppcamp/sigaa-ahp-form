import { AhpData } from "./types.mjs";
import { checkAhp } from "./ahp.mjs";
import { FormSectionData } from "./types.mjs";

/**
 * "Round number into n decimal "places"
 * @param num The number to be rounded
 * @param places The number of decimal places. Default = 2
 * @return The rounded number
 */
function round(num, places = 2) {
  return Math.round((num + Number.EPSILON) * 10 ** places) / 10 ** places;
}

/**
 * A namespase used to put all usefull test functions
 */
const test = (function() {
  return {
    /**
     * Check if two matrices are equals
     * @param {[Float64Array]} matA A 2D matrix
     * @param {[Float64Array]} matB A 2D matrix
     * @returns {Boolean} Return true if both are equal and false otherwise
     */
    array2Deq: function(matA, matB) {
      if (matA.length != matB.length) return false;

      for (let row = 0; row < matB.length; row++) {
        for (let col = 0; col < matA.length; col++) {
          if (matA[row][col] != matB[row][col]) return false;
        }
      }

      return true;
    },

    /**
     * Print a formatted 2D matrix object
     * @param {[Float64Array]} matrix A 2D matrix object to be printed
     * @param {String} subTitle Extra text to show in header
     */
    printMatrix: function(matrix, subTitle = "") {
      console.log("--".repeat(30));
      let write = `   [🐛 Debug - Matrix Print] ${subTitle}\n`;
      for (const row of matrix) {
        write += "   [";
        for (const item of row) {
          write += "\t" + item + ",\t";
        }
        write += "],\n";
      }
      console.log(write);
      console.log("--".repeat(30));
    }
  };
})();

/**
 * This namespace has some util functions used to redo my tests
 */
let redoAHP = (function() {
  let ahp = new AhpData();
  // A LOCAL value
  const { values: AHP_VALUES } = ahp;

  /**
   * Iterate over graph spanning
   * @param {[Float64Array]} matrix A 2D matrix
   * @param {[Number,Number][]} nodes Nodes to visit
   * @param {Number} start Node start position in nodes to visit
   * @param {[Float64Array]} match A 2D matrix used to compare. This is the expected result.
   */
  const dfs = function dfs(matrix, nodes, start, match) {
    // get position that will be modified in matrix
    const [row, col] = nodes[start++];
    // console.log("🚀 -> dfs -> row", row);
    // console.log("🚀 -> dfs -> col", col);

    //#region logging
    // console.log("🚀 -> dfs -> nodes", nodes);
    // console.log("🚀 -> dfs -> start", start);
    // console.log("🚀 -> dfs -> matrix", matrix);
    // console.log("🚀 -> dfs -> match", match);
    // return;
    //#endregion

    // if isn't a leaf
    if (start < nodes.length) {
      for (const value of AHP_VALUES) {
        // console.log("Running tree at: -> ", start - 0);
        matrix[row][col] = value;
        matrix[col][row] = round(1 / value);

        //#region logging
        // console.log("🚀 -> dfs -> value", value);
        // console.log("🚀 -> dfs -> matrix", matrix);
        // return;
        //#endregion

        // call again
        const found = dfs(matrix, nodes, start, match);
        // if found, exit recursively
        if (found) return true;
      }
    } else {
      // console.log("Is a leaf");

      // is a leaf
      for (const value of AHP_VALUES) {
        matrix[row][col] = value;
        matrix[col][row] = round(1 / value);

        // create an out object used to copy the matrix output
        let out = matrix.map(rowArray => rowArray.slice());

        // evaluate ahp
        const [, CI] = checkAhp(matrix, out);
        // check if objects are the same
        if (test.array2Deq(out, match)) {
          // if so, print the matrix that generates this and its CI
          //#region print the matrix that generates this output
          test.printMatrix(matrix, `Entrada dos dados`);
          test.printMatrix(match, `Matriz esperada (enviada no email)`);
          test.printMatrix(
            out,
            `Matriz de saída calculada (CI = ${round(CI, 3)})`
          );
          //#endregion
          return true;
        }
      }
    }
    return false;
  };

  return {
    /**
     * Create testQuesitons based on FormSectionData and matches with response,
     * @param {FormSectionData} object The section data object
     * @param {[Float64Array]} match The expected answer
     * @returns {[[Float64Array], Number]} Returns the matrix that matches with this
     */
    findByResponse: function(object, match) {
      const { questions, matrix } = object;

      //#region get all possibilities pairs of locations [ [row,col] ]
      const possibilities = [];
      for (let iA = 0; iA < questions.length; iA++) {
        const bvec = questions.slice(iA);
        for (let iB = 0; iB < bvec.length; iB++) {
          // skip this question if it's the same
          if (questions[iA] === bvec[iB]) continue;

          const row = iA;
          const col = iA + iB;

          possibilities.push([row, col]);

          //#region Logging
          // console.log(
          //   `${row}:{${questions[iA]}} \tVS\t ${col}:{${bvec[iB]}}\n`
          // );
          //#endregion
        }
      }
      //#endregion

      // run dfs
      dfs(matrix, possibilities, 0, match);
    }
  };
})();

export { round, redoAHP, test };
