import ts from 'typescript';
import { subjectFileName, walk } from './walk.ts';

const program = ts.createProgram([subjectFileName], {
  strict: true,
  noEmit: true,
});

walk(program, program.getTypeChecker());
