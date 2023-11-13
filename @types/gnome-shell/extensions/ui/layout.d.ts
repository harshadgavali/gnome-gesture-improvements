import Clutter from '../../../clutter12';

declare class MonitorConstraint extends Clutter.Constraint {
    constructor(params: Partial<{ primary: boolean, index: number }>);
}