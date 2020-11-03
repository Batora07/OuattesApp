export interface Profile {
    phone?: string;
    picture?: string;
    actu?: string;
}

export interface User {
    _id?: string;
    username?: string;
    password?: string;
    profile?: Profile;
}