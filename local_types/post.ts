export interface Post {
    id: string,
    title: string,
    url: string,
    description: string,
    tags: Array<string>,
    dateCreated: Date,
    lastModified: Date
}