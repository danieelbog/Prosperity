export interface IEntityFilter {
    [key: string]:
        | string
        | string[]
        | number
        | boolean
        | (string | number | boolean)[]
        | null
        | undefined;
}
