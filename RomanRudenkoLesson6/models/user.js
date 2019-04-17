const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  login: {
    type: String,    
    required: 'Укажите логин', 
    unique: 'Такой логин уже существует',
  },
  hash: { type: String },
  // Понимаю что соль можно генерить уникально и хранить как запись в базе у каждого юзера для последующей сверки, просто упрощаю
});

userSchema.methods.hashPassword = (password) => { 
  // this.hash = crypto.pbkdf2Sync(password, 'a2jGkauge', 100000, 256, 'sha512').toString('hex'); // Почему сохранение данных в коллекцию происходит без поля hash хотя в закомментированном варианте ниже сохраняется корректно?
  return crypto.pbkdf2Sync(password, 'a2jGkauge', 100000, 256, 'sha512').toString('hex');
}

userSchema.methods.checkPassword = function (password) {
  if (!password) return false;
  if (!this.hash) return false;
  return crypto.pbkdf2Sync(password, 'a2jGkauge', 100000, 256, 'sha512').toString('hex') == this.hash;
};



// function generatePassword(password) {
//   return new Promise((resolve, reject) => {
//     crypto.pbkdf2(password, 'a2jGkauge', 100000, 256, 'sha512', (err, derivedKey) => {
//         if (err) return reject(err);
//         resolve(derivedKey.toString('hex'));
//       }
//     );
//   });
// }

// userSchema.methods.hashPassword = async function hashPassword(password) {
//   this.hash = await generatePassword(password);
// };

module.exports = mongoose.model('User', userSchema, 'users');