const foo = 'foo';
const bar = 'bar';
throw /* minify-error */ new Error(`JR: ${foo}, ${bar}`);
throw /* minify-error */ new Error(`JR: ${foo}` + `, ${bar}`);
throw /* minify-error */ new Error('JR: ' + `${foo}, ${bar}`);
