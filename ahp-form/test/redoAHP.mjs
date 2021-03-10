/**
 * File to test and generate my matrix output
 *
 * To RUN:
 * ```bash
 * time redoAHP.mjs
 * ```
 */

import { FormSectionData } from "../src/libraries/types.mjs";
import { redoAHP } from "../src/libraries/common.mjs";

let main = (function() {
  //#region AHP constants
  // This constant will store the value of position in form
  const SLIDER_START_POS = 4;
  // This constant will store the ahp default value
  const AHP_START_VALUE = 1;
  //#endregion

  //#region AHP questions
  // 3: Visão geral
  const lRoot = new FormSectionData({
    questions: [
      "Conhecimento técnico",
      "Competências, habilidades e atributos pessoais e profissionais: gerenciar projetos, compreender problemas e autoaprendizado",
      "Competências e habilidades interpessoais: trabalho em equipe e comunicação"
    ],
    matrix: FormSectionData.newMatrix(3, AHP_START_VALUE),
    formMatrix: FormSectionData.newMatrix(3, SLIDER_START_POS),
    notes: [""],
    valid: true
  });
  // [6]: Conhecimento técnico
  const l1Q1 = new FormSectionData({
    // n!/( p!(n-p)! ) Where p = 2
    questions: [
      "Matemática e física",
      "Conhecimento, métodos e ferramentas fundamentais de computação básica",
      "Conhecimento, métodos e ferramentas na área de sistemas de software",
      "Conhecimento, métodos e ferramentas na área de sistemas microprocessados",
      "Conhecimentos básicos em sistemas de comunicação",
      "Conhecimentos básicos em sistemas de automação"
    ],
    matrix: FormSectionData.newMatrix(6, AHP_START_VALUE),
    formMatrix: FormSectionData.newMatrix(6, SLIDER_START_POS),
    notes: [""],
    valid: true
  });
  // 3: Conhecimento, métodos e ferramentas fundamentais de computação básica
  const l2Q1S2 = new FormSectionData({
    // n!/( p!(n-p)! ) Where p = 2
    questions: [
      "Lógica, algoritmos, teoria da computação e estrutura de dados",
      "Linguagens e paradigmas de programação específicos",
      "Projeto e análise de algoritmos"
    ],
    matrix: FormSectionData.newMatrix(3, AHP_START_VALUE),
    formMatrix: FormSectionData.newMatrix(3, SLIDER_START_POS),
    notes: [""],
    valid: true
  });
  // [6]: Conhecimento, métodos e ferramentas na área de sistemas de software
  const l2Q1S3 = new FormSectionData({
    // n!/( p!(n-p)! ) Where p = 2
    questions: [
      "Configurar plataformas para aplicações de software e serviços",
      "Arquiteturas de computadores",
      "Segurança de sistemas de computação",
      "Engenharia de software e práticas no desenvolvimento de software e versionamento",
      "Inteligência artificial",
      "Desenvolvimento Web e Mobile"
    ],
    matrix: FormSectionData.newMatrix(6, AHP_START_VALUE),
    formMatrix: FormSectionData.newMatrix(6, SLIDER_START_POS),
    notes: [""],
    valid: true
  });
  // 2-1: Conhecimentos básicos em sistemas de comunicação
  const l2Q1S5 = new FormSectionData({
    // n!/( p!(n-p)! ) Where p = 2
    questions: [
      "Redes de computadores",
      "Software para sistemas de comunicação"
    ],
    matrix: FormSectionData.newMatrix(2, AHP_START_VALUE),
    formMatrix: FormSectionData.newMatrix(2, SLIDER_START_POS),
    notes: [""],
    valid: true
  });
  // 5: Competências, habilidades e atributos pessoais e profissionais
  const l1Q2 = new FormSectionData({
    // n!/( p!(n-p)! ) Where p = 2
    questions: [
      "Gerenciar projetos e sistemas de computação",
      "Realizar estudos de viabilidade técnico-econômica",
      "Compreender e resolver problemas",
      "Autoaprendizado",
      "Criatividade e Inovação"
    ],
    matrix: FormSectionData.newMatrix(5, AHP_START_VALUE),
    formMatrix: FormSectionData.newMatrix(5, SLIDER_START_POS),
    notes: [""],
    valid: true
  });
  // 4: Competências e habilidades interpessoais: trabalho em equipe e comunicação
  const l1Q3 = new FormSectionData({
    // n!/( p!(n-p)! ) Where p = 2
    questions: [
      "Comunicação oral e escrita",
      "Língua inglesa",
      "Empreender e exercer liderança",
      "Trabalho em equipe"
    ],
    matrix: FormSectionData.newMatrix(4, AHP_START_VALUE),
    formMatrix: FormSectionData.newMatrix(4, SLIDER_START_POS),
    notes: [""],
    valid: true
  });
  //#endregion

  //#region AHP data to change
  const toRun = l1Q2;
  let match = [
    [0.22, 0.22, 0.19, 0.22, 0.29],
    [0.22, 0.22, 0.19, 0.22, 0.29],
    [0.22, 0.22, 0.19, 0.22, 0.1],
    [0.07, 0.07, 0.06, 0.07, 0.1],
    [0.22, 0.22, 0.57, 0.22, 0.29]
  ];
  //#endregion

  //#region functions
  return {
    run: function() {
      // does bruteforce searching to found the equivalent matrix that matches this object
      redoAHP.findByResponse(toRun, match);
    }
  };
  //#endregion
})();

main.run();
