export class user {
    name: string | null;
    email: string | null;
    password: string | null;
    phone: string | null;
    role: string | null;

    constructor(name: string, email: string, password: string, phone: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.role = null; // Initialize role as null or set a default value
    }
}