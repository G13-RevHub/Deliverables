import { connectDB } from '@/configs/dbConfig';
import mongoose, { Schema, Document } from 'mongoose';

connectDB();

// è stato fatto da chatGPT, quindi non date per vero al 100% quello che trovate scritto

// Definizione dello schema con un array
interface IUser extends Document {
  username: string;
  email: string;
  hobbies: string[];
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hobbies: { type: [String], default: [] },
});

// Creazione di un modello basato sullo schema
const UserModel = mongoose.model<IUser>('User', userSchema);

// Creazione di un nuovo utente
async function createUser(username: string, email: string, hobbies: string[]): Promise<void> {
  try {
    const newUser = new UserModel({ username, email, hobbies });
    await newUser.save();
    console.log('Utente creato:', newUser);
  } catch (error) {
    console.error('Errore durante la creazione dell\'utente:', error);
  }
}

// Aggiornamento di un utente esistente
async function updateUsername(email: string, newUsername: string): Promise<void> {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { $set: { username: newUsername } },
      { new: true }
    );
    console.log('Utente aggiornato:', updatedUser);
  } catch (error) {
    console.error('Errore durante l\'aggiornamento dell\'utente:', error);
  }
}

// Eliminazione di un utente
async function deleteUser(email: string): Promise<void> {
  try {
    const deletedUser = await UserModel.findOneAndDelete({ email });
    console.log('Utente eliminato:', deletedUser);
  } catch (error) {
    console.error('Errore durante l\'eliminazione dell\'utente:', error);
  }
}

// Esempi di utilizzo
createUser('utente1', 'utente1@example.com', ['palestra', 'viaggi']);
updateUsername('utente1@example.com', 'nuovo_utente1');
deleteUser('utente1@example.com');