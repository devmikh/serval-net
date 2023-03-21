export interface UserInterface {
    email: string,
    password: string
}

export interface PostInterface {
    user_id: number,
    date: number,
    text: string
}