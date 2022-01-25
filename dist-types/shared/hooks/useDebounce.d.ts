declare const useDebounce: (countdownInMilliseconds: number, action: Function) => {
    execute: (...params: any[]) => void;
};
export default useDebounce;
