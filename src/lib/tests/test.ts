import { TestStatus } from '../testStatus';
import { TestVisitor } from './visitors/testVisitor';

export class Test {
    public get name() { return this._name; }
    public get status() { return this._status; }
    public get func() { return this._func; }
    /**
     * @param func The test function
     * @param status The test's status
     */
    constructor(private _name: string, private _func: Function, private _status: TestStatus) { }

    public async run(context) {
        await this.func(context);
    }

    public async accept(visitor: TestVisitor) {
        visitor.visitTest(this);
    }
}