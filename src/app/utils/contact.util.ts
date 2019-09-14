import { Contact } from '../models/contact.model';

export class ContactUtil {
    static get(): Contact[] {
        const data = localStorage.getItem('contatinhos.contacts');
        if (!data) return [];
        return JSON.parse(data);
    }

    static getContact(id: string): Contact {
        const contacts: Contact[] = this.get();
        let contact: Contact;
        contacts.forEach(x => {
            if (x.id == id) {
                contact = x;
                return;
            }
        });
        return contact;
    }

    static set(contacts: Contact[]) {
        const data = JSON.stringify(contacts);
        localStorage.setItem('contatinhos.contacts', data);
    }

    static add(item: Contact) {
        let contacts = this.get();
        contacts.push(item);
        this.set(contacts);
    }

    static edit(item: Contact) {
        let contacts = this.get();
        let index = contacts.indexOf(contacts.filter(x => x.id == item.id)[0]);
        contacts[index] = item;
        this.set(contacts);
    }

    static remove(item: Contact) {
        let contacts: Contact[] = this.get();
        const index = contacts.indexOf(item);
        contacts.splice(index, 1);
        this.set(contacts);
    }

    static clear() {
        localStorage.removeItem('contatinhos.contacts');
    }
}