import 'reflect-metadata';
import 'module-alias/register';

// internal libs
import db from '@models';
import rest from '@rest';

// constants
const port:number = 6449;

(async () => {

  await db.sync({force: false});

  rest.listen(port, (err, address) => {
    if(err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`)
  });

})();
