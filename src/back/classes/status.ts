import IStatus from '../../interfaces/IStatus';

class Status implements IStatus {
    readonly name: string;
    readonly description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}

export default Status;