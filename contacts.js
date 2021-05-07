import fs from "fs";
import path from "path";

const contactsPath = path.join("./db", "contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (err) {
    console.error(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find(({ id }) => String(id) === contactId);
    console.table(contact);
  } catch (err) {
    console.error(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newListContacts = JSON.stringify(
      contacts.filter(({ id }) => String(id) !== contactId),
      null,
      2
    );
    await fs.writeFile(contactsPath, newListContacts);

    const contactUpdated = await fs.readFile(contactsPath);
    console.table(JSON.parse(contactUpdated));
  } catch (err) {
    console.error(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = { id: shortid.generate(), name, email, phone };
    const newContactsList = JSON.stringify([...contacts, newContact], null, 2);

    await fs.writeFile(contactsPath, newContactsList);

    const dataUpdated = await fs.readFile(contactsPath);
    console.table(JSON.parse(dataUpdated));
  } catch (err) {
    console.error(err.message);
  }
}

export { listContacts, getContactById, removeContact, addContact };
