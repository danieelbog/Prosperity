export interface IFeedback {
    id: number;
    message: string;
    variant: VARIANT;
    isShown: boolean;
    position: number;
}

export type VARIANT = 'green' | 'red' | 'yellow';
