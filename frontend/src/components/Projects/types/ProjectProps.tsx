export type ProjectProps = {
    id: number,
    name: string,
    thumbnail: string,
    description: string,
    story: string,
    tech: string[],
    media: { type: string, src: string }[],
    githubLink: string,
}

export type MediaProps = {
    type: string,
    src: string,
}