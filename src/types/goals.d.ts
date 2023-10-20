export type GoalsType = {
    id?: number;
    goal: string;
    sub_goal: string;
    target_metric: number;
    current_metric: number;
    balance: number;
    reachability_in_months: number;
    reachability_in_years: number;
    started: Date;
    finished: Date;
    planned_start: Date;
    prefered_value_of_balance: string;
    user: number;
}
