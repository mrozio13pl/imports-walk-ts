// @ts-nocheck
// Importing in another module
import { myVar, myFunc, MyClass } from './module-a';

// Importing with aliases
import { variable, Class } from './module-b';

// Exporting everything
export * from './module-c';

// Importing everything
import myModule = require('./module-d');

// Re-export with modification
export { myVar as renamedVar } from './module-e';

// Import the renamed entity
import { renamedVar } from './module-f';

// Importing the default entity
import myFunction2 from './module-g';
import { MyType } from './module-h';
import 'module-i';

// Importing using a namespace
import * as myModulo from './module-j';
console.log(myModule.myVar);

// Exporting a default entity
export { default } from './module-k';

// Exporting with aliases
export { myVar as variable, myFunc as function, MyClass as Class } from './module-l';