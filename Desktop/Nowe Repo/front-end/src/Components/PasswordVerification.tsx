export module PasswordVerification {
    
    export interface IHandler{
        setNextHandler(nextHandler: IHandler): void;
        handle(request: string): string;
    }

    export class Handler implements IHandler {
        public nextHandler!: IHandler;

        public setNextHandler(nextHandler: IHandler): IHandler {
            this.nextHandler = nextHandler;
            return nextHandler;
        }

        public handle(request: string): string {
            if(this.nextHandler != null) {
                return this.nextHandler.handle(request);
            }
            return "Hasło prawidłowe.";
        }
    }

    export class EnoughCharacters extends Handler {

        public handle(request: string): string {
            if(request.length >= 8) {
                if(this.nextHandler != null) {
                    return this.nextHandler.handle(request);
                }
                return super.handle(request);
            }
            return "Hasło powinno posiadać przynajmniej 8 znaków.";
        }

    }

    export class ContainsUpperCase extends Handler {

        public handle(request: string): string {
            const regex: RegExp = new RegExp("[A-Z]");
            if(regex.test(request)) {
                if(this.nextHandler != null) {
                    return this.nextHandler.handle(request);
                }
                return super.handle(request);
            }
            return "Hasło powinno posiadać przynajmniej jedną wielką literę.";
        }

    }

    export class ContainsNumber extends Handler {

        public handle(request: string): string {
            const regex: RegExp = new RegExp("[0-9]");
            if(regex.test(request)) {
                if(this.nextHandler != null) {
                    return this.nextHandler.handle(request);
                }
                return super.handle(request);
            }
            return "Hasło powinno posiadać przynajmniej jedną cyfrę.";
        }

    }

    export class ContainsSpecialSign extends Handler {

        public handle(request: string): string {
            const regex: RegExp = new RegExp("((?![A-Za-z0-9]).)");
            if(regex.test(request)) {
                if(this.nextHandler != null) {
                    return this.nextHandler.handle(request);
                }
                return super.handle(request);
            }
            return "Hasło powinno posiadać przynajmniej jeden znak specjalny.";
        }
            
    }
}
